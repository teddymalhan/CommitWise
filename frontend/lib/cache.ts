import { Pool } from "pg";

/**
 * TTL cache backed by a Postgres UNLOGGED table.
 *
 * Why UNLOGGED: cache entries are disposable by definition, so we skip the
 * write-ahead log entirely (faster writes, no replication traffic). The trade is
 * that an unclean crash truncates the table — which for a cache just means a
 * cold cache, not data loss. Do NOT put anything you care about in here.
 *
 * The table is shared across every pool connection and survives process
 * restarts, unlike an in-process Map. Swapping this for Redis later means
 * reimplementing only get/set/del/wrap below.
 */

export type CacheStats = { hits: number; misses: number; sets: number; errors: number };

const globalForCache = globalThis as unknown as {
  __cwCachePool?: Pool;
  __cwCacheStats?: CacheStats;
  __cwCacheReady?: Promise<void>;
};

function pool(): Pool {
  if (!globalForCache.__cwCachePool) {
    globalForCache.__cwCachePool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 4,
    });
    // A dead cache must never take down a request.
    globalForCache.__cwCachePool.on("error", (err) => {
      console.warn("[cache] idle client error:", err.message);
    });
  }
  return globalForCache.__cwCachePool;
}

const stats: CacheStats = (globalForCache.__cwCacheStats ??= {
  hits: 0,
  misses: 0,
  sets: 0,
  errors: 0,
});

export function cacheStats(): CacheStats {
  return { ...stats };
}

/**
 * Creates the table on first use. Idempotent, and guarded so the DDL runs at
 * most once per process. Kept here (rather than a migration) so the cache works
 * out of the box on a fresh database.
 */
function ensureReady(): Promise<void> {
  globalForCache.__cwCacheReady ??= (async () => {
    await pool().query(`
      CREATE UNLOGGED TABLE IF NOT EXISTS cache_entries (
        key        text PRIMARY KEY,
        value      jsonb       NOT NULL,
        expires_at timestamptz NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now()
      )
    `);
    await pool().query(
      `CREATE INDEX IF NOT EXISTS cache_entries_expires_at_idx ON cache_entries (expires_at)`
    );
  })();
  return globalForCache.__cwCacheReady;
}

/** Namespaced, collision-resistant key. `ns` groups entries for a bulk clear. */
export function cacheKey(ns: string, ...parts: (string | number)[]): string {
  return [ns, ...parts].join(":");
}

export async function cacheGet<T>(key: string): Promise<T | null> {
  try {
    await ensureReady();
    const { rows } = await pool().query<{ value: T }>(
      `SELECT value FROM cache_entries WHERE key = $1 AND expires_at > now()`,
      [key]
    );
    if (rows.length === 0) {
      stats.misses++;
      return null;
    }
    stats.hits++;
    return rows[0].value;
  } catch (err) {
    stats.errors++;
    console.warn("[cache] get failed, treating as miss:", (err as Error).message);
    return null;
  }
}

export async function cacheSet(key: string, value: unknown, ttlSeconds: number): Promise<void> {
  try {
    await ensureReady();
    await pool().query(
      `INSERT INTO cache_entries (key, value, expires_at)
       VALUES ($1, $2::jsonb, now() + ($3::text || ' seconds')::interval)
       ON CONFLICT (key) DO UPDATE
         SET value = EXCLUDED.value,
             expires_at = EXCLUDED.expires_at,
             created_at = now()`,
      [key, JSON.stringify(value), String(ttlSeconds)]
    );
    stats.sets++;
  } catch (err) {
    stats.errors++;
    console.warn("[cache] set failed:", (err as Error).message);
  }
}

export async function cacheDel(key: string): Promise<void> {
  try {
    await ensureReady();
    await pool().query(`DELETE FROM cache_entries WHERE key = $1`, [key]);
  } catch (err) {
    stats.errors++;
    console.warn("[cache] del failed:", (err as Error).message);
  }
}

/** Clears every entry in a namespace, e.g. cacheClearNs("gh:tree"). */
export async function cacheClearNs(ns: string): Promise<number> {
  try {
    await ensureReady();
    const { rowCount } = await pool().query(`DELETE FROM cache_entries WHERE key LIKE $1`, [`${ns}:%`]);
    return rowCount ?? 0;
  } catch (err) {
    stats.errors++;
    console.warn("[cache] clear failed:", (err as Error).message);
    return 0;
  }
}

/** Drops expired entries. Called opportunistically; see the sweep below. */
export async function cachePrune(): Promise<number> {
  try {
    await ensureReady();
    const { rowCount } = await pool().query(`DELETE FROM cache_entries WHERE expires_at <= now()`);
    return rowCount ?? 0;
  } catch {
    return 0;
  }
}

/**
 * Read-through: returns the cached value, otherwise calls `fn`, stores the
 * result, and returns it. A throwing `fn` is never cached.
 *
 * Concurrent misses on the same key are deduped in-process so a burst of
 * requests triggers one upstream call instead of N.
 */
const inflight = new Map<string, Promise<unknown>>();

export async function cached<T>(
  key: string,
  ttlSeconds: number,
  fn: () => Promise<T>
): Promise<T> {
  const hit = await cacheGet<T>(key);
  if (hit !== null) return hit;

  const existing = inflight.get(key);
  if (existing) return (await existing) as T;

  const task = (async () => {
    const value = await fn();
    await cacheSet(key, value, ttlSeconds);
    return value;
  })();

  inflight.set(key, task);
  try {
    return (await task) as T;
  } finally {
    inflight.delete(key);
  }
}

// Opportunistic sweep: expire rows in the background so the table doesn't grow
// without bound. Reads already ignore expired rows, so this is housekeeping only.
if (!(globalForCache as { __cwCacheSwept?: boolean }).__cwCacheSwept) {
  (globalForCache as { __cwCacheSwept?: boolean }).__cwCacheSwept = true;
  const timer = setInterval(() => {
    void cachePrune();
  }, 10 * 60 * 1000);
  if (typeof timer.unref === "function") timer.unref();
}

/** TTLs in seconds. */
export const TTL = {
  /** Repo description/stars/default branch — low churn. */
  repoMeta: 60 * 60,
  /** Commit list. Short: a new push should show up reasonably soon. */
  commits: 5 * 60,
  /** File tree — moderately stable, big payload. */
  fileTree: 15 * 60,
} as const;

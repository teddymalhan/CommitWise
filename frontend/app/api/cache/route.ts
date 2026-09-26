import { NextResponse } from "next/server";
import { cacheStats, cacheClearNs, cachePrune } from "@/lib/cache";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * Cache observability.
 *   GET  /api/cache            -> in-process hit/miss counters + live row counts
 *   POST /api/cache {clear}    -> clear a namespace, or prune expired rows
 */
export async function GET() {
  let byNamespace: { ns: string; entries: number; live: number }[] = [];
  let totalRows = 0;
  try {
    const rows = await prisma.$queryRaw<
      { ns: string; entries: bigint; live: bigint }[]
    >`
      SELECT split_part(key, ':', 1) || ':' || split_part(key, ':', 2) AS ns,
             count(*) AS entries,
             count(*) FILTER (WHERE expires_at > now()) AS live
      FROM cache_entries
      GROUP BY 1
      ORDER BY 1
    `;
    byNamespace = rows.map((r) => ({ ns: r.ns, entries: Number(r.entries), live: Number(r.live) }));
    totalRows = rows.reduce((n, r) => n + Number(r.entries), 0);
  } catch (err) {
    return NextResponse.json(
      { error: `Cache table unavailable: ${(err as Error).message}` },
      { status: 500 }
    );
  }

  return NextResponse.json({
    store: "postgres:unlogged:cache_entries",
    process: cacheStats(),
    totalRows,
    byNamespace,
  });
}

export async function POST(req: Request) {
  let body: { clear?: string } = {};
  try {
    body = await req.json();
  } catch {
    // empty body = prune only
  }

  if (!body.clear) {
    const pruned = await cachePrune();
    return NextResponse.json({ pruned });
  }

  if (body.clear === "all") {
    const removed = await cacheClearNs("");
    return NextResponse.json({ removed, cleared: "all" });
  }

  const removed = await cacheClearNs(body.clear);
  return NextResponse.json({ removed, cleared: body.clear });
}

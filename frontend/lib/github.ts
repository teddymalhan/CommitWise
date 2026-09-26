const GITHUB_API = "https://api.github.com";

import { cached, cacheKey, TTL } from "@/lib/cache";

export class GitHubError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export function parseRepoUrl(url: string): { owner: string; repo: string } | null {
  try {
    const parsed = new URL(url.trim().replace(/\.git$/, ""));
    if (parsed.hostname !== "github.com" && parsed.hostname !== "www.github.com") return null;
    const parts = parsed.pathname.split("/").filter(Boolean);
    if (parts.length < 2) return null;
    return { owner: parts[0], repo: parts[1].replace(/\.git$/, "") };
  } catch {
    return null;
  }
}

function ghHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "commitwise/1.0",
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return headers;
}

async function gh<T>(path: string): Promise<T> {
  const res = await fetch(`${GITHUB_API}${path}`, { headers: ghHeaders() });
  if (res.status === 404) throw new GitHubError("Repository not found (or it is private)", 404);
  if (res.status === 403 && res.headers.get("x-ratelimit-remaining") === "0") {
    throw new GitHubError("GitHub API rate limit hit - set GITHUB_TOKEN in .env.local to raise it", 403);
  }
  if (!res.ok) throw new GitHubError(`GitHub API error (${res.status})`, res.status);
  return (await res.json()) as T;
}

export type RepoMeta = {
  full_name: string;
  description: string | null;
  default_branch: string;
  language: string | null;
  stargazers_count: number;
};

export type CommitInfo = { sha: string; message: string; date: string };

export async function fetchRepo(owner: string, repo: string): Promise<RepoMeta> {
  return cached(cacheKey("gh:repo", owner, repo), TTL.repoMeta, () =>
    gh<RepoMeta>(`/repos/${owner}/${repo}`)
  );
}

export async function fetchCommits(
  owner: string,
  repo: string,
  branch: string,
  limit = 30
): Promise<CommitInfo[]> {
  return cached(cacheKey("gh:commits", owner, repo, branch, limit), TTL.commits, async () => {
    const data = await gh<
      { sha: string; commit: { message: string; author: { date: string } } }[]
    >(`/repos/${owner}/${repo}/commits?sha=${encodeURIComponent(branch)}&per_page=${limit}`);
    return data.map((c) => ({
      sha: c.sha,
      message: c.commit.message.split("\n")[0],
      date: c.commit.author?.date ?? "",
    }));
  });
}

/** Top-of-tree file listing, depth-limited for prompt size. */
export async function fetchFileTree(owner: string, repo: string, branch: string): Promise<string[]> {
  return cached(cacheKey("gh:tree", owner, repo, branch), TTL.fileTree, async () => {
    const data = await gh<{ tree: { path: string; type: string }[]; truncated: boolean } | null>(
      `/repos/${owner}/${repo}/git/trees/${encodeURIComponent(branch)}?recursive=1`
    );
    if (!data) return [];
    const paths = data.tree
      .filter((t) => t.type === "blob")
      .map((t) => t.path)
      .filter((p) => !p.includes("node_modules/") && !p.includes(".git/"));
    if (paths.length > 200) {
      const top = paths.filter((p) => p.split("/").length <= 2);
      const deeper = paths.filter((p) => p.split("/").length > 2).slice(0, 100);
      return [...top, ...deeper, ...(data.truncated ? ["(tree truncated)"] : [])];
    }
    return paths;
  });
}

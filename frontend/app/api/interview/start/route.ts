import { NextRequest, NextResponse } from "next/server";
import { parseRepoUrl, fetchRepo, fetchCommits, fetchFileTree, GitHubError } from "@/lib/github";
import { chatJSON, AIError } from "@/lib/ai";
import { prisma } from "@/lib/db";

export const maxDuration = 300;

type StartBody = { repoUrl?: string; role?: string; difficulty?: string; commitSha?: string };

type Generated = {
  intro: string;
  questions: {
    type: "concept" | "code" | "system_design" | "behavioral";
    prompt: string;
    context?: string;
  }[];
};

const ROLE_PROMPTS: Record<string, string> = {
  backend: "backend engineering (APIs, databases, concurrency, reliability)",
  infrastructure: "infrastructure / platform engineering (Kubernetes, distributed systems, deployment, observability)",
  fullstack: "full-stack engineering (frontend + backend integration, state, data flow)",
  general: "software engineering in the style of this repository's own domain",
};

export async function POST(req: NextRequest) {
  let body: StartBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const repoUrl = (body.repoUrl ?? "").trim();
  const role = body.role ?? "general";
  const difficulty = body.difficulty ?? "mid";
  const commitSha = body.commitSha?.trim() || undefined;

  if (!repoUrl) return NextResponse.json({ error: "repoUrl is required" }, { status: 400 });
  const parsed = parseRepoUrl(repoUrl);
  if (!parsed) return NextResponse.json({ error: "Not a valid GitHub repository URL" }, { status: 400 });

  try {
    const meta = await fetchRepo(parsed.owner, parsed.repo);
    const branch = meta.default_branch;
    const [commits, tree] = await Promise.all([
      fetchCommits(parsed.owner, parsed.repo, branch),
      fetchFileTree(parsed.owner, parsed.repo, branch),
    ]);
    if (commits.length === 0) {
      return NextResponse.json({ error: "Repository has no commits on its default branch" }, { status: 422 });
    }

    const commitContext = commitSha
      ? await buildCommitContext(parsed.owner, parsed.repo, commitSha)
      : "";

    const prompt = `You are a senior technical interviewer at a top software company.
Design a mock interview for a ${difficulty}-level candidate for a ${ROLE_PROMPTS[role] ?? ROLE_PROMPTS.general} role.
The interview is grounded in this real repository:

Repository: ${meta.full_name} (${meta.language ?? "unknown language"}, ${meta.stargazers_count} stars)
Description: ${meta.description ?? "n/a"}
Default branch: ${branch}
Commit history (newest first):
${commits.map((c, i) => `${i + 1}. ${c.sha.slice(0, 8)} - ${c.message}`).join("\n")}

File tree:
${tree.slice(0, 120).join("\n")}
${commitContext ? `\nThe candidate specifically wants to be interviewed about this commit:\n${commitContext}` : ""}

Write an introduction and 5 interview questions. Rules:
- "concept" questions probe understanding of ideas/patterns in this codebase.
- "code" questions reference a specific file or component from the file tree and ask how or why it works.
- "system_design" questions ask the candidate to design or extend part of this system.
- Exactly one question should be "behavioral" and tie to the kind of work this repo represents.
- Questions must be answerable from reading the repository, not from private knowledge.
- Do NOT include the answers in the questions.

Respond with ONLY a JSON object, no markdown fences:
{"intro": "2-3 sentence interviewer greeting referencing the actual repo",
 "questions": [{"type": "concept|code|system_design|behavioral", "prompt": "...", "context": "optional extra context shown to candidate, e.g. a file path or the commit message"}]}
Each "prompt" must be 2-4 sentences, specific to this repository.`;

    const generated = await chatJSON<Generated>(
      [
        { role: "system", content: "You generate mock interview content as strict JSON. Output only the JSON object." },
        { role: "user", content: prompt },
      ],
      { sessionId: `cw-start-${Date.now()}`, maxTokens: 2500, temperature: 0.7 }
    );

    if (!generated?.intro || !Array.isArray(generated.questions) || generated.questions.length === 0) {
      return NextResponse.json({ error: "AI returned an unexpected interview shape" }, { status: 502 });
    }

    const session = await prisma.session.create({
      data: {
        repoUrl,
        repoName: meta.full_name,
        role,
        difficulty,
        status: "active",
        questions: {
          create: generated.questions.slice(0, 8).map((q, i) => ({
            idx: i,
            type: q.type,
            prompt: q.prompt,
            context: q.context ?? null,
          })),
        },
      },
      include: { questions: { orderBy: { idx: "asc" } } },
    });

    return NextResponse.json({
      sessionId: session.id,
      repoName: meta.full_name,
      intro: generated.intro,
      total: session.questions.length,
    });
  } catch (err) {
    if (err instanceof GitHubError) {
      return NextResponse.json({ error: err.message }, { status: err.status === 404 ? 404 : 502 });
    }
    if (err instanceof AIError) {
      console.error("[interview/start] AI error:", err.message);
      return NextResponse.json({ error: `AI generation failed: ${err.message}` }, { status: 502 });
    }
    console.error("[interview/start] unexpected:", err);
    return NextResponse.json({ error: "Failed to generate interview" }, { status: 500 });
  }
}

async function buildCommitContext(owner: string, repo: string, sha: string): Promise<string> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits/${encodeURIComponent(sha)}`,
      { headers: { Accept: "application/vnd.github+json", "User-Agent": "commitwise/1.0" } }
    );
    if (!res.ok) return "";
    const data = (await res.json()) as {
      commit: { message: string };
      files?: { filename: string; status: string; additions: number; deletions: number }[];
    };
    const files = (data.files ?? [])
      .slice(0, 15)
      .map((f) => `- ${f.filename} (+${f.additions}/-${f.deletions}, ${f.status})`)
      .join("\n");
    return `Commit ${sha.slice(0, 8)}: ${data.commit.message.split("\n")[0]}\nFiles touched:\n${files}`;
  } catch {
    return "";
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { chatJSON, AIError } from "@/lib/ai";
import { cacheStats, cacheKey, cached, TTL } from "@/lib/cache";

export const maxDuration = 300;

export async function POST(req: NextRequest) {
  let body: { sessionId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const sessionId = body.sessionId;
  if (!sessionId) return NextResponse.json({ error: "sessionId is required" }, { status: 400 });

  try {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { questions: { orderBy: { idx: "asc" } } },
    });
    if (!session) return NextResponse.json({ error: "Session not found" }, { status: 404 });

    const answered = session.questions.filter((q) => q.answer);
    if (answered.length === 0) {
      return NextResponse.json({ error: "No answered questions to review" }, { status: 400 });
    }

    // Idempotent: a second POST for a session that already has a debrief replays
    // the stored review instead of paying for another LLM call.
    if (session.status === "complete" && session.summary) {
      return NextResponse.json({
        overall: session.overall,
        summary: session.summary,
        focusAreas: [],
        questions: session.questions.map((q) => ({
          idx: q.idx,
          type: q.type,
          prompt: q.prompt,
          context: q.context,
          answer: q.answer,
          rating: q.rating,
          strengths: q.strengths,
          improvements: q.improvements,
          ideal: q.ideal,
        })),
        cached: true,
      });
    }

    const transcript = answered
      .map(
        (q, i) =>
          `Q${i + 1} (${q.type}): ${q.prompt}\nA: ${(q.answer ?? "").slice(0, 2000)}\nScore: ${q.rating ?? "?"}/10`
      )
      .join("\n\n");

    const feedback = await chatJSON<{ summary: string; focusAreas: string[] }>(
      [
        {
          role: "system",
          content:
            "You are a senior interviewer writing a final interview debrief. Output only a JSON object, no fences.",
        },
        {
          role: "user",
          content: `Interview for a ${session.difficulty}-level ${session.role} role, grounded in ${session.repoName}.

${transcript}

Write a hiring-manager debrief. Respond with ONLY:
{"summary": "4-6 sentence overall assessment with a hire/no-hire lean for this level",
 "focusAreas": ["3-5 concrete study/practice areas ranked by impact"]}`,
        },
      ],
      { sessionId: `cw-finish-${sessionId}`, maxTokens: 1200, temperature: 0.5 }
    );

    const overall = Math.round(
      answered.reduce((sum, q) => sum + (q.rating ?? 0), 0) / answered.length
    );

    const updated = await prisma.session.update({
      where: { id: sessionId },
      data: { status: "complete", overall, summary: feedback.summary },
      include: { questions: { orderBy: { idx: "asc" } } },
    });

    return NextResponse.json({
      overall,
      summary: feedback.summary,
      focusAreas: feedback.focusAreas ?? [],
      questions: updated.questions.map((q) => ({
        idx: q.idx,
        type: q.type,
        prompt: q.prompt,
        context: q.context,
        answer: q.answer,
        rating: q.rating,
        strengths: q.strengths,
        improvements: q.improvements,
        ideal: q.ideal,
      })),
    });
  } catch (err) {
    if (err instanceof AIError) {
      return NextResponse.json({ error: `AI feedback failed: ${err.message}` }, { status: 502 });
    }
    console.error("[interview/finish] error:", err);
    return NextResponse.json({ error: "Failed to generate review" }, { status: 500 });
  }
}

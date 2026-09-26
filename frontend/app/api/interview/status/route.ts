import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("sessionId");
  if (!sessionId) return NextResponse.json({ error: "sessionId is required" }, { status: 400 });

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { questions: { orderBy: { idx: "asc" } } },
  });
  if (!session) return NextResponse.json({ error: "Session not found" }, { status: 404 });

  return NextResponse.json({
    repoName: session.repoName,
    role: session.role,
    difficulty: session.difficulty,
    status: session.status,
    overall: session.overall,
    summary: session.summary,
    questions: session.questions.map((q) => ({
      id: q.id,
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
}

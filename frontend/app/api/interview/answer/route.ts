import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const maxDuration = 300;

export async function POST(req: NextRequest) {
  let body: { questionId?: string; answer?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const questionId = body.questionId;
  const answer = (body.answer ?? "").trim();
  if (!questionId || !answer) {
    return NextResponse.json({ error: "questionId and answer are required" }, { status: 400 });
  }

  try {
    const question = await prisma.question.findUnique({
      where: { id: questionId },
      include: { session: true },
    });
    if (!question) return NextResponse.json({ error: "Question not found" }, { status: 404 });
    if (question.answer) {
      return NextResponse.json({ error: "Question already answered" }, { status: 409 });
    }

    const { evaluateAnswer } = await import("@/lib/evaluator");
    const evaluation = await evaluateAnswer(
      question.session.repoName,
      question.type,
      question.prompt,
      question.context ?? "",
      answer
    );

    await prisma.question.update({
      where: { id: questionId },
      data: {
        answer,
        rating: evaluation.rating,
        strengths: evaluation.strengths,
        improvements: evaluation.improvements,
        ideal: evaluation.idealAnswer,
      },
    });

    return NextResponse.json({
      rating: evaluation.rating,
      strengths: evaluation.strengths,
      improvements: evaluation.improvements,
      idealAnswer: evaluation.idealAnswer,
    });
  } catch (err) {
    console.error("[interview/answer] error:", err);
    return NextResponse.json({ error: "Failed to evaluate answer" }, { status: 500 });
  }
}

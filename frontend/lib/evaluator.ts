import { chatJSON } from "@/lib/ai";

export type Evaluation = {
  rating: number;
  strengths: string[];
  improvements: string[];
  idealAnswer: string;
};

export async function evaluateAnswer(
  repoName: string,
  type: string,
  prompt: string,
  context: string | null,
  answer: string
): Promise<Evaluation> {
  const evaluation = await chatJSON<Evaluation>(
    [
      {
        role: "system",
        content:
          "You are a strict but fair senior engineer conducting a technical interview. Grade realistically - most answers are 5-7. Output only a JSON object, no fences.",
      },
      {
        role: "user",
        content: `Interview question (${type}) about the repository ${repoName}:
${prompt}
${context ? `Context: ${context}` : ""}

Candidate's answer:
${answer.slice(0, 4000)}

Grade this answer 1-10 for a mid-level engineer. Respond with ONLY:
{"rating": <1-10>,
 "strengths": ["what was right, max 3 items"],
 "improvements": ["what was missing or wrong, max 3 items"],
 "idealAnswer": "3-5 sentence model answer grounded in the repository context"}`,
      },
    ],
    { sessionId: `cw-eval-${Date.now()}`, maxTokens: 1500, temperature: 0.3 }
  );

  return {
    rating: Math.min(10, Math.max(1, Math.round(evaluation.rating))),
    strengths: evaluation.strengths ?? [],
    improvements: evaluation.improvements ?? [],
    idealAnswer: evaluation.idealAnswer ?? "",
  };
}

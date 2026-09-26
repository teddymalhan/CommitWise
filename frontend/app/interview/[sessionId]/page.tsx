"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Flag } from "lucide-react";

type Status = {
  repoName: string;
  status: string;
  questions: {
    id: string;
    idx: number;
    type: string;
    prompt: string;
    context: string | null;
    answered: boolean;
    rating: number | null;
  }[];
};

type Evaluation = {
  rating: number;
  strengths: string[];
  improvements: string[];
  idealAnswer: string;
};

const TYPE_STYLES: Record<string, string> = {
  concept: "bg-[#5294FF] text-white",
  code: "bg-[#7A83FF] text-white",
  system_design: "bg-[#FACC00] text-black",
  behavioral: "bg-[#FF4D50] text-white",
};

export default function InterviewPage() {
  const params = useParams<{ sessionId: string }>();
  const sessionId = params.sessionId;
  const router = useRouter();

  const [status, setStatus] = useState<Status | null>(null);
  const [intro, setIntro] = useState<string>("");
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [evaluating, setEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [finishing, setFinishing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) return;
    setIntro(sessionStorage.getItem(`cw-intro-${sessionId}`) ?? "");
    fetch(`/api/interview/status?sessionId=${sessionId}`)
      .then((r) => r.json())
      .then((d: Status) => {
        if (d.questions) {
          setStatus(d);
          const firstUnanswered = d.questions.findIndex((q) => !q.answered);
          if (firstUnanswered >= 0) setCurrent(firstUnanswered);
        } else {
          setError("Interview not found");
        }
      })
      .catch(() => setError("Failed to load interview"));
  }, [sessionId]);

  const q = status?.questions[current];

  const submit = useCallback(async () => {
    if (!q || !answer.trim()) return;
    setEvaluating(true);
    setError(null);
    setEvaluation(null);
    try {
      const res = await fetch("/api/interview/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: q.id, answer }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Evaluation failed");
      setEvaluation(data);
      setStatus((prev) =>
        prev
          ? {
              ...prev,
              questions: prev.questions.map((qq) =>
                qq.id === q.id ? { ...qq, answered: true, rating: data.rating } : qq
              ),
            }
          : prev
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Evaluation failed");
    } finally {
      setEvaluating(false);
    }
  }, [q, answer]);

  function goTo(i: number) {
    setCurrent(i);
    setAnswer("");
    setEvaluation(null);
    setError(null);
  }

  async function finish() {
    setFinishing(true);
    setError(null);
    try {
      const res = await fetch("/api/interview/finish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Review generation failed");
      sessionStorage.setItem(`cw-review-${sessionId}`, JSON.stringify(data));
      router.push(`/review/${sessionId}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Review generation failed");
      setFinishing(false);
    }
  }

  if (!status || !q) {
    return (
      <main className="min-h-screen bg-secondary-background flex items-center justify-center">
        <p className="font-heading text-xl">{error ?? "Loading interview..."}</p>
      </main>
    );
  }

  const answeredCount = status.questions.filter((x) => x.answered).length;
  const allAnswered = answeredCount === status.questions.length;

  return (
    <main className="min-h-screen bg-secondary-background">
      <div className="mx-auto max-w-3xl px-6 py-10 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-heading">{status.repoName}</h1>
            <p className="text-xs font-base">Mock interview · {answeredCount}/{status.questions.length} answered</p>
          </div>
          <Button variant="reverse" size="sm" onClick={finish} disabled={finishing || answeredCount === 0}>
            <Flag className="size-4" /> {finishing ? "Writing debrief..." : "Finish & review"}
          </Button>
        </div>

        <div className="border-2 border-border bg-background shadow-shadow p-1">
          <Progress value={(answeredCount / status.questions.length) * 100} className="h-3 rounded-none" />
        </div>

        {intro && current === 0 && !q.answered && (
          <Card className="border-2 border-border bg-main text-main-foreground shadow-shadow rounded-none">
            <CardContent className="pt-4 text-sm font-base italic">{intro}</CardContent>
          </Card>
        )}

        <Card className="border-2 border-border shadow-shadow rounded-none">
          <CardHeader className="pb-2 space-y-2 border-b-2 border-border">
            <div className="flex items-center gap-2">
              <Badge className={`${TYPE_STYLES[q.type] ?? "bg-foreground text-background"} border-2 border-border`}>
                {q.type.replace("_", " ")}
              </Badge>
              <span className="text-xs font-base">Question {current + 1} of {status.questions.length}</span>
              {q.rating != null && <span className="text-xs font-heading ml-auto">{q.rating}/10</span>}
            </div>
            <CardTitle className="text-base font-base leading-relaxed">{q.prompt}</CardTitle>
            {q.context && <p className="text-xs font-base opacity-60">{q.context}</p>}
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            {q.answered ? (
              evaluation ? (
                <EvaluationCard ev={evaluation} />
              ) : (
                <p className="text-xs font-base opacity-60">
                  Already scored {q.rating}/10. Move to the next question, or finish the interview.
                </p>
              )
            ) : (
              <>
                <Textarea
                  rows={8}
                  placeholder="Type your answer as you would say it out loud..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="rounded-none border-2 border-border bg-background font-base"
                />
                <div className="flex items-center justify-between">
                  <Button disabled={!answer.trim() || evaluating} onClick={submit} className="font-heading">
                    {evaluating ? "Grading..." : "Submit answer"}
                  </Button>
                  <span className="text-xs font-base">{answer.length} chars</span>
                </div>
              </>
            )}
            {error && <p className="text-sm font-base text-destructive">{error}</p>}
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <Button variant="neutral" size="sm" disabled={current === 0} onClick={() => goTo(current - 1)}>
            <ChevronLeft className="size-4" /> Previous
          </Button>
          {current < status.questions.length - 1 ? (
            <Button variant="neutral" size="sm" onClick={() => goTo(current + 1)}>
              Next <ChevronRight className="size-4" />
            </Button>
          ) : (
            <Button size="sm" disabled={!allAnswered || finishing} onClick={finish} className="font-heading">
              {allAnswered ? "Generate debrief" : "Answer all questions to finish"}
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}

function EvaluationCard({ ev }: { ev: Evaluation }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span
          className={`text-4xl font-heading border-2 border-border px-3 py-1 shadow-shadow ${
            ev.rating >= 7 ? "bg-[#05E17A] text-black" : ev.rating >= 5 ? "bg-[#FACC00] text-black" : "bg-[#FF4D50] text-white"
          }`}
        >
          {ev.rating}/10
        </span>
        <span className="text-xs font-base">
          {ev.rating >= 7 ? "Strong answer." : ev.rating >= 5 ? "Decent, with gaps." : "Needs work."}
        </span>
      </div>
      {ev.strengths?.length > 0 && (
        <div>
          <p className="text-xs font-heading mb-1">What worked</p>
          <ul className="text-sm font-base list-disc pl-4 space-y-0.5">
            {ev.strengths.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      )}
      {ev.improvements?.length > 0 && (
        <div>
          <p className="text-xs font-heading mb-1">What was missing</p>
          <ul className="text-sm font-base list-disc pl-4 space-y-0.5">
            {ev.improvements.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      )}
      {ev.idealAnswer && (
        <div className="border-l-4 border-main pl-3">
          <p className="text-xs font-heading mb-1">Model answer</p>
          <p className="text-sm font-base leading-relaxed">{ev.idealAnswer}</p>
        </div>
      )}
    </div>
  );
}

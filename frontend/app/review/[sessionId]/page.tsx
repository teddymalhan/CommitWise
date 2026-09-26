"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ReviewData = {
  overall: number;
  summary: string;
  focusAreas: string[];
  questions: {
    idx: number;
    type: string;
    prompt: string;
    answer: string | null;
    rating: number | null;
    ideal: string | null;
  }[];
};

export default function ReviewPage() {
  const params = useParams<{ sessionId: string }>();
  const [data, setData] = useState<ReviewData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cached = sessionStorage.getItem(`cw-review-${params.sessionId}`);
    if (cached) {
      try {
        setData(JSON.parse(cached));
        return;
      } catch {
        // fall through to API
      }
    }
    fetch(`/api/interview/status?sessionId=${params.sessionId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.status !== "complete") {
          setError("This interview is not finished yet.");
          return;
        }
        setData({
          overall: d.overall ?? 0,
          summary: d.summary ?? "",
          focusAreas: [],
          questions: d.questions,
        });
      })
      .catch(() => setError("Failed to load review"));
  }, [params.sessionId]);

  if (error) {
    return (
      <main className="min-h-screen bg-secondary-background flex items-center justify-center">
        <p className="font-heading text-xl">{error}</p>
      </main>
    );
  }
  if (!data) {
    return (
      <main className="min-h-screen bg-secondary-background flex items-center justify-center">
        <p className="font-heading text-xl">Loading review...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-secondary-background">
      <div className="mx-auto max-w-3xl px-6 py-10 space-y-6">
        <div className="text-center space-y-4 pt-4">
          <p className="text-sm font-heading uppercase tracking-widest">Interview debrief</p>
          <span
            className={`inline-block border-2 border-border px-8 py-4 shadow-shadow text-6xl font-heading ${
              data.overall >= 7
                ? "bg-[#05E17A] text-black rotate-1"
                : data.overall >= 5
                  ? "bg-[#FACC00] text-black -rotate-1"
                  : "bg-[#FF4D50] text-white rotate-1"
            }`}
          >
            {data.overall}/10
          </span>
        </div>
        {data.summary && (
          <Card className="border-2 border-border shadow-shadow rounded-none">
            <CardHeader className="border-b-2 border-border bg-main text-main-foreground">
              <CardTitle className="font-heading">Hiring manager summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm font-base leading-relaxed">{data.summary}</CardContent>
          </Card>
        )}
        {data.focusAreas?.length > 0 && (
          <Card className="border-2 border-border shadow-shadow rounded-none">
            <CardHeader className="border-b-2 border-border">
              <CardTitle className="font-heading">Focus areas</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="text-sm font-base list-decimal pl-5 space-y-1">
                {data.focusAreas.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </CardContent>
          </Card>
        )}
        <div className="space-y-4">
          {data.questions.filter((q) => q.answer).map((q) => (
            <Card key={q.idx} className="border-2 border-border shadow-shadow rounded-none">
              <CardHeader className="pb-2 border-b-2 border-border space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="neutral" className="border-2 border-border">
                    {q.type.replace("_", " ")}
                  </Badge>
                  {q.rating != null && (
                    <span
                      className={`text-sm font-heading border-2 border-border px-2 ${
                        q.rating >= 7
                          ? "bg-[#05E17A] text-black"
                          : q.rating >= 5
                            ? "bg-[#FACC00] text-black"
                            : "bg-[#FF4D50] text-white"
                      }`}
                    >
                      {q.rating}/10
                    </span>
                  )}
                </div>
                <CardTitle className="text-sm font-base">{q.prompt}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-4 text-sm">
                <p className="font-base whitespace-pre-wrap">{q.answer}</p>
                {typeof q.ideal === "string" && q.ideal && (
                  <p className="font-base opacity-70 border-l-4 border-main pl-3">{q.ideal}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center pb-8">
          <Button render={<a href="/setup" />}>New interview</Button>
        </div>
      </div>
    </main>
  );
}

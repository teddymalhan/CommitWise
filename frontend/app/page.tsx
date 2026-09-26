"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Landing() {
  return (
    <main className="min-h-screen bg-secondary-background">
      <div className="mx-auto max-w-4xl px-6 py-20 space-y-12">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-heading">
            Commit<span className="text-main">Wise</span>
          </h1>
          <Button variant="neutral" size="sm" render={<Link href="/dashboard" />}>
            Old dashboard
          </Button>
        </header>

        <section className="text-center space-y-6 pt-8">
          <h2 className="text-5xl md:text-6xl font-heading tracking-tight">
            AI interviews on <span className="bg-main text-main-foreground px-2 border-2 border-border shadow-shadow inline-block -rotate-1">real code</span>
          </h2>
          <p className="text-lg font-base max-w-xl mx-auto">
            Paste a GitHub repository. Get grilled on its actual commits, files,
            and architecture — then find out what a hiring manager would say.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Button size="lg" render={<Link href="/setup" />}>
              Start an interview
            </Button>
            <Button variant="neutral" size="lg" disabled>
              5 questions · ~15 min
            </Button>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "Real repos, real questions",
              d: "The interviewer reads the repo's commit history and file tree, so the questions are about code that actually exists.",
              bg: "bg-main text-main-foreground",
            },
            {
              n: "02",
              t: "Scored per answer",
              d: "Every answer gets a 1-10 grade with strengths, gaps, and a model answer grounded in the repository.",
              bg: "bg-secondary-background text-foreground",
            },
            {
              n: "03",
              t: "Hiring debrief",
              d: "Finish the session for an overall assessment and ranked focus areas to study next.",
              bg: "bg-secondary-background text-foreground",
            },
          ].map((f) => (
            <Card key={f.n} className={`${f.bg} border-2 border-border shadow-shadow rounded-none`}>
              <CardHeader className="flex flex-row items-center justify-between">
                <span className="text-3xl font-heading opacity-50">{f.n}</span>
              </CardHeader>
              <CardContent className="space-y-2">
                <CardTitle className="font-heading text-lg">{f.t}</CardTitle>
                <p className="text-sm opacity-90">{f.d}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </main>
  );
}

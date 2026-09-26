"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Setup() {
  const router = useRouter();
  const [repoUrl, setRepoUrl] = useState("");
  const [role, setRole] = useState("backend");
  const [difficulty, setDifficulty] = useState("mid");
  const [commitSha, setCommitSha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stage, setStage] = useState("");

  async function start() {
    setError(null);
    setLoading(true);
    setStage("Fetching repository from GitHub...");
    try {
      const res = await fetch("/api/interview/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl, role, difficulty, commitSha: commitSha || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `Request failed (${res.status})`);
      sessionStorage.setItem(`cw-intro-${data.sessionId}`, data.intro);
      router.push(`/interview/${data.sessionId}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setLoading(false);
      setStage("");
    }
  }

  const valid = repoUrl.startsWith("https://github.com/") && repoUrl.split("/").length >= 4;

  return (
    <main className="min-h-screen bg-secondary-background flex items-center justify-center px-6">
      <Card className="w-full max-w-lg border-2 border-border shadow-shadow rounded-none">
        <CardHeader className="border-b-2 border-border bg-main text-main-foreground">
          <CardTitle className="text-xl font-heading">Set up your interview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 pt-6">
          <div className="space-y-2">
            <Label htmlFor="repo" className="font-heading">GitHub repository URL</Label>
            <Input
              id="repo"
              placeholder="https://github.com/user/repo"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="rounded-none font-base"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-heading">Role</Label>
              <Select value={role} onValueChange={(v) => setRole(v ?? "backend")}>
                <SelectTrigger className="rounded-none border-2 border-border font-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-none border-2 border-border">
                  <SelectItem value="backend">Backend</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="fullstack">Full-stack</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-heading">Difficulty</Label>
              <Select value={difficulty} onValueChange={(v) => setDifficulty(v ?? "mid")}>
                <SelectTrigger className="rounded-none border-2 border-border font-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-none border-2 border-border">
                  <SelectItem value="junior">Junior</SelectItem>
                  <SelectItem value="mid">Mid</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sha" className="font-heading">
              Focus commit SHA <span className="opacity-60 font-base">(optional)</span>
            </Label>
            <Input
              id="sha"
              placeholder="a368bde — digs into this commit"
              value={commitSha}
              onChange={(e) => setCommitSha(e.target.value)}
              className="rounded-none font-base"
            />
          </div>
          {error && (
            <p className="text-sm font-base bg-destructive text-white border-2 border-border px-3 py-2 shadow-shadow">
              {error}
            </p>
          )}
          <Button
            className="w-full font-heading"
            disabled={!valid || loading}
            onClick={start}
          >
            {loading ? stage || "Generating..." : "Generate interview"}
          </Button>
          {loading && <p className="text-xs text-center font-base">This takes ~20-60s.</p>}
        </CardContent>
      </Card>
    </main>
  );
}

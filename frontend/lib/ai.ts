const BASE = process.env.OPENCODE_GO_BASE_URL ?? "https://opencode.ai/zen/go/v1";
const MODEL = process.env.AI_MODEL ?? "deepseek-v4-flash";
const API_KEY = process.env.OPENCODE_GO_API_KEY ?? "";

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export class AIError extends Error {}

export async function chat(
  messages: ChatMessage[],
  opts: { sessionId: string; maxTokens?: number; temperature?: number; timeoutMs?: number } = {
    sessionId: "default",
  }
): Promise<string> {
  if (!API_KEY) throw new AIError("OPENCODE_GO_API_KEY is not set");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), opts.timeoutMs ?? 120_000);

  try {
    const res = await fetch(`${BASE}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "User-Agent": "commitwise/1.0",
        "x-opencode-session": opts.sessionId,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        max_tokens: opts.maxTokens ?? 2000,
        temperature: opts.temperature ?? 0.4,
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new AIError(`AI request failed (${res.status}): ${body.slice(0, 300)}`);
    }

    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new AIError("AI returned an empty response");
    return content;
  } finally {
    clearTimeout(timer);
  }
}

/** Calls the model and parses a JSON object out of the reply, tolerating fences/prose. */
export async function chatJSON<T>(
  messages: ChatMessage[],
  opts: Parameters<typeof chat>[1]
): Promise<T> {
  const raw = await chat(messages, opts);
  return parseJSON<T>(raw);
}

function parseJSON<T>(raw: string): T {
  const cleaned = raw
    .replace(/^[\s\S]*?```(?:json)?\s*/m, (m) => (m.includes("```") ? "" : m))
    .replace(/```[\s\S]*$/m, (m) => (m.includes("```") ? "" : m))
    .trim();

  const candidates = [cleaned, raw.trim()];

  for (const candidate of candidates) {
    try {
      return JSON.parse(candidate) as T;
    } catch {
      // fall through to bracket extraction
    }
  }

  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start !== -1 && end > start) {
    try {
      return JSON.parse(raw.slice(start, end + 1)) as T;
    } catch {
      // give up below
    }
  }

  throw new AIError("Could not parse JSON from AI response");
}

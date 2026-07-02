import { NextResponse } from "next/server";
import { completePrompt } from "@/lib/ai/openai";
import { checkRateLimit } from "@/lib/ai/rate-limit";
import { validatePrompt } from "@/lib/ai/validate-prompt";

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Request body must be a JSON object." }, { status: 400 });
  }

  const { prompt } = body as { prompt?: unknown };
  const validation = validatePrompt(prompt);

  if (!validation.valid || !validation.prompt) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const rateLimit = checkRateLimit(getClientIp(request));
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Try again later." },
      {
        status: 429,
        headers: {
          "X-RateLimit-Remaining": String(rateLimit.remaining),
          "X-RateLimit-Reset": String(rateLimit.resetAt),
        },
      },
    );
  }

  try {
    const content = await completePrompt(validation.prompt);
    return NextResponse.json(
      { content, mock: process.env.AI_MOCK_RESPONSE === "true" || !process.env.OPENAI_API_KEY },
      {
        headers: {
          "X-RateLimit-Remaining": String(rateLimit.remaining),
        },
      },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to complete prompt.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

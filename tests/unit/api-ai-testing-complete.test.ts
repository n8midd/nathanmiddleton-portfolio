import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/ai-testing/complete/route";
import { resetRateLimitStore } from "@/lib/ai/rate-limit";

vi.mock("@/lib/ai/openai", () => ({
  completePrompt: vi.fn(async (prompt: string) => `Echo: ${prompt.slice(0, 40)}`),
}));

describe("POST /api/ai-testing/complete", () => {
  beforeEach(() => {
    resetRateLimitStore();
    vi.stubEnv("OPENAI_API_KEY", "test-key");
    vi.stubEnv("AI_MOCK_RESPONSE", "false");
  });

  it("returns model content for a valid prompt", async () => {
    const response = await POST(
      new Request("http://localhost/api/ai-testing/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": "1.2.3.4" },
        body: JSON.stringify({ prompt: "List boundary tests for login" }),
      }),
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.content).toContain("Echo:");
  });

  it("rejects empty prompts", async () => {
    const response = await POST(
      new Request("http://localhost/api/ai-testing/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: "  " }),
      }),
    );

    expect(response.status).toBe(400);
  });

  it("returns 429 when rate limit is exceeded", async () => {
    const ip = "9.9.9.9";

    for (let index = 0; index < 10; index += 1) {
      await POST(
        new Request("http://localhost/api/ai-testing/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
          body: JSON.stringify({ prompt: `prompt ${index}` }),
        }),
      );
    }

    const response = await POST(
      new Request("http://localhost/api/ai-testing/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
        body: JSON.stringify({ prompt: "one more" }),
      }),
    );

    expect(response.status).toBe(429);
  });
});

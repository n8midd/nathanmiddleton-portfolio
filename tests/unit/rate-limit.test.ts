import { afterEach, describe, expect, it, vi } from "vitest";
import { AI_RATE_LIMIT_MAX } from "@/lib/ai/config";
import { checkRateLimit, resetRateLimitStore } from "@/lib/ai/rate-limit";

describe("checkRateLimit", () => {
  afterEach(() => {
    resetRateLimitStore();
    vi.useRealTimers();
  });

  it("allows requests under the limit", () => {
    const first = checkRateLimit("test-ip", 1_000);
    expect(first.allowed).toBe(true);
    expect(first.remaining).toBe(AI_RATE_LIMIT_MAX - 1);
  });

  it("blocks requests over the limit in the same window", () => {
    const now = 5_000;
    for (let index = 0; index < AI_RATE_LIMIT_MAX; index += 1) {
      checkRateLimit("blocked-ip", now);
    }

    const blocked = checkRateLimit("blocked-ip", now + 1);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
  });

  it("resets after the window elapses", () => {
    const start = 10_000;
    for (let index = 0; index < AI_RATE_LIMIT_MAX; index += 1) {
      checkRateLimit("reset-ip", start);
    }

    const afterWindow = checkRateLimit("reset-ip", start + 60 * 60 * 1000);
    expect(afterWindow.allowed).toBe(true);
  });
});

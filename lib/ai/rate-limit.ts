import { AI_RATE_LIMIT_MAX, AI_RATE_LIMIT_WINDOW_MS } from "@/lib/ai/config";

interface RateLimitEntry {
  count: number;
  windowStart: number;
}

const store = new Map<string, RateLimitEntry>();

export function checkRateLimit(key: string, now = Date.now()): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
} {
  const entry = store.get(key);

  if (!entry || now - entry.windowStart >= AI_RATE_LIMIT_WINDOW_MS) {
    store.set(key, { count: 1, windowStart: now });
    return {
      allowed: true,
      remaining: AI_RATE_LIMIT_MAX - 1,
      resetAt: now + AI_RATE_LIMIT_WINDOW_MS,
    };
  }

  if (entry.count >= AI_RATE_LIMIT_MAX) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.windowStart + AI_RATE_LIMIT_WINDOW_MS,
    };
  }

  entry.count += 1;
  store.set(key, entry);

  return {
    allowed: true,
    remaining: AI_RATE_LIMIT_MAX - entry.count,
    resetAt: entry.windowStart + AI_RATE_LIMIT_WINDOW_MS,
  };
}

export function resetRateLimitStore(): void {
  store.clear();
}

import { describe, expect, it } from "vitest";
import { AI_MAX_PROMPT_LENGTH } from "@/lib/ai/config";
import { validatePrompt } from "@/lib/ai/validate-prompt";

describe("validatePrompt", () => {
  it("accepts a non-empty trimmed prompt", () => {
    const result = validatePrompt("  Generate test cases for login  ");
    expect(result.valid).toBe(true);
    expect(result.prompt).toBe("Generate test cases for login");
  });

  it("rejects empty prompts", () => {
    const result = validatePrompt("   ");
    expect(result.valid).toBe(false);
    expect(result.error).toContain("empty");
  });

  it("rejects prompts over the max length", () => {
    const result = validatePrompt("a".repeat(AI_MAX_PROMPT_LENGTH + 1));
    expect(result.valid).toBe(false);
    expect(result.error).toContain("maximum length");
  });

  it("rejects non-string input", () => {
    expect(validatePrompt(42).valid).toBe(false);
  });
});

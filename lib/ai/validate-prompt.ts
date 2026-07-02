import { AI_MAX_PROMPT_LENGTH } from "@/lib/ai/config";

export interface PromptValidationResult {
  valid: boolean;
  prompt?: string;
  error?: string;
}

export function validatePrompt(input: unknown): PromptValidationResult {
  if (typeof input !== "string") {
    return { valid: false, error: "Prompt must be a string." };
  }

  const prompt = input.trim();

  if (!prompt) {
    return { valid: false, error: "Prompt cannot be empty." };
  }

  if (prompt.length > AI_MAX_PROMPT_LENGTH) {
    return {
      valid: false,
      error: `Prompt exceeds maximum length of ${AI_MAX_PROMPT_LENGTH} characters.`,
    };
  }

  return { valid: true, prompt };
}

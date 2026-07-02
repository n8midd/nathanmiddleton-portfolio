export const AI_MAX_PROMPT_LENGTH = 4000;
export const AI_MAX_OUTPUT_TOKENS = 1024;
export const AI_MODEL = "gpt-4o-mini";
export const AI_RATE_LIMIT_MAX = 10;
export const AI_RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

export const AI_MOCK_RESPONSE_TEXT =
  "Mock QA assistant response: prioritize getByRole locators, avoid hard-coded waits, and review generated test cases for auth and data-isolation gaps before adding them to your suite.";

export function isAiMockMode(): boolean {
  return process.env.AI_MOCK_RESPONSE === "true" || !process.env.OPENAI_API_KEY;
}

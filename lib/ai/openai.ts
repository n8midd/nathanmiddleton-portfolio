import OpenAI from "openai";
import {
  AI_MAX_OUTPUT_TOKENS,
  AI_MOCK_RESPONSE_TEXT,
  AI_MODEL,
  isAiMockMode,
} from "@/lib/ai/config";
import { promptLabSystemPrompt } from "@/lib/data/ai-testing";

let client: OpenAI | null = null;

function getClient(): OpenAI {
  if (!client) {
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return client;
}

export async function completePrompt(userPrompt: string): Promise<string> {
  if (isAiMockMode()) {
    return AI_MOCK_RESPONSE_TEXT;
  }

  const response = await getClient().chat.completions.create({
    model: AI_MODEL,
    max_tokens: AI_MAX_OUTPUT_TOKENS,
    messages: [
      { role: "system", content: promptLabSystemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  const content = response.choices[0]?.message?.content?.trim();
  if (!content) {
    throw new Error("The model returned an empty response.");
  }

  return content;
}

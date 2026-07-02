import { describe, expect, it } from "vitest";
import {
  ALL_CATEGORIES_ID,
  aiTestingCategories,
  aiTestingTopics,
  assemblePrompt,
  filterTopics,
  getPromptTemplateById,
  getTopicById,
  promptLabHumanReviewNotice,
  promptLabIntro,
  promptQualityCriteria,
  scorePromptOutput,
} from "@/lib/data/ai-testing";

describe("ai-testing data", () => {
  it("defines categories and topics", () => {
    expect(aiTestingCategories.length).toBeGreaterThan(0);
    expect(aiTestingTopics.length).toBeGreaterThan(0);
  });

  it("assigns every topic to a valid category", () => {
    const categoryIds = new Set(aiTestingCategories.map((category) => category.id));
    expect(aiTestingTopics.every((topic) => categoryIds.has(topic.categoryId))).toBe(true);
  });

  it("filters topics by category and search query", () => {
    const generationOnly = filterTopics("", "generation");
    expect(generationOnly.every((topic) => topic.categoryId === "generation")).toBe(true);

    const matches = filterTopics("hallucination", ALL_CATEGORIES_ID);
    expect(matches.length).toBeGreaterThan(0);
    expect(getTopicById("missing")).toBeUndefined();
  });

  it("assembles prompt templates with field values", () => {
    const template = getPromptTemplateById("test-case-generation");
    expect(template).toBeDefined();

    const prompt = assemblePrompt(template!, {
      featureDescription: "User login with MFA",
    });
    expect(prompt).toContain("User login with MFA");
    expect(prompt).not.toContain("{{featureDescription}}");
  });

  it("scores prompt output ratings", () => {
    const criteria = [
      { id: "a", label: "A", description: "A" },
      { id: "b", label: "B", description: "B" },
    ];
    const score = scorePromptOutput(criteria, { a: "pass", b: "fail" });
    expect(score.passed).toBe(1);
    expect(score.total).toBe(2);
    expect(score.rated).toBe(2);
  });

  it("defines prompt lab messaging", () => {
    expect(promptLabIntro).toContain("judgment");
    expect(promptLabHumanReviewNotice).toContain("Human review");
    expect(promptQualityCriteria.length).toBeGreaterThan(0);
  });
});

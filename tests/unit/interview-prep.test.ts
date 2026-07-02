import { describe, expect, it } from "vitest";
import {
  ALL_CATEGORIES_ID,
  filterQuestions,
  getQuestionById,
  getQuestionCountByCategory,
  interviewCategories,
  interviewQuestions,
} from "@/lib/data/interview-prep";

describe("interview-prep data", () => {
  it("defines interview categories and questions", () => {
    expect(interviewCategories.length).toBeGreaterThan(0);
    expect(interviewQuestions.length).toBeGreaterThan(0);
  });

  it("assigns every question to a valid category", () => {
    const categoryIds = new Set(interviewCategories.map((category) => category.id));
    expect(interviewQuestions.every((question) => categoryIds.has(question.categoryId))).toBe(true);
  });

  it("filters questions by category", () => {
    const playwrightOnly = filterQuestions("", "playwright");
    expect(playwrightOnly.every((question) => question.categoryId === "playwright")).toBe(true);
    expect(playwrightOnly.length).toBeGreaterThan(0);
  });

  it("searches questions by answer text", () => {
    const matches = filterQuestions("parallel", ALL_CATEGORIES_ID);
    expect(matches.length).toBeGreaterThan(0);
    expect(getQuestionById("missing")).toBeUndefined();
    expect(getQuestionCountByCategory("playwright")).toBeGreaterThan(0);
  });
});

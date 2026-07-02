import { describe, expect, it } from "vitest";
import {
  ALL_CATEGORIES_ID,
  codeSnippets,
  filterSnippets,
  getSnippetById,
  snippetCategories,
} from "@/lib/data/snippets";

describe("snippets data", () => {
  it("defines eleven snippet categories", () => {
    expect(snippetCategories).toHaveLength(11);
  });

  it("defines at least one snippet per category", () => {
    for (const category of snippetCategories) {
      const matches = codeSnippets.filter((snippet) => snippet.categoryId === category.id);
      expect(matches.length).toBeGreaterThan(0);
    }
  });

  it("filters snippets by category", () => {
    const playwrightOnly = filterSnippets("", "playwright");
    expect(playwrightOnly.every((snippet) => snippet.categoryId === "playwright")).toBe(true);
    expect(playwrightOnly.length).toBeGreaterThan(0);
  });

  it("searches snippets by title and code", () => {
    const matches = filterSnippets("page.goto", ALL_CATEGORIES_ID);
    expect(matches.some((snippet) => snippet.code.includes("page.goto"))).toBe(true);
    expect(getSnippetById("missing")).toBeUndefined();
  });
});

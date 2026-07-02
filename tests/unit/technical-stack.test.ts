import { describe, expect, it } from "vitest";
import {
  ALL_CATEGORIES_ID,
  filterStackTools,
  getToolById,
  stackCategories,
  stackTools,
} from "@/lib/data/technical-stack";

describe("technical-stack data", () => {
  it("defines five stack categories", () => {
    expect(stackCategories).toHaveLength(5);
  });

  it("assigns every tool to a valid category", () => {
    const categoryIds = new Set(stackCategories.map((category) => category.id));
    expect(stackTools.every((tool) => categoryIds.has(tool.categoryId))).toBe(true);
  });

  it("filters tools by category", () => {
    const playwrightOnly = filterStackTools("", "automation");
    expect(playwrightOnly.every((tool) => tool.categoryId === "automation")).toBe(true);
    expect(playwrightOnly.length).toBeGreaterThan(0);
  });

  it("searches tools by name and rationale", () => {
    const matches = filterStackTools("playwright", ALL_CATEGORIES_ID);
    expect(matches.some((tool) => tool.name.toLowerCase().includes("playwright"))).toBe(true);
    expect(getToolById("playwright")?.name).toBe("Playwright");
    expect(getToolById("missing")).toBeUndefined();
  });
});

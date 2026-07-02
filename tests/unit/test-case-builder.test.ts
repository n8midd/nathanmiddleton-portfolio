import { describe, expect, it } from "vitest";
import {
  formatTestCasesForCopy,
  generateTestCases,
  testCaseCategories,
} from "@/lib/data/test-case-builder";

describe("generateTestCases", () => {
  it("returns cases for all six categories", () => {
    const cases = generateTestCases("Login Page");

    for (const category of testCaseCategories) {
      expect(cases[category.id].length).toBeGreaterThan(0);
    }
  });

  it("substitutes the feature name into each case", () => {
    const cases = generateTestCases("Login Page");
    const allCases = testCaseCategories.flatMap((category) => cases[category.id]);

    expect(allCases.every((testCase) => testCase.includes("Login Page"))).toBe(true);
    expect(allCases.some((testCase) => testCase.includes("{{feature}}"))).toBe(false);
  });

  it("uses a fallback label when input is empty", () => {
    const cases = generateTestCases("");
    expect(cases.positive[0]).toContain("the feature");
  });

  it("formats output for clipboard copy", () => {
    const feature = "Checkout flow";
    const cases = generateTestCases(feature);
    const formatted = formatTestCasesForCopy(feature, cases);

    expect(formatted).toContain("Test cases for: Checkout flow");
    expect(formatted).toContain("Positive Tests");
    expect(formatted).toContain("Security Tests");
  });
});

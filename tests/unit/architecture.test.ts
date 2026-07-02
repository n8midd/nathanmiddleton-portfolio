import { describe, expect, it } from "vitest";
import {
  architecturePatterns,
  getPatternByTitle,
  getPipelineStepByLabel,
  pipelineSteps,
} from "@/lib/data/architecture";

describe("architecture data", () => {
  it("defines pipeline steps and architecture patterns", () => {
    expect(pipelineSteps.length).toBeGreaterThan(0);
    expect(architecturePatterns.length).toBeGreaterThan(0);
  });

  it("looks up pipeline steps by label", () => {
    expect(getPipelineStepByLabel("Playwright")?.label).toBe("Playwright");
    expect(getPipelineStepByLabel("Missing")).toBeUndefined();
  });

  it("looks up patterns by title", () => {
    const pom = getPatternByTitle("Page Object Model");
    expect(pom?.practices.length).toBeGreaterThan(0);
    expect(getPatternByTitle("Missing")).toBeUndefined();
  });
});

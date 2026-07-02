import { describe, expect, it } from "vitest";
import { labTestStats } from "@/lib/data/lab-test-stats.generated";

describe("lab test stats", () => {
  it("defines positive test counts", () => {
    expect(labTestStats.unitTests).toBeGreaterThan(0);
    expect(labTestStats.e2eTests).toBeGreaterThan(0);
    expect(labTestStats.totalTests).toBe(labTestStats.unitTests + labTestStats.e2eTests);
  });

  it("includes smoke and regression splits", () => {
    expect(labTestStats.e2eSmokeTests).toBeGreaterThan(0);
    expect(labTestStats.e2eRegressionTests).toBeGreaterThan(0);
    expect(labTestStats.e2eSmokeTests + labTestStats.e2eRegressionTests).toBe(labTestStats.e2eTests);
  });

  it("records generation timestamp", () => {
    expect(labTestStats.generatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });
});

import { describe, expect, it } from "vitest";
import {
  automationCoverage,
  automationCoverageIsDemo,
  automationCoverageLabel,
  commandCenterExperience,
  commandCenterMetrics,
  commandCenterQuickLinks,
  commandCenterSkills,
} from "@/lib/data/command-center";
import { labTestStats } from "@/lib/data/lab-test-stats.generated";

describe("command-center data", () => {
  it("defines experience headline and live lab metrics", () => {
    expect(commandCenterExperience).toContain("years");
    expect(commandCenterMetrics).toHaveLength(4);
    expect(commandCenterMetrics.every((metric) => metric.dataSource === "live")).toBe(true);
  });

  it("uses generated test counts in metrics", () => {
    const unitMetric = commandCenterMetrics.find((metric) => metric.label === "Unit Tests");
    expect(unitMetric?.value).toBe(String(labTestStats.unitTests));
    const e2eMetric = commandCenterMetrics.find((metric) => metric.label === "E2E Tests");
    expect(e2eMetric?.value).toBe(String(labTestStats.e2eTests));
  });

  it("defines skills and quick links", () => {
    expect(commandCenterSkills.length).toBeGreaterThan(0);
    expect(commandCenterQuickLinks.length).toBeGreaterThan(0);
    expect(commandCenterQuickLinks.every((link) => link.href && link.label)).toBe(true);
  });

  it("marks automation coverage as demo data", () => {
    expect(automationCoverage).toBeGreaterThan(0);
    expect(automationCoverageLabel).toBe("Automation Coverage");
    expect(automationCoverageIsDemo).toBe(true);
  });
});

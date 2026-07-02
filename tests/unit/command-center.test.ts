import { describe, expect, it } from "vitest";
import {
  automationCoverage,
  automationCoverageLabel,
  commandCenterExperience,
  commandCenterMetrics,
  commandCenterQuickLinks,
  commandCenterSkills,
} from "@/lib/data/command-center";

describe("command-center data", () => {
  it("defines experience headline and metrics", () => {
    expect(commandCenterExperience).toContain("years");
    expect(commandCenterMetrics.length).toBeGreaterThan(0);
    expect(commandCenterMetrics.every((metric) => metric.label && (metric.value || metric.status))).toBe(
      true,
    );
  });

  it("defines skills and quick links", () => {
    expect(commandCenterSkills.length).toBeGreaterThan(0);
    expect(commandCenterQuickLinks.length).toBeGreaterThan(0);
    expect(commandCenterQuickLinks.every((link) => link.href && link.label)).toBe(true);
  });

  it("exposes automation coverage KPI", () => {
    expect(automationCoverage).toBeGreaterThan(0);
    expect(automationCoverageLabel).toBe("Automation Coverage");
  });
});

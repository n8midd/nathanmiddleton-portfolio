import { describe, expect, it } from "vitest";
import {
  artilleryImplSteps,
  artilleryIntro,
  artilleryResults,
  getArtilleryImplStepById,
  getArtilleryResultKpis,
} from "@/lib/data/artillery";

describe("artillery data", () => {
  it("defines intro and implementation steps", () => {
    expect(artilleryIntro.length).toBeGreaterThan(40);
    expect(artilleryImplSteps.length).toBeGreaterThanOrEqual(5);
    expect(artilleryImplSteps.every((step) => step.id && step.detail)).toBe(true);
  });

  it("looks up implementation steps by id", () => {
    expect(getArtilleryImplStepById("playwright-flows")?.repoNote).toContain("flows.ts");
    expect(getArtilleryImplStepById("missing")).toBeUndefined();
  });

  it("exposes generated live results", () => {
    expect(artilleryResults.dataSource).toBe("live");
    expect(artilleryResults.vusersCreated).toBeGreaterThan(0);
    expect(artilleryResults.vusersCompleted).toBe(artilleryResults.vusersCreated);
    expect(artilleryResults.vusersFailed).toBe(0);
    expect(artilleryResults.scenarios.length).toBeGreaterThan(0);
    expect(artilleryResults.webVitals.length).toBeGreaterThan(0);
  });

  it("builds result KPIs from generated data", () => {
    const kpis = getArtilleryResultKpis();
    expect(kpis.some((kpi) => kpi.label === "VUs created")).toBe(true);
    expect(kpis.every((kpi) => kpi.dataSource === "live")).toBe(true);
  });
});

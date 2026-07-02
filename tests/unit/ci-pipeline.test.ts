import { describe, expect, it } from "vitest";
import {
  ciPipelineSteps,
  getCiPipelineStepById,
  getCiPipelineStepByLabel,
} from "@/lib/data/ci-pipeline";

describe("ci-pipeline data", () => {
  it("defines a linear pipeline from developer to production", () => {
    expect(ciPipelineSteps.length).toBeGreaterThanOrEqual(8);
    expect(ciPipelineSteps[0]?.label).toBe("Developer");
    expect(ciPipelineSteps.at(-1)?.label).toBe("Production");
  });

  it("looks up steps by id and label", () => {
    expect(getCiPipelineStepById("unit-tests")?.label).toBe("Unit Tests");
    expect(getCiPipelineStepByLabel("Deploy")?.id).toBe("deploy");
    expect(getCiPipelineStepById("missing")).toBeUndefined();
  });

  it("includes practices on test stages", () => {
    const uiTests = getCiPipelineStepByLabel("UI Tests");
    expect(uiTests?.practices.length).toBeGreaterThan(0);
  });
});

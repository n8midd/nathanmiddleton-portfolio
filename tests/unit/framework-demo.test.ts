import { describe, expect, it } from "vitest";
import {
  frameworkSections,
  getSectionById,
  getSectionByTitle,
} from "@/lib/data/framework-demo";

describe("framework-demo data", () => {
  it("defines framework sections", () => {
    expect(frameworkSections.length).toBeGreaterThanOrEqual(7);
  });

  it("looks up sections by id and title", () => {
    expect(getSectionById("page-objects")?.title).toBe("Page Objects");
    expect(getSectionByTitle("CI Integration")?.status).toBe("live");
    expect(getSectionById("missing")).toBeUndefined();
  });
});

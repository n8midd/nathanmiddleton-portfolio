import { describe, expect, it } from "vitest";
import { careerRoles, formatDateRange, getRoleById } from "@/lib/data/resume";

describe("resume data", () => {
  it("defines career roles with highlights", () => {
    expect(careerRoles.length).toBeGreaterThan(0);
    expect(careerRoles.every((role) => role.highlights.length > 0)).toBe(true);
  });

  it("formats date ranges with present roles", () => {
    expect(formatDateRange("Jan 2020", null)).toBe("Jan 2020 – Present");
    expect(formatDateRange("Jun 2009", "Jan 2010")).toBe("Jun 2009 – Jan 2010");
  });

  it("looks up roles by id", () => {
    expect(getRoleById("sirona-medical")?.company).toBe("Sirona Medical");
    expect(getRoleById("missing")).toBeUndefined();
  });
});

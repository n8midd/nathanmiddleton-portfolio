import { describe, expect, it } from "vitest";
import { contactCta, contactOfferings } from "@/lib/data/contact";

describe("contact data", () => {
  it("defines six contact offerings with unique ids", () => {
    expect(contactOfferings).toHaveLength(6);
    const ids = contactOfferings.map((offering) => offering.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(contactOfferings.every((offering) => offering.label.length > 0)).toBe(true);
  });

  it("defines CTA copy", () => {
    expect(contactCta.headline).toBe("Let's talk.");
    expect(contactCta.subtext).toContain("SDET");
  });
});

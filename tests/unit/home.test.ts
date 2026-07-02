import { describe, expect, it } from "vitest";
import {
  getHomeSections,
  homeFeaturedLinks,
  homeHero,
  homePriorityLinks,
  homeSectionSummaries,
} from "@/lib/data/home";
import { navGroups } from "@/lib/site-config";

describe("home data", () => {
  it("defines hero copy", () => {
    expect(homeHero).toContain("Quality Engineering Lab");
  });

  it("defines summaries for all non-overview nav groups", () => {
    const contentGroups = navGroups.filter((group) => group !== "Overview");
    for (const group of contentGroups) {
      expect(homeSectionSummaries[group as keyof typeof homeSectionSummaries].length).toBeGreaterThan(0);
    }
  });

  it("includes resume and contact in priority links", () => {
    const ids = homePriorityLinks.map((link) => link.id);
    expect(ids).toContain("resume");
    expect(ids).toContain("contact");
    expect(ids).toContain("email");
  });

  it("groups live features by nav section", () => {
    const sections = getHomeSections();
    expect(sections).toHaveLength(4);
    expect(sections.every((section) => section.features.length > 0)).toBe(true);
    expect(sections.some((section) => section.features.some((feature) => feature.slug === "home"))).toBe(
      false,
    );
  });

  it("lists featured start-here links", () => {
    expect(homeFeaturedLinks.length).toBeGreaterThanOrEqual(4);
    expect(homeFeaturedLinks.some((link) => link.href === "/command-center")).toBe(true);
  });
});

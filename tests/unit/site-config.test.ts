import { describe, expect, it } from "vitest";
import {
  features,
  getFeatureByHref,
  getFeatureBySlug,
  getNavFeatures,
  navGroups,
  plannedArticles,
  siteConfig,
} from "@/lib/site-config";

describe("site-config", () => {
  it("defines site metadata", () => {
    expect(siteConfig.name).toBe("Quality Engineering Lab");
    expect(siteConfig.author).toBe("Nathan Middleton");
  });

  it("defines four navigation groups", () => {
    expect(navGroups).toEqual(["Lab", "Content", "Leadership", "Tools"]);
  });

  it("registers twenty site features", () => {
    expect(features).toHaveLength(20);
    expect(features.every((feature) => feature.href.startsWith("/"))).toBe(true);
  });

  it("looks up features by href and slug", () => {
    expect(getFeatureByHref("/snippets")?.label).toBe("Code Snippet Library");
    expect(getFeatureBySlug("api-explorer")?.status).toBe("live");
    expect(getFeatureByHref("/missing")).toBeUndefined();
    expect(getFeatureBySlug("missing")).toBeUndefined();
  });

  it("excludes hidden nav features", () => {
    const navFeatures = getNavFeatures();
    expect(navFeatures.length).toBeLessThan(features.length);
    expect(navFeatures.some((feature) => feature.slug === "lessons")).toBe(false);
    expect(navFeatures.some((feature) => feature.slug === "snippets")).toBe(true);
  });

  it("lists seven planned article titles", () => {
    expect(plannedArticles).toHaveLength(7);
  });
});

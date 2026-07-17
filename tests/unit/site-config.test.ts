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

  it("defines five navigation groups with Overview first", () => {
    expect(navGroups).toEqual(["Overview", "Lab", "Content", "Leadership", "Tools"]);
  });

  it("registers twenty-two site features", () => {
    expect(features).toHaveLength(22);
    expect(features.every((feature) => feature.href.startsWith("/"))).toBe(true);
  });

  it("registers Artillery Performance in the Lab group", () => {
    const artillery = getFeatureBySlug("artillery");
    expect(artillery?.href).toBe("/artillery");
    expect(artillery?.group).toBe("Lab");
    expect(artillery?.status).toBe("live");
  });

  it("maps Home to root and Command Center to its own route", () => {
    expect(getFeatureByHref("/")?.slug).toBe("home");
    expect(getFeatureByHref("/command-center")?.slug).toBe("command-center");
    expect(getFeatureBySlug("command-center")?.href).toBe("/command-center");
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

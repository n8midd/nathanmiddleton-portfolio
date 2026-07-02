import { describe, expect, it } from "vitest";
import { createPageMetadata } from "@/lib/page-metadata";
import { getFeatureBySlug, siteConfig } from "@/lib/site-config";

describe("createPageMetadata", () => {
  it("builds title and description from a site feature", () => {
    const feature = getFeatureBySlug("snippets");
    expect(feature).toBeDefined();

    const metadata = createPageMetadata(feature!);
    expect(metadata.title).toBe(`Code Snippet Library | ${siteConfig.name}`);
    expect(metadata.description).toBe(feature!.description);
  });
});

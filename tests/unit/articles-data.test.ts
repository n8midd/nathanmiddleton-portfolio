import { describe, expect, it } from "vitest";
import {
  articleManifest,
  getManifestEntryBySlug,
  getUnpublishedPlannedTitles,
} from "@/lib/data/articles";

describe("articles manifest data", () => {
  it("lists seven published manifest entries", () => {
    expect(articleManifest).toHaveLength(7);
    expect(articleManifest.every((entry) => entry.status === "published")).toBe(true);
  });

  it("looks up manifest entries by slug", () => {
    const entry = getManifestEntryBySlug("when-not-to-automate");
    expect(entry?.title).toContain("When NOT to Automate");
    expect(getManifestEntryBySlug("missing")).toBeUndefined();
  });

  it("returns planned titles not yet published", () => {
    const publishedTitles = articleManifest.map((entry) => entry.title);
    const remaining = getUnpublishedPlannedTitles(publishedTitles);
    expect(remaining).toHaveLength(0);
  });

  it("returns unpublished planned titles when some are missing", () => {
    const remaining = getUnpublishedPlannedTitles(["Only One Title"]);
    expect(remaining.length).toBeGreaterThan(0);
  });
});

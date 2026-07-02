import { describe, expect, it } from "vitest";
import { getAllLeadershipTopics, getLeadershipTopicBySlug } from "@/lib/leadership";

describe("leadership loader", () => {
  it("loads all MDX leadership topics from content directory", () => {
    const topics = getAllLeadershipTopics();
    expect(topics.length).toBe(10);
    expect(topics.every((topic) => topic.slug && topic.title)).toBe(true);
  });

  it("sorts topics alphabetically by title", () => {
    const topics = getAllLeadershipTopics();
    for (let index = 1; index < topics.length; index += 1) {
      expect(
        topics[index - 1]!.title.localeCompare(topics[index]!.title),
      ).toBeLessThanOrEqual(0);
    }
  });

  it("loads topic content by slug", () => {
    const topic = getLeadershipTopicBySlug("coaching");
    expect(topic).not.toBeNull();
    expect(topic!.content.length).toBeGreaterThan(0);
    expect(topic!.categoryId.length).toBeGreaterThan(0);
  });

  it("returns null for missing slugs", () => {
    expect(getLeadershipTopicBySlug("does-not-exist")).toBeNull();
  });
});

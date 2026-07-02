import { describe, expect, it } from "vitest";
import {
  ALL_CATEGORIES_ID,
  filterLeadershipTopics,
  getCategoryById,
  leadershipCategories,
} from "@/lib/data/qa-leadership";
import type { LeadershipTopicMeta } from "@/lib/leadership";

const sampleTopics: LeadershipTopicMeta[] = [
  {
    slug: "coaching",
    title: "Coaching Engineers",
    summary: "Grow SDET skills through pairing and feedback.",
    categoryId: "people",
    practices: ["Pair on triage", "Weekly 1:1s"],
    pitfalls: ["Micromanaging test scripts"],
    status: "published",
  },
  {
    slug: "roadmaps",
    title: "Quality Roadmaps",
    summary: "Align testing investments with product priorities.",
    categoryId: "strategy",
    practices: ["Quarterly planning", "Risk-based prioritization"],
    pitfalls: ["Promising 100% automation"],
    status: "published",
  },
];

describe("qa-leadership data", () => {
  it("defines leadership categories", () => {
    expect(leadershipCategories.length).toBeGreaterThan(0);
    expect(getCategoryById("people")?.label).toBeTruthy();
  });

  it("filters topics by category", () => {
    const peopleOnly = filterLeadershipTopics(sampleTopics, "", "people");
    expect(peopleOnly).toHaveLength(1);
    expect(peopleOnly[0]?.slug).toBe("coaching");
  });

  it("searches topics by title and practices", () => {
    const matches = filterLeadershipTopics(sampleTopics, "roadmap", ALL_CATEGORIES_ID);
    expect(matches).toHaveLength(1);
    expect(matches[0]?.slug).toBe("roadmaps");
  });
});

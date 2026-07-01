import type { LeadershipTopicMeta } from "@/lib/leadership";

export const ALL_CATEGORIES_ID = "all" as const;

export interface LeadershipCategory {
  id: string;
  label: string;
  description: string;
}

export const leadershipCategories: LeadershipCategory[] = [
  {
    id: "people",
    label: "People & Teams",
    description: "Hiring, mentoring, coaching, and building quality-focused teams.",
  },
  {
    id: "strategy",
    label: "Strategy & Risk",
    description: "Test strategy, risk assessment, and quality roadmaps.",
  },
  {
    id: "metrics",
    label: "Metrics & Reporting",
    description: "Quality metrics and executive reporting that drive decisions.",
  },
  {
    id: "communication",
    label: "Communication",
    description: "Stakeholder communication and alignment across engineering.",
  },
];

export function getCategoryById(id: string): LeadershipCategory | undefined {
  return leadershipCategories.find((category) => category.id === id);
}

export function filterLeadershipTopics(
  topics: LeadershipTopicMeta[],
  query: string,
  categoryId: string | typeof ALL_CATEGORIES_ID = ALL_CATEGORIES_ID,
): LeadershipTopicMeta[] {
  const normalizedQuery = query.trim().toLowerCase();
  const categoryTopics =
    categoryId === ALL_CATEGORIES_ID
      ? topics
      : topics.filter((topic) => topic.categoryId === categoryId);

  if (!normalizedQuery) {
    return categoryTopics;
  }

  return categoryTopics.filter((topic) => {
    const category = getCategoryById(topic.categoryId);
    const haystack = [
      topic.title,
      topic.summary,
      ...topic.practices,
      ...topic.pitfalls,
      category?.label ?? "",
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

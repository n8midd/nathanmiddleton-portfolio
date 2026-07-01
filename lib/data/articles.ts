import { plannedArticles } from "@/lib/site-config";

export interface ArticleManifestEntry {
  slug: string;
  title: string;
  keyHeading: string;
  date: string;
  status: "published";
}

export const articleManifest: ArticleManifestEntry[] = [
  {
    slug: "why-90-percent-automation-coverage-is-a-bad-goal",
    title: "Why 90% Test Automation Coverage Is One of the Worst Goals You Can Set",
    keyHeading: "The coverage trap",
    date: "2026-06-30",
    status: "published",
  },
  {
    slug: "when-not-to-automate",
    title: "When NOT to Automate: The Most Valuable Test Might Be the One You Never Write",
    keyHeading: "Every Automated Test Is a Long-Term Commitment",
    date: "2026-06-30",
    status: "published",
  },
  {
    slug: "why-flaky-tests-destroy-engineering-teams",
    title: "Why Flaky Tests Destroy Engineering Teams (It's Not Just About Broken Tests)",
    keyHeading: "The trust tax",
    date: "2026-06-30",
    status: "published",
  },
  {
    slug: "how-i-reduced-test-runtime-from-6-hours-to-30-minutes",
    title: "How I Reduced a 6-Hour Test Suite to 30 Minutes (Without Deleting Quality)",
    keyHeading: "The First Mistake Was Assuming We Knew the Problem",
    date: "2026-06-30",
    status: "published",
  },
  {
    slug: "shift-left-testing-explained",
    title: "Shift Left Testing Isn't About Testing Earlier—It's About Building Better Software",
    keyHeading: "The Biggest Misunderstanding About Shift Left",
    date: "2026-06-30",
    status: "published",
  },
  {
    slug: "building-trust-in-automation",
    title: "Building Trust in Test Automation: Why Green Builds Don't Mean You're Winning",
    keyHeading: "Automation Doesn't Create Trust—Consistency Does",
    date: "2026-06-30",
    status: "published",
  },
  {
    slug: "automation-roi-calculator",
    title: "Your Automation ROI Calculator Is Probably Wrong",
    keyHeading: "We Love Simple Numbers",
    date: "2026-06-30",
    status: "published",
  },
];

export function getUnpublishedPlannedTitles(publishedTitles: string[]): string[] {
  const published = new Set(publishedTitles);
  return plannedArticles.filter((title) => !published.has(title));
}

export function getManifestEntryBySlug(slug: string): ArticleManifestEntry | undefined {
  return articleManifest.find((entry) => entry.slug === slug);
}

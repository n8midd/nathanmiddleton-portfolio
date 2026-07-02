import { labTestStats } from "@/lib/data/lab-test-stats.generated";
import { siteConfig } from "@/lib/site-config";
import type { DataSource } from "@/lib/data/data-source";

type MetricStatus = "passing" | "failing" | "flaky" | "neutral";

export interface CommandCenterMetric {
  label: string;
  value?: string;
  hint?: string;
  status?: MetricStatus;
  dataSource: DataSource;
}

export const commandCenterExperience = "18+ years experience";

export const commandCenterCiActionsUrl = `${siteConfig.githubUrl}/actions`;

export const commandCenterMetrics: CommandCenterMetric[] = [
  {
    label: "Unit Tests",
    value: String(labTestStats.unitTests),
    hint: `Vitest · ${labTestStats.unitTestFiles} files`,
    dataSource: "live",
  },
  {
    label: "E2E Tests",
    value: String(labTestStats.e2eTests),
    hint: `Playwright · ${labTestStats.e2eSpecFiles} spec files`,
    dataSource: "live",
  },
  {
    label: "Smoke Tests",
    value: String(labTestStats.e2eSmokeTests),
    hint: "Playwright @smoke",
    dataSource: "live",
  },
  {
    label: "CI Status",
    value: "See GitHub",
    hint: "Workflow status on GitHub Actions",
    dataSource: "live",
  },
];

export const commandCenterSkills = [
  "C#",
  "Java",
  "TypeScript",
  "Python",
  "Playwright",
  "Selenium",
  "CI/CD",
  "API Testing",
  "Performance Testing",
  "Leadership",
] as const;

export const automationCoverage = 92;

export const automationCoverageLabel = "Automation Coverage";

export const automationCoverageIsDemo = true;

export const commandCenterCoverageDemoIntro =
  "Illustrative coverage target below — demo data for UI purposes, not production telemetry.";

export const commandCenterQuickLinks = [
  {
    href: "/playground",
    label: "Testing Playground",
    description: "Demo pages for login, forms, shadow DOM, and more.",
  },
  {
    href: "/bug-hunt",
    label: "Bug Hunt Game",
    description: "Find intentional bugs in a fake shopping cart app.",
  },
  {
    href: "/articles",
    label: "How I Solve Problems",
    description: "Leadership articles on automation strategy and quality.",
  },
  {
    href: "/contact",
    label: "Contact",
    description: "Let's talk about frameworks, teams, and release confidence.",
  },
] as const;

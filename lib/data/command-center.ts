type MetricStatus = "passing" | "failing" | "flaky" | "neutral";

export interface CommandCenterMetric {
  label: string;
  value?: string;
  hint?: string;
  status?: MetricStatus;
}

export const commandCenterExperience = "18+ years experience";

export const commandCenterMetrics: CommandCenterMetric[] = [
  { label: "Test Execution", value: "15,432", hint: "Last 30 days" },
  { label: "Frameworks Built", value: "12+", hint: "Across enterprise teams" },
  { label: "Production Escapes", value: "↓ 78%", hint: "Year over year" },
  { label: "Build Health", status: "passing" },
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

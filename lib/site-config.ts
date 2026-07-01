export type FeatureStatus = "planned" | "live";

export type NavGroup = "Lab" | "Content" | "Leadership" | "Tools";

export interface SiteFeature {
  id: number;
  slug: string;
  href: string;
  label: string;
  description: string;
  group: NavGroup;
  status: FeatureStatus;
}

export const siteConfig = {
  name: "Quality Engineering Lab",
  author: "Nathan Middleton",
  tagline: "Senior QA Automation Leader",
  githubUrl: "https://github.com/n8midd/nathanmiddleton-portfolio",
  linkedInUrl: "https://www.linkedin.com/in/nathan-middleton-57618713/",
} as const;

export const features: SiteFeature[] = [
  {
    id: 1,
    slug: "command-center",
    href: "/",
    label: "Command Center",
    description: "Interactive QA dashboard landing page with live-style metrics.",
    group: "Lab",
    status: "live",
  },
  {
    id: 2,
    slug: "architecture",
    href: "/architecture",
    label: "Framework Architecture",
    description: "Diagrams explaining hybrid automation frameworks and reporting pipelines.",
    group: "Lab",
    status: "live",
  },
  {
    id: 3,
    slug: "articles",
    href: "/articles",
    label: "How I Solve Problems",
    description: "Blog-style articles on automation strategy and quality leadership.",
    group: "Content",
    status: "live",
  },
  {
    id: 4,
    slug: "test-case-builder",
    href: "/test-case-builder",
    label: "Test Case Builder",
    description: "Generate positive, negative, boundary, and security test cases interactively.",
    group: "Tools",
    status: "planned",
  },
  {
    id: 5,
    slug: "bug-hunt",
    href: "/bug-hunt",
    label: "Bug Hunt Game",
    description: "Find intentional bugs in a fake shopping cart application.",
    group: "Lab",
    status: "live",
  },
  {
    id: 6,
    slug: "framework-demo",
    href: "/framework-demo",
    label: "Framework Demo",
    description: "Explore a real Playwright framework structure with expandable sections.",
    group: "Lab",
    status: "live",
  },
  {
    id: 7,
    slug: "pipeline",
    href: "/pipeline",
    label: "CI/CD Pipeline",
    description: "Interactive pipeline visualizer from commit to production.",
    group: "Lab",
    status: "live",
  },
  {
    id: 8,
    slug: "leadership",
    href: "/leadership",
    label: "QA Leadership",
    description: "Hiring philosophy, mentoring, test strategy, and executive reporting.",
    group: "Leadership",
    status: "live",
  },
  {
    id: 9,
    slug: "resume",
    href: "/resume",
    label: "Interactive Resume",
    description: "Expandable career timeline with role highlights.",
    group: "Leadership",
    status: "planned",
  },
  {
    id: 10,
    slug: "playground",
    href: "/playground",
    label: "Testing Playground",
    description: "Demo pages for login, forms, shadow DOM, modals, and more.",
    group: "Lab",
    status: "live",
  },
  {
    id: 11,
    slug: "metrics",
    href: "/metrics",
    label: "Metrics Dashboard",
    description: "Grafana-style automation metrics and execution history.",
    group: "Lab",
    status: "live",
  },
  {
    id: 12,
    slug: "interview-prep",
    href: "/interview-prep",
    label: "Interview Prep",
    description: "Curated QA interview questions across automation and leadership.",
    group: "Content",
    status: "live",
  },
  {
    id: 13,
    slug: "whiteboard",
    href: "/whiteboard",
    label: "Architecture Whiteboard",
    description: "Interactive microservices diagrams with test strategy overlays.",
    group: "Tools",
    status: "planned",
  },
  {
    id: 14,
    slug: "exercises",
    href: "/exercises",
    label: "What Would You Test?",
    description: "Interactive testing exercises with reveal-your-answer flow.",
    group: "Tools",
    status: "planned",
  },
  {
    id: 15,
    slug: "api-explorer",
    href: "/api-explorer",
    label: "Live API Explorer",
    description: "Send requests to demo REST endpoints and inspect responses.",
    group: "Tools",
    status: "planned",
  },
  {
    id: 16,
    slug: "snippets",
    href: "/snippets",
    label: "Code Snippet Library",
    description: "Searchable Playwright, Selenium, and CI/CD code examples.",
    group: "Tools",
    status: "planned",
  },
  {
    id: 17,
    slug: "ai-testing",
    href: "/ai-testing",
    label: "AI in Testing",
    description: "LLM-assisted testing, RAG evaluation, and synthetic data generation.",
    group: "Content",
    status: "live",
  },
  {
    id: 18,
    slug: "lessons",
    href: "/lessons",
    label: "Lessons Learned",
    description: "Real stories about flaky tests, failures, and what worked.",
    group: "Leadership",
    status: "planned",
  },
  {
    id: 19,
    slug: "stack",
    href: "/stack",
    label: "Technical Stack",
    description: "Why each tool was chosen — not just logos.",
    group: "Content",
    status: "live",
  },
  {
    id: 20,
    slug: "contact",
    href: "/contact",
    label: "Contact",
    description: "Let's talk about building frameworks, leading teams, and release confidence.",
    group: "Leadership",
    status: "planned",
  },
];

export const navGroups: NavGroup[] = ["Lab", "Content", "Leadership", "Tools"];

export function getFeatureByHref(href: string): SiteFeature | undefined {
  return features.find((feature) => feature.href === href);
}

export function getFeatureBySlug(slug: string): SiteFeature | undefined {
  return features.find((feature) => feature.slug === slug);
}

export const plannedArticles = [
  "Why 90% Test Automation Coverage Is One of the Worst Goals You Can Set",
  "When NOT to Automate: The Most Valuable Test Might Be the One You Never Write",
  "Why Flaky Tests Destroy Engineering Teams (It's Not Just About Broken Tests)",
  "How I Reduced a 6-Hour Test Suite to 30 Minutes (Without Deleting Quality)",
  "Shift Left Testing Isn't About Testing Earlier—It's About Building Better Software",
  "Building Trust in Test Automation: Why Green Builds Don't Mean You're Winning",
  "Your Automation ROI Calculator Is Probably Wrong",
] as const;

export { playgroundDemos } from "@/lib/data/playground";

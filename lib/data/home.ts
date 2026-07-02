import {
  getNavFeatures,
  navGroups,
  siteConfig,
  type NavGroup,
  type SiteFeature,
} from "@/lib/site-config";

export const homeHero =
  "This is Nathan Middleton's Quality Engineering Lab — a portfolio and hands-on demo site for hiring managers and engineers. Explore interactive automation demos, leadership writing, and practical testing tools built with the same patterns I use in production.";

export const homeSectionSummaries: Record<Exclude<NavGroup, "Overview">, string> = {
  Lab: "Interactive demos, dashboards, playground pages, and framework walkthroughs that show how I design and operate test automation.",
  Content:
    "Articles, interview prep, AI-in-testing topics, and technical stack rationale — how I think about quality engineering problems.",
  Leadership:
    "QA leadership topics, an interactive resume, and contact information for senior SDET and leadership conversations.",
  Tools: "Generators and explorers — test cases, architecture whiteboard, exercises, API explorer, and code snippets.",
};

export interface HomePriorityLink {
  id: string;
  label: string;
  href: string;
  description: string;
  external?: boolean;
}

export const homePriorityLinks: HomePriorityLink[] = [
  {
    id: "resume",
    label: "Interactive Resume",
    href: "/resume",
    description: "Career timeline with expandable role highlights.",
  },
  {
    id: "contact",
    label: "Contact",
    href: "/contact",
    description: "Let's talk about frameworks, teams, and release confidence.",
  },
  {
    id: "email",
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    description: siteConfig.email,
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: siteConfig.linkedInUrl,
    description: "Professional profile and background.",
    external: true,
  },
  {
    id: "github",
    label: "GitHub",
    href: siteConfig.githubUrl,
    description: "Source code for this lab.",
    external: true,
  },
];

export interface HomeFeaturedLink {
  href: string;
  label: string;
  description: string;
}

export const homeFeaturedLinks: HomeFeaturedLink[] = [
  {
    href: "/command-center",
    label: "Command Center",
    description: "QA metrics dashboard and skills overview.",
  },
  {
    href: "/playground",
    label: "Testing Playground",
    description: "Demo pages for login, forms, shadow DOM, and more.",
  },
  {
    href: "/resume",
    label: "Interactive Resume",
    description: "Expandable career timeline.",
  },
  {
    href: "/articles",
    label: "How I Solve Problems",
    description: "Articles on automation strategy and quality leadership.",
  },
];

export interface HomeSection {
  group: Exclude<NavGroup, "Overview">;
  summary: string;
  features: SiteFeature[];
}

export function getHomeSections(): HomeSection[] {
  const navFeatures = getNavFeatures().filter((feature) => feature.slug !== "home");

  return navGroups
    .filter((group): group is Exclude<NavGroup, "Overview"> => group !== "Overview")
    .map((group) => ({
      group,
      summary: homeSectionSummaries[group],
      features: navFeatures.filter((feature) => feature.group === group && feature.status === "live"),
    }));
}

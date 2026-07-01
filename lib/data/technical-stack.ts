export const ALL_CATEGORIES_ID = "all" as const;

export interface StackCategory {
  id: string;
  label: string;
  description: string;
}

export interface StackTool {
  id: string;
  categoryId: string;
  name: string;
  tagline: string;
  rationale: string;
  highlights: string[];
  weaknesses: string[];
  usedInLab?: boolean;
}

export const stackCategories: StackCategory[] = [
  {
    id: "automation",
    label: "Automation",
    description: "Browser and UI test frameworks for reliable end-to-end coverage.",
  },
  {
    id: "languages",
    label: "Languages",
    description: "Primary implementation languages across enterprise automation programs.",
  },
  {
    id: "ci-cd",
    label: "CI/CD",
    description: "Pipeline orchestration and quality gates from commit to deploy.",
  },
  {
    id: "api-performance",
    label: "API & Performance",
    description: "Contract validation and load testing beyond the UI layer.",
  },
  {
    id: "this-lab",
    label: "This Lab",
    description: "Tools powering this portfolio site and its test suite.",
  },
];

export const stackTools: StackTool[] = [
  {
    id: "playwright",
    categoryId: "automation",
    name: "Playwright",
    tagline: "Modern browser automation with built-in reliability.",
    rationale:
      "I prefer Playwright for new frameworks because auto-waiting, browser context isolation, tracing, and parallel execution significantly reduce flaky tests compared to traditional Selenium implementations. The developer experience—codegen, UI mode, and first-class TypeScript—helps teams adopt automation faster.",
    highlights: [
      "Auto-waiting eliminates most explicit sleep calls",
      "Trace and video on retry for fast triage",
      "Parallel workers with isolated browser contexts",
      "API testing in the same test runner as UI specs",
    ],
    weaknesses: [
      "Rewriting large Selenium suites is expensive—teams often run dual stacks during migration",
      "Fewer battle-tested patterns for massive Grid-style browser farms than Selenium's ecosystem",
      "Framework APIs evolve quickly; major version upgrades can touch many specs",
    ],
  },
  {
    id: "selenium",
    categoryId: "automation",
    name: "Selenium",
    tagline: "The WebDriver standard for cross-browser legacy suites.",
    rationale:
      "Selenium remains the right choice when you inherit large WebDriver investments, need Grid-based browser farms, or must support languages Playwright does not prioritize. The tradeoff is more explicit wait management and heavier maintenance when DOMs change frequently.",
    highlights: [
      "Broad language and Grid ecosystem",
      "Mature enterprise adoption and hiring pool",
      "Works with existing Page Object Model codebases",
      "Requires disciplined wait strategies to avoid flakes",
    ],
    weaknesses: [
      "Without explicit wait strategy, suites become flaky and teams normalize reruns",
      "Grid infrastructure is operational overhead—nodes, browsers, and capacity planning",
      "DOM changes break locator-heavy tests faster than intent-based abstractions",
    ],
  },
  {
    id: "specflow-cucumber",
    categoryId: "automation",
    name: "SpecFlow / Cucumber",
    tagline: "BDD glue between business language and automation code.",
    rationale:
      "BDD frameworks earn their place when product and QA collaborate on living documentation—not when teams paste Gherkin over already-written tests. SpecFlow on .NET and Cucumber on JavaScript bridge readable scenarios to step definitions that call your automation layer.",
    highlights: [
      "Gherkin scenarios readable by non-engineers",
      "Reusable step definitions reduce duplication",
      "Living documentation tied to executable tests",
      "Requires governance to prevent brittle step sprawl",
    ],
    weaknesses: [
      "Most teams never achieve true three-amigos collaboration—scenarios are written by QA alone after the fact",
      "Becomes overhead when Gherkin duplicates what code already expresses; you maintain two layers for one behavior",
      "Step definition sprawl: vague steps like \"I log in\" hide complexity and break when reused across features",
      "Scenarios drift from production reality because nobody owns updating feature files when requirements change",
    ],
  },
  {
    id: "typescript",
    categoryId: "languages",
    name: "TypeScript",
    tagline: "Typed JavaScript for maintainable test and app code.",
    rationale:
      "TypeScript catches locator and API contract mistakes at compile time. For Playwright and Next.js projects, shared types between app and test code reduce drift and make refactors safer across large monorepos.",
    highlights: [
      "Static typing for page objects and API clients",
      "Excellent IDE support and refactoring tools",
      "First-class in Playwright and modern front-end stacks",
      "Compile step adds minimal overhead for large quality gains",
    ],
    weaknesses: [
      "Build and type-check steps add friction for quick throwaway scripts",
      "Teams can over-type test code—generics and abstractions that slow iteration without catching real bugs",
      "Interop with untyped legacy JS libraries still requires escape hatches and maintenance",
    ],
    usedInLab: true,
  },
  {
    id: "csharp",
    categoryId: "languages",
    name: "C#",
    tagline: "Enterprise automation on .NET with SpecFlow and NUnit.",
    rationale:
      "C# dominates automation in Microsoft-centric enterprises. SpecFlow, NUnit, and Selenium/Playwright .NET bindings integrate cleanly with Azure DevOps pipelines and internal NuGet packages for shared test utilities.",
    highlights: [
      "Strong typing and mature test frameworks",
      "Natural fit for Azure DevOps and .NET apps",
      "SpecFlow BDD on enterprise .NET teams",
      "Large pool of SDET talent in fintech and healthcare",
    ],
    weaknesses: [
      "Slower feedback loop than scripting languages for small automation tasks",
      "Heavier ceremony—projects, packages, and build pipelines before a first test runs",
      "Historically Windows-centric; cross-platform is better now but not universal in legacy orgs",
    ],
  },
  {
    id: "java",
    categoryId: "languages",
    name: "Java",
    tagline: "Selenium Grid and TestNG/JUnit at enterprise scale.",
    rationale:
      "Java automation stacks power many large product organizations. TestNG, JUnit, Rest Assured, and Selenium Grid integrations are battle-tested for multi-team, multi-repo quality programs.",
    highlights: [
      "Rest Assured for fluent API contract tests",
      "TestNG parallel suites and reporting hooks",
      "Deep Selenium Grid and cloud provider support",
      "Verbose but explicit—good for large regulated environments",
    ],
    weaknesses: [
      "Boilerplate and ceremony slow down authoring compared to modern JS or Python stacks",
      "Long compile and startup times hurt tight inner loops on large multi-module repos",
      "Framework sprawl—JUnit, TestNG, Cucumber, Rest Assured—teams pick incompatible combinations",
    ],
  },
  {
    id: "python",
    categoryId: "languages",
    name: "Python",
    tagline: "Fast scripting for data setup, API checks, and tooling.",
    rationale:
      "Python excels at test data factories, one-off validation scripts, and glue between systems. Pytest fixtures and requests library make it ideal for API-heavy prep work even when UI tests run in TypeScript or Java.",
    highlights: [
      "Pytest fixtures for composable test setup",
      "Rapid prototyping of validation scripts",
      "Strong data and ML tooling when tests need synthetic data",
      "Pair with typed UI layers for maintainability at scale",
    ],
    weaknesses: [
      "Dynamic typing lets locator and payload mistakes slip through until runtime",
      "Split stacks are common—Python for API prep, TypeScript or Java for UI—adding coordination cost",
      "Large pytest suites without structure become slow and hard to parallelize cleanly",
    ],
  },
  {
    id: "github-actions",
    categoryId: "ci-cd",
    name: "GitHub Actions",
    tagline: "Native CI for GitHub-hosted repositories.",
    rationale:
      "GitHub Actions keeps pipeline config beside application code. This lab runs lint, typecheck, Vitest, build, and Playwright on every PR—no separate CI server to maintain.",
    highlights: [
      "Workflow YAML colocated with source",
      "Matrix builds and caching for Node projects",
      "Playwright GitHub reporter for PR annotations",
      "Free tier sufficient for portfolio and small teams",
    ],
    weaknesses: [
      "YAML workflows sprawl—copy-pasted jobs, opaque composite actions, and hard-to-debug failures",
      "Tight coupling to GitHub; migrating repos means rewriting pipelines from scratch",
      "Minutes and concurrency limits push larger orgs toward self-hosted runners and ops overhead",
    ],
    usedInLab: true,
  },
  {
    id: "azure-pipelines",
    categoryId: "ci-cd",
    name: "Azure Pipelines",
    tagline: "Enterprise CI/CD with Azure DevOps integration.",
    rationale:
      "Azure Pipelines fits organizations already on Azure DevOps Boards, Artifacts, and Test Plans. Parallel jobs, gated deployments, and release pipelines map well to regulated release trains.",
    highlights: [
      "Integrated with Azure DevOps work items and test plans",
      "Parallel agents and artifact publishing",
      "Release gates and environment approvals",
      "Strong in .NET and enterprise Microsoft shops",
    ],
    weaknesses: [
      "Dual YAML and UI configuration—pipelines drift when teams edit in different places",
      "Heavyweight for small teams not already on Azure DevOps; setup cost is high",
      "Debugging failed jobs across agents and release stages is slower than lightweight CI",
    ],
  },
  {
    id: "rest-api-testing",
    categoryId: "api-performance",
    name: "REST / API Testing",
    tagline: "Contract validation before UI suites run.",
    rationale:
      "API tests catch integration breaks faster and cheaper than UI automation. I validate status codes, auth, payload shapes, and error contracts—often with Postman/Newman in CI or Rest Assured/Playwright request contexts—before relying on browser tests for the same coverage.",
    highlights: [
      "Validate contracts independent of UI rendering",
      "Seed and tear down data faster than browser flows",
      "Gate service changes before full regression runs",
      "Combine with consumer-driven contract tests where teams scale",
    ],
    weaknesses: [
      "Green API tests do not prove the UI integrates correctly—teams still need targeted browser coverage",
      "Mocks and test doubles drift from production behavior; contracts pass while users break",
      "Shared test environments cause flaky data and ordering issues that API tests alone will not catch",
    ],
    usedInLab: true,
  },
  {
    id: "k6-gatling",
    categoryId: "api-performance",
    name: "k6 / Gatling",
    tagline: "Load and performance thresholds in the pipeline.",
    rationale:
      "Performance testing belongs in the quality strategy, not as a one-off before launch. k6 scripts as code integrate with CI; Gatling suits JVM shops. Both support threshold-based gates so perf regressions fail builds like functional tests.",
    highlights: [
      "Scriptable load scenarios with realistic think times",
      "Threshold assertions in CI (p95 latency, error rate)",
      "Smaller perf suites on PRs; full load on schedule",
      "Pair with APM traces to find bottlenecks, not just slow endpoints",
    ],
    weaknesses: [
      "Realistic load is expensive—CI environments rarely match production scale or traffic patterns",
      "Scripts model endpoints, not real user journeys; passing thresholds can miss UX degradation",
      "Flaky infra (noisy neighbors, cold starts) produces false failures that teams learn to ignore",
    ],
  },
  {
    id: "nextjs",
    categoryId: "this-lab",
    name: "Next.js",
    tagline: "Full-stack React for this interactive portfolio.",
    rationale:
      "Next.js App Router lets this lab ship server-rendered pages, API routes, and client interactivity in one TypeScript codebase. Static generation keeps demos fast; route handlers power playground APIs without a separate backend.",
    highlights: [
      "App Router with server and client components",
      "Built-in API routes for demos and health checks",
      "Production build matches what Playwright tests in CI",
      "Vercel deployment with zero-config hosting",
    ],
    weaknesses: [
      "App Router migration and server/client boundaries confuse teams—hydration bugs are common",
      "Framework churn and breaking changes require ongoing upgrade work, not one-time adoption",
      "Defaults skew toward Vercel hosting patterns; self-hosting and edge cases need extra care",
    ],
    usedInLab: true,
  },
  {
    id: "vitest",
    categoryId: "this-lab",
    name: "Vitest",
    tagline: "Fast unit tests for utilities and shared logic.",
    rationale:
      "Vitest runs unit tests in milliseconds with native ESM and TypeScript support. This lab uses it for pure functions and data helpers—keeping the Playwright suite focused on user-facing behavior.",
    highlights: [
      "Fast feedback on utility and data-layer logic",
      "Same config patterns as Vite/TypeScript projects",
      "Runs in CI before the heavier e2e stage",
      "Complements Playwright rather than replacing it",
    ],
    weaknesses: [
      "Not a browser runner—DOM behavior and accessibility still need Playwright or similar",
      "Mock-heavy unit tests can diverge from how code runs in Next.js server and client contexts",
      "Another config surface to keep aligned with build tooling as the app evolves",
    ],
    usedInLab: true,
  },
  {
    id: "tailwind-css",
    categoryId: "this-lab",
    name: "Tailwind CSS",
    tagline: "Utility-first styling with a consistent design system.",
    rationale:
      "Tailwind plus shadcn/ui components keep UI iteration fast without a separate design handoff. CSS variables for status colors (pass, fail, warn) give dashboards and charts a cohesive dark-theme lab aesthetic.",
    highlights: [
      "Consistent spacing, typography, and color tokens",
      "Dark theme with semantic status colors",
      "Pairs with shadcn/ui for accessible components",
      "No runtime CSS-in-JS overhead",
    ],
    weaknesses: [
      "Long class strings hurt readability without team conventions and component extraction",
      "Design drift happens when everyone picks slightly different utility combinations",
      "Harder for designers to edit directly compared to Figma-to-component handoffs",
    ],
    usedInLab: true,
  },
];

export function getCategoryById(id: string): StackCategory | undefined {
  return stackCategories.find((category) => category.id === id);
}

export function getToolById(id: string): StackTool | undefined {
  return stackTools.find((tool) => tool.id === id);
}

export function getToolsByCategory(
  categoryId: string | typeof ALL_CATEGORIES_ID,
): StackTool[] {
  if (categoryId === ALL_CATEGORIES_ID) {
    return stackTools;
  }

  return stackTools.filter((tool) => tool.categoryId === categoryId);
}

export function filterStackTools(
  query: string,
  categoryId: string | typeof ALL_CATEGORIES_ID = ALL_CATEGORIES_ID,
): StackTool[] {
  const normalizedQuery = query.trim().toLowerCase();
  const categoryTools = getToolsByCategory(categoryId);

  if (!normalizedQuery) {
    return categoryTools;
  }

  return categoryTools.filter((tool) => {
    const category = getCategoryById(tool.categoryId);
    const haystack = [
      tool.name,
      tool.tagline,
      tool.rationale,
      ...tool.highlights,
      ...tool.weaknesses,
      category?.label ?? "",
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

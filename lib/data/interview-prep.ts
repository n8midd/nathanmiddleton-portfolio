export type InterviewDifficulty = "junior" | "mid" | "senior";

export interface InterviewCategory {
  id: string;
  label: string;
  description: string;
}

export interface InterviewQuestion {
  id: string;
  categoryId: string;
  question: string;
  answer: string;
  difficulty: InterviewDifficulty;
}

export const ALL_CATEGORIES_ID = "all" as const;

export const interviewCategories: InterviewCategory[] = [
  {
    id: "playwright",
    label: "Playwright",
    description: "Browser automation, fixtures, tracing, and parallel execution.",
  },
  {
    id: "selenium",
    label: "Selenium",
    description: "WebDriver, Grid, waits, and maintaining legacy UI suites.",
  },
  {
    id: "leadership",
    label: "Leadership",
    description: "Test strategy, hiring, and stakeholder communication.",
  },
  {
    id: "rest-apis",
    label: "REST APIs",
    description: "Contract validation, auth, status codes, and test data.",
  },
  {
    id: "ci-cd",
    label: "CI/CD",
    description: "Quality gates, pipeline design, flakes, and sharding.",
  },
  {
    id: "performance",
    label: "Performance",
    description: "Load testing, thresholds, and when to automate perf checks.",
  },
  {
    id: "automation-strategy",
    label: "Automation Strategy",
    description: "ROI, risk-based coverage, and portfolio decisions.",
  },
  {
    id: "behavioral",
    label: "Behavioral",
    description: "STAR scenarios, conflict, mentoring, and collaboration.",
  },
  {
    id: "system-design",
    label: "System Design",
    description: "Test architecture for distributed systems and data strategy.",
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  // Playwright (5)
  {
    id: "playwright-auto-waiting",
    categoryId: "playwright",
    question: "How does Playwright auto-waiting differ from explicit sleeps?",
    answer:
      "Playwright auto-waiting retries actions until elements are actionable—visible, stable, enabled, and receiving events—before interacting. Explicit sleeps assume fixed timing and create flaky tests when environments vary. Prefer locators with built-in waiting and assert on state, not arbitrary delays.",
    difficulty: "junior",
  },
  {
    id: "playwright-fixtures",
    categoryId: "playwright",
    question: "When would you use Playwright fixtures instead of beforeEach hooks?",
    answer:
      "Fixtures provide scoped setup/teardown with dependency injection across tests and workers. Use them when multiple tests share expensive setup (auth, API clients, browser context) or when you need worker-scoped isolation for parallel runs. beforeEach is fine for lightweight per-test setup inside a single file.",
    difficulty: "mid",
  },
  {
    id: "playwright-tracing",
    categoryId: "playwright",
    question: "How do traces help triage CI failures?",
    answer:
      "Playwright traces capture DOM snapshots, network, console logs, and action timelines for a failed run. They answer 'what happened' without reproducing locally. Best practice: enable trace on first retry, attach to CI artifacts, and link traces in failure notifications to reduce mean time to triage.",
    difficulty: "mid",
  },
  {
    id: "playwright-parallel",
    categoryId: "playwright",
    question: "What must be true before scaling Playwright parallel workers?",
    answer:
      "Each worker needs isolated test data, independent auth sessions, and cleanup that does not collide. Parallelization is an architecture problem before it is a hardware problem. Without isolation, increasing workers increases flake rate and erodes trust in the pipeline.",
    difficulty: "senior",
  },
  {
    id: "playwright-api-ui",
    categoryId: "playwright",
    question: "How do you combine API and UI tests in Playwright?",
    answer:
      "Use APIRequestContext or shared API helpers to seed state, then validate user-visible behavior in the browser. API setup reduces UI navigation time and stabilizes tests. Keep API contracts validated separately so UI tests focus on integration and presentation, not duplicating service-level checks.",
    difficulty: "senior",
  },
  // Selenium (5)
  {
    id: "selenium-explicit-implicit",
    categoryId: "selenium",
    question: "Why are implicit waits generally discouraged?",
    answer:
      "Implicit waits apply globally and interact unpredictably with explicit waits, inflating timeouts and masking timing bugs. Explicit expected conditions (or framework equivalents) make wait intent clear per action. Modern guidance: avoid implicit waits; use explicit, condition-based synchronization.",
    difficulty: "junior",
  },
  {
    id: "selenium-grid",
    categoryId: "selenium",
    question: "When does Selenium Grid still make sense?",
    answer:
      "Grid helps when you need cross-browser/OS matrix execution with centralized hub/node management and legacy WebDriver stacks. Cloud providers and Playwright often replace self-hosted Grid for new projects. Grid remains relevant for enterprises with heavy Selenium investment and custom browser farms.",
    difficulty: "mid",
  },
  {
    id: "selenium-pom-vs-page-factory",
    categoryId: "selenium",
    question: "Page Object Model vs Page Factory—what do you recommend?",
    answer:
      "POM encapsulates locators and actions in plain classes—simple, explicit, easy to debug. Page Factory uses @FindBy annotations and lazy initialization, which can obscure failures and complicate maintenance. I prefer explicit POM with constructor-injected WebDriver for clarity and testability.",
    difficulty: "mid",
  },
  {
    id: "selenium-flaky-locators",
    categoryId: "selenium",
    question: "How do you stabilize brittle Selenium locators in a legacy suite?",
    answer:
      "Prioritize user-facing attributes: data-testid, role, accessible name. Avoid XPath tied to DOM structure. Refactor hot spots incrementally—start with top flake contributors identified by CI metrics. Add locator review to PR checklist so new tests do not repeat old patterns.",
    difficulty: "senior",
  },
  {
    id: "selenium-migration",
    categoryId: "selenium",
    question: "How would you migrate a large Selenium suite to Playwright?",
    answer:
      "Run both frameworks in parallel during transition. Migrate high-value, high-flake suites first. Extract shared business logic into language-agnostic helpers. Compare failure rates and runtime per migrated module. Do not big-bang rewrite—prove ROI per slice and keep Selenium running until Playwright coverage earns trust.",
    difficulty: "senior",
  },
  // Leadership (5)
  {
    id: "leadership-test-strategy",
    categoryId: "leadership",
    question: "How do you define test strategy for a new product?",
    answer:
      "Start with business risk: critical user journeys, compliance, revenue paths, and failure blast radius. Map the test pyramid—unit, contract, integration, UI—and define quality gates per stage. Align with release cadence and team skills. Strategy is a living document reviewed quarterly, not a one-time slide deck.",
    difficulty: "senior",
  },
  {
    id: "leadership-hiring-sdet",
    categoryId: "leadership",
    question: "What do you look for when hiring an SDET?",
    answer:
      "Strong coding fundamentals, debugging mindset, and communication skills. I assess how candidates design tests for real systems—not trivia. Look for ownership: triaging failures, improving frameworks, and influencing quality beyond their own tests. Culture fit includes collaboration with devs and product, not siloed QA.",
    difficulty: "senior",
  },
  {
    id: "leadership-executive-metrics",
    categoryId: "leadership",
    question: "Which quality metrics do you share with executives?",
    answer:
      "Escaped defects, production incident trend, deployment frequency, pipeline feedback time, and flake rate. Executives care about customer impact and delivery speed—not test counts. Frame automation as risk reduction and confidence, with clear assumptions documented when presenting ROI.",
    difficulty: "senior",
  },
  {
    id: "leadership-dev-qa-partnership",
    categoryId: "leadership",
    question: "How do you improve the developer-QA partnership?",
    answer:
      "Embed quality early: Three Amigos, shared ownership of failures, and developers writing unit/contract tests. SDETs build enabling infrastructure—fixtures, CI gates, observability—not gatekeeping. Celebrate defects prevented pre-production. Remove us-vs-them language; quality is a team outcome.",
    difficulty: "mid",
  },
  {
    id: "leadership-prioritization",
    categoryId: "leadership",
    question: "How do you prioritize automation backlog work?",
    answer:
      "Score by business risk, execution frequency, maintenance cost, and current flake burden. Stabilization sprints beat endless feature additions when trust is low. Say no to low-value automation explicitly. Revisit the portfolio quarterly and retire tests that no longer justify their cost.",
    difficulty: "senior",
  },
  // REST APIs (5)
  {
    id: "rest-status-codes",
    categoryId: "rest-apis",
    question: "Which HTTP status codes do you always validate in API tests?",
    answer:
      "Validate success (200/201/204), client errors (400/401/403/404/422), and server errors (500/503) based on scenario. Do not only assert 200—negative paths expose contract gaps. Include response schema, required headers, and pagination metadata where applicable.",
    difficulty: "junior",
  },
  {
    id: "rest-contract-testing",
    categoryId: "rest-apis",
    question: "What is contract testing and when do you use it?",
    answer:
      "Contract tests verify consumer and provider agree on request/response shape without full end-to-end runs. Use them when services evolve independently—microservices, mobile clients, third-party integrations. Tools like Pact catch breaking changes at build time instead of in late-stage UI tests.",
    difficulty: "mid",
  },
  {
    id: "rest-auth-patterns",
    categoryId: "rest-apis",
    question: "How do you handle authentication in API test suites?",
    answer:
      "Centralize token acquisition in auth helpers or fixtures. Refresh tokens before expiry; avoid hard-coded credentials in repos. Use service accounts for CI and scoped test users per worker in parallel runs. Never log secrets in CI output; use secret stores for client IDs and keys.",
    difficulty: "mid",
  },
  {
    id: "rest-test-data",
    categoryId: "rest-apis",
    question: "How do you manage test data for REST API automation?",
    answer:
      "Prefer factories that create entities via API with unique identifiers per test/worker. Clean up in teardown or use TTL namespaces. Avoid shared golden records that collide under parallel load. Document dependencies between entities so setup order remains deterministic.",
    difficulty: "senior",
  },
  {
    id: "rest-negative-testing",
    categoryId: "rest-apis",
    question: "How do you approach negative API testing?",
    answer:
      "Test boundary values, malformed payloads, missing required fields, invalid auth, and rate limits. Validate error body structure and messages—not just status codes. Negative tests often find security and validation gaps that happy-path automation misses.",
    difficulty: "mid",
  },
  // CI/CD (5)
  {
    id: "cicd-quality-gates",
    categoryId: "ci-cd",
    question: "What belongs in a pull request quality gate?",
    answer:
      "Lint, unit tests, static analysis, contract tests, and a fast smoke suite. Gates should finish in minutes to preserve developer flow. Heavier regression runs nightly or pre-release. Every gate failure should be actionable—attach logs, traces, and clear ownership.",
    difficulty: "mid",
  },
  {
    id: "cicd-flake-policy",
    categoryId: "ci-cd",
    question: "What is your policy when a flaky test blocks the pipeline?",
    answer:
      "Do not silently retry until green without investigation. Quarantine with owner and expiry date, track flake rate as a metric, and prioritize fixes over new coverage when rate exceeds threshold. Chronic flakes erode trust faster than missing tests.",
    difficulty: "senior",
  },
  {
    id: "cicd-sharding",
    categoryId: "ci-cd",
    question: "When do you shard test suites in CI?",
    answer:
      "Shard when suite runtime exceeds target feedback time (often 15–30 minutes for PR gates). Split by tag, file, or timing balance—not randomly. Ensure shards have isolated data and collect merged reports. Measure shard duration variance to avoid straggler jobs.",
    difficulty: "senior",
  },
  {
    id: "cicd-fail-fast",
    categoryId: "ci-cd",
    question: "How do you design pipelines for fast feedback?",
    answer:
      "Run cheapest checks first—lint, unit, contract—before expensive UI suites. Fail fast on smoke. Use parallel jobs and cache dependencies. Separate PR validation from nightly full regression. Optimize for mean time to actionable signal, not total test count.",
    difficulty: "mid",
  },
  {
    id: "cicd-artifacts",
    categoryId: "ci-cd",
    question: "What artifacts should CI publish on test failure?",
    answer:
      "JUnit/XML reports, screenshots, traces, console logs, and environment metadata (commit SHA, build ID). Artifacts should answer what failed and why without local reproduction. Link them in Slack or PR comments to reduce triage time.",
    difficulty: "mid",
  },
  // Performance (5)
  {
    id: "performance-load-vs-stress",
    categoryId: "performance",
    question: "What is the difference between load and stress testing?",
    answer:
      "Load testing validates behavior at expected traffic levels—latency, throughput, error rate under normal peak. Stress testing pushes beyond capacity to find breaking points and recovery behavior. Both need clear success criteria and production-like data volumes to be meaningful.",
    difficulty: "junior",
  },
  {
    id: "performance-thresholds",
    categoryId: "performance",
    question: "How do you set performance thresholds?",
    answer:
      "Base thresholds on SLAs, historical baselines, and user experience targets—not arbitrary numbers. Use percentiles (p95/p99) not just averages. Review thresholds when architecture changes. Fail builds on sustained regression, not single noisy spikes, to avoid false alarms.",
    difficulty: "mid",
  },
  {
    id: "performance-when-automate",
    categoryId: "performance",
    question: "When should performance testing be automated in CI?",
    answer:
      "Automate lightweight perf smoke (critical endpoints, key pages) on every deploy candidate when environments are stable and results are consistent. Full load tests usually run on schedule or pre-release—not every PR—due to cost and environment requirements.",
    difficulty: "senior",
  },
  {
    id: "performance-bottlenecks",
    categoryId: "performance",
    question: "How do you identify performance bottlenecks during testing?",
    answer:
      "Combine load tools (k6, JMeter, Gatling) with APM traces, database query analysis, and infrastructure metrics. Correlate latency spikes with resource saturation—CPU, memory, connection pools. Reproduce with realistic think times and payload sizes, not best-case scripts.",
    difficulty: "senior",
  },
  {
    id: "performance-regression",
    categoryId: "performance",
    question: "How do you prevent performance regressions?",
    answer:
      "Track trend lines for key transactions, compare against baselines in CI or nightly runs, and gate releases on agreed SLAs. Include perf requirements in acceptance criteria. Treat perf debt like functional debt—visible, owned, and prioritized.",
    difficulty: "mid",
  },
  // Automation Strategy (5)
  {
    id: "strategy-risk-based",
    categoryId: "automation-strategy",
    question: "What is risk-based test automation?",
    answer:
      "Prioritize automation for workflows with highest business impact and failure cost—not equal coverage everywhere. Map critical paths, compliance requirements, and frequent regressions. A smaller suite protecting checkout beats thousands of tests on low-risk settings pages.",
    difficulty: "mid",
  },
  {
    id: "strategy-roi",
    categoryId: "automation-strategy",
    question: "How do you calculate automation ROI?",
    answer:
      "Include manual execution cost, maintenance hours, infrastructure, defect escape reduction, and pipeline wait time impact—not just hours saved per run. Present ROI as a range with documented assumptions. Executives need risk language, not only efficiency metrics.",
    difficulty: "senior",
  },
  {
    id: "strategy-when-not-automate",
    categoryId: "automation-strategy",
    question: "When should you not automate a test?",
    answer:
      "Skip automation when features change rapidly, execution is rare, outcomes are subjective (visual polish), or maintenance exceeds manual cost. Exploratory and usability testing remain human-led. The goal is confidence per engineering hour, not maximum test count.",
    difficulty: "mid",
  },
  {
    id: "strategy-pyramid",
    categoryId: "automation-strategy",
    question: "Explain the test automation pyramid in practice.",
    answer:
      "Many fast, cheap unit tests at the base; fewer integration and contract tests; minimal UI E2E at the top. UI tests validate critical journeys and integration—not every edge case. Inverting the pyramid (E2E-heavy) creates slow, flaky suites that teams stop trusting.",
    difficulty: "junior",
  },
  {
    id: "strategy-maintenance",
    categoryId: "automation-strategy",
    question: "How do you keep automation maintainable long term?",
    answer:
      "Treat the framework as a product: ownership, roadmap, refactoring sprints, and flake metrics. Enforce coding standards, reusable helpers, and PR review for tests. Retire obsolete tests regularly. Maintenance budget should be explicit in every automation roadmap.",
    difficulty: "senior",
  },
  // Behavioral (5)
  {
    id: "behavioral-conflict-dev",
    categoryId: "behavioral",
    question: "Tell me about a time you disagreed with a developer on quality.",
    answer:
      "Use STAR: describe the scenario (e.g., skipping tests to meet a deadline), your approach (data on escaped defects, proposed compromise like smoke gate), result (shared gate, fewer hotfixes). Emphasize collaboration and business outcomes—not winning the argument.",
    difficulty: "mid",
  },
  {
    id: "behavioral-mentoring",
    categoryId: "behavioral",
    question: "How have you mentored junior QA or SDET engineers?",
    answer:
      "Pair on real failures, review PRs with teaching intent, and assign incremental ownership—one module, then a suite. Set clear expectations for code quality and triage discipline. Celebrate debugging wins and document patterns in team wiki or framework docs.",
    difficulty: "mid",
  },
  {
    id: "behavioral-deadline-pressure",
    categoryId: "behavioral",
    question: "How do you handle release pressure when quality is at risk?",
    answer:
      "Communicate risk explicitly with evidence: open defects, missing coverage on critical paths, flake rate. Offer options—scope cut, staged rollout, extra monitoring—not vague 'we need more time.' Document decisions. Protect trust in the pipeline even under pressure.",
    difficulty: "senior",
  },
  {
    id: "behavioral-influence-without-authority",
    categoryId: "behavioral",
    question: "How do you influence quality when you do not manage the team?",
    answer:
      "Build credibility through reliable automation, fast triage, and helpful PR feedback. Share metrics that resonate with dev leads—escaped defects, feedback time. Partner on design reviews and Three Amigos. Lead by enabling others, not blocking releases.",
    difficulty: "senior",
  },
  {
    id: "behavioral-failure-lesson",
    categoryId: "behavioral",
    question: "Describe a time your automation strategy failed. What did you learn?",
    answer:
      "Interviewers want honesty and growth. Example: over-automated unstable UI, ignored maintenance, trust collapsed. Lesson: stabilize before expand, measure flake rate, align with risk. Show you changed process—quarantine policy, stabilization sprints, risk-based prioritization.",
    difficulty: "senior",
  },
  // System Design (5)
  {
    id: "system-design-microservices",
    categoryId: "system-design",
    question: "How would you design a test strategy for a microservices architecture?",
    answer:
      "Layer tests: unit per service, contract tests between consumers/providers, integration in staging with realistic dependencies, and thin E2E for critical journeys. Use service virtualization where dependencies are unstable. Map ownership per team with shared reporting and quality gates in CI.",
    difficulty: "senior",
  },
  {
    id: "system-design-test-env",
    categoryId: "system-design",
    question: "How do you design test environments for reliability?",
    answer:
      "Environment parity with production—config, feature flags, data shape—reduces 'works in CI' surprises. Ephemeral environments per PR or namespace isolation for parallel runs. Seed reference data; generate mutable data per test. Monitor environment health as part of pipeline readiness.",
    difficulty: "senior",
  },
  {
    id: "system-design-reporting",
    categoryId: "system-design",
    question: "How would you design a test reporting platform?",
    answer:
      "Ingest JUnit/JSON from all runners, normalize by suite/tag/build. Store history for trend analysis—flake rate, duration, pass rate. Surface failures with traces and ownership. Integrate Slack for alerts, dashboards for leadership, and drill-down for engineers. Optimize for triage speed.",
    difficulty: "senior",
  },
  {
    id: "system-design-mobile-web",
    categoryId: "system-design",
    question: "How do you approach test architecture for web and mobile clients sharing APIs?",
    answer:
      "Validate APIs once at contract/integration layer; client-specific UI tests cover presentation and platform behavior. Share test data factories across clients. Align release trains so API versioning is tested before client adoption. Avoid duplicating identical API assertions in every client suite.",
    difficulty: "senior",
  },
  {
    id: "system-design-scale-parallel",
    categoryId: "system-design",
    question: "What architecture decisions enable safe parallel test execution at scale?",
    answer:
      "Worker-scoped data namespaces, idempotent setup/teardown, no shared mutable accounts, distributed lock only when necessary. Central config for environments and secrets. Queue management to balance shard load. Design for isolation first—parallelism follows.",
    difficulty: "senior",
  },
];

export function getCategoryById(id: string): InterviewCategory | undefined {
  return interviewCategories.find((category) => category.id === id);
}

export function getQuestionById(id: string): InterviewQuestion | undefined {
  return interviewQuestions.find((question) => question.id === id);
}

export function getQuestionsByCategory(categoryId: string | typeof ALL_CATEGORIES_ID): InterviewQuestion[] {
  if (categoryId === ALL_CATEGORIES_ID) {
    return interviewQuestions;
  }

  return interviewQuestions.filter((question) => question.categoryId === categoryId);
}

export function filterQuestions(
  query: string,
  categoryId: string | typeof ALL_CATEGORIES_ID = ALL_CATEGORIES_ID,
): InterviewQuestion[] {
  const normalizedQuery = query.trim().toLowerCase();
  const categoryQuestions = getQuestionsByCategory(categoryId);

  if (!normalizedQuery) {
    return categoryQuestions;
  }

  return categoryQuestions.filter((question) => {
    const category = getCategoryById(question.categoryId);
    const haystack = [question.question, question.answer, category?.label ?? ""]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

export function getQuestionCountByCategory(categoryId: string): number {
  return getQuestionsByCategory(categoryId).length;
}

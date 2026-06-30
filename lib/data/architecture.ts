export interface PipelineStep {
  id: string;
  label: string;
  summary: string;
  detail: string;
}

export interface ArchitecturePattern {
  id: string;
  title: string;
  summary: string;
  detail: string;
  practices: string[];
}

export const pipelineSteps: PipelineStep[] = [
  {
    id: "github",
    label: "GitHub",
    summary: "Source control and pull request triggers.",
    detail:
      "Developers push code and open pull requests. Webhooks or branch policies kick off the automation pipeline on every meaningful change.",
  },
  {
    id: "azure-devops",
    label: "Azure DevOps",
    summary: "CI orchestration, agents, and pipeline gates.",
    detail:
      "Azure Pipelines coordinates build, test, and deploy stages. Parallel jobs, artifact publishing, and quality gates keep releases controlled.",
  },
  {
    id: "playwright",
    label: "Playwright",
    summary: "Cross-browser UI and API test execution.",
    detail:
      "Playwright runs UI specs with auto-waiting, tracing, and parallel workers. API tests validate service contracts alongside browser flows.",
  },
  {
    id: "api-layer",
    label: "API Layer",
    summary: "Shared helpers for REST, auth, and test data.",
    detail:
      "A dedicated API layer wraps HTTP clients, token management, and payload builders so UI and API tests reuse the same foundation.",
  },
  {
    id: "reporting",
    label: "Reporting",
    summary: "Unified test results aggregation.",
    detail:
      "JUnit, JSON, and trace artifacts feed a reporting hub that normalizes pass/fail trends, flaky detection, and failure categorization.",
  },
];

export const reportingOutputs = ["Slack", "Datadog", "ReportPortal"] as const;

export const reportingOutputsDetail =
  "Slack alerts the team on failure. Datadog tracks pipeline health metrics. ReportPortal provides historical analysis and defect triage.";

export const architecturePatterns: ArchitecturePattern[] = [
  {
    id: "hybrid-automation",
    title: "Hybrid Automation Framework",
    summary: "Combine UI, API, and database validation in one cohesive stack.",
    detail:
      "A hybrid framework avoids siloed test types. Shared fixtures, configuration, and reporting let teams run smoke UI, API contract, and data checks from a single entry point.",
    practices: [
      "Single repo for UI, API, and shared utilities",
      "Environment-aware config loaded once per run",
      "Unified logging and retry policies across layers",
      "Tag-based execution for smoke, regression, and nightly suites",
    ],
  },
  {
    id: "page-object-model",
    title: "Page Object Model",
    summary: "Encapsulate locators and page actions behind stable interfaces.",
    detail:
      "Page objects isolate UI structure from test logic. When the DOM changes, updates happen in one place instead of across dozens of specs.",
    practices: [
      "One page class per screen or major component",
      "Locators private to the page object; tests call intent-based methods",
      "Composition over inheritance for shared widgets",
      "No assertions inside page objects — keep them in specs",
    ],
  },
  {
    id: "screenplay-pattern",
    title: "Screenplay Pattern",
    summary: "Model tests as actors performing tasks and asking questions.",
    detail:
      "Screenplay scales better than raw POM for complex flows. Actors, tasks, and interactions express behavior in business language readable by the whole team.",
    practices: [
      "Actors represent users or system roles",
      "Tasks encode reusable workflows (login, checkout, approve)",
      "Questions assert state without leaking locator details",
      "Abilities wrap tools like Playwright, API clients, or DB access",
    ],
  },
  {
    id: "api-ui-integration",
    title: "API + UI Integration",
    summary: "Set up state via API, validate outcomes through the UI.",
    detail:
      "API setup is faster and more reliable than UI-only prep. Hybrid tests create data via API, exercise the user journey in the browser, and confirm persistence via API or DB.",
    practices: [
      "Factory methods for users, orders, and test entities",
      "API teardown or idempotent test data strategies",
      "UI tests focus on what users see, not data creation",
      "Contract tests gate API changes before UI suites run",
    ],
  },
  {
    id: "parallel-execution",
    title: "Parallel Execution",
    summary: "Shard tests across workers and CI agents to cut feedback time.",
    detail:
      "Parallelism is a design concern, not an afterthought. Independent tests, isolated data, and shard-aware reporting keep runs fast without cross-test pollution.",
    practices: [
      "Worker-scoped fixtures for browser contexts",
      "Unique test data per worker or parallel-safe seeds",
      "CI matrix sharding by tag or directory",
      "Balanced shard assignment based on historical runtime",
    ],
  },
  {
    id: "reporting-pipeline",
    title: "Reporting Pipeline",
    summary: "Turn raw results into actionable quality signals.",
    detail:
      "Reporting is more than pass/fail counts. Traces, screenshots, logs, and trend data help teams prioritize fixes and prove release confidence to stakeholders.",
    practices: [
      "Attach traces and screenshots on first retry only",
      "Publish JUnit XML for CI and dashboard ingestion",
      "Track flaky rate and MTTR per suite over time",
      "Integrate Slack, Datadog, and ReportPortal for different audiences",
    ],
  },
  {
    id: "test-data-strategy",
    title: "Test Data Strategy",
    summary: "Reliable, isolated data that scales with parallel runs.",
    detail:
      "Flaky data is flaky tests. A clear strategy for creation, isolation, cleanup, and synthetic data keeps automation dependable in shared environments.",
    practices: [
      "API-first data setup with deterministic factories",
      "Namespace or prefix test entities by worker ID",
      "Seed reference data once; mutate per test in isolation",
      "Avoid hard-coded IDs that collide under parallel load",
    ],
  },
];

export function getPipelineStepByLabel(label: string): PipelineStep | undefined {
  return pipelineSteps.find((step) => step.label === label);
}

export function getPatternByTitle(title: string): ArchitecturePattern | undefined {
  return architecturePatterns.find((pattern) => pattern.title === title);
}

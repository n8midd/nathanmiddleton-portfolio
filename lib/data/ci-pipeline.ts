export interface CiPipelineStep {
  id: string;
  label: string;
  summary: string;
  detail: string;
  practices: string[];
  repoNote?: string;
}

export const ciPipelineIntro =
  "This visualizer walks through a typical enterprise commit-to-production pipeline. Stages reflect common quality gates from developer push through production validation. This lab's real workflow lives in .github/workflows/ci.yml and maps to several of these steps.";

export const ciPipelineWorkflowPath = ".github/workflows/ci.yml";

export const ciPipelineSteps: CiPipelineStep[] = [
  {
    id: "developer",
    label: "Developer",
    summary: "Engineer completes work and opens a pull request.",
    detail:
      "Developers finish a feature branch, run fast local checks, and open a PR for review. Quality culture starts before CI—pre-commit linting and targeted test runs catch obvious issues early.",
    practices: [
      "Run affected tests locally before pushing",
      "Keep PRs small enough to review and bisect failures",
      "Document risk areas and test evidence in the PR description",
    ],
  },
  {
    id: "git-commit",
    label: "Git Commit",
    summary: "Push or merge triggers the automation pipeline.",
    detail:
      "Webhooks fire on pull request and main-branch events. Branch protection rules require passing checks before merge. Every meaningful change gets the same quality gates.",
    practices: [
      "Require status checks before merge to main",
      "Run the full pipeline on PRs, not only after merge",
      "Block force-push to protected branches",
    ],
    repoNote: "GitHub Actions runs on push and pull_request to main.",
  },
  {
    id: "build",
    label: "Build",
    summary: "Compile, bundle, and validate the application artifact.",
    detail:
      "The build stage produces a deployable artifact and catches compile-time errors before expensive test stages. Failed builds fail fast with clear logs.",
    practices: [
      "Treat build warnings as signals, not noise",
      "Cache dependencies to keep feedback loops short",
      "Use the same Node/runtime version locally and in CI",
    ],
    repoNote: "This repo runs npm run build after lint, typecheck, and unit tests.",
  },
  {
    id: "unit-tests",
    label: "Unit Tests",
    summary: "Fast, isolated tests for pure logic and utilities.",
    detail:
      "Unit tests validate business rules, parsers, and helpers in milliseconds. They run before slower integration layers and provide the first automated quality signal after build prerequisites pass.",
    practices: [
      "Keep unit tests deterministic with no network or shared state",
      "Aim for high signal-per-second, not raw coverage percentage",
      "Fail the pipeline on unit regressions—do not skip to save time",
    ],
    repoNote: "Vitest runs via npm run test in CI.",
  },
  {
    id: "api-tests",
    label: "API Tests",
    summary: "Contract and integration validation for services and routes.",
    detail:
      "API tests verify HTTP contracts, auth, status codes, and payload shapes against real or stubbed dependencies. They catch integration breaks faster than full UI suites.",
    practices: [
      "Validate happy path, auth failures, and boundary payloads",
      "Use contract tests between consumer and provider teams",
      "Seed isolated test data per run to avoid cross-test pollution",
    ],
    repoNote: "Illustrative stage—health API exists; no separate API test job in CI yet.",
  },
  {
    id: "ui-tests",
    label: "UI Tests",
    summary: "End-to-end browser tests for critical user journeys.",
    detail:
      "UI automation exercises real browsers against a production-like build. Page Object Model structure, parallel workers, and trace-on-retry keep suites maintainable and diagnosable.",
    practices: [
      "Tag smoke vs regression for tiered execution",
      "Run against npm run start in CI for parity with production builds",
      "Attach traces and screenshots on first retry only",
    ],
    repoNote: "Playwright runs 149 e2e tests via npm run test:e2e with CI=true.",
  },
  {
    id: "performance",
    label: "Performance",
    summary: "Load, latency, and resource threshold checks.",
    detail:
      "Performance gates catch regressions in response time, throughput, and resource usage before they reach users. Thresholds should reflect SLOs, not arbitrary benchmarks.",
    practices: [
      "Baseline against staging with realistic think times and payloads",
      "Fail on sustained threshold breaches, not single spikes",
      "Run perf checks on a schedule if they are too slow for every PR",
    ],
    repoNote: "Illustrative stage—typical enterprise extension not yet in this repo's CI.",
  },
  {
    id: "deploy",
    label: "Deploy",
    summary: "Promote the validated artifact to a target environment.",
    detail:
      "Deployment automation pushes the built artifact to staging or production. Blue-green, canary, or rolling strategies reduce blast radius when something slips through earlier gates.",
    practices: [
      "Deploy only artifacts that passed all required gates",
      "Use environment-specific config and secrets management",
      "Keep rollback procedures tested and documented",
    ],
    repoNote: "Vercel deploys main branch after CI passes.",
  },
  {
    id: "smoke-tests",
    label: "Smoke Tests",
    summary: "Fast post-deploy validation of critical paths.",
    detail:
      "Smoke tests run against the deployed environment to confirm the release is alive—login, checkout, health endpoints, or other must-not-break flows. They are shorter than full regression.",
    practices: [
      "Keep smoke suites under 10 minutes for rapid rollback decisions",
      "Run against production-like URLs and feature flags",
      "Trigger automatically after deploy, before announcing release",
    ],
    repoNote: "This repo uses @smoke Playwright specs runnable post-deploy.",
  },
  {
    id: "production",
    label: "Production",
    summary: "Live traffic with monitoring and observability.",
    detail:
      "Production is the final stage—and the beginning of runtime quality. Synthetic checks, error rates, and customer feedback close the loop back to the next commit.",
    practices: [
      "Monitor error budgets and alert on SLO breaches",
      "Run synthetic probes for critical journeys",
      "Feed production incidents back into test coverage gaps",
    ],
    repoNote: "Quality Engineering Lab runs live on Vercel after merge to main.",
  },
];

export function getCiPipelineStepById(id: string): CiPipelineStep | undefined {
  return ciPipelineSteps.find((step) => step.id === id);
}

export function getCiPipelineStepByLabel(label: string): CiPipelineStep | undefined {
  return ciPipelineSteps.find((step) => step.label === label);
}

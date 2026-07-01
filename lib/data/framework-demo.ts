export type FrameworkSectionStatus = "live" | "planned";

export interface FrameworkSection {
  id: string;
  title: string;
  summary: string;
  detail: string;
  highlights: string[];
  codeSnippet?: string;
  status: FrameworkSectionStatus;
}

export interface FrameworkTreeEntry {
  path: string;
  description: string;
}

export const frameworkFileTree: FrameworkTreeEntry[] = [
  { path: "tests/e2e/", description: "Root of the live Playwright framework" },
  { path: "tests/e2e/fixtures/", description: "Custom test fixture with injected page objects" },
  { path: "tests/e2e/fixtures/test.fixture.ts", description: "Extends base test with POM instances" },
  { path: "tests/e2e/pages/", description: "Page Object Model — locators and assertions" },
  { path: "tests/e2e/pages/base.page.ts", description: "Shared goto, title, and URL helpers" },
  { path: "tests/e2e/specs/", description: "Smoke and regression spec files" },
  { path: "tests/e2e/specs/smoke.spec.ts", description: "Fast @smoke checks for CI" },
  { path: "tests/e2e/specs/regression/", description: "Feature-level @regression suites" },
  { path: "playwright.config.ts", description: "Parallelism, retries, reporters, webServer" },
  { path: ".github/workflows/ci.yml", description: "Lint, typecheck, unit tests, build, e2e" },
];

export const frameworkSections: FrameworkSection[] = [
  {
    id: "folder-structure",
    title: "Folder Structure",
    summary: "Separate fixtures, pages, and specs so each layer has a clear home.",
    detail:
      "The framework follows a conventional Playwright layout: fixtures inject page objects, pages encapsulate locators and actions, and specs stay thin. Shared test data lives in lib/data/ and is imported by both UI and tests.",
    highlights: [
      "tests/e2e/fixtures/ — custom Playwright fixture",
      "tests/e2e/pages/ — one page object per live feature route",
      "tests/e2e/specs/ — smoke.spec.ts plus regression/ per feature",
      "lib/data/ — shared constants consumed by UI and assertions",
    ],
    codeSnippet: `tests/e2e/
├── fixtures/test.fixture.ts
├── pages/
│   ├── base.page.ts
│   └── *.page.ts
└── specs/
    ├── smoke.spec.ts
    └── regression/`,
    status: "live",
  },
  {
    id: "fixtures",
    title: "Fixtures",
    summary: "Inject page objects into every spec via a custom Playwright fixture.",
    detail:
      "test.fixture.ts extends @playwright/test with typed fixtures for each page object. Specs import { test, expect } from the fixture and receive ready-made POM instances — no manual instantiation in every file.",
    highlights: [
      "Extends base.extend with shell, commandCenter, architecture, and more",
      "Single import path for all e2e specs",
      "New features add a page class + one fixture entry",
    ],
    codeSnippet: `export const test = base.extend({
  commandCenter: async ({ page }, use) => {
    await use(new CommandCenterPage(page));
  },
});`,
    status: "live",
  },
  {
    id: "page-objects",
    title: "Page Objects",
    summary: "Keep locators and assertions out of spec files.",
    detail:
      "Each live route has a page class extending BasePage. Methods like open(), expectHeader(), and feature-specific interactions live in pages/. Regression specs call page object methods only — they never touch raw locators directly.",
    highlights: [
      "BasePage provides goto, expectTitle, expectUrl",
      "data-testid hooks on UI align with POM locators",
      "Shared data from lib/data/ drives list and count assertions",
    ],
    status: "live",
  },
  {
    id: "helpers",
    title: "Helpers",
    summary: "Shared utilities for logging, retries, and cross-cutting concerns.",
    detail:
      "A dedicated helpers/ directory is planned for logging wrappers, retry policies, and API utilities that do not belong in page objects. Today those concerns are handled inline in POMs and playwright.config.ts.",
    highlights: [
      "Planned: tests/e2e/helpers/ for reusable utilities",
      "Keep helpers free of UI locators",
      "Document patterns on this page as they are added",
    ],
    status: "planned",
  },
  {
    id: "logging",
    title: "Logging & Reporting",
    summary: "Reporters and traces that make CI failures actionable.",
    detail:
      "playwright.config.ts configures list reporter locally and github reporter in CI. trace: on-first-retry captures DOM, network, and timeline data when a flaky failure retries — reducing mean time to triage.",
    highlights: [
      "GitHub Actions reporter annotates PR checks",
      "Traces attach on first retry only",
      "JUnit/XML can be added for downstream dashboards",
    ],
    codeSnippet: `reporter: process.env.CI ? "github" : "list",
use: { trace: "on-first-retry" }`,
    status: "live",
  },
  {
    id: "retry-logic",
    title: "Retry Logic",
    summary: "Automatic retries in CI to absorb transient failures without hiding real bugs.",
    detail:
      "Retries are enabled only in CI (retries: 2) so local runs fail fast. Combined with trace-on-first-retry, engineers get artifacts on the attempt that matters. Flake rate should still be tracked — retries are a safety net, not a substitute for stable tests.",
    highlights: [
      "retries: process.env.CI ? 2 : 0",
      "forbidOnly in CI prevents accidental test.only commits",
      "Pair retries with quarantine policy for chronic flakes",
    ],
    status: "live",
  },
  {
    id: "parallel-runs",
    title: "Parallel Runs",
    summary: "fullyParallel execution with worker tuning for CI vs local.",
    detail:
      "Specs run in parallel by default. CI uses workers: 1 for deterministic GitHub Actions runs; locally Playwright picks worker count based on CPU. Feature tests use isolated data so parallel shards do not collide.",
    highlights: [
      "fullyParallel: true across spec files",
      "CI workers: 1 for stable pipeline output",
      "Future: shard regression suites across matrix jobs",
    ],
    codeSnippet: `fullyParallel: true,
workers: process.env.CI ? 1 : undefined`,
    status: "live",
  },
  {
    id: "ci-integration",
    title: "CI Integration",
    summary: "GitHub Actions runs quality gates then Playwright against a production build.",
    detail:
      "GitHub Actions runs the quality pipeline: install dependencies, lint, typecheck, Vitest unit tests, Next.js build, Chromium install, and the full Playwright e2e suite with CI=true so Playwright starts a fresh webServer via npm run start.",
    highlights: [
      "Trigger: push and pull_request to main",
      "Order: lint → typecheck → unit → build → e2e",
      "Playwright uses production build, not dev server",
    ],
    status: "live",
  },
];

export function getSectionById(id: string): FrameworkSection | undefined {
  return frameworkSections.find((section) => section.id === id);
}

export function getSectionByTitle(title: string): FrameworkSection | undefined {
  return frameworkSections.find((section) => section.title === title);
}

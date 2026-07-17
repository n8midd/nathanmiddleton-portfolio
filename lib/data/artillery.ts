import { artilleryResults } from "@/lib/data/artillery-results.generated";
import type { DataSource } from "@/lib/data/data-source";

export const artilleryIntro =
  "Artillery's Playwright engine drives real headless browsers as virtual users, collecting session timing and Core Web Vitals (LCP, FCP) under light concurrent load. This page shows the latest captured report from this repo — not synthetic demo charts.";

export const artilleryRunInstructions = [
  "npm run build && npm run start",
  "npm run test:perf:update",
] as const;

export interface ArtilleryImplStep {
  id: string;
  label: string;
  summary: string;
  detail: string;
  practices: string[];
  repoNote?: string;
}

export const artilleryImplSteps: ArtilleryImplStep[] = [
  {
    id: "yaml-config",
    label: "YAML config",
    summary: "Target, phases, Playwright engine, and thresholds.",
    detail:
      "browser-load.yml points Artillery at the local production server, enables the Playwright engine, loads the processor, and defines a light arrivalCount phase suitable for a laptop demo. ensure thresholds fail the run if any virtual user fails.",
    practices: [
      "Keep local demo phases small — browser VUs are memory-heavy",
      "Fail on vusers.failed so broken flows surface as perf failures",
      "Point target at the same baseURL Playwright e2e uses",
    ],
    repoNote: "tests/performance/artillery/browser-load.yml",
  },
  {
    id: "playwright-flows",
    label: "Playwright flows",
    summary: "Real user journeys reused from e2e locators.",
    detail:
      "flows.ts exports homeBrowse, playgroundLogin, and labPageLoad. Each function receives a Playwright Page, navigates with data-testid locators shared with the functional suite, and completes a meaningful assertion before the VU ends.",
    practices: [
      "Prefer stable data-testid locators over brittle CSS",
      "Keep scenarios short so concurrent VUs stay within machine memory",
      "Reuse credentials and routes already proven in e2e",
    ],
    repoNote: "tests/performance/artillery/flows.ts",
  },
  {
    id: "web-vitals",
    label: "Web Vitals metrics",
    summary: "LCP and FCP captured per navigated URL.",
    detail:
      "Artillery records browser.page.LCP and browser.page.FCP histograms for pages under the target origin. That ties load testing to user-perceived performance, not only request latency.",
    practices: [
      "Watch LCP/FCP under concurrency, not only cold single-user runs",
      "Group metrics by URL to spot which journeys regress",
      "Treat local numbers as baselines — CI and prod differ",
    ],
    repoNote: "Metrics appear in the Artillery summary and JSON report.",
  },
  {
    id: "report-ingest",
    label: "Report ingest",
    summary: "JSON report becomes typed page data.",
    detail:
      "npm run test:perf writes reports/latest.json. generate:artillery parses aggregate counters and summaries into artillery-results.generated.ts so /artillery can render live KPIs without calling Artillery at request time.",
    practices: [
      "Commit a baseline report so builds work without a perf run",
      "Regenerate after meaningful journey or app changes",
      "Label results as live captured data, not demo charts",
    ],
    repoNote: "scripts/generate-artillery-results.mjs → lib/data/artillery-results.generated.ts",
  },
  {
    id: "ci-strategy",
    label: "CI strategy",
    summary: "On-demand locally — not every PR.",
    detail:
      "Browser-based load is expensive in CI (memory, time, flakiness on shared runners). This lab keeps Artillery off the default PR workflow and documents npm run test:perf for local or scheduled runs — the same pattern many enterprises use for full load suites.",
    practices: [
      "Run light smoke perf locally before merging risky UX changes",
      "Schedule heavier load separately from PR gates",
      "Keep functional Playwright e2e as the every-PR browser signal",
    ],
    repoNote: "Not in .github/workflows/ci.yml by design — see npm run test:perf.",
  },
];

export function getArtilleryImplStepById(id: string): ArtilleryImplStep | undefined {
  return artilleryImplSteps.find((step) => step.id === id);
}

export interface ArtilleryKpi {
  label: string;
  value: string;
  hint: string;
  dataSource: DataSource;
}

export function getArtilleryResultKpis(): ArtilleryKpi[] {
  const results = artilleryResults;
  const session = results.sessionLengthMs;

  return [
    {
      label: "VUs created",
      value: String(results.vusersCreated),
      hint: "Virtual users started in the light-load phase",
      dataSource: results.dataSource,
    },
    {
      label: "VUs completed",
      value: String(results.vusersCompleted),
      hint: "Sessions that finished without error",
      dataSource: results.dataSource,
    },
    {
      label: "VUs failed",
      value: String(results.vusersFailed),
      hint: "Must stay at 0 (ensure threshold)",
      dataSource: results.dataSource,
    },
    {
      label: "Session p95",
      value: session ? `${session.p95} ms` : "—",
      hint: "95th percentile VU session length",
      dataSource: results.dataSource,
    },
    {
      label: "Session mean",
      value: session ? `${session.mean} ms` : "—",
      hint: "Average VU session length",
      dataSource: results.dataSource,
    },
    {
      label: "Scenarios",
      value: String(results.scenarios.length),
      hint: results.scenarios.join(", "),
      dataSource: results.dataSource,
    },
  ];
}

export { artilleryResults };

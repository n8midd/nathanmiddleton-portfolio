import { labTestStats } from "@/lib/data/lab-test-stats.generated";
import type { DataSource } from "@/lib/data/data-source";

export type MetricStatus = "passing" | "failing" | "flaky" | "neutral";

export type MetricsChartType = "line" | "bar" | "area" | "progress";

export interface MetricsSummaryKpi {
  label: string;
  value?: string;
  hint?: string;
  status?: MetricStatus;
  dataSource: DataSource;
}

export interface MetricsChartPoint {
  name: string;
  value: number;
}

export interface MetricsChartConfig {
  id: string;
  title: string;
  description: string;
  type: MetricsChartType;
  data: MetricsChartPoint[];
  dataSource: DataSource;
  /** Used by progress-type charts */
  progressValue?: number;
  progressLabel?: string;
}

export type MetricsTimeRangeId = "7d" | "30d" | "90d";

export interface MetricsTimeRange {
  id: MetricsTimeRangeId;
  label: string;
  executionHistory: MetricsChartPoint[];
}

export const metricsDemoIntro =
  "Illustrative enterprise metrics below — sample data for UI demo purposes, not production telemetry.";

export const labSummaryKpis: MetricsSummaryKpi[] = [
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
    label: "Regression Tests",
    value: String(labTestStats.e2eRegressionTests),
    hint: "Playwright @regression",
    dataSource: "live",
  },
  {
    label: "Total Tests",
    value: String(labTestStats.totalTests),
    hint: "Unit + E2E in this repository",
    dataSource: "live",
  },
];

export const metricsSummaryKpis: MetricsSummaryKpi[] = [
  { label: "Pass Rate", value: "98.6%", hint: "Last 30 days", status: "passing", dataSource: "demo" },
  { label: "Total Runs", value: "15,432", hint: "Last 30 days", dataSource: "demo" },
  { label: "Flaky Tests", value: "12", hint: "Active quarantine", status: "flaky", dataSource: "demo" },
  { label: "Avg Runtime", value: "28m", hint: "Full regression suite", dataSource: "demo" },
  { label: "MTTR", value: "2.4h", hint: "Pipeline recovery", dataSource: "demo" },
  { label: "Build Health", status: "passing", dataSource: "demo" },
];

export const metricsTimeRanges: MetricsTimeRange[] = [
  {
    id: "7d",
    label: "7d",
    executionHistory: [
      { name: "Mon", value: 420 },
      { name: "Tue", value: 512 },
      { name: "Wed", value: 488 },
      { name: "Thu", value: 530 },
      { name: "Fri", value: 610 },
      { name: "Sat", value: 180 },
      { name: "Sun", value: 145 },
    ],
  },
  {
    id: "30d",
    label: "30d",
    executionHistory: [
      { name: "Week 1", value: 2840 },
      { name: "Week 2", value: 3120 },
      { name: "Week 3", value: 2980 },
      { name: "Week 4", value: 3492 },
    ],
  },
  {
    id: "90d",
    label: "90d",
    executionHistory: [
      { name: "Jan", value: 11200 },
      { name: "Feb", value: 12480 },
      { name: "Mar", value: 13120 },
    ],
  },
];

export const metricsCharts: MetricsChartConfig[] = [
  {
    id: "automation-growth",
    title: "Automation Growth",
    description: "Coverage percentage trend over the last six months.",
    type: "area",
    dataSource: "demo",
    data: [
      { name: "Oct", value: 78 },
      { name: "Nov", value: 82 },
      { name: "Dec", value: 85 },
      { name: "Jan", value: 88 },
      { name: "Feb", value: 90 },
      { name: "Mar", value: 92 },
    ],
  },
  {
    id: "flaky-tests",
    title: "Flaky Tests",
    description: "Quarantined flaky test count trending down.",
    type: "line",
    dataSource: "demo",
    data: [
      { name: "Oct", value: 34 },
      { name: "Nov", value: 28 },
      { name: "Dec", value: 22 },
      { name: "Jan", value: 18 },
      { name: "Feb", value: 15 },
      { name: "Mar", value: 12 },
    ],
  },
  {
    id: "average-runtime",
    title: "Average Runtime",
    description: "Mean execution time in minutes per suite.",
    type: "bar",
    dataSource: "demo",
    data: [
      { name: "Smoke", value: 4 },
      { name: "Regression", value: 28 },
      { name: "API", value: 12 },
      { name: "E2E", value: 45 },
      { name: "Perf", value: 18 },
    ],
  },
  {
    id: "execution-history",
    title: "Execution History",
    description: "Daily test runs over the selected time range.",
    type: "area",
    dataSource: "demo",
    data: metricsTimeRanges[1].executionHistory,
  },
  {
    id: "coverage",
    title: "Coverage",
    description: "Current automation coverage against critical user journeys.",
    type: "progress",
    dataSource: "demo",
    data: [],
    progressValue: 92,
    progressLabel: "Automation Coverage",
  },
  {
    id: "failed-tests",
    title: "Failed Tests",
    description: "Failures grouped by category in the last sprint.",
    type: "bar",
    dataSource: "demo",
    data: [
      { name: "UI", value: 8 },
      { name: "API", value: 5 },
      { name: "Data", value: 3 },
      { name: "Env", value: 2 },
      { name: "Other", value: 1 },
    ],
  },
  {
    id: "mttr",
    title: "MTTR",
    description: "Mean time to recovery for pipeline incidents (hours).",
    type: "line",
    dataSource: "demo",
    data: [
      { name: "Oct", value: 5.2 },
      { name: "Nov", value: 4.1 },
      { name: "Dec", value: 3.6 },
      { name: "Jan", value: 3.0 },
      { name: "Feb", value: 2.7 },
      { name: "Mar", value: 2.4 },
    ],
  },
  {
    id: "production-defects",
    title: "Production Defects",
    description: "Escaped defects found in production per month.",
    type: "line",
    dataSource: "demo",
    data: [
      { name: "Oct", value: 9 },
      { name: "Nov", value: 7 },
      { name: "Dec", value: 6 },
      { name: "Jan", value: 5 },
      { name: "Feb", value: 4 },
      { name: "Mar", value: 3 },
    ],
  },
];

export const metricsCoveragePercent = 92;

export function getChartById(id: string): MetricsChartConfig | undefined {
  return metricsCharts.find((chart) => chart.id === id);
}

export function getSummaryKpiByLabel(label: string): MetricsSummaryKpi | undefined {
  return [...labSummaryKpis, ...metricsSummaryKpis].find((kpi) => kpi.label === label);
}

export function getTimeRangeById(id: MetricsTimeRangeId): MetricsTimeRange | undefined {
  return metricsTimeRanges.find((range) => range.id === id);
}

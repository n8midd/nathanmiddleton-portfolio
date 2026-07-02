import { expect, type Locator, type Page } from "@playwright/test";
import {
  labSummaryKpis,
  metricsCharts,
  metricsCoveragePercent,
  metricsDemoIntro,
  metricsSummaryKpis,
  type MetricsTimeRangeId,
} from "../../../lib/data/metrics-dashboard";
import { getFeatureBySlug } from "../../../lib/site-config";
import { BasePage } from "./base.page";

const feature = getFeatureBySlug("metrics")!;

export class MetricsPage extends BasePage {
  readonly root: Locator;
  readonly dashboard: Locator;
  readonly liveGrid: Locator;
  readonly summaryGrid: Locator;
  readonly demoSection: Locator;

  constructor(page: Page) {
    super(page);
    this.root = page.getByTestId("metrics-page");
    this.dashboard = page.getByTestId("metrics-dashboard");
    this.liveGrid = page.getByTestId("metrics-live-grid");
    this.summaryGrid = page.getByTestId("metrics-summary-grid");
    this.demoSection = page.getByTestId("metrics-demo-section");
  }

  summaryCard(label: string): Locator {
    return this.page.locator(
      `[data-testid="metric-summary-card"][data-metric-label="${label}"]`,
    );
  }

  chartPanel(id: string): Locator {
    return this.page.locator(`[data-testid="metrics-chart-panel"][data-chart-id="${id}"]`);
  }

  async open() {
    await this.goto("/metrics");
    await expect(this.root).toBeVisible();
  }

  async expectPageTitle() {
    await this.expectTitle(/Metrics Dashboard \| Quality Engineering Lab/);
  }

  async expectHeader() {
    await expect(this.page.getByRole("heading", { level: 1, name: feature.label })).toBeVisible();
    await expect(this.page.getByText(feature.description)).toBeVisible();
  }

  async expectSingleH1() {
    await expect(this.page.getByRole("heading", { level: 1 })).toHaveCount(1);
  }

  async expectNoComingSoon() {
    await expect(this.page.getByText("Coming soon", { exact: true })).toHaveCount(0);
  }

  async expectLiveKpis() {
    for (const kpi of labSummaryKpis) {
      await expect(this.liveGrid.locator(`[data-metric-label="${kpi.label}"]`)).toBeVisible();
      if (kpi.value) {
        await expect(this.liveGrid.locator(`[data-metric-label="${kpi.label}"]`)).toContainText(
          kpi.value,
        );
      }
      await expect(
        this.liveGrid.locator(`[data-metric-label="${kpi.label}"]`).getByTestId("data-source-live"),
      ).toBeVisible();
    }
  }

  async expectDemoCallout() {
    await expect(this.demoSection.getByTestId("demo-data-callout")).toContainText(
      metricsDemoIntro,
    );
  }

  async expectAllSummaryKpis() {
    for (const kpi of metricsSummaryKpis) {
      await expect(this.summaryCard(kpi.label)).toBeVisible();
      if (kpi.value) {
        await expect(this.summaryCard(kpi.label)).toContainText(kpi.value);
      }
      await expect(this.summaryCard(kpi.label).getByTestId("data-source-demo")).toBeVisible();
    }
  }

  async expectAllChartsListed() {
    for (const chart of metricsCharts) {
      await expect(this.chartPanel(chart.id)).toBeVisible();
      await expect(this.chartPanel(chart.id)).toContainText(chart.title);
      await expect(this.chartPanel(chart.id).getByTestId("data-source-demo")).toBeVisible();
    }
  }

  async expectChartVisible(id: string) {
    await expect(this.chartPanel(id)).toBeVisible();
    await expect(this.page.getByTestId(`metrics-chart-${id}`)).toBeVisible();
  }

  async expectCoverageProgress() {
    await expect(this.page.getByTestId("metrics-coverage-progress")).toContainText(
      `${metricsCoveragePercent}%`,
    );
  }

  async selectTimeRange(rangeId: MetricsTimeRangeId) {
    await this.page
      .locator(`[data-testid="metrics-time-range"] [data-range-id="${rangeId}"]`)
      .click();
  }

  async expectExecutionHistoryVisible() {
    await expect(this.chartPanel("execution-history")).toBeVisible();
    await expect(this.page.getByTestId("metrics-chart-execution-history")).toBeVisible();
  }

  async expectExecutionHistoryRange(rangeId: MetricsTimeRangeId) {
    await expect(this.chartPanel("execution-history")).toHaveAttribute(
      "data-active-range",
      rangeId,
    );
  }
}

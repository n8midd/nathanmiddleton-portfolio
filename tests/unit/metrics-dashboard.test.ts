import { describe, expect, it } from "vitest";
import {
  getChartById,
  getSummaryKpiByLabel,
  getTimeRangeById,
  labSummaryKpis,
  metricsCharts,
  metricsCoveragePercent,
  metricsDemoIntro,
  metricsSummaryKpis,
  metricsTimeRanges,
} from "@/lib/data/metrics-dashboard";
import { labTestStats } from "@/lib/data/lab-test-stats.generated";

describe("metrics-dashboard data", () => {
  it("defines live lab summary KPIs from generated stats", () => {
    expect(labSummaryKpis).toHaveLength(5);
    expect(labSummaryKpis.every((kpi) => kpi.dataSource === "live")).toBe(true);
    expect(labSummaryKpis.find((kpi) => kpi.label === "Total Tests")?.value).toBe(
      String(labTestStats.totalTests),
    );
  });

  it("defines demo summary KPIs and intro copy", () => {
    expect(metricsSummaryKpis.length).toBeGreaterThan(0);
    expect(metricsSummaryKpis.every((kpi) => kpi.dataSource === "demo")).toBe(true);
    expect(metricsDemoIntro).toContain("Illustrative");
  });

  it("defines time ranges", () => {
    expect(metricsTimeRanges.map((range) => range.id)).toEqual(["7d", "30d", "90d"]);
  });

  it("marks chart configurations as demo data", () => {
    expect(metricsCharts.length).toBeGreaterThan(0);
    expect(metricsCharts.every((chart) => chart.dataSource === "demo")).toBe(true);
    const dataCharts = metricsCharts.filter((chart) => chart.type !== "progress");
    expect(dataCharts.every((chart) => chart.data.length > 0)).toBe(true);

    const coverageChart = getChartById("coverage");
    expect(coverageChart?.progressValue).toBe(metricsCoveragePercent);
  });

  it("looks up charts, KPIs, and time ranges", () => {
    expect(getChartById("flaky-tests")?.title).toBeTruthy();
    expect(getSummaryKpiByLabel("Pass Rate")?.dataSource).toBe("demo");
    expect(getSummaryKpiByLabel("Unit Tests")?.dataSource).toBe("live");
    expect(getTimeRangeById("30d")?.label).toBe("30d");
    expect(getChartById("missing")).toBeUndefined();
  });
});

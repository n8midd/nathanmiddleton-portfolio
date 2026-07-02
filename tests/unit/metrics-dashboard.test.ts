import { describe, expect, it } from "vitest";
import {
  getChartById,
  getSummaryKpiByLabel,
  getTimeRangeById,
  metricsCharts,
  metricsCoveragePercent,
  metricsSummaryKpis,
  metricsTimeRanges,
} from "@/lib/data/metrics-dashboard";

describe("metrics-dashboard data", () => {
  it("defines summary KPIs and time ranges", () => {
    expect(metricsSummaryKpis.length).toBeGreaterThan(0);
    expect(metricsTimeRanges.map((range) => range.id)).toEqual(["7d", "30d", "90d"]);
  });

  it("defines chart configurations", () => {
    expect(metricsCharts.length).toBeGreaterThan(0);
    const dataCharts = metricsCharts.filter((chart) => chart.type !== "progress");
    expect(dataCharts.every((chart) => chart.data.length > 0)).toBe(true);

    const coverageChart = getChartById("coverage");
    expect(coverageChart?.progressValue).toBe(metricsCoveragePercent);
  });

  it("looks up charts, KPIs, and time ranges", () => {
    expect(getChartById("flaky-tests")?.title).toBeTruthy();
    expect(getSummaryKpiByLabel("Pass Rate")?.status).toBe("passing");
    expect(getTimeRangeById("30d")?.label).toBe("30d");
    expect(getChartById("missing")).toBeUndefined();
  });

  it("exposes coverage percent KPI", () => {
    expect(metricsCoveragePercent).toBeGreaterThan(0);
  });
});

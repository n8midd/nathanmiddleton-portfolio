"use client";

import { useState } from "react";
import { DemoDataCallout } from "@/components/dashboard/demo-data-callout";
import { MetricCard } from "@/components/dashboard/metric-card";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import {
  labSummaryKpis,
  metricsCharts,
  metricsSummaryKpis,
  metricsTimeRanges,
  type MetricsTimeRangeId,
} from "@/lib/data/metrics-dashboard";
import { MetricsChartPanel } from "./metrics-chart-panel";

export function MetricsDashboard() {
  const [timeRange, setTimeRange] = useState<MetricsTimeRangeId>("30d");

  const executionHistoryData =
    metricsTimeRanges.find((range) => range.id === timeRange)?.executionHistory ??
    metricsTimeRanges[1].executionHistory;

  return (
    <div className="space-y-8" data-testid="metrics-dashboard">
      <section className="space-y-4" data-testid="metrics-live-section">
        <h2 className="text-lg font-semibold">This repository</h2>
        <div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          data-testid="metrics-live-grid"
        >
          {labSummaryKpis.map((kpi) => (
            <MetricCard
              key={kpi.label}
              label={kpi.label}
              value={kpi.value}
              hint={kpi.hint}
              testId="metric-summary-card"
              dataMetricLabel={kpi.label}
              dataSource={kpi.dataSource}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4" data-testid="metrics-demo-section">
        <h2 className="text-lg font-semibold">Illustrative enterprise dashboard</h2>
        <DemoDataCallout />

        <div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
          data-testid="metrics-summary-grid"
        >
          {metricsSummaryKpis.map((kpi) => (
            <MetricCard
              key={kpi.label}
              label={kpi.label}
              value={kpi.value}
              hint={kpi.hint}
              testId="metric-summary-card"
              dataMetricLabel={kpi.label}
              dataSource={kpi.dataSource}
            >
              {kpi.status ? <StatusBadge status={kpi.status} /> : null}
            </MetricCard>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2" data-testid="metrics-time-range">
          <span className="text-sm text-muted-foreground">Execution history range:</span>
          {metricsTimeRanges.map((range) => (
            <Button
              key={range.id}
              type="button"
              variant={timeRange === range.id ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range.id)}
              data-range-id={range.id}
            >
              {range.label}
            </Button>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {metricsCharts.map((chart) => (
            <MetricsChartPanel
              key={chart.id}
              chart={chart}
              dataOverride={
                chart.id === "execution-history" ? executionHistoryData : undefined
              }
              activeRange={chart.id === "execution-history" ? timeRange : undefined}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

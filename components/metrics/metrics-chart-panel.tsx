"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ProgressBar } from "@/components/dashboard/progress-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MetricsChartConfig } from "@/lib/data/metrics-dashboard";

interface MetricsChartPanelProps {
  chart: MetricsChartConfig;
  /** Override data for charts that support dynamic ranges (e.g. execution history) */
  dataOverride?: MetricsChartConfig["data"];
  activeRange?: string;
}

const chartColor = "var(--chart-1)";
const gridColor = "var(--border)";
const tickColor = "var(--muted-foreground)";

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-md border border-border bg-popover px-3 py-2 text-xs shadow-md">
      <p className="font-medium">{label}</p>
      <p className="font-mono text-[var(--chart-1)]">{payload[0].value}</p>
    </div>
  );
}

export function MetricsChartPanel({ chart, dataOverride, activeRange }: MetricsChartPanelProps) {
  const data = dataOverride ?? chart.data;

  return (
    <Card
      className="border-border/60 bg-card/80"
      data-testid="metrics-chart-panel"
      data-chart-id={chart.id}
      data-active-range={activeRange}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{chart.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{chart.description}</p>
      </CardHeader>
      <CardContent>
        {chart.type === "progress" ? (
          <ProgressBar
            label={chart.progressLabel ?? chart.title}
            value={chart.progressValue ?? 0}
            testId="metrics-coverage-progress"
          />
        ) : (
          <div className="h-56 w-full" data-testid={`metrics-chart-${chart.id}`}>
            <ResponsiveContainer width="100%" height="100%">
              {chart.type === "bar" ? (
                <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid stroke={gridColor} strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: tickColor, fontSize: 11, fontFamily: "var(--font-mono)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: tickColor, fontSize: 11, fontFamily: "var(--font-mono)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="value" fill={chartColor} radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : chart.type === "area" ? (
                <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid stroke={gridColor} strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: tickColor, fontSize: 11, fontFamily: "var(--font-mono)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: tickColor, fontSize: 11, fontFamily: "var(--font-mono)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={chartColor}
                    fill={chartColor}
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </AreaChart>
              ) : (
                <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid stroke={gridColor} strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: tickColor, fontSize: 11, fontFamily: "var(--font-mono)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: tickColor, fontSize: 11, fontFamily: "var(--font-mono)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={chartColor}
                    strokeWidth={2}
                    dot={{ fill: chartColor, r: 3 }}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

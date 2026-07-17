"use client";

import { useState } from "react";
import { DataSourceBadge } from "@/components/dashboard/data-source-badge";
import { MetricCard } from "@/components/dashboard/metric-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  artilleryImplSteps,
  artilleryIntro,
  artilleryResults,
  artilleryRunInstructions,
  getArtilleryResultKpis,
} from "@/lib/data/artillery";

type LabTab = "results" | "how";

export function ArtilleryLab() {
  const [tab, setTab] = useState<LabTab>("results");
  const [selectedId, setSelectedId] = useState(artilleryImplSteps[0]?.id ?? "");
  const selectedStep = artilleryImplSteps.find((step) => step.id === selectedId);
  const kpis = getArtilleryResultKpis();

  return (
    <section className="space-y-6" data-testid="artillery-lab">
      <p className="text-sm text-muted-foreground" data-testid="artillery-intro">
        {artilleryIntro}
      </p>

      <div className="flex flex-wrap gap-2" data-testid="artillery-tabs">
        <Button
          type="button"
          variant={tab === "results" ? "default" : "outline"}
          size="sm"
          data-testid="artillery-tab"
          data-tab-id="results"
          aria-pressed={tab === "results"}
          onClick={() => setTab("results")}
        >
          Results
        </Button>
        <Button
          type="button"
          variant={tab === "how" ? "default" : "outline"}
          size="sm"
          data-testid="artillery-tab"
          data-tab-id="how"
          aria-pressed={tab === "how"}
          onClick={() => setTab("how")}
        >
          How it works
        </Button>
      </div>

      {tab === "results" ? (
        <div className="space-y-6" data-testid="artillery-results">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <DataSourceBadge source={artilleryResults.dataSource} />
            <span data-testid="artillery-generated-at">
              Captured {new Date(artilleryResults.generatedAt).toLocaleString()}
            </span>
            {artilleryResults.sourceReport ? (
              <span className="font-mono text-xs" data-testid="artillery-source-report">
                {artilleryResults.sourceReport}
              </span>
            ) : null}
          </div>

          <div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            data-testid="artillery-kpi-grid"
          >
            {kpis.map((kpi) => (
              <MetricCard
                key={kpi.label}
                label={kpi.label}
                value={kpi.value}
                hint={kpi.hint}
                testId="artillery-kpi-card"
                dataMetricLabel={kpi.label}
                dataSource={kpi.dataSource}
              />
            ))}
          </div>

          <Card className="border-border/60 bg-card/80" data-testid="artillery-web-vitals">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Web Vitals (ms)</CardTitle>
            </CardHeader>
            <CardContent>
              {artilleryResults.webVitals.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No LCP/FCP metrics in the latest report. Re-run npm run test:perf:update.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-border/60 text-muted-foreground">
                        <th className="py-2 pr-4 font-medium">Metric</th>
                        <th className="py-2 pr-4 font-medium">Mean</th>
                        <th className="py-2 pr-4 font-medium">Median</th>
                        <th className="py-2 font-medium">p95</th>
                      </tr>
                    </thead>
                    <tbody>
                      {artilleryResults.webVitals.map((vital) => (
                        <tr
                          key={vital.metric}
                          className="border-b border-border/40"
                          data-testid="artillery-vital-row"
                          data-vital-name={vital.name}
                        >
                          <td className="py-2 pr-4 font-mono text-xs">{vital.name}</td>
                          <td className="py-2 pr-4 font-mono">{vital.mean}</td>
                          <td className="py-2 pr-4 font-mono">{vital.median}</td>
                          <td className="py-2 font-mono">{vital.p95}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/80" data-testid="artillery-run-help">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Refresh results locally</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Start a production server, then regenerate the committed report and page data:
              </p>
              <ol className="list-decimal space-y-1 pl-5 font-mono text-xs">
                {artilleryRunInstructions.map((cmd) => (
                  <li key={cmd}>{cmd}</li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6" data-testid="artillery-how">
          <div className="flex flex-col items-center gap-2">
            {artilleryImplSteps.map((step, index) => (
              <div key={step.id} className="flex w-full max-w-md flex-col items-center gap-2">
                <button
                  type="button"
                  data-testid="artillery-impl-step"
                  data-step-id={step.id}
                  aria-label={step.label}
                  aria-pressed={selectedId === step.id}
                  onClick={() => setSelectedId(step.id)}
                  className={cn(
                    "w-full rounded-lg border px-4 py-3 text-left transition-colors",
                    selectedId === step.id
                      ? "border-[var(--status-pass)]/50 bg-[var(--status-pass)]/10"
                      : "border-border/60 bg-card/80 hover:bg-accent/50",
                  )}
                >
                  <span className="font-mono text-sm font-semibold">{step.label}</span>
                  <p className="mt-1 text-xs text-muted-foreground">{step.summary}</p>
                </button>
                {index < artilleryImplSteps.length - 1 ? (
                  <span className="text-muted-foreground" aria-hidden="true">
                    ↓
                  </span>
                ) : null}
              </div>
            ))}
          </div>

          {selectedStep ? (
            <Card className="border-border/60 bg-card/80" data-testid="artillery-impl-detail">
              <CardHeader className="pb-2">
                <div className="flex flex-wrap items-center gap-2">
                  <CardTitle className="text-base">{selectedStep.label}</CardTitle>
                  <Badge variant="outline">{selectedStep.id}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>{selectedStep.detail}</p>
                <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                  {selectedStep.practices.map((practice) => (
                    <li key={practice}>{practice}</li>
                  ))}
                </ul>
                {selectedStep.repoNote ? (
                  <p
                    className="rounded-md border border-border/60 bg-muted/40 px-3 py-2 font-mono text-xs"
                    data-testid="artillery-repo-note"
                  >
                    {selectedStep.repoNote}
                  </p>
                ) : null}
              </CardContent>
            </Card>
          ) : null}
        </div>
      )}
    </section>
  );
}

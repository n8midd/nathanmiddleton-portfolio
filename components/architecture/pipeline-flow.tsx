"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  pipelineSteps,
  reportingOutputs,
  reportingOutputsDetail,
} from "@/lib/data/architecture";

export function PipelineFlow() {
  const [selectedId, setSelectedId] = useState(pipelineSteps[0]?.id ?? "");

  const selectedStep = pipelineSteps.find((step) => step.id === selectedId);

  return (
    <section className="space-y-4" data-testid="pipeline-flow">
      <h2 className="text-lg font-semibold">Reporting pipeline</h2>
      <p className="text-sm text-muted-foreground">
        Click each step to see how code moves from commit to quality signals.
      </p>

      <div className="flex flex-col items-center gap-2">
        {pipelineSteps.map((step, index) => (
          <div key={step.id} className="flex w-full max-w-md flex-col items-center gap-2">
            <button
              type="button"
              data-testid="pipeline-step"
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
            {index < pipelineSteps.length - 1 ? (
              <span className="text-muted-foreground" aria-hidden="true">
                ↓
              </span>
            ) : null}
          </div>
        ))}

        <span className="text-muted-foreground" aria-hidden="true">
          ↓
        </span>

        <div
          className="flex w-full max-w-md flex-wrap justify-center gap-2"
          data-testid="reporting-outputs"
        >
          {reportingOutputs.map((output) => (
            <span
              key={output}
              className="rounded-md border border-border/60 bg-muted px-3 py-1 font-mono text-xs"
            >
              {output}
            </span>
          ))}
        </div>
      </div>

      {selectedStep ? (
        <Card className="border-border/60 bg-card/80" data-testid="pipeline-detail">
          <CardHeader>
            <CardTitle className="text-base">{selectedStep.label}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>{selectedStep.detail}</p>
            {selectedStep.id === "reporting" ? <p>{reportingOutputsDetail}</p> : null}
          </CardContent>
        </Card>
      ) : null}
    </section>
  );
}

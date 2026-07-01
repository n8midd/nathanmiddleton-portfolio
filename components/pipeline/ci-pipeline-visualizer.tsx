"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ciPipelineIntro,
  ciPipelineSteps,
  ciPipelineWorkflowPath,
} from "@/lib/data/ci-pipeline";

export function CiPipelineVisualizer() {
  const [selectedId, setSelectedId] = useState(ciPipelineSteps[0]?.id ?? "");

  const selectedStep = ciPipelineSteps.find((step) => step.id === selectedId);

  return (
    <section className="space-y-6" data-testid="ci-pipeline-visualizer">
      <p className="text-sm text-muted-foreground">{ciPipelineIntro}</p>

      <div className="flex flex-col items-center gap-2">
        {ciPipelineSteps.map((step, index) => (
          <div key={step.id} className="flex w-full max-w-md flex-col items-center gap-2">
            <button
              type="button"
              data-testid="ci-pipeline-step"
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
            {index < ciPipelineSteps.length - 1 ? (
              <span className="text-muted-foreground" aria-hidden="true">
                ↓
              </span>
            ) : null}
          </div>
        ))}
      </div>

      {selectedStep ? (
        <Card className="border-border/60 bg-card/80" data-testid="ci-pipeline-detail">
          <CardHeader>
            <CardTitle className="text-base">{selectedStep.label}</CardTitle>
            <p className="text-sm text-muted-foreground">{selectedStep.summary}</p>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>{selectedStep.detail}</p>
            {selectedStep.repoNote ? (
              <Badge variant="outline" className="font-mono text-xs" data-testid="ci-pipeline-repo-note">
                This lab: {selectedStep.repoNote}
              </Badge>
            ) : null}
            <ul className="list-disc space-y-1 pl-5">
              {selectedStep.practices.map((practice) => (
                <li key={practice}>{practice}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : null}

      <Card className="border-dashed border-border/60 bg-card/40">
        <CardContent className="pt-4 text-sm text-muted-foreground">
          Real workflow for this project:{" "}
          <code className="font-mono text-xs">{ciPipelineWorkflowPath}</code>
        </CardContent>
      </Card>
    </section>
  );
}

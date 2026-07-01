"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ragEvaluationCriteria, ragSampleResponse } from "@/lib/data/ai-testing";

type CriterionStatus = "pass" | "fail" | "unset";

export function RagEvaluationDemo() {
  const [statuses, setStatuses] = useState<Record<string, CriterionStatus>>({});

  const score = useMemo(() => {
    const rated = ragEvaluationCriteria.filter(
      (criterion) => statuses[criterion.id] === "pass" || statuses[criterion.id] === "fail",
    );
    const passed = rated.filter((criterion) => statuses[criterion.id] === "pass").length;
    return { passed, total: ragEvaluationCriteria.length, rated: rated.length };
  }, [statuses]);

  const setStatus = (criterionId: string, status: "pass" | "fail") => {
    setStatuses((prev) => ({
      ...prev,
      [criterionId]: status,
    }));
  };

  return (
    <div className="space-y-4 rounded-lg border border-border/60 bg-muted/20 p-4" data-testid="rag-evaluation-demo">
      <h3 className="text-sm font-semibold">RAG evaluation demo</h3>
      <p className="text-xs text-muted-foreground">
        Sample question: &quot;How should I handle waiting in Playwright tests?&quot;
      </p>
      <blockquote
        className="rounded-md border border-border/60 bg-background px-4 py-3 text-sm leading-relaxed"
        data-testid="rag-sample-response"
      >
        {ragSampleResponse}
      </blockquote>

      <ul className="space-y-3">
        {ragEvaluationCriteria.map((criterion) => {
          const status = statuses[criterion.id] ?? "unset";

          return (
            <li
              key={criterion.id}
              className={cn(
                "rounded-md border p-3 transition-colors",
                status === "pass" && "border-[var(--status-pass)]/50 bg-[var(--status-pass)]/5",
                status === "fail" && "border-[var(--status-fail)]/50 bg-[var(--status-fail)]/5",
                status === "unset" && "border-border/60 bg-card/80",
              )}
              data-testid="rag-criterion"
              data-criterion-id={criterion.id}
              data-rating={status}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium">{criterion.label}</p>
                {status !== "unset" ? (
                  <span
                    className={cn(
                      "rounded-md px-2 py-0.5 font-mono text-xs uppercase",
                      status === "pass" &&
                        "bg-[var(--status-pass)]/15 text-[var(--status-pass)]",
                      status === "fail" &&
                        "bg-[var(--status-fail)]/15 text-[var(--status-fail)]",
                    )}
                    data-testid={`rag-criterion-${criterion.id}-status`}
                  >
                    {status}
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{criterion.description}</p>
              <div className="mt-2 flex gap-2" role="group" aria-label={`Rate ${criterion.label}`}>
                <Button
                  type="button"
                  size="xs"
                  variant="outline"
                  aria-pressed={status === "pass"}
                  onClick={() => setStatus(criterion.id, "pass")}
                  className={cn(
                    status === "pass" &&
                      "border-[var(--status-pass)]/50 bg-[var(--status-pass)]/15 text-[var(--status-pass)] hover:bg-[var(--status-pass)]/20",
                  )}
                  data-testid={`rag-criterion-${criterion.id}-pass`}
                  data-selected={status === "pass"}
                >
                  Pass
                </Button>
                <Button
                  type="button"
                  size="xs"
                  variant="outline"
                  aria-pressed={status === "fail"}
                  onClick={() => setStatus(criterion.id, "fail")}
                  className={cn(
                    status === "fail" &&
                      "border-[var(--status-fail)]/50 bg-[var(--status-fail)]/15 text-[var(--status-fail)] hover:bg-[var(--status-fail)]/20",
                  )}
                  data-testid={`rag-criterion-${criterion.id}-fail`}
                  data-selected={status === "fail"}
                >
                  Fail
                </Button>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="text-sm font-mono" data-testid="rag-eval-score">
        Score: {score.passed}/{score.total} passed ({score.rated} rated)
      </p>
    </div>
  );
}

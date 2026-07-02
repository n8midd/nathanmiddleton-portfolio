"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  promptQualityCriteria,
  scorePromptOutput,
  type PromptOutputRating,
  type RagEvaluationCriterion,
} from "@/lib/data/ai-testing";

interface PromptOutputRaterProps {
  response: string;
  criteria?: RagEvaluationCriterion[];
  testId?: string;
}

export function PromptOutputRater({
  response,
  criteria = promptQualityCriteria,
  testId = "prompt-output-rater",
}: PromptOutputRaterProps) {
  const [ratings, setRatings] = useState<Record<string, PromptOutputRating>>({});

  const score = useMemo(() => scorePromptOutput(criteria, ratings), [criteria, ratings]);

  const setRating = (criterionId: string, rating: "pass" | "fail") => {
    setRatings((current) => ({ ...current, [criterionId]: rating }));
  };

  return (
    <div className="space-y-4" data-testid={testId}>
      <blockquote
        className="rounded-md border border-border/60 bg-background px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap"
        data-testid="prompt-lab-response"
      >
        {response}
      </blockquote>

      <ul className="space-y-3">
        {criteria.map((criterion) => {
          const rating = ratings[criterion.id] ?? "unset";

          return (
            <li
              key={criterion.id}
              className={cn(
                "rounded-md border p-3 transition-colors",
                rating === "pass" && "border-[var(--status-pass)]/50 bg-[var(--status-pass)]/5",
                rating === "fail" && "border-[var(--status-fail)]/50 bg-[var(--status-fail)]/5",
                rating === "unset" && "border-border/60 bg-card/80",
              )}
              data-testid="rag-criterion"
              data-criterion-id={criterion.id}
              data-rating={rating}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium">{criterion.label}</p>
                {rating !== "unset" ? (
                  <span
                    className={cn(
                      "rounded-md px-2 py-0.5 font-mono text-xs uppercase",
                      rating === "pass" &&
                        "bg-[var(--status-pass)]/15 text-[var(--status-pass)]",
                      rating === "fail" &&
                        "bg-[var(--status-fail)]/15 text-[var(--status-fail)]",
                    )}
                    data-testid={`rag-criterion-${criterion.id}-status`}
                  >
                    {rating}
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{criterion.description}</p>
              <div className="mt-2 flex gap-2" role="group" aria-label={`Rate ${criterion.label}`}>
                <Button
                  type="button"
                  size="xs"
                  variant="outline"
                  aria-pressed={rating === "pass"}
                  onClick={() => setRating(criterion.id, "pass")}
                  className={cn(
                    rating === "pass" &&
                      "border-[var(--status-pass)]/50 bg-[var(--status-pass)]/15 text-[var(--status-pass)] hover:bg-[var(--status-pass)]/20",
                  )}
                  data-testid={`rag-criterion-${criterion.id}-pass`}
                  data-selected={rating === "pass"}
                >
                  Pass
                </Button>
                <Button
                  type="button"
                  size="xs"
                  variant="outline"
                  aria-pressed={rating === "fail"}
                  onClick={() => setRating(criterion.id, "fail")}
                  className={cn(
                    rating === "fail" &&
                      "border-[var(--status-fail)]/50 bg-[var(--status-fail)]/15 text-[var(--status-fail)] hover:bg-[var(--status-fail)]/20",
                  )}
                  data-testid={`rag-criterion-${criterion.id}-fail`}
                  data-selected={rating === "fail"}
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

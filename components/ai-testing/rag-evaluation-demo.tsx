"use client";

import { ragSampleResponse } from "@/lib/data/ai-testing";
import { PromptOutputRater } from "./prompt-output-rater";

export function RagEvaluationDemo() {
  return (
    <div className="space-y-4 rounded-lg border border-border/60 bg-muted/20 p-4" data-testid="rag-evaluation-demo">
      <h3 className="text-sm font-semibold">RAG evaluation demo</h3>
      <p className="text-xs text-muted-foreground">
        Sample question: &quot;How should I handle waiting in Playwright tests?&quot;
      </p>
      <PromptOutputRater response={ragSampleResponse} testId="rag-evaluation-rater" />
    </div>
  );
}

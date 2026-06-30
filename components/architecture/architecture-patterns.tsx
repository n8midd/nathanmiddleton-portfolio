"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { architecturePatterns } from "@/lib/data/architecture";

export function ArchitecturePatterns() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedPattern = architecturePatterns.find((pattern) => pattern.id === selectedId);

  return (
    <section className="space-y-4" data-testid="architecture-patterns">
      <h2 className="text-lg font-semibold">Framework patterns</h2>
      <p className="text-sm text-muted-foreground">
        Select a pattern to explore how each layer of the automation stack fits together.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {architecturePatterns.map((pattern) => {
          const isSelected = selectedId === pattern.id;

          return (
            <button
              key={pattern.id}
              type="button"
              data-testid="pattern-card"
              aria-label={pattern.title}
              aria-expanded={isSelected}
              onClick={() => setSelectedId(pattern.id)}
              className={cn(
                "rounded-xl text-left ring-1 ring-foreground/10 transition-colors",
                isSelected ? "ring-[var(--status-pass)]/50" : "hover:bg-accent/30",
              )}
            >
              <Card className="h-full border-0 bg-card/80 shadow-none">
                <CardHeader>
                  <CardTitle className="text-base">{pattern.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{pattern.summary}</p>
                </CardContent>
              </Card>
            </button>
          );
        })}
      </div>

      {selectedPattern ? (
        <Card className="border-border/60 bg-card/80" data-testid="pattern-detail">
          <CardHeader>
            <CardTitle className="text-base">{selectedPattern.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>{selectedPattern.detail}</p>
            <ul className="list-disc space-y-1 pl-5">
              {selectedPattern.practices.map((practice) => (
                <li key={practice}>{practice}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : null}
    </section>
  );
}

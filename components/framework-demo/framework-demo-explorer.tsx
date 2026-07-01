"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { frameworkSections, getSectionById } from "@/lib/data/framework-demo";

export function FrameworkDemoExplorer() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedSection = selectedId ? getSectionById(selectedId) : undefined;

  return (
    <section className="space-y-4" data-testid="framework-demo-explorer">
      <h2 className="text-lg font-semibold">Framework tour</h2>
      <p className="text-sm text-muted-foreground">
        Select a section to explore how each part of the automation stack is organized.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {frameworkSections.map((section) => {
          const isSelected = selectedId === section.id;

          return (
            <button
              key={section.id}
              type="button"
              data-testid="section-card"
              data-section-id={section.id}
              aria-label={section.title}
              aria-expanded={isSelected}
              onClick={() => setSelectedId(section.id)}
              className={cn(
                "rounded-xl text-left ring-1 ring-foreground/10 transition-colors",
                isSelected ? "ring-[var(--status-pass)]/50" : "hover:bg-accent/30",
              )}
            >
              <Card className="h-full border-0 bg-card/80 shadow-none">
                <CardHeader className="gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <CardTitle className="text-base">{section.title}</CardTitle>
                    {section.status === "planned" ? (
                      <Badge
                        variant="outline"
                        className="font-mono text-xs uppercase"
                        data-testid="section-planned-badge"
                      >
                        planned
                      </Badge>
                    ) : null}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{section.summary}</p>
                </CardContent>
              </Card>
            </button>
          );
        })}
      </div>

      {selectedSection ? (
        <Card className="border-border/60 bg-card/80" data-testid="section-detail">
          <CardHeader>
            <CardTitle className="text-base">{selectedSection.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>{selectedSection.detail}</p>
            <ul className="list-disc space-y-1 pl-5">
              {selectedSection.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            {selectedSection.codeSnippet ? (
              <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/50 p-4 font-mono text-xs leading-6 text-foreground">
                {selectedSection.codeSnippet}
              </pre>
            ) : null}
          </CardContent>
        </Card>
      ) : null}
    </section>
  );
}

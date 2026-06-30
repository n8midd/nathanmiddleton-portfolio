"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { bugHuntTotalBugs, getBugById, hiddenBugs } from "@/lib/data/bug-hunt";

interface BugTrackerProps {
  foundBugIds: Set<string>;
}

export function BugTracker({ foundBugIds }: BugTrackerProps) {
  return (
    <aside className="space-y-4" data-testid="bug-tracker">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Bug tracker</h2>
        <Badge variant="outline" className="font-mono text-xs" data-testid="bug-progress">
          {foundBugIds.size} / {bugHuntTotalBugs} found
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground">
        Explore the cart and trigger each defect. Found bugs reveal their title and description.
      </p>
      <ul className="space-y-3">
        {hiddenBugs.map((bug) => {
          const isFound = foundBugIds.has(bug.id);

          return (
            <li key={bug.id}>
              <Card
                className={cn(
                  "border-border/60 bg-card/80",
                  isFound && "border-[var(--status-pass)]/40",
                )}
                data-testid="bug-item"
                data-bug-id={bug.id}
                data-found={isFound ? "true" : "false"}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-sm">
                      {isFound ? bug.title : bug.category}
                    </CardTitle>
                    <Badge variant="outline" className="font-mono text-[10px] uppercase">
                      {isFound ? "found" : "hidden"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>{isFound ? bug.description : bug.hint}</p>
                </CardContent>
              </Card>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
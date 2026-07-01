"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { PlaygroundDemoShell } from "../playground-demo-shell";
import type { PlaygroundDemo } from "@/lib/data/playground";

interface DynamicIdsDemoProps {
  demo: PlaygroundDemo;
}

function randomId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export function DynamicIdsDemo({ demo }: DynamicIdsDemoProps) {
  const dynamicButtonId = useMemo(() => randomId("btn"), []);
  const dynamicPanelId = useMemo(() => randomId("panel"), []);

  return (
    <PlaygroundDemoShell demo={demo}>
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Button id: <code>{dynamicButtonId}</code> (changes on each page load)
        </p>
        <Button id={dynamicButtonId} type="button" data-testid="dynamic-action-button">
          Stable testid target
        </Button>
        <div
          id={dynamicPanelId}
          className="rounded-md bg-muted px-4 py-3 text-sm"
          data-testid="dynamic-panel"
        >
          Panel id: {dynamicPanelId} — use data-testid instead of id for automation.
        </div>
      </div>
    </PlaygroundDemoShell>
  );
}

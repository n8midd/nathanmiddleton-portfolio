"use client";

import { PlaygroundDemoShell } from "../playground-demo-shell";
import type { PlaygroundDemo } from "@/lib/data/playground";

interface IframesDemoProps {
  demo: PlaygroundDemo;
}

export function IframesDemo({ demo }: IframesDemoProps) {
  return (
    <PlaygroundDemoShell demo={demo}>
      <iframe
        src="/playground/embed"
        title="Playground embed"
        className="h-48 w-full rounded-md border border-border"
        data-testid="playground-iframe"
      />
      <p className="mt-4 text-sm text-muted-foreground">
        Use frameLocator to interact with the form inside the iframe.
      </p>
    </PlaygroundDemoShell>
  );
}

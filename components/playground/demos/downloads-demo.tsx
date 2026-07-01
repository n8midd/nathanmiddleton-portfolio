"use client";

import { Button } from "@/components/ui/button";
import { PlaygroundDemoShell } from "../playground-demo-shell";
import type { PlaygroundDemo } from "@/lib/data/playground";

interface DownloadsDemoProps {
  demo: PlaygroundDemo;
}

export function DownloadsDemo({ demo }: DownloadsDemoProps) {
  const handleDownload = () => {
    const content = "Hello from the Testing Playground download demo!";
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "playground-sample.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PlaygroundDemoShell demo={demo}>
      <Button type="button" onClick={handleDownload} data-testid="download-button">
        Download sample file
      </Button>
      <p className="mt-4 text-sm text-muted-foreground">
        Clicking the button triggers a client-side download of playground-sample.txt.
      </p>
    </PlaygroundDemoShell>
  );
}

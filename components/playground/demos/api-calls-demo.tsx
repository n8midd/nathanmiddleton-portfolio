"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { playgroundItemsApiPath } from "@/lib/data/playground";
import { PlaygroundDemoShell } from "../playground-demo-shell";
import type { PlaygroundDemo } from "@/lib/data/playground";

interface ApiCallsDemoProps {
  demo: PlaygroundDemo;
}

type FetchState = "idle" | "loading" | "success" | "error";

export function ApiCallsDemo({ demo }: ApiCallsDemoProps) {
  const [state, setState] = useState<FetchState>("idle");
  const [items, setItems] = useState<string[]>([]);

  const fetchItems = async () => {
    setState("loading");
    setItems([]);

    try {
      const response = await fetch(playgroundItemsApiPath);
      if (!response.ok) {
        setState("error");
        return;
      }
      const data = (await response.json()) as { items: string[] };
      setItems(data.items);
      setState("success");
    } catch {
      setState("error");
    }
  };

  return (
    <PlaygroundDemoShell demo={demo}>
      <Button type="button" onClick={fetchItems} data-testid="fetch-items-button">
        Fetch items
      </Button>

      {state === "loading" ? (
        <p className="mt-4 text-sm text-muted-foreground" data-testid="api-loading">
          Loading...
        </p>
      ) : null}

      {state === "error" ? (
        <p className="mt-4 text-sm text-destructive" data-testid="api-error">
          Failed to load items.
        </p>
      ) : null}

      {state === "success" ? (
        <ul className="mt-4 space-y-1 text-sm" data-testid="api-results">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </PlaygroundDemoShell>
  );
}

"use client";

import { useCallback, useRef, useState } from "react";
import {
  infiniteScrollBatchSize,
  infiniteScrollInitialCount,
} from "@/lib/data/playground";
import { PlaygroundDemoShell } from "../playground-demo-shell";
import type { PlaygroundDemo } from "@/lib/data/playground";

interface InfiniteScrollDemoProps {
  demo: PlaygroundDemo;
}

export function InfiniteScrollDemo({ demo }: InfiniteScrollDemoProps) {
  const [items, setItems] = useState<string[]>(() =>
    Array.from({ length: infiniteScrollInitialCount }, (_, index) => `Item ${index + 1}`),
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  const loadMore = useCallback(() => {
    if (loadingRef.current) return;
    loadingRef.current = true;

    setTimeout(() => {
      setItems((prev) => {
        const start = prev.length + 1;
        const batch = Array.from(
          { length: infiniteScrollBatchSize },
          (_, index) => `Item ${start + index}`,
        );
        return [...prev, ...batch];
      });
      loadingRef.current = false;
    }, 300);
  }, []);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const nearBottom =
      container.scrollTop + container.clientHeight >= container.scrollHeight - 40;

    if (nearBottom) {
      loadMore();
    }
  };

  return (
    <PlaygroundDemoShell demo={demo}>
      <p className="mb-2 text-sm text-muted-foreground" data-testid="infinite-scroll-count">
        Loaded items: {items.length}
      </p>
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-64 overflow-y-auto rounded-md border border-border p-3"
        data-testid="infinite-scroll-container"
      >
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item}
              className="rounded-md bg-muted px-3 py-2 text-sm"
              data-testid="infinite-scroll-item"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </PlaygroundDemoShell>
  );
}

"use client";

import { useState } from "react";
import { PlaygroundDemoShell } from "../playground-demo-shell";
import type { PlaygroundDemo } from "@/lib/data/playground";

interface DragAndDropDemoProps {
  demo: PlaygroundDemo;
}

const initialItems = ["Alpha", "Beta", "Gamma"];

export function DragAndDropDemo({ demo }: DragAndDropDemoProps) {
  const [items, setItems] = useState(initialItems);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (event: React.DragEvent, index: number) => {
    event.preventDefault();
    if (dragIndex === null || dragIndex === index) return;

    setItems((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(index, 0, moved);
      return next;
    });
    setDragIndex(index);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
  };

  return (
    <PlaygroundDemoShell demo={demo}>
      <ul className="space-y-2" data-testid="drag-drop-list">
        {items.map((item, index) => (
          <li
            key={item}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(event) => handleDragOver(event, index)}
            onDragEnd={handleDragEnd}
            className="cursor-grab rounded-md border border-border bg-muted px-4 py-3 text-sm active:cursor-grabbing"
            data-testid={`drag-item-${item.toLowerCase()}`}
          >
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-muted-foreground" data-testid="drag-drop-order">
        Order: {items.join(", ")}
      </p>
    </PlaygroundDemoShell>
  );
}

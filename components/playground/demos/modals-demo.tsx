"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlaygroundDemoShell } from "../playground-demo-shell";
import type { PlaygroundDemo } from "@/lib/data/playground";

interface ModalsDemoProps {
  demo: PlaygroundDemo;
}

export function ModalsDemo({ demo }: ModalsDemoProps) {
  const [open, setOpen] = useState(false);

  return (
    <PlaygroundDemoShell demo={demo}>
      <Button type="button" onClick={() => setOpen(true)} data-testid="open-modal-button">
        Open modal
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent data-testid="playground-modal">
          <DialogHeader>
            <DialogTitle>Sample modal</DialogTitle>
            <DialogDescription>
              This dialog traps focus while open. Close it to return to the page.
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm" data-testid="modal-body">
            Modal content is visible and interactive.
          </p>
        </DialogContent>
      </Dialog>

      {!open ? (
        <p className="mt-4 text-sm text-muted-foreground" data-testid="modal-closed-indicator">
          Modal is closed.
        </p>
      ) : null}
    </PlaygroundDemoShell>
  );
}

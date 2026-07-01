"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlaygroundDemoShell } from "../playground-demo-shell";
import type { PlaygroundDemo } from "@/lib/data/playground";

interface AlertsDemoProps {
  demo: PlaygroundDemo;
}

export function AlertsDemo({ demo }: AlertsDemoProps) {
  const [toast, setToast] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const showToast = () => {
    setToast("Action completed successfully.");
    setTimeout(() => setToast(""), 3000);
  };

  const confirmDelete = () => {
    setDeleted(true);
    setConfirmOpen(false);
  };

  return (
    <PlaygroundDemoShell demo={demo}>
      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={showToast} data-testid="show-toast-button">
          Show toast
        </Button>
        <Button
          type="button"
          variant="destructive"
          onClick={() => setConfirmOpen(true)}
          data-testid="delete-button"
        >
          Delete item
        </Button>
      </div>

      {toast ? (
        <div
          role="alert"
          className="mt-4 rounded-md border border-border bg-muted px-4 py-3 text-sm"
          data-testid="toast-alert"
        >
          {toast}
        </div>
      ) : null}

      {deleted ? (
        <p className="mt-4 text-sm text-destructive" data-testid="delete-confirmed">
          Item deleted.
        </p>
      ) : null}

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent data-testid="confirm-dialog">
          <DialogHeader>
            <DialogTitle>Confirm deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this item? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmOpen(false)}
              data-testid="confirm-cancel"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={confirmDelete}
              data-testid="confirm-delete"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PlaygroundDemoShell>
  );
}

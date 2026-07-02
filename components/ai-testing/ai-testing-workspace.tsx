"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AiTestingBrowser } from "./ai-testing-browser";
import { PromptLab } from "./prompt-lab";

type AiTestingTab = "topics" | "lab";

export function AiTestingWorkspace() {
  const [activeTab, setActiveTab] = useState<AiTestingTab>("topics");

  return (
    <div className="space-y-6" data-testid="ai-testing-workspace">
      <div
        className="flex flex-wrap gap-2"
        data-testid="ai-testing-page-tabs"
        role="tablist"
        aria-label="AI in Testing sections"
      >
        <PageTab
          id="topics"
          label="Topics"
          isActive={activeTab === "topics"}
          onSelect={() => setActiveTab("topics")}
        />
        <PageTab
          id="lab"
          label="Prompt Lab"
          isActive={activeTab === "lab"}
          onSelect={() => setActiveTab("lab")}
        />
      </div>

      {activeTab === "topics" ? (
        <AiTestingBrowser />
      ) : (
        <PromptLab />
      )}
    </div>
  );
}

interface PageTabProps {
  id: string;
  label: string;
  isActive: boolean;
  onSelect: () => void;
}

function PageTab({ id, label, isActive, onSelect }: PageTabProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      data-testid="ai-testing-page-tab"
      data-tab-id={id}
      onClick={onSelect}
      className={cn(
        "rounded-md border px-4 py-2 text-sm font-medium transition-colors",
        isActive
          ? "border-[var(--status-pass)]/50 bg-[var(--status-pass)]/10 text-foreground"
          : "border-border/60 bg-card/80 text-muted-foreground hover:bg-accent/30 hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}

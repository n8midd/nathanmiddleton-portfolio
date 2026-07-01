"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ALL_CATEGORIES_ID,
  filterStackTools,
  getCategoryById,
  getToolById,
  stackCategories,
  type StackTool,
} from "@/lib/data/technical-stack";
import { ToolDetailPanel } from "./tool-detail-panel";

export function StackExplorer() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(ALL_CATEGORIES_ID);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);

  const filteredTools = useMemo(
    () => filterStackTools(searchQuery, selectedCategoryId),
    [searchQuery, selectedCategoryId],
  );

  const selectedTool = selectedToolId ? getToolById(selectedToolId) : undefined;

  function handleCategoryChange(categoryId: string) {
    setSelectedCategoryId(categoryId);
    setSelectedToolId(null);
  }

  function handleToolClick(tool: StackTool) {
    setSelectedToolId((current) => (current === tool.id ? null : tool.id));
  }

  return (
    <section className="space-y-6" data-testid="stack-explorer">
      <div className="space-y-2">
        <label htmlFor="stack-search" className="text-sm font-medium">
          Search tools
        </label>
        <input
          id="stack-search"
          type="search"
          placeholder="Search by name, rationale, or category..."
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
            setSelectedToolId(null);
          }}
          data-testid="stack-search"
          className="w-full rounded-lg border border-border/60 bg-card/80 px-4 py-2 text-sm outline-none ring-ring/50 focus-visible:ring-[3px]"
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Categories</h2>
        <div
          className="flex flex-wrap gap-2"
          data-testid="category-tabs"
          role="tablist"
          aria-label="Technical stack categories"
        >
          <CategoryTab
            id={ALL_CATEGORIES_ID}
            label="All"
            isSelected={selectedCategoryId === ALL_CATEGORIES_ID}
            onSelect={handleCategoryChange}
          />
          {stackCategories.map((category) => (
            <CategoryTab
              key={category.id}
              id={category.id}
              label={category.label}
              isSelected={selectedCategoryId === category.id}
              onSelect={handleCategoryChange}
            />
          ))}
        </div>
      </div>

      <p className="text-sm text-muted-foreground" data-testid="tool-count">
        {filteredTools.length} tool{filteredTools.length === 1 ? "" : "s"}
      </p>

      {filteredTools.length === 0 ? (
        <Card className="border-dashed border-border/60 bg-card/40" data-testid="no-results">
          <CardContent className="py-8 text-center text-sm text-muted-foreground">
            No tools match your search. Try a different keyword or category.
          </CardContent>
        </Card>
      ) : (
        <div
          className="grid gap-6 lg:grid-cols-2 lg:items-start"
          data-testid="stack-split-layout"
        >
          <div className="space-y-3 lg:max-h-[70vh] lg:overflow-y-auto lg:pr-2" data-testid="tool-panel">
            <h2 className="text-lg font-semibold">Tools</h2>
            <div className="grid gap-3" data-testid="tool-list">
              {filteredTools.map((tool) => {
                const category = getCategoryById(tool.categoryId);
                const isSelected = selectedToolId === tool.id;

                return (
                  <button
                    key={tool.id}
                    type="button"
                    data-testid="tool-card"
                    data-tool-id={tool.id}
                    aria-expanded={isSelected}
                    onClick={() => handleToolClick(tool)}
                    className={cn(
                      "rounded-xl text-left ring-1 ring-foreground/10 transition-colors",
                      isSelected ? "ring-[var(--status-pass)]/50" : "hover:bg-accent/30",
                    )}
                  >
                    <Card className="h-full border-0 bg-card/80 shadow-none">
                      <CardHeader className="gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="outline" className="font-mono text-xs uppercase">
                            {category?.label}
                          </Badge>
                          {tool.usedInLab ? (
                            <Badge variant="outline" className="font-mono text-xs">
                              Lab
                            </Badge>
                          ) : null}
                        </div>
                        <CardTitle className="text-base leading-snug">{tool.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{tool.tagline}</p>
                      </CardHeader>
                    </Card>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:sticky lg:top-6" data-testid="tool-detail-panel">
            <h2 className="mb-3 text-lg font-semibold">Why this tool</h2>
            <ToolDetailPanel tool={selectedTool} />
          </div>
        </div>
      )}
    </section>
  );
}

interface CategoryTabProps {
  id: string;
  label: string;
  isSelected: boolean;
  onSelect: (categoryId: string) => void;
}

function CategoryTab({ id, label, isSelected, onSelect }: CategoryTabProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      data-testid="category-tab"
      data-category-id={id}
      onClick={() => onSelect(id)}
      className={cn(
        "rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
        isSelected
          ? "border-[var(--status-pass)]/50 bg-[var(--status-pass)]/10 text-foreground"
          : "border-border/60 bg-card/80 text-muted-foreground hover:bg-accent/30 hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}

"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ALL_CATEGORIES_ID,
  codeSnippets,
  filterSnippets,
  getCategoryById,
  getSnippetById,
  snippetCategories,
  snippetsIntro,
  type CodeSnippet,
} from "@/lib/data/snippets";
import { SnippetDetailPanel } from "./snippet-detail-panel";

export function SnippetBrowser() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(ALL_CATEGORIES_ID);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSnippetId, setSelectedSnippetId] = useState<string | null>(null);

  const filteredSnippets = useMemo(
    () => filterSnippets(searchQuery, selectedCategoryId),
    [searchQuery, selectedCategoryId],
  );

  const selectedSnippet = selectedSnippetId ? getSnippetById(selectedSnippetId) : undefined;

  function handleCategoryChange(categoryId: string) {
    setSelectedCategoryId(categoryId);
    setSelectedSnippetId(null);
  }

  function handleSnippetClick(snippet: CodeSnippet) {
    setSelectedSnippetId((current) => (current === snippet.id ? null : snippet.id));
  }

  return (
    <section className="space-y-6" data-testid="snippet-browser">
      <p className="text-sm text-muted-foreground">{snippetsIntro}</p>

      <div className="space-y-2">
        <label htmlFor="snippet-search" className="text-sm font-medium">
          Search snippets
        </label>
        <input
          id="snippet-search"
          type="search"
          placeholder="Search by title, language, tags, or code..."
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
            setSelectedSnippetId(null);
          }}
          data-testid="snippet-search"
          className="w-full rounded-lg border border-border/60 bg-card/80 px-4 py-2 text-sm outline-none ring-ring/50 focus-visible:ring-[3px]"
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Categories</h2>
        <div
          className="flex flex-wrap gap-2"
          data-testid="category-tabs"
          role="tablist"
          aria-label="Snippet categories"
        >
          <CategoryTab
            id={ALL_CATEGORIES_ID}
            label="All"
            isSelected={selectedCategoryId === ALL_CATEGORIES_ID}
            onSelect={handleCategoryChange}
          />
          {snippetCategories.map((category) => (
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

      <p className="text-sm text-muted-foreground" data-testid="snippet-count">
        {filteredSnippets.length} snippet{filteredSnippets.length === 1 ? "" : "s"}
      </p>

      {filteredSnippets.length === 0 ? (
        <Card className="border-dashed border-border/60 bg-card/40" data-testid="no-results">
          <CardContent className="py-8 text-center text-sm text-muted-foreground">
            No snippets match your search. Try a different keyword or category.
          </CardContent>
        </Card>
      ) : (
        <div
          className="grid gap-6 lg:grid-cols-2 lg:items-start"
          data-testid="snippet-split-layout"
        >
          <div className="space-y-3 lg:max-h-[70vh] lg:overflow-y-auto lg:pr-2" data-testid="snippet-panel">
            <h2 className="text-lg font-semibold">Snippets</h2>
            <div className="grid gap-3" data-testid="snippet-list">
              {filteredSnippets.map((snippet) => {
                const category = getCategoryById(snippet.categoryId);
                const isSelected = selectedSnippetId === snippet.id;

                return (
                  <button
                    key={snippet.id}
                    type="button"
                    data-testid="snippet-card"
                    data-snippet-id={snippet.id}
                    aria-expanded={isSelected}
                    onClick={() => handleSnippetClick(snippet)}
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
                          <Badge variant="outline" className="font-mono text-xs">
                            {snippet.language}
                          </Badge>
                        </div>
                        <CardTitle className="text-base leading-snug">{snippet.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{snippet.summary}</p>
                      </CardHeader>
                    </Card>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:sticky lg:top-6" data-testid="snippet-detail-panel-container">
            <h2 className="mb-3 text-lg font-semibold">Code</h2>
            <SnippetDetailPanel snippet={selectedSnippet} />
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

export { codeSnippets };

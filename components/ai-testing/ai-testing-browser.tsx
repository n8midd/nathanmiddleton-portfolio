"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ALL_CATEGORIES_ID,
  aiTestingCategories,
  filterTopics,
  getCategoryById,
  getTopicById,
  type AiTestingTopic,
} from "@/lib/data/ai-testing";
import { TopicDetailPanel } from "./topic-detail-panel";

export function AiTestingBrowser() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(ALL_CATEGORIES_ID);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  const filteredTopics = useMemo(
    () => filterTopics(searchQuery, selectedCategoryId),
    [searchQuery, selectedCategoryId],
  );

  const selectedTopic = selectedTopicId ? getTopicById(selectedTopicId) : undefined;

  function handleCategoryChange(categoryId: string) {
    setSelectedCategoryId(categoryId);
    setSelectedTopicId(null);
  }

  function handleTopicClick(topic: AiTestingTopic) {
    setSelectedTopicId((current) => (current === topic.id ? null : topic.id));
  }

  return (
    <section className="space-y-6" data-testid="ai-testing-browser">
      <div className="space-y-2">
        <label htmlFor="ai-testing-search" className="text-sm font-medium">
          Search topics
        </label>
        <input
          id="ai-testing-search"
          type="search"
          placeholder="Search by title, summary, or category..."
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
            setSelectedTopicId(null);
          }}
          data-testid="ai-testing-search"
          className="w-full rounded-lg border border-border/60 bg-card/80 px-4 py-2 text-sm outline-none ring-ring/50 focus-visible:ring-[3px]"
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Categories</h2>
        <div
          className="flex flex-wrap gap-2"
          data-testid="category-tabs"
          role="tablist"
          aria-label="AI in Testing categories"
        >
          <CategoryTab
            id={ALL_CATEGORIES_ID}
            label="All"
            isSelected={selectedCategoryId === ALL_CATEGORIES_ID}
            onSelect={handleCategoryChange}
          />
          {aiTestingCategories.map((category) => (
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

      <p className="text-sm text-muted-foreground" data-testid="topic-count">
        {filteredTopics.length} topic{filteredTopics.length === 1 ? "" : "s"}
      </p>

      {filteredTopics.length === 0 ? (
        <Card className="border-dashed border-border/60 bg-card/40" data-testid="no-results">
          <CardContent className="py-8 text-center text-sm text-muted-foreground">
            No topics match your search. Try a different keyword or category.
          </CardContent>
        </Card>
      ) : (
        <div
          className="grid gap-6 lg:grid-cols-2 lg:items-start"
          data-testid="ai-testing-split-layout"
        >
          <div className="space-y-3 lg:max-h-[70vh] lg:overflow-y-auto lg:pr-2" data-testid="topic-panel">
            <h2 className="text-lg font-semibold">Topics</h2>
            <div className="grid gap-3" data-testid="topic-list">
              {filteredTopics.map((topic) => {
                const category = getCategoryById(topic.categoryId);
                const isSelected = selectedTopicId === topic.id;

                return (
                  <button
                    key={topic.id}
                    type="button"
                    data-testid="topic-card"
                    data-topic-id={topic.id}
                    aria-expanded={isSelected}
                    onClick={() => handleTopicClick(topic)}
                    className={cn(
                      "rounded-xl text-left ring-1 ring-foreground/10 transition-colors",
                      isSelected ? "ring-[var(--status-pass)]/50" : "hover:bg-accent/30",
                    )}
                  >
                    <Card className="h-full border-0 bg-card/80 shadow-none">
                      <CardHeader className="gap-2">
                        <Badge variant="outline" className="w-fit font-mono text-xs uppercase">
                          {category?.label}
                        </Badge>
                        <CardTitle className="text-base leading-snug">{topic.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{topic.summary}</p>
                      </CardHeader>
                    </Card>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:sticky lg:top-6" data-testid="topic-detail-panel">
            <h2 className="mb-3 text-lg font-semibold">Detail</h2>
            <TopicDetailPanel topic={selectedTopic} />
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

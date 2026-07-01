"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ALL_CATEGORIES_ID,
  filterLeadershipTopics,
  getCategoryById,
  leadershipCategories,
} from "@/lib/data/qa-leadership";
import type { LeadershipTopicMeta } from "@/lib/leadership";

interface LeadershipBrowserProps {
  topics: LeadershipTopicMeta[];
}

export function LeadershipBrowser({ topics }: LeadershipBrowserProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(ALL_CATEGORIES_ID);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTopics = useMemo(
    () => filterLeadershipTopics(topics, searchQuery, selectedCategoryId),
    [topics, searchQuery, selectedCategoryId],
  );

  function handleCategoryChange(categoryId: string) {
    setSelectedCategoryId(categoryId);
  }

  return (
    <section className="space-y-6" data-testid="leadership-browser">
      <div className="space-y-2">
        <label htmlFor="leadership-search" className="text-sm font-medium">
          Search topics
        </label>
        <input
          id="leadership-search"
          type="search"
          placeholder="Search by title, summary, or category..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          data-testid="leadership-search"
          className="w-full rounded-lg border border-border/60 bg-card/80 px-4 py-2 text-sm outline-none ring-ring/50 focus-visible:ring-[3px]"
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Categories</h2>
        <div
          className="flex flex-wrap gap-2"
          data-testid="category-tabs"
          role="tablist"
          aria-label="QA Leadership categories"
        >
          <CategoryTab
            id={ALL_CATEGORIES_ID}
            label="All"
            isSelected={selectedCategoryId === ALL_CATEGORIES_ID}
            onSelect={handleCategoryChange}
          />
          {leadershipCategories.map((category) => (
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
        <div className="grid gap-4" data-testid="topic-panel">
          {filteredTopics.map((topic) => {
            const category = getCategoryById(topic.categoryId);

            return (
              <Card
                key={topic.slug}
                className="border-border/60 bg-card/80"
                data-testid="topic-card"
                data-topic-slug={topic.slug}
              >
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="font-mono text-xs uppercase">
                      {category?.label}
                    </Badge>
                    {topic.readingTime ? (
                      <Badge variant="outline" className="font-mono text-xs">
                        {topic.readingTime}
                      </Badge>
                    ) : null}
                  </div>
                  <CardTitle className="text-lg">
                    <Link href={`/leadership/${topic.slug}`} className="hover:underline">
                      {topic.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>{topic.summary}</p>
                  <Link
                    href={`/leadership/${topic.slug}`}
                    className="inline-block text-sm text-[var(--status-pass)] hover:underline"
                  >
                    Read essay →
                  </Link>
                </CardContent>
              </Card>
            );
          })}
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

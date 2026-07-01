"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ALL_CATEGORIES_ID,
  filterQuestions,
  getCategoryById,
  getQuestionById,
  interviewCategories,
  type InterviewQuestion,
} from "@/lib/data/interview-prep";

export function InterviewPrepBrowser() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(ALL_CATEGORIES_ID);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);

  const filteredQuestions = useMemo(
    () => filterQuestions(searchQuery, selectedCategoryId),
    [searchQuery, selectedCategoryId],
  );

  const selectedQuestion = selectedQuestionId ? getQuestionById(selectedQuestionId) : undefined;

  function handleCategoryChange(categoryId: string) {
    setSelectedCategoryId(categoryId);
    setSelectedQuestionId(null);
  }

  function handleQuestionClick(question: InterviewQuestion) {
    setSelectedQuestionId((current) => (current === question.id ? null : question.id));
  }

  return (
    <section className="space-y-6" data-testid="interview-prep-browser">
      <div className="space-y-2">
        <label htmlFor="interview-search" className="text-sm font-medium">
          Search questions
        </label>
        <input
          id="interview-search"
          type="search"
          placeholder="Search by question, answer, or category..."
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
            setSelectedQuestionId(null);
          }}
          data-testid="interview-search"
          className="w-full rounded-lg border border-border/60 bg-card/80 px-4 py-2 text-sm outline-none ring-ring/50 focus-visible:ring-[3px]"
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Categories</h2>
        <div
          className="flex flex-wrap gap-2"
          data-testid="category-tabs"
          role="tablist"
          aria-label="Interview question categories"
        >
          <CategoryTab
            id={ALL_CATEGORIES_ID}
            label="All"
            isSelected={selectedCategoryId === ALL_CATEGORIES_ID}
            onSelect={handleCategoryChange}
          />
          {interviewCategories.map((category) => (
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

      <p className="text-sm text-muted-foreground" data-testid="question-count">
        {filteredQuestions.length} question{filteredQuestions.length === 1 ? "" : "s"}
      </p>

      {filteredQuestions.length === 0 ? (
        <Card className="border-dashed border-border/60 bg-card/40" data-testid="no-results">
          <CardContent className="py-8 text-center text-sm text-muted-foreground">
            No questions match your search. Try a different keyword or category.
          </CardContent>
        </Card>
      ) : (
        <div
          className="grid gap-6 lg:grid-cols-2 lg:items-start"
          data-testid="interview-prep-split-layout"
        >
          <div className="space-y-3 lg:max-h-[70vh] lg:overflow-y-auto lg:pr-2" data-testid="question-panel">
            <h2 className="text-lg font-semibold">Questions</h2>
            <div className="grid gap-3" data-testid="question-list">
              {filteredQuestions.map((question) => {
                const category = getCategoryById(question.categoryId);
                const isSelected = selectedQuestionId === question.id;

                return (
                  <button
                    key={question.id}
                    type="button"
                    data-testid="question-card"
                    data-question-id={question.id}
                    aria-expanded={isSelected}
                    onClick={() => handleQuestionClick(question)}
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
                          <Badge variant="outline" className="font-mono text-xs uppercase">
                            {question.difficulty}
                          </Badge>
                        </div>
                        <CardTitle className="text-base leading-snug">{question.question}</CardTitle>
                      </CardHeader>
                    </Card>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:sticky lg:top-6" data-testid="answer-panel">
            <h2 className="mb-3 text-lg font-semibold">Answer</h2>
            {selectedQuestion ? (
              <Card className="border-border/60 bg-card/80" data-testid="question-detail">
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="font-mono text-xs uppercase">
                      {getCategoryById(selectedQuestion.categoryId)?.label}
                    </Badge>
                    <Badge variant="outline" className="font-mono text-xs uppercase">
                      {selectedQuestion.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{selectedQuestion.question}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm leading-7 text-muted-foreground">
                  <p>{selectedQuestion.answer}</p>
                </CardContent>
              </Card>
            ) : (
              <Card
                className="border-dashed border-border/60 bg-card/40"
                data-testid="answer-placeholder"
              >
                <CardContent className="py-8 text-center text-sm text-muted-foreground">
                  Select a question to view the answer here.
                </CardContent>
              </Card>
            )}
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

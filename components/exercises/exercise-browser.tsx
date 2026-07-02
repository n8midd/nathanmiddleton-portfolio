"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  defaultExerciseId,
  exercisesIntro,
  getExerciseById,
  testingExercises,
  type TestingExercise,
} from "@/lib/data/exercises";
import { ExerciseAnswerPanel } from "./exercise-answer-panel";
import { ExerciseScenario } from "./exercise-scenario";

export function ExerciseBrowser() {
  const [selectedId, setSelectedId] = useState(defaultExerciseId);
  const [revealed, setRevealed] = useState(false);
  const [notes, setNotes] = useState("");

  const selectedExercise = getExerciseById(selectedId);

  const handleExerciseSelect = (exercise: TestingExercise) => {
    setSelectedId(exercise.id);
    setRevealed(false);
    setNotes("");
  };

  const handleReveal = () => {
    setRevealed(true);
  };

  return (
    <section className="space-y-6" data-testid="exercise-browser">
      <p className="text-sm text-muted-foreground">{exercisesIntro}</p>

      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <div className="space-y-3" data-testid="exercise-list-panel">
          <h2 className="text-lg font-semibold">Exercises</h2>
          <div className="grid gap-3">
            {testingExercises.map((exercise) => {
              const isSelected = selectedId === exercise.id;

              return (
                <button
                  key={exercise.id}
                  type="button"
                  data-testid="exercise-card"
                  data-exercise-id={exercise.id}
                  aria-pressed={isSelected}
                  onClick={() => handleExerciseSelect(exercise)}
                  className={cn(
                    "rounded-xl text-left ring-1 ring-foreground/10 transition-colors",
                    isSelected ? "ring-[var(--status-pass)]/50" : "hover:bg-accent/30",
                  )}
                >
                  <Card className="h-full border-0 bg-card/80 shadow-none">
                    <CardHeader className="gap-2">
                      <CardTitle className="text-base leading-snug">{exercise.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{exercise.summary}</p>
                    </CardHeader>
                  </Card>
                </button>
              );
            })}
          </div>
        </div>

        {selectedExercise ? (
          <div className="space-y-4 lg:sticky lg:top-6" data-testid="exercise-detail-panel">
            <ExerciseScenario scenarioType={selectedExercise.scenarioType} />
            <p className="text-sm text-muted-foreground">{selectedExercise.context}</p>

            <div className="space-y-3 rounded-lg border border-border/60 bg-muted/20 p-4">
              <h2 className="text-sm font-semibold" data-testid="exercise-prompt">
                What would you test?
              </h2>
              <div className="flex flex-wrap gap-2" data-testid="prompt-hints">
                {selectedExercise.promptHints.map((hint) => (
                  <Badge key={hint} variant="outline" className="text-xs">
                    {hint}
                  </Badge>
                ))}
              </div>
              <div className="space-y-1">
                <label htmlFor="exercise-notes" className="text-sm font-medium">
                  Your notes (optional)
                </label>
                <textarea
                  id="exercise-notes"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  rows={4}
                  placeholder="Jot down test ideas before revealing the answer..."
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  data-testid="exercise-notes"
                />
              </div>
              <Button type="button" onClick={handleReveal} data-testid="reveal-answer-button">
                Reveal answer
              </Button>
            </div>

            {revealed ? (
              <ExerciseAnswerPanel areas={selectedExercise.revealedAnswer} />
            ) : (
              <Card
                className="border-dashed border-border/60 bg-card/40"
                data-testid="answer-placeholder"
              >
                <CardContent className="py-8 text-center text-sm text-muted-foreground">
                  Reveal the answer when you are ready to compare your thinking.
                </CardContent>
              </Card>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}

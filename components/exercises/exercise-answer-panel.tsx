import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TestArea } from "@/lib/data/exercises";

interface ExerciseAnswerPanelProps {
  areas: TestArea[];
}

export function ExerciseAnswerPanel({ areas }: ExerciseAnswerPanelProps) {
  return (
    <Card className="border-border/60 bg-card/80" data-testid="exercise-answer-panel">
      <CardHeader>
        <CardTitle className="text-base">Expert answer</CardTitle>
        <p className="text-sm text-muted-foreground">
          A senior QA lens on coverage — use it to compare with your own notes.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {areas.map((area) => (
          <section
            key={area.id}
            className="space-y-2"
            data-testid="test-area"
            data-area-id={area.id}
          >
            <h3 className="text-sm font-semibold text-foreground">{area.label}</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {area.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </CardContent>
    </Card>
  );
}

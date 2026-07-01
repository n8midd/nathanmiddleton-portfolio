import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategoryById, type AiTestingTopic } from "@/lib/data/ai-testing";
import { PromptTemplateBuilder } from "./prompt-template-builder";
import { RagEvaluationDemo } from "./rag-evaluation-demo";

interface TopicDetailPanelProps {
  topic: AiTestingTopic | undefined;
}

export function TopicDetailPanel({ topic }: TopicDetailPanelProps) {
  if (!topic) {
    return (
      <Card className="border-dashed border-border/60 bg-card/40" data-testid="topic-placeholder">
        <CardContent className="py-8 text-center text-sm text-muted-foreground">
          Select a topic to view guidance, prompts, and interactive demos here.
        </CardContent>
      </Card>
    );
  }

  const category = getCategoryById(topic.categoryId);

  return (
    <Card className="border-border/60 bg-card/80" data-testid="topic-detail">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs uppercase">
            {category?.label}
          </Badge>
        </div>
        <CardTitle className="text-base">{topic.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{topic.summary}</p>
      </CardHeader>
      <CardContent className="space-y-6 text-sm leading-7 text-muted-foreground">
        <div className="space-y-3">
          {topic.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {topic.pitfalls.length > 0 ? (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Pitfalls to avoid</h3>
            <ul className="list-disc space-y-1 pl-5">
              {topic.pitfalls.map((pitfall) => (
                <li key={pitfall}>{pitfall}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {topic.examplePrompt ? (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Example prompt</h3>
            <pre
              className="overflow-x-auto rounded-md border border-border/60 bg-muted/30 p-3 font-mono text-xs whitespace-pre-wrap"
              data-testid="example-prompt"
            >
              {topic.examplePrompt}
            </pre>
          </div>
        ) : null}

        {topic.showPromptBuilder ? (
          <PromptTemplateBuilder
            defaultTemplateId={
              topic.categoryId === "generation" ? "test-case-generation" : undefined
            }
          />
        ) : null}

        {topic.showRagDemo ? <RagEvaluationDemo /> : null}
      </CardContent>
    </Card>
  );
}

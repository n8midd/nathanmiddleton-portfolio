"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategoryById, type CodeSnippet } from "@/lib/data/snippets";

interface SnippetDetailPanelProps {
  snippet: CodeSnippet | undefined;
}

export function SnippetDetailPanel({ snippet }: SnippetDetailPanelProps) {
  if (!snippet) {
    return (
      <Card className="border-dashed border-border/60 bg-card/40" data-testid="snippet-placeholder">
        <CardContent className="py-8 text-center text-sm text-muted-foreground">
          Select a snippet to view the code and copy it into your project.
        </CardContent>
      </Card>
    );
  }

  const category = getCategoryById(snippet.categoryId);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(snippet.code);
  };

  return (
    <Card className="border-border/60 bg-card/80" data-testid="snippet-detail-panel">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs uppercase" data-testid="snippet-language">
            {snippet.language}
          </Badge>
          {category ? (
            <Badge variant="outline" className="font-mono text-xs uppercase">
              {category.label}
            </Badge>
          ) : null}
        </div>
        <CardTitle className="text-base">{snippet.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{snippet.summary}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <pre
          className="overflow-x-auto rounded-md border border-border bg-background p-3 font-mono text-xs text-muted-foreground"
          data-testid="snippet-code"
        >
          {snippet.code}
        </pre>
        <Button type="button" variant="outline" size="sm" onClick={handleCopy} data-testid="copy-snippet-button">
          Copy snippet
        </Button>
      </CardContent>
    </Card>
  );
}

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategoryById, type StackTool } from "@/lib/data/technical-stack";

interface ToolDetailPanelProps {
  tool: StackTool | undefined;
}

export function ToolDetailPanel({ tool }: ToolDetailPanelProps) {
  if (!tool) {
    return (
      <Card className="border-dashed border-border/60 bg-card/40" data-testid="tool-placeholder">
        <CardContent className="py-8 text-center text-sm text-muted-foreground">
          Select a tool to see why it was chosen, where it fits, and where it falls short.
        </CardContent>
      </Card>
    );
  }

  const category = getCategoryById(tool.categoryId);

  return (
    <Card className="border-border/60 bg-card/80" data-testid="tool-detail">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs uppercase">
            {category?.label}
          </Badge>
          {tool.usedInLab ? (
            <Badge
              variant="outline"
              className="border-[var(--status-pass)]/30 bg-[var(--status-pass)]/10 font-mono text-xs text-[var(--status-pass)]"
              data-testid="used-in-lab-badge"
            >
              Used in this lab
            </Badge>
          ) : null}
        </div>
        <CardTitle className="text-base">{tool.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{tool.tagline}</p>
      </CardHeader>
      <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
        <p>{tool.rationale}</p>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground">Key strengths</h3>
          <ul className="list-disc space-y-1 pl-5">
            {tool.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-2" data-testid="tool-weaknesses">
          <h3 className="text-sm font-semibold text-foreground">Where it falls short</h3>
          <ul className="list-disc space-y-1 pl-5">
            {tool.weaknesses.map((weakness) => (
              <li key={weakness}>{weakness}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

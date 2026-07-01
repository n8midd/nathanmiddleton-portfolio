import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { frameworkFileTree } from "@/lib/data/framework-demo";

export function FrameworkFileTree() {
  return (
    <section className="space-y-4" data-testid="framework-file-tree">
      <h2 className="text-lg font-semibold">Repository layout</h2>
      <p className="text-sm text-muted-foreground">
        The live Playwright framework for this site — not a separate demo repo.
      </p>
      <Card className="border-border/60 bg-card/80">
        <CardHeader>
          <CardTitle className="font-mono text-sm">tests/e2e/</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 font-mono text-sm">
            {frameworkFileTree.map((entry) => (
              <li
                key={entry.path}
                className="flex flex-col gap-0.5 border-b border-border/40 pb-2 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-4"
                data-testid="file-tree-entry"
                data-path={entry.path}
              >
                <span className="shrink-0 text-[var(--status-pass)]">{entry.path}</span>
                <span className="text-xs text-muted-foreground">{entry.description}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}

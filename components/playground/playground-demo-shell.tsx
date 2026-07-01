import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { PlaygroundDemo } from "@/lib/data/playground";

interface PlaygroundDemoShellProps {
  demo: PlaygroundDemo;
  children: React.ReactNode;
}

export function PlaygroundDemoShell({ demo, children }: PlaygroundDemoShellProps) {
  return (
    <div className="space-y-6" data-testid="playground-demo" data-demo-slug={demo.slug}>
      <div>
        <Link
          href="/playground"
          className="text-sm text-muted-foreground hover:text-foreground"
          data-testid="playground-back-link"
        >
          ← Back to Testing Playground
        </Link>
        <h1 className="mt-2 font-heading text-2xl font-semibold">{demo.label}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{demo.description}</p>
      </div>

      <Card className="border-border/60 bg-card/80" data-testid="playground-automation-tip">
        <CardContent className="pt-4 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Automation tip: </span>
          {demo.automationTip}
        </CardContent>
      </Card>

      <Card className="border-border/60 bg-card/80">
        <CardContent className="pt-6">{children}</CardContent>
      </Card>
    </div>
  );
}

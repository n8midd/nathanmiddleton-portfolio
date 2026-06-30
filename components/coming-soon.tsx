import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/dashboard/section-header";
import type { SiteFeature } from "@/lib/site-config";

interface ComingSoonProps {
  feature: SiteFeature;
}

export function ComingSoon({ feature }: ComingSoonProps) {
  return (
    <div className="space-y-8">
      <SectionHeader title={feature.label} description={feature.description} />

      <Card className="border-dashed border-border/80 bg-card/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CardTitle className="text-lg">Coming soon</CardTitle>
            <Badge variant="outline" className="font-mono text-xs uppercase">
              {feature.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            This section is part of the Quality Engineering Lab roadmap. The foundation
            is in place — interactive content arrives in a future phase.
          </p>
          <p>
            Explore other areas from the{" "}
            <Link href="/" className="text-[var(--status-pass)] underline-offset-4 hover:underline">
              Command Center
            </Link>{" "}
            or browse the navigation for planned features.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

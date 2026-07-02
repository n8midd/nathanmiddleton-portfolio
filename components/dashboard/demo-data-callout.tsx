import { metricsDemoIntro } from "@/lib/data/metrics-dashboard";

export function DemoDataCallout({ message }: { message?: string }) {
  return (
    <div
      className="rounded-lg border border-dashed border-border/80 bg-card/40 px-4 py-3 text-sm text-muted-foreground"
      data-testid="demo-data-callout"
    >
      {message ?? metricsDemoIntro}
    </div>
  );
}

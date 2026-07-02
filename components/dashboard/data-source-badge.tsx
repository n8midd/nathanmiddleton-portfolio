import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type DataSource = "live" | "demo";

interface DataSourceBadgeProps {
  source: DataSource;
  className?: string;
}

const labels: Record<DataSource, string> = {
  live: "Live from repo",
  demo: "Demo data",
};

export function DataSourceBadge({ source, className }: DataSourceBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "font-mono text-[10px] uppercase",
        source === "live"
          ? "border-[var(--status-pass)]/50 text-[var(--status-pass)]"
          : "text-muted-foreground",
        className,
      )}
      data-testid={`data-source-${source}`}
    >
      {labels[source]}
    </Badge>
  );
}

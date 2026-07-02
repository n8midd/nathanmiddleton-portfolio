import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DataSource } from "@/lib/data/data-source";
import { DataSourceBadge } from "./data-source-badge";

interface MetricCardProps {
  label: string;
  value?: string;
  hint?: string;
  children?: React.ReactNode;
  className?: string;
  testId?: string;
  dataMetricLabel?: string;
  dataSource?: DataSource;
}

export function MetricCard({
  label,
  value,
  hint,
  children,
  className,
  testId,
  dataMetricLabel,
  dataSource,
}: MetricCardProps) {
  return (
    <Card
      className={cn("border-border/60 bg-card/80", className)}
      data-testid={testId}
      data-metric-label={dataMetricLabel}
      aria-label={label}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {label}
          </CardTitle>
          {dataSource ? <DataSourceBadge source={dataSource} /> : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        {value ? (
          <p className="font-mono text-2xl font-semibold tracking-tight">{value}</p>
        ) : null}
        {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
        {children}
      </CardContent>
    </Card>
  );
}

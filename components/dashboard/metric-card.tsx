import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricCardProps {
  label: string;
  value?: string;
  hint?: string;
  children?: React.ReactNode;
  className?: string;
  testId?: string;
}

export function MetricCard({
  label,
  value,
  hint,
  children,
  className,
  testId,
}: MetricCardProps) {
  return (
    <Card
      className={cn("border-border/60 bg-card/80", className)}
      data-testid={testId}
      aria-label={label}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>
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

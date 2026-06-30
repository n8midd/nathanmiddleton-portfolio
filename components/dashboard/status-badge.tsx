import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type StatusVariant = "passing" | "failing" | "flaky" | "neutral";

interface StatusBadgeProps {
  status: StatusVariant;
  label?: string;
  className?: string;
}

const statusConfig: Record<
  StatusVariant,
  { label: string; className: string }
> = {
  passing: {
    label: "Passing",
    className: "border-[var(--status-pass)]/30 bg-[var(--status-pass)]/10 text-[var(--status-pass)]",
  },
  failing: {
    label: "Failing",
    className: "border-[var(--status-fail)]/30 bg-[var(--status-fail)]/10 text-[var(--status-fail)]",
  },
  flaky: {
    label: "Flaky",
    className: "border-[var(--status-warn)]/30 bg-[var(--status-warn)]/10 text-[var(--status-warn)]",
  },
  neutral: {
    label: "Unknown",
    className: "border-border bg-muted text-muted-foreground",
  },
};

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={cn("font-mono text-xs", config.className, className)}>
      {label ?? config.label}
    </Badge>
  );
}

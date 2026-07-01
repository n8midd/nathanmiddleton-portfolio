"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { careerRoles, formatDateRange, getRoleById } from "@/lib/data/resume";
import { RoleDetailPanel } from "./role-detail-panel";

export function ResumeTimeline() {
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const selectedRole = selectedRoleId ? getRoleById(selectedRoleId) : undefined;

  function handleRoleClick(roleId: string) {
    setSelectedRoleId((current) => (current === roleId ? null : roleId));
  }

  return (
    <section className="space-y-6" data-testid="resume-timeline">
      <div>
        <h2 className="text-lg font-semibold">Career timeline</h2>
        <p className="text-sm text-muted-foreground">
          Click each role to expand highlights, technologies, and progression.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="relative space-y-0" data-testid="timeline-track">
          <div
            className="absolute left-[11px] top-3 bottom-3 w-px bg-border/80"
            aria-hidden="true"
          />

          {careerRoles.map((role) => {
            const isSelected = selectedRoleId === role.id;

            return (
              <div key={role.id} className="relative flex gap-4 pb-6 last:pb-0">
                <div
                  className={cn(
                    "relative z-10 mt-3 h-6 w-6 shrink-0 rounded-full border-2 bg-background",
                    isSelected
                      ? "border-[var(--status-pass)] bg-[var(--status-pass)]/20"
                      : "border-border/80",
                  )}
                  aria-hidden="true"
                />

                <button
                  type="button"
                  data-testid="role-card"
                  data-role-id={role.id}
                  aria-expanded={isSelected}
                  onClick={() => handleRoleClick(role.id)}
                  className={cn(
                    "min-w-0 flex-1 rounded-xl text-left ring-1 ring-foreground/10 transition-colors",
                    isSelected ? "ring-[var(--status-pass)]/50" : "hover:bg-accent/30",
                  )}
                >
                  <Card className="border-0 bg-card/80 shadow-none">
                    <CardHeader className="gap-1 pb-2">
                      <p className="font-mono text-xs text-muted-foreground">
                        {formatDateRange(role.startDate, role.endDate)}
                      </p>
                      <CardTitle className="text-base leading-snug">{role.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {role.company} · {role.location}
                      </p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="line-clamp-2 text-sm text-muted-foreground">{role.summary}</p>
                    </CardContent>
                  </Card>
                </button>
              </div>
            );
          })}
        </div>

        <div className="lg:sticky lg:top-6">
          <RoleDetailPanel role={selectedRole} />
        </div>
      </div>
    </section>
  );
}

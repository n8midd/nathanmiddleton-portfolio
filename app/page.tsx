import { ComingSoon } from "@/components/coming-soon";
import { MetricCard } from "@/components/dashboard/metric-card";
import { ProgressBar } from "@/components/dashboard/progress-bar";
import { SectionHeader } from "@/components/dashboard/section-header";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { createPageMetadata } from "@/lib/page-metadata";
import { getFeatureBySlug, siteConfig } from "@/lib/site-config";

const feature = getFeatureBySlug("command-center")!;

export const metadata = createPageMetadata(feature);

export default function CommandCenterPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title={siteConfig.author}
        description={`${siteConfig.tagline} · 18+ years experience · Automation frameworks, CI/CD, and quality leadership.`}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Test Execution" value="15,432" hint="Last 30 days" />
        <MetricCard label="Frameworks Built" value="12+" hint="Across enterprise teams" />
        <MetricCard label="Production Escapes" value="↓ 78%" hint="Year over year" />
        <MetricCard label="Build Health" value="Passing">
          <StatusBadge status="passing" />
        </MetricCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-border/60 bg-card/50 p-6">
          <ProgressBar label="Automation Coverage" value={92} />
        </div>
        <div className="rounded-lg border border-border/60 bg-card/50 p-6">
          <p className="mb-3 text-sm text-muted-foreground">Core competencies</p>
          <div className="flex flex-wrap gap-2">
            {[
              "C#",
              "Java",
              "TypeScript",
              "Python",
              "Playwright",
              "Selenium",
              "CI/CD",
              "API Testing",
              "Performance Testing",
              "Leadership",
            ].map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-border/60 bg-muted px-2 py-1 font-mono text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <ComingSoon feature={feature} />
    </div>
  );
}

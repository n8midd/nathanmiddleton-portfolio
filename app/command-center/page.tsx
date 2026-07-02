import Link from "next/link";
import { DemoDataCallout } from "@/components/dashboard/demo-data-callout";
import { DataSourceBadge } from "@/components/dashboard/data-source-badge";
import { MetricCard } from "@/components/dashboard/metric-card";
import { ProgressBar } from "@/components/dashboard/progress-bar";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  automationCoverage,
  automationCoverageLabel,
  commandCenterCiActionsUrl,
  commandCenterCoverageDemoIntro,
  commandCenterExperience,
  commandCenterMetrics,
  commandCenterQuickLinks,
  commandCenterSkills,
} from "@/lib/data/command-center";
import { createPageMetadata } from "@/lib/page-metadata";
import { getFeatureBySlug, siteConfig } from "@/lib/site-config";

const feature = getFeatureBySlug("command-center")!;

export const metadata = createPageMetadata(feature);

export default function CommandCenterPage() {
  return (
    <div className="space-y-8" data-testid="command-center">
      <SectionHeader
        title={siteConfig.author}
        description={`${siteConfig.tagline} · ${commandCenterExperience} · Automation frameworks, CI/CD, and quality leadership.`}
      />

      <div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        data-testid="command-center-metrics"
      >
        {commandCenterMetrics.map((metric) => (
          <MetricCard
            key={metric.label}
            label={metric.label}
            value={metric.label === "CI Status" ? undefined : metric.value}
            hint={metric.hint}
            testId="metric-card"
            dataSource={metric.dataSource}
          >
            {metric.label === "CI Status" ? (
              <a
                href={commandCenterCiActionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-2xl font-semibold tracking-tight text-[var(--status-pass)] underline-offset-4 hover:underline"
                data-testid="ci-status-link"
              >
                {metric.value}
              </a>
            ) : null}
          </MetricCard>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-4 rounded-lg border border-border/60 bg-card/50 p-6" data-testid="automation-coverage">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium text-muted-foreground">Automation coverage</p>
            <DataSourceBadge source="demo" />
          </div>
          <DemoDataCallout message={commandCenterCoverageDemoIntro} />
          <ProgressBar
            label={automationCoverageLabel}
            value={automationCoverage}
            testId="automation-coverage-bar"
          />
        </div>
        <div
          className="rounded-lg border border-border/60 bg-card/50 p-6"
          data-testid="command-center-skills"
        >
          <p className="mb-3 text-sm text-muted-foreground">Core competencies</p>
          <div className="flex flex-wrap gap-2">
            {commandCenterSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-border/60 bg-muted px-2 py-1 font-mono text-xs"
                data-testid="skill-chip"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="space-y-4" data-testid="quick-links">
        <h2 className="text-lg font-semibold">Explore the lab</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {commandCenterQuickLinks.map((link) => (
            <Card key={link.href} className="border-border/60 bg-card/80">
              <CardHeader>
                <CardTitle className="text-base">
                  <Link href={link.href} data-testid="quick-link">
                    {link.label}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{link.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

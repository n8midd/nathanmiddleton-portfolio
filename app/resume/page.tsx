import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/dashboard/section-header";
import { ResumeTimeline } from "@/components/resume/resume-timeline";
import {
  resumeCertifications,
  resumeEducation,
  resumeSkillGroups,
  resumeSummary,
} from "@/lib/data/resume";
import { createPageMetadata } from "@/lib/page-metadata";
import { getFeatureBySlug, siteConfig } from "@/lib/site-config";

const feature = getFeatureBySlug("resume")!;

export const metadata = createPageMetadata(feature);

export default function ResumePage() {
  return (
    <div className="space-y-8" data-testid="resume-page">
      <SectionHeader title={feature.label} description={feature.description} />

      <p className="max-w-3xl text-sm leading-7 text-muted-foreground" data-testid="resume-summary">
        {resumeSummary}
      </p>

      <div className="space-y-4" data-testid="resume-skills">
        <h2 className="text-lg font-semibold">Top skills</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {resumeSkillGroups.map((group) => (
            <div
              key={group.label}
              className="rounded-lg border border-border/60 bg-card/40 p-4"
            >
              <h3 className="mb-2 text-sm font-medium text-foreground">{group.label}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Badge key={item} variant="outline" className="font-mono text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ResumeTimeline />

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2" data-testid="resume-education">
          <h2 className="text-lg font-semibold">Education</h2>
          <div className="rounded-lg border border-border/60 bg-card/40 p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">{resumeEducation.degree}</p>
            <p>
              {resumeEducation.school} · {resumeEducation.location}
            </p>
            <p className="font-mono text-xs">{resumeEducation.date}</p>
          </div>
        </div>

        <div className="space-y-2" data-testid="resume-certifications">
          <h2 className="text-lg font-semibold">Certifications</h2>
          <ul className="space-y-2">
            {resumeCertifications.map((cert) => (
              <li
                key={cert.name}
                className="rounded-lg border border-border/60 bg-card/40 px-4 py-3 text-sm text-muted-foreground"
              >
                <span className="text-foreground">{cert.name}</span>
                {cert.status ? (
                  <Badge variant="outline" className="ml-2 font-mono text-xs">
                    {cert.status}
                  </Badge>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        <Link href={siteConfig.linkedInUrl} className="text-[var(--status-pass)] hover:underline">
          View full profile on LinkedIn →
        </Link>
      </p>
    </div>
  );
}

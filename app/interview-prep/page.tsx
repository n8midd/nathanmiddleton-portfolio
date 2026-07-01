import { InterviewPrepBrowser } from "@/components/interview-prep/interview-prep-browser";
import { SectionHeader } from "@/components/dashboard/section-header";
import { createPageMetadata } from "@/lib/page-metadata";
import { getFeatureBySlug } from "@/lib/site-config";

const feature = getFeatureBySlug("interview-prep")!;

export const metadata = createPageMetadata(feature);

export default function InterviewPrepPage() {
  return (
    <div className="space-y-8" data-testid="interview-prep-page">
      <SectionHeader title={feature.label} description={feature.description} />
      <InterviewPrepBrowser />
    </div>
  );
}

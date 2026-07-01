import { StackExplorer } from "@/components/stack/stack-explorer";
import { SectionHeader } from "@/components/dashboard/section-header";
import { createPageMetadata } from "@/lib/page-metadata";
import { getFeatureBySlug } from "@/lib/site-config";

const feature = getFeatureBySlug("stack")!;

export const metadata = createPageMetadata(feature);

export default function StackPage() {
  return (
    <div className="space-y-8" data-testid="stack-page">
      <SectionHeader title={feature.label} description={feature.description} />
      <StackExplorer />
    </div>
  );
}

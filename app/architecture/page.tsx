import { ArchitecturePatterns } from "@/components/architecture/architecture-patterns";
import { PipelineFlow } from "@/components/architecture/pipeline-flow";
import { SectionHeader } from "@/components/dashboard/section-header";
import { createPageMetadata } from "@/lib/page-metadata";
import { getFeatureBySlug } from "@/lib/site-config";

const feature = getFeatureBySlug("architecture")!;

export const metadata = createPageMetadata(feature);

export default function ArchitecturePage() {
  return (
    <div className="space-y-10" data-testid="architecture-page">
      <SectionHeader title={feature.label} description={feature.description} />
      <PipelineFlow />
      <ArchitecturePatterns />
    </div>
  );
}

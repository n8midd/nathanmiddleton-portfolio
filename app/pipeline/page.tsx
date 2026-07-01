import { CiPipelineVisualizer } from "@/components/pipeline/ci-pipeline-visualizer";
import { SectionHeader } from "@/components/dashboard/section-header";
import { createPageMetadata } from "@/lib/page-metadata";
import { getFeatureBySlug } from "@/lib/site-config";

const feature = getFeatureBySlug("pipeline")!;

export const metadata = createPageMetadata(feature);

export default function PipelinePage() {
  return (
    <div className="space-y-8" data-testid="pipeline-page">
      <SectionHeader title={feature.label} description={feature.description} />
      <CiPipelineVisualizer />
    </div>
  );
}

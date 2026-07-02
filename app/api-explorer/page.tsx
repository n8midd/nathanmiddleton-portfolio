import { ApiExplorerClient } from "@/components/api-explorer/api-explorer-client";
import { SectionHeader } from "@/components/dashboard/section-header";
import { createPageMetadata } from "@/lib/page-metadata";
import { getFeatureBySlug } from "@/lib/site-config";

const feature = getFeatureBySlug("api-explorer")!;

export const metadata = createPageMetadata(feature);

export default function ApiExplorerPage() {
  return (
    <div className="space-y-8" data-testid="api-explorer-page">
      <SectionHeader title={feature.label} description={feature.description} />
      <ApiExplorerClient />
    </div>
  );
}

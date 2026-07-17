import { ArtilleryLab } from "@/components/artillery/artillery-lab";
import { SectionHeader } from "@/components/dashboard/section-header";
import { createPageMetadata } from "@/lib/page-metadata";
import { getFeatureBySlug } from "@/lib/site-config";

const feature = getFeatureBySlug("artillery")!;

export const metadata = createPageMetadata(feature);

export default function ArtilleryPage() {
  return (
    <div className="space-y-8" data-testid="artillery-page">
      <SectionHeader title={feature.label} description={feature.description} />
      <ArtilleryLab />
    </div>
  );
}

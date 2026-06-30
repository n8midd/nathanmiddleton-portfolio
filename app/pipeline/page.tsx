import { ComingSoon } from "@/components/coming-soon";
import { createPageMetadata } from "@/lib/page-metadata";
import { getFeatureBySlug } from "@/lib/site-config";

const feature = getFeatureBySlug("pipeline")!;

export const metadata = createPageMetadata(feature);

export default function PipelinePage() {
  return <ComingSoon feature={feature} />;
}

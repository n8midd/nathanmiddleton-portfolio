import { ComingSoon } from "@/components/coming-soon";
import { createPageMetadata } from "@/lib/page-metadata";
import { getFeatureBySlug } from "@/lib/site-config";

const feature = getFeatureBySlug("metrics")!;

export const metadata = createPageMetadata(feature);

export default function MetricsPage() {
  return <ComingSoon feature={feature} />;
}

import { ComingSoon } from "@/components/coming-soon";
import { createPageMetadata } from "@/lib/page-metadata";
import { getFeatureBySlug } from "@/lib/site-config";

const feature = getFeatureBySlug("api-explorer")!;

export const metadata = createPageMetadata(feature);

export default function ApiExplorerPage() {
  return <ComingSoon feature={feature} />;
}

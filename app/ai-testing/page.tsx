import { ComingSoon } from "@/components/coming-soon";
import { createPageMetadata } from "@/lib/page-metadata";
import { getFeatureBySlug } from "@/lib/site-config";

const feature = getFeatureBySlug("ai-testing")!;

export const metadata = createPageMetadata(feature);

export default function AiTestingPage() {
  return <ComingSoon feature={feature} />;
}

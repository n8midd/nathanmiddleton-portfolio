import { ComingSoon } from "@/components/coming-soon";
import { createPageMetadata } from "@/lib/page-metadata";
import { getFeatureBySlug } from "@/lib/site-config";

const feature = getFeatureBySlug("framework-demo")!;

export const metadata = createPageMetadata(feature);

export default function FrameworkDemoPage() {
  return <ComingSoon feature={feature} />;
}

import { ComingSoon } from "@/components/coming-soon";
import { createPageMetadata } from "@/lib/page-metadata";
import { getFeatureBySlug } from "@/lib/site-config";

const feature = getFeatureBySlug("stack")!;

export const metadata = createPageMetadata(feature);

export default function StackPage() {
  return <ComingSoon feature={feature} />;
}

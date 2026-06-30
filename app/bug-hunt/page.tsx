import { ComingSoon } from "@/components/coming-soon";
import { createPageMetadata } from "@/lib/page-metadata";
import { getFeatureBySlug } from "@/lib/site-config";

const feature = getFeatureBySlug("bug-hunt")!;

export const metadata = createPageMetadata(feature);

export default function BugHuntPage() {
  return <ComingSoon feature={feature} />;
}

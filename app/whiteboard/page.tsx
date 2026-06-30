import { ComingSoon } from "@/components/coming-soon";
import { createPageMetadata } from "@/lib/page-metadata";
import { getFeatureBySlug } from "@/lib/site-config";

const feature = getFeatureBySlug("whiteboard")!;

export const metadata = createPageMetadata(feature);

export default function WhiteboardPage() {
  return <ComingSoon feature={feature} />;
}

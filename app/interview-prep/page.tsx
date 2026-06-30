import { ComingSoon } from "@/components/coming-soon";
import { createPageMetadata } from "@/lib/page-metadata";
import { getFeatureBySlug } from "@/lib/site-config";

const feature = getFeatureBySlug("interview-prep")!;

export const metadata = createPageMetadata(feature);

export default function InterviewPrepPage() {
  return <ComingSoon feature={feature} />;
}

import { ComingSoon } from "@/components/coming-soon";
import { createPageMetadata } from "@/lib/page-metadata";
import { getFeatureBySlug } from "@/lib/site-config";

const feature = getFeatureBySlug("test-case-builder")!;

export const metadata = createPageMetadata(feature);

export default function TestCaseBuilderPage() {
  return <ComingSoon feature={feature} />;
}

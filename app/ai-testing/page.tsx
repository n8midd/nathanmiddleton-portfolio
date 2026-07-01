import { AiTestingBrowser } from "@/components/ai-testing/ai-testing-browser";
import { SectionHeader } from "@/components/dashboard/section-header";
import { createPageMetadata } from "@/lib/page-metadata";
import { getFeatureBySlug } from "@/lib/site-config";

const feature = getFeatureBySlug("ai-testing")!;

export const metadata = createPageMetadata(feature);

export default function AiTestingPage() {
  return (
    <div className="space-y-8" data-testid="ai-testing-page">
      <SectionHeader title={feature.label} description={feature.description} />
      <AiTestingBrowser />
    </div>
  );
}

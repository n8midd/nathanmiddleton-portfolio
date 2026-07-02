import { TestCaseBuilder } from "@/components/test-case-builder/test-case-builder";
import { SectionHeader } from "@/components/dashboard/section-header";
import { createPageMetadata } from "@/lib/page-metadata";
import { getFeatureBySlug } from "@/lib/site-config";

const feature = getFeatureBySlug("test-case-builder")!;

export const metadata = createPageMetadata(feature);

export default function TestCaseBuilderPage() {
  return (
    <div className="space-y-8" data-testid="test-case-builder-page">
      <SectionHeader title={feature.label} description={feature.description} />
      <TestCaseBuilder />
    </div>
  );
}

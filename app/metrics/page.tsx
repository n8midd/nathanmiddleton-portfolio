import { MetricsDashboard } from "@/components/metrics/metrics-dashboard";
import { SectionHeader } from "@/components/dashboard/section-header";
import { createPageMetadata } from "@/lib/page-metadata";
import { getFeatureBySlug } from "@/lib/site-config";

const feature = getFeatureBySlug("metrics")!;

export const metadata = createPageMetadata(feature);

export default function MetricsPage() {
  return (
    <div className="space-y-8" data-testid="metrics-page">
      <SectionHeader title={feature.label} description={feature.description} />
      <MetricsDashboard />
    </div>
  );
}

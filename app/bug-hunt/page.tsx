import { ShoppingCartApp } from "@/components/bug-hunt/shopping-cart-app";
import { SectionHeader } from "@/components/dashboard/section-header";
import { createPageMetadata } from "@/lib/page-metadata";
import { getFeatureBySlug } from "@/lib/site-config";

const feature = getFeatureBySlug("bug-hunt")!;

export const metadata = createPageMetadata(feature);

export default function BugHuntPage() {
  return (
    <div className="space-y-8" data-testid="bug-hunt-page">
      <SectionHeader title={feature.label} description={feature.description} />
      <ShoppingCartApp />
    </div>
  );
}

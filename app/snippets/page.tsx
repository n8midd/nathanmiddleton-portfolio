import { SnippetBrowser } from "@/components/snippets/snippet-browser";
import { SectionHeader } from "@/components/dashboard/section-header";
import { createPageMetadata } from "@/lib/page-metadata";
import { getFeatureBySlug } from "@/lib/site-config";

const feature = getFeatureBySlug("snippets")!;

export const metadata = createPageMetadata(feature);

export default function SnippetsPage() {
  return (
    <div className="space-y-8" data-testid="snippets-page">
      <SectionHeader title={feature.label} description={feature.description} />
      <SnippetBrowser />
    </div>
  );
}

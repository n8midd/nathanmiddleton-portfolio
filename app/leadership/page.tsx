import { SectionHeader } from "@/components/dashboard/section-header";
import { LeadershipBrowser } from "@/components/leadership/leadership-browser";
import { getAllLeadershipTopics } from "@/lib/leadership";
import { createPageMetadata } from "@/lib/page-metadata";
import { getFeatureBySlug } from "@/lib/site-config";

const feature = getFeatureBySlug("leadership")!;

export const metadata = createPageMetadata(feature);

export default function LeadershipPage() {
  const topics = getAllLeadershipTopics().filter((topic) => topic.status === "published");

  return (
    <div className="space-y-8" data-testid="leadership-page">
      <SectionHeader title={feature.label} description={feature.description} />
      <LeadershipBrowser topics={topics} />
    </div>
  );
}

import { ExerciseBrowser } from "@/components/exercises/exercise-browser";
import { SectionHeader } from "@/components/dashboard/section-header";
import { createPageMetadata } from "@/lib/page-metadata";
import { getFeatureBySlug } from "@/lib/site-config";

const feature = getFeatureBySlug("exercises")!;

export const metadata = createPageMetadata(feature);

export default function ExercisesPage() {
  return (
    <div className="space-y-8" data-testid="exercises-page">
      <SectionHeader title={feature.label} description={feature.description} />
      <ExerciseBrowser />
    </div>
  );
}

import { MicroservicesDiagram } from "@/components/whiteboard/microservices-diagram";
import { SectionHeader } from "@/components/dashboard/section-header";
import { createPageMetadata } from "@/lib/page-metadata";
import { getFeatureBySlug } from "@/lib/site-config";

const feature = getFeatureBySlug("whiteboard")!;

export const metadata = createPageMetadata(feature);

export default function WhiteboardPage() {
  return (
    <div className="space-y-8" data-testid="whiteboard-page">
      <SectionHeader title={feature.label} description={feature.description} />
      <MicroservicesDiagram />
    </div>
  );
}

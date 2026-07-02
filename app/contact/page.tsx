import { ContactLinks } from "@/components/contact/contact-links";
import { ContactOfferings } from "@/components/contact/contact-offerings";
import { SectionHeader } from "@/components/dashboard/section-header";
import { createPageMetadata } from "@/lib/page-metadata";
import { getFeatureBySlug } from "@/lib/site-config";

const feature = getFeatureBySlug("contact")!;

export const metadata = createPageMetadata(feature);

export default function ContactPage() {
  return (
    <div className="space-y-8" data-testid="contact-page">
      <SectionHeader title={feature.label} description={feature.description} />
      <ContactOfferings />
      <ContactLinks />
    </div>
  );
}

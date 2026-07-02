import { HomePage } from "@/components/home/home-page";
import { createPageMetadata } from "@/lib/page-metadata";
import { getFeatureBySlug } from "@/lib/site-config";

const feature = getFeatureBySlug("home")!;

export const metadata = createPageMetadata(feature);

export default function Page() {
  return <HomePage />;
}

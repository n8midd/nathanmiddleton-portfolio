import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/page-metadata";
import { getFeatureBySlug } from "@/lib/site-config";

const feature = getFeatureBySlug("lessons")!;

export const metadata = createPageMetadata(feature);

export default function LessonsPage() {
  notFound();
}

import Link from "next/link";
import { FrameworkDemoExplorer } from "@/components/framework-demo/framework-demo-explorer";
import { FrameworkFileTree } from "@/components/framework-demo/framework-file-tree";
import { SectionHeader } from "@/components/dashboard/section-header";
import { createPageMetadata } from "@/lib/page-metadata";
import { getFeatureBySlug, siteConfig } from "@/lib/site-config";

const feature = getFeatureBySlug("framework-demo")!;

export const metadata = createPageMetadata(feature);

export default function FrameworkDemoPage() {
  return (
    <div className="space-y-10" data-testid="framework-demo-page">
      <SectionHeader title={feature.label} description={feature.description} />
      <FrameworkFileTree />
      <FrameworkDemoExplorer />
      <p className="text-sm text-muted-foreground">
        <Link
          href={siteConfig.githubUrl}
          className="text-[var(--status-pass)] hover:underline"
          data-testid="framework-github-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          View framework on GitHub
        </Link>
      </p>
    </div>
  );
}

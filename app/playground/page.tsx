import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/dashboard/section-header";
import { createPageMetadata } from "@/lib/page-metadata";
import { getFeatureBySlug, playgroundDemos } from "@/lib/site-config";

const feature = getFeatureBySlug("playground")!;

export const metadata = createPageMetadata(feature);

export default function PlaygroundIndexPage() {
  return (
    <div className="space-y-8">
      <SectionHeader title={feature.label} description={feature.description} />

      <div className="grid gap-4 sm:grid-cols-2">
        {playgroundDemos.map((demo) => (
          <Card key={demo.slug} className="border-border/60 bg-card/80">
            <CardHeader>
              <CardTitle className="text-base">
                <Link href={`/playground/${demo.slug}`} className="hover:underline">
                  {demo.label}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{demo.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-dashed border-border/80 bg-card/50">
        <CardContent className="pt-6 text-sm text-muted-foreground">
          Individual demo pages are scaffolded and will ship with interactive UI in a future phase.
        </CardContent>
      </Card>
    </div>
  );
}

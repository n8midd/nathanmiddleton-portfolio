import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/dashboard/section-header";
import { getAllArticles } from "@/lib/articles";
import { createPageMetadata } from "@/lib/page-metadata";
import { getFeatureBySlug, plannedArticles } from "@/lib/site-config";

const feature = getFeatureBySlug("articles")!;

export const metadata = createPageMetadata(feature);

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="space-y-8">
      <SectionHeader title={feature.label} description={feature.description} />

      {articles.length > 0 ? (
        <div className="grid gap-4">
          {articles.map((article) => (
            <Card key={article.slug} className="border-border/60 bg-card/80">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <CardTitle className="text-lg">
                    <Link href={`/articles/${article.slug}`} className="hover:underline">
                      {article.title}
                    </Link>
                  </CardTitle>
                  <Badge variant="outline" className="font-mono text-xs uppercase">
                    {article.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>{article.description}</p>
                {article.date ? <p className="font-mono text-xs">{article.date}</p> : null}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Planned articles</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {plannedArticles.map((title) => (
            <li
              key={title}
              className="rounded-md border border-dashed border-border/60 bg-card/40 px-4 py-3 text-sm text-muted-foreground"
            >
              {title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

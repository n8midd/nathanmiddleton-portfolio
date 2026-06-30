import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/dashboard/section-header";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";
import { siteConfig } from "@/lib/site-config";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: "Article not found" };
  }

  return {
    title: `${article.title} | ${siteConfig.name}`,
    description: article.description,
  };
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-8 mb-4 text-xl font-semibold" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 leading-7 text-muted-foreground" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground" {...props} />
  ),
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="space-y-6">
      <Link href="/articles" className="text-sm text-[var(--status-pass)] hover:underline">
        ← Back to articles
      </Link>

      <SectionHeader title={article.title} description={article.description} />

      <div className="flex items-center gap-3">
        <Badge variant="outline" className="font-mono text-xs uppercase">
          {article.status}
        </Badge>
        {article.date ? (
          <span className="font-mono text-xs text-muted-foreground">{article.date}</span>
        ) : null}
      </div>

      <div className="prose prose-invert max-w-none">
        <MDXRemote source={article.content} components={mdxComponents} />
      </div>
    </article>
  );
}

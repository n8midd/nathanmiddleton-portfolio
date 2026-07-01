import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/dashboard/section-header";
import { articleMdxComponents } from "@/components/mdx/article-mdx-components";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";
import { siteConfig } from "@/lib/site-config";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllArticles()
    .filter((article) => article.status === "published")
    .map((article) => ({ slug: article.slug }));
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

const mdxComponents = articleMdxComponents;

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.status !== "published") {
    notFound();
  }

  return (
    <article
      className="space-y-6"
      data-testid="article-page"
      data-article-slug={slug}
    >
      <Link
        href="/articles"
        className="text-sm text-[var(--status-pass)] hover:underline"
        data-testid="article-back-link"
      >
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

      <div className="max-w-none space-y-1" data-testid="article-content">
        <MDXRemote
          source={article.content}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>
    </article>
  );
}

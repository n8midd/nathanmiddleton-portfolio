import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/dashboard/section-header";
import { articleMdxComponents } from "@/components/mdx/article-mdx-components";
import { getCategoryById } from "@/lib/data/qa-leadership";
import { getAllLeadershipTopics, getLeadershipTopicBySlug } from "@/lib/leadership";
import { siteConfig } from "@/lib/site-config";

interface LeadershipTopicPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllLeadershipTopics()
    .filter((topic) => topic.status === "published")
    .map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: LeadershipTopicPageProps) {
  const { slug } = await params;
  const topic = getLeadershipTopicBySlug(slug);

  if (!topic) {
    return { title: "Topic not found" };
  }

  return {
    title: `${topic.title} | ${siteConfig.name}`,
    description: topic.summary,
  };
}

const mdxComponents = articleMdxComponents;

export default async function LeadershipTopicPage({ params }: LeadershipTopicPageProps) {
  const { slug } = await params;
  const topic = getLeadershipTopicBySlug(slug);

  if (!topic || topic.status !== "published") {
    notFound();
  }

  const category = getCategoryById(topic.categoryId);

  return (
    <article
      className="space-y-8"
      data-testid="leadership-topic-page"
      data-topic-slug={slug}
    >
      <Link
        href="/leadership"
        className="text-sm text-[var(--status-pass)] hover:underline"
        data-testid="leadership-back-link"
      >
        ← Back to QA Leadership
      </Link>

      <SectionHeader title={topic.title} description={topic.summary} />

      <div className="flex flex-wrap items-center gap-3">
        {category ? (
          <Badge variant="outline" className="font-mono text-xs uppercase">
            {category.label}
          </Badge>
        ) : null}
        {topic.readingTime ? (
          <span className="font-mono text-xs text-muted-foreground">{topic.readingTime}</span>
        ) : null}
      </div>

      <div className="max-w-none space-y-1" data-testid="leadership-topic-content">
        <MDXRemote
          source={topic.content}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      {topic.practices.length > 0 ? (
        <div className="space-y-2" data-testid="leadership-practices">
          <h2 className="text-lg font-semibold">Key practices</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {topic.practices.map((practice) => (
              <li key={practice}>{practice}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {topic.pitfalls.length > 0 ? (
        <div className="space-y-2" data-testid="leadership-pitfalls">
          <h2 className="text-lg font-semibold">Common pitfalls</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {topic.pitfalls.map((pitfall) => (
              <li key={pitfall}>{pitfall}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {topic.relatedArticleSlug ? (
        <div className="rounded-lg border border-border/60 bg-card/40 p-4" data-testid="related-article">
          <p className="text-sm text-muted-foreground">
            Related reading:{" "}
            <Link
              href={`/articles/${topic.relatedArticleSlug}`}
              className="text-[var(--status-pass)] hover:underline"
              data-testid="related-article-link"
            >
              Read the full article →
            </Link>
          </p>
        </div>
      ) : null}
    </article>
  );
}

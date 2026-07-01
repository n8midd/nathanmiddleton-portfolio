import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unstable_noStore as noStore } from "next/cache";

const leadershipDirectory = path.join(process.cwd(), "content", "leadership");

export interface LeadershipTopicMeta {
  slug: string;
  title: string;
  summary: string;
  categoryId: string;
  practices: string[];
  pitfalls: string[];
  relatedArticleSlug?: string;
  readingTime?: string;
  status: "draft" | "published";
}

export interface LeadershipTopic extends LeadershipTopicMeta {
  content: string;
}

function ensureLeadershipDirectory() {
  if (!fs.existsSync(leadershipDirectory)) {
    return false;
  }
  return true;
}

function parseTopicMeta(slug: string, data: Record<string, unknown>): LeadershipTopicMeta {
  return {
    slug,
    title: (data.title as string) ?? slug,
    summary: (data.summary as string) ?? "",
    categoryId: (data.categoryId as string) ?? "",
    practices: Array.isArray(data.practices) ? (data.practices as string[]) : [],
    pitfalls: Array.isArray(data.pitfalls) ? (data.pitfalls as string[]) : [],
    relatedArticleSlug: data.relatedArticleSlug as string | undefined,
    readingTime: data.readingTime as string | undefined,
    status: (data.status as "draft" | "published") ?? "draft",
  };
}

export function getAllLeadershipTopics(): LeadershipTopicMeta[] {
  noStore();
  if (!ensureLeadershipDirectory()) {
    return [];
  }

  const files = fs
    .readdirSync(leadershipDirectory)
    .filter((file) => file.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(leadershipDirectory, file), "utf8");
      const { data } = matter(raw);
      return parseTopicMeta(slug, data as Record<string, unknown>);
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getLeadershipTopicBySlug(slug: string): LeadershipTopic | null {
  noStore();
  if (!ensureLeadershipDirectory()) {
    return null;
  }

  const filePath = path.join(leadershipDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const meta = parseTopicMeta(slug, data as Record<string, unknown>);

  return {
    ...meta,
    content,
  };
}

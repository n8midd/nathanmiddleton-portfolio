import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unstable_noStore as noStore } from "next/cache";

const articlesDirectory = path.join(process.cwd(), "content", "articles");

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  status: "draft" | "published";
}

export interface Article extends ArticleMeta {
  content: string;
}

function ensureArticlesDirectory() {
  if (!fs.existsSync(articlesDirectory)) {
    return false;
  }
  return true;
}

export function getAllArticles(): ArticleMeta[] {
  noStore();
  if (!ensureArticlesDirectory()) {
    return [];
  }

  const files = fs
    .readdirSync(articlesDirectory)
    .filter((file) => file.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(articlesDirectory, file), "utf8");
      const { data } = matter(raw);

      return {
        slug,
        title: (data.title as string) ?? slug,
        description: (data.description as string) ?? "",
        date: (data.date as string) ?? "",
        status: (data.status as "draft" | "published") ?? "draft",
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticleBySlug(slug: string): Article | null {
  noStore();
  if (!ensureArticlesDirectory()) {
    return null;
  }

  const filePath = path.join(articlesDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: (data.title as string) ?? slug,
    description: (data.description as string) ?? "",
    date: (data.date as string) ?? "",
    status: (data.status as "draft" | "published") ?? "draft",
    content,
  };
}

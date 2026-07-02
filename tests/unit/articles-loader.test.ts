import { describe, expect, it } from "vitest";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";

describe("articles loader", () => {
  it("loads all MDX articles from content directory", () => {
    const articles = getAllArticles();
    expect(articles.length).toBe(7);
    expect(articles.every((article) => article.slug && article.title)).toBe(true);
  });

  it("sorts articles by date descending", () => {
    const articles = getAllArticles();
    for (let index = 1; index < articles.length; index += 1) {
      expect(articles[index - 1]!.date.localeCompare(articles[index]!.date)).toBeGreaterThanOrEqual(0);
    }
  });

  it("loads article content by slug", () => {
    const article = getArticleBySlug("when-not-to-automate");
    expect(article).not.toBeNull();
    expect(article!.content.length).toBeGreaterThan(0);
    expect(article!.title).toContain("When NOT to Automate");
  });

  it("returns null for missing slugs", () => {
    expect(getArticleBySlug("does-not-exist")).toBeNull();
  });
});

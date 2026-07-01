import { articleManifest, getManifestEntryBySlug } from "../../pages/articles.page";
import { test } from "../../fixtures/test.fixture";

test.describe("@regression How I Solve Problems — Articles", () => {
  test.beforeEach(async ({ articles }) => {
    await articles.openIndex();
  });

  test("loads index with correct document title", async ({ articles }) => {
    await articles.expectIndexPageTitle();
  });

  test("displays header with title and description", async ({ articles }) => {
    await articles.expectHeader();
  });

  test("has exactly one h1 on the index page", async ({ articles }) => {
    await articles.expectSingleH1();
  });

  test("does not show Coming soon banner on index", async ({ articles }) => {
    await articles.expectNoComingSoon();
  });

  test("lists all published articles from manifest", async ({ articles }) => {
    await articles.expectPublishedArticlesListed();
  });

  test("first article card links to correct slug", async ({ articles }) => {
    const first = articleManifest[0]!;
    await articles.expectArticleCard(first.slug, first.title);
    await articles.clickArticleCard(first.slug, first.title);
    await articles.expectArticleSlug(first.slug);
  });

  test("hides planned section when all titles are published", async ({ articles }) => {
    await articles.expectPlannedSectionHidden();
  });

  test("clicking an article from index opens detail page", async ({ articles }) => {
    const entry = articleManifest[0]!;
    await articles.clickArticle(entry.title);
    await articles.expectArticlePageTitle(entry.title);
  });

  test("detail page has correct document title", async ({ articles }) => {
    const entry = articleManifest[0]!;
    await articles.openArticle(entry.slug);
    await articles.expectArticlePageTitle(entry.title);
  });

  test("detail page shows back link to index", async ({ articles }) => {
    const entry = articleManifest[0]!;
    await articles.openArticle(entry.slug);
    await articles.expectBackLink();
  });

  test("detail page renders key MDX heading", async ({ articles }) => {
    const entry = getManifestEntryBySlug("why-90-percent-automation-coverage-is-a-bad-goal")!;
    await articles.openArticle(entry.slug);
    await articles.expectArticleContentHeading(entry.keyHeading);
  });

  test("detail page shows status badge and date", async ({ articles }) => {
    const entry = articleManifest[0]!;
    await articles.openArticle(entry.slug);
    await articles.expectArticleMetadata("published", entry.date);
  });

  test("detail page has exactly one h1", async ({ articles }) => {
    const entry = articleManifest[0]!;
    await articles.openArticle(entry.slug);
    await articles.expectDetailSingleH1();
  });

  test("sidebar highlights How I Solve Problems with no soon badge", async ({ shell }) => {
    await shell.expectSidebarLinkActive("How I Solve Problems");
    await shell.expectSidebarLinkHasSoonBadge("How I Solve Problems", false);
  });

  test("index content remains visible on mobile viewport", async ({ page, articles }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await articles.expectVisibleOnMobile();
  });
});

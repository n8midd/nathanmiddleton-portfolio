import { filterSnippets } from "../../../../lib/data/snippets";
import { test } from "../../fixtures/test.fixture";

test.describe("@regression Code Snippet Library", () => {
  test.beforeEach(async ({ snippets }) => {
    await snippets.open();
  });

  test("loads with correct document title", async ({ snippets }) => {
    await snippets.expectPageTitle();
  });

  test("displays header with title and description", async ({ snippets }) => {
    await snippets.expectHeader();
  });

  test("has exactly one h1 on the page", async ({ snippets }) => {
    await snippets.expectSingleH1();
  });

  test("does not show Coming soon banner", async ({ snippets }) => {
    await snippets.expectNoComingSoon();
  });

  test("shows all categories including All tab", async ({ snippets }) => {
    await snippets.expectAllCategoriesVisible();
  });

  test("lists all snippets from shared data when unfiltered", async ({ snippets }) => {
    await snippets.expectAllSnippetsListed();
  });

  test("selecting Playwright category filters the list", async ({ snippets }) => {
    await snippets.selectCategory("playwright");
    await snippets.expectCategorySnippets("playwright");
  });

  test("searching by keyword narrows results", async ({ snippets }) => {
    await snippets.search("Playwright");
    await snippets.expectSnippetCount(filterSnippets("Playwright", "all").length);
  });

  test("search with no matches shows empty state", async ({ snippets }) => {
    await snippets.search("zzznomatchzzz");
    await snippets.expectNoResults();
  });

  test("clicking Playwright snippet shows code detail", async ({ snippets }) => {
    await snippets.clickSnippet("playwright-page-object");
    await snippets.expectSnippetDetail("playwright-page-object", "LoginPage");
  });

  test("detail shows language badge", async ({ snippets }) => {
    await snippets.clickSnippet("playwright-api-request");
    await snippets.expectLanguageBadge("TypeScript");
  });

  test("copy snippet button visible when snippet selected", async ({ snippets }) => {
    await snippets.clickSnippet("selenium-explicit-wait");
    await snippets.expectCopyButtonVisible();
  });

  test("GitHub Actions snippet shows YAML content", async ({ snippets }) => {
    await snippets.clickSnippet("github-actions-playwright");
    await snippets.expectSnippetDetail("github-actions-playwright", "runs-on: ubuntu-latest");
  });

  test("sidebar highlights Code Snippet Library with no soon badge", async ({ shell }) => {
    await shell.expectSidebarLinkActive("Code Snippet Library");
    await shell.expectSidebarLinkHasSoonBadge("Code Snippet Library", false);
  });

  test("content remains visible on mobile viewport", async ({ page, snippets }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await snippets.expectVisibleOnMobile();
  });
});

import { filterStackTools } from "../../pages/stack.page";
import { test } from "../../fixtures/test.fixture";

test.describe("@regression Technical Stack", () => {
  test.beforeEach(async ({ stack }) => {
    await stack.open();
  });

  test("loads with correct document title", async ({ stack }) => {
    await stack.expectPageTitle();
  });

  test("displays header with title and description", async ({ stack }) => {
    await stack.expectHeader();
  });

  test("has exactly one h1 on the page", async ({ stack }) => {
    await stack.expectSingleH1();
  });

  test("does not show Coming soon banner", async ({ stack }) => {
    await stack.expectNoComingSoon();
  });

  test("shows all categories including All tab", async ({ stack }) => {
    await stack.expectAllCategoriesVisible();
  });

  test("lists all tools from shared data when unfiltered", async ({ stack }) => {
    await stack.expectAllToolsListed();
  });

  test("selecting Automation category filters the list", async ({ stack }) => {
    await stack.selectCategory("automation");
    await stack.expectCategoryTools("automation");
  });

  test("searching by keyword narrows results", async ({ stack }) => {
    await stack.search("Playwright");
    await stack.expectToolCount(filterStackTools("Playwright", "all").length);
  });

  test("search with no matches shows empty state", async ({ stack }) => {
    await stack.search("zzznomatchzzz");
    await stack.expectNoResults();
  });

  test("clicking Playwright shows rationale detail", async ({ stack }) => {
    await stack.clickTool("playwright");
    await stack.expectToolDetail("playwright", "auto-waiting");
  });

  test("shows detail placeholder before a tool is selected", async ({ stack }) => {
    await stack.expectToolPlaceholder();
  });

  test("Playwright detail mentions tracing", async ({ stack }) => {
    await stack.clickTool("playwright");
    await stack.expectToolDetail("playwright", "tracing");
  });

  test("This Lab category shows Next.js", async ({ stack }) => {
    await stack.selectCategory("this-lab");
    await stack.expectToolVisible("nextjs");
  });

  test("used-in-lab badge appears on portfolio tool", async ({ stack }) => {
    await stack.clickTool("nextjs");
    await stack.expectUsedInLabBadge();
  });

  test("SpecFlow detail calls out BDD collaboration overhead", async ({ stack }) => {
    await stack.clickTool("specflow-cucumber");
    await stack.expectToolDetail("specflow-cucumber", "overhead");
    await stack.expectToolDetail("specflow-cucumber", "collaboration");
  });

  test("sidebar highlights Technical Stack with no soon badge", async ({ shell }) => {
    await shell.expectSidebarLinkActive("Technical Stack");
    await shell.expectSidebarLinkHasSoonBadge("Technical Stack", false);
  });
});

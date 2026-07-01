import { test } from "../../fixtures/test.fixture";

test.describe("@regression Framework Demo", () => {
  test.beforeEach(async ({ frameworkDemo }) => {
    await frameworkDemo.open();
  });

  test("loads with correct document title", async ({ frameworkDemo }) => {
    await frameworkDemo.expectPageTitle();
  });

  test("displays header with title and description", async ({ frameworkDemo }) => {
    await frameworkDemo.expectHeader();
  });

  test("has exactly one h1 on the page", async ({ frameworkDemo }) => {
    await frameworkDemo.expectSingleH1();
  });

  test("does not show Coming soon banner", async ({ frameworkDemo }) => {
    await frameworkDemo.expectNoComingSoon();
  });

  test("lists all framework sections from shared data", async ({ frameworkDemo }) => {
    await frameworkDemo.expectAllSectionsListed();
  });

  test("file tree shows key framework paths", async ({ frameworkDemo }) => {
    await frameworkDemo.expectFileTreeEntries();
  });

  test("clicking Fixtures section shows detail with fixture content", async ({ frameworkDemo }) => {
    await frameworkDemo.clickSection("fixtures");
    await frameworkDemo.expectSectionDetail("fixtures", "test.fixture");
  });

  test("clicking Page Objects section shows detail", async ({ frameworkDemo }) => {
    await frameworkDemo.clickSection("page-objects");
    await frameworkDemo.expectSectionDetail("page-objects", "BasePage");
  });

  test("switching sections updates detail panel", async ({ frameworkDemo }) => {
    await frameworkDemo.clickSection("fixtures");
    await frameworkDemo.expectSectionDetailShows("Fixtures");

    await frameworkDemo.clickSection("parallel-runs");
    await frameworkDemo.expectSectionDetailShows("Parallel Runs");
    await frameworkDemo.expectSectionDetailDoesNotShow("test.fixture.ts");
  });

  test("CI Integration section mentions GitHub Actions", async ({ frameworkDemo }) => {
    await frameworkDemo.clickSection("ci-integration");
    await frameworkDemo.expectSectionDetail("ci-integration", "GitHub Actions");
  });

  test("Helpers section is marked as planned", async ({ frameworkDemo }) => {
    await frameworkDemo.expectPlannedSectionBadge("helpers");
  });

  test("GitHub link points to repository", async ({ frameworkDemo }) => {
    await frameworkDemo.expectGitHubLink();
  });

  test("sidebar highlights Framework Demo with no soon badge", async ({ shell }) => {
    await shell.expectSidebarLinkActive("Framework Demo");
    await shell.expectSidebarLinkHasSoonBadge("Framework Demo", false);
  });

  test("content remains visible on mobile viewport", async ({ page, frameworkDemo }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await frameworkDemo.expectVisibleOnMobile();
  });

  test("Retry Logic section mentions CI retries", async ({ frameworkDemo }) => {
    await frameworkDemo.clickSection("retry-logic");
    await frameworkDemo.expectSectionDetail("retry-logic", "retries");
  });
});

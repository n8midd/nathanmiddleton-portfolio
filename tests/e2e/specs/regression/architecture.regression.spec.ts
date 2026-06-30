import { test } from "../../fixtures/test.fixture";

test.describe("@regression Framework Architecture", () => {
  test.beforeEach(async ({ architecture }) => {
    await architecture.open();
  });

  test("loads with correct document title", async ({ architecture }) => {
    await architecture.expectPageTitle();
  });

  test("displays header with title and description", async ({ architecture }) => {
    await architecture.expectHeader();
  });

  test("has exactly one h1 on the page", async ({ architecture }) => {
    await architecture.expectSingleH1();
  });

  test("does not show Coming soon banner", async ({ architecture }) => {
    await architecture.expectNoComingSoon();
  });

  test("renders all pipeline steps from shared data", async ({ architecture }) => {
    await architecture.expectAllPipelineSteps();
  });

  test("clicking GitHub step shows its detail", async ({ architecture }) => {
    await architecture.clickPipelineStep("GitHub");
    await architecture.expectPipelineStepDetail("GitHub");
  });

  test("clicking Playwright step shows its detail", async ({ architecture }) => {
    await architecture.clickPipelineStep("Playwright");
    await architecture.expectPipelineStepDetail("Playwright");
  });

  test("shows reporting outputs Slack, Datadog, and ReportPortal", async ({ architecture }) => {
    await architecture.expectReportingOutputs();
  });

  test("lists all seven architecture patterns", async ({ architecture }) => {
    await architecture.expectAllPatterns();
  });

  test("expanding Page Object Model shows summary and practices", async ({ architecture }) => {
    await architecture.clickPattern("Page Object Model");
    await architecture.expectPatternDetail("Page Object Model");
  });

  test("expanding Hybrid Automation Framework shows detail", async ({ architecture }) => {
    await architecture.clickPattern("Hybrid Automation Framework");
    await architecture.expectPatternDetail("Hybrid Automation Framework");
  });

  test("switching patterns updates detail panel", async ({ architecture }) => {
    await architecture.clickPattern("Page Object Model");
    await architecture.expectPatternDetailShows("Page Object Model");

    await architecture.clickPattern("Screenplay Pattern");
    await architecture.expectPatternDetailShows("Screenplay Pattern");
    await architecture.expectPatternDetailDoesNotShow("Locators private to the page object");
  });

  test("sidebar highlights Framework Architecture as active", async ({ shell }) => {
    await shell.expectSidebarLinkActive("Framework Architecture");
  });

  test("Framework Architecture nav item has no soon badge", async ({ shell }) => {
    await shell.expectSidebarLinkHasSoonBadge("Framework Architecture", false);
  });

  test("content remains visible on mobile viewport", async ({ page, architecture }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await architecture.expectVisibleOnMobile();
  });
});

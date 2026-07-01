import { test } from "../../fixtures/test.fixture";

test.describe("@regression CI/CD Pipeline", () => {
  test.beforeEach(async ({ pipeline }) => {
    await pipeline.open();
  });

  test("loads with correct document title", async ({ pipeline }) => {
    await pipeline.expectPageTitle();
  });

  test("displays header with title and description", async ({ pipeline }) => {
    await pipeline.expectHeader();
  });

  test("has exactly one h1 on the page", async ({ pipeline }) => {
    await pipeline.expectSingleH1();
  });

  test("does not show Coming soon banner", async ({ pipeline }) => {
    await pipeline.expectNoComingSoon();
  });

  test("lists all pipeline steps from shared data", async ({ pipeline }) => {
    await pipeline.expectAllStepsListed();
  });

  test("shows default first step detail on load", async ({ pipeline }) => {
    await pipeline.expectStepSelected("developer");
    await pipeline.expectStepDetail("pull request");
  });

  test("clicking Git Commit shows its detail", async ({ pipeline }) => {
    await pipeline.clickStep("Git Commit");
    await pipeline.expectStepDetailForLabel("Git Commit");
    await pipeline.expectStepSelected("git-commit");
  });

  test("clicking UI Tests shows Playwright detail", async ({ pipeline }) => {
    await pipeline.clickStep("UI Tests");
    await pipeline.expectStepDetail("Playwright");
    await pipeline.expectStepSelected("ui-tests");
  });

  test("clicking Deploy shows deployment detail", async ({ pipeline }) => {
    await pipeline.clickStep("Deploy");
    await pipeline.expectStepDetail("artifact");
    await pipeline.expectStepSelected("deploy");
  });

  test("clicking Production shows production detail", async ({ pipeline }) => {
    await pipeline.clickStep("Production");
    await pipeline.expectStepDetail("runtime quality");
    await pipeline.expectStepSelected("production");
  });

  test("switching steps updates detail panel", async ({ pipeline }) => {
    await pipeline.clickStep("Git Commit");
    await pipeline.expectStepDetail("Webhooks");

    await pipeline.clickStep("UI Tests");
    await pipeline.expectStepDetail("Page Object Model");
    await pipeline.expectStepDetailDoesNotShow("Webhooks");
  });

  test("Smoke Tests step mentions smoke tag", async ({ pipeline }) => {
    await pipeline.clickStep("Smoke Tests");
    await pipeline.expectStepDetail("@smoke");
  });

  test("Performance step is visible as illustrative stage", async ({ pipeline }) => {
    await pipeline.clickStep("Performance");
    await pipeline.expectStepDetail("SLOs");
    await pipeline.expectStepSelected("performance");
  });

  test("sidebar highlights CI/CD Pipeline with no soon badge", async ({ shell }) => {
    await shell.expectSidebarLinkActive("CI/CD Pipeline");
    await shell.expectSidebarLinkHasSoonBadge("CI/CD Pipeline", false);
  });

  test("content remains visible on mobile viewport", async ({ page, pipeline }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await pipeline.expectVisibleOnMobile();
  });
});

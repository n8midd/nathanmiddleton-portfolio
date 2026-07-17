import { test } from "../../fixtures/test.fixture";

test.describe("@regression Artillery Performance", () => {
  test.beforeEach(async ({ artillery }) => {
    await artillery.open();
  });

  test("loads with correct document title", async ({ artillery }) => {
    await artillery.expectPageTitle();
  });

  test("displays header with title and description", async ({ artillery }) => {
    await artillery.expectHeader();
  });

  test("has exactly one h1 on the page", async ({ artillery }) => {
    await artillery.expectSingleH1();
  });

  test("does not show Coming soon banner", async ({ artillery }) => {
    await artillery.expectNoComingSoon();
  });

  test("results tab shows live KPIs from generated report", async ({ artillery }) => {
    await artillery.openResultsTab();
    await artillery.expectResultKpis();
  });

  test("results tab shows Web Vitals table", async ({ artillery }) => {
    await artillery.openResultsTab();
    await artillery.expectWebVitalsTable();
  });

  test("how it works lists all implementation steps", async ({ artillery }) => {
    await artillery.openHowTab();
    await artillery.expectAllImplStepsListed();
  });

  test("clicking Playwright flows shows locator detail", async ({ artillery }) => {
    await artillery.openHowTab();
    await artillery.clickImplStep("Playwright flows");
    await artillery.expectImplDetail("data-testid");
    await artillery.expectImplStepSelected("playwright-flows");
  });

  test("clicking CI strategy explains on-demand runs", async ({ artillery }) => {
    await artillery.openHowTab();
    await artillery.clickImplStep("CI strategy");
    await artillery.expectImplDetail("default PR workflow");
    await artillery.expectImplStepSelected("ci-strategy");
  });

  test("sidebar highlights Artillery Performance", async ({ shell }) => {
    await shell.expectSidebarLinkActive("Artillery Performance");
    await shell.expectSidebarLinkHasSoonBadge("Artillery Performance", false);
  });

  test("content remains visible on mobile viewport", async ({ page, artillery }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await artillery.expectVisibleOnMobile();
  });
});

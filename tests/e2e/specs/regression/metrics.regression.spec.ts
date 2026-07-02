import { test } from "../../fixtures/test.fixture";

test.describe("@regression Metrics Dashboard", () => {
  test.beforeEach(async ({ metrics }) => {
    await metrics.open();
  });

  test("loads with correct document title", async ({ metrics }) => {
    await metrics.expectPageTitle();
  });

  test("displays header with title and description", async ({ metrics }) => {
    await metrics.expectHeader();
  });

  test("has exactly one h1 on the page", async ({ metrics }) => {
    await metrics.expectSingleH1();
  });

  test("does not show Coming soon banner", async ({ metrics }) => {
    await metrics.expectNoComingSoon();
  });

  test("lists live repository KPIs", async ({ metrics }) => {
    await metrics.expectLiveKpis();
  });

  test("shows demo data callout in enterprise section", async ({ metrics }) => {
    await metrics.expectDemoCallout();
  });

  test("lists all demo summary KPIs from shared data", async ({ metrics }) => {
    await metrics.expectAllSummaryKpis();
  });

  test("lists all chart panels from shared data", async ({ metrics }) => {
    await metrics.expectAllChartsListed();
  });

  test("Automation Growth chart panel is visible", async ({ metrics }) => {
    await metrics.expectChartVisible("automation-growth");
  });

  test("Coverage progress bar shows expected percentage", async ({ metrics }) => {
    await metrics.expectCoverageProgress();
  });

  test("Flaky Tests chart panel is visible", async ({ metrics }) => {
    await metrics.expectChartVisible("flaky-tests");
  });

  test("Average Runtime chart panel is visible", async ({ metrics }) => {
    await metrics.expectChartVisible("average-runtime");
  });

  test("Execution History chart panel is visible", async ({ metrics }) => {
    await metrics.expectExecutionHistoryVisible();
  });

  test("Failed Tests chart panel is visible", async ({ metrics }) => {
    await metrics.expectChartVisible("failed-tests");
  });

  test("MTTR chart panel is visible", async ({ metrics }) => {
    await metrics.expectChartVisible("mttr");
  });

  test("time range toggle updates execution history range", async ({ metrics }) => {
    await metrics.selectTimeRange("7d");
    await metrics.expectExecutionHistoryRange("7d");
    await metrics.expectExecutionHistoryVisible();
  });

  test("sidebar highlights Metrics Dashboard with no soon badge", async ({ shell }) => {
    await shell.expectSidebarLinkActive("Metrics Dashboard");
    await shell.expectSidebarLinkHasSoonBadge("Metrics Dashboard", false);
  });
});

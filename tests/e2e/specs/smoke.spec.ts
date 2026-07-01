import { expect, test } from "../fixtures/test.fixture";
import { features } from "../../../lib/site-config";

test.describe("@smoke Quality Engineering Lab smoke tests", () => {
  test("home page loads with command center content", async ({ commandCenter }) => {
    await commandCenter.open();
    await commandCenter.expectHero();
    await commandCenter.expectCoverage();
  });

  test("health API returns ok", async ({ request }) => {
    const response = await request.get("/api/health");
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body.status).toBe("ok");
    expect(body.service).toBe("quality-engineering-lab");
  });

  test("navigation routes resolve", async ({ page, shell }) => {
    const routes = features.filter((feature) => feature.href !== "/");

    for (const feature of routes) {
      await page.goto(feature.href);
      await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
    }

    await page.goto("/");
    await shell.expectSidebarLinkActive("Command Center");
  });

  test("articles index and detail load", async ({ articles }) => {
    await articles.openIndex();
    await articles.expectHeader();
    await articles.openArticle("why-90-percent-automation-coverage-is-a-bad-goal");
    await articles.expectArticleContentHeading("The coverage trap");
  });

  test("architecture page loads", async ({ architecture }) => {
    await architecture.open();
    await architecture.expectHeader();
  });

  test("bug hunt page loads", async ({ bugHunt }) => {
    await bugHunt.open();
    await bugHunt.expectHeader();
  });

  test("interview prep page loads", async ({ interviewPrep }) => {
    await interviewPrep.open();
    await interviewPrep.expectHeader();
    await interviewPrep.clickQuestion("playwright-auto-waiting");
    await interviewPrep.expectQuestionDetail("playwright-auto-waiting", "auto-wait");
  });

  test("framework demo page loads", async ({ frameworkDemo }) => {
    await frameworkDemo.open();
    await frameworkDemo.expectHeader();
    await frameworkDemo.clickSection("fixtures");
    await frameworkDemo.expectSectionDetail("fixtures", "test.fixture");
  });
});

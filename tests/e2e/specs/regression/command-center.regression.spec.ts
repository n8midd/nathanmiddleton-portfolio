import { test } from "../../fixtures/test.fixture";
import { commandCenterQuickLinks } from "../../../../lib/data/command-center";

test.describe("@regression Command Center", () => {
  test.beforeEach(async ({ commandCenter }) => {
    await commandCenter.open();
  });

  test("loads with correct document title", async ({ commandCenter }) => {
    await commandCenter.expectPageTitle();
  });

  test("displays hero with author, tagline, and experience", async ({ commandCenter }) => {
    await commandCenter.expectHero();
  });

  test("renders all metric cards from shared data", async ({ commandCenter }) => {
    await commandCenter.expectMetrics();
  });

  test("shows Passing badge on Build Health metric", async ({ commandCenter }) => {
    await commandCenter.expectBuildHealthPassing();
  });

  test("shows automation coverage progress bar at 92%", async ({ commandCenter }) => {
    await commandCenter.expectCoverage();
  });

  test("renders all skill chips from shared data", async ({ commandCenter }) => {
    await commandCenter.expectSkills();
  });

  test("does not show Coming soon banner", async ({ commandCenter }) => {
    await commandCenter.expectNoComingSoon();
  });

  test("has exactly one h1 on the page", async ({ commandCenter }) => {
    await commandCenter.expectSingleH1();
  });

  test("quick-link cards navigate to correct routes", async ({ commandCenter }) => {
    await commandCenter.expectQuickLinksVisible();

    for (const link of commandCenterQuickLinks) {
      await commandCenter.open();
      await commandCenter.clickQuickLink(link.label);
      await commandCenter.expectUrl(new RegExp(`${link.href.replace("/", "\\/")}$`));
    }
  });

  test("sidebar highlights Command Center as active", async ({ shell }) => {
    await shell.expectSidebarLinkActive("Command Center");
  });

  test("Command Center nav item has no soon badge", async ({ shell }) => {
    await shell.expectSidebarLinkHasSoonBadge("Command Center", false);
  });

  test("footer links match site config", async ({ shell }) => {
    await shell.expectFooterLinks();
  });

  test("mobile menu navigates to Testing Playground", async ({ page, shell, commandCenter }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await shell.navigateViaMobileMenu("Testing Playground");
    await commandCenter.expectUrl(/\/playground$/);
  });

  test("metric grid displays all cards on desktop viewport", async ({ page, commandCenter }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await commandCenter.expectMetricsGridOnDesktop();
  });

  test("metric content remains visible on mobile viewport", async ({ page, commandCenter }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await commandCenter.expectMetricsVisibleOnMobile();
  });
});

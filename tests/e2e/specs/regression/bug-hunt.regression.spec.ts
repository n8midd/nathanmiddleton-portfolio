import { test } from "../../fixtures/test.fixture";
import { sqlInjectionPayload } from "../../../../lib/data/bug-hunt";

test.describe("@regression Bug Hunt Game", () => {
  test.beforeEach(async ({ bugHunt }) => {
    await bugHunt.open();
  });

  test("loads with correct document title", async ({ bugHunt }) => {
    await bugHunt.expectPageTitle();
  });

  test("displays header with title and description", async ({ bugHunt }) => {
    await bugHunt.expectHeader();
  });

  test("has exactly one h1 on the page", async ({ bugHunt }) => {
    await bugHunt.expectSingleH1();
  });

  test("does not show Coming soon banner", async ({ bugHunt }) => {
    await bugHunt.expectNoComingSoon();
  });

  test("renders demo products from shared data", async ({ bugHunt }) => {
    await bugHunt.expectProductsVisible();
  });

  test("lists all six bug hints in tracker", async ({ bugHunt }) => {
    await bugHunt.expectAllBugHintsVisible();
  });

  test("validation bug found when checking out with quantity zero", async ({ bugHunt }) => {
    await bugHunt.setQuantity(0);
    await bugHunt.fillEmail("test@example.com");
    await bugHunt.clickPlaceOrder();
    await bugHunt.expectBugFound("validation");
  });

  test("validation bug found when checking out with empty email", async ({ bugHunt }) => {
    await bugHunt.setQuantity(1);
    await bugHunt.fillEmail("");
    await bugHunt.clickPlaceOrder();
    await bugHunt.expectBugFound("validation");
  });

  test("sql injection bug found and echoes payload in search error", async ({ bugHunt }) => {
    await bugHunt.search(sqlInjectionPayload);
    await bugHunt.expectSearchErrorContains(sqlInjectionPayload);
    await bugHunt.expectBugFound("sql-injection");
  });

  test("api error bug found when calculating shipping", async ({ bugHunt }) => {
    await bugHunt.clickCalculateShipping();
    await bugHunt.expectShippingError();
    await bugHunt.expectBugFound("api");
  });

  test("race condition bug found on double-click place order", async ({ bugHunt }) => {
    await bugHunt.setQuantity(1);
    await bugHunt.fillEmail("shopper@example.com");
    await bugHunt.doubleClickPlaceOrder();
    await bugHunt.expectOrderConfirmations(2);
    await bugHunt.expectBugFound("race");
  });

  test("accessibility bug image without alt is present", async ({ bugHunt }) => {
    await bugHunt.expectAccessibilityBugPresent();
  });

  test("css overlap banner is visible", async ({ bugHunt }) => {
    await bugHunt.expectCssBugBannerVisible();
  });

  test("sidebar highlights Bug Hunt Game as active", async ({ shell }) => {
    await shell.expectSidebarLinkActive("Bug Hunt Game");
  });

  test("Bug Hunt Game nav item has no soon badge", async ({ shell }) => {
    await shell.expectSidebarLinkHasSoonBadge("Bug Hunt Game", false);
  });

  test("content remains visible on mobile viewport", async ({ page, bugHunt }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await bugHunt.expectVisibleOnMobile();
  });
});

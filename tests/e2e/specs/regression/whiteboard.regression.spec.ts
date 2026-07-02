import { test } from "../../fixtures/test.fixture";

test.describe("@regression Architecture Whiteboard", () => {
  test.beforeEach(async ({ whiteboard }) => {
    await whiteboard.open();
  });

  test("loads with correct document title", async ({ whiteboard }) => {
    await whiteboard.expectPageTitle();
  });

  test("displays header with title and description", async ({ whiteboard }) => {
    await whiteboard.expectHeader();
  });

  test("has exactly one h1 on the page", async ({ whiteboard }) => {
    await whiteboard.expectSingleH1();
  });

  test("does not show Coming soon banner", async ({ whiteboard }) => {
    await whiteboard.expectNoComingSoon();
  });

  test("lists all microservice nodes from shared data", async ({ whiteboard }) => {
    await whiteboard.expectAllServicesVisible();
  });

  test("shows default Orders service selected on load", async ({ whiteboard }) => {
    await whiteboard.expectServiceSelected("orders");
    await whiteboard.expectDetailContains("Order lifecycle");
  });

  test("clicking Users updates detail panel", async ({ whiteboard }) => {
    await whiteboard.clickService("Users");
    await whiteboard.expectServiceSelected("users");
    await whiteboard.expectDetailContains("Authentication, profiles");
  });

  test("clicking Payments shows mock gateway content", async ({ whiteboard }) => {
    await whiteboard.clickService("Payments");
    await whiteboard.expectDetailContains("Mock payment gateway");
    await whiteboard.expectServiceSelected("payments");
  });

  test("clicking Inventory shows contract test content", async ({ whiteboard }) => {
    await whiteboard.clickService("Inventory");
    await whiteboard.expectDetailContains("Inventory → Orders");
    await whiteboard.expectServiceSelected("inventory");
  });

  test("shows all five test strategy layers for selected service", async ({ whiteboard }) => {
    await whiteboard.expectAllStrategyLayersVisible();
    await whiteboard.expectStrategyLayersForService("Orders");
  });

  test("switching services replaces previous detail", async ({ whiteboard }) => {
    await whiteboard.clickService("Payments");
    await whiteboard.expectDetailContains("PCI-scoped");

    await whiteboard.clickService("Shipping");
    await whiteboard.expectDetailContains("carrier webhook");
    await whiteboard.expectDetailDoesNotContain("PCI-scoped");
  });

  test("Shipping service shows async webhook scenarios", async ({ whiteboard }) => {
    await whiteboard.clickService("Shipping");
    await whiteboard.expectDetailContains("carrier webhook");
    await whiteboard.expectDetailContains("tracking webhook");
  });

  test("Notifications service is visible and selectable", async ({ whiteboard }) => {
    await whiteboard.clickService("Notifications");
    await whiteboard.expectServiceSelected("notifications");
    await whiteboard.expectDetailContains("dead-letter");
  });

  test("sidebar highlights Architecture Whiteboard with no soon badge", async ({ shell }) => {
    await shell.expectSidebarLinkActive("Architecture Whiteboard");
    await shell.expectSidebarLinkHasSoonBadge("Architecture Whiteboard", false);
  });

  test("content remains visible on mobile viewport", async ({ page, whiteboard }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await whiteboard.expectVisibleOnMobile();
  });
});

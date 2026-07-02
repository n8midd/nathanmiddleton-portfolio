import { test } from "../../fixtures/test.fixture";

test.describe("@regression Live API Explorer", () => {
  test.beforeEach(async ({ apiExplorer }) => {
    await apiExplorer.open();
  });

  test("loads with correct document title", async ({ apiExplorer }) => {
    await apiExplorer.expectPageTitle();
  });

  test("displays header with title and description", async ({ apiExplorer }) => {
    await apiExplorer.expectHeader();
  });

  test("has exactly one h1 on the page", async ({ apiExplorer }) => {
    await apiExplorer.expectSingleH1();
  });

  test("does not show Coming soon banner", async ({ apiExplorer }) => {
    await apiExplorer.expectNoComingSoon();
  });

  test("lists all endpoint cards from shared data", async ({ apiExplorer }) => {
    await apiExplorer.expectAllEndpointsListed();
  });

  test("shows default Users endpoint selected on load", async ({ apiExplorer }) => {
    await apiExplorer.expectEndpointSelected("users");
    await apiExplorer.expectRequestPath("GET /api/explorer/users");
  });

  test("request path shows GET users path", async ({ apiExplorer }) => {
    await apiExplorer.expectRequestPath("/api/explorer/users");
  });

  test("shows response placeholder before send", async ({ apiExplorer }) => {
    await apiExplorer.expectResponsePlaceholder();
  });

  test("GET users returns 200 with user data", async ({ apiExplorer }) => {
    await apiExplorer.sendRequest();
    await apiExplorer.expectResponseVisible();
    await apiExplorer.expectResponseStatus("200");
    await apiExplorer.expectResponseBodyContains("alex.rivera@example.com");
  });

  test("response shows timing in milliseconds", async ({ apiExplorer }) => {
    await apiExplorer.sendRequest();
    await apiExplorer.expectResponseTiming();
  });

  test("response shows headers section", async ({ apiExplorer }) => {
    await apiExplorer.sendRequest();
    await apiExplorer.expectResponseHeaders();
  });

  test("POST orders with valid body returns 201 and orderId", async ({ apiExplorer }) => {
    await apiExplorer.selectEndpoint("Orders");
    await apiExplorer.sendRequest();
    await apiExplorer.expectResponseStatus("201");
    await apiExplorer.expectResponseBodyContains("orderId");
    await apiExplorer.expectResponseBodyContains("created");
  });

  test("POST orders with invalid body shows 400 error", async ({ apiExplorer }) => {
    await apiExplorer.selectEndpoint("Orders");
    await apiExplorer.fillRequestBody("{}");
    await apiExplorer.sendRequest();
    await apiExplorer.expectResponseStatus("400");
    await apiExplorer.expectResponseBodyContains("error");
  });

  test("DELETE cart returns cleared response", async ({ apiExplorer }) => {
    await apiExplorer.selectEndpoint("Cart");
    await apiExplorer.sendRequest();
    await apiExplorer.expectResponseStatus("200");
    await apiExplorer.expectResponseBodyContains("cleared");
    await apiExplorer.expectResponseBodyContains("itemsRemoved");
  });

  test("sidebar highlights Live API Explorer with no soon badge", async ({ shell }) => {
    await shell.expectSidebarLinkActive("Live API Explorer");
    await shell.expectSidebarLinkHasSoonBadge("Live API Explorer", false);
  });

  test("content remains visible on mobile viewport", async ({ page, apiExplorer }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await apiExplorer.expectVisibleOnMobile();
  });
});

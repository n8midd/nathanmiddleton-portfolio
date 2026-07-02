import { test } from "../../fixtures/test.fixture";

test.describe("@regression Contact", () => {
  test.beforeEach(async ({ contact }) => {
    await contact.open();
  });

  test("loads with correct document title", async ({ contact }) => {
    await contact.expectPageTitle();
  });

  test("displays header with title and description", async ({ contact }) => {
    await contact.expectHeader();
  });

  test("has exactly one h1 on the page", async ({ contact }) => {
    await contact.expectSingleH1();
  });

  test("does not show Coming soon banner", async ({ contact }) => {
    await contact.expectNoComingSoon();
  });

  test("lists all contact offerings from shared data", async ({ contact }) => {
    await contact.expectAllOfferingsListed();
  });

  test("shows Let's talk CTA section", async ({ contact }) => {
    await contact.expectCtaVisible();
  });

  test("shows email link", async ({ contact }) => {
    await contact.expectEmailLink();
  });

  test("shows LinkedIn link", async ({ contact }) => {
    await contact.expectLinkedInLink();
  });

  test("shows GitHub link", async ({ contact }) => {
    await contact.expectGitHubLink();
  });

  test("email link uses mailto href", async ({ contact }) => {
    await contact.expectEmailHref();
  });

  test("LinkedIn link points to profile", async ({ contact }) => {
    await contact.expectLinkedInHref();
  });

  test("GitHub link points to repository", async ({ contact }) => {
    await contact.expectGitHubHref();
  });

  test("offerings include descriptions", async ({ contact }) => {
    await contact.expectOfferingDescriptions();
  });

  test("sidebar highlights Contact with no soon badge", async ({ shell }) => {
    await shell.expectSidebarLinkActive("Contact");
    await shell.expectSidebarLinkHasSoonBadge("Contact", false);
  });

  test("content remains visible on mobile viewport", async ({ page, contact }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await contact.expectVisibleOnMobile();
  });
});

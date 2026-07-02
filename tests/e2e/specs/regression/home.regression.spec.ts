import { expect, test } from "../../fixtures/test.fixture";
import { homeFeaturedLinks } from "../../../../lib/data/home";

test.describe("@regression Home", () => {
  test.beforeEach(async ({ home }) => {
    await home.open();
  });

  test("loads with correct document title", async ({ home }) => {
    await home.expectPageTitle();
  });

  test("displays hero with site name, tagline, and intro", async ({ home }) => {
    await home.expectHero();
  });

  test("has exactly one h1 on the page", async ({ home }) => {
    await home.expectSingleH1();
  });

  test("does not show Coming soon banner", async ({ home }) => {
    await home.expectNoComingSoon();
  });

  test("shows all priority quick links", async ({ home }) => {
    await home.expectPriorityLinks();
  });

  test("shows section guide cards for Lab, Content, Leadership, and Tools", async ({ home }) => {
    await home.expectSectionCards();
  });

  test("shows start here featured links", async ({ home }) => {
    await home.expectFeaturedLinks();
  });

  test("priority resume link navigates to resume page", async ({ home }) => {
    await home.clickPriorityLink("resume");
    await home.expectUrl(/\/resume$/);
  });

  test("priority contact link navigates to contact page", async ({ home }) => {
    await home.clickPriorityLink("contact");
    await home.expectUrl(/\/contact$/);
  });

  test("featured Command Center link navigates to dashboard", async ({ home }) => {
    await home.clickFeaturedLink("Command Center");
    await home.expectUrl(/\/command-center$/);
  });

  test("featured links include playground and articles", async ({ home }) => {
    for (const link of homeFeaturedLinks) {
      await expect(home.featured.getByRole("link", { name: link.label, exact: true })).toBeVisible();
    }
  });

  test("sidebar highlights Home as active", async ({ shell }) => {
    await shell.expectSidebarLinkActive("Home");
  });

  test("Home nav item has no soon badge", async ({ shell }) => {
    await shell.expectSidebarLinkHasSoonBadge("Home", false);
  });

  test("footer links match site config", async ({ shell }) => {
    await shell.expectFooterLinks();
  });
});

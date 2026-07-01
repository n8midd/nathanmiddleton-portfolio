import { filterLeadershipTopics, publishedTopics } from "../../pages/leadership.page";
import { test } from "../../fixtures/test.fixture";

test.describe("@regression QA Leadership", () => {
  test.beforeEach(async ({ leadership }) => {
    await leadership.open();
  });

  test("loads with correct document title", async ({ leadership }) => {
    await leadership.expectPageTitle();
  });

  test("displays header with title and description", async ({ leadership }) => {
    await leadership.expectHeader();
  });

  test("has exactly one h1 on the page", async ({ leadership }) => {
    await leadership.expectSingleH1();
  });

  test("does not show Coming soon banner", async ({ leadership }) => {
    await leadership.expectNoComingSoon();
  });

  test("shows all categories including All tab", async ({ leadership }) => {
    await leadership.expectAllCategoriesVisible();
  });

  test("lists all topics from shared data when unfiltered", async ({ leadership }) => {
    await leadership.expectAllTopicsListed();
  });

  test("selecting People category filters the list", async ({ leadership }) => {
    await leadership.selectCategory("people");
    await leadership.expectCategoryTopics("people");
  });

  test("searching by keyword narrows results", async ({ leadership }) => {
    await leadership.search("executive");
    await leadership.expectTopicCount(filterLeadershipTopics(publishedTopics(), "executive", "all").length);
  });

  test("search with no matches shows empty state", async ({ leadership }) => {
    await leadership.search("zzznomatchzzz");
    await leadership.expectNoResults();
  });

  test("clicking a topic navigates to detail page", async ({ leadership }) => {
    await leadership.clickTopic("hiring-philosophy");
    await leadership.expectTopicDetail("hiring-philosophy", "What Resume Keywords Miss");
  });

  test("detail page shows practices and pitfalls", async ({ leadership }) => {
    await leadership.openTopic("mentoring");
    await leadership.expectPracticesVisible();
    await leadership.expectPitfallsVisible();
  });

  test("executive reporting links to related article", async ({ leadership }) => {
    await leadership.openTopic("executive-reporting");
    await leadership.expectRelatedArticleLink();
  });

  test("detail page shows back link to index", async ({ leadership }) => {
    await leadership.openTopic("coaching");
    await leadership.expectBackLink();
  });

  test("test strategy essay covers risk-first planning", async ({ leadership }) => {
    await leadership.openTopic("test-strategy");
    await leadership.expectTopicDetail("test-strategy", "Start With Risk");
  });

  test("sidebar highlights QA Leadership with no soon badge", async ({ shell }) => {
    await shell.expectSidebarLinkActive("QA Leadership");
    await shell.expectSidebarLinkHasSoonBadge("QA Leadership", false);
  });
});

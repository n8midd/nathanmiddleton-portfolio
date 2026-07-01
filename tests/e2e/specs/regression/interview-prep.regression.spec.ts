import { filterQuestions, interviewQuestions } from "../../pages/interview-prep.page";
import { test } from "../../fixtures/test.fixture";

test.describe("@regression Interview Prep", () => {
  test.beforeEach(async ({ interviewPrep }) => {
    await interviewPrep.open();
  });

  test("loads with correct document title", async ({ interviewPrep }) => {
    await interviewPrep.expectPageTitle();
  });

  test("displays header with title and description", async ({ interviewPrep }) => {
    await interviewPrep.expectHeader();
  });

  test("has exactly one h1 on the page", async ({ interviewPrep }) => {
    await interviewPrep.expectSingleH1();
  });

  test("does not show Coming soon banner", async ({ interviewPrep }) => {
    await interviewPrep.expectNoComingSoon();
  });

  test("shows all categories including All tab", async ({ interviewPrep }) => {
    await interviewPrep.expectAllCategoriesVisible();
  });

  test("lists all questions from shared data when unfiltered", async ({ interviewPrep }) => {
    await interviewPrep.expectAllQuestionsListed();
  });

  test("selecting Playwright category filters the list", async ({ interviewPrep }) => {
    await interviewPrep.selectCategory("playwright");
    await interviewPrep.expectCategoryQuestions("playwright");
  });

  test("selecting Leadership category filters the list", async ({ interviewPrep }) => {
    await interviewPrep.selectCategory("leadership");
    await interviewPrep.expectCategoryQuestions("leadership");
  });

  test("searching by keyword narrows results", async ({ interviewPrep }) => {
    await interviewPrep.search("auto-wait");
    await interviewPrep.expectQuestionCount(filterQuestions("auto-wait", "all").length);
  });

  test("search with no matches shows empty state", async ({ interviewPrep }) => {
    await interviewPrep.search("zzznomatchzzz");
    await interviewPrep.expectNoResults();
  });

  test("clicking a question reveals answer detail", async ({ interviewPrep }) => {
    await interviewPrep.clickQuestion("playwright-auto-waiting");
    await interviewPrep.expectQuestionDetail("playwright-auto-waiting", "auto-wait");
  });

  test("shows answer placeholder before a question is selected", async ({ interviewPrep }) => {
    await interviewPrep.expectAnswerPlaceholder();
  });

  test("shows answer beside question list on desktop without scrolling", async ({ interviewPrep, page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await interviewPrep.expectSplitLayout();
    await interviewPrep.expectAnswerVisibleBesideQuestions("playwright-auto-waiting");
  });

  test("switching category after search shows correct subset", async ({ interviewPrep }) => {
    await interviewPrep.search("test");
    await interviewPrep.selectCategory("leadership");
    await interviewPrep.expectQuestionCount(filterQuestions("test", "leadership").length);
  });

  test("sidebar highlights Interview Prep with no soon badge", async ({ shell }) => {
    await shell.expectSidebarLinkActive("Interview Prep");
    await shell.expectSidebarLinkHasSoonBadge("Interview Prep", false);
  });

  test("content remains visible on mobile viewport", async ({ page, interviewPrep }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await interviewPrep.expectVisibleOnMobile();
  });

  test("clearing search restores full question list", async ({ interviewPrep }) => {
    await interviewPrep.search("playwright");
    await interviewPrep.clearSearch();
    await interviewPrep.expectQuestionCount(interviewQuestions.length);
  });
});

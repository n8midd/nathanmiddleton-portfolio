import { expect, test } from "../../fixtures/test.fixture";

test.describe("@regression What Would You Test", () => {
  test.beforeEach(async ({ exercises }) => {
    await exercises.open();
  });

  test("loads with correct document title", async ({ exercises }) => {
    await exercises.expectPageTitle();
  });

  test("displays header with title and description", async ({ exercises }) => {
    await exercises.expectHeader();
  });

  test("has exactly one h1 on the page", async ({ exercises }) => {
    await exercises.expectSingleH1();
  });

  test("does not show Coming soon banner", async ({ exercises }) => {
    await exercises.expectNoComingSoon();
  });

  test("lists all exercise cards from shared data", async ({ exercises }) => {
    await exercises.expectAllExercisesListed();
  });

  test("shows default login exercise selected on load", async ({ exercises }) => {
    await exercises.expectExerciseSelected("login-page");
    await exercises.expectScenarioVisible("login");
  });

  test("login scenario mock is visible", async ({ page, exercises }) => {
    await exercises.expectScenarioVisible("login");
    await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
  });

  test("prompt What would you test is visible", async ({ exercises }) => {
    await exercises.expectPromptVisible();
  });

  test("answer is hidden before reveal", async ({ exercises }) => {
    await exercises.expectAnswerHidden();
  });

  test("reveal shows Security test area for login", async ({ exercises }) => {
    await exercises.revealAnswer();
    await exercises.expectAnswerVisible();
    await exercises.expectTestAreaVisible("security");
    await exercises.expectAnswerContains("SQL injection");
  });

  test("reveal shows Accessibility content for login", async ({ exercises }) => {
    await exercises.revealAnswer();
    await exercises.expectTestAreaVisible("accessibility");
    await exercises.expectAnswerContains("screen readers");
  });

  test("switching to Checkout exercise resets reveal", async ({ exercises }) => {
    await exercises.revealAnswer();
    await exercises.expectAnswerVisible();

    await exercises.clickExercise("Checkout & Payment");
    await exercises.expectExerciseSelected("checkout-payment");
    await exercises.expectAnswerHidden();
  });

  test("checkout reveal shows payment-related content", async ({ exercises }) => {
    await exercises.clickExercise("Checkout & Payment");
    await exercises.revealAnswer();
    await exercises.expectAnswerContains("declined cards");
    await exercises.expectTestAreaVisible("payment");
  });

  test("sidebar highlights What Would You Test with no soon badge", async ({ shell }) => {
    await shell.expectSidebarLinkActive("What Would You Test?");
    await shell.expectSidebarLinkHasSoonBadge("What Would You Test?", false);
  });

  test("content remains visible on mobile viewport", async ({ page, exercises }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await exercises.expectVisibleOnMobile();
  });
});

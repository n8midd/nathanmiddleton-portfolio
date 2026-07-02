import { expect, test } from "../../fixtures/test.fixture";

test.describe("@regression Test Case Builder", () => {
  test.beforeEach(async ({ testCaseBuilder }) => {
    await testCaseBuilder.open();
  });

  test("loads with correct document title", async ({ testCaseBuilder }) => {
    await testCaseBuilder.expectPageTitle();
  });

  test("displays header with title and description", async ({ testCaseBuilder }) => {
    await testCaseBuilder.expectHeader();
  });

  test("has exactly one h1 on the page", async ({ testCaseBuilder }) => {
    await testCaseBuilder.expectSingleH1();
  });

  test("does not show Coming soon banner", async ({ testCaseBuilder }) => {
    await testCaseBuilder.expectNoComingSoon();
  });

  test("shows feature input and generate button", async ({ testCaseBuilder }) => {
    await testCaseBuilder.expectBuilderVisible();
  });

  test("shows validation when feature is empty", async ({ testCaseBuilder }) => {
    await testCaseBuilder.generate();
    await testCaseBuilder.expectValidationError("Enter a feature or page");
    await testCaseBuilder.expectNoResults();
  });

  test("shows validation when feature is whitespace only", async ({ testCaseBuilder }) => {
    await testCaseBuilder.fillFeature("   ");
    await testCaseBuilder.generate();
    await testCaseBuilder.expectValidationError("Enter a feature or page");
    await testCaseBuilder.expectNoResults();
  });

  test("generates test cases for Login Page", async ({ testCaseBuilder }) => {
    await testCaseBuilder.fillFeature("Login Page");
    await testCaseBuilder.generate();
    await testCaseBuilder.expectResultsVisible();
    await testCaseBuilder.expectFeatureInResultsSummary("Login Page");
  });

  test("lists all six test case categories", async ({ testCaseBuilder }) => {
    await testCaseBuilder.fillFeature("Login Page");
    await testCaseBuilder.generate();
    await testCaseBuilder.expectAllCategoriesVisible();
  });

  test("generated cases include the feature name", async ({ testCaseBuilder }) => {
    await testCaseBuilder.fillFeature("Checkout payment flow");
    await testCaseBuilder.generate();
    await testCaseBuilder.expectGeneratedCasesForFeature("Checkout payment flow");
  });

  test("shows copy all button after generation", async ({ testCaseBuilder }) => {
    await testCaseBuilder.fillFeature("Password reset");
    await testCaseBuilder.generate();
    await testCaseBuilder.expectCopyButtonVisible();
  });

  test("positive category includes happy-path cases", async ({ testCaseBuilder }) => {
    await testCaseBuilder.fillFeature("User registration");
    await testCaseBuilder.generate();
    await expect(
      testCaseBuilder.categorySection("positive").getByText(/valid inputs/i),
    ).toBeVisible();
  });

  test("security category includes injection scenarios", async ({ testCaseBuilder }) => {
    await testCaseBuilder.fillFeature("Search API");
    await testCaseBuilder.generate();
    await expect(
      testCaseBuilder.categorySection("security").getByText(/SQL injection/i),
    ).toBeVisible();
  });

  test("accessibility category includes keyboard navigation", async ({ testCaseBuilder }) => {
    await testCaseBuilder.fillFeature("Settings page");
    await testCaseBuilder.generate();
    await expect(
      testCaseBuilder.categoryList("accessibility").getByTestId("test-case-item").first(),
    ).toContainText(/keyboard/i);
  });

  test("content remains visible on mobile viewport", async ({ page, testCaseBuilder }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await testCaseBuilder.expectVisibleOnMobile();
  });
});

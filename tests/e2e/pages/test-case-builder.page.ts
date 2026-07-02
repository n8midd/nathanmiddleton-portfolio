import { expect, type Locator, type Page } from "@playwright/test";
import {
  generateTestCases,
  testCaseCategories,
  type TestCaseCategoryId,
} from "../../../lib/data/test-case-builder";
import { getFeatureBySlug } from "../../../lib/site-config";
import { BasePage } from "./base.page";

const feature = getFeatureBySlug("test-case-builder")!;

export class TestCaseBuilderPage extends BasePage {
  readonly root: Locator;
  readonly builder: Locator;
  readonly featureInput: Locator;
  readonly generateButton: Locator;
  readonly results: Locator;

  constructor(page: Page) {
    super(page);
    this.root = page.getByTestId("test-case-builder-page");
    this.builder = page.getByTestId("test-case-builder");
    this.featureInput = page.getByTestId("feature-input");
    this.generateButton = page.getByTestId("generate-test-cases-button");
    this.results = page.getByTestId("test-case-results");
  }

  categorySection(categoryId: TestCaseCategoryId): Locator {
    return this.builder.locator(
      `[data-testid="test-case-category"][data-category-id="${categoryId}"]`,
    );
  }

  categoryList(categoryId: TestCaseCategoryId): Locator {
    return this.builder.locator(
      `[data-testid="test-case-list"][data-category-id="${categoryId}"]`,
    );
  }

  async open() {
    await this.goto("/test-case-builder");
    await expect(this.root).toBeVisible();
  }

  async expectPageTitle() {
    await this.expectTitle(/Test Case Builder \| Quality Engineering Lab/);
  }

  async expectHeader() {
    await expect(this.page.getByRole("heading", { level: 1, name: feature.label })).toBeVisible();
    await expect(this.page.getByText(feature.description)).toBeVisible();
  }

  async expectSingleH1() {
    await expect(this.page.getByRole("heading", { level: 1 })).toHaveCount(1);
  }

  async expectNoComingSoon() {
    await expect(this.page.getByText("Coming soon", { exact: true })).toHaveCount(0);
  }

  async expectBuilderVisible() {
    await expect(this.builder).toBeVisible();
    await expect(this.featureInput).toBeVisible();
    await expect(this.generateButton).toBeVisible();
  }

  async fillFeature(description: string) {
    await this.featureInput.fill(description);
  }

  async generate() {
    await this.generateButton.click();
  }

  async expectValidationError(message: string) {
    await expect(this.page.getByTestId("feature-input-error")).toBeVisible();
    await expect(this.page.getByTestId("feature-input-error")).toContainText(message);
  }

  async expectNoResults() {
    await expect(this.page.getByTestId("test-case-results")).toHaveCount(0);
  }

  async expectResultsVisible() {
    await expect(this.page.getByTestId("test-case-results")).toBeVisible();
  }

  async expectAllCategoriesVisible() {
    for (const category of testCaseCategories) {
      await expect(this.categorySection(category.id)).toBeVisible();
      await expect(this.categorySection(category.id)).toContainText(category.label);
    }
  }

  async expectGeneratedCasesForFeature(featureDescription: string) {
    const cases = generateTestCases(featureDescription);

    for (const category of testCaseCategories) {
      const list = this.categoryList(category.id);
      await expect(list.getByTestId("test-case-item")).toHaveCount(cases[category.id].length);

      for (const testCase of cases[category.id]) {
        await expect(this.categorySection(category.id)).toContainText(testCase);
      }
    }
  }

  async expectCopyButtonVisible() {
    await expect(this.page.getByTestId("copy-test-cases-button")).toBeVisible();
  }

  async expectFeatureInResultsSummary(featureDescription: string) {
    await expect(this.page.getByTestId("test-case-results")).toContainText(featureDescription);
  }

  async expectVisibleOnMobile() {
    await expect(this.builder).toBeVisible();
    await expect(this.featureInput).toBeVisible();
  }
}

export { testCaseCategories, generateTestCases };

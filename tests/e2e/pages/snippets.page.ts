import { expect, type Locator, type Page } from "@playwright/test";
import {
  ALL_CATEGORIES_ID,
  codeSnippets,
  filterSnippets,
  getSnippetById,
  snippetCategories,
} from "../../../lib/data/snippets";
import { getFeatureBySlug } from "../../../lib/site-config";
import { BasePage } from "./base.page";

const feature = getFeatureBySlug("snippets")!;

export class SnippetsPage extends BasePage {
  readonly root: Locator;
  readonly browser: Locator;
  readonly snippetPanel: Locator;
  readonly detailContainer: Locator;

  constructor(page: Page) {
    super(page);
    this.root = page.getByTestId("snippets-page");
    this.browser = page.getByTestId("snippet-browser");
    this.snippetPanel = page.getByTestId("snippet-panel");
    this.detailContainer = page.getByTestId("snippet-detail-panel-container");
  }

  categoryTab(categoryId: string): Locator {
    return this.browser.locator(
      `[data-testid="category-tab"][data-category-id="${categoryId}"]`,
    );
  }

  async open() {
    await this.goto("/snippets");
    await expect(this.root).toBeVisible();
  }

  async expectPageTitle() {
    await this.expectTitle(/Code Snippet Library \| Quality Engineering Lab/);
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

  async expectAllCategoriesVisible() {
    await expect(this.categoryTab(ALL_CATEGORIES_ID)).toBeVisible();

    for (const category of snippetCategories) {
      await expect(this.categoryTab(category.id)).toBeVisible();
    }
  }

  async expectSnippetCount(count: number) {
    await expect(this.browser.getByTestId("snippet-count")).toContainText(
      `${count} snippet${count === 1 ? "" : "s"}`,
    );
    await expect(this.snippetPanel.getByTestId("snippet-card")).toHaveCount(count);
  }

  async expectAllSnippetsListed() {
    await this.expectSnippetCount(codeSnippets.length);

    for (const snippet of codeSnippets) {
      await expect(
        this.snippetPanel.locator(`[data-testid="snippet-card"][data-snippet-id="${snippet.id}"]`),
      ).toBeVisible();
    }
  }

  async selectCategory(categoryId: string) {
    await this.categoryTab(categoryId).click();
  }

  async search(query: string) {
    await this.browser.getByTestId("snippet-search").fill(query);
  }

  async clickSnippet(snippetId: string) {
    await this.snippetPanel.locator(`[data-testid="snippet-card"][data-snippet-id="${snippetId}"]`).click();
  }

  async expectSnippetDetail(snippetId: string, text: string) {
    const snippet = getSnippetById(snippetId);
    const detail = this.detailContainer.getByTestId("snippet-detail-panel");

    await expect(detail).toBeVisible();
    await expect(detail).toContainText(text);

    if (snippet) {
      await expect(detail).toContainText(snippet.title);
    }
  }

  async expectSnippetPlaceholder() {
    await expect(this.detailContainer.getByTestId("snippet-placeholder")).toBeVisible();
    await expect(this.detailContainer.getByTestId("snippet-detail-panel")).toHaveCount(0);
  }

  async expectLanguageBadge(language: string) {
    await expect(this.detailContainer.getByTestId("snippet-language")).toContainText(language);
  }

  async expectCopyButtonVisible() {
    await expect(this.detailContainer.getByTestId("copy-snippet-button")).toBeVisible();
  }

  async expectNoResults() {
    await expect(this.browser.getByTestId("no-results")).toBeVisible();
    await expect(this.snippetPanel.getByTestId("snippet-card")).toHaveCount(0);
  }

  async expectCategorySnippets(categoryId: string) {
    const expected = filterSnippets("", categoryId);
    await this.expectSnippetCount(expected.length);
  }

  async expectVisibleOnMobile() {
    await expect(this.browser.getByTestId("snippet-search")).toBeVisible();
    await expect(this.snippetPanel).toBeVisible();
  }
}

export { codeSnippets, snippetCategories, filterSnippets, ALL_CATEGORIES_ID };

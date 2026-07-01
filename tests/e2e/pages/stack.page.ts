import { expect, type Locator, type Page } from "@playwright/test";
import {
  ALL_CATEGORIES_ID,
  filterStackTools,
  getToolById,
  stackCategories,
  stackTools,
} from "../../../lib/data/technical-stack";
import { getFeatureBySlug } from "../../../lib/site-config";
import { BasePage } from "./base.page";

const feature = getFeatureBySlug("stack")!;

export class StackPage extends BasePage {
  readonly root: Locator;
  readonly explorer: Locator;
  readonly toolPanel: Locator;
  readonly detailPanel: Locator;

  constructor(page: Page) {
    super(page);
    this.root = page.getByTestId("stack-page");
    this.explorer = page.getByTestId("stack-explorer");
    this.toolPanel = page.getByTestId("tool-panel");
    this.detailPanel = page.getByTestId("tool-detail-panel");
  }

  categoryTab(categoryId: string): Locator {
    return this.explorer.locator(
      `[data-testid="category-tab"][data-category-id="${categoryId}"]`,
    );
  }

  async open() {
    await this.goto("/stack");
    await expect(this.root).toBeVisible();
  }

  async expectPageTitle() {
    await this.expectTitle(/Technical Stack \| Quality Engineering Lab/);
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

    for (const category of stackCategories) {
      await expect(this.categoryTab(category.id)).toBeVisible();
    }
  }

  async expectToolCount(count: number) {
    await expect(this.explorer.getByTestId("tool-count")).toContainText(
      `${count} tool${count === 1 ? "" : "s"}`,
    );
    await expect(this.toolPanel.getByTestId("tool-card")).toHaveCount(count);
  }

  async expectAllToolsListed() {
    await this.expectToolCount(stackTools.length);

    for (const tool of stackTools) {
      await expect(
        this.toolPanel.locator(`[data-testid="tool-card"][data-tool-id="${tool.id}"]`),
      ).toBeVisible();
    }
  }

  async selectCategory(categoryId: string) {
    await this.categoryTab(categoryId).click();
  }

  async search(query: string) {
    await this.explorer.getByTestId("stack-search").fill(query);
  }

  async clickTool(toolId: string) {
    await this.toolPanel.locator(`[data-testid="tool-card"][data-tool-id="${toolId}"]`).click();
  }

  async expectToolDetail(toolId: string, text: string) {
    const tool = getToolById(toolId);
    const detail = this.detailPanel.getByTestId("tool-detail");

    await expect(detail).toBeVisible();
    await expect(detail).toContainText(text);

    if (tool) {
      await expect(detail).toContainText(tool.name);
    }
  }

  async expectToolPlaceholder() {
    await expect(this.detailPanel.getByTestId("tool-placeholder")).toBeVisible();
    await expect(this.detailPanel.getByTestId("tool-detail")).toHaveCount(0);
  }

  async expectUsedInLabBadge() {
    await expect(this.detailPanel.getByTestId("used-in-lab-badge")).toBeVisible();
  }

  async expectNoResults() {
    await expect(this.explorer.getByTestId("no-results")).toBeVisible();
    await expect(this.toolPanel.getByTestId("tool-card")).toHaveCount(0);
  }

  async expectCategoryTools(categoryId: string) {
    const expected = filterStackTools("", categoryId);
    await this.expectToolCount(expected.length);
  }

  async expectToolVisible(toolId: string) {
    await expect(
      this.toolPanel.locator(`[data-testid="tool-card"][data-tool-id="${toolId}"]`),
    ).toBeVisible();
  }
}

export {
  ALL_CATEGORIES_ID,
  filterStackTools,
  stackCategories,
  stackTools,
};

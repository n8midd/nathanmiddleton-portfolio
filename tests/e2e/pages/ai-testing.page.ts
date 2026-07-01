import { expect, type Locator, type Page } from "@playwright/test";
import {
  ALL_CATEGORIES_ID,
  aiTestingCategories,
  aiTestingTopics,
  filterTopics,
  getTopicById,
} from "../../../lib/data/ai-testing";
import { getFeatureBySlug } from "../../../lib/site-config";
import { BasePage } from "./base.page";

const feature = getFeatureBySlug("ai-testing")!;

export class AiTestingPage extends BasePage {
  readonly root: Locator;
  readonly browser: Locator;
  readonly topicPanel: Locator;
  readonly detailPanel: Locator;

  constructor(page: Page) {
    super(page);
    this.root = page.getByTestId("ai-testing-page");
    this.browser = page.getByTestId("ai-testing-browser");
    this.topicPanel = page.getByTestId("topic-panel");
    this.detailPanel = page.getByTestId("topic-detail-panel");
  }

  categoryTab(categoryId: string): Locator {
    return this.browser.locator(
      `[data-testid="category-tab"][data-category-id="${categoryId}"]`,
    );
  }

  async open() {
    await this.goto("/ai-testing");
    await expect(this.root).toBeVisible();
  }

  async expectPageTitle() {
    await this.expectTitle(/AI in Testing \| Quality Engineering Lab/);
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

    for (const category of aiTestingCategories) {
      await expect(this.categoryTab(category.id)).toBeVisible();
    }
  }

  async expectTopicCount(count: number) {
    await expect(this.browser.getByTestId("topic-count")).toContainText(
      `${count} topic${count === 1 ? "" : "s"}`,
    );
    await expect(this.topicPanel.getByTestId("topic-card")).toHaveCount(count);
  }

  async expectAllTopicsListed() {
    await this.expectTopicCount(aiTestingTopics.length);

    for (const topic of aiTestingTopics) {
      await expect(
        this.topicPanel.locator(`[data-testid="topic-card"][data-topic-id="${topic.id}"]`),
      ).toBeVisible();
    }
  }

  async selectCategory(categoryId: string) {
    await this.categoryTab(categoryId).click();
  }

  async search(query: string) {
    await this.browser.getByTestId("ai-testing-search").fill(query);
  }

  async clickTopic(topicId: string) {
    await this.topicPanel
      .locator(`[data-testid="topic-card"][data-topic-id="${topicId}"]`)
      .click();
  }

  async expectTopicDetail(topicId: string, text: string) {
    const topic = getTopicById(topicId);
    const detail = this.detailPanel.getByTestId("topic-detail");

    await expect(detail).toBeVisible();
    await expect(detail).toContainText(text);

    if (topic) {
      await expect(detail).toContainText(topic.title);
    }
  }

  async expectTopicPlaceholder() {
    await expect(this.detailPanel.getByTestId("topic-placeholder")).toBeVisible();
    await expect(this.detailPanel.getByTestId("topic-detail")).toHaveCount(0);
  }

  async expectExamplePromptVisible() {
    await expect(this.detailPanel.getByTestId("example-prompt")).toBeVisible();
  }

  async expectNoResults() {
    await expect(this.browser.getByTestId("no-results")).toBeVisible();
    await expect(this.topicPanel.getByTestId("topic-card")).toHaveCount(0);
  }

  async expectCategoryTopics(categoryId: string) {
    const expected = filterTopics("", categoryId);
    await this.expectTopicCount(expected.length);
  }

  async fillPromptField(fieldId: string, value: string) {
    await this.detailPanel.getByTestId(`prompt-field-${fieldId}`).fill(value);
  }

  async generatePrompt() {
    await this.detailPanel.getByTestId("generate-prompt-button").click();
  }

  async expectGeneratedPromptContains(text: string) {
    await expect(this.detailPanel.getByTestId("generated-prompt")).toBeVisible();
    await expect(this.detailPanel.getByTestId("generated-prompt")).toContainText(text);
  }

  async passRagCriterion(criterionId: string) {
    await this.detailPanel.getByTestId(`rag-criterion-${criterionId}-pass`).click();
  }

  async expectRagScore(passed: number, total: number) {
    await expect(this.detailPanel.getByTestId("rag-eval-score")).toContainText(
      `Score: ${passed}/${total} passed`,
    );
  }
}

export {
  ALL_CATEGORIES_ID,
  filterTopics,
  aiTestingCategories,
  aiTestingTopics,
  ragEvaluationCriteria,
} from "../../../lib/data/ai-testing";

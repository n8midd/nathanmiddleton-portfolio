import { expect, type Locator, type Page } from "@playwright/test";
import {
  ALL_CATEGORIES_ID,
  filterQuestions,
  getQuestionById,
  interviewCategories,
  interviewQuestions,
} from "../../../lib/data/interview-prep";
import { getFeatureBySlug } from "../../../lib/site-config";
import { BasePage } from "./base.page";

const feature = getFeatureBySlug("interview-prep")!;

export class InterviewPrepPage extends BasePage {
  readonly root: Locator;
  readonly browser: Locator;
  readonly questionPanel: Locator;
  readonly answerPanel: Locator;

  constructor(page: Page) {
    super(page);
    this.root = page.getByTestId("interview-prep-page");
    this.browser = page.getByTestId("interview-prep-browser");
    this.questionPanel = page.getByTestId("question-panel");
    this.answerPanel = page.getByTestId("answer-panel");
  }

  async open() {
    await this.goto("/interview-prep");
    await expect(this.root).toBeVisible();
  }

  async expectPageTitle() {
    await this.expectTitle(/Interview Prep \| Quality Engineering Lab/);
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

  categoryTab(categoryId: string): Locator {
    return this.browser.locator(
      `[data-testid="category-tab"][data-category-id="${categoryId}"]`,
    );
  }

  async expectAllCategoriesVisible() {
    await expect(this.categoryTab(ALL_CATEGORIES_ID)).toBeVisible();

    for (const category of interviewCategories) {
      await expect(this.categoryTab(category.id)).toBeVisible();
    }
  }

  async expectQuestionCount(count: number) {
    await expect(this.browser.getByTestId("question-count")).toContainText(
      `${count} question${count === 1 ? "" : "s"}`,
    );
    await expect(this.questionPanel.getByTestId("question-card")).toHaveCount(count);
  }

  async expectAllQuestionsListed() {
    await this.expectQuestionCount(interviewQuestions.length);

    for (const question of interviewQuestions) {
      await expect(
        this.questionPanel.locator(`[data-testid="question-card"][data-question-id="${question.id}"]`),
      ).toBeVisible();
    }
  }

  async selectCategory(categoryId: string) {
    await this.categoryTab(categoryId).click();
  }

  async search(query: string) {
    await this.browser.getByTestId("interview-search").fill(query);
  }

  async clearSearch() {
    await this.browser.getByTestId("interview-search").fill("");
  }

  async clickQuestion(questionId: string) {
    await this.questionPanel
      .locator(`[data-testid="question-card"][data-question-id="${questionId}"]`)
      .click();
  }

  async expectQuestionDetail(questionId: string, text: string) {
    const question = getQuestionById(questionId);
    const detail = this.answerPanel.getByTestId("question-detail");

    await expect(this.answerPanel).toBeVisible();
    await expect(detail).toBeVisible();
    await expect(detail).toContainText(text);

    if (question) {
      await expect(detail).toContainText(question.question);
    }
  }

  async expectAnswerPlaceholder() {
    await expect(this.answerPanel.getByTestId("answer-placeholder")).toBeVisible();
    await expect(this.answerPanel.getByTestId("question-detail")).toHaveCount(0);
  }

  async expectSplitLayout() {
    await expect(this.browser.getByTestId("interview-prep-split-layout")).toBeVisible();
    await expect(this.questionPanel).toBeVisible();
    await expect(this.answerPanel).toBeVisible();
  }

  async expectAnswerVisibleBesideQuestions(questionId: string) {
    await this.clickQuestion(questionId);

    const questionCard = this.questionPanel.locator(
      `[data-testid="question-card"][data-question-id="${questionId}"]`,
    );
    const detail = this.answerPanel.getByTestId("question-detail");

    await expect(questionCard).toBeVisible();
    await expect(detail).toBeVisible();

    const questionBox = await questionCard.boundingBox();
    const detailBox = await detail.boundingBox();

    expect(questionBox).not.toBeNull();
    expect(detailBox).not.toBeNull();

    if (questionBox && detailBox) {
      expect(detailBox.x).toBeGreaterThan(questionBox.x);
      expect(detailBox.y).toBeLessThan(questionBox.y + questionBox.height);
    }
  }

  async expectNoResults() {
    await expect(this.browser.getByTestId("no-results")).toBeVisible();
    await expect(this.questionPanel.getByTestId("question-card")).toHaveCount(0);
  }

  async expectCategoryQuestions(categoryId: string) {
    const expected = filterQuestions("", categoryId);
    await this.expectQuestionCount(expected.length);

    for (const question of expected) {
      await expect(
        this.questionPanel.locator(`[data-testid="question-card"][data-question-id="${question.id}"]`),
      ).toBeVisible();
    }
  }

  async expectVisibleOnMobile() {
    await expect(this.browser.getByTestId("interview-search")).toBeVisible();
    await expect(this.questionPanel.getByTestId("question-card").first()).toBeVisible();
    await expect(this.answerPanel).toBeVisible();
  }
}

export { ALL_CATEGORIES_ID, filterQuestions, interviewCategories, interviewQuestions };

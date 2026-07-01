import { expect, type Locator, type Page } from "@playwright/test";
import {
  ALL_CATEGORIES_ID,
  filterLeadershipTopics,
  leadershipCategories,
} from "../../../lib/data/qa-leadership";
import { getAllLeadershipTopics } from "../../../lib/leadership";
import { getFeatureBySlug } from "../../../lib/site-config";
import { BasePage } from "./base.page";

const feature = getFeatureBySlug("leadership")!;
const publishedTopics = () =>
  getAllLeadershipTopics().filter((topic) => topic.status === "published");

export class LeadershipPage extends BasePage {
  readonly root: Locator;
  readonly browser: Locator;

  constructor(page: Page) {
    super(page);
    this.root = page.getByTestId("leadership-page");
    this.browser = page.getByTestId("leadership-browser");
  }

  categoryTab(categoryId: string): Locator {
    return this.browser.locator(
      `[data-testid="category-tab"][data-category-id="${categoryId}"]`,
    );
  }

  topicCard(topicSlug: string): Locator {
    return this.browser.locator(`[data-testid="topic-card"][data-topic-slug="${topicSlug}"]`);
  }

  async open() {
    await this.goto("/leadership");
    await expect(this.root).toBeVisible();
  }

  async openTopic(slug: string) {
    await this.goto(`/leadership/${slug}`);
    await expect(this.page.getByTestId("leadership-topic-page")).toBeVisible();
  }

  async expectPageTitle() {
    await this.expectTitle(/QA Leadership \| Quality Engineering Lab/);
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

    for (const category of leadershipCategories) {
      await expect(this.categoryTab(category.id)).toBeVisible();
    }
  }

  async expectTopicCount(count: number) {
    await expect(this.browser.getByTestId("topic-count")).toContainText(
      `${count} topic${count === 1 ? "" : "s"}`,
    );
    await expect(this.browser.getByTestId("topic-card")).toHaveCount(count);
  }

  async expectAllTopicsListed() {
    const topics = publishedTopics();
    await this.expectTopicCount(topics.length);

    for (const topic of topics) {
      await expect(this.topicCard(topic.slug)).toBeVisible();
    }
  }

  async selectCategory(categoryId: string) {
    await this.categoryTab(categoryId).click();
  }

  async search(query: string) {
    await this.browser.getByTestId("leadership-search").fill(query);
  }

  async clickTopic(slug: string) {
    await this.topicCard(slug).getByRole("link", { name: /Read essay/ }).click();
  }

  async expectTopicDetail(slug: string, text: string) {
    const page = this.page.getByTestId("leadership-topic-page");
    await expect(page).toBeVisible();
    await expect(page).toHaveAttribute("data-topic-slug", slug);
    await expect(this.page.getByTestId("leadership-topic-content")).toContainText(text);
  }

  async expectPracticesVisible() {
    await expect(this.page.getByTestId("leadership-practices")).toBeVisible();
  }

  async expectPitfallsVisible() {
    await expect(this.page.getByTestId("leadership-pitfalls")).toBeVisible();
  }

  async expectRelatedArticleLink() {
    await expect(this.page.getByTestId("related-article-link")).toBeVisible();
  }

  async expectBackLink() {
    await expect(this.page.getByTestId("leadership-back-link")).toBeVisible();
  }

  async expectNoResults() {
    await expect(this.browser.getByTestId("no-results")).toBeVisible();
    await expect(this.browser.getByTestId("topic-card")).toHaveCount(0);
  }

  async expectCategoryTopics(categoryId: string) {
    const expected = filterLeadershipTopics(publishedTopics(), "", categoryId);
    await this.expectTopicCount(expected.length);
  }
}

export { ALL_CATEGORIES_ID, filterLeadershipTopics, leadershipCategories, publishedTopics };

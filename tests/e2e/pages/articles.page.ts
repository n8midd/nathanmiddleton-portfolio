import { expect, type Locator, type Page } from "@playwright/test";
import { articleManifest, getManifestEntryBySlug } from "../../../lib/data/articles";
import { getFeatureBySlug } from "../../../lib/site-config";
import { BasePage } from "./base.page";

const feature = getFeatureBySlug("articles")!;

export class ArticlesPage extends BasePage {
  readonly root: Locator;

  constructor(page: Page) {
    super(page);
    this.root = page.getByTestId("articles-page");
  }

  async openIndex() {
    await this.goto("/articles");
    await expect(this.root).toBeVisible();
  }

  async openArticle(slug: string) {
    await this.goto(`/articles/${slug}`);
    await expect(this.page.getByTestId("article-page")).toBeVisible();
    await expect(this.page.getByTestId("article-page")).toHaveAttribute("data-article-slug", slug);
  }

  async expectIndexPageTitle() {
    await this.expectTitle(/How I Solve Problems \| Quality Engineering Lab/);
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

  async expectPublishedArticlesListed() {
    for (const entry of articleManifest) {
      await expect(this.page.getByRole("link", { name: entry.title, exact: true })).toBeVisible();
    }
  }

  async expectArticleCard(slug: string, title: string) {
    const card = this.page.locator(`[data-testid="article-card"][data-article-slug="${slug}"]`);
    await expect(card).toBeVisible();
    await expect(card.getByRole("link", { name: title, exact: true })).toBeVisible();
  }

  async clickArticleCard(slug: string, title: string) {
    await this.page
      .locator(`[data-testid="article-card"][data-article-slug="${slug}"]`)
      .getByRole("link", { name: title, exact: true })
      .click();
  }

  async expectArticleSlug(slug: string) {
    await this.expectUrl(new RegExp(`/articles/${slug}$`));
  }

  async expectPlannedSectionHidden() {
    await expect(this.page.getByTestId("planned-articles")).toHaveCount(0);
  }

  async clickArticle(title: string) {
    await this.page.getByRole("link", { name: title, exact: true }).click();
  }

  async expectArticlePageTitle(title: string) {
    await this.expectTitle(new RegExp(`${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")} \\| Quality Engineering Lab`));
  }

  async expectBackLink() {
    const backLink = this.page.getByTestId("article-back-link");
    await expect(backLink).toBeVisible();
    await backLink.click();
    await expect(this.root).toBeVisible();
  }

  async expectArticleContentHeading(heading: string) {
    await expect(this.page.getByTestId("article-content").getByRole("heading", { level: 2, name: heading })).toBeVisible();
  }

  async expectArticleMetadata(status: string, date: string) {
    await expect(this.page.getByText(status, { exact: true })).toBeVisible();
    await expect(this.page.getByText(date, { exact: true })).toBeVisible();
  }

  async expectDetailSingleH1() {
    await expect(this.page.getByRole("heading", { level: 1 })).toHaveCount(1);
  }

  async expectVisibleOnMobile() {
    await expect(this.root).toBeVisible();
    await expect(this.page.getByTestId("article-card").first()).toBeVisible();
  }
}

export { articleManifest, getManifestEntryBySlug };

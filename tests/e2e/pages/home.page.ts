import { expect, type Locator, type Page } from "@playwright/test";
import {
  getHomeSections,
  homeFeaturedLinks,
  homeHero,
  homePriorityLinks,
} from "../../../lib/data/home";
import { siteConfig } from "../../../lib/site-config";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
  readonly root: Locator;
  readonly hero: Locator;
  readonly priorityLinks: Locator;
  readonly sections: Locator;
  readonly featured: Locator;

  constructor(page: Page) {
    super(page);
    this.root = page.getByTestId("home-page");
    this.hero = page.getByTestId("home-hero");
    this.priorityLinks = page.getByTestId("home-priority-links");
    this.sections = page.getByTestId("home-sections");
    this.featured = page.getByTestId("home-featured");
  }

  async open() {
    await this.goto("/");
    await expect(this.root).toBeVisible();
  }

  async expectPageTitle() {
    await this.expectTitle(/Home \| Quality Engineering Lab/);
  }

  async expectHero() {
    await expect(this.page.getByRole("heading", { level: 1, name: siteConfig.name })).toBeVisible();
    await expect(this.page.getByText(siteConfig.tagline)).toBeVisible();
    await expect(this.hero).toHaveText(homeHero);
  }

  async expectPriorityLinks() {
    for (const link of homePriorityLinks) {
      await expect(this.priorityLinks.getByTestId(`priority-link-${link.id}`)).toBeVisible();
      await expect(this.priorityLinks.getByTestId(`priority-link-${link.id}`)).toHaveText(link.label);
    }
  }

  async expectSectionCards() {
    const sections = getHomeSections();
    for (const section of sections) {
      await expect(this.sections.getByTestId(`section-${section.group.toLowerCase()}`)).toBeVisible();
      await expect(this.sections.getByText(section.summary)).toBeVisible();
    }
  }

  async expectFeaturedLinks() {
    for (const link of homeFeaturedLinks) {
      await expect(this.featured.getByRole("link", { name: link.label, exact: true })).toBeVisible();
    }
  }

  async clickPriorityLink(id: string) {
    await this.priorityLinks.getByTestId(`priority-link-${id}`).click();
  }

  async clickFeaturedLink(label: string) {
    await this.featured.getByRole("link", { name: label, exact: true }).click();
  }

  async expectNoComingSoon() {
    await expect(this.page.getByText("Coming soon", { exact: true })).toHaveCount(0);
  }

  async expectSingleH1() {
    await expect(this.page.getByRole("heading", { level: 1 })).toHaveCount(1);
  }
}

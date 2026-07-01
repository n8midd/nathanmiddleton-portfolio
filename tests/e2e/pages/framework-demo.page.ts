import { expect, type Locator, type Page } from "@playwright/test";
import {
  frameworkFileTree,
  frameworkSections,
  getSectionById,
  getSectionByTitle,
} from "../../../lib/data/framework-demo";
import { getFeatureBySlug, siteConfig } from "../../../lib/site-config";
import { BasePage } from "./base.page";

const feature = getFeatureBySlug("framework-demo")!;

export class FrameworkDemoPage extends BasePage {
  readonly root: Locator;
  readonly explorer: Locator;
  readonly fileTree: Locator;

  constructor(page: Page) {
    super(page);
    this.root = page.getByTestId("framework-demo-page");
    this.explorer = page.getByTestId("framework-demo-explorer");
    this.fileTree = page.getByTestId("framework-file-tree");
  }

  sectionCard(sectionId: string): Locator {
    return this.explorer.locator(
      `[data-testid="section-card"][data-section-id="${sectionId}"]`,
    );
  }

  async open() {
    await this.goto("/framework-demo");
    await expect(this.root).toBeVisible();
  }

  async expectPageTitle() {
    await this.expectTitle(/Framework Demo \| Quality Engineering Lab/);
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

  async expectAllSectionsListed() {
    for (const section of frameworkSections) {
      await expect(this.sectionCard(section.id)).toBeVisible();
      await expect(this.sectionCard(section.id)).toContainText(section.title);
    }
  }

  async clickSection(sectionId: string) {
    await this.sectionCard(sectionId).click();
  }

  async expectSectionDetail(sectionId: string, text?: string) {
    const section = getSectionById(sectionId);
    const detail = this.page.getByTestId("section-detail");

    await expect(detail).toBeVisible();

    if (section) {
      await expect(detail).toContainText(section.title);
      for (const highlight of section.highlights) {
        await expect(detail).toContainText(highlight);
      }
    }

    if (text) {
      await expect(detail).toContainText(text);
    }
  }

  async expectSectionDetailShows(title: string) {
    await expect(this.page.getByTestId("section-detail")).toContainText(title);
  }

  async expectSectionDetailDoesNotShow(text: string) {
    await expect(this.page.getByTestId("section-detail")).not.toContainText(text);
  }

  async expectFileTreeEntries() {
    for (const entry of frameworkFileTree) {
      await expect(
        this.fileTree.locator(`[data-testid="file-tree-entry"][data-path="${entry.path}"]`),
      ).toBeVisible();
    }
  }

  async expectGitHubLink() {
    const link = this.page.getByTestId("framework-github-link");
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", siteConfig.githubUrl);
  }

  async expectPlannedSectionBadge(sectionId: string) {
    await expect(this.sectionCard(sectionId).getByTestId("section-planned-badge")).toBeVisible();
  }

  async expectVisibleOnMobile() {
    await expect(this.fileTree).toBeVisible();
    await expect(this.sectionCard(frameworkSections[0]?.id ?? "")).toBeVisible();
  }
}

export { frameworkFileTree, frameworkSections, getSectionById, getSectionByTitle };

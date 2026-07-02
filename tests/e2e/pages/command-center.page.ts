import { expect, type Locator, type Page } from "@playwright/test";
import {
  automationCoverage,
  automationCoverageLabel,
  commandCenterExperience,
  commandCenterMetrics,
  commandCenterQuickLinks,
  commandCenterSkills,
} from "../../../lib/data/command-center";
import { siteConfig } from "../../../lib/site-config";
import { BasePage } from "./base.page";

export class CommandCenterPage extends BasePage {
  readonly root: Locator;
  readonly metricsGrid: Locator;
  readonly skillsPanel: Locator;
  readonly quickLinks: Locator;
  readonly coverageSection: Locator;

  constructor(page: Page) {
    super(page);
    this.root = page.getByTestId("command-center");
    this.metricsGrid = page.getByTestId("command-center-metrics");
    this.skillsPanel = page.getByTestId("command-center-skills");
    this.quickLinks = page.getByTestId("quick-links");
    this.coverageSection = page.getByTestId("automation-coverage");
  }

  async open() {
    await this.goto("/command-center");
    await expect(this.root).toBeVisible();
  }

  async expectPageTitle() {
    await this.expectTitle(/Command Center \| Quality Engineering Lab/);
  }

  async expectHero() {
    await expect(this.page.getByRole("heading", { level: 1, name: siteConfig.author })).toBeVisible();
    await expect(this.page.getByText(siteConfig.tagline)).toBeVisible();
    await expect(this.page.getByText(commandCenterExperience)).toBeVisible();
  }

  async expectMetrics() {
    for (const metric of commandCenterMetrics) {
      const card = this.metricsGrid.getByTestId("metric-card").filter({
        has: this.page.getByText(metric.label, { exact: true }),
      });

      await expect(card).toBeVisible();

      if (metric.value && metric.label !== "CI Status") {
        await expect(card.getByText(metric.value, { exact: true })).toBeVisible();
      }

      if (metric.hint) {
        await expect(card.getByText(metric.hint, { exact: true })).toBeVisible();
      }

      await expect(card.getByTestId("data-source-live")).toBeVisible();
    }
  }

  async expectCiStatusLink() {
    await expect(this.page.getByTestId("ci-status-link")).toBeVisible();
    await expect(this.page.getByTestId("ci-status-link")).toHaveAttribute(
      "href",
      /github\.com\/.*\/actions/,
    );
  }

  async expectCoverage() {
    const coverageBar = this.coverageSection.getByTestId("automation-coverage-bar");

    await expect(this.coverageSection.getByTestId("demo-data-callout")).toBeVisible();
    await expect(this.coverageSection.getByTestId("data-source-demo")).toBeVisible();
    await expect(coverageBar.getByText(automationCoverageLabel)).toBeVisible();
    await expect(coverageBar.getByText(`${automationCoverage}%`)).toBeVisible();

    const progressbar = coverageBar.getByRole("progressbar", {
      name: automationCoverageLabel,
    });
    await expect(progressbar).toHaveAttribute("aria-valuenow", String(automationCoverage));
  }

  async expectSkills() {
    for (const skill of commandCenterSkills) {
      await expect(this.skillsPanel.getByTestId("skill-chip").filter({ hasText: skill })).toBeVisible();
    }
  }

  async expectNoComingSoon() {
    await expect(this.page.getByText("Coming soon", { exact: true })).toHaveCount(0);
  }

  async expectSingleH1() {
    await expect(this.page.getByRole("heading", { level: 1 })).toHaveCount(1);
  }

  async clickQuickLink(label: string) {
    await this.quickLinks.getByRole("link", { name: label, exact: true }).click();
  }

  async expectQuickLinksVisible() {
    for (const link of commandCenterQuickLinks) {
      await expect(this.quickLinks.getByRole("link", { name: link.label, exact: true })).toBeVisible();
    }
  }

  async expectMetricsGridOnDesktop() {
    await expect(this.metricsGrid).toBeVisible();
    await expect(this.metricsGrid.getByTestId("metric-card")).toHaveCount(commandCenterMetrics.length);
  }

  async expectMetricsVisibleOnMobile() {
    await expect(this.metricsGrid).toBeVisible();
    await expect(this.page.getByText("Unit Tests")).toBeVisible();
    await expect(this.page.getByText("Smoke Tests")).toBeVisible();
  }
}

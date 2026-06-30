import { expect, type Locator, type Page } from "@playwright/test";
import {
  architecturePatterns,
  getPatternByTitle,
  getPipelineStepByLabel,
  pipelineSteps,
  reportingOutputs,
} from "../../../lib/data/architecture";
import { getFeatureBySlug } from "../../../lib/site-config";
import { BasePage } from "./base.page";

const feature = getFeatureBySlug("architecture")!;

export class ArchitecturePage extends BasePage {
  readonly root: Locator;
  readonly pipelineFlow: Locator;
  readonly patternsSection: Locator;

  constructor(page: Page) {
    super(page);
    this.root = page.getByTestId("architecture-page");
    this.pipelineFlow = page.getByTestId("pipeline-flow");
    this.patternsSection = page.getByTestId("architecture-patterns");
  }

  async open() {
    await this.goto("/architecture");
    await expect(this.root).toBeVisible();
  }

  async expectPageTitle() {
    await this.expectTitle(/Framework Architecture \| Quality Engineering Lab/);
  }

  async expectHeader() {
    await expect(this.page.getByRole("heading", { level: 1, name: feature.label })).toBeVisible();
    await expect(this.page.getByText(feature.description)).toBeVisible();
  }

  async expectNoComingSoon() {
    await expect(this.page.getByText("Coming soon", { exact: true })).toHaveCount(0);
  }

  async expectSingleH1() {
    await expect(this.page.getByRole("heading", { level: 1 })).toHaveCount(1);
  }

  async expectAllPipelineSteps() {
    for (const step of pipelineSteps) {
      await expect(
        this.pipelineFlow.getByTestId("pipeline-step").filter({ hasText: step.label }),
      ).toBeVisible();
    }
  }

  async clickPipelineStep(label: string) {
    await this.pipelineFlow.getByRole("button", { name: label, exact: true }).click();
  }

  async expectPipelineDetail(text: string) {
    await expect(this.page.getByTestId("pipeline-detail")).toContainText(text);
  }

  async expectReportingOutputs() {
    const outputs = this.page.getByTestId("reporting-outputs");
    for (const output of reportingOutputs) {
      await expect(outputs.getByText(output, { exact: true })).toBeVisible();
    }
  }

  async expectAllPatterns() {
    for (const pattern of architecturePatterns) {
      await expect(
        this.patternsSection.getByTestId("pattern-card").filter({ hasText: pattern.title }),
      ).toBeVisible();
    }
  }

  async clickPattern(title: string) {
    await this.patternsSection.getByRole("button", { name: title, exact: true }).click();
  }

  async expectPatternDetail(title: string, practices?: string[]) {
    const pattern = getPatternByTitle(title);
    const detail = this.page.getByTestId("pattern-detail");

    await expect(detail).toBeVisible();
    await expect(detail).toContainText(title);
    if (pattern) {
      await expect(detail).toContainText(pattern.detail);
    }

    if (practices) {
      for (const practice of practices) {
        await expect(detail).toContainText(practice);
      }
    } else if (pattern) {
      for (const practice of pattern.practices) {
        await expect(detail).toContainText(practice);
      }
    }
  }

  async expectPatternDetailShows(title: string) {
    await expect(this.page.getByTestId("pattern-detail")).toContainText(title);
  }

  async expectPatternDetailDoesNotShow(title: string) {
    await expect(this.page.getByTestId("pattern-detail")).not.toContainText(title);
  }

  async expectPipelineStepDetail(label: string) {
    const step = getPipelineStepByLabel(label);
    if (step) {
      await this.expectPipelineDetail(step.detail);
    }
  }

  async expectVisibleOnMobile() {
    await expect(this.pipelineFlow).toBeVisible();
    await expect(this.patternsSection).toBeVisible();
    await expect(
      this.pipelineFlow.getByRole("button", { name: pipelineSteps[0]?.label ?? "", exact: true }),
    ).toBeVisible();
    await expect(
      this.patternsSection.getByRole("button", {
        name: architecturePatterns[0]?.title ?? "",
        exact: true,
      }),
    ).toBeVisible();
  }
}

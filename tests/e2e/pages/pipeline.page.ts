import { expect, type Locator, type Page } from "@playwright/test";
import { ciPipelineSteps, getCiPipelineStepByLabel } from "../../../lib/data/ci-pipeline";
import { getFeatureBySlug } from "../../../lib/site-config";
import { BasePage } from "./base.page";

const feature = getFeatureBySlug("pipeline")!;

export class PipelinePage extends BasePage {
  readonly root: Locator;
  readonly visualizer: Locator;

  constructor(page: Page) {
    super(page);
    this.root = page.getByTestId("pipeline-page");
    this.visualizer = page.getByTestId("ci-pipeline-visualizer");
  }

  ciStep(stepId: string): Locator {
    return this.visualizer.locator(
      `[data-testid="ci-pipeline-step"][data-step-id="${stepId}"]`,
    );
  }

  async open() {
    await this.goto("/pipeline");
    await expect(this.root).toBeVisible();
  }

  async expectPageTitle() {
    await this.expectTitle(/CI\/CD Pipeline \| Quality Engineering Lab/);
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

  async expectAllStepsListed() {
    for (const step of ciPipelineSteps) {
      await expect(this.ciStep(step.id)).toBeVisible();
      await expect(this.ciStep(step.id)).toContainText(step.label);
    }
  }

  async clickStep(label: string) {
    await this.visualizer.getByRole("button", { name: label, exact: true }).click();
  }

  async expectStepDetail(text: string) {
    await expect(this.page.getByTestId("ci-pipeline-detail")).toContainText(text);
  }

  async expectStepDetailDoesNotShow(text: string) {
    await expect(this.page.getByTestId("ci-pipeline-detail")).not.toContainText(text);
  }

  async expectStepSelected(stepId: string) {
    await expect(this.ciStep(stepId)).toHaveAttribute("aria-pressed", "true");
  }

  async expectStepDetailForLabel(label: string) {
    const step = getCiPipelineStepByLabel(label);
    if (step) {
      await this.expectStepDetail(step.detail);
    }
  }

  async expectVisibleOnMobile() {
    await expect(this.visualizer).toBeVisible();
    await expect(this.ciStep(ciPipelineSteps[0]?.id ?? "")).toBeVisible();
    await expect(this.page.getByTestId("ci-pipeline-detail")).toBeVisible();
  }
}

export { ciPipelineSteps };

import { expect, type Locator, type Page } from "@playwright/test";
import {
  artilleryImplSteps,
  artilleryResults,
  getArtilleryResultKpis,
} from "../../../lib/data/artillery";
import { getFeatureBySlug } from "../../../lib/site-config";
import { BasePage } from "./base.page";

const feature = getFeatureBySlug("artillery")!;

export class ArtilleryPage extends BasePage {
  readonly root: Locator;
  readonly lab: Locator;

  constructor(page: Page) {
    super(page);
    this.root = page.getByTestId("artillery-page");
    this.lab = page.getByTestId("artillery-lab");
  }

  tab(tabId: "results" | "how"): Locator {
    return this.page.locator(`[data-testid="artillery-tab"][data-tab-id="${tabId}"]`);
  }

  implStep(stepId: string): Locator {
    return this.lab.locator(`[data-testid="artillery-impl-step"][data-step-id="${stepId}"]`);
  }

  async open() {
    await this.goto("/artillery");
    await expect(this.root).toBeVisible();
  }

  async expectPageTitle() {
    await this.expectTitle(/Artillery Performance \| Quality Engineering Lab/);
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

  async openResultsTab() {
    await this.tab("results").click();
    await expect(this.page.getByTestId("artillery-results")).toBeVisible();
  }

  async openHowTab() {
    await this.tab("how").click();
    await expect(this.page.getByTestId("artillery-how")).toBeVisible();
  }

  async expectResultKpis() {
    for (const kpi of getArtilleryResultKpis()) {
      await expect(
        this.page.locator(
          `[data-testid="artillery-kpi-card"][data-metric-label="${kpi.label}"]`,
        ),
      ).toContainText(kpi.value);
    }
  }

  async expectWebVitalsTable() {
    await expect(this.page.getByTestId("artillery-web-vitals")).toBeVisible();
    expect(artilleryResults.webVitals.length).toBeGreaterThan(0);
    for (const vital of artilleryResults.webVitals) {
      await expect(
        this.page.locator(
          `[data-testid="artillery-vital-row"][data-vital-name="${vital.name}"]`,
        ),
      ).toBeVisible();
    }
  }

  async expectAllImplStepsListed() {
    for (const step of artilleryImplSteps) {
      await expect(this.implStep(step.id)).toBeVisible();
      await expect(this.implStep(step.id)).toContainText(step.label);
    }
  }

  async clickImplStep(label: string) {
    await this.lab.getByRole("button", { name: label, exact: true }).click();
  }

  async expectImplDetail(text: string) {
    await expect(this.page.getByTestId("artillery-impl-detail")).toContainText(text);
  }

  async expectImplStepSelected(stepId: string) {
    await expect(this.implStep(stepId)).toHaveAttribute("aria-pressed", "true");
  }

  async expectVisibleOnMobile() {
    await expect(this.lab).toBeVisible();
    await expect(this.tab("results")).toBeVisible();
  }
}

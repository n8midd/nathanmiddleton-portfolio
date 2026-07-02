import { expect, type Locator, type Page } from "@playwright/test";
import {
  defaultMicroserviceId,
  getMicroserviceById,
  getMicroserviceByLabel,
  microservices,
  testStrategyLayerIds,
} from "../../../lib/data/whiteboard";
import { getFeatureBySlug } from "../../../lib/site-config";
import { BasePage } from "./base.page";

const feature = getFeatureBySlug("whiteboard")!;

export class WhiteboardPage extends BasePage {
  readonly root: Locator;
  readonly diagram: Locator;
  readonly detailPanel: Locator;

  constructor(page: Page) {
    super(page);
    this.root = page.getByTestId("whiteboard-page");
    this.diagram = page.getByTestId("microservices-diagram");
    this.detailPanel = page.getByTestId("service-detail-panel");
  }

  serviceNode(serviceId: string): Locator {
    return this.diagram.locator(
      `[data-testid="microservice-node"][data-service-id="${serviceId}"]`,
    );
  }

  strategyLayer(layerId: string): Locator {
    return this.detailPanel.locator(
      `[data-testid="test-strategy-layer"][data-layer-id="${layerId}"]`,
    );
  }

  async open() {
    await this.goto("/whiteboard");
    await expect(this.root).toBeVisible();
  }

  async expectPageTitle() {
    await this.expectTitle(/Architecture Whiteboard \| Quality Engineering Lab/);
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

  async expectAllServicesVisible() {
    for (const service of microservices) {
      await expect(this.serviceNode(service.id)).toBeVisible();
      await expect(this.serviceNode(service.id)).toContainText(service.label);
    }
  }

  async clickService(label: string) {
    const service = getMicroserviceByLabel(label);
    if (!service) {
      throw new Error(`Unknown microservice label: ${label}`);
    }
    await this.serviceNode(service.id).click();
  }

  async clickServiceById(serviceId: string) {
    const service = getMicroserviceById(serviceId);
    if (!service) {
      throw new Error(`Unknown microservice id: ${serviceId}`);
    }
    await this.serviceNode(service.id).click();
  }

  async expectServiceSelected(serviceId: string) {
    await expect(this.serviceNode(serviceId)).toHaveAttribute("aria-pressed", "true");
  }

  async expectDetailContains(text: string) {
    await expect(this.detailPanel).toContainText(text);
  }

  async expectDetailDoesNotContain(text: string) {
    await expect(this.detailPanel).not.toContainText(text);
  }

  async expectAllStrategyLayersVisible() {
    for (const layerId of testStrategyLayerIds) {
      await expect(this.strategyLayer(layerId)).toBeVisible();
    }
  }

  async expectStrategyLayersForService(label: string) {
    const service = getMicroserviceByLabel(label);
    if (!service) return;

    for (const layer of service.testStrategy) {
      await expect(this.strategyLayer(layer.id)).toContainText(layer.label);
    }
  }

  async expectVisibleOnMobile() {
    await expect(this.diagram).toBeVisible();
    await expect(this.serviceNode(defaultMicroserviceId)).toBeVisible();
    await expect(this.detailPanel).toBeVisible();
  }
}

export { microservices, defaultMicroserviceId, testStrategyLayerIds };

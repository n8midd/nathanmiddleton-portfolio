import { expect, type Locator, type Page } from "@playwright/test";
import {
  apiEndpoints,
  defaultEndpointId,
  getEndpointByLabel,
} from "../../../lib/data/api-explorer";
import { getFeatureBySlug } from "../../../lib/site-config";
import { BasePage } from "./base.page";

const feature = getFeatureBySlug("api-explorer")!;

export class ApiExplorerPage extends BasePage {
  readonly root: Locator;
  readonly client: Locator;

  constructor(page: Page) {
    super(page);
    this.root = page.getByTestId("api-explorer-page");
    this.client = page.getByTestId("api-explorer-client");
  }

  endpointCard(endpointId: string): Locator {
    return this.client.locator(
      `[data-testid="endpoint-card"][data-endpoint-id="${endpointId}"]`,
    );
  }

  async open() {
    await this.goto("/api-explorer");
    await expect(this.root).toBeVisible();
  }

  async expectPageTitle() {
    await this.expectTitle(/Live API Explorer \| Quality Engineering Lab/);
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

  async expectAllEndpointsListed() {
    for (const endpoint of apiEndpoints) {
      await expect(this.endpointCard(endpoint.id)).toBeVisible();
      await expect(this.endpointCard(endpoint.id)).toContainText(endpoint.label);
    }
  }

  async expectEndpointSelected(endpointId: string) {
    await expect(this.endpointCard(endpointId)).toHaveAttribute("aria-pressed", "true");
  }

  async selectEndpoint(label: string) {
    const endpoint = getEndpointByLabel(label);
    if (!endpoint) {
      throw new Error(`Unknown endpoint label: ${label}`);
    }
    await this.endpointCard(endpoint.id).click();
  }

  async expectRequestPath(text: string) {
    await expect(this.page.getByTestId("request-path")).toContainText(text);
  }

  async expectResponsePlaceholder() {
    await expect(this.page.getByTestId("response-placeholder")).toBeVisible();
    await expect(this.page.getByTestId("response-panel")).toHaveCount(0);
  }

  async sendRequest() {
    await this.page.getByTestId("send-request-button").click();
  }

  async fillRequestBody(body: string) {
    await this.page.getByTestId("request-body").fill(body);
  }

  async expectResponseVisible() {
    await expect(this.page.getByTestId("response-panel")).toBeVisible();
  }

  async expectResponseStatus(text: string) {
    await expect(this.page.getByTestId("response-status")).toContainText(text);
  }

  async expectResponseTiming() {
    await expect(this.page.getByTestId("response-timing")).toContainText("ms");
  }

  async expectResponseHeaders() {
    await expect(this.page.getByTestId("response-headers")).toBeVisible();
    await expect(this.page.getByTestId("response-headers")).toContainText("content-type");
  }

  async expectResponseBodyContains(text: string) {
    await expect(this.page.getByTestId("response-body")).toContainText(text);
  }

  async expectVisibleOnMobile() {
    await expect(this.client).toBeVisible();
    await expect(this.page.getByTestId("send-request-button")).toBeVisible();
  }
}

export { apiEndpoints, defaultEndpointId };

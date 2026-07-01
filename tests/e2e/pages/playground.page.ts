import { expect, type Locator, type Page } from "@playwright/test";
import {
  loginCredentials,
  playgroundDemos,
} from "../../../lib/data/playground";
import { getFeatureBySlug } from "../../../lib/site-config";
import { BasePage } from "./base.page";

const feature = getFeatureBySlug("playground")!;

export class PlaygroundPage extends BasePage {
  readonly root: Locator;

  constructor(page: Page) {
    super(page);
    this.root = page.getByTestId("playground-page");
  }

  demoCard(slug: string): Locator {
    return this.page.locator(`[data-testid="demo-card"][data-demo-slug="${slug}"]`);
  }

  demoRoot(slug: string): Locator {
    return this.page.locator(`[data-testid="playground-demo"][data-demo-slug="${slug}"]`);
  }

  async open() {
    await this.goto("/playground");
    await expect(this.root).toBeVisible();
  }

  async openDemo(slug: string) {
    await this.goto(`/playground/${slug}`);
    await expect(this.demoRoot(slug)).toBeVisible();
  }

  async expectPageTitle() {
    await this.expectTitle(/Testing Playground \| Quality Engineering Lab/);
  }

  async expectDemoPageTitle(label: string) {
    await this.expectTitle(new RegExp(`${label} \\| Testing Playground`));
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

  async expectAllDemosListed() {
    for (const demo of playgroundDemos) {
      await expect(this.demoCard(demo.slug)).toBeVisible();
      await expect(this.demoCard(demo.slug)).toContainText(demo.label);
    }
  }

  async clickDemoCard(slug: string) {
    await this.demoCard(slug).getByRole("link").click();
  }

  async expectDemoLoaded(slug: string) {
    const demo = playgroundDemos.find((item) => item.slug === slug);
    if (!demo) throw new Error(`Unknown demo slug: ${slug}`);

    await expect(this.demoRoot(slug)).toBeVisible();
    await expect(this.page.getByRole("heading", { level: 1, name: demo.label })).toBeVisible();
    await expect(this.page.getByTestId("playground-automation-tip")).toContainText(
      demo.automationTip.slice(0, 30),
    );
  }

  async submitLogin(username: string, password: string) {
    await this.page.getByTestId("login-username").fill(username);
    await this.page.getByTestId("login-password").fill(password);
    await this.page.getByTestId("login-submit").click();
  }

  async expectLoginError(message?: string) {
    const error = this.page.getByTestId("login-error");
    await expect(error).toBeVisible();
    if (message) {
      await expect(error).toContainText(message);
    }
  }

  async expectLoginSuccess() {
    await expect(this.page.getByTestId("login-success")).toContainText(loginCredentials.username);
  }

  async submitEmptyForm() {
    await this.page.getByTestId("form-submit").click();
  }

  async expectFormValidationErrors() {
    await expect(this.page.getByTestId("form-errors")).toBeVisible();
    await expect(this.page.getByTestId("form-errors")).toContainText("Name is required.");
  }

  async selectCustomDropdownOption(value: string) {
    await this.page.getByTestId("custom-combobox-trigger").click();
    await this.page.getByTestId(`custom-option-${value}`).click();
  }

  async expectCustomDropdownValue(label: string) {
    await expect(this.page.getByTestId("custom-combobox-value")).toContainText(label);
  }

  async openModal() {
    await this.page.getByTestId("open-modal-button").click();
    await expect(this.page.getByTestId("playground-modal")).toBeVisible();
  }

  async closeModal() {
    await this.page.getByTestId("playground-modal").getByRole("button", { name: "Close" }).click();
    await expect(this.page.getByTestId("playground-modal")).not.toBeVisible();
  }

  async expectModalClosed() {
    await expect(this.page.getByTestId("modal-closed-indicator")).toBeVisible();
  }

  async sortTableByRole() {
    await this.page.getByTestId("table-sort-role").click();
  }

  async expectFirstTableRow(name: string) {
    await expect(this.page.getByTestId("table-first-row")).toContainText(name);
  }

  async scrollInfiniteListToBottom() {
    const container = this.page.getByTestId("infinite-scroll-container");
    await container.evaluate((element) => {
      element.scrollTop = element.scrollHeight;
    });
  }

  async expectInfiniteScrollItemCountGreaterThan(count: number) {
    await expect(this.page.getByTestId("infinite-scroll-count")).not.toContainText(
      `Loaded items: ${count}`,
    );
    const text = await this.page.getByTestId("infinite-scroll-count").textContent();
    const loaded = Number(text?.replace("Loaded items: ", "") ?? "0");
    expect(loaded).toBeGreaterThan(count);
  }

  async fetchApiItems() {
    await this.page.getByTestId("fetch-items-button").click();
  }

  async expectApiResults() {
    await expect(this.page.getByTestId("api-results")).toBeVisible();
    await expect(this.page.getByTestId("api-results")).toContainText("Widget A");
  }

  async expectVisibleOnMobile() {
    await expect(this.root).toBeVisible();
    await expect(this.demoCard("login")).toBeVisible();
  }
}

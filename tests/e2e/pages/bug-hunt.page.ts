import { expect, type Locator, type Page } from "@playwright/test";
import {
  bugHuntTotalBugs,
  demoProducts,
  getBugById,
  hiddenBugs,
  sqlInjectionPayload,
} from "../../../lib/data/bug-hunt";
import { getFeatureBySlug } from "../../../lib/site-config";
import { BasePage } from "./base.page";

const feature = getFeatureBySlug("bug-hunt")!;

export class BugHuntPage extends BasePage {
  readonly root: Locator;
  readonly cartApp: Locator;
  readonly bugTracker: Locator;

  constructor(page: Page) {
    super(page);
    this.root = page.getByTestId("bug-hunt-page");
    this.cartApp = page.getByTestId("shopping-cart-app");
    this.bugTracker = page.getByTestId("bug-tracker");
  }

  async open() {
    await this.goto("/bug-hunt");
    await expect(this.root).toBeVisible();
  }

  async expectPageTitle() {
    await this.expectTitle(/Bug Hunt Game \| Quality Engineering Lab/);
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

  async expectProductsVisible() {
    for (const product of demoProducts) {
      await expect(this.cartApp.getByText(product.name, { exact: true })).toBeVisible();
    }
  }

  async expectAllBugHintsVisible() {
    for (const bug of hiddenBugs) {
      const item = this.bugItem(bug.id);
      await expect(item).toBeVisible();
      await expect(item).toContainText(bug.hint);
      await expect(item).toHaveAttribute("data-found", "false");
    }
  }

  bugItem(id: string): Locator {
    return this.bugTracker.locator(`[data-bug-id="${id}"]`);
  }

  async setQuantity(value: number) {
    await this.cartApp.getByTestId("cart-quantity").fill(String(value));
  }

  async fillEmail(value: string) {
    await this.cartApp.getByTestId("checkout-email").fill(value);
  }

  async clickPlaceOrder() {
    await this.cartApp.getByTestId("place-order").click();
  }

  async doubleClickPlaceOrder() {
    await this.cartApp.getByTestId("place-order").dblclick();
  }

  async search(query: string) {
    await this.cartApp.getByTestId("search-input").fill(query);
    await this.cartApp.getByRole("button", { name: "Search" }).click();
  }

  async clickCalculateShipping() {
    await this.cartApp.getByTestId("calculate-shipping").click();
  }

  async expectBugFound(id: string) {
    const bug = getBugById(id);
    const item = this.bugItem(id);
    await expect(item).toHaveAttribute("data-found", "true");
    if (bug) {
      await expect(item).toContainText(bug.title);
    }
  }

  async expectBugNotFound(id: string) {
    await expect(this.bugItem(id)).toHaveAttribute("data-found", "false");
  }

  async expectProgress(count: number, total: number = bugHuntTotalBugs) {
    await expect(this.bugTracker.getByTestId("bug-progress")).toHaveText(
      `${count} / ${total} found`,
    );
  }

  async expectSearchErrorContains(text: string) {
    await expect(this.cartApp.getByTestId("search-error")).toContainText(text);
  }

  async expectShippingError() {
    await expect(this.cartApp.getByTestId("shipping-error")).toBeVisible();
  }

  async expectOrderConfirmations(count: number) {
    await expect(this.cartApp.getByTestId("order-confirmation")).toHaveCount(count);
  }

  async expectAccessibilityBugPresent() {
    await expect(this.cartApp.getByTestId("product-image-no-alt")).toBeVisible();
  }

  async expectCssBugBannerVisible() {
    await expect(this.cartApp.getByTestId("css-bug-banner")).toBeVisible();
  }

  async expectVisibleOnMobile() {
    await expect(this.cartApp).toBeVisible();
    await expect(this.bugTracker).toBeVisible();
    await expect(this.cartApp.getByTestId("place-order")).toBeVisible();
  }
}

import { expect, type Page } from "@playwright/test";

export class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path = "/") {
    await this.page.goto(path);
  }

  async expectTitle(title: string | RegExp) {
    await expect(this.page).toHaveTitle(title);
  }

  async expectUrl(path: string | RegExp) {
    await expect(this.page).toHaveURL(path);
  }
}

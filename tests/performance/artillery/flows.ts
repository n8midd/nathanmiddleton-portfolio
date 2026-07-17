/**
 * Playwright scenario functions for Artillery's Playwright engine.
 * Locators mirror tests/e2e page objects (data-testid first).
 */
import type { Page } from "playwright";

async function homeBrowse(page: Page) {
  await page.goto("/");
  await page.getByTestId("home-page").waitFor({ state: "visible" });
  await page.getByTestId("home-hero").waitFor({ state: "visible" });
}

async function playgroundLogin(page: Page) {
  await page.goto("/playground/login");
  await page.getByTestId("playground-demo").waitFor({ state: "visible" });
  await page.getByTestId("login-username").fill("demo");
  await page.getByTestId("login-password").fill("password123");
  await page.getByTestId("login-submit").click();
  await page.getByTestId("login-success").waitFor({ state: "visible" });
}

async function labPageLoad(page: Page) {
  await page.goto("/metrics");
  await page.getByTestId("metrics-page").waitFor({ state: "visible" });
  await page.getByTestId("metrics-dashboard").waitFor({ state: "visible" });
}

module.exports = {
  homeBrowse,
  playgroundLogin,
  labPageLoad,
};

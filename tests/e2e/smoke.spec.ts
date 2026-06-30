import { expect, test } from "@playwright/test";
import { features } from "../../lib/site-config";

test.describe("Quality Engineering Lab smoke tests", () => {
  test("home page loads with command center content", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Nathan Middleton" })).toBeVisible();
    await expect(page.getByText("Automation Coverage")).toBeVisible();
  });

  test("health API returns ok", async ({ request }) => {
    const response = await request.get("/api/health");
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body.status).toBe("ok");
    expect(body.service).toBe("quality-engineering-lab");
  });

  test("navigation routes resolve", async ({ page }) => {
    const routes = features.filter((feature) => feature.href !== "/");

    for (const feature of routes) {
      await page.goto(feature.href);
      await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
    }
  });

  test("sample article renders", async ({ page }) => {
    await page.goto("/articles/why-90-percent-automation-coverage-is-a-bad-goal");
    await expect(
      page.getByRole("heading", { name: "Why 90% Automation Coverage is a Bad Goal" }),
    ).toBeVisible();
  });
});

import { test as base } from "@playwright/test";
import { CommandCenterPage } from "../pages/command-center.page";
import { SiteShellPage } from "../pages/site-shell.page";

export const test = base.extend<{
  shell: SiteShellPage;
  commandCenter: CommandCenterPage;
}>({
  shell: async ({ page }, use) => {
    await use(new SiteShellPage(page));
  },
  commandCenter: async ({ page }, use) => {
    await use(new CommandCenterPage(page));
  },
});

export { expect } from "@playwright/test";

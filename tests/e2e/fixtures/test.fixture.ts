import { test as base } from "@playwright/test";
import { ArchitecturePage } from "../pages/architecture.page";
import { ArticlesPage } from "../pages/articles.page";
import { BugHuntPage } from "../pages/bug-hunt.page";
import { CommandCenterPage } from "../pages/command-center.page";
import { SiteShellPage } from "../pages/site-shell.page";

export const test = base.extend<{
  shell: SiteShellPage;
  commandCenter: CommandCenterPage;
  architecture: ArchitecturePage;
  bugHunt: BugHuntPage;
  articles: ArticlesPage;
}>({
  shell: async ({ page }, use) => {
    await use(new SiteShellPage(page));
  },
  commandCenter: async ({ page }, use) => {
    await use(new CommandCenterPage(page));
  },
  architecture: async ({ page }, use) => {
    await use(new ArchitecturePage(page));
  },
  bugHunt: async ({ page }, use) => {
    await use(new BugHuntPage(page));
  },
  articles: async ({ page }, use) => {
    await use(new ArticlesPage(page));
  },
});

export { expect } from "@playwright/test";

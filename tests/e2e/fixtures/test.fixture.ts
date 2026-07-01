import { test as base } from "@playwright/test";
import { ArchitecturePage } from "../pages/architecture.page";
import { ArticlesPage } from "../pages/articles.page";
import { BugHuntPage } from "../pages/bug-hunt.page";
import { CommandCenterPage } from "../pages/command-center.page";
import { FrameworkDemoPage } from "../pages/framework-demo.page";
import { InterviewPrepPage } from "../pages/interview-prep.page";
import { MetricsPage } from "../pages/metrics.page";
import { AiTestingPage } from "../pages/ai-testing.page";
import { PlaygroundPage } from "../pages/playground.page";
import { SiteShellPage } from "../pages/site-shell.page";

export const test = base.extend<{
  shell: SiteShellPage;
  commandCenter: CommandCenterPage;
  architecture: ArchitecturePage;
  bugHunt: BugHuntPage;
  articles: ArticlesPage;
  interviewPrep: InterviewPrepPage;
  frameworkDemo: FrameworkDemoPage;
  playground: PlaygroundPage;
  metrics: MetricsPage;
  aiTesting: AiTestingPage;
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
  interviewPrep: async ({ page }, use) => {
    await use(new InterviewPrepPage(page));
  },
  frameworkDemo: async ({ page }, use) => {
    await use(new FrameworkDemoPage(page));
  },
  playground: async ({ page }, use) => {
    await use(new PlaygroundPage(page));
  },
  metrics: async ({ page }, use) => {
    await use(new MetricsPage(page));
  },
  aiTesting: async ({ page }, use) => {
    await use(new AiTestingPage(page));
  },
});

export { expect } from "@playwright/test";

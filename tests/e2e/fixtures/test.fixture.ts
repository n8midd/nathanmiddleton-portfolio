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
import { PipelinePage } from "../pages/pipeline.page";
import { StackPage } from "../pages/stack.page";
import { LeadershipPage } from "../pages/leadership.page";
import { ContactPage } from "../pages/contact.page";
import { TestCaseBuilderPage } from "../pages/test-case-builder.page";
import { WhiteboardPage } from "../pages/whiteboard.page";
import { ExercisesPage } from "../pages/exercises.page";
import { ResumePage } from "../pages/resume.page";
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
  pipeline: PipelinePage;
  stack: StackPage;
  leadership: LeadershipPage;
  resume: ResumePage;
  contact: ContactPage;
  testCaseBuilder: TestCaseBuilderPage;
  whiteboard: WhiteboardPage;
  exercises: ExercisesPage;
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
  pipeline: async ({ page }, use) => {
    await use(new PipelinePage(page));
  },
  stack: async ({ page }, use) => {
    await use(new StackPage(page));
  },
  leadership: async ({ page }, use) => {
    await use(new LeadershipPage(page));
  },
  resume: async ({ page }, use) => {
    await use(new ResumePage(page));
  },
  contact: async ({ page }, use) => {
    await use(new ContactPage(page));
  },
  testCaseBuilder: async ({ page }, use) => {
    await use(new TestCaseBuilderPage(page));
  },
  whiteboard: async ({ page }, use) => {
    await use(new WhiteboardPage(page));
  },
  exercises: async ({ page }, use) => {
    await use(new ExercisesPage(page));
  },
});

export { expect } from "@playwright/test";

import { filterTopics, ragEvaluationCriteria } from "../../pages/ai-testing.page";
import { test } from "../../fixtures/test.fixture";

test.describe("@regression AI in Testing", () => {
  test.beforeEach(async ({ aiTesting }) => {
    await aiTesting.open();
  });

  test("loads with correct document title", async ({ aiTesting }) => {
    await aiTesting.expectPageTitle();
  });

  test("displays header with title and description", async ({ aiTesting }) => {
    await aiTesting.expectHeader();
  });

  test("has exactly one h1 on the page", async ({ aiTesting }) => {
    await aiTesting.expectSingleH1();
  });

  test("does not show Coming soon banner", async ({ aiTesting }) => {
    await aiTesting.expectNoComingSoon();
  });

  test("shows all categories including All tab", async ({ aiTesting }) => {
    await aiTesting.expectAllCategoriesVisible();
  });

  test("lists all topics from shared data when unfiltered", async ({ aiTesting }) => {
    await aiTesting.expectAllTopicsListed();
  });

  test("selecting Generation category filters the list", async ({ aiTesting }) => {
    await aiTesting.selectCategory("generation");
    await aiTesting.expectCategoryTopics("generation");
  });

  test("searching by keyword narrows results", async ({ aiTesting }) => {
    await aiTesting.search("RAG");
    await aiTesting.expectTopicCount(filterTopics("RAG", "all").length);
  });

  test("search with no matches shows empty state", async ({ aiTesting }) => {
    await aiTesting.search("zzznomatchzzz");
    await aiTesting.expectNoResults();
  });

  test("clicking a topic reveals detail content", async ({ aiTesting }) => {
    await aiTesting.clickTopic("llm-test-case-generation");
    await aiTesting.expectTopicDetail("llm-test-case-generation", "human review");
  });

  test("shows detail placeholder before a topic is selected", async ({ aiTesting }) => {
    await aiTesting.expectTopicPlaceholder();
  });

  test("example prompt visible on prompt engineering topic", async ({ aiTesting }) => {
    await aiTesting.clickTopic("role-context-constraints");
    await aiTesting.expectExamplePromptVisible();
  });

  test("prompt builder generates assembled prompt", async ({ aiTesting }) => {
    await aiTesting.clickTopic("llm-test-case-generation");
    await aiTesting.fillPromptField("featureDescription", "User login flow");
    await aiTesting.generatePrompt();
    await aiTesting.expectGeneratedPromptContains("User login flow");
  });

  test("RAG evaluation demo updates score", async ({ aiTesting }) => {
    await aiTesting.clickTopic("hallucination-checks");
    await aiTesting.passRagCriterion("relevance");
    await aiTesting.passRagCriterion("grounding");
    await aiTesting.expectRagScore(2, ragEvaluationCriteria.length);
  });

  test("sidebar highlights AI in Testing with no soon badge", async ({ shell }) => {
    await shell.expectSidebarLinkActive("AI in Testing");
    await shell.expectSidebarLinkHasSoonBadge("AI in Testing", false);
  });
});

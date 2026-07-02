import { expect, type Locator, type Page } from "@playwright/test";
import {
  defaultExerciseId,
  getExerciseByTitle,
  testingExercises,
} from "../../../lib/data/exercises";
import { getFeatureBySlug } from "../../../lib/site-config";
import { BasePage } from "./base.page";

const feature = getFeatureBySlug("exercises")!;

export class ExercisesPage extends BasePage {
  readonly root: Locator;
  readonly browser: Locator;
  readonly detailPanel: Locator;

  constructor(page: Page) {
    super(page);
    this.root = page.getByTestId("exercises-page");
    this.browser = page.getByTestId("exercise-browser");
    this.detailPanel = page.getByTestId("exercise-detail-panel");
  }

  exerciseCard(exerciseId: string): Locator {
    return this.browser.locator(
      `[data-testid="exercise-card"][data-exercise-id="${exerciseId}"]`,
    );
  }

  testArea(areaId: string): Locator {
    return this.page.locator(`[data-testid="test-area"][data-area-id="${areaId}"]`);
  }

  async open() {
    await this.goto("/exercises");
    await expect(this.root).toBeVisible();
  }

  async expectPageTitle() {
    await this.expectTitle(/What Would You Test\? \| Quality Engineering Lab/);
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

  async expectAllExercisesListed() {
    for (const exercise of testingExercises) {
      await expect(this.exerciseCard(exercise.id)).toBeVisible();
      await expect(this.exerciseCard(exercise.id)).toContainText(exercise.title);
    }
  }

  async expectExerciseSelected(exerciseId: string) {
    await expect(this.exerciseCard(exerciseId)).toHaveAttribute("aria-pressed", "true");
  }

  async clickExercise(title: string) {
    const exercise = getExerciseByTitle(title);
    if (!exercise) {
      throw new Error(`Unknown exercise title: ${title}`);
    }
    await this.exerciseCard(exercise.id).click();
  }

  async expectScenarioVisible(scenarioType: string) {
    await expect(this.page.getByTestId("exercise-scenario")).toBeVisible();
    await expect(this.page.getByTestId("exercise-scenario")).toHaveAttribute(
      "data-scenario-type",
      scenarioType,
    );
  }

  async expectPromptVisible() {
    await expect(this.page.getByTestId("exercise-prompt")).toBeVisible();
    await expect(this.page.getByTestId("exercise-prompt")).toContainText("What would you test?");
  }

  async expectAnswerHidden() {
    await expect(this.page.getByTestId("exercise-answer-panel")).toHaveCount(0);
    await expect(this.page.getByTestId("answer-placeholder")).toBeVisible();
  }

  async revealAnswer() {
    await this.page.getByTestId("reveal-answer-button").click();
  }

  async expectAnswerVisible() {
    await expect(this.page.getByTestId("exercise-answer-panel")).toBeVisible();
  }

  async expectAnswerContains(text: string) {
    await expect(this.page.getByTestId("exercise-answer-panel")).toContainText(text);
  }

  async expectTestAreaVisible(areaId: string) {
    await expect(this.testArea(areaId)).toBeVisible();
  }

  async expectVisibleOnMobile() {
    await expect(this.browser).toBeVisible();
    await expect(this.page.getByTestId("exercise-prompt")).toBeVisible();
  }
}

export { testingExercises, defaultExerciseId };

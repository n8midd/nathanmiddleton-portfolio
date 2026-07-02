import { describe, expect, it } from "vitest";
import {
  defaultExerciseId,
  getExerciseById,
  getExerciseByTitle,
  testingExercises,
} from "@/lib/data/exercises";

describe("exercises data", () => {
  it("defines four testing exercises", () => {
    expect(testingExercises).toHaveLength(4);
  });

  it("defaults to the login page exercise", () => {
    expect(defaultExerciseId).toBe("login-page");
    expect(getExerciseById(defaultExerciseId)?.title).toBe("Login Page");
  });

  it("gives each exercise revealed answer areas with items", () => {
    for (const exercise of testingExercises) {
      expect(exercise.revealedAnswer.length).toBeGreaterThanOrEqual(3);
      for (const area of exercise.revealedAnswer) {
        expect(area.items.length).toBeGreaterThan(0);
      }
    }
  });

  it("looks up exercises by id and title", () => {
    expect(getExerciseByTitle("Checkout & Payment")?.id).toBe("checkout-payment");
    expect(getExerciseById("product-search")?.scenarioType).toBe("search");
    expect(getExerciseById("missing")).toBeUndefined();
  });
});

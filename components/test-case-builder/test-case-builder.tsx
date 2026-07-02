"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  formatTestCasesForCopy,
  generateTestCases,
  testCaseCategories,
  type TestCaseCategoryId,
} from "@/lib/data/test-case-builder";

export function TestCaseBuilder() {
  const [featureDescription, setFeatureDescription] = useState("");
  const [generatedCases, setGeneratedCases] = useState<Record<
    TestCaseCategoryId,
    string[]
  > | null>(null);
  const [validationMessage, setValidationMessage] = useState("");

  const handleGenerate = () => {
    const trimmed = featureDescription.trim();

    if (!trimmed) {
      setValidationMessage("Enter a feature or page to generate test cases.");
      setGeneratedCases(null);
      return;
    }

    setValidationMessage("");
    setGeneratedCases(generateTestCases(trimmed));
  };

  const handleCopy = async () => {
    if (!generatedCases) return;
    await navigator.clipboard.writeText(
      formatTestCasesForCopy(featureDescription, generatedCases),
    );
  };

  return (
    <div className="space-y-6" data-testid="test-case-builder">
      <section className="space-y-4 rounded-lg border border-border/60 bg-muted/20 p-4">
        <div className="space-y-1">
          <label htmlFor="feature-input" className="text-sm font-medium">
            Feature or page
          </label>
          <input
            id="feature-input"
            type="text"
            value={featureDescription}
            onChange={(event) => setFeatureDescription(event.target.value)}
            placeholder="Login Page"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            data-testid="feature-input"
          />
          <p className="text-xs text-muted-foreground">
            Describe what you are testing — e.g. checkout flow, password reset, or API endpoint.
          </p>
        </div>

        <Button type="button" onClick={handleGenerate} data-testid="generate-test-cases-button">
          Generate test cases
        </Button>

        {validationMessage ? (
          <p className="text-sm text-destructive" data-testid="feature-input-error" role="alert">
            {validationMessage}
          </p>
        ) : null}
      </section>

      {generatedCases ? (
        <div className="space-y-4" data-testid="test-case-results">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-muted-foreground">
              Generated for{" "}
              <span className="font-medium text-foreground">{featureDescription.trim()}</span>
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopy}
              data-testid="copy-test-cases-button"
            >
              Copy all
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {testCaseCategories.map((category) => (
              <section
                key={category.id}
                className="space-y-3 rounded-lg border border-border/60 bg-card/40 p-4"
                data-testid="test-case-category"
                data-category-id={category.id}
              >
                <div className="space-y-1">
                  <h2 className="text-sm font-semibold">{category.label}</h2>
                  <p className="text-xs text-muted-foreground">{category.description}</p>
                </div>
                <ol
                  className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground"
                  data-testid="test-case-list"
                  data-category-id={category.id}
                >
                  {generatedCases[category.id].map((testCase, index) => (
                    <li
                      key={`${category.id}-${index}`}
                      data-testid="test-case-item"
                      data-category-id={category.id}
                      data-case-index={index}
                    >
                      {testCase}
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

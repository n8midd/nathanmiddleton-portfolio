export type TestCaseCategoryId =
  | "positive"
  | "negative"
  | "boundary"
  | "security"
  | "accessibility"
  | "performance";

export interface TestCaseCategory {
  id: TestCaseCategoryId;
  label: string;
  description: string;
}

export const testCaseCategories: TestCaseCategory[] = [
  {
    id: "positive",
    label: "Positive Tests",
    description: "Happy-path scenarios that confirm expected behavior.",
  },
  {
    id: "negative",
    label: "Negative Tests",
    description: "Invalid inputs and error handling paths.",
  },
  {
    id: "boundary",
    label: "Boundary Tests",
    description: "Edge values at limits and just beyond them.",
  },
  {
    id: "security",
    label: "Security Tests",
    description: "Injection, auth bypass, and abuse scenarios.",
  },
  {
    id: "accessibility",
    label: "Accessibility Tests",
    description: "Keyboard, screen reader, and WCAG compliance checks.",
  },
  {
    id: "performance",
    label: "Performance Tests",
    description: "Latency, throughput, and resource usage under load.",
  },
];

const categoryTemplates: Record<TestCaseCategoryId, string[]> = {
  positive: [
    "Verify {{feature}} completes the primary user flow with valid inputs and expected outcomes.",
    "Confirm successful state transitions and user feedback after a valid {{feature}} interaction.",
    "Validate that persisted data reflects the correct values after {{feature}} succeeds.",
    "Ensure authorized users can access {{feature}} without unnecessary friction.",
    "Verify {{feature}} integrates correctly with downstream services on the happy path.",
  ],
  negative: [
    "Reject {{feature}} when required fields are empty and show a clear validation message.",
    "Reject {{feature}} when input format is invalid (e.g., malformed email or phone).",
    "Prevent {{feature}} from proceeding when the user lacks required permissions.",
    "Handle duplicate or conflicting submissions for {{feature}} without corrupting data.",
    "Display a recoverable error when {{feature}} fails due to a downstream service outage.",
  ],
  boundary: [
    "Accept {{feature}} input at the minimum allowed length and reject one character below.",
    "Accept {{feature}} input at the maximum allowed length and reject one character above.",
    "Verify {{feature}} behavior at numeric limits (zero, one, max int, and max + 1).",
    "Confirm {{feature}} handles empty collections and single-item collections correctly.",
    "Validate date and time boundaries for {{feature}} (start of day, end of day, leap year).",
  ],
  security: [
    "Block SQL injection payloads in {{feature}} input fields and log the attempt.",
    "Sanitize and escape XSS payloads rendered by {{feature}} output.",
    "Enforce authentication and authorization before {{feature}} mutates sensitive data.",
    "Rate-limit repeated {{feature}} requests to mitigate brute-force or abuse.",
    "Verify {{feature}} does not expose secrets, tokens, or PII in responses or logs.",
  ],
  accessibility: [
    "Navigate {{feature}} entirely by keyboard with visible focus indicators.",
    "Ensure form controls in {{feature}} have associated labels and accessible names.",
    "Verify error messages for {{feature}} are announced to screen readers.",
    "Confirm {{feature}} meets color contrast requirements for text and interactive elements.",
    "Validate {{feature}} layout and functionality at 200% browser zoom.",
  ],
  performance: [
    "Measure {{feature}} response time under normal load and assert it meets the SLA.",
    "Verify {{feature}} remains responsive when handling concurrent user sessions.",
    "Monitor memory and CPU during sustained {{feature}} usage without leaks.",
    "Confirm {{feature}} degrades gracefully under spike traffic rather than failing outright.",
    "Validate {{feature}} cache and database query patterns stay within budget at scale.",
  ],
};

function applyFeaturePlaceholder(template: string, feature: string): string {
  return template.replaceAll("{{feature}}", feature);
}

export function generateTestCases(
  featureDescription: string,
): Record<TestCaseCategoryId, string[]> {
  const feature = featureDescription.trim() || "the feature";

  return testCaseCategories.reduce(
    (acc, category) => {
      acc[category.id] = categoryTemplates[category.id].map((template) =>
        applyFeaturePlaceholder(template, feature),
      );
      return acc;
    },
    {} as Record<TestCaseCategoryId, string[]>,
  );
}

export function formatTestCasesForCopy(
  featureDescription: string,
  cases: Record<TestCaseCategoryId, string[]>,
): string {
  const feature = featureDescription.trim() || "the feature";
  const sections = testCaseCategories.map((category) => {
    const items = cases[category.id]
      .map((testCase, index) => `${index + 1}. ${testCase}`)
      .join("\n");
    return `${category.label}\n${items}`;
  });

  return `Test cases for: ${feature}\n\n${sections.join("\n\n")}`;
}

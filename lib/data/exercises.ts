export type ExerciseScenarioType = "login" | "checkout" | "search" | "file-upload";

export interface TestArea {
  id: string;
  label: string;
  items: string[];
}

export interface TestingExercise {
  id: string;
  title: string;
  summary: string;
  scenarioType: ExerciseScenarioType;
  context: string;
  promptHints: string[];
  revealedAnswer: TestArea[];
}

export const exercisesIntro =
  "Study each scenario, jot down what you would test, then reveal a senior QA perspective. Treat it like a whiteboard exercise — breadth and risk thinking matter more than memorizing a checklist.";

export const defaultExerciseId = "login-page";

export const testingExercises: TestingExercise[] = [
  {
    id: "login-page",
    title: "Login Page",
    summary: "Standard username/password authentication with remember-me and forgot-password link.",
    scenarioType: "login",
    context:
      "A B2C web app login page accepts email and password, offers Remember me, links to password reset, and redirects to a dashboard on success.",
    promptHints: [
      "Login",
      "Password Reset",
      "Rate Limiting",
      "Session Timeout",
      "Cookies",
      "Accessibility",
      "Localization",
      "Security",
      "Performance",
    ],
    revealedAnswer: [
      {
        id: "login",
        label: "Login",
        items: [
          "Valid credentials redirect to the intended post-login URL",
          "Invalid password shows a generic error without confirming which field failed",
          "Empty fields block submission with inline validation messages",
          "Account lockout after repeated failed attempts with a clear recovery path",
        ],
      },
      {
        id: "password-reset",
        label: "Password Reset",
        items: [
          "Forgot password link routes to reset flow without leaking whether the email exists",
          "Reset email arrives within SLA and link expires after the documented window",
          "Used reset tokens cannot be replayed to change the password again",
        ],
      },
      {
        id: "rate-limiting",
        label: "Rate Limiting",
        items: [
          "Brute-force login attempts are throttled per IP and per account",
          "Rate-limit responses return 429 or equivalent without exposing stack traces",
          "Legitimate users can recover after cooldown without contacting support",
        ],
      },
      {
        id: "session-timeout",
        label: "Session Timeout",
        items: [
          "Idle sessions expire per policy and require re-authentication",
          "Remember me extends session within documented bounds only",
          "Concurrent sessions behave consistently across tabs and devices",
        ],
      },
      {
        id: "cookies",
        label: "Cookies",
        items: [
          "Session cookies are HttpOnly, Secure, and SameSite-appropriate",
          "Logout clears auth cookies and invalidates server-side session",
          "Cookie consent banner does not block essential auth cookies",
        ],
      },
      {
        id: "accessibility",
        label: "Accessibility",
        items: [
          "Form fields have associated labels and errors are announced to screen readers",
          "Full keyboard navigation with visible focus indicators",
          "Error states meet color contrast requirements without relying on color alone",
        ],
      },
      {
        id: "localization",
        label: "Localization",
        items: [
          "Validation messages render correctly for supported locales",
          "RTL layouts do not break field alignment or error placement",
          "Date and number formats in session metadata respect user locale",
        ],
      },
      {
        id: "security",
        label: "Security",
        items: [
          "SQL injection and XSS payloads in login fields are rejected and logged",
          "Credentials are never echoed in URLs, logs, or client-side storage",
          "CSRF protection on login POST when using cookie-based sessions",
        ],
      },
      {
        id: "performance",
        label: "Performance",
        items: [
          "Login completes within SLA under normal load",
          "Auth service degrades gracefully when identity provider is slow",
          "Client bundle does not block first input on low-end mobile devices",
        ],
      },
    ],
  },
  {
    id: "checkout-payment",
    title: "Checkout & Payment",
    summary: "Cart review, shipping selection, and card payment before order confirmation.",
    scenarioType: "checkout",
    context:
      "Shoppers review cart items, enter shipping and payment details, apply promo codes, and place an order that charges a payment gateway.",
    promptHints: ["Cart", "Payment", "Tax", "Inventory", "Security", "Accessibility", "E2E"],
    revealedAnswer: [
      {
        id: "cart",
        label: "Cart & Pricing",
        items: [
          "Line items, quantities, and subtotals match catalog prices at checkout time",
          "Promo codes apply correct discounts and reject expired or ineligible codes",
          "Out-of-stock items are blocked or back-ordered with clear messaging",
        ],
      },
      {
        id: "payment",
        label: "Payment",
        items: [
          "Valid test cards authorize; declined cards show actionable errors",
          "Billing address validation rejects malformed postal codes",
          "Partial captures and refunds reconcile with order totals",
        ],
      },
      {
        id: "pci",
        label: "PCI & Security",
        items: [
          "Card data never touches application logs or non-PCI storage",
          "3DS or SCA flows complete without duplicate charges on retry",
          "Tampering with cart totals server-side is rejected",
        ],
      },
      {
        id: "inventory",
        label: "Inventory",
        items: [
          "Stock is reserved during checkout and released on timeout or abandon",
          "Concurrent checkout on last unit allows only one successful order",
          "Inventory rollback occurs when payment succeeds but fulfillment fails",
        ],
      },
      {
        id: "e2e",
        label: "End-to-End",
        items: [
          "Happy path from cart through confirmation email and order history",
          "Guest checkout vs registered user flows both complete successfully",
          "Order confirmation page shows correct tax, shipping, and payment last four",
        ],
      },
    ],
  },
  {
    id: "password-reset",
    title: "Password Reset Flow",
    summary: "Email-based reset link with token validation and new password entry.",
    scenarioType: "login",
    context:
      "Users request a password reset by email, receive a time-limited link, set a new password, and are prompted to log in again.",
    promptHints: ["Security", "Email", "Token", "Enumeration", "Accessibility"],
    revealedAnswer: [
      {
        id: "request",
        label: "Reset Request",
        items: [
          "Same success message for existing and non-existing emails to prevent enumeration",
          "Request rate limiting prevents email flooding attacks",
          "Input validation rejects malformed email addresses",
        ],
      },
      {
        id: "token",
        label: "Token Handling",
        items: [
          "Reset links expire after the documented TTL",
          "Tokens are single-use and invalidated after successful reset",
          "Tampered or expired tokens show a safe error with re-request option",
        ],
      },
      {
        id: "new-password",
        label: "New Password",
        items: [
          "Password policy enforced (length, complexity, breach list if applicable)",
          "New password cannot match recent password history",
          "Confirmation field must match new password",
        ],
      },
      {
        id: "security",
        label: "Security",
        items: [
          "Active sessions invalidated after password change",
          "Reset flow over HTTPS only; tokens not logged in plain text",
          "Open redirect vulnerabilities absent from post-reset redirects",
        ],
      },
      {
        id: "accessibility",
        label: "Accessibility",
        items: [
          "Reset form is keyboard navigable with clear error announcements",
          "Password visibility toggle has accessible name and state",
          "Success and error states are perceivable without color alone",
        ],
      },
    ],
  },
  {
    id: "product-search",
    title: "Product Search & Filters",
    summary: "Keyword search with category, price, and availability facets.",
    scenarioType: "search",
    context:
      "Shoppers search a product catalog, apply facet filters, sort results, and paginate through matches on desktop and mobile.",
    promptHints: ["Search", "Filters", "Pagination", "Performance", "Localization", "Empty States"],
    revealedAnswer: [
      {
        id: "search",
        label: "Search",
        items: [
          "Keyword search returns relevant results for exact, partial, and typo-tolerant queries",
          "Special characters and SQL-like input do not break search or expose data",
          "Zero-result queries show helpful suggestions without errors",
        ],
      },
      {
        id: "filters",
        label: "Filters & Sort",
        items: [
          "Facet counts update when other filters are applied",
          "Clear-all resets filters and restores default sort",
          "Sort by price, rating, and newest behaves consistently across pages",
        ],
      },
      {
        id: "pagination",
        label: "Pagination",
        items: [
          "Page navigation preserves active filters and sort order",
          "Deep links to page N restore the same result set",
          "Last page handles partial result sets without duplicates",
        ],
      },
      {
        id: "performance",
        label: "Performance",
        items: [
          "Search responds within SLA for common queries under load",
          "Debounced input avoids excessive API calls while typing",
          "Large facet combinations do not cause timeout or memory spikes",
        ],
      },
      {
        id: "localization",
        label: "Localization & Empty States",
        items: [
          "Currency and unit formatting correct per locale in result cards",
          "Empty filter combinations show guidance instead of a blank page",
          "Mobile filter drawer is usable with touch targets and focus management",
        ],
      },
    ],
  },
];

export function getExerciseById(id: string): TestingExercise | undefined {
  return testingExercises.find((exercise) => exercise.id === id);
}

export function getExerciseByTitle(title: string): TestingExercise | undefined {
  return testingExercises.find((exercise) => exercise.title === title);
}

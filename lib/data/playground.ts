export interface PlaygroundDemo {
  slug: string;
  label: string;
  description: string;
  automationTip: string;
}

export const loginCredentials = {
  username: "demo",
  password: "password123",
} as const;

export const infiniteScrollBatchSize = 10;
export const infiniteScrollInitialCount = 10;

export const tableRows = [
  { id: "1", name: "Alice Chen", role: "SDET", status: "Active" },
  { id: "2", name: "Bob Martinez", role: "QA Lead", status: "Active" },
  { id: "3", name: "Carol Nguyen", role: "Developer", status: "Inactive" },
  { id: "4", name: "David Kim", role: "SDET", status: "Active" },
  { id: "5", name: "Eva Patel", role: "QA Analyst", status: "Active" },
] as const;

export const dropdownOptions = [
  { value: "playwright", label: "Playwright" },
  { value: "cypress", label: "Cypress" },
  { value: "selenium", label: "Selenium" },
  { value: "webdriverio", label: "WebdriverIO" },
] as const;

export const playgroundItemsApiPath = "/api/playground/items";

export const playgroundDemos: PlaygroundDemo[] = [
  {
    slug: "login",
    label: "Login",
    description: "Authentication forms and validation.",
    automationTip:
      "Use role-based locators (getByLabel, getByRole) for form fields. Assert both inline validation and post-submit success states.",
  },
  {
    slug: "forms",
    label: "Forms",
    description: "Input types, validation, and submission.",
    automationTip:
      "Cover each input type separately. Test required-field validation before happy-path submission.",
  },
  {
    slug: "dropdowns",
    label: "Dropdowns",
    description: "Select menus and combobox patterns.",
    automationTip:
      "Native selects use selectOption; custom comboboxes need click-to-open then option click. Never assume one strategy fits all.",
  },
  {
    slug: "alerts",
    label: "Alerts",
    description: "Dialogs, toasts, and confirmations.",
    automationTip:
      "Toasts appear asynchronously—use expect with timeout. Confirm dialogs block interaction until dismissed.",
  },
  {
    slug: "shadow-dom",
    label: "Shadow DOM",
    description: "Encapsulated web components.",
    automationTip:
      "Standard CSS selectors cannot pierce shadow roots. Use Playwright's pierce selector, shadow-piercing locators, or expose test hooks.",
  },
  {
    slug: "infinite-scroll",
    label: "Infinite Scroll",
    description: "Lazy-loaded content lists.",
    automationTip:
      "Scroll the container and wait for new items to appear. Avoid fixed sleeps—assert on item count or last-item visibility.",
  },
  {
    slug: "tables",
    label: "Tables",
    description: "Sortable, filterable data grids.",
    automationTip:
      "After sort or filter, re-query rows rather than caching locators. Assert order changes, not just that a click occurred.",
  },
  {
    slug: "modals",
    label: "Modals",
    description: "Overlay dialogs and focus traps.",
    automationTip:
      "Verify modal open/close, focus trap behavior, and that background content is inert while the dialog is open.",
  },
  {
    slug: "uploads",
    label: "Uploads",
    description: "File input and drag-and-drop.",
    automationTip:
      "Use setInputFiles for file inputs. Assert filename display or upload confirmation after selection.",
  },
  {
    slug: "downloads",
    label: "Downloads",
    description: "File download triggers.",
    automationTip:
      "Use page.waitForEvent('download') before clicking the trigger. Verify filename and optionally file contents.",
  },
  {
    slug: "drag-and-drop",
    label: "Drag & Drop",
    description: "Reorderable lists and drop zones.",
    automationTip:
      "Use dragTo or manual mouse events. Assert the new order in the DOM, not just that the drag gesture completed.",
  },
  {
    slug: "iframes",
    label: "iFrames",
    description: "Embedded content and cross-frame access.",
    automationTip:
      "Switch context with frameLocator before interacting. Same-origin iframes are simpler; cross-origin needs different strategies.",
  },
  {
    slug: "api-calls",
    label: "API Calls",
    description: "Async data fetching patterns.",
    automationTip:
      "Wait for loading state to finish, then assert on rendered data. Consider intercepting network requests for deterministic tests.",
  },
  {
    slug: "dynamic-ids",
    label: "Dynamic IDs",
    description: "Unstable selectors and strategies.",
    automationTip:
      "Avoid id-based selectors when IDs are generated per render. Prefer data-testid, roles, labels, or text content.",
  },
];

export function getDemoBySlug(slug: string): PlaygroundDemo | undefined {
  return playgroundDemos.find((demo) => demo.slug === slug);
}

export function getAllDemoSlugs(): string[] {
  return playgroundDemos.map((demo) => demo.slug);
}

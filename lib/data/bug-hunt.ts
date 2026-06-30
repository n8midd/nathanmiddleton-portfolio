export interface DemoProduct {
  id: string;
  name: string;
  price: number;
}

export interface HiddenBug {
  id: string;
  title: string;
  category: string;
  hint: string;
  description: string;
}

export const demoProducts: DemoProduct[] = [
  { id: "headphones", name: "Wireless Headphones", price: 79.99 },
  { id: "keyboard", name: "Mechanical Keyboard", price: 129.99 },
  { id: "mouse", name: "Ergonomic Mouse", price: 49.99 },
];

export const hiddenBugs: HiddenBug[] = [
  {
    id: "validation",
    title: "Broken Validation",
    category: "Validation",
    hint: "Checkout accepts invalid input that should be rejected.",
    description:
      "The checkout form does not enforce required email or minimum quantity. Orders succeed with empty email or quantity set to zero.",
  },
  {
    id: "race",
    title: "Race Condition",
    category: "Concurrency",
    hint: "Rapid repeated actions may produce duplicate results.",
    description:
      "Double-clicking Place Order submits twice because there is no debounce or loading lock on the checkout button.",
  },
  {
    id: "sql-injection",
    title: "SQL Injection",
    category: "Security",
    hint: "Search may reflect unsanitized user input in error messages.",
    description:
      "The search handler concatenates input directly into a fake SQL error string without escaping special characters.",
  },
  {
    id: "accessibility",
    title: "Accessibility",
    category: "A11y",
    hint: "One product image is missing alternative text.",
    description:
      "The first product card renders an image without an alt attribute, failing basic screen reader accessibility.",
  },
  {
    id: "css",
    title: "CSS Layout",
    category: "UI",
    hint: "A promo banner may overlap other cart content.",
    description:
      "The flash-sale banner uses absolute positioning and overlaps the cart total, making the summary hard to read.",
  },
  {
    id: "api",
    title: "API Error",
    category: "Integration",
    hint: "Shipping calculation may fail without graceful recovery.",
    description:
      "The Calculate Shipping button calls an API that returns HTTP 500 with no retry or fallback UI state.",
  },
];

export const sqlInjectionPayload = "' OR 1=1 --";

export const shippingApiPath = "/api/bug-hunt/shipping";

export const shippingErrorMessage = "Shipping service unavailable";

export function getBugById(id: string): HiddenBug | undefined {
  return hiddenBugs.find((bug) => bug.id === id);
}

export const bugHuntTotalBugs = hiddenBugs.length;

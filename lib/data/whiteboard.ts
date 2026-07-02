export type TestStrategyLayerId =
  | "unit-tests"
  | "mocks"
  | "contract-tests"
  | "component-tests"
  | "e2e-tests";

export interface TestStrategyLayer {
  id: TestStrategyLayerId;
  label: string;
  items: string[];
}

export interface Microservice {
  id: string;
  label: string;
  summary: string;
  role: string;
  testStrategy: TestStrategyLayer[];
}

export const whiteboardIntro =
  "Click a microservice in the e-commerce topology to see how you would test it across unit, mock, contract, component, and end-to-end layers. This mirrors a system-design whiteboard exercise focused on quality strategy, not just boxes and arrows.";

export const defaultMicroserviceId = "orders";

export const testStrategyLayerIds: TestStrategyLayerId[] = [
  "unit-tests",
  "mocks",
  "contract-tests",
  "component-tests",
  "e2e-tests",
];

const layerLabels: Record<TestStrategyLayerId, string> = {
  "unit-tests": "Unit Tests",
  mocks: "Mocks",
  "contract-tests": "Contract Tests",
  "component-tests": "Component Tests",
  "e2e-tests": "End-to-End Tests",
};

function buildStrategy(
  layers: Record<TestStrategyLayerId, string[]>,
): TestStrategyLayer[] {
  return testStrategyLayerIds.map((id) => ({
    id,
    label: layerLabels[id],
    items: layers[id],
  }));
}

export const microservices: Microservice[] = [
  {
    id: "users",
    label: "Users",
    summary: "Authentication, profiles, and session management for shoppers and admins.",
    role: "Identity & access",
    testStrategy: buildStrategy({
      "unit-tests": [
        "Password hashing and validation rules reject weak credentials",
        "Session TTL and refresh token rotation logic",
        "Role-based permission checks for admin vs shopper routes",
      ],
      mocks: [
        "Stub OAuth provider responses for Google and Apple sign-in flows",
        "Mock email verification service to avoid sending real messages",
        "Simulate identity provider outage for graceful degradation tests",
      ],
      "contract-tests": [
        "Verify Users API login response schema consumed by Orders service",
        "Assert JWT claims format expected by API gateway middleware",
        "Validate profile update events published to the message bus",
      ],
      "component-tests": [
        "Spin up Users service with in-memory DB and exercise register → login → logout",
        "Test rate limiting on failed login attempts with real HTTP handlers",
        "Verify audit log entries written on password change and MFA enrollment",
      ],
      "e2e-tests": [
        "Shopper registers, verifies email, and lands on account dashboard",
        "Login form keyboard navigation and screen reader error announcements",
        "Session timeout redirects to login without exposing cached PII",
      ],
    }),
  },
  {
    id: "orders",
    label: "Orders",
    summary: "Order lifecycle from cart checkout through fulfillment coordination.",
    role: "Core domain",
    testStrategy: buildStrategy({
      "unit-tests": [
        "Order state machine transitions (pending → paid → shipped → delivered)",
        "Idempotency key handling prevents duplicate orders on retry",
        "Line-item total, tax, and discount calculation edge cases",
      ],
      mocks: [
        "Stub Inventory reservation responses for in-stock and out-of-stock paths",
        "Mock Payments authorization success, decline, and timeout scenarios",
        "Simulate Shipping quote API latency for async order confirmation",
      ],
      "contract-tests": [
        "Orders → Inventory: reserve stock request and rollback payload shapes",
        "Orders → Payments: charge request includes orderId and amount in cents",
        "Orders → Notifications: order-confirmed event schema and required fields",
      ],
      "component-tests": [
        "Create order with test DB, message queue, and stubbed downstream HTTP clients",
        "Verify saga compensation when payment succeeds but inventory reservation fails",
        "Assert order history query returns correct pagination and sort order",
      ],
      "e2e-tests": [
        "Shopper completes checkout and sees order confirmation with tracking link",
        "Cancel order before shipment restores inventory and triggers refund",
        "Concurrent checkout attempts on last item show only one success",
      ],
    }),
  },
  {
    id: "inventory",
    label: "Inventory",
    summary: "Stock levels, reservations, and warehouse allocation.",
    role: "Fulfillment support",
    testStrategy: buildStrategy({
      "unit-tests": [
        "Stock reservation decrements available quantity atomically",
        "Reservation expiry releases held stock after timeout",
        "Multi-warehouse allocation picks nearest location with sufficient stock",
      ],
      mocks: [
        "Stub warehouse management system sync responses",
        "Mock low-stock alert publisher for threshold breach scenarios",
        "Simulate race conditions with controllable lock delays in tests",
      ],
      "contract-tests": [
        "Inventory → Orders: reservation confirmation and release event schemas",
        "Verify GET /availability response matches catalog service expectations",
        "Assert bulk restock webhook payload from supplier integration",
      ],
      "component-tests": [
        "Reserve and release stock through REST API with real database transactions",
        "Test optimistic locking when two orders compete for the last unit",
        "Verify dead-letter handling when reservation callback to Orders fails",
      ],
      "e2e-tests": [
        "Product shows in-stock on PDP, becomes unavailable after last purchase",
        "Back-in-stock notification triggers after warehouse restock event",
        "Admin adjusts inventory and change reflects in shopper search results",
      ],
    }),
  },
  {
    id: "payments",
    label: "Payments",
    summary: "Payment authorization, capture, refunds, and PCI-scoped card handling.",
    role: "Financial transactions",
    testStrategy: buildStrategy({
      "unit-tests": [
        "Amount validation rejects negative values and currency mismatches",
        "Refund logic caps at original capture amount and handles partial refunds",
        "Idempotent charge requests return same transaction ID on duplicate keys",
      ],
      mocks: [
        "Mock payment gateway with configurable approve, decline, and fraud flags",
        "Stub PCI tokenization service — never use real card numbers in tests",
        "Simulate gateway timeout and retry with exponential backoff",
      ],
      "contract-tests": [
        "Payments → Orders: payment-succeeded and payment-failed event schemas",
        "Verify charge API request matches gateway SDK contract documentation",
        "Assert webhook signature validation for gateway callback payloads",
      ],
      "component-tests": [
        "Process charge and refund through service with mocked gateway HTTP client",
        "Test 3DS redirect flow handling without hitting production endpoints",
        "Verify transaction ledger entries match authorization and capture records",
      ],
      "e2e-tests": [
        "Checkout with test card completes and order status updates to paid",
        "Declined card shows user-friendly error without leaking gateway codes",
        "Refund after return updates order total and sends receipt notification",
      ],
    }),
  },
  {
    id: "shipping",
    label: "Shipping",
    summary: "Carrier rate quotes, label generation, and shipment tracking.",
    role: "Logistics",
    testStrategy: buildStrategy({
      "unit-tests": [
        "Shipping rate calculation by weight, zone, and service level",
        "Tracking status mapping from carrier codes to customer-facing labels",
        "Address validation rejects undeliverable or PO box restrictions",
      ],
      mocks: [
        "Stub carrier API for rate quotes and label PDF generation",
        "Mock geocoding service for address normalization edge cases",
        "Simulate carrier webhook delays for async tracking update tests",
      ],
      "contract-tests": [
        "Shipping → Orders: shipment-created event includes tracking number",
        "Verify label request payload matches carrier integration spec",
        "Assert tracking webhook schema consumed by Notifications service",
      ],
      "component-tests": [
        "Create shipment with test DB and mocked carrier HTTP endpoints",
        "Process inbound tracking webhook and update shipment status",
        "Verify retry queue when carrier API returns 503 during label creation",
      ],
      "e2e-tests": [
        "Order confirmation displays estimated delivery date from rate quote",
        "Tracking page updates when carrier webhook delivers in-transit status",
        "International shipment shows customs hold message when applicable",
      ],
    }),
  },
  {
    id: "catalog",
    label: "Catalog",
    summary: "Product listings, search, pricing, and merchandising data.",
    role: "Product discovery",
    testStrategy: buildStrategy({
      "unit-tests": [
        "Search ranking weights and facet filter logic",
        "Price display rules for sales, bundles, and regional pricing",
        "Product visibility rules hide discontinued SKUs from browse",
      ],
      mocks: [
        "Stub search index responses for pagination and zero-result queries",
        "Mock pricing service for dynamic promo and member discount scenarios",
        "Simulate CDN cache headers for product image URL generation",
      ],
      "contract-tests": [
        "Catalog → Inventory: availability badge reflects real-time stock API",
        "Verify product detail JSON schema consumed by mobile and web clients",
        "Assert search indexing event schema published on product update",
      ],
      "component-tests": [
        "Query product search with test index and verify facet counts",
        "Test cache invalidation when product price changes via admin API",
        "Verify related-products recommendation endpoint with seeded catalog data",
      ],
      "e2e-tests": [
        "Shopper searches, filters by category, and opens product detail page",
        "Sale price and strikethrough MSRP display correctly on listing cards",
        "Out-of-stock product shows notify-me option instead of add-to-cart",
      ],
    }),
  },
  {
    id: "notifications",
    label: "Notifications",
    summary: "Email, SMS, and push delivery for order and account events.",
    role: "Customer communications",
    testStrategy: buildStrategy({
      "unit-tests": [
        "Template rendering injects order details without HTML injection",
        "Retry policy schedules exponential backoff for transient failures",
        "Preference checks suppress marketing messages when opted out",
      ],
      mocks: [
        "Stub SendGrid/Twilio APIs and capture outbound payloads in tests",
        "Mock user preference store for channel opt-in and opt-out scenarios",
        "Simulate provider rate limits to verify queue backpressure handling",
      ],
      "contract-tests": [
        "Notifications → Orders: order-confirmed event triggers correct template ID",
        "Verify SMS payload length and encoding for international numbers",
        "Assert dead-letter queue schema for permanently failed deliveries",
      ],
      "component-tests": [
        "Consume order event from test queue and assert email sent via mock provider",
        "Test idempotent delivery when same event is replayed from the bus",
        "Verify DLQ routing after max retries with alert to operations channel",
      ],
      "e2e-tests": [
        "Shopper receives order confirmation email within SLA after checkout",
        "Unsubscribe link in marketing email updates preferences and stops sends",
        "Push notification deep link opens correct order detail in mobile app",
      ],
    }),
  },
];

export function getMicroserviceById(id: string): Microservice | undefined {
  return microservices.find((service) => service.id === id);
}

export function getMicroserviceByLabel(label: string): Microservice | undefined {
  return microservices.find((service) => service.label === label);
}

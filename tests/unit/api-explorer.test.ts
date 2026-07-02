import { describe, expect, it } from "vitest";
import {
  apiEndpoints,
  defaultEndpointId,
  getEndpointById,
  getEndpointByLabel,
} from "@/lib/data/api-explorer";

describe("api-explorer data", () => {
  it("defines three demo endpoints", () => {
    expect(apiEndpoints).toHaveLength(3);
  });

  it("includes users, orders, and cart endpoints", () => {
    const ids = apiEndpoints.map((endpoint) => endpoint.id);
    expect(ids).toEqual(["users", "orders", "cart"]);
  });

  it("defaults to the users endpoint", () => {
    expect(defaultEndpointId).toBe("users");
    expect(getEndpointById(defaultEndpointId)?.method).toBe("GET");
  });

  it("provides a sample POST body for orders", () => {
    const orders = getEndpointByLabel("Orders");
    expect(orders?.sampleBody).toContain("productId");
    expect(orders?.path).toBe("/api/explorer/orders");
  });
});

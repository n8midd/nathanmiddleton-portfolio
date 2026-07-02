import { describe, expect, it } from "vitest";
import {
  getMicroserviceById,
  getMicroserviceByLabel,
  microservices,
  testStrategyLayerIds,
} from "@/lib/data/whiteboard";

describe("whiteboard data", () => {
  it("defines seven microservices", () => {
    expect(microservices).toHaveLength(7);
  });

  it("includes all expected service labels", () => {
    const labels = microservices.map((service) => service.label);
    expect(labels).toEqual([
      "Users",
      "Orders",
      "Inventory",
      "Payments",
      "Shipping",
      "Catalog",
      "Notifications",
    ]);
  });

  it("gives each service five test strategy layers", () => {
    for (const service of microservices) {
      expect(service.testStrategy).toHaveLength(5);
      expect(service.testStrategy.map((layer) => layer.id)).toEqual(testStrategyLayerIds);
    }
  });

  it("looks up services by id and label", () => {
    expect(getMicroserviceById("orders")?.label).toBe("Orders");
    expect(getMicroserviceByLabel("Payments")?.id).toBe("payments");
    expect(getMicroserviceById("missing")).toBeUndefined();
  });
});

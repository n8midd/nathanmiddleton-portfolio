import { describe, expect, it } from "vitest";
import {
  bugHuntTotalBugs,
  demoProducts,
  getBugById,
  hiddenBugs,
  shippingApiPath,
  sqlInjectionPayload,
} from "@/lib/data/bug-hunt";

describe("bug-hunt data", () => {
  it("defines demo products and hidden bugs", () => {
    expect(demoProducts.length).toBeGreaterThan(0);
    expect(hiddenBugs).toHaveLength(bugHuntTotalBugs);
  });

  it("looks up bugs by id", () => {
    expect(getBugById("validation")?.category).toBe("Validation");
    expect(getBugById("sql-injection")?.title).toBe("SQL Injection");
    expect(getBugById("missing")).toBeUndefined();
  });

  it("exposes demo attack payloads and API paths", () => {
    expect(sqlInjectionPayload).toContain("OR");
    expect(shippingApiPath).toBe("/api/bug-hunt/shipping");
  });
});

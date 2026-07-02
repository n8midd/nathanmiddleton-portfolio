import { beforeEach, describe, expect, it } from "vitest";
import { DELETE as deleteCart } from "@/app/api/explorer/cart/route";
import { POST as createOrderRoute } from "@/app/api/explorer/orders/route";
import { GET as getUsers } from "@/app/api/explorer/users/route";
import { resetDemoCart } from "@/lib/data/api-explorer-store";

describe("api explorer routes", () => {
  beforeEach(() => {
    resetDemoCart();
  });

  it("GET /api/explorer/users returns demo users", async () => {
    const response = getUsers();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.users).toHaveLength(3);
  });

  it("POST /api/explorer/orders creates an order", async () => {
    const response = await createOrderRoute(
      new Request("http://localhost/api/explorer/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: "sku-headphones", quantity: 2 }),
      }),
    );
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.status).toBe("created");
    expect(body.productId).toBe("sku-headphones");
    expect(body.quantity).toBe(2);
  });

  it("POST /api/explorer/orders validates productId", async () => {
    const response = await createOrderRoute(
      new Request("http://localhost/api/explorer/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: "", quantity: 1 }),
      }),
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toContain("productId");
  });

  it("POST /api/explorer/orders validates quantity", async () => {
    const response = await createOrderRoute(
      new Request("http://localhost/api/explorer/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: "sku-cable", quantity: 0 }),
      }),
    );

    expect(response.status).toBe(400);
  });

  it("POST /api/explorer/orders rejects invalid JSON", async () => {
    const response = await createOrderRoute(
      new Request("http://localhost/api/explorer/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "not-json",
      }),
    );

    expect(response.status).toBe(400);
  });

  it("DELETE /api/explorer/cart clears the cart", async () => {
    const response = deleteCart();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.cleared).toBe(true);
    expect(body.itemsRemoved).toBe(2);
  });
});

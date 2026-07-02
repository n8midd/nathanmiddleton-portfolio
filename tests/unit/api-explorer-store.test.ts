import { beforeEach, describe, expect, it } from "vitest";
import {
  clearCart,
  createOrder,
  getCartItems,
  getDemoUsers,
  resetDemoCart,
} from "@/lib/data/api-explorer-store";

describe("api-explorer-store", () => {
  beforeEach(() => {
    resetDemoCart();
  });

  it("returns demo users", () => {
    const users = getDemoUsers();
    expect(users).toHaveLength(3);
    expect(users.every((user) => user.id && user.email)).toBe(true);
  });

  it("seeds the cart with two items", () => {
    expect(getCartItems()).toHaveLength(2);
  });

  it("clears the cart and reports items removed", () => {
    const result = clearCart();
    expect(result.itemsRemoved).toBe(2);
    expect(getCartItems()).toHaveLength(0);
  });

  it("creates orders with incrementing ids", () => {
    const first = createOrder("sku-headphones", 1);
    const second = createOrder("sku-cable", 3);

    expect(first.status).toBe("created");
    expect(first.productId).toBe("sku-headphones");
    expect(second.quantity).toBe(3);
    expect(second.orderId).not.toBe(first.orderId);
  });

  it("resets the cart to demo items", () => {
    clearCart();
    resetDemoCart();
    expect(getCartItems()).toHaveLength(2);
  });
});

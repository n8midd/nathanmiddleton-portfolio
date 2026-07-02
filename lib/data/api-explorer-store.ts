export interface DemoCartItem {
  id: string;
  productId: string;
  quantity: number;
}

export interface DemoUser {
  id: string;
  name: string;
  email: string;
}

const demoUsers: DemoUser[] = [
  { id: "u-1001", name: "Alex Rivera", email: "alex.rivera@example.com" },
  { id: "u-1002", name: "Jordan Lee", email: "jordan.lee@example.com" },
  { id: "u-1003", name: "Sam Patel", email: "sam.patel@example.com" },
];

let cartItems: DemoCartItem[] = [
  { id: "cart-1", productId: "sku-headphones", quantity: 1 },
  { id: "cart-2", productId: "sku-cable", quantity: 2 },
];

let orderCounter = 1000;

export function getDemoUsers(): DemoUser[] {
  return demoUsers;
}

export function getCartItems(): DemoCartItem[] {
  return cartItems;
}

export function clearCart(): { itemsRemoved: number } {
  const itemsRemoved = cartItems.length;
  cartItems = [];
  return { itemsRemoved };
}

export function createOrder(productId: string, quantity: number): {
  orderId: string;
  status: "created";
  productId: string;
  quantity: number;
} {
  orderCounter += 1;
  return {
    orderId: `ord-${orderCounter}`,
    status: "created",
    productId,
    quantity,
  };
}

/** Reset cart for tests or after DELETE — re-seed demo items */
export function resetDemoCart(): void {
  cartItems = [
    { id: "cart-1", productId: "sku-headphones", quantity: 1 },
    { id: "cart-2", productId: "sku-cable", quantity: 2 },
  ];
}

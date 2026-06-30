"use client";

import { useCallback, useState } from "react";
import { BugTracker } from "@/components/bug-hunt/bug-tracker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  demoProducts,
  shippingApiPath,
  shippingErrorMessage,
} from "@/lib/data/bug-hunt";

function markFound(prev: Set<string>, id: string): Set<string> {
  if (prev.has(id)) {
    return prev;
  }
  const next = new Set(prev);
  next.add(id);
  return next;
}

export function ShoppingCartApp() {
  const [selectedProductId, setSelectedProductId] = useState(demoProducts[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState("");
  const [shippingError, setShippingError] = useState("");
  const [orderConfirmations, setOrderConfirmations] = useState<string[]>([]);
  const [foundBugIds, setFoundBugIds] = useState<Set<string>>(new Set());

  const selectedProduct =
    demoProducts.find((product) => product.id === selectedProductId) ?? demoProducts[0];
  const lineTotal = selectedProduct ? selectedProduct.price * quantity : 0;

  const findBug = useCallback((id: string) => {
    setFoundBugIds((prev) => markFound(prev, id));
  }, []);

  const handleSearch = () => {
    if (searchQuery.includes("'") || searchQuery.includes("--")) {
      setSearchError(`Invalid query: SELECT * FROM products WHERE name = '${searchQuery}'`);
      findBug("sql-injection");
      return;
    }
    setSearchError("");
  };

  const handleCalculateShipping = async () => {
    try {
      const response = await fetch(shippingApiPath);
      if (!response.ok) {
        setShippingError(shippingErrorMessage);
        findBug("api");
      }
    } catch {
      setShippingError(shippingErrorMessage);
      findBug("api");
    }
  };

  const handlePlaceOrder = () => {
    if (quantity <= 0 || email.trim() === "") {
      findBug("validation");
    }

    setOrderConfirmations((prev) => {
      if (prev.length >= 1) {
        findBug("race");
      }
      const confirmationId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      return [...prev, confirmationId];
    });
  };

  return (
    <div
      className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]"
      data-testid="shopping-cart-app"
    >
      <div className="relative space-y-6">
        <div
          className="pointer-events-none absolute -right-2 top-32 z-10 rounded-md bg-[var(--status-warn)]/90 px-3 py-1 text-xs font-semibold text-black"
          data-testid="css-bug-banner"
        >
          FLASH SALE — overlaps total
        </div>

        <Card className="border-border/60 bg-card/80">
          <CardHeader>
            <CardTitle className="text-base">Product catalog</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-3">
              {demoProducts.map((product, index) => (
                <button
                  key={product.id}
                  type="button"
                  data-testid="product-card"
                  onClick={() => setSelectedProductId(product.id)}
                  className={`rounded-lg border p-3 text-left transition-colors ${
                    selectedProductId === product.id
                      ? "border-[var(--status-pass)]/50 bg-[var(--status-pass)]/10"
                      : "border-border/60 hover:bg-accent/30"
                  }`}
                >
                  {index === 0 ? (
                    <img
                      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect width='64' height='64' fill='%23374151'/%3E%3C/svg%3E"
                      width={64}
                      height={64}
                      data-testid="product-image-no-alt"
                    />
                  ) : (
                    <img
                      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect width='64' height='64' fill='%234B5563'/%3E%3C/svg%3E"
                      alt={product.name}
                      width={64}
                      height={64}
                    />
                  )}
                  <p className="mt-2 font-medium">{product.name}</p>
                  <p className="font-mono text-sm text-muted-foreground">
                    ${product.price.toFixed(2)}
                  </p>
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <label htmlFor="search-input" className="text-sm font-medium">
                Search products
              </label>
              <div className="flex gap-2">
                <input
                  id="search-input"
                  data-testid="search-input"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="flex-1 rounded-md border border-border/60 bg-background px-3 py-2 text-sm"
                  placeholder="Try a product name"
                />
                <Button type="button" variant="outline" onClick={handleSearch}>
                  Search
                </Button>
              </div>
              {searchError ? (
                <p className="text-sm text-[var(--status-fail)]" data-testid="search-error">
                  {searchError}
                </p>
              ) : null}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/80">
          <CardHeader>
            <CardTitle className="text-base">Checkout</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="cart-quantity" className="text-sm font-medium">
                  Quantity
                </label>
                <input
                  id="cart-quantity"
                  data-testid="cart-quantity"
                  type="number"
                  value={quantity}
                  onChange={(event) => setQuantity(Number(event.target.value))}
                  className="w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="checkout-email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="checkout-email"
                  data-testid="checkout-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="relative rounded-md border border-border/60 bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">Selected: {selectedProduct?.name}</p>
              <p className="font-mono text-lg font-semibold" data-testid="cart-total">
                Total: ${lineTotal.toFixed(2)}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                data-testid="calculate-shipping"
                variant="outline"
                onClick={handleCalculateShipping}
              >
                Calculate shipping
              </Button>
              <Button type="button" data-testid="place-order" onClick={handlePlaceOrder}>
                Place order
              </Button>
            </div>

            {shippingError ? (
              <p className="text-sm text-[var(--status-fail)]" data-testid="shipping-error">
                {shippingError}
              </p>
            ) : null}

            {orderConfirmations.length > 0 ? (
              <ul className="space-y-1" data-testid="order-confirmations">
                {orderConfirmations.map((confirmationId) => (
                  <li
                    key={confirmationId}
                    className="font-mono text-sm text-[var(--status-pass)]"
                    data-testid="order-confirmation"
                  >
                    Order confirmed: {confirmationId}
                  </li>
                ))}
              </ul>
            ) : null}
          </CardContent>
        </Card>
      </div>

      <BugTracker foundBugIds={foundBugIds} />
    </div>
  );
}

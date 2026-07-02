import { NextResponse } from "next/server";
import { clearCart } from "@/lib/data/api-explorer-store";

export function DELETE() {
  const { itemsRemoved } = clearCart();
  return NextResponse.json({ cleared: true, itemsRemoved });
}

import { NextResponse } from "next/server";
import { createOrder } from "@/lib/data/api-explorer-store";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Request body must be a JSON object." }, { status: 400 });
  }

  const { productId, quantity } = body as { productId?: unknown; quantity?: unknown };

  if (typeof productId !== "string" || !productId.trim()) {
    return NextResponse.json({ error: "productId is required and must be a non-empty string." }, { status: 400 });
  }

  if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 1) {
    return NextResponse.json(
      { error: "quantity is required and must be a positive integer." },
      { status: 400 },
    );
  }

  const order = createOrder(productId.trim(), quantity);
  return NextResponse.json(order, { status: 201 });
}

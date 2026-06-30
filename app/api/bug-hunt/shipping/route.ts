import { NextResponse } from "next/server";
import { shippingErrorMessage } from "@/lib/data/bug-hunt";

export function GET() {
  return NextResponse.json({ error: shippingErrorMessage }, { status: 500 });
}

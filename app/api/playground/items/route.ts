import { NextResponse } from "next/server";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json({
    items: ["Widget A", "Widget B", "Widget C"],
  });
}

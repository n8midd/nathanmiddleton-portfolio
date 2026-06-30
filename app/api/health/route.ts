import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    status: "ok",
    service: "quality-engineering-lab",
    timestamp: new Date().toISOString(),
  });
}

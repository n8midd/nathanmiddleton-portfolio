import { NextResponse } from "next/server";
import { getDemoUsers } from "@/lib/data/api-explorer-store";

export function GET() {
  return NextResponse.json({ users: getDemoUsers() });
}

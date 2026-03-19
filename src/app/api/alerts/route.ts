import { NextResponse } from "next/server";
import { getRecentAlerts } from "@/lib/data/alerts";

export async function GET() {
  const alerts = getRecentAlerts(50);
  return NextResponse.json({ alerts });
}

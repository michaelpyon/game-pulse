import { NextResponse } from "next/server";
import { getGameWithHealth } from "@/lib/data/health-snapshots";

export async function GET() {
  const games = getGameWithHealth();
  return NextResponse.json({ games });
}

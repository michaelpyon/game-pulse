import { NextResponse } from "next/server";
import { getGame } from "@/lib/data/games";
import {
  getLatestSnapshot,
  getSnapshotHistory,
  getGameWithHealth,
} from "@/lib/data/health-snapshots";
import { getAlertsByGame } from "@/lib/data/alerts";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ gameId: string }> }
) {
  const { gameId } = await params;
  const game = getGame(gameId);
  if (!game) {
    return NextResponse.json({ error: "Game not found" }, { status: 404 });
  }

  const latest = getLatestSnapshot(gameId);
  const history = getSnapshotHistory(gameId);
  const alerts = getAlertsByGame(gameId);

  // Peer data
  const allGames = getGameWithHealth();
  const peers = [gameId, ...game.peers]
    .map((pid) => allGames.find((g) => g.id === pid))
    .filter(Boolean);

  return NextResponse.json({
    game,
    latest,
    history,
    alerts,
    peers,
  });
}

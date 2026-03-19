import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { games, getGame } from "@/lib/data/games";
import {
  getLatestSnapshot,
  getSnapshotHistory,
  getGameWithHealth,
} from "@/lib/data/health-snapshots";
import { getAlertsByGame } from "@/lib/data/alerts";
import { trendDirection, trendArrow, trendSign, trendColorClass } from "@/lib/engine/scoring";
import { HealthGauge } from "@/components/health-gauge";
import { ConfidenceIndicator } from "@/components/confidence-indicator";
import { SubIndexBreakdown } from "@/components/sub-index-breakdown";
import { PeerComparisonTable } from "@/components/peer-comparison-table";
import { TrendChart } from "@/components/trend-chart";
import { SignalFeed } from "@/components/signal-feed";
import { GenreBadge } from "@/components/genre-badge";
import type { PeerComparisonRow } from "@/lib/types";

export function generateStaticParams() {
  return games.map((g) => ({ gameId: g.id }));
}

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  const { gameId } = await params;
  const game = getGame(gameId);
  if (!game) notFound();

  const snapshot = getLatestSnapshot(gameId);
  if (!snapshot) notFound();

  const history = getSnapshotHistory(gameId);
  const alerts = getAlertsByGame(gameId);

  // WoW change
  const weekAgo = history[Math.max(0, history.length - 8)] ?? null;
  const change = weekAgo ? snapshot.healthScore - weekAgo.healthScore : 0;
  const trend = trendDirection(change);

  // Peer comparison rows
  const allGamesHealth = getGameWithHealth();
  const peerIds = [gameId, ...game.peers];
  const peerRows: PeerComparisonRow[] = [];
  for (const pid of peerIds) {
    const pg = allGamesHealth.find((g) => g.id === pid);
    if (!pg || !pg.latestHealth) continue;
    peerRows.push({
      game: pg,
      health: pg.latestHealth,
      trend: pg.trend,
      weekOverWeekChange: pg.weekOverWeekChange,
      isTarget: pid === gameId,
    });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back link + header */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Overview
        </Link>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              {game.name}
            </h1>
            <p className="mt-0.5 text-sm text-muted-foreground">{game.studio}</p>
          </div>
          <div className="flex items-center gap-3">
            <GenreBadge genre={game.genre} />
            <span className={`font-mono text-sm font-semibold ${trendColorClass(trend)}`}>
              {trendArrow(trend)} {trendSign(change)} WoW
            </span>
          </div>
        </div>
      </div>

      {/* Top row: gauge + confidence + sub-index */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="border border-border bg-card">
          <HealthGauge snapshot={snapshot} />
        </div>
        <ConfidenceIndicator snapshot={snapshot} />
        <div className="border border-border bg-card px-5 py-4">
          <p className="label-upper text-muted-foreground mb-3">Quick Stats</p>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Peer Percentile</span>
              <span className="font-mono text-foreground font-medium">{snapshot.peerPercentile}th</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Signals Active</span>
              <span className="font-mono text-foreground font-medium">
                {snapshot.signalsUsed}/{snapshot.signalsAvailable}
              </span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Steam Share</span>
              <span className="font-mono text-foreground font-medium">
                {Math.round(game.steamShare * 100)}%
              </span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Peers Tracked</span>
              <span className="font-mono text-foreground font-medium">{game.peers.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trend chart */}
      <div className="mb-8">
        <TrendChart history={history} />
      </div>

      {/* Sub-index + peer comparison */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SubIndexBreakdown snapshot={snapshot} />
        <PeerComparisonTable rows={peerRows} />
      </div>

      {/* Alerts for this game */}
      {alerts.length > 0 && (
        <div className="mb-8">
          <SignalFeed alerts={alerts} />
        </div>
      )}
    </div>
  );
}

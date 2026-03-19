import { getGameWithHealth } from "@/lib/data/health-snapshots";
import { getRecentAlerts } from "@/lib/data/alerts";
import { GameGrid } from "@/components/game-grid";
import { SignalFeed } from "@/components/signal-feed";
import { MetricCard } from "@/components/metric-card";
import { trendDirection } from "@/lib/engine/scoring";
import { Heart, Gamepad2, TrendingUp, TrendingDown } from "lucide-react";

export default function OverviewPage() {
  const gamesWithHealth = getGameWithHealth();
  const alerts = getRecentAlerts(8);

  const avgHealth =
    Math.round(
      gamesWithHealth.reduce(
        (sum, g) => sum + (g.latestHealth?.healthScore ?? 0),
        0
      ) / gamesWithHealth.length
    );

  const avgWoW =
    Math.round(
      (gamesWithHealth.reduce((sum, g) => sum + g.weekOverWeekChange, 0) /
        gamesWithHealth.length) *
        10
    ) / 10;

  const rising = gamesWithHealth.filter((g) => g.trend === "up").length;
  const declining = gamesWithHealth.filter((g) => g.trend === "down").length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">
          Health Overview
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {gamesWithHealth.length} titles tracked across 2 genres — updated daily
        </p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <MetricCard
          label="Avg Health"
          value={String(avgHealth)}
          change={avgWoW}
          trend={trendDirection(avgWoW)}
          icon={Heart}
          accentClass="text-cyan"
        />
        <MetricCard
          label="Titles Tracked"
          value={String(gamesWithHealth.length)}
          icon={Gamepad2}
        />
        <MetricCard
          label="Rising"
          value={String(rising)}
          icon={TrendingUp}
          accentClass="text-green-500"
        />
        <MetricCard
          label="Declining"
          value={String(declining)}
          icon={TrendingDown}
          accentClass="text-red-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_380px]">
        <GameGrid games={gamesWithHealth} />
        <SignalFeed alerts={alerts} />
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import type { GameWithHealth } from "@/lib/types";
import {
  healthTextClass,
  healthGlowClass,
  trendArrow,
  trendSign,
  trendColorClass,
  confidenceLabel,
} from "@/lib/engine/scoring";
import { GenreBadge } from "./genre-badge";
import { SubIndexBar } from "./sub-index-bar";
import { TrendSparkline } from "./trend-sparkline";

export function HealthScoreCard({ game }: { game: GameWithHealth }) {
  const h = game.latestHealth;
  if (!h) return null;

  const borderAccent =
    h.healthScore >= 75
      ? "border-l-green-500/60"
      : h.healthScore >= 50
        ? "border-l-amber-500/60"
        : "border-l-red-500/60";

  return (
    <Link
      href={`/games/${game.id}`}
      className={`group block border border-border border-l-2 ${borderAccent} bg-card transition-[border-color,box-shadow,transform] duration-200 hover:border-cyan/30 hover:border-l-cyan hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan/5`}
    >
      {/* Header */}
      <div className="flex items-start justify-between border-b border-border px-4 py-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-foreground group-hover:text-cyan transition-colors">
            {game.name}
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{game.studio}</p>
        </div>
        <GenreBadge genre={game.genre} />
      </div>

      {/* Score + Sparkline */}
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="text-center min-w-[52px]">
          <p
            className={`font-mono text-3xl font-bold ${healthTextClass(h.healthScore)} ${healthGlowClass(h.healthScore)}`}
          >
            {h.healthScore}
          </p>
          <p className="label-upper-sm text-muted-foreground mt-0.5">/ 100</p>
        </div>
        <div className="flex-1">
          <TrendSparkline data={game.sparklineData} trend={game.trend} height={44} />
        </div>
        <div className="text-right min-w-[48px]">
          <p className={`font-mono text-sm font-semibold ${trendColorClass(game.trend)}`}>
            {trendArrow(game.trend)} {trendSign(game.weekOverWeekChange)}
          </p>
          <p className="label-upper-sm text-muted-foreground mt-0.5">WoW</p>
        </div>
      </div>

      {/* Sub-indices */}
      <div className="space-y-1.5 border-t border-border px-4 py-2.5">
        <SubIndexBar label="Momentum" score={h.momentumScore} compact />
        <SubIndexBar label="Community" score={h.communityScore} compact />
        <SubIndexBar label="Content" score={h.contentScore} compact />
        <SubIndexBar label="Creator" score={h.creatorScore} compact />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border px-4 py-2">
        <span className="label-upper-sm text-muted-foreground">
          Confidence: {confidenceLabel(h.confidence)}
        </span>
        <span className="label-upper-sm text-muted-foreground">
          {h.signalsUsed}/{h.signalsAvailable} signals
        </span>
      </div>
    </Link>
  );
}

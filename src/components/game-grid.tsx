import type { GameWithHealth } from "@/lib/types";
import { HealthScoreCard } from "./health-score-card";

export function GameGrid({ games }: { games: GameWithHealth[] }) {
  // Sort by health score descending
  const sorted = [...games].sort(
    (a, b) => (b.latestHealth?.healthScore ?? 0) - (a.latestHealth?.healthScore ?? 0)
  );

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {sorted.map((game, i) => (
        <div key={game.id} className="animate-card-in" style={{ animationDelay: `${i * 50}ms` }}>
          <HealthScoreCard game={game} />
        </div>
      ))}
    </div>
  );
}

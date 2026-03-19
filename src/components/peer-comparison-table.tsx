import type { PeerComparisonRow } from "@/lib/types";
import {
  healthTextClass,
  trendArrow,
  trendSign,
  trendColorClass,
} from "@/lib/engine/scoring";

export function PeerComparisonTable({
  rows,
}: {
  rows: PeerComparisonRow[];
}) {
  const sorted = [...rows].sort(
    (a, b) => b.health.healthScore - a.health.healthScore
  );

  return (
    <div className="border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <h2 className="label-upper text-foreground">Peer Comparison</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              <th className="px-5 py-2.5 text-left font-medium">Game</th>
              <th className="px-3 py-2.5 text-right font-medium">Health</th>
              <th className="px-3 py-2.5 text-right font-medium">Momentum</th>
              <th className="px-3 py-2.5 text-right font-medium">Community</th>
              <th className="px-3 py-2.5 text-right font-medium">Content</th>
              <th className="px-3 py-2.5 text-right font-medium">Creator</th>
              <th className="px-5 py-2.5 text-right font-medium">WoW</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sorted.map((row) => (
              <tr
                key={row.game.id}
                className={row.isTarget ? "bg-cyan-950/20" : ""}
              >
                <td className="px-5 py-2.5">
                  <span
                    className={`font-medium ${row.isTarget ? "text-cyan-400" : "text-foreground"}`}
                  >
                    {row.game.name}
                  </span>
                </td>
                <td
                  className={`px-3 py-2.5 text-right font-mono font-semibold ${healthTextClass(row.health.healthScore)}`}
                >
                  {row.health.healthScore}
                </td>
                <td className="px-3 py-2.5 text-right font-mono text-muted-foreground">
                  {row.health.momentumScore}
                </td>
                <td className="px-3 py-2.5 text-right font-mono text-muted-foreground">
                  {row.health.communityScore}
                </td>
                <td className="px-3 py-2.5 text-right font-mono text-muted-foreground">
                  {row.health.contentScore}
                </td>
                <td className="px-3 py-2.5 text-right font-mono text-muted-foreground">
                  {row.health.creatorScore}
                </td>
                <td
                  className={`px-5 py-2.5 text-right font-mono ${trendColorClass(row.trend)}`}
                >
                  {trendArrow(row.trend)} {trendSign(row.weekOverWeekChange)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

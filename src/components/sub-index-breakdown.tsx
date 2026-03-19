"use client";

import type { HealthSnapshot } from "@/lib/types";
import { SubIndexBar } from "./sub-index-bar";
import { healthTextClass } from "@/lib/engine/scoring";

export function SubIndexBreakdown({ snapshot }: { snapshot: HealthSnapshot }) {
  const subIndices = [
    { label: "Momentum", score: snapshot.momentumScore },
    { label: "Community", score: snapshot.communityScore },
    { label: "Content", score: snapshot.contentScore },
    { label: "Creator", score: snapshot.creatorScore },
  ];

  return (
    <div className="border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <h2 className="label-upper text-foreground">Sub-Index Breakdown</h2>
      </div>
      <div className="space-y-4 px-5 py-4">
        {subIndices.map((si) => (
          <SubIndexBar key={si.label} label={si.label} score={si.score} />
        ))}
      </div>

      {/* Signal detail */}
      <div className="border-t border-border px-5 py-4">
        <h3 className="label-upper-sm text-muted-foreground mb-3">
          Signal Detail
        </h3>
        <div className="space-y-2">
          {snapshot.detail.map((d) => (
            <div
              key={d.signalId}
              className="flex items-center justify-between text-xs"
            >
              <div className="min-w-0 flex-1">
                <span className="text-foreground">{d.signalName}</span>
                <span className="ml-2 text-muted-foreground">
                  w: {Math.round(d.weight * 100)}%
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {d.trendPct !== null && (
                  <span
                    className={`font-mono ${d.trendPct > 0 ? "text-green-500" : d.trendPct < 0 ? "text-red-500" : "text-muted-foreground"}`}
                  >
                    {d.trendPct > 0 ? "+" : ""}
                    {d.trendPct.toFixed(1)}%
                  </span>
                )}
                {d.sentimentScore !== null && (
                  <span
                    className={`font-mono ${d.sentimentScore > 0.2 ? "text-green-500" : d.sentimentScore < -0.2 ? "text-red-500" : "text-muted-foreground"}`}
                  >
                    S: {d.sentimentScore > 0 ? "+" : ""}
                    {d.sentimentScore.toFixed(1)}
                  </span>
                )}
                <span
                  className={`font-mono font-semibold ${healthTextClass(d.score)}`}
                >
                  {d.score}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

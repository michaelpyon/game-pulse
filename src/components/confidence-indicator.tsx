import { confidenceLabel } from "@/lib/engine/scoring";
import type { HealthSnapshot } from "@/lib/types";

export function ConfidenceIndicator({ snapshot }: { snapshot: HealthSnapshot }) {
  const pct = Math.round((snapshot.signalsUsed / snapshot.signalsAvailable) * 100);
  const label = confidenceLabel(snapshot.confidence);

  return (
    <div className="border border-border bg-card px-5 py-4">
      <div className="flex items-center justify-between">
        <span className="label-upper text-muted-foreground">Data Confidence</span>
        <span className="font-mono text-sm font-semibold text-foreground">
          {label}
        </span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-cyan-500 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          {snapshot.signalsUsed}/{snapshot.signalsAvailable} signals
        </span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Peer percentile: <span className="font-mono text-foreground">{snapshot.peerPercentile}th</span>
      </p>
    </div>
  );
}

"use client";

import {
  healthTextClass,
  healthGlowClass,
  healthLabel,
  confidenceLabel,
} from "@/lib/engine/scoring";
import type { HealthSnapshot } from "@/lib/types";

export function HealthGauge({ snapshot }: { snapshot: HealthSnapshot }) {
  return (
    <div className="flex flex-col items-center gap-2 py-6">
      <p
        className={`font-mono text-6xl font-bold ${healthTextClass(snapshot.healthScore)} ${healthGlowClass(snapshot.healthScore)}`}
      >
        {snapshot.healthScore}
      </p>
      <p className="label-upper text-muted-foreground">/ 100</p>
      <div className="mt-2 flex items-center gap-3">
        <span className="label-upper-sm text-muted-foreground">
          {healthLabel(snapshot.healthScore)}
        </span>
        <span className="text-muted-foreground/50">|</span>
        <span className="label-upper-sm text-muted-foreground">
          Confidence: {confidenceLabel(snapshot.confidence)}
        </span>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { healthColor } from "@/lib/engine/scoring";

export function SubIndexBar({
  label,
  score,
  compact = false,
}: {
  label: string;
  score: number;
  compact?: boolean;
}) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(score), 50);
    return () => clearTimeout(t);
  }, [score]);

  return (
    <div className={compact ? "flex items-center gap-2" : "space-y-1"}>
      <div className={`flex items-center justify-between ${compact ? "w-20" : ""}`}>
        <span className={compact ? "label-upper-sm text-muted-foreground" : "text-xs text-muted-foreground"}>
          {label}
        </span>
        {!compact && (
          <span className="font-mono text-xs text-foreground">{Math.round(score)}</span>
        )}
      </div>
      <div className={`overflow-hidden rounded-full bg-muted ${compact ? "h-1 flex-1" : "h-1.5"}`}>
        <div
          className="score-bar-fill h-full rounded-full"
          style={{
            width: `${width}%`,
            backgroundColor: healthColor(score),
          }}
        />
      </div>
      {compact && (
        <span className="font-mono text-[10px] text-muted-foreground w-6 text-right">
          {Math.round(score)}
        </span>
      )}
    </div>
  );
}

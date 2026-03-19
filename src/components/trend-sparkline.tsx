"use client";

import { LineChart, Line, ResponsiveContainer } from "recharts";
import type { SparklinePoint, TrendDirection } from "@/lib/types";

const TREND_COLORS: Record<TrendDirection, string> = {
  up: "#22C55E",
  down: "#EF4444",
  flat: "#64748B",
};

export function TrendSparkline({
  data,
  trend,
  height = 40,
}: {
  data: SparklinePoint[];
  trend: TrendDirection;
  height?: number;
}) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="score"
            stroke={TREND_COLORS[trend]}
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

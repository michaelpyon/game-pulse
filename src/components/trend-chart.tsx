"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { HealthSnapshot } from "@/lib/types";
import { healthColor } from "@/lib/engine/scoring";

export function TrendChart({ history }: { history: HealthSnapshot[] }) {
  const data = history.map((s) => ({
    date: s.snapshotDate.slice(5), // "03-15" format
    health: s.healthScore,
    momentum: s.momentumScore,
    community: s.communityScore,
    content: s.contentScore,
    creator: s.creatorScore,
  }));

  const latestScore = history[history.length - 1]?.healthScore ?? 50;
  const color = healthColor(latestScore);

  return (
    <div className="border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <h2 className="label-upper text-foreground">30-Day Trend</h2>
      </div>
      <div className="px-4 py-4" style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: "#64748B" }}
              tickLine={false}
              axisLine={{ stroke: "#1E293B" }}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: "#64748B" }}
              tickLine={false}
              axisLine={false}
              width={30}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                border: "1px solid #1E293B",
                borderRadius: "0",
                fontSize: 12,
              }}
              labelStyle={{ color: "#94A3B8" }}
            />
            <Area
              type="monotone"
              dataKey="health"
              stroke={color}
              fill="url(#healthGradient)"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
              name="Health Score"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

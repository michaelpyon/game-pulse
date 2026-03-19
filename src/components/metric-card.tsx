import { trendSign } from "@/lib/engine/scoring";
import type { TrendDirection } from "@/lib/types";
import type { LucideIcon } from "lucide-react";

export function MetricCard({
  label,
  value,
  change,
  trend,
  icon: Icon,
  accentClass,
}: {
  label: string;
  value: string;
  change?: number;
  trend?: TrendDirection;
  icon?: LucideIcon;
  accentClass?: string;
}) {
  const changeColor =
    trend === "up"
      ? "text-green-500"
      : trend === "down"
        ? "text-red-500"
        : "text-muted-foreground";

  return (
    <div className="border border-border bg-card px-5 py-4">
      <div className="flex items-center justify-between">
        <p className="label-upper text-muted-foreground">{label}</p>
        {Icon && (
          <Icon className={`h-4 w-4 ${accentClass ?? "text-muted-foreground/50"}`} />
        )}
      </div>
      <p className={`mt-1.5 font-mono text-2xl font-semibold ${accentClass ?? "text-foreground"}`}>
        {value}
      </p>
      {change !== undefined && (
        <p className={`mt-0.5 font-mono text-xs ${changeColor}`}>
          {trendSign(change)} WoW
        </p>
      )}
    </div>
  );
}

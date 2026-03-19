import type { TrendDirection } from "@/lib/types";

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function round(value: number, digits = 1): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

export function trendDirection(change: number): TrendDirection {
  if (change > 2) return "up";
  if (change < -2) return "down";
  return "flat";
}

export function trendArrow(direction: TrendDirection): string {
  const arrows: Record<TrendDirection, string> = {
    up: "\u2191",
    down: "\u2193",
    flat: "\u2192",
  };
  return arrows[direction];
}

export function trendSign(change: number): string {
  if (change > 0) return `+${round(change)}`;
  return `${round(change)}`;
}

export function healthLabel(score: number): string {
  if (score >= 75) return "Healthy";
  if (score >= 50) return "Watch";
  if (score >= 30) return "Stress";
  return "Critical";
}

export function healthDotClass(score: number): string {
  if (score >= 75) return "dot-healthy";
  if (score >= 50) return "dot-watch";
  if (score >= 30) return "dot-stress";
  return "dot-critical";
}

export function healthGlowClass(score: number): string {
  if (score >= 75) return "score-glow-healthy";
  if (score >= 50) return "score-glow-watch";
  return "score-glow-stress";
}

export function healthColor(score: number): string {
  if (score >= 75) return "var(--color-score-healthy)";
  if (score >= 50) return "var(--color-score-watch)";
  return "var(--color-score-stress)";
}

export function healthTextClass(score: number): string {
  if (score >= 75) return "text-green-500";
  if (score >= 50) return "text-amber-500";
  return "text-red-500";
}

export function trendColorClass(direction: TrendDirection): string {
  if (direction === "up") return "text-green-500";
  if (direction === "down") return "text-red-500";
  return "text-muted-foreground";
}

export function confidenceLabel(confidence: number): string {
  if (confidence >= 0.8) return "High";
  if (confidence >= 0.5) return "Medium";
  return "Low";
}

export function effectiveReliability(
  baseReliability: number,
  dataPoints: number,
  lastFetchAgeHours: number,
  cadenceHours: number
): number {
  const volumeFactor = Math.min(1.0, Math.log10(Math.max(1, dataPoints)) / 4);
  const recencyFactor = lastFetchAgeHours < cadenceHours ? 1.0 : 0.8;
  return round(baseReliability * volumeFactor * recencyFactor, 2);
}

export function sentimentAdjustedVelocity(
  velocity: number,
  sentimentScore: number
): number {
  if (sentimentScore < -0.3) {
    return velocity * sentimentScore;
  }
  return velocity * Math.max(0.2, (1 + sentimentScore) / 2);
}

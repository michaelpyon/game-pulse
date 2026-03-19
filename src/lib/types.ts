// ─── Enums / Union Types ─────────────────────────────────

export type Genre = "shooter_pc" | "console_shooter" | "mobile_shooter";

export type SubIndex = "momentum" | "community" | "content" | "creator";

export type TrendDirection = "up" | "down" | "flat";

export type AlertType = "spike" | "decline" | "competitive" | "sentiment";

export type AlertSeverity = "info" | "warning" | "critical";

export type SignalCadence = "realtime" | "daily" | "weekly";

export type Platform = "pc" | "console" | "mobile" | "all";

// ─── Signal Registry ─────────────────────────────────────

export interface SignalDefinition {
  id: string;
  name: string;
  source: string;
  cadence: SignalCadence;
  platformAffinity: Platform[];
  baseReliability: number;
}

// ─── Genre Config ────────────────────────────────────────

export interface GenreConfig {
  genre: Genre;
  name: string;
  subIndexWeights: Record<SubIndex, number>;
  signals: Record<SubIndex, Record<string, number>>;
  seasonalAdjustments: {
    holidayBoostMonths: number[];
    adjustmentFactor: number;
  };
}

// ─── Game Registry ───────────────────────────────────────

export interface Game {
  id: string;
  name: string;
  studio: string;
  genre: Genre;
  steamShare: number;
  peers: string[];
  baselineComplete: boolean;
}

// ─── Health Snapshot ─────────────────────────────────────

export interface HealthSnapshot {
  id: string;
  gameId: string;
  snapshotDate: string;
  healthScore: number;
  confidence: number;
  momentumScore: number;
  communityScore: number;
  contentScore: number;
  creatorScore: number;
  peerPercentile: number;
  signalsUsed: number;
  signalsAvailable: number;
  detail: SignalDetail[];
}

export interface SignalDetail {
  signalId: string;
  signalName: string;
  score: number;
  weight: number;
  weightedContribution: number;
  effectiveReliability: number;
  trendPct: number | null;
  sentimentScore: number | null;
}

// ─── Peer Comparison ─────────────────────────────────────

export interface PeerComparison {
  gameId: string;
  peerGameId: string;
  snapshotDate: string;
  scoreDelta: number;
  momentumDelta: number;
  communityDelta: number;
  contentDelta: number;
  creatorDelta: number;
}

// ─── Alert Event ─────────────────────────────────────────

export interface AlertEvent {
  id: string;
  gameId: string;
  gameName: string;
  alertType: AlertType;
  severity: AlertSeverity;
  triggeredAt: string;
  signalId: string | null;
  title: string;
  description: string;
  acknowledged: boolean;
}

// ─── Derived / View Types ────────────────────────────────

export interface GameWithHealth extends Game {
  latestHealth: HealthSnapshot | null;
  trend: TrendDirection;
  weekOverWeekChange: number;
  sparklineData: SparklinePoint[];
}

export interface SparklinePoint {
  date: string;
  score: number;
}

export interface PeerComparisonRow {
  game: Game;
  health: HealthSnapshot;
  trend: TrendDirection;
  weekOverWeekChange: number;
  isTarget: boolean;
}

// ─── Constants ───────────────────────────────────────────

export const SUB_INDEX_LABELS: Record<SubIndex, string> = {
  momentum: "Momentum",
  community: "Community",
  content: "Content",
  creator: "Creator",
};

export const GENRE_LABELS: Record<Genre, string> = {
  shooter_pc: "PC Shooter",
  console_shooter: "Console Shooter",
  mobile_shooter: "Mobile Shooter",
};

export const ALERT_TYPE_LABELS: Record<AlertType, string> = {
  spike: "Spike",
  decline: "Decline",
  competitive: "Competitive",
  sentiment: "Sentiment",
};

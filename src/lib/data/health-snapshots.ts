import type { HealthSnapshot, SparklinePoint, GameWithHealth, TrendDirection } from "@/lib/types";
import { games } from "./games";
import { trendDirection, round } from "@/lib/engine/scoring";

// Generate 30 days of plausible health data per game
// Each game has a narrative arc encoded in its trajectory

// Deterministic pseudo-jitter so the sample dataset is stable across builds.
// Seeded by a string key, returns a value in [0, 1). This replaces Math.random()
// so two builds of the same sample data always produce identical scores.
function seededUnit(key: string): number {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // Map the 32-bit hash to [0, 1)
  return ((h >>> 0) % 100000) / 100000;
}

interface GameTrajectory {
  gameId: string;
  baseScore: number;
  trajectory: number[]; // daily deltas applied to base
  momentum: number;
  community: number;
  content: number;
  creator: number;
  confidence: number;
  signalsUsed: number;
  signalsAvailable: number;
  peerPercentile: number;
}

const trajectories: GameTrajectory[] = [
  {
    // CS2: stable titan, minor fluctuations
    gameId: "counter_strike_2",
    baseScore: 80,
    trajectory: [0,-1,1,0,1,-1,0,1,0,-1,1,0,0,1,-1,0,1,0,-1,0,1,0,-1,1,0,1,0,1,1,0],
    momentum: 80, community: 85, content: 78, creator: 82,
    confidence: 0.92, signalsUsed: 5, signalsAvailable: 5, peerPercentile: 92,
  },
  {
    // Marvel Rivals: season 2 upswing
    gameId: "marvel_rivals",
    baseScore: 70,
    trajectory: [-1,0,1,0,1,1,0,1,1,0,1,0,1,1,0,0,1,1,0,1,0,1,1,0,1,0,1,0,1,1],
    momentum: 82, community: 80, content: 72, creator: 78,
    confidence: 0.85, signalsUsed: 5, signalsAvailable: 6, peerPercentile: 78,
  },
  {
    // TF2: community revival, slow climb
    gameId: "team_fortress_2",
    baseScore: 55,
    trajectory: [0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,1,0,0,1,0,1,0,0,1,0,1,0],
    momentum: 55, community: 72, content: 48, creator: 65,
    confidence: 0.88, signalsUsed: 4, signalsAvailable: 4, peerPercentile: 45,
  },
  {
    // The Finals: retention crisis, declining
    gameId: "the_finals",
    baseScore: 58,
    trajectory: [0,-1,0,-1,0,0,-1,0,-1,0,-1,0,0,-1,0,-1,0,0,-1,0,-1,0,0,-1,0,-1,0,-1,0,-1],
    momentum: 38, community: 52, content: 45, creator: 55,
    confidence: 0.78, signalsUsed: 4, signalsAvailable: 6, peerPercentile: 22,
  },
  {
    // Marathon: strong launch, building momentum
    gameId: "marathon",
    baseScore: 60,
    trajectory: [1,1,0,1,1,0,1,0,1,1,0,1,0,1,1,0,0,1,0,1,1,0,1,0,1,0,1,1,0,1],
    momentum: 78, community: 75, content: 62, creator: 70,
    confidence: 0.72, signalsUsed: 4, signalsAvailable: 6, peerPercentile: 65,
  },
  {
    // Overwatch: season 15 spike (big jump in last 10 days)
    gameId: "overwatch",
    baseScore: 52,
    trajectory: [0,0,0,0,0,0,0,-1,0,0,0,0,0,0,0,0,0,0,0,0,2,3,2,2,1,2,1,2,1,2],
    momentum: 80, community: 68, content: 75, creator: 62,
    confidence: 0.80, signalsUsed: 5, signalsAvailable: 6, peerPercentile: 58,
  },
  {
    // Destiny 2: content drought, declining
    gameId: "destiny_2",
    baseScore: 45,
    trajectory: [0,-1,0,0,-1,0,0,-1,0,0,-1,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,-1,0,0,-1],
    momentum: 30, community: 42, content: 25, creator: 50,
    confidence: 0.82, signalsUsed: 5, signalsAvailable: 6, peerPercentile: 15,
  },
  {
    // Halo Infinite: stagnant, flat
    gameId: "halo_infinite",
    baseScore: 40,
    trajectory: [0,0,0,1,0,0,-1,0,0,0,1,0,0,0,-1,0,0,1,0,0,0,-1,0,0,1,0,0,0,0,0],
    momentum: 35, community: 48, content: 42, creator: 38,
    confidence: 0.75, signalsUsed: 4, signalsAvailable: 6, peerPercentile: 20,
  },
];

function generateSignalDetail(gameId: string, scores: GameTrajectory) {
  const signalSets: Record<string, Array<{ signalId: string; signalName: string; weight: number; trendPct: number | null; sentimentScore: number | null }>> = {
    counter_strike_2: [
      { signalId: "steam_concurrent", signalName: "Steam Concurrent Players", weight: 0.25, trendPct: 0.3, sentimentScore: null },
      { signalId: "twitch_hours_watched", signalName: "Twitch Hours Watched", weight: 0.20, trendPct: -2.1, sentimentScore: null },
      { signalId: "reddit_post_velocity", signalName: "Reddit Post Velocity", weight: 0.15, trendPct: 5.2, sentimentScore: 0.4 },
      { signalId: "youtube_video_velocity", signalName: "YouTube Video Velocity", weight: 0.20, trendPct: 1.8, sentimentScore: null },
      { signalId: "patch_note_frequency", signalName: "Patch Note Frequency", weight: 0.20, trendPct: null, sentimentScore: null },
    ],
    marvel_rivals: [
      { signalId: "steam_concurrent", signalName: "Steam Concurrent Players", weight: 0.20, trendPct: 12.5, sentimentScore: null },
      { signalId: "twitch_hours_watched", signalName: "Twitch Hours Watched", weight: 0.20, trendPct: 18.3, sentimentScore: null },
      { signalId: "reddit_post_velocity", signalName: "Reddit Post Velocity", weight: 0.15, trendPct: 22.1, sentimentScore: 0.6 },
      { signalId: "youtube_video_velocity", signalName: "YouTube Video Velocity", weight: 0.20, trendPct: 15.7, sentimentScore: null },
      { signalId: "x_mention_velocity", signalName: "X/Twitter Mentions", weight: 0.25, trendPct: 28.4, sentimentScore: 0.5 },
    ],
    team_fortress_2: [
      { signalId: "steam_concurrent", signalName: "Steam Concurrent Players", weight: 0.30, trendPct: 4.2, sentimentScore: null },
      { signalId: "reddit_post_velocity", signalName: "Reddit Post Velocity", weight: 0.25, trendPct: 15.3, sentimentScore: 0.7 },
      { signalId: "youtube_video_velocity", signalName: "YouTube Video Velocity", weight: 0.25, trendPct: 8.9, sentimentScore: null },
      { signalId: "twitch_hours_watched", signalName: "Twitch Hours Watched", weight: 0.20, trendPct: 6.1, sentimentScore: null },
    ],
    the_finals: [
      { signalId: "steam_concurrent", signalName: "Steam Concurrent Players", weight: 0.25, trendPct: -15.2, sentimentScore: null },
      { signalId: "twitch_hours_watched", signalName: "Twitch Hours Watched", weight: 0.20, trendPct: -22.8, sentimentScore: null },
      { signalId: "reddit_post_velocity", signalName: "Reddit Post Velocity", weight: 0.20, trendPct: 35.0, sentimentScore: -0.6 },
      { signalId: "youtube_video_velocity", signalName: "YouTube Video Velocity", weight: 0.20, trendPct: -8.5, sentimentScore: null },
    ],
    marathon: [
      { signalId: "steam_concurrent", signalName: "Steam Concurrent Players", weight: 0.20, trendPct: 45.0, sentimentScore: null },
      { signalId: "twitch_hours_watched", signalName: "Twitch Hours Watched", weight: 0.25, trendPct: 55.2, sentimentScore: null },
      { signalId: "reddit_post_velocity", signalName: "Reddit Post Velocity", weight: 0.20, trendPct: 80.3, sentimentScore: 0.5 },
      { signalId: "youtube_video_velocity", signalName: "YouTube Video Velocity", weight: 0.20, trendPct: 62.1, sentimentScore: null },
    ],
    overwatch: [
      { signalId: "steam_concurrent", signalName: "Steam Concurrent Players", weight: 0.15, trendPct: 45.6, sentimentScore: null },
      { signalId: "twitch_hours_watched", signalName: "Twitch Hours Watched", weight: 0.25, trendPct: 280.0, sentimentScore: null },
      { signalId: "reddit_post_velocity", signalName: "Reddit Post Velocity", weight: 0.20, trendPct: 65.3, sentimentScore: 0.7 },
      { signalId: "youtube_video_velocity", signalName: "YouTube Video Velocity", weight: 0.20, trendPct: 42.8, sentimentScore: null },
      { signalId: "patch_note_frequency", signalName: "Patch Note Frequency", weight: 0.20, trendPct: null, sentimentScore: null },
    ],
    destiny_2: [
      { signalId: "steam_concurrent", signalName: "Steam Concurrent Players", weight: 0.20, trendPct: -6.5, sentimentScore: null },
      { signalId: "twitch_hours_watched", signalName: "Twitch Hours Watched", weight: 0.20, trendPct: -18.2, sentimentScore: null },
      { signalId: "reddit_post_velocity", signalName: "Reddit Post Velocity", weight: 0.20, trendPct: 12.0, sentimentScore: -0.4 },
      { signalId: "youtube_video_velocity", signalName: "YouTube Video Velocity", weight: 0.20, trendPct: -10.5, sentimentScore: null },
      { signalId: "patch_note_frequency", signalName: "Patch Note Frequency", weight: 0.20, trendPct: -100.0, sentimentScore: null },
    ],
    halo_infinite: [
      { signalId: "steam_concurrent", signalName: "Steam Concurrent Players", weight: 0.15, trendPct: 0.9, sentimentScore: null },
      { signalId: "twitch_hours_watched", signalName: "Twitch Hours Watched", weight: 0.25, trendPct: -3.2, sentimentScore: null },
      { signalId: "reddit_post_velocity", signalName: "Reddit Post Velocity", weight: 0.25, trendPct: 2.1, sentimentScore: 0.1 },
      { signalId: "patch_note_frequency", signalName: "Patch Note Frequency", weight: 0.20, trendPct: null, sentimentScore: null },
    ],
  };

  const signals = signalSets[gameId] || [];
  return signals.map((s) => ({
    signalId: s.signalId,
    signalName: s.signalName,
    score: Math.round(scores.baseScore + (seededUnit(`${gameId}_${s.signalId}_score`) - 0.5) * 20),
    weight: s.weight,
    weightedContribution: Math.round(scores.baseScore * s.weight),
    effectiveReliability: round(0.7 + seededUnit(`${gameId}_${s.signalId}_rel`) * 0.25, 2),
    trendPct: s.trendPct,
    sentimentScore: s.sentimentScore,
  }));
}

function generateSnapshots(): HealthSnapshot[] {
  const snapshots: HealthSnapshot[] = [];
  const today = new Date("2026-03-15");

  for (const t of trajectories) {
    let runningScore = t.baseScore;

    for (let day = 29; day >= 0; day--) {
      const date = new Date(today);
      date.setDate(date.getDate() - day);
      const dateStr = date.toISOString().split("T")[0];

      runningScore += t.trajectory[29 - day];
      const score = Math.max(10, Math.min(100, runningScore));

      // Sub-index scores drift slightly from their base
      const dayJitter = (29 - day) / 29;
      const momentum = Math.max(5, Math.min(100, t.momentum + (score - t.baseScore) * 0.5 * dayJitter));
      const community = Math.max(5, Math.min(100, t.community + (seededUnit(`${t.gameId}_${day}_community`) - 0.5) * 4));
      const content = Math.max(5, Math.min(100, t.content + (seededUnit(`${t.gameId}_${day}_content`) - 0.5) * 2));
      const creator = Math.max(5, Math.min(100, t.creator + (seededUnit(`${t.gameId}_${day}_creator`) - 0.5) * 3));

      snapshots.push({
        id: `${t.gameId}_${dateStr}`,
        gameId: t.gameId,
        snapshotDate: dateStr,
        healthScore: Math.round(score),
        confidence: t.confidence,
        momentumScore: Math.round(momentum),
        communityScore: Math.round(community),
        contentScore: Math.round(content),
        creatorScore: Math.round(creator),
        peerPercentile: t.peerPercentile,
        signalsUsed: t.signalsUsed,
        signalsAvailable: t.signalsAvailable,
        detail: generateSignalDetail(t.gameId, t),
      });
    }
  }

  return snapshots;
}

export const healthSnapshots = generateSnapshots();

export function getLatestSnapshot(gameId: string): HealthSnapshot | undefined {
  return healthSnapshots
    .filter((s) => s.gameId === gameId)
    .sort((a, b) => b.snapshotDate.localeCompare(a.snapshotDate))[0];
}

export function getSnapshotHistory(gameId: string): HealthSnapshot[] {
  return healthSnapshots
    .filter((s) => s.gameId === gameId)
    .sort((a, b) => a.snapshotDate.localeCompare(b.snapshotDate));
}

export function getSparklineData(gameId: string): SparklinePoint[] {
  return getSnapshotHistory(gameId).map((s) => ({
    date: s.snapshotDate,
    score: s.healthScore,
  }));
}

export function getGameWithHealth(): GameWithHealth[] {
  return games.map((game) => {
    const history = getSnapshotHistory(game.id);
    const latest = history[history.length - 1] ?? null;
    const weekAgo = history[Math.max(0, history.length - 8)] ?? null;
    const change = latest && weekAgo ? latest.healthScore - weekAgo.healthScore : 0;
    const trend: TrendDirection = trendDirection(change);

    return {
      ...game,
      latestHealth: latest,
      trend,
      weekOverWeekChange: change,
      sparklineData: history.map((s) => ({ date: s.snapshotDate, score: s.healthScore })),
    };
  });
}

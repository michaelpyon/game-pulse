import type { AlertEvent } from "@/lib/types";

export const alerts: AlertEvent[] = [
  {
    id: "alert_1",
    gameId: "overwatch",
    gameName: "Overwatch 2",
    alertType: "spike",
    severity: "warning",
    triggeredAt: "2026-03-14T09:15:00Z",
    signalId: "twitch_hours_watched",
    title: "Twitch viewership surged +280%",
    description: "Overwatch 2 Season 15 launch driving massive creator engagement. Twitch hours watched spiked from 1.2M to 4.6M in 48 hours. Historical pattern: season launches produce 2-3 week bumps that typically revert 60-70%.",
    acknowledged: false,
  },
  {
    id: "alert_2",
    gameId: "overwatch",
    gameName: "Overwatch 2",
    alertType: "competitive",
    severity: "critical",
    triggeredAt: "2026-03-14T10:30:00Z",
    signalId: null,
    title: "Overwatch surpassed Marvel Rivals in health score",
    description: "Overwatch 2 health score surged +18 points (52 to 70) while Marvel Rivals held at 78. Gap closed from -26 to -8. Monitor for sustained shift vs. launch-week spike.",
    acknowledged: false,
  },
  {
    id: "alert_3",
    gameId: "destiny_2",
    gameName: "Destiny 2",
    alertType: "decline",
    severity: "critical",
    triggeredAt: "2026-03-13T14:00:00Z",
    signalId: "patch_note_frequency",
    title: "Content drought entering month 3",
    description: "No patch notes or content updates detected for 11 consecutive weeks. Community sentiment shifted negative (-0.4). Reddit post velocity up 12% but sentiment-adjusted contribution is negative, indicating frustration, not engagement.",
    acknowledged: true,
  },
  {
    id: "alert_4",
    gameId: "marathon",
    gameName: "Marathon",
    alertType: "sentiment",
    severity: "info",
    triggeredAt: "2026-03-12T16:45:00Z",
    signalId: "reddit_sentiment",
    title: "Community sentiment shifted positive",
    description: "Reddit sentiment for Marathon moved from neutral (0.1) to positive (0.5) following leaked content roadmap. Post velocity up 80% with constructive discussion tone. Historically, pre-announcement sentiment shifts correlate with content drops within 2 weeks.",
    acknowledged: true,
  },
  {
    id: "alert_5",
    gameId: "the_finals",
    gameName: "The Finals",
    alertType: "decline",
    severity: "warning",
    triggeredAt: "2026-03-11T11:00:00Z",
    signalId: "steam_concurrent",
    title: "Steam concurrent players down 15% WoW",
    description: "The Finals dropped from 13.3K to 11.3K concurrent players. This is the 4th consecutive week of decline. Twitch channel count also down 23%. No upcoming content announced.",
    acknowledged: true,
  },
  {
    id: "alert_6",
    gameId: "marvel_rivals",
    gameName: "Marvel Rivals",
    alertType: "spike",
    severity: "info",
    triggeredAt: "2026-03-10T08:20:00Z",
    signalId: "x_mention_velocity",
    title: "X/Twitter mentions up 28%: new character leak",
    description: "Leaked character reveal driving social media engagement. X mention velocity spiked with positive sentiment (0.5). YouTube video velocity also up 16% as creators cover the leak. Expected to sustain through official announcement.",
    acknowledged: true,
  },
  {
    id: "alert_7",
    gameId: "team_fortress_2",
    gameName: "Team Fortress 2",
    alertType: "spike",
    severity: "info",
    triggeredAt: "2026-03-09T19:00:00Z",
    signalId: "reddit_post_velocity",
    title: "Community update sparking Reddit activity",
    description: "Reddit post velocity up 15% with strongly positive sentiment (0.7). Community-driven update gaining traction. Steam concurrent players up 4.2%, modest but sustained over 2 weeks.",
    acknowledged: true,
  },
  {
    id: "alert_8",
    gameId: "halo_infinite",
    gameName: "Halo Infinite",
    alertType: "sentiment",
    severity: "info",
    triggeredAt: "2026-03-08T12:30:00Z",
    signalId: "reddit_sentiment",
    title: "Sentiment neutral: no catalyst detected",
    description: "Halo Infinite community sentiment remains flat at 0.1. No content updates, no major creator coverage. Reddit activity at baseline levels. Score stable but no growth drivers visible on horizon.",
    acknowledged: true,
  },
];

export function getAlertsByGame(gameId: string): AlertEvent[] {
  return alerts.filter((a) => a.gameId === gameId);
}

export function getRecentAlerts(limit = 10): AlertEvent[] {
  return [...alerts]
    .sort((a, b) => new Date(b.triggeredAt).getTime() - new Date(a.triggeredAt).getTime())
    .slice(0, limit);
}

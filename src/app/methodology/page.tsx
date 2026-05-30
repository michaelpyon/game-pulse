const STEPS = [
  {
    num: "01",
    title: "The Credit Score Model",
    body: `GamePulse treats game health like a credit score: a single composite
      number (0-100) built from multiple weighted signals. No single
      metric defines health. The score reflects overall vitality across
      player engagement, community sentiment, content cadence, and creator
      ecosystem activity.`,
  },
  {
    num: "02",
    title: "Four Sub-Indices",
    body: null,
    children: [
      {
        name: "Momentum",
        desc: "Player Activity",
        detail:
          "Steam concurrent players, peak trends, and platform-specific activity metrics. Measures whether people are actually playing.",
      },
      {
        name: "Community",
        desc: "Discourse Health",
        detail:
          "Reddit post velocity, sentiment analysis, Discord activity levels. Distinguishes healthy engagement from frustration-driven noise using sentiment-adjusted velocity.",
      },
      {
        name: "Content",
        desc: "Update Cadence",
        detail:
          "Patch frequency, content drop timing, developer communication signals. Detects content droughts before they impact player counts.",
      },
      {
        name: "Creator",
        desc: "Ecosystem Activity",
        detail:
          "Twitch hours watched, YouTube video velocity, X/Twitter mention velocity. Tracks the creator economy around each title as a leading indicator.",
      },
    ],
  },
  {
    num: "03",
    title: "Genre-Specific Weighting",
    body: `Each genre gets a custom weight configuration. PC shooters weight
      Steam data heavily; console titles weight Twitch and YouTube more.
      Mobile titles (coming soon) will weight app store signals and
      social media. Weights are defined in YAML configs and can be
      tuned per-client.`,
  },
  {
    num: "04",
    title: "Confidence & Reliability",
    body: `Every score includes a confidence band. Confidence is driven by
      signal coverage (how many of the available signals are active) and
      dynamic reliability ,  a per-signal quality score adjusted by data
      volume and recency. A game with 5/5 signals active and recent data
      gets High confidence. A game with 3/6 signals or stale data gets
      Medium or Low.`,
  },
  {
    num: "05",
    title: "Sentiment-Adjusted Velocity",
    body: `Raw engagement spikes can be misleading. A controversy drives Reddit
      posts and Twitter mentions up ,  but that's not healthy growth. GamePulse
      applies sentiment analysis to velocity metrics, dampening negative
      sentiment surges and amplifying genuine positive momentum.`,
  },
  {
    num: "06",
    title: "Peer Comparison",
    body: `Health scores are most useful in context. Each game is compared
      against a defined peer group within its genre. Peer percentile shows
      where a title ranks relative to its competitors, and the comparison
      table breaks down sub-index scores side by side.`,
  },
  {
    num: "07",
    title: "Alert System",
    body: `GamePulse monitors for four alert types: spikes (sudden engagement
      surges), declines (sustained drops), competitive shifts (peer
      ranking changes), and sentiment shifts (community mood changes).
      Alerts include severity levels and historical context to help
      distinguish signal from noise.`,
  },
];

const DATA_SOURCES = [
  { source: "Steam", signals: "Concurrent players, peak trends, review scores" },
  { source: "Twitch", signals: "Hours watched, channel count, viewer trends" },
  { source: "Reddit", signals: "Post velocity, sentiment, engagement depth" },
  { source: "YouTube", signals: "Video velocity, view counts, creator coverage" },
  { source: "X / Twitter", signals: "Mention velocity, sentiment, hashtag trends" },
  { source: "Discord", signals: "Server activity, member growth (coming soon)" },
];

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">How It Works</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          How GamePulse computes health scores
        </p>
      </div>

      <div className="mb-10 border border-amber-500/40 bg-amber-500/10 px-5 py-4 text-sm text-foreground">
        <p className="font-medium">Sample data, not a live feed.</p>
        <p className="mt-1 text-muted-foreground">
          The sources and signals below describe the intended signal
          architecture. The current build uses a fixed sample dataset (snapshot
          from March 2026), not live API connections. Scores are illustrative,
          not real-time measurements.
        </p>
      </div>

      <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
        {STEPS.map((step) => (
          <section
            key={step.num}
            className="border border-border bg-card px-6 py-5"
          >
            <div className="flex items-baseline gap-3 mb-3">
              <span className="font-mono text-xs text-cyan/60">{step.num}</span>
              <h2 className="label-upper text-foreground">{step.title}</h2>
            </div>

            {step.body && <p>{step.body}</p>}

            {step.children && (
              <div className="mt-3 space-y-3">
                {step.children.map((child) => (
                  <div
                    key={child.name}
                    className="border-l-2 border-cyan/20 pl-4"
                  >
                    <h3 className="text-foreground font-medium">
                      {child.name}{" "}
                      <span className="text-muted-foreground font-normal">
                        ({child.desc})
                      </span>
                    </h3>
                    <p className="mt-0.5">{child.detail}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}

        {/* Data sources */}
        <section className="border border-border bg-card px-6 py-5">
          <div className="flex items-baseline gap-3 mb-3">
            <span className="font-mono text-xs text-cyan/60">08</span>
            <h2 className="label-upper text-foreground">Intended Data Sources</h2>
          </div>
          <p className="text-xs text-muted-foreground">
            The signal architecture below is what GamePulse is designed to pull.
            None are connected in this sample build.
          </p>
          <div className="grid grid-cols-2 gap-3 mt-3">
            {DATA_SOURCES.map((ds) => (
              <div
                key={ds.source}
                className="border border-border bg-background/50 px-4 py-3"
              >
                <p className="text-foreground font-medium">{ds.source}</p>
                <p className="mt-0.5 text-xs">{ds.signals}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

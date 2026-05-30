# GamePulse

A genre-agnostic game health signal engine. GamePulse treats live-service game
health like a credit score: one transparent, confidence-scored number from 0 to
100, built from multiple weighted signals so no single metric defines whether a
title is healthy, stressed, or critical.

## What it does

- Scores 8 competitive titles across 2 genre weighting profiles (PC shooters and
  console shooters).
- Breaks each score into 4 sub-indices: Momentum (player activity), Community
  (discourse health), Content (update cadence), and Creator (ecosystem activity).
- Attaches a confidence band to every score, driven by signal coverage and a
  per-signal reliability estimate, so a low-coverage or stale game reads as Low
  or Medium confidence instead of false precision.
- Ranks titles into Watch, Stress, and Critical buckets and surfaces a recent
  signal feed.
- Documents the full scoring model on the `/methodology` page.

## Data honesty

This build runs on a disclosed sample dataset, a fixed snapshot labeled March
2026. It is not a live feed. The sample numbers are deterministic and reproducible
build to build (seeded from game, signal, and day), so the same input always
produces the same score. The methodology page carries a "sample data, not a live
feed" banner and lists the intended data sources below, none of which are
connected in this sample build.

## Intended signal sources (not yet connected)

- Momentum: Steam concurrent players and peak trends.
- Community: Reddit post velocity, sentiment, and Discord activity.
- Content: patch frequency and developer communication cadence.
- Creator: Twitch hours watched, YouTube video velocity, and X mention velocity.

Each genre uses its own weight configuration so the same signals count differently
across, for example, a PC shooter versus a console title.

## Tech

Next.js 16 (App Router, static generation), React 19, Tailwind CSS 4, Recharts,
and `next/og` for the social card.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # static generation of all routes
npm run lint
```

## Status

The repo is the source of truth. The current public deployment serves an older
build and does not yet reflect this Next.js codebase.

Built by Michael Pyon.
</content>
</invoke>

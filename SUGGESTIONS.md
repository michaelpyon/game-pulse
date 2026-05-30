# GamePulse, audience pass suggestions

## The evangelist (who loves AND shares this)

Picture a moderator or top poster in r/CompetitiveOverwatch, r/GlobalOffensive, or
r/LivestreamFail who also lurks r/TheFinals and r/destiny2. Call him a "live-service
death-watch" guy. He already screenshots SteamDB concurrent-player graphs and Twitch
viewer charts to argue in threads about whether a game is "dying" or "back." Today he
stitches that case together by hand across SteamDB, SullyGnome, and subreddit vibes.
He would screenshot a single clean 0 to 100 health score with a 30-day sparkline and a
ranked "Watch / Stress / Critical" table because it settles the argument in one image,
and the methodology page (Momentum / Community / Content / Creator, weighted signals)
makes him look credible instead of like a doomer. What makes him bounce in 5 seconds:
any whiff that the numbers are made up. If he senses fake precision presented as a live
feed, he closes the tab and never links it. That is why the data-honesty work is the
whole ballgame for this audience.

## Ground-truth findings (repo HEAD, verified)

Verified against repo HEAD on this pass.

- WORKS END TO END: `npm run build` compiles clean. 17 routes prerender, including
  the 8 per-game SSG pages, `/methodology`, `/alerts`, and the `/api/*` routes. The
  recharts "width(-1)/height(-1)" lines during static generation are pre-existing SSR
  container warnings, not build errors.
- DATA IS HONESTLY LABELED (prior pass): the methodology page carries a prominent
  "Sample data, not a live feed" banner and an "Intended Data Sources" section stating
  "None are connected in this sample build." The home hero says "sample data, Mar 2026."
  No `example.com` links, no Census/SEC/OSM style authority claims, no invented quotes
  about real people.
- FIXED THIS PASS, residual contradiction: the global footer in `src/app/layout.tsx`
  still said "Mock data for demonstration. Scores refresh daily." The "refresh daily"
  half directly contradicted the methodology page (fixed March 2026 snapshot). Changed
  to "Sample data for demonstration (snapshot, Mar 2026)."
- FIXED THIS PASS, nondeterministic sample data: `src/lib/data/health-snapshots.ts`
  used `Math.random()` in 5 places (signal `score`, `effectiveReliability`, and the
  per-day community/content/creator jitter). That meant every build produced different
  "sample" numbers, which undermines the one thing this audience cares about. Replaced
  with a deterministic seeded hash (`seededUnit`) keyed on game + signal + day, so the
  sample dataset is now stable and reproducible build to build. This was the prior
  pass's explicitly deferred cheap item.
- STILL TRUE, DEPLOY MISMATCH (flag, do not re-fix in repo): live
  https://game-pulse.vercel.app returns 200 at root but `/api/games` returns 404,
  confirming the live site is still the OLDER Vite build, not this Next.js repo. The
  fixed Next.js code has never been deployed.

## Prioritized plan

### Shipped wave 1

1. Made the sample dataset deterministic and killed the "refresh daily" footer
   contradiction. Files: `src/lib/data/health-snapshots.ts`, `src/app/layout.tsx`.

### Shipped wave 2

2. Replaced the boilerplate `README.md`. It is now a real GamePulse readme: what the
   app is, the disclosed March 2026 sample dataset (deterministic, not a live feed),
   the 4 sub-indices, the intended (not yet connected) signal sources, and a status
   note that the public deployment still serves an older build. Anyone the evangelist
   sends to the repo now sees the model and the honesty framing, not Next.js docs.
3. Tightened the share surface so the link preview and social card no longer imply a
   live tracker. Fixed the last user-facing "daily refresh" claim, which was still on
   the og:image card (`src/app/opengraph-image.tsx`), changed it to "sample dataset,
   Mar 2026". Rewrote the metadata description (`src/app/layout.tsx`) to name the
   signal model (Momentum, Community, Content, Creator) and disclose the sample
   snapshot. This removes the exact "fake live feed" smell from the one surface the
   evangelist screenshots and links. Deploy needed to reach users: yes (blocked below).

### Quick wins (still open, all S, additive)

4. Add a one-line "How the score is built" tooltip or caption on the home grid linking to
   `/methodology`. Files: `src/app/page.tsx`, existing tooltip UI. Why: lets the
   skeptic verify credibility in one click before sharing. Effort S. Deploy needed: yes.

### Bigger bets (flag for Michael, M to L)

5. RESOLVE THE DEPLOY MISMATCH. Point game-pulse.vercel.app at this Next.js repo so the
   already-fixed code actually ships. Until this happens, every fix above is invisible to
   real users. Effort S to M (config, not code). Deploy needed: yes. This is a Michael
   decision, not an in-repo change.
6. Wire one real signal end to end as a proof, ideally Steam concurrent players via the
   public Steam Web API or SteamDB-style source, behind the existing signal interface in
   `src/lib/engine/scoring.ts` and the `/api/games` route. Keep the rest sample until
   more sources are wired. Why: a single genuinely live number converts the evangelist
   from "neat demo" to "tool I check." Effort M. Deploy needed: yes.
7. Once 2-plus sources are live, add real Twitch hours-watched and Reddit post-velocity
   so Momentum and Community stop being illustrative. Effort L. Deploy needed: yes.
8. Add a public changelog or "data as of" timestamp driven by the actual fetch time once
   live, replacing the static "Mar 2026" label. Effort S after sources land. Deploy: yes.

## Honest summary

This app is well-built and now honestly labeled. The two remaining in-repo data-integrity
nits (build-nondeterministic sample scores, and a footer that still claimed a daily
refresh) are fixed in this pass. The only thing standing between the fixed app and the
evangelist is the deploy mismatch, which is a deploy/config decision for Michael, not a
code change.

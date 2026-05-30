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

### Highest leverage (done this pass)

1. Make the sample dataset deterministic and kill the "refresh daily" contradiction.
   Files: `src/lib/data/health-snapshots.ts`, `src/app/layout.tsx`. Why it matters to
   the evangelist: the entire value is a number he will defend in a thread. A number
   that silently changes per build, plus a footer claiming a daily refresh that does not
   exist, is exactly the "this is fake" smell that makes him bounce. Effort S.
   Deploy needed to reach users: yes (blocked by the deploy mismatch below).

### Quick wins (next, all S, additive)

2. Replace the boilerplate `README.md`. It is still stock create-next-app text. Add what
   GamePulse is, that it runs on a disclosed March 2026 sample dataset, and the intended
   signal sources. Why: anyone the evangelist sends to the repo currently sees generic
   Next.js docs. Effort S. Deploy needed: no.
3. Tighten metadata and social card copy so the share preview says "sample / signal
   model" rather than implying a live tracker. Files: `src/app/layout.tsx` metadata,
   `src/app/opengraph-image.tsx`. Why: the screenshot and link preview are the share
   surface. Effort S. Deploy needed: yes.
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

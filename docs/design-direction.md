# MakeMeFound Design Direction

## Positioning

**Customer acquisition and revenue systems.** We find what's blocking a business's growth,
then fix it — through targeted outreach and referral partnerships, conversion optimization,
and revenue systems & automation. Content production is offered when it supports growth.

- Hero: "Find what's blocking your growth. Fix it."
- Primary CTA: **Discuss Your Growth Goals** (everywhere). Secondary: **See How We Work**.
- Principle: investigate before recommending. Sell outcomes and clearly defined work, not AI.
  AI agents are one implementation method, never the headline.

Early-stage and honest: no clients, case studies, results or testimonials. "Example
engagements" are labelled as illustrative. YouTube work is from our own channels and is
labelled as not client results.

Homepage order: Hero (+ service index) → Problem → Services → How we work → Example
engagements → Content production (reel + own channels) → About → Final CTA.

## Principles (what separates a studio site from a template)

1. **Type leads.** The hero is typographic; real work (the reel) appears where it is relevant.
2. **One typeface.** Geist, weight 500, tight tracking, sentence case. Emphasis comes from
   white vs. grey — no decorative serif accents, no monospace labels, no ALL-CAPS tags.
3. **Editorial grid.** Every section: hairline rule, small grey label in the left 3 columns,
   content in the right 9.
4. **Hairlines over boxes.** No bordered cards, glows, gradients, marquees or cursor effects.
5. **Only real work.** No placeholder slots, mock dashboards or invented metrics.
6. **Short copy, generous space.** Section padding 96–176 px; one CTA repeated sparingly.

## Tokens (`app/globals.css`)

| Token | Value | Use |
| --- | --- | --- |
| `bg` / `bg-raised` / `surface` | `#0a0a0b` / `#0f0f11` / `#141416` | Page, media backgrounds |
| `fg` / `fg-muted` / `fg-subtle` | `#f5f5f4` / `#9a9a9f` / `#66666c` | Text hierarchy |
| `line` / `line-strong` | 10% / 18% white | Hairlines |
| `accent` | `#8b7bff` | Logo, focus rings, selected states only |

Type: `.t-display` (2.6→6 rem), `.t-h2` (2→3.75 rem), `.t-h3`, `.t-lead`, `.t-body`, `.t-small`.

## Components

- `Section` — the editorial grid shell.
- `HeroReel` — muted autoplay + loop, pauses off-screen, "Play with sound" restarts with
  audio, no autoplay under `prefers-reduced-motion`. MP4 (H.264/AAC) first, WebM fallback.
- `WorkPlayer` — YouTube thumbnail; the embed loads only on click.

## Showreel

Generated in code — see `tools/reel/README.md` to edit or re-render.

## Leads

Every booking CTA opens one intake form → `/api/growth-call` → Google Apps Script
(`GOOGLE_SHEET_WEBHOOK_URL`), plus Postgres/Resend if configured. Payload keys unchanged:
`businessName` = company, `website` = website, `serviceArea` = interests (comma-separated),
`idealAccounts` = goals and where growth feels stuck.

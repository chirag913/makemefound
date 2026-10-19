# MakeMeFound Design Direction

## Positioning

**YouTube content production studio for business creators.**
Hero: "You bring the expertise. We make the content work harder."
Primary CTA: **Book a Call** (final section: **Book an intro call**). Secondary: **See our work**.

Early-stage and honest: no client counts, client results or testimonials. Real footage comes
from channels we run (The Beyond, Suspect Stories) with dated public view counts.

## Principles (what separates a studio site from a template)

1. **The reel is the hero.** Real motion work, autoplaying muted, one tasteful sound toggle.
2. **One typeface.** Geist, weight 500, tight tracking, sentence case. Emphasis comes from
   white vs. grey — no decorative serif accents, no monospace labels, no ALL-CAPS tags.
3. **Editorial grid.** Every section: hairline rule, small grey label in the left 3 columns,
   content in the right 9.
4. **Hairlines over boxes.** No bordered cards, glows, gradients, marquees or cursor effects.
5. **Only real work.** No placeholder slots or mock UI on the site itself.
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
`businessName` = channel, `website` = channel URL, `serviceArea` = services,
`idealAccounts` = channel & workflow.

# MakeMeFound Design Direction

## Positioning

**YouTube content production & growth studio for business creators.**
"We help business creators turn their expertise into compelling YouTube content through
thoughtful editing, content packaging, and short-form repurposing."

- Hero: "You bring the expertise. We make the content *work harder.*"
- Primary CTA: **Book a Call** (final section: **Book an Intro Call**)
- Secondary CTA: **See Our Work**

We are early-stage. The site never claims client counts, client results or testimonials.
Real footage comes from channels we run ourselves (The Beyond, Suspect Stories) and is
labelled "In-house" with public YouTube view counts dated in `VIEWS_CHECKED`. Every media
slot without real footage is labelled "Sample" or "Placeholder".

## Visual language — "edit suite"

Deep charcoal, white type, one violet accent. Media is presented the way an editor sees
it: program monitors, timecode, rule-of-thirds guides, burned-in captions, NLE timelines,
vertical cuts. Editorial headlines carry the argument; the media carries the craft.

Avoid: stock photos, emoji, glassmorphism, floating blobs, random gradients, fake metrics.

## Tokens (`app/globals.css`)

| Token | Value | Use |
| --- | --- | --- |
| `bg` / `bg-raised` | `#09090b` / `#0e0e11` | Page, alternating sections |
| `surface` / `surface-2` | `#131317` / `#1a1a1f` | Panels, frames |
| `fg` / `fg-muted` / `fg-subtle` / `fg-faint` | `#f4f3f7` … `#45434d` | Text hierarchy |
| `line` / `line-strong` / `line-hover` | 8 / 14 / 24% white | Hairlines |
| `accent` / `accent-strong` | `#8b7bff` / `#a597ff` | Emphasis, active, focus |
| `rec` | `#ff4d4d` | REC dot and form errors only |

Primary buttons are white on charcoal; violet is never a large fill.

## Typography

- **Geist** 600 for display (−0.05em tracking), body in Geist.
- **Instrument Serif italic** for one emphasis phrase per headline (`.t-em`), usually violet.
- **Geist Mono** for labels (`.t-label`) and timecode/data (`.t-code`).

## Components

- `.panel` — surface card with hairline border and a cursor-following violet spotlight.
- `.frame` + `MediaFrame` — monitor frame with grain, optional REC, timecode, thirds guides.
- `Timeline` — NLE-style tracks (titles, B-roll, A-roll, voice, music) with markers and playhead.
- `WorkPlayer` — sample slot, or click-to-load YouTube (`youtube-nocookie`), or self-hosted video
  with `preload="none"` and no autoplay with sound.
- `BeforeAfter` — accessible range-input comparison of raw vs edited.
- `Filmstrip` / `KineticBand` — slow infinite marquees; pause on hover.

Component classes live in `@layer components` so Tailwind utilities can override them.

## Motion

Word-by-word headline rise, live 25fps timecode (only while visible), playhead sweep,
filmstrip and type marquees, reveal-on-scroll, spotlight on hover. All disabled under
`prefers-reduced-motion`.

## Section order

Nav (Services / Our Work / Process / About + Book a Call) → Hero + montage + filmstrip →
01 Services → 02 Our Work → kinetic band → 03 Process → 04 Why MakeMeFound (About) →
Intro call CTA → Footer.

## Adding real work

Edit `lib/portfolio.ts`: set `sample: false` and add `youtubeId`, or `videoSrc` + `poster`
(files in `public/work/`). Mark one entry `featured: true` — it fills the hero monitor and
leads the Our Work grid. Only publish work you have permission to share, and refresh
`views` / `VIEWS_CHECKED` when you update counts.

## Brand mark

`public/logo-mark-violet.png`, `app/icon.png`, `app/apple-icon.png` and `app/favicon.ico`
are recolored to the violet accent. The file was renamed so caches can't serve the old blue.

## Leads

Every booking CTA opens one intake form that posts to `/api/growth-call`, which forwards to
the Google Apps Script web app (`GOOGLE_SHEET_WEBHOOK_URL`). Payload keys are unchanged:
`businessName` = channel, `website` = channel URL, `serviceArea` = services,
`idealAccounts` = channel & workflow.

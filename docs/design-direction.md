# MakeMeFound Design Direction

## Positioning

**We find where your growth is stuck — then fix it.**
Problem → Diagnosis → Fix → Automation. Technology is the delivery mechanism; the
customer buys the outcome. AI is a tool on the bench, never the headline.

- Hero: "Your growth is stuck somewhere *specific*. We find it. Then we fix it."
- Primary CTA: **Find My Bottleneck** (opens the diagnosis request form)
- Secondary CTA: **See how we work** (scrolls to the process)

## Visual language — "diagnostic instrument"

The site should feel like the output of someone who actually tested your business:
reports, logs, journey maps, findings with evidence. Editorial type carries the
argument; interface fragments carry the proof.

Avoid: stock photos, robots, purple/blue AI gradients, glassmorphism, icon grids,
generic dashboards, invented results.

## Tokens (see `app/globals.css`)

| Token | Value | Use |
| --- | --- | --- |
| `bg` | `#0a0a09` | Page (warm ink) |
| `bg-raised` | `#0f0f0e` | Alternating sections |
| `surface` / `surface-2` | `#141413` / `#1a1a18` | Cards, artifacts |
| `fg` | `#edebe6` | Primary text (paper) |
| `fg-muted` / `fg-subtle` / `fg-faint` | `#a3a19a` / `#6f6d67` / `#4a4944` | Hierarchy |
| `line` / `line-strong` / `line-hover` | 8% / 14% / 24% paper | Hairlines |
| `signal` | `#ff5a1f` | **Only** means leak / attention |
| `ok` | `#62d49b` | **Only** means fixed / resolved inside artifacts |

Primary buttons are paper-on-ink, not colored — the signal color is reserved.

## Typography

- **Geist** — display and body. Display is weight 500 with tight tracking (−0.048em).
- **Geist Mono** — labels, indices, annotations, artifact data (11–12px, uppercase labels).
- **Instrument Serif italic** — one emphasis word per headline (`.t-em`), never a sentence.

Scale: `.t-display` (clamp 2.6→6rem), `.t-h2` (2.1→4rem), `.t-h3` (1.35→1.75rem),
`.t-lead` (1.075→1.25rem), `.t-body` (0.975rem), `.t-mono`, `.t-mono-sm`.

## Spacing & grid

- Container 1240px + fluid gutter (20→40px). 12-column grid at `lg`.
- Section rhythm: `--section-y` = clamp(96px, 12vw, 176px).
- Every section opens with `SectionRule`: hairline + mono index + label (+ aside).
- Alternate `bg` / `bg-raised` to create rhythm without heavy dividers.

## Borders, radius, shadows

- 1px hairlines everywhere; hairline grids (`gap-px` on `bg-line`) for tiled content.
- Radius: 6 / 10 / 16 / 22px. Pills for chips and buttons.
- Shadows only on floating artifacts (`.artifact`) and the modal.

## Cards & artifacts

- `.card` — surface, hairline border, inset top highlight. Hover: border strengthens, 2px lift.
- `.artifact` — window-like fragment with an `.artifact-bar` (mono title + "Sample"/"Example" label).
  Every artifact is labeled illustrative. No invented client results.

## Motion

- Reveal on enter (opacity + 14px, 700ms, ease-out-expo), once.
- Hero journey scan: steps pass, booking leaks, fix ships, loop — only while on screen.
- Process: scroll-linked progress rail and active step.
- Hover: underline wipes, arrow nudge, border strengthen.
- `prefers-reduced-motion`: everything static; hero shows the finding.

## Section order

1. Nav — Work / How It Works / Solutions / About + CTA
2. Hero — statement, subcopy, CTAs, live journey audit
3. 01 The problem — interactive acquisition chain (what you hear vs. what's broken)
4. 02 The difference — FIND → PROVE → FIX → AUTOMATE + "If / Then" rule
5. 03 Problems we solve — pattern cards (symptom → break → fix)
6. 04 Solutions — Conversion Path Rescue, Referral Channel Build, Revenue Automation
7. 05 How we work — Find, Diagnose, Build, Automate, Improve
8. 06 Evidence — sample findings report
9. 07 Technology — capabilities with "when it earns its place"
10. 08 FAQ
11. Final CTA — "There's probably a bottleneck somewhere. Let's find it."

## Copy rules

Short sentences. Specific nouns. Plain English. Never: unlock, leverage, revolutionize,
10x, cutting-edge, game-changing, synergy, AI-powered solutions, end-to-end, growth engine,
transform your business.

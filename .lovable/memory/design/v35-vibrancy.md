---
name: v3.5 vibrancy lock
description: Gold + ember duet, weight-600 H2s, AI transparency chip rule, snappier 240ms easings
type: design
---

# v3.5 — Final Polish (locked)

## Color duet
- **Amber → Sanctuary Gold** `oklch(0.74 0.165 70)` (~#E8A33E). Replaces the chocolate `oklch(0.55 0.142 55)`. Primary brand accent.
- **Ember** `oklch(0.62 0.20 35)` (~#E26B3F). Used SPARINGLY: AI-active states only, the matched cohort node halo, success filaments, "you are here" indicators. Never an area fill.
- **Navy** deepened to `oklch(0.18 0.045 265)` for stronger contrast against brighter amber.

## Type weight
- All section H2s: weight 600 desktop, 550 mobile.
- Hero headline: weight 600, letterspacing -0.028em.
- Eyebrows: amber-bright (no `/90` muting), 0.32em tracking.
- `.text-luxe` utility: letterpress shadow + cv01 contextual alternates. Use on any photo-overlaid headline.

## AI transparency rule
Every AI-composed surface must show an `<AIPresenceChip />`:
- "Composed with AI assist · explain"
- 3-line popover: written by us, AI for tone, never for clinical claims, your text leaves nothing.
- Variants: `ivory` (over navy bg) and `navy` (over ivory bg).

## Motion
- Default ease: `cubic-bezier(0.32, 0, 0.18, 1)` for snappy out-curves.
- Section reveals: threshold 0.05 (was 0.15) — fire as user starts scrolling in.
- ConciergeForm step transitions: 240ms (was 320ms).
- Cohort match: word-cascade rationale + breathing halo (3.4s scale 0.92↔1.06).
- Hero CTA: gradient-conic ember halo on hover (desktop only).

## Mobile
- Hero `min-height: min(100svh, 720px)` (was `100svh`).
- SectionRail (mobile-only): 8 dots on right edge, lights amber as section enters view.
- All min-tap targets ≥ 44×44 verified.
- CursorCompanion disabled on touch + iOS Safari.

## OG cards
Per-route og:image at /, /professionals, /privacy-policy, /terms. 1200×630.

## Imagery rules
- NO wine/glasses on the porch. NO golf course. NO cold/empty clinical.
- Journey 6 caption: "Two chairs. One ridge. The conversation you didn't know you needed."
- Cohort gets a hand-on-journal portrait strip above the headline.

## Always-warm token cascade
Every component already pulls from `--amber` / `--ember` / `--navy` / `--ivory`. One token change cascades site-wide.

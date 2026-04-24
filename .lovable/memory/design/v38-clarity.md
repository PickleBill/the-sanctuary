---
name: v3.8 Clarity Pass
description: Logo cleanup, gallery dynamics, mobile contrast — finalized in v3.8
type: design
---

# v3.8 — Clarity & dynamics

## Logo (Navbar SanctuaryMark)
- ONE ridge stroke (amber, 1.75px, rounded caps).
- ONE sun, fully clear of the ridge silhouette (cx=26, cy=9, r=2.6).
- Wordmark is "The Sanctuary" alone — no "Blue Ridge" eyebrow.
- Negative space is the design. Do not re-add a back ridge, horizon line, or eyebrow.

## Gallery
- 6 panels in a 12-col mosaic: Suite (tall) · Grounds · Trail · Boardroom · Court · Clinical.
- Every image gets `.gallery-kenburns` (slow drift, paused on hover/reduced-motion).
- Every panel exposes a clear "open" affordance:
  - Desktop: amber title underline draws on hover + ember-tinted plus icon.
  - Mobile: persistent amber "Open →" chip top-right.
- The sibling-desaturate-on-hover is a magic moment — keep it.

## SynergyMap mobile
- Mobile must preserve the visual contrast between Clinical and Holistic — not just textual.
- Pattern: split-stage card. Top half navy (Clinical, ivory text), bottom half ivory (Holistic, navy text), amber filament + dot on the seam.
- Auto-advance is 6s (not 3.8s — that read as panicky).
- `onTouchStart` pauses the timer (`held` state); `onTouchEnd` resumes unless user has interacted (locked).
- Active pager dot has a soft ember glow.

## SynergyMap desktop
- Faint row dividers (`color-mix(in oklab, var(--ivory) 8%, transparent)`) — structural, makes pairing legible.
- Whole row is a button; opens a modal with one sentence of pair context.
- Hover keeps amber connector grow + amber row text.

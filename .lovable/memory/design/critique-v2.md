---
name: critique v2
description: Honest UX critique at v1.4 (Phase D), recalibrated 7=publishable / 8=memorable / 9=screenshot-worthy / 10=forwarded unprompted
type: design
---

# v1.4 critique — recalibrated

Replaces critique-v1 (which scored everything 8–9 while the user was looking at a site that didn't compel them — calibration failure).

## Scoring scale
- 7 — publishable
- 8 — memorable
- 9 — screenshot-worthy
- 10 — forwarded unprompted

## Per-section scores after Phase D fixes

| Section | Score | Notes |
|---|---|---|
| Hero | 8 | 100svh, single CTA, asymmetric 7/12 grid, eyebrow no longer redundant with wordmark |
| Gallery | 8 | Mosaic + stats; eyebrow split-on-first-word still fragile but acceptable |
| SynergyMap | 8 | Filament-draw initial-state race fixed (backwards fill); ambient glow at 25% |
| ChairmansCottage | 9 | Single editorial paragraph + chips. Brand voice. |
| Resonance | 8 | Now follows 8/12 family; focus-line works (group/group-focus-within) |
| Amenities | 8 | Header rebuilt to roman+italic 8/12 family; "Drag to explore" microcopy removed |
| Leadership | 9 | Two portraits + amber-rule blockquote + "names withheld" — strongest section |
| SevenDecisions | 9 | Asymmetric mosaic + tabular weight indicators reads as dossier, not marketing |
| Process | 8 | Filament timeline + geography + cover-story footnote |
| Objections | 8 | Quiet accordion, answers don't sound like marketing |
| ConciergeForm | 8 | Header rebuilt to family; copy now editorial |
| Footer | 8 | Invariants rail + WCAG-passing eyebrows |
| Navbar | 8 | Hierarchical mobile drawer, contrast fixed |

Average ≈ 8.2. Publishable to advisors with confidence.

## Gaps that block 9+ across the board (depend on the user, not the AI)

1. Real Medical Director name + photo (currently "[Name forthcoming]" + placeholder portraits). Without this, Leadership ceiling is 9 not 10.
2. A specific WNC parcel — current copy says "212 Private Acres" but the parcel itself is unchosen.
3. Real outcomes prose with consented-disclosure language from the Clinical Director (currently boilerplate).
4. A single signature photograph — the one the brain remembers. Hero rotates four; one of them needs to be the iconic one.

## Technical audit findings (all fixed this turn)

1. **Critical:** Root meta was "Lovable App" + generic og:image — polluted every page. Removed from root; leaf routes own per-page meta.
2. **WCAG AA contrast:** `text-amber/80` on navy promoted to full `text-amber` in Footer + Navbar drawer (4.5:1 minimum for body text on dark surface).
3. **Hero viewport:** `min-h-screen` (100vh) → `100svh` to respect mobile Safari browser chrome.
4. **WCAG 2.3.3:** Centralized `prefers-reduced-motion` guard in `scrollToId` helpers (Hero, Navbar, Footer) + global CSS rule disabling animations, transitions, and smooth scroll.
5. **Filament-draw race:** keyframe `from { scaleX(0) }` was being preempted by Tailwind utility — added `transform: scaleX(0)` baseline + `backwards` fill mode so the line never flashes at full width during animation-delay.
6. **Resonance focus-line:** `peer-focus`/`group-focus-within` had no `peer`/`group` parent. Added `group` class to label so the amber underline animates on focus.
7. **Tap targets:** Hero "Speak with Intake" raised from 44 → 48px; "For Healthcare Professionals" gets `py-2 min-h-[36px]` for 24×24 AAA.
8. **viewport-fit=cover** added so iOS safe-areas (already used in Navbar drawer) actually compute.

## What did NOT change (deliberate)

- Resonance is still a feature inside a brochureware site. It pulls its weight on the new mobile composition but stays at 8 because the *concept* of "let our LLM read your sentence" is in tension with the "we do not pay referral fees" voice. Will revisit if the user wants to remove or quiet it further.
- Amenities horizontal-scroll ledger on desktop kept — drag is discoverable from the snap, no microcopy needed.
- The four hero photos rotate; we have not committed to one signature image yet.

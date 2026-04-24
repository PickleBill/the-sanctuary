---
name: No noisy lines
description: Decorative hairlines are forbidden — they make the site look cluttered. Reserved only for hero amber rule + active link/CTA underlines.
type: constraint
---

**Forbidden:**
- Section-boundary filaments (`section-filament-top`, `section-filament-bottom`)
- Mobile right-edge "you-are-here" rails / dot columns
- Hero frame indicator dots (cinemagraph progress)
- JourneyStrip horizontal progress filaments + dot ledgers
- Hero "mini-network" SVG decorations
- Cursor companion ghost dots
- Any thin line used as decoration, navigation, progress, or "tone-setting"

**Permitted (rare, intentional):**
- The single amber rule under the hero headline
- Active-state 2px underlines on links/CTAs (draw on hover/focus only)

**Why:** Hairlines are visual debt. They look refined in isolation but compound into noise. If a line "sets a tone" it gets cut. The brand carries itself through type, color, and photography — not garnish.

**How to apply:** Before adding any `<span className="h-px ...">` or `border-t/border-b` for decoration, check this rule. Use whitespace and type weight instead.

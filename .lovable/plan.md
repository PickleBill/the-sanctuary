# Phase 1 Closeout — status

## Done in code (this pass)

- **P1.1 Home arrival** — `router.tsx` uses `getScrollRestorationKey: location => location.pathname`; logo always scrolls to top.
- **P1.2 Logo** — single balanced two-peak mark with sun in negative space; favicon updated.
- **P1.3 Cohort consolidation** — duplicate plate/reveal removed; rationale + "continue privately" CTA absorbed into the room sheet (one primary story + one secondary path).
- **P1.4 Synergy rebuild** — distinct ivory section identity (no longer navy-on-navy with JourneyStrip). Symmetrical desktop diptych: navy Clinical rail | amber seam | ivory Holistic rail. Modal removed; pair context appears inline below the active row. Mobile split-stage card preserved.
- **P1.5 Mobile type rhythm** — `.hang-punct { text-indent: -0.4em }` was running on every browser/viewport and shoving headlines off the left edge on mobile. Now restricted to desktop AND only when the browser supports `hanging-punctuation` (Safari today). Eyebrow tracking softened on mobile (0.24em mobile / 0.34em desktop) so the eyebrow no longer competes with the headline.
- **P1.6 Concierge entry** — added a clear header above the prose stepper ("Question 01 of 05 · ~30 seconds · Reply within 4 hours") so the form's structure is immediately obvious. Inline inputs now have a faint amber field so the typing target is unmistakable.

## What to verify in the preview

Please confirm at 402px and at desktop:

1. Hero headline at 402px no longer compresses left of the column — the period/comma should sit on the line, not pull the H1 off the screen.
2. Synergy section: the diptych should now read as ivory + navy split (not navy on navy). Hovering or tapping a row should fade in the "Why it holds" line below.
3. Concierge form: the first step should be visually obvious — eyebrow, "Question 01 of 05", a sentence with a clearly-marked input.
4. Logo and home-arrival behavior from the previous pass should still hold.

Reply with any specific failures and I'll fix them in place rather than starting Phase 2.

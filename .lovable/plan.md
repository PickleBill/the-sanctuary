# Phase 1 Closeout — COMPLETE (v3.9.1)

Status: shipped. The 8-panel mosaic gallery is restored at the top; the bottom
"estate, briefly" strip is now a clean 2×3 six-panel recap. Mobile hero
text-indent forced to 0; logo gap tightened on small screens. Ready for
Phase 2 (hardening: per-route SEO, error/notFound boundaries, perf pass,
real OG images).

---

## The mismatch you spotted

Right now the layouts are inverted from what you wanted:

- **Top "Estate" Gallery** (component: `Gallery.tsx`) — currently a 6-panel mosaic. You want the **earlier 8-panel asymmetric mosaic** restored here (the one with the horse / varied tile sizes, no overlay-modal-on-hover noise).
- **Bottom "The estate, briefly" strip** (inside `Amenities.tsx`) — currently a 5-up tile row. You want this to become the clean **2×3 six-panel grid** (matching the 6 panels currently in the upper Gallery).

We'll swap the two roles and clean up both.

---

## What changes

### 1. Top Gallery — restore the 8-panel asymmetric mosaic

Rebuild `src/components/site/Gallery.tsx` as an 8-tile mosaic on a 12-column grid, with varied row/column spans for editorial rhythm. Same 8 frames the v3.7 mosaic used:

```text
Desktop (lg, 12 cols, ~3 rows):
┌───────────────┬───────────┬───────────┐
│  Suite (tall) │  Grounds  │   Horse   │
│   col 7×2     │   col 5   │   col 5   │
│               ├───────────┴───────────┤
│               │   Trail (wide col 5)  │
├───────┬───────┼───────────┬───────────┤
│ Court │ Sauna │ Boardroom │  Clinical │
│ col 3 │ col 3 │   col 3   │   col 3   │
└───────┴───────┴───────────┴───────────┘
```

Eight frames (using existing assets):
1. **Private Suite** (tall, col-span-7 row-span-2) — `gallery-suite-v2.jpg`
2. **Therapeutic Grounds** (col-span-5) — `gallery-grounds-v2.jpg`
3. **Morning Ride** (col-span-5) — `journey-2-horse.jpg` *(the "horse" tile you missed)*
4. **The Trail** (col-span-5, wide, sits beneath Grounds + Horse) — `day-3-trail.jpg`
5. **The Court** (col-span-3) — `amenity-pickleball.jpg`
6. **Sauna & Recovery** (col-span-3) — `day-4-sauna.jpg`
7. **Executive Boardroom** (col-span-3) — `gallery-boardroom-v2.jpg`
8. **Clinical Wellness** (col-span-3) — `gallery-clinical-v2.jpg`

Mobile collapses to a single column with each tile at `aspect-[4/5]` to keep the rhythm honest at 402 px wide.

Keep all the v3.8 polish that worked:
- `.gallery-kenburns` slow drift (paused on `prefers-reduced-motion`).
- Sibling-desaturate-on-hover magic moment.
- Title underline draws on hover; corner expand glyph on desktop; persistent amber "Open →" chip on mobile.
- The lightbox stays exactly as it is — no overlay-modal-on-hover, no horse-cluttered tile chrome.

Update the `v38-clarity.md` memory note from "6 panels" to "8 panels" so the rule sticks.

### 2. Bottom strip — replace with the clean 2×3 six-panel grid

Inside `src/components/site/Amenities.tsx`, replace the existing 5-tile "The estate, briefly" block (lines ~179–222) with a **2×3 grid** that mirrors the six panels currently in the upper gallery. This is the layout you said is "pretty good" in the screenshot.

- Desktop: `lg:grid-cols-3` (3 cols × 2 rows). Mobile: `grid-cols-2`.
- Reuse: Suite · Grounds · Trail · Court · Boardroom · Clinical.
- Same caption pattern (small-caps label + italic line), same Ken Burns drift.
- Eyebrow stays "The estate, briefly". Right-side counter changes from "Five rooms · One estate" → "Six rooms · One estate".
- No interactive lightbox here (the bottom strip is a quiet recap, not the primary gallery).

### 3. Small cleanups while we're in there

These are quick, low-risk, in-flight items I noticed:

- **Anchor jump still lands at the bottom screen** (you mentioned this). The lightbox's "Speak with intake" CTA scrolls to `#concierge-form`, but the section itself is `id="concierge"`. I'll add a real `id="concierge-form"` anchor on the form's first field so the jump targets the input, not the form bottom.
- **Mobile hero `text-indent`** — the `.hang-punct` selector in `styles.css` is already gated to desktop Safari from the last pass, but the **Hero** title still uses inline `letter-spacing: -0.02em` with no explicit `text-indent: 0`. I'll force `text-indent: 0` on hero h1 at < 640 px to remove any residual visual nudge.
- **Logo wordmark spacing** — there's a 12 px gap between the mark and "The Sanctuary" on mobile. I'll tighten to 8 px so the mark reads as part of the name, not adjacent to it.

Nothing else gets touched. No new sections, no new copy, no new dependencies.

---

## Files I'll edit

- `src/components/site/Gallery.tsx` — rebuild as 8-panel mosaic.
- `src/components/site/Amenities.tsx` — bottom strip becomes 2×3 / six panels.
- `src/components/site/ConciergeForm.tsx` — add `id="concierge-form"` to the first input wrapper.
- `src/components/site/Navbar.tsx` — tighten mark↔wordmark gap on mobile.
- `src/styles.css` — explicit `text-indent: 0` for hero h1 on small screens.
- `.lovable/memory/design/v38-clarity.md` — update Gallery rule from 6 → 8.
- `.lovable/plan.md` — log "Phase 1 closeout complete; 8-panel mosaic restored."

## Acceptance checks (I'll verify in the preview before declaring done)

1. Top Gallery shows 8 tiles with varied sizes; the horse tile is back; the Suite is tall on the left.
2. Bottom "The estate, briefly" is exactly 6 tiles in a 2×3 grid (mobile 2-col, desktop 3-col).
3. Lightbox still opens from any top-gallery tile; bottom strip has no lightbox.
4. Lightbox CTA scrolls to the first form field, not below it.
5. Hero title aligns flush-left at 402 px (no compression / phantom indent).
6. Build compiles clean.

After this lands and you confirm, **we're truly clear of Phase 1** and I'll open Phase 2 (hardening: SEO per-route, error/notFound boundaries, performance pass, real OG images).

Reply **Approve** to proceed, or call out anything you want changed before I start.

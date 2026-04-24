# v3.8 — Ship the Three Refinements

Three focused moves. No new sections. Done in one push.

---

## Move 1 — Logo & wordmark cleanup (`Navbar.tsx`)

The current mark crowds the sun behind two ridges with a horizon line — it reads as visual noise at navbar size. New mark:

- **One ridge stroke** — single fluid amber path, 1.75px, rounded caps. The horizon line and back ridge are gone.
- **Sun moved upper-right** to `(cx=26, cy=9, r=2.6)` — fully clear of the ridge silhouette, sitting in real negative space.
- **Wordmark becomes "The Sanctuary"** alone — the "Blue Ridge" eyebrow above is removed. Single line, Literata 600, ivory, with `cv01` + `ss01` alternates.
- Compact (scrolled) sizes: 28px mark, 1.1rem text. Full: 34px mark, 1.28rem text.

Net effect: cleaner, flowing, breathable. Reads as a real wordmark, not a stamp.

---

## Move 2 — Estate Gallery expanded to 6, more dynamic (`Gallery.tsx`)

Add two panels, give all six visible motion, keep the lightbox flow.

**New panels:**
- **The Trail** — `day-3-trail.jpg`. *"Three miles of soft-surface trail through white-oak canopy. The land does most of the work."*
- **The Court** — `amenity-pickleball.jpg`. *"Pickleball at golden hour. A peer who outranks the small talk."*

**New 6-panel mosaic** (12-col grid):
- Row 1: Suite (col-span-7, row-span-2, tall) · Grounds (col-span-5)
- Row 2: ↑ Suite continues · Trail (col-span-5)
- Row 3: Boardroom (col-span-4) · Court (col-span-4) · Clinical (col-span-4)
- Row 4: *(removed — Clinical no longer full-bleed; the trio reads as a balanced base)*

**Dynamic affordances (all 6 panels):**
- **Slow Ken Burns drift** — each image slowly scales from 1.00 → 1.06 over 18s on an infinite alternate, paused on `prefers-reduced-motion`. Different start delays per panel so they don't drift in sync.
- **Hover state strengthened** — caption rises 4px, amber underline draws beneath the title (240ms), the existing expand-icon glows ember.
- **Persistent "→ Open" chip on mobile** — small amber pill bottom-right of every panel so touch users see the affordance without hover.
- The existing sibling-desaturate-on-hover stays (it works).

Lightbox itself stays as-is — already strong.

---

## Move 3 — SynergyMap, more dynamic with restored visual contrast (`SynergyMap.tsx`)

The mobile card was a plain panel that scrolled too fast and lost the clinical/holistic contrast that made the desktop weave work. Rebuild as a literal **split stage**:

**Mobile rebuild — split-stage card:**
- Single card with **two stacked panels**: top half **navy** (Clinical, ivory text), bottom half **ivory** (Holistic, navy text). Real color contrast — you *feel* the duality before reading it.
- A short **amber filament + dot** sits exactly on the seam, visually weaving the two halves.
- **Auto-advance slowed from 3.8s → 6s.** First interaction (swipe / tap pager / arrow / tap card) locks auto-advance — same lock pattern, just calmer cadence.
- **Tap-and-hold to pause** — `onTouchStart` pauses the timer, `onTouchEnd` resumes (unless already locked).
- Pager dot for the active item gets a soft ember glow so the "you are here" reads at a glance.

**Desktop weave enhancements:**
- Add a faint horizontal divider between rows (`color-mix(in oklab, var(--ivory) 8%, transparent)`) so the grid reads as paired entries, not a flat list. This is structural, not decorative — it earns its place by making the pairing legible.
- Whole row becomes clickable; clicking opens a small modal showing the pair larger with one sentence of context (e.g. *"Genetic & metabolic panel pairs with the long table because nutrition turns the markers."*). Eight pair-context sentences; quick to write, big payoff.
- Hover keeps the existing amber-fill connector animation.

**WeekRhythm footer strip** stays unchanged — it's working.

---

## Files changed

| File                                       | Change                                                                                                 |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `src/components/site/Navbar.tsx`           | New logomark — one ridge stroke + separated sun. Wordmark to "The Sanctuary" alone (no eyebrow).       |
| `src/components/site/Gallery.tsx`          | 6 panels (add Trail + Court). Ken Burns drift on all panels. Mobile "→ Open" chip. New 12-col mosaic.  |
| `src/components/site/SynergyMap.tsx`       | Mobile: navy/ivory split-stage card, 6s auto, tap-to-hold. Desktop: row dividers + click-to-modal pair context. |
| `src/styles.css`                           | Add `@keyframes kenBurns` + `.gallery-kenburns` utility. Pair-modal animation reuses `.lb-panel`.      |
| `.lovable/memory/design/v38-clarity.md`    | NEW — codify: logo = one ridge + separated sun; gallery panels always have motion + clear affordance; mobile must preserve visual contrast not just textual. |
| `.lovable/memory/index.md`                 | Add v3.8 reference line.                                                                               |

---

## v3.8 exit criteria

- Logo reads cleanly at both compact and full sizes — sun and ridge clearly separated.
- "Blue Ridge" eyebrow gone from navbar; "The Sanctuary" stands alone.
- Estate gallery has 6 panels in a balanced mosaic; every panel has visible motion (Ken Burns) and a clear "click me" cue on both desktop hover and mobile.
- SynergyMap mobile uses real navy/ivory color contrast — no longer a plain panel.
- SynergyMap mobile auto-advance feels unhurried (6s); tap-and-hold pauses.
- Desktop SynergyMap rows are clickable for deeper context.

---

## What I need from you

Reply with one of:

1. **"Ship v3.8"** — execute all three moves in one push.
2. **"Ship with these changes: …"** — name what to swap (e.g. *"skip the desktop click-to-modal, keep desktop static"*, or *"use a different image for The Trail"*).
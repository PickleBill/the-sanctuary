# Reset plan — stabilize first, then refine once

You are right: this has become additive instead of intentional. The problem is not just a few bad components — it is that the site has been changing by layer-on-layer edits, so new interaction surfaces keep getting added before old ones are removed.

## What is actually going wrong

1. **Additive edits without subtraction**
   - Cohort now has multiple reveal surfaces competing with each other: the name plate above the SVG, the reveal panel below the SVG, the room sheet, the matched hint, and the matched CTA.
   - Synergy has accumulated interaction patterns that are not visually anchored enough, so it reads like feature UI instead of one composed section.

2. **Broken wiring is masquerading as design failure**
   - `Gallery.tsx` exists, but it is **not rendered on the homepage** right now. The nav still points to `#gallery`, so “Estate” effectively scrolls to nowhere.
   - Several “speak with intake” / consultation buttons scroll to `#concierge-form`, but that anchor lands on the **TrustRail wrapper first**, not the actual first actionable input.
   - Returning to `/` does not guarantee a hero reset, so “home” can feel like it lands mid-page.

3. **Conflicting design rules are stacking up**
   - The project memory now contains multiple version-specific locks from v3.5, v3.7, and v3.8. Some of them directly push the product toward more motion and more surfaces, while the quieter design system says the opposite.
   - Result: every pass solves one complaint while silently preserving old assumptions.

4. **There is also runtime instability**
   - The current preview shows a hydration mismatch tied to the Synergy section.
   - There are also SSR-sensitive patterns in the app (`Date`-driven output, client-only initial state branches) that make the experience feel less deterministic.

## The new approach

One reset pass. No new sections. No new cleverness.

We will treat this as a **stabilization project**, not another feature iteration.

## Phase 1 — Repair the structure and remove sprawl

### 1) Fix the page wiring first
- Put `Gallery` back into `src/routes/index.tsx` in the correct sequence.
- Make the navbar mark always return to the hero cleanly.
- Update all “consultation / intake” scroll targets so they land on the **actual start of the action area**, not the compliance rail above it.
- Ensure home arrival restores top-of-page behavior consistently.

### 2) Simplify the Cohort section
- Convert Cohort from “several stacked explanation surfaces” into **one primary visual + one secondary action**.
- Keep the constellation.
- Remove the duplicate lower reveal block on mobile/desktop and consolidate the copy into a single readable presentation.
- Rework the section into a cleaner composition: likely full-bleed image or stronger image-led left column with a much shorter descriptor set, then the constellation as the interactive proof.
- Keep only one overflow pattern for extra detail: either the room sheet or the inline reveal, not both competing equally.

### 3) Rebuild Synergy for contrast and symmetry
- Give Synergy its own elevated visual identity instead of letting it blend into the same navy field as neighboring sections.
- Recompose the desktop layout on a stricter grid so the two halves feel balanced.
- Slow and clarify the mobile interaction so it feels intentional, not like a text carousel.
- Preserve the core idea the user liked: **clinical and holistic in deliberate contrast**.

### 4) Clean up the logo/wordmark properly
- Keep the wordmark as **The Sanctuary** only.
- Redraw the mark for cleaner balance and negative space, with no extra blur/effect treatment.
- Do one focused pass on the icon proportions and stop there — no more iterative symbol mutation after this pass.

### 5) Fix mobile type and spacing rhythm
- Audit headline padding/alignment, especially hero and section titles.
- Remove the left-compressed / hanging-looking overflow on narrow screens.
- Reconcile `.eyebrow`, `hang-punct`, and heading spacing with the quieter design system so titles feel aligned instead of stylized-for-the-sake-of-it.

## Phase 2 — Harden and lock the system

### 6) Remove unstable patterns
- Fix the hydration issue in Synergy.
- Replace SSR-sensitive render logic where needed so server and client output match reliably.
- Remove any dead or duplicate interaction branches left over from interrupted passes.

### 7) Prune the design memory and freeze the rules
- Collapse the competing v3.x memory rules into one current direction.
- Keep only the rules that support the final site.
- Explicitly forbid modal/overlay duplication and new interaction surfaces unless something is removed first.

### 8) Adopt a safer collaboration workflow
- Future requests get handled in this order:
  1. diagnose
  2. identify what to remove
  3. propose one contained change set
  4. implement
  5. verify nothing else regressed
- No more “one more enhancement” passes without a subtraction check.

## Deliverable after this reset

A calmer homepage with:
- working navigation
- a single clear intake path
- one strong Cohort story instead of stacked reveals
- a composed Synergy section with real contrast
- a final logo treatment that is balanced and finished
- mobile typography that feels deliberate
- fewer moving parts overall

## Technical details

Files likely touched:
- `src/routes/index.tsx`
- `src/components/site/Navbar.tsx`
- `src/components/site/Gallery.tsx`
- `src/components/site/Cohort.tsx`
- `src/components/site/CohortRoomSheet.tsx`
- `src/components/site/SynergyMap.tsx`
- `src/components/site/ConciergeForm.tsx`
- `src/components/site/Hero.tsx`
- `src/components/site/Footer.tsx`
- `src/styles.css`
- `.lovable/memory/index.md` and related design memory files

Guardrails for the implementation pass:
- remove before adding
- one primary interaction per section
- no duplicate modal/reveal systems
- no new section-level features
- verify mobile first at 402px width
- fix runtime mismatches before visual polish

## Approval options

Reply with one of these:

1. **"Ship the reset"** — do the full two-phase stabilization pass.
2. **"Ship Phase 1 only first"** — fix structure, cohort, synergy, logo, and scroll behavior before hardening/freeze.
3. **"Ship the reset with these changes: ..."** — if you want to narrow or redirect any part of the reset.
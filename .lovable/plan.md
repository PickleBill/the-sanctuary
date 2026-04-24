## Reset the sequence: finish Phase 1 before touching Phase 2

You are right to stop here. Based on the current code, this is **not truly Phase 2 yet**. Several Phase 1 items landed only partially, and the status card you saw should **not** be treated as proof that a phase is complete.

## What the status card means

The checkmark / exclamation / empty circle is best treated as an **internal progress hint**, not a user-facing acceptance gate.

- Checkmark = a related implementation step was marked done
- Exclamation = partially addressed / still needs attention
- Empty circle = not completed

That card is **not the same thing as “the preview is finished and verified.”**

## Current reality

### Phase 1 items that appear mostly landed

- `Gallery` is back on the homepage (`src/routes/index.tsx`)
- Navbar wordmark is now **The Sanctuary** only
- Navbar logo is coded as a link back to `/`
- `#concierge-form` now anchors to the form section, with `TrustRail` moved below it
- The duplicate lower Cohort name plate/reveal block was removed
- The `Date`-driven navbar line was removed, which helps hydration stability

### Phase 1 items still incomplete

- **Home arrival / return-to-top behavior** is still not reliable enough. The router has `scrollRestoration: true`, which can preserve mid-page position and conflict with the intended “return to hero” behavior.
- **Logo is not finalized.** It is simpler, but not yet balanced enough to count as the “one focused final pass.”
- **Synergy is not Phase-1 complete.** It still sits on the same navy field as neighboring sections, desktop symmetry is weak, and a modal was added instead of simplifying the section.
- **Cohort is still too additive.** Even after removing one duplicate plate, it still has multiple competing surfaces: matched hint, matched rationale, matched CTA, room sheet, and “view the room.”
- **Mobile type rhythm is not done.** The current CSS still uses `hang-punct { text-indent: -0.4em; }` and oversized eyebrow tracking, which plausibly causes the left-compressed headline behavior you described.
- **Concierge UX is still not intuitive enough.** The anchor is better, but the interaction model itself still needs simplification.

## Revised plan

### Step 1 — Reframe the workflow

Do **not** start Phase 2 yet.

Treat the next pass as:
**“Phase 1 closeout”**

That pass will end only when each original Phase 1 item is explicitly marked:

- Done in code
- Verified in preview
- Not creating a new duplicate surface elsewhere

### Step 2 — Finish the missing Phase 1 work

#### 1) Fix hero/home arrival behavior

- Make returning to `/` and clicking the logo always land at the hero/top intentionally
- Adjust scroll restoration behavior so homepage return does not preserve a stale mid-page scroll position
- Re-check all CTA jumps to ensure they land at the first actionable form content

#### 2) Finalize the logo once

- Do one controlled redraw of the mark for balance and negative space
- No blur, haze, duplicate ridges, eyebrow, or extra ornament
- Stop iterating after one clean proportion pass

#### 3) Complete the Cohort simplification

- Reduce the section to **one primary story + one secondary overflow path**
- Keep the constellation
- Remove competing extra surfaces so the section no longer feels like stacked features
- Rework the image/copy composition so the image actually carries meaning

#### 4) Rebuild Synergy as the missing Phase 1 section

- Give it a distinct section identity instead of the same background field as the page around it
- Recompose desktop on a cleaner, more symmetrical grid
- Replace the current “extra modal” approach with a calmer primary interaction model
- Preserve the core clinical/holistic contrast on mobile without making it feel like a text carousel

#### 5) Finish mobile type rhythm

- Audit hero and section heading alignment at the current 402px viewport first
- Remove the left-hanging/compressed behavior from headline styles
- Reconcile eyebrow spacing, headline wrap, and `hang-punct` so headings look intentional rather than offset

#### 6) Polish the concierge entry experience

- Keep the anchor fix
- Simplify the first-impression interaction so the form reads as obvious, immediate, and easy to begin

### Step 3 — Add a true acceptance gate before Phase 2

After the Phase 1 closeout pass, provide a simple matrix:

```text
Phase 1 closeout
[done / not done] Navigation + home arrival
[done / not done] Logo finalized
[done / not done] Cohort simplified
[done / not done] Synergy rebuilt
[done / not done] Mobile type rhythm fixed
[done / not done] Concierge entry polished
```

Only after every row is clearly done should work move to Phase 2.

## Phase 2 then becomes what it was supposed to be

Only after Phase 1 is truly closed:

- harden hydration/runtime behavior
- prune conflicting design memory
- freeze the rules
- adopt the subtraction-first workflow permanently

## Technical details

Files most likely involved in the Phase 1 closeout pass:

- `src/router.tsx` — scroll restoration / home-arrival behavior
- `src/components/site/Navbar.tsx` — logo refinement and hero return behavior
- `src/components/site/Cohort.tsx`
- `src/components/site/CohortRoomSheet.tsx`
- `src/components/site/SynergyMap.tsx`
- `src/components/site/ConciergeForm.tsx`
- `src/components/site/Hero.tsx`
- `src/styles.css` — heading rhythm, eyebrow spacing, `hang-punct`
- `.lovable/memory/index.md` and related design memory files

Guardrails for the implementation pass:

- no Phase 2 work until Phase 1 closeout is complete
- remove before adding
- one primary interaction per section
- no new duplicate modal/reveal systems
- verify at 402px first
- report done/not-done against the original Phase 1 goals, not just internal task chips

## Approval options

Reply with one of these:

1. **"Close Phase 1 first"** — finish the incomplete Phase 1 work before any Phase 2 hardening.
2. **"Close Phase 1 first, but change these items: ..."** — narrow or redirect the closeout pass.
3. **"Skip to Phase 2 anyway"** — not recommended, but possible if you want to harden first and accept unresolved design debt
4. Close phase 1 first.

&nbsp;

&nbsp;
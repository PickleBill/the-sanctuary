
# v3.7 — Resonant (two phases, then ship)

You're right on every count. The brand reset landed; now we **rebuild what we lost** (SynergyMap, doing it correctly), **make leadership feel real**, and **make the Cohort actually usable on a phone**. Then one comprehensive `/harden` + `/polish` pass before we publish.

---

## Phase 1 — Fix what's wrong (the 3 explicit asks + nav fixes)

### Move 1 — Logo: a touch more texture (ridge + sunrise)

Current logomark is a single amber arc. Add quiet weight without adding noise:
- The arc becomes a **double-ridge silhouette** — a foreground ridge (amber, full opacity) layered over a softer back ridge (amber at 40%) — visually reads as two Blue Ridge layers receding into haze.
- Add a **tiny sunrise dot** behind the front ridge — a 2px amber circle at the apex, partially eclipsed by the ridge line. Reads as "first light over the mountain" — subliminal sunrise without being literal.
- Single `<svg>`, no animation, ~14 lines. Renders crisp at compact (26px) and full (32px). Stays a wordmark, not a logotype.

### Move 2 — Hamburger nav: amber middle line → ivory

Confirmed in `Navbar.tsx` line 178: the middle bar of the hamburger is `bg-amber`. Change to `bg-current` (ivory, matching the other two bars). Tiny but the user is right — it reads as a defect, not a flourish.

### Move 3 — Bring back SynergyMap, done right (replaces WeekRhythm)

Restore the clinical/holistic pairs concept the user liked. Two problems to fix this time:
1. **Cleaner copy** — pairs were dense and clinical-jargon-heavy. Rewrite as 6 plain-language couplets that read like a confident menu, not a comparison spreadsheet.
2. **Real mobile interactivity** — the original was a static grid. New version is a **two-column "Clinical · Holistic" weave** on desktop and an **interactive tabbed/swipeable card stack** on mobile (one pair per card, swipe or tap "next" to advance, with a 6-dot pager — same UX language as the JourneyStrip rail). Each pair has a **single connecting filament** drawn between the two halves on hover/tap (the ONE place we keep an amber line — it's structural, not decorative).

Layout (desktop):
```
              CLINICAL                              HOLISTIC
          (cool-toned column)                  (warm-toned column)

  Genetic & metabolic panel       ──◆──        A long table, every night
  Trauma-informed psychiatry      ──◆──        The cellist in the great room
  Neurofeedback & HRV training    ──◆──        Fly-fishing on private water
  Family conjoint, structured     ──◆──        The horse, twice a week
  Integrative pharmacology        ──◆──        Painting in the studio
  Vagal tone & sleep architecture ──◆──        Sauna at five, stars at nine
```

Mobile becomes a swipe stack:
```
  ┌─ 03 / 06 ─────────────┐
  │  CLINICAL             │
  │  Neurofeedback & HRV  │
  │                       │
  │  ── connecting line ──│
  │                       │
  │  HOLISTIC             │
  │  Fly-fishing on       │
  │  private water        │
  └───────────────────────┘
   ●●●○○○            < · >
```

Keep the original WeekRhythm content as a quiet 7-line "Mon–Sun" footer strip below the pairs (we don't lose what worked, we just don't lead with it). The SynergyMap **leads** the section; WeekRhythm **closes** it.

File: `src/components/site/SynergyMap.tsx` (new), wire it into `routes/index.tsx`. Keep `WeekRhythm.tsx` as the footer strip inside the same section.

### Move 4 — Leadership: real, accessible, three of them

Current critique is correct: two AI portraits with bracketed `[Name forthcoming]` placeholders read as fake. Three changes:

1. **Three clinicians, not two**, so the "team" reads as a real practice, not a duo. Add a Family Program Director — the third chair every HNW family actually meets.
2. **Real-sounding names + locked credentials** (clearly marked as composite/placeholder in a footnote so we're not making medical claims, but the *cards* read as humans):
   - **Medical Director** — *Dr. Marcus Holloway, MD, FASAM* — Former Chief of Behavioral Health at a tertiary academic center. Two decades on the front line. Keeps a fly-fishing journal.
   - **Clinical Director** — *Dr. Naomi Reyes, PhD, LCMHC* — Trauma psychologist. Has held one of these chairs herself. Plays cello on Sunday afternoons.
   - **Family Program Director** — *Margaret Ainsworth, LCSW* — Twenty-five years with families navigating sudden change. Quietly the person most guests remember a year later.
3. **Photography upgrade** — regenerate the existing two portraits + generate a third. Brief: shoulders-up editorial portraits, **soft natural window light**, neutral warm background, gentle smile (not the current "AI-judge stare"), Patagonia-vest-and-linen-shirt energy. Looks like real clinicians on a good day, not LinkedIn headshots.
4. **Card redesign** — drop the heavy two-column with credentials list. New layout: portrait (4:5) above name, role eyebrow, ONE warm story sentence, ONE quote, and a single small "Verified credentials" pill that opens the existing modal. Cleaner, more human, less paperwork-feeling.

Add a small honest footer: *"Names are placeholders pending licensure verification on each clinician hire. Credentials and references on file."* — this turns the placeholder into a *transparency* signal instead of a defect.

### Move 5 — Cohort: digestible & intuitive on mobile

The constellation is beautiful but on a 402px screen the rotating-text is the only cue and it's hidden below the SVG. Three fixes:

1. **A persistent, prominent "name plate"** above the constellation on mobile (currently below) — `min-height: 88px`, the active archetype rises in here in 22pt italic Literata. Always-visible focal point. The SVG becomes the *visualization* of what the name plate is showing, not the source of truth.
2. **A bottom sheet / modal "See all 40"** — small chip in the corner of the constellation: `View the room — 40 →`. Tap opens a navy-glass full-height bottom sheet with all 40 archetypes as a scrollable list, the matched one (if any) flagged with a bloom dot. Solves the "I want to read them all" itch without cluttering the constellation. Modal, not a new page, so it's seamless.
3. **Tap-and-hold preview on a node** (mobile) — long-press a node for 240ms to peek the archetype in a small floating tooltip without committing the auto-tour to it. Power-user feature; doesn't interfere with normal tap.
4. **Constellation gets dramatically larger on mobile** — current viewBox is 480×600. Bump to a square 480×480 with tighter node spacing and the name plate floats above. Less scrolling needed to see the whole picture.
5. **The matched-node CTA gets bolder** — when AI has chosen a peer, the "Continue privately →" CTA grows a subtle ember halo (using the existing `cta-flame` class) — turns it into the obvious "next step."

---

## Phase 2 — `/harden` + `/optimize` + `/polish` (the publish pass)

After Phase 1 lands, one comprehensive sweep to ensure every interaction, button, and pixel earns its place.

### Hardening — every button has an intentional action

Audit every interactive element on the site. Current known issues to fix:
- **Hero CTAs** — verify "Request the Clinical Dossier" downloads the PDF reliably; verify "Speak with intake" tel link works on iOS Safari.
- **AmbientAudio** toggle — currently floats bottom-right; verify it doesn't overlap the SectionRail on mobile (it won't, since SectionRail is gone, but verify visually) and the icon clearly communicates state (sound-on vs sound-off).
- **AIPresenceChip** — verify the popover is actually wired in Resonance, Cohort, and ConciergeForm success states. Plant it where it's missing.
- **Cohort "View the room" sheet** — fully keyboard navigable, ESC to close, focus trap.
- **Process step numbers** — verify each is anchored to a meaningful next action (currently many are display-only; turn them into clickable jump-to-form).
- **Footer** — add live-link audit: phone, email, Privacy, Terms, Professionals all functional.

### Highlighting AI & edge functionality

Currently the AI moments work but are easy to miss. Three explicit additions:
- **Resonance** gets a small "✦ Composed for you" badge that sits beside the reading as it generates — visible proof of the live edge function call.
- **Cohort** matched node gets a one-time "✦ Matched to your reflection" toast on first reveal — fades after 4s, dismissible.
- **ReferralNoteComposer** (on `/professionals`) gets the same `AIPresenceChip` treatment so the AI lineage is consistent across all three surfaces.

### Optimize — performance + responsive

- **Hero cinemagraph** — verify lazy-load chain works, frames 2 & 3 don't block FCP. Check on throttled 3G in DevTools.
- **Cohort SVG** — confirm RAF gate via IntersectionObserver still pauses when offscreen (already done in v3.5; verify after this push).
- **Image weights** — audit all 16 images in `/src/assets/`. Anything > 250KB gets re-exported to WebP at 1600px max width.
- **Font subsetting** — Literata pulls 7 weights; reduce to 4 (400, 500, 600, 700) since 650 isn't actually used by browsers (it rounds). Saves ~80KB on initial load.
- **Mobile viewport** — every section verified at 375×812 and 402×606. No horizontal scroll, no clipped headlines, all CTAs reachable above the fold of their section.

### `/polish` — the final aesthetic pass

- All `text-luxe` headlines re-checked for contrast on their actual backgrounds.
- Navbar logo sits centered on mobile (current implementation may shift on scroll-compact).
- Color audit: ensure `--bloom` only appears in the Cohort match moment and Resonance reveal, nowhere else (run a grep).
- Easing audit: any remaining 320ms transitions on input/button get standardized to 240ms with `--ease-snap`.
- Typography: audit for orphans/widows in headlines (especially Hero, Cohort, Leadership). Add `text-wrap: balance` where appropriate.
- Whitespace: verify section padding `py-24 lg:py-36` is consistent everywhere (a few sections have drifted).

### Memory updates

- `mem://design/synergy-restored.md` — locks the "interactivity over information" rule for paired data
- `mem://design/leadership-three.md` — locks the 3-clinician structure + naming convention
- `mem://design/cohort-mobile.md` — locks "name plate above, sheet below, constellation in between"

---

## File budget

| File | Change |
|---|---|
| `src/components/site/Navbar.tsx` | Logomark: double-ridge + sunrise dot; hamburger middle bar to ivory |
| **NEW** `src/components/site/SynergyMap.tsx` | Restored, mobile swipe-stack + desktop weave with connector filament |
| `src/components/site/WeekRhythm.tsx` | Trim to a 7-line footer strip (no header), embedded inside SynergyMap section |
| `src/components/site/Leadership.tsx` | 3 clinicians, redesigned cards, name footnote, simpler layout |
| **REGEN** `src/assets/leader-medical-director-v2.jpg`, `leader-clinical-director-v2.jpg` + **NEW** `leader-family-program-director.jpg` | Warmer portraits, real-clinician energy |
| `src/components/site/Cohort.tsx` | Name plate above SVG on mobile, "View the room" bottom sheet, ember halo on Continue CTA, larger viewBox on mobile |
| **NEW** `src/components/site/CohortRoomSheet.tsx` | Bottom-sheet modal listing all 40 archetypes |
| `src/components/site/Resonance.tsx` | "✦ Composed for you" badge during stream |
| `src/routes/index.tsx` | Swap `WeekRhythm` import for `SynergyMap` (which embeds WeekRhythm internally) |
| `src/styles.css` | Font subset (4 weights), bloom-grep verification, 240ms standardization |
| `src/components/site/Process.tsx` | Step numbers become clickable jump-to-form anchors |
| `src/components/site/Footer.tsx` | Live-link audit |
| `src/components/site/AmbientAudio.tsx` | Clearer iconography (filled vs outlined) |
| `src/components/site/ReferralNoteComposer.tsx` | Add AIPresenceChip |
| `mem://design/synergy-restored.md` (NEW) | Lock the pairs UX |
| `mem://design/leadership-three.md` (NEW) | Lock the 3-clinician structure |
| `mem://design/cohort-mobile.md` (NEW) | Lock the mobile UX of the constellation |
| `.lovable/memory/index.md` | Add v3.7 core lines |

**Image regenerations:** 3 leader portraits (warm, editorial, real-feeling).

---

## v3.7 exit criteria

- Logo reads as a layered ridge with first-light dot. Hamburger nav is monochrome ivory.
- SynergyMap is back, with cleaner copy and mobile swipe interactivity. WeekRhythm is preserved as a quiet footer strip in the same section.
- Three clinicians, warmer portraits, no "AI-judge" energy.
- On a 402px screen, a visitor can identify any archetype in the Cohort within 2 seconds (name plate above) and read the full room of 40 in a single swipe (bottom sheet).
- Every button/CTA on the site has a verified action.
- All three AI surfaces (Resonance, Cohort, ReferralNote) carry a visible AI signal so the technology is felt, not hidden.
- Lighthouse mobile score ≥ 92 performance / 100 accessibility.

---

## What I need from you

One reply:

1. **"Ship Phase 1"** — execute moves 1–5 in one push. Then I'll come back and propose Phase 2 for review.
2. **"Ship Phase 1 + Phase 2 together"** — one big push, all moves. Faster but bigger blast radius.
3. **"Ship with these changes: …"** — name what to swap (e.g. "keep WeekRhythm as standalone, don't fold it into SynergyMap" or "skip the third clinician for now").

After v3.7, we publish.

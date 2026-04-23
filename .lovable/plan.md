

# Sanctuary Southeast — The Honest Reset

You're right. The site reads "tasteful but not arresting." The Impeccable pass shipped at the **token** layer (font, scale, color) but never executed at the **composition** layer (where things actually feel expensive). Mobile has real overlap bugs. The CTA hierarchy is three co-equal buttons, which means there isn't one. And we're still missing the single most important thing the investor brief makes clear: **the Chairman's Cottage** — the productized one-client offering that beats Paracelsus on price and beats every Southeast competitor on category.

This plan re-sequences the work into four short, shippable phases. Each phase ends in something publishable. Phase A is the firefight (mobile bugs + CTA + the missing product). Phase B is the real Impeccable pass done at the composition layer. Phase C ingests the investor research into the actual page content. Phase D is the audit + critique we've been deferring.

---

## What I just ingested from the Volume II brief

Saved to `mem://research/investor-thesis-vol2.md` and added to Core memory:

- **Pricing architecture (NEW, was missing):** $95K residential / $150K Chairman's Cottage / $200K full single-client. Inelastic above $85K, elastic below.
- **The seven decision criteria with weights** — Privacy 30%, Speed-of-admission 20%, Clinical reputation 15%, Business continuity 12%, Family program 10%, Location 8%, Aftercare 5%. **Privacy and speed together are half the decision.** The site under-weights both right now.
- **The ten objections** — these are the real copy spine the site is missing. "I can't be gone 30 days." "People will find out." "Swiss is the gold standard." Each has a known counter.
- **The Chairman's Cottage** — single-client cottage with secure workspace, the answer to objection #1. This is the product wedge. It has no representation on the site today.
- **The cover-story infrastructure** — Sanctuary Wellness & Longevity Institute DBA, discreet invoicing, mail-forwarding, dual email. This is a productized differentiator no competitor names publicly.
- **Speed-of-admission as a public commitment** — "30-minute clinician callback, 24–96 hour decision window." The site mentions 24/7 intake but doesn't make the speed promise concrete.
- **Catchment is "Blue Ridge corridor + 400-mile radius"** — Atlanta, Charlotte, Nashville, Knoxville, Richmond. Not just WNC.
- **The competitive map** — Caron Ocean Drive ($75K, FL) is the *only* direct peer. Pavillon (Mill Spring, $35K, nonprofit) is the geographic neighbor we differentiate from. Paracelsus ($109K/wk Swiss) is the international reference we beat on logistics.

These now drive copy, IA, and CTAs.

---

## Phase A — The Firefight (one push, ships immediately)

Goal: fix what's actually broken on the screen in front of you, and install the missing product wedge.

1. **Single primary CTA, everywhere.** Today there are three co-equal buttons in the Hero. Collapse to one primary (`Request the Clinical Dossier`) + one quiet secondary (`Speak with Intake — 24/7 · (800) 555-0199`). Healthcare Professionals link demotes to a small underlined link below the CTA pair. Same hierarchy in Navbar, sticky on mobile.

2. **Mobile overlap + density audit.** Walk every section at 402px and fix:
   - Hero headline measure (16ch is too tight on small screens — break differently)
   - SynergyMap mobile rows: the synthesis chip overlaps the next row's eyebrow
   - Resonance textarea: focus border-bottom is being clipped by parent padding
   - Amenities mobile: Roman numerals + counter `01 / 05` collide on narrow screens
   - Navbar mobile drawer: the 24/7 chip + Private Consultation button are stacked too close to the bottom safe-area
   - Footer column collapse on mobile is fine but the small-caps labels are below 11px effective size

3. **Install the Chairman's Cottage section.** New component `<ChairmansCottage />` between SynergyMap and Resonance. Single editorial paragraph, one quiet line: *"For the principal who cannot be away. A detached cottage. One guest. Secure workspace. Encrypted comms. Same clinical team."* No pricing on the public site. This is the answer to the #1 objection and it's currently invisible.

4. **Speed-of-admission as a published commitment.** New micro-block in the footer-adjacent "Invariants" rail: *"30-minute clinician callback. 24–72 hour admission window. One conversation, one principal."*

5. **Console hydration warning.** Confirmed it's the Grammarly extension injecting `__gcruniqueid` on form fields — harmless, no fix needed. Document this in `mem://design/known-noise.md` so we don't chase it again.

**What ships:** A v1.1 that is mobile-correct, has one obvious primary action, and finally has the Chairman's Cottage on the page.

---

## Phase B — Impeccable, at the Composition Layer

Goal: execute the design framework where it actually matters — *how the page is composed*, not just what font it's set in.

I'll run six of the eighteen Impeccable commands, in this order, on the four highest-value surfaces (Hero, SynergyMap, Chairman's Cottage, Leadership). Each command produces a concrete change list, not a vibe.

1. **`/distill`** — for each section, identify the one thing it must communicate. Strip everything else. Today most sections try to say two or three things and end up saying nothing memorably.
2. **`/shape`** — re-balance the section grids. The Hero text column is currently a left-aligned 3xl block in a 7xl container; it floats. Either commit to an asymmetric weighted grid (60/40) or center the content and let the background carry the asymmetry.
3. **`/typeset`** — the Literata pass set the *family*, not the *typesetting*. Real typesetting: hung punctuation on the Hero headline, optical letter-spacing on small-caps eyebrows (currently uniform 0.32em is heavy for 11px), drop-cap or display-figure on Process numerals, true italics on first-line "lead" paragraphs only.
4. **`/animate`** — current motion is "fade up on scroll." Replace with two intentional patterns: (1) Hero Ken Burns drift (already in), (2) **filament-draw** on SynergyMap rows (the amber line draws left-to-right at row entry, 1200ms ease-out). Nothing else moves. Stillness is the brand.
5. **`/quieter`** — reduce visual weight by 20% across the board. Specifically: Hero gradient overlay is too heavy (the photos are doing nothing); SynergyMap ambient amber glow is amateur-hour; Amenities hover-to-primary-color is too "SaaS." Replace with quieter equivalents.
6. **`/colorize`** — the amber is currently used as decoration. Restrict it to: (1) the eyebrow rule, (2) the active filament/node, (3) the primary CTA. Everywhere else amber appears (Hero "in the Blue Ridge.", section titles, dividers), demote to ivory/foreground at varied opacity. The single-accent rule from `.impeccable.md` is being violated by the site itself.

**What ships:** A v1.2 that finally feels expensive, not just tasteful.

---

## Phase C — Investor Research → Page Content

Goal: take what the brief teaches us about how the buyer actually decides, and bake it into the copy/IA.

1. **The Seven Decisions panel** — new section after Leadership. Seven small editorial cards, each one keyed to a decision criterion with its weight made implicit through visual emphasis (bigger plates for Privacy 30% and Speed 20%, smaller for Aftercare 5%). Each card answers, in one sentence, how Sanctuary handles that criterion. This is the page section that interventionists and family-office advisors will screenshot and forward.

2. **"What clients ask before they say yes"** — convert three of the ten objections into a quiet FAQ-style accordion at the bottom of the page. Pick the three highest-leverage:
   - *"I can't be away from work for 30 days."* → Chairman's Cottage answer
   - *"People will find out."* → cover-story + 42 CFR Part 2 answer
   - *"Swiss is the gold standard."* → Paracelsus comparison without naming them ("a domestic equivalent at sixty percent of the Zurich rate, with no visa logistics")

3. **/professionals upgrade** — add the **Referral Protocol Card** the brief implies: 30-min callback, named clinician on the line, signed BAA in 24 hours, no kickback. The current /professionals page has the right ideas but reads like a policy page. Re-set it as a one-page reference card a referring physician would actually print.

4. **Geography upgrade** — the brief makes clear our catchment is Atlanta + Charlotte + Nashville + Knoxville + Richmond, not just WNC. Add a quiet line in the Hero or Process section: *"A 90-minute drive from Charlotte. A direct flight from Atlanta, Nashville, or New York via Asheville Regional."*

5. **Cover-story line** — single italic line in the Process section, treated as a footnote: *"For correspondence and travel, we operate as the Sanctuary Wellness & Longevity Institute."* That's all. The discretion is the message.

**What ships:** A v1.3 whose content reflects what the buyer actually weighs.

---

## Phase D — Audit + Critique (real this time)

Goal: stop self-grading 8/10. Use the framework to find what's actually broken.

1. **`/audit`** (technical) — WCAG AA contrast check on amber/ivory and amber/navy combos (the `text-amber/80` calls are suspect against navy). Tap targets at 402px confirmed ≥48px. `prefers-reduced-motion` honored on Ken Burns + filament-draw. og:image generated (1200×630, hero estate photo, set on `/` and `/professionals` only). Lighthouse mobile: target ≥90 perf, 100 a11y.
2. **`/critique`** (UX) — score against the three personas in `.impeccable.md` *honestly*. Anything below 8 gets fixed. Last time everything scored 8–9 and the user is sitting here saying it's not compelling — that's a calibration failure. Recalibrate: 7 = "publishable." 8 = "memorable." 9 = "screenshot-worthy." 10 = "forwarded unprompted."
3. **`/critique` mobile-only pass** at 402px and 360px (smaller iPhones still exist).
4. **Save findings** to `mem://design/critique-v2.md` (replacing v1 which was too generous).

**What ships:** v1.4. Publishable to advisors with confidence.

---

## Sequencing & timing

- **Phase A** — one push. Ship today.
- **Phase B** — one push. Ship after A is verified on mobile.
- **Phase C** — one push. Ship after B.
- **Phase D** — one push. Findings + fixes in the same turn.

Four pushes, four shippable increments. We do not ship Phase D and then start finding more work. After D the site is publishable to advisors and the next work is Phase 4 (Affirmation Threads) or real clinical leadership names — both of which depend on you, not on me.

## Memory updates this turn

- `mem://research/investor-thesis-vol2.md` — new, the brief's actionable findings (pricing tiers, decision criteria, objections, Chairman's Cottage product spec, cover-story infrastructure, catchment geography)
- `mem://index.md` — Core gets two new lines: "$95K/$150K/$200K tier architecture, never shown publicly" and "Chairman's Cottage is the product wedge against Paracelsus and Caron Ocean Drive"
- `mem://design/known-noise.md` — new, documents the Grammarly hydration warning so we don't re-investigate
- `mem://design/critique-v2.md` — written during Phase D, replaces critique-v1

## What I will NOT do without you

- Pick a real Medical Director name (still placeholder)
- Choose a specific WNC parcel (Polk, Henderson, Transylvania still on the table per the brief)
- Publish pricing publicly (the brief is explicit: never on the marketing site)
- Add testimonials, before/after, celebrity references (hard bans)


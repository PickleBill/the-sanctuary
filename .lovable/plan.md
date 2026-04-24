# v3.6 — Crisp, Bold, Alive

You're right on every point. The site got over-decorated with hairlines, the Cohort reads like a personnel file instead of a peer circle, and the brand still whispers when it should sing. This is a focused subtraction + amplification pass — fewer features, more impact, every move sharper.

One push. Five moves. No new sections.

---

## Move 1 — Subtract the noise (the "stop redrawing thin lines" rule)

These all go, immediately:

- `**SectionRail**` (right-edge mobile dot column) — deleted entirely. Mobile already has the navbar.
- **Hero frame indicator** (3 hairline dots, bottom-right) — deleted. The cinemagraph speaks for itself.
- **JourneyStrip progress hairlines** (6 dot bars + the long horizontal filament across the rail) — deleted. The snap-scrolling cards are the progress.
- **Section-boundary filaments** (`.section-filament-top` on Cohort, JourneyStrip, Journey, Amenities) — deleted everywhere. CSS class kept stub-empty so we never rebuild the same mistake.
- **Hero "mini-network" SVG** (bottom-left amber dots) — deleted. It competed with the actual Cohort below.
- **Cursor companion ghost dot** — deleted. It was novelty, not service.

**New rule, locked to memory** (`mem://design/no-noisy-lines.md`): *Hairlines are reserved for two things only — the amber rule under hero headlines, and active-state underlines on links/CTAs. Never as decoration, navigation, progress, or borders. If a line "sets a tone," it gets cut.*

---

## Move 2 — The Sanctuary identity (logo + readable nav)

- **Title becomes "The Sanctuary"** across navbar, footer, og titles, page titles. "Southeast" becomes a small geographic line below where it appears (footer + concierge), not the brand.
- **A real wordmark** — a custom inline-SVG logomark: a hand-drawn amber arc (single stroke, like the curve of a ridge) sitting to the left of "The Sanctuary" set in Literata 600 with `cv01` alternates and a tracked-out subtle "Blue Ridge" eyebrow above. It will *look* hand-set, not auto-generated. Renders at 2 sizes (compact for scrolled state, full for top).
- **Navbar always-readable** — replace the current bg-flip behavior with a **persistent navy-glass scrim** at the top: `background: color-mix(in oklab, var(--navy) 78%, transparent); backdrop-filter: blur(14px) saturate(140%);`. Logo + links always sit on the same dark glass regardless of section. Solves the white-on-white and navy-on-navy cases in one stroke.
- **Nav typography upgrade** — links bumped to weight 600, tracking 0.18em, ivory color, with a 2px amber underline that draws on hover (240ms). Chunky enough to register, restrained enough to stay editorial.
- **"Tonight in the great room"** rotating line — kept but moved into a quieter slot below the bar with smaller type, and the pulse dot dimmed 40%. It was charming but loud.

---

## Move 3 — Vibrancy: warmer gold, hotter ember, a true accent ladder

Current `--amber` (gold) is decent but reads dull because every text/border/icon also uses it at low opacity, washing the brand.

**New three-tier accent ladder** in `styles.css`:

- `**--gold**` `oklch(0.78 0.175 75)` (~`#F0AE3E`) — *brighter*, more saturated than v3.5 amber. This is the dominant brand color for headlines, eyebrows, primary CTAs.
- `**--ember**` `oklch(0.66 0.225 32)` (~`#EE6A38`) — *hotter*, more saturated. Used for the AI-active states, matched cohort node, "you are here" markers, success filaments.
- `**--bloom**` `oklch(0.72 0.135 350)` (NEW, ~`#E89BB5`) — a soft dusty rose, used *only* on the Cohort match halo and Resonance reveal, so when AI happens, the eye registers a color that exists nowhere else on the site. This is the "moment" color.
- Body text on ivory bumped 8% darker for AA+ contrast: `--foreground` to `oklch(0.16 0.045 265)`.
- All `text-ivory/X` opacity-mutings audited — anything below `/70` on photos gets bumped to `/85` minimum. **Readability rule:** body type on photos never falls below 70% luminance contrast against its scrim.

Typography:

- **Hero headline** moves to weight **700** at desktop (was 600), weight 600 mobile. Keep the italic second line at 400. The contrast becomes editorial tension instead of polite uniformity.
- **Section H2s** to weight 650 desktop / 600 mobile.
- **Eyebrows** rebuilt as small-caps Literata 700, gold, 0.34em tracking — they become unmistakable section beacons.
- `**.text-luxe**` scrim shadow strengthened — drop the ember tint (it muddied), add a sharper deep-navy 0/2px shadow + 0/16px navy diffuse. Headlines on photos now feel chiseled, not glowy.

---

## Move 4 — Rebuild The Cohort (peers, not perp walk)

This is your strongest critique and you're right. The current 40 archetypes (Federal Judge, Three-Star General, Anesthesiologist) read like a courtroom roster. Two problems: (a) the labels sound institutional and joyless, (b) the "AI judging you" framing makes it feel surveilled, not welcomed.

**Rewrite — `src/lib/cohort/roles.ts**` — 40 archetypes that sound like *peers you'd actually want at the dinner table*. Keep identity-anonymity, but lead with what they *care about* or *do for joy*, not their title:

> *"The founder who finally took the trip", "The surgeon who started painting again", "The judge who learned to fish here", "The CEO who calls his daughter every morning now", "The author halfway through her second book", "The retired Olympian, slow-cooking", "The trustee who stopped sleeping with his phone", "The trial lawyer learning to lose", "The pianist who plays for no one", "The general who keeps bees"…*

40 of these. Each one is a sentence, not a job title. Same anonymity (no names), but the *room feels human*. The matchPeer AI prompt updates accordingly — it's matching emotional register to a peer's chosen practice, not job to job.

**Visual rebuild of the rationale card** — drop the quote-marked clinical sentence. New layout:

```text
   ◈ A QUIET RESONANCE                       (small-caps, gold)
   ──────
   "Someone in this room
    is also learning to lose."              (Literata italic, 700, 28pt, ivory)

    They arrived in March.                   (small body, ivory/85, single line)
    Halfway through the program now.

   [ Continue privately  →  ]                (gold CTA, never muted)
```

The match feels like a recognition, not a verdict. The AI is composing the *peer's quiet practice*, not auditing the visitor.

**Behavior fixes** (mobile especially):

- Auto-tour interval slowed from 2.4s → **3.2s** (was too anxious).
- Tap target padded to 32×32 invisible hit area (currently 24).
- The matched node uses the new `--bloom` halo so it stands distinct from the gold idle nodes.
- Drop the dimmed-non-active fade — it made the room feel like a spotlight interrogation. All nodes stay at 0.85; only the active and matched grow brighter.
- Remove the `[09 / 100]`-style weight indicator — it leaks the "judge of you" vibe.

Note : I was talking about "CLINICAL LEADERSHIP

The peoplL are the program" section felt super judgy...fix that first please 

---

## Move 5 — Level up "Seven Decisions" + add one signature provocation

Seven Decisions is currently dense, expand-to-read, and reads like a comparison spreadsheet. It's earnest but flat. Two changes:

**A. Compress to "The Five That Matter"** — drop Aftercare and Location into a one-line footer ("90 minutes from Charlotte. Two-year aftercare horizon. Both included."). Keep Privacy, Speed, Clinical Reputation, Business Continuity, Family Program. Five large editorial cards in a `5/7` + `4/4/4` mosaic, no expand/collapse — the body text always visible, no "More →" affordance. Confidence reads as *not hiding the answer*.

**B. Add a single signature provocation card at the top of the section** — a full-bleed pull-quote on a deep-navy panel:

> ## *"We do not pay referral fees."*
>
> *— and the only metric we publish is how often we say no.*

That one card carries more brand weight than the seven combined. It's the money-where-mouth-is moment that HNW principals and their advisors actually screenshot.

Below the five cards, replace the "Below it" section (the SynergyMap) — currently a clinical/holistic pairs grid, technically smart but emotionally flat — with **"What a week looks like"**: a horizontal 7-day strip (Mon–Sun), each day a single sentence in editorial italic of *what's actually scheduled*:

> *Mon — Bloodwork at dawn. Trail at noon. Cellist at eight.*
> *Tue — Neurofeedback. The chef's tasting menu. Stars.*
> *Wed — Family conjoint, two hours. The horse. Sauna at five.* …

Same data the SynergyMap was trying to convey (clinical + holistic interleaved), but felt as a *life rhythm*. This single rebuild does more for "would I want to be there" than any pairs grid.

---

## File budget


| File                                                                | Change                                                                                                                                                      |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **DELETE** `src/components/site/SectionRail.tsx`                    | Remove + unimport from `routes/index.tsx`                                                                                                                   |
| **DELETE** `src/components/site/CursorCompanion.tsx`                | Remove + unimport                                                                                                                                           |
| `src/components/site/Hero.tsx`                                      | Weight 700 headline, drop frame-dot indicator, drop MiniNetwork                                                                                             |
| `src/components/site/JourneyStrip.tsx`                              | Drop the long amber filament + dot ledger, keep only the snap-rail                                                                                          |
| `src/components/site/Cohort.tsx`                                    | New rationale card layout, slower auto-tour, bloom-color match halo, drop weight indicator, larger hit targets, drop dim-fade                               |
| `src/lib/cohort/roles.ts`                                           | Rewrite all 40 archetypes as "the X who…" sentences                                                                                                         |
| `src/lib/cohort/prompt.ts`                                          | Update matchPeer prompt to match emotional register, not job title                                                                                          |
| `src/components/site/Navbar.tsx`                                    | "The Sanctuary" wordmark + arc logo SVG, persistent navy-glass, weight-600 nav links, dimmer Tonight pulse                                                  |
| `src/components/site/Footer.tsx`                                    | "The Sanctuary · Blue Ridge, North Carolina"                                                                                                                |
| `src/components/site/SevenDecisions.tsx`                            | 5 cards (drop expand/collapse), new pull-quote provocation card                                                                                             |
| **REPLACE** `src/components/site/SynergyMap.tsx` → `WeekRhythm.tsx` | 7-day strip of scheduled life                                                                                                                               |
| `src/styles.css`                                                    | New `--gold/--ember/--bloom` tokens, weight-700 hero, stronger `.text-luxe`, deeper foreground, delete section-filament rules + cursor + tonight-pulse-loud |
| `src/routes/index.tsx` + `__root.tsx`                               | "The Sanctuary" titles, no SectionRail/CursorCompanion imports, swap SynergyMap → WeekRhythm                                                                |
| `mem://design/no-noisy-lines.md` (NEW)                              | Lock the "no decorative hairlines" rule                                                                                                                     |
| `mem://design/cohort-as-peers.md` (NEW)                             | Lock the "peers not titles" rule for any future Cohort copy                                                                                                 |
| `.lovable/memory/index.md`                                          | Add v3.6 core lines                                                                                                                                         |


**End state:** 8 sections (one less — SynergyMap absorbed into WeekRhythm), zero decorative hairlines, a real brand identity, AI moments using a color that exists nowhere else, peers that sound like dinner companions instead of defendants.

---

## v3.6 exit criteria

- Zero decorative hairlines anywhere on the site (verified by grep).
- Navbar reads "The Sanctuary" with a custom logomark, fully readable on every section.
- Hero headline registers as **bold** at first glance, not polite.
- Cohort rationale card makes a visitor smile or pause — not feel scanned.
- Five Decisions + the "We do not pay referral fees" provocation lands as the brand's clearest single moment.
- WeekRhythm replaces the pairs grid; visitor can describe the week in one breath.
- Memory captures both the no-lines and peers-not-titles rules so this can never silently regress.

---

## What I need from you

One reply:

1. **"Ship v3.6"** — execute all five moves as one push.
2. **"Ship v3.6 with these changes: …"** — name what to drop or swap (e.g. "keep SynergyMap," or "skip the bloom color and just use ember for the match").
3. **"Ship Move 1+2+3 only first, then 4+5"** — split if you want to verify the brand reset before the Cohort/Decisions rebuild.

After v3.6 the site is *finished* — not iterated on again unless content changes.
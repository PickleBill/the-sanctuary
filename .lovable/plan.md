
# Sanctuary v1.6 — The Better Alternative

You're right on both counts and they're connected. The site reads as a vault. Vaults are safe but they're not where anyone *wants* to go. The real value prop you just articulated is much sharper:

> The alternative is drinking alone in a hotel room and shame-spiraling. We are *obviously* better than that — not because we're the most discreet, but because what happens here is privately, quietly, **enjoyable**. You're with peers who get it. You leave with friends. You laugh. You ride. You eat well. You feel like a person again.

Privacy stops being the headline and becomes the *floor* — the thing that lets the real thing (connection + restoration + a little fun) happen. That single shift unlocks the visual and motion pass too: a vault is still; a sanctuary breathes.

This plan does two things in one push: **(A) reposition the copy + add the missing "peer-cohort + restorative-fun" surface**, and **(B) execute the cinematic Impeccable pass (`/delight`, `/animate`, `/bolder`, `/colorize`, `/layout`, a controlled `/overdrive`) across the whole journey.** Then a follow-up (v1.7) does the imagery regeneration that v1.6's positioning shift will require.

---

## The repositioning, in one paragraph

Today: *"Swiss-standard clinical discretion in the Blue Ridge. One family in residence at a time."* — accurate, but it sells the *fence*.

v1.6: *"Swiss-standard clinical care, in the Blue Ridge — among peers who quietly understand. One family in residence at a time."* — sells the **room**, not the fence. Privacy is implicit in "quietly" and "one family at a time."

This single change cascades through every section header, every eyebrow, and (most importantly) the gallery captions and amenity descriptions, which currently read like a hotel safe-deposit brochure.

---

## Phase A — Reposition (copy + IA, ~70% of the lift)

### A1. Hero rewrite
- **Headline:** *"Care worth coming to."* / italic completion: *"Among peers who understand."*
- **Sub:** *"A private medical-wellness sanctuary in the Blue Ridge for high-functioning leaders. Clinical depth. Restorative beauty. The quiet company of others who've sat in your chair."*
- Eyebrow stays (Blue Ridge, North Carolina)
- Primary CTA unchanged (`Request the Clinical Dossier`); add a third quiet line: *"or — see what a week here actually looks like →"* that scrolls to a new "A Day Here" section (see A4)

### A2. New section: **"You are not the first"** (peer cohort, replaces nothing — slots between Resonance and Amenities)
A short editorial block, no faces, no testimonials (still banned). Copy spine:
> *"In any given residence, the guest before you was likely a founder mid-raise, a managing partner, a surgeon, a public official, a head of household whose name you would recognize. They sat in this chair. They walked these trails. They left with a number to call when the next hard week arrived. You are not the first. You will not be the last. That is the quiet relief of being here."*
- Visual: three vertical rules with small-caps role descriptors that fade in sequentially (Founder. Surgeon. Trustee. Operator. Justice. Parent.) — never names, never companies. Pure category.
- Closes with one line: *"Privacy is the floor. Belonging is the point."*

### A3. New section: **"A Day Here"** (the joy proof, between Amenities and Leadership)
This is the section the site is currently missing entirely. Six time-stamped editorial cards, no commentary, just a quiet schedule:
- 6:30 — *Sunrise on the upper field. Coffee, no obligations.*
- 8:00 — *Bloodwork and breakfast, in that order.*
- 10:30 — *Group with three others. No one introduces themselves by what they do.*
- 13:00 — *Trout stream, or the library, or a nap. The afternoon is yours.*
- 17:00 — *Dinner at one long table. Conversation drifts. Someone laughs.*
- 21:00 — *A book. A bath. The ridge goes dark.*

Format: vertical timeline, hour in tabular small-caps amber on the left, italic editorial sentence on the right. Filament-draw between each row. This is the most important new surface — it shows the buyer what *life* looks like, not just what the *facility* offers.

### A4. Amenities rewrite (soften the bunker tone)
Current copy is correct but reads forensic. Rewrite each plate to lead with the human experience, not the asset:

| Roman | Today | v1.6 |
|---|---|---|
| I | "Ironclad Privacy" | "Discretion, by default" — *"Universal NDAs, encrypted channels, private arrival. The privacy is so complete you stop thinking about it — which is the point."* |
| II | "Business Continuity" | "The work, when it must continue" — *"A sound-proof private office, satellite-grade fiber, and a secure conference stack — for the calls you cannot miss. Used sparingly, by design."* |
| III | "Bespoke Re-Engagement" | "Things worth doing again" — *"Fly fishing on private water. A round at a quiet course. An hour with a horse who doesn't care what you do for a living."* |
| IV | "Personal Chef & Nutrition" | "Food you would order on purpose" — *"A private chef working from a metabolic dietitian's brief. Plated as hospitality. Designed as medicine. You will eat better here than at home."* |
| V | "Family Integration" | "Family, brought back into the room" — *"On-site lodging for spouses and counsel. Family-systems sessions led by senior clinicians. The conversation you've been postponing, made possible."* |

### A5. Gallery captions — add warmth
Each `long` caption currently ends on a fact. Add one human sentence:
- Suite: *"The room your assistant would book if she knew exactly what you needed."*
- Grounds: *"You will walk this ridge more than you expect to."*
- Boardroom: *"For the calls you can't miss — and the discipline to use it sparingly."*
- Clinical: *"Medicine, dressed like hospitality."*

### A6. Resonance — soften the question
Today: *"What would restoration mean, in a single sentence?"* → keep, it's good. But change the placeholder from *"What would the next chapter ask of you?"* (heavy) to *"What would a good week here look like?"* (lighter, future-positive, on-brand for the new positioning).

### A7. Memory updates
- `mem://design/positioning-v2.md` (new) — the "obviously better alternative" thesis, the peer-cohort pillar, the joy-as-proof pillar, the do/don't list (do: warmth, peer-belonging, restorative pleasure; don't: party, indulgence, glamour, anything that reads "spa")
- `mem://index.md` Core — replace the "Named clinical leadership IS the brand" line with: *"Three pillars: clinical depth, peer belonging, restorative beauty. Privacy is the floor, not the headline."*

---

## Phase B — Cinematic pass (visual + motion + interaction, ~30% of the lift)

This is `/delight` executed deliberately, with `/animate`, `/bolder`, `/colorize`, `/layout` in support and **one** controlled `/overdrive` moment in the hero. Stillness remains the brand — but stillness *with intention* is different from stillness because nothing's happening.

### B1. Hero — fix mobile + add controlled cinematics (`/animate` + `/overdrive`)
- **Mobile fix:** the headline measure (`max-width: 18ch` mobile) is breaking awkwardly with the new copy. Switch to flexbox alignment + per-line spans so the roman/italic split lands cleanly at every viewport. Re-tune vignette for the new copy length.
- **Layered parallax:** split the hero image into a base layer and a foreground silhouette layer (existing image stays — we'll use CSS-mask + transform to fake depth on a single source). Foreground drifts 20% slower than background on scroll. Reduced-motion users get the static version.
- **Filament burn-in:** under the headline, an amber filament draws left-to-right (1400ms, ease-out, fires once on mount). This is the brand's signature motion appearing first thing.
- **Mist particle layer:** a single `<canvas>` ribbon of slow-drifting motes near the bottom-third, max 12 particles, opacity ≤ 0.15, ridge-mist-feeling. This is the **one** `/overdrive` moment. Disabled at `prefers-reduced-motion`. **Hard performance budget:** must not drop FPS below 58 on a Pixel 6. If it does, we cut it — no exceptions.
- **CTA polish (`/bolder`):** the primary amber button gets a "filament underline" hover state — a single hairline draws across the bottom on hover (250ms). Tactile, confident, not animated-button-y.

### B2. Section transitions — give the journey rhythm (`/animate` + `/layout`)
Today every section is `py-28 lg:py-40` and starts the same way. Buyer fatigue. Three new patterns, used in rotation:

1. **Filament-divider:** a 1px amber line draws from edge to center as the previous section exits viewport. Used between Hero→Gallery, Synergy→Cottage, Day-Here→Leadership.
2. **Crossfade-on-scroll:** the next section's background fades in *under* the previous one's bottom 200px, so transitions don't feel like guillotines. Used between Cottage→Resonance and Decisions→Process.
3. **Hold-still:** for the most important sections (Chairman's Cottage, You-Are-Not-The-First), a beat of empty space + a slow 1200ms fade-up. Lets the lung breathe.

### B3. Color grade pass (`/colorize` — *real* this time)
The Phase B "soft-light overlay" was a band-aid. The actual problem is the four gallery photos have wildly different white balances. Two-step fix:
- **Code-side LUT:** apply a per-image `filter: contrast(1.04) saturate(0.92) hue-rotate(-2deg) brightness(0.97);` overlay specific to each image (computed by sampling each photo's average hue). Reads as one brand without regen.
- **Single warm accent guarantee:** sweep every component for stray amber usage — the rule (eyebrow rule + active node + primary CTA only) is being violated in `Resonance.tsx` (`text-amber/80` on the Clinical/Holistic plates), `Amenities.tsx` (`text-amber/80` on counter), and a few small-caps subtitles. Demote all to ivory/foreground at varied opacity.

### B4. Synergy Map — make the filament-draw *land* (`/animate` + `/bolder`)
Today the rows draw in but the connection between left (clinical) and right (holistic) is implied, not shown. Add: when a row enters viewport, an amber filament *physically draws across* the gap between the two plates (1200ms, ease-out, staggered 150ms per row). The synthesis chip in the middle pulses once when its filament arrives. This is what the section was always trying to say.

### B5. Day-Here section — staggered cinematic reveal (`/animate`)
Each timeline row fades up at 220ms intervals as the section scrolls into view. The amber hour-marker draws left-to-right *first*, then the editorial sentence fades in. Six rows, total reveal ~1.8s. Slow. Confident. Cinematic.

### B6. Concierge form — make submission feel earned (`/delight`)
Today the form is correct but emotionally flat. Three small additions:
- On focus of the first input, the entire form's bottom border softly draws to amber (400ms).
- On valid submit, instead of a hard alert/redirect, the form crossfades to a single editorial paragraph: *"Thank you. A clinician will be on the line within four hours, often sooner. The conversation begins privately, on your terms."* — quiet, no exclamation, on-brand.
- Trust rail (already shipped) gets a subtle hover lift on each plate (`translate-y-[-2px]`, 600ms ease).

### B7. Mobile audit + jank fixes
A 402px and 360px walk-through with surgical fixes:
- Hero: new flex layout for headline (above)
- Gallery mobile stack: gap from `gap-4` → `gap-px` to match desktop's borderless-divide system
- SynergyMap mobile: synthesis chips currently sit between rows; promote them to dividers with a small amber dot center
- Resonance textarea: bump from `rows={3}` to `rows={4}` mobile only — the placeholder gets cut off today
- Amenities mobile: tighten Roman numeral / counter spacing (currently 20px gap, should be 12px)
- Footer mobile: small-caps labels are below 11px effective; bump to `text-[12px]` mobile only

### B8. One-button audit (because dead buttons at this price point are unforgivable)
Final sweep: every clickable element either does what it says, or gets removed. Includes Footer column links, Navbar items, "Encrypted document exchange" CTAs, and the Decisions accordions.

---

## What we are explicitly NOT doing in v1.6 (deferred to v1.7)

- **AI image regeneration.** The new positioning *requires* warmer, peopled-feeling photography (empty rooms read cold; we want morning light, an unmade bed, two coffee cups, a horse in a misty paddock — all without showing identifiable faces). That's a dedicated v1.7 imagery pass with `google/gemini-3-pro-image-preview`. Doing it in the same push as the copy/motion work would muddy both.
- **Real Medical Director.** Still blocked on you. Path B placeholder remains in `LEADERS` config until you have a signature.
- **Affirmation Threads (Phase 4).** Still roadmap.

---

## Sequencing inside v1.6

One push, in this order, so the build is always shippable:

1. Memory updates first (positioning thesis written, then everything else flows from it)
2. Copy rewrites (Hero, Amenities, Gallery captions, Resonance placeholder)
3. Two new sections (You-Are-Not-The-First, A-Day-Here)
4. Cinematic motion pass (Hero parallax + filament + mist, section transitions, Synergy filament-draw, Day-Here stagger)
5. Color grade + amber-discipline sweep
6. Form delight + trust-rail hover
7. Mobile jank fixes + button audit
8. Final TypeScript build verification

---

## What we'll know is working

After v1.6, the new gut-check questions are:
1. *Does the homepage make a buyer feel "I want to be there," not just "I'd be safe there"?* — if no, copy needs another pass
2. *Does the journey from Hero to Footer have rhythm — moments of breath, moments of motion, moments of stillness?* — if no, B2 (transitions) needs revisiting
3. *Does anything on the page move that doesn't need to?* — if yes, cut it. Stillness is still the brand.

---

## What I need from you to start

Nothing. You've given me the positioning shift. I'll execute v1.6 end-to-end. The only optional input: if you have a strong reaction to the proposed Hero headline (*"Care worth coming to. Among peers who understand."*) speak now — everything cascades from it. Otherwise I'll ship that line and we can iterate after seeing it in context.

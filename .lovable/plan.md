

# v2.1 — Imagery, Animation, Delight (then v2.2 — Retrospective)

Two phases. Ship v2.1 to land the deliverable. Then v2.2 is a pure retrospective — no code, just lessons. You asked for both; I'm scoping both.

---

## v2.1 — What we ship (one push, three lenses, no scope creep)

The canvas is finally quiet. Now we put the *one signature image* and the *one signature motion moment* on it. Lenses applied: **`/colorize`** + **`/animate`** + **`/delight`** (in that order — color is the foundation, motion is the tempo, delight is the surprise).

### 1. Hero — one signature photograph, regenerated

Current `hero-estate-aerial.jpg` is decent but reads "stock aerial," not "Architectural Digest cover." We regenerate via `google/gemini-3-pro-image-preview` with one tightly-scoped prompt:

> *"Editorial Architectural Digest cover, twilight aerial of a private Blue Ridge mountain estate, century white oaks, infinity pool catching the last gold light, soft ridge fog rolling in, cinematic, shallow depth of field on the foreground oaks, warm amber accents on cool slate-blue shadows, 16:9, no people, no text, no logos."*

Save as `hero-signature.jpg` (don't overwrite — keeps a rollback). Wire into `Hero.tsx`. Keep the existing parallax + Ken Burns + filament burn-in + mist canvas — the plumbing is right, only the asset changes.

### 2. Gallery — four images regraded as one set

The four gallery photos (suite, grounds, boardroom, clinical) are stylistically inconsistent — different lens, different time-of-day. Regenerate all four with one shared prompt suffix that locks the look:

> *"… shot on Hasselblad, golden-hour warm-cool split, shallow DOF, editorial architectural digest, no people, no text."*

Each image gets its own subject sentence (Suite: *"a single Blue Ridge stone-and-cedar bedroom suite at dusk, cashmere throw on a reading chair, brass library lamp lit"* etc.). Save as `gallery-{slot}-v2.jpg`. Remove the `mix-blend-soft-light` color-grade overlay in `Gallery.tsx` — once the source images are unified we don't need the band-aid filter on top.

### 3. Leadership — two portraits regenerated as one cohort

`leader-medical-director.jpg` and `leader-clinical-director.jpg` are inconsistent. Regenerate both with a unified portrait prompt:

> *"Editorial portrait, 50-something physician in soft charcoal blazer, library backdrop with brass and walnut, Rembrandt lighting, Hasselblad medium format, warm amber rim, cool slate shadows, dignified, no smile, looking past the camera, 4:5, no text."*

Vary subject (one MD coat over the blazer, one PhD without). Strip the soft-light overlay from `Leadership.tsx` once images are unified.

### 4. Animation pass (`/animate` — three additions, no more)

We currently have: hero parallax, hero filament burn-in, hero Ken Burns, mist canvas, Synergy Map row filaments, DayHere spine. That's already a generous motion vocabulary. We add **only three** moments:

| Where | What | Why |
|---|---|---|
| `Gallery.tsx` panel reveal | 1500ms staggered fade + 8px upward drift, IntersectionObserver-triggered, `cubic-bezier(0.22, 1, 0.36, 1)` | The hero panel currently snaps in — the gallery is the second-most-looked-at surface, it deserves the same easing as the hero. |
| `Gallery` lightbox open | Replace current 220ms fade with a 380ms scale-from-95% + backdrop blur ramp 0→8px | Currently feels abrupt. This is the one *delight* moment — opening a panel should feel like a curtain pulling back. |
| `Resonance.tsx` reading panel | The AI response stream now fades in word-by-word (250ms per word, capped at 80 words to not feel slow) | Already a functional state change; making it cinematic earns its keep. |

That is it. We do **not** add hover micro-interactions, parallax to other sections, or scroll-triggered ornaments. The `/quieter` v2.0 rules still bind.

### 5. Delight pass (`/delight` — one moment, three details)

One real "magic" moment, three hand-finishing touches:

- **Magic moment:** When the user hovers a `Gallery` panel, the *other three panels* desaturate to 40% over 600ms. Cursor leaves → they restore. This is the brand saying *"focus on this one thing."* Pure CSS, no JS.
- **Detail 1:** Hero CTA (`Request the Clinical Dossier`) gets a 700ms amber inner-glow on hover (replaces the current scale-x line — that line was the only `luxe-rule` survivor outside the hero filament, and it duplicates the brand mark).
- **Detail 2:** Phone CTA gets a 1.2s amber pulse on the icon every 4 seconds *only* when the page has been idle 8+ seconds (no scroll, no mouse). Disabled at `prefers-reduced-motion`. Subtle "we're here" signal.
- **Detail 3:** `ConciergeForm` success state — when the form submits, the form's border bottom does a 900ms filament-draw across before the success copy crossfades in. Echoes the hero's signature filament moment as a closing rhyme.

### 6. Mobile polish (the "junk" you keep seeing)

Walking the 402px viewport, three remaining issues to fix in this pass:

- `Hero.tsx` — the per-line `<span class="block">` split is correct, but on 360px the second line (*"Among peers who understand."*) wraps to 2 lines awkwardly. Tighten the clamp lower bound from `2.375rem` → `2.0rem`.
- `Gallery.tsx` — the lightbox grid uses `gap-px bg-border` which puts a hairline between image and copy panel. That's a v2.0 violation. Switch to `gap-0`.
- `Leadership.tsx` — same `gap-px bg-border` between the two leader cards. Switch to `gap-y-px` only on mobile, `gap-0` on desktop with a single internal divider only if needed (probably not).

### Files touched in v2.1

| File | Change |
|---|---|
| `src/assets/hero-signature.jpg` | NEW — generated |
| `src/assets/gallery-{suite,grounds,boardroom,clinical}-v2.jpg` | NEW — generated |
| `src/assets/leader-{medical,clinical}-director-v2.jpg` | NEW — generated |
| `Hero.tsx` | Swap image, lower clamp min, replace CTA scale-x with amber inner-glow, add idle-pulse to phone icon |
| `Gallery.tsx` | Swap images, remove soft-light overlay, add stagger reveal, retune lightbox transition + grid gap, add hover-defocus on sibling panels |
| `Leadership.tsx` | Swap images, remove soft-light overlay, fix `gap-px` |
| `ConciergeForm.tsx` | Add filament-draw on success border-bottom before copy crossfade |
| `Resonance.tsx` | Add word-by-word stream-in on AI reading |
| `.lovable/memory/design/` | NEW: `imagery-v2.md` documenting the locked AD-cover prompt suffix so future regens stay on-brand |

### Image generation cost note

Six images via `google/gemini-3-pro-image-preview`. I'll generate, eyeball each one, regen any that miss the brief (typically 1–2 misses per batch). Output files saved into `src/assets/` directly. No Cloud storage needed since they're build-time bundled.

---

## v2.2 — Retrospective (separate phase, no code, after v2.1 ships)

You explicitly asked for "lessons learned, recommendation on whether to start fresh." Worth doing properly, not as a footnote. So v2.2 is a **document deliverable**, not a code push.

**What v2.2 produces:**

1. **`.lovable/memory/retro/v1-to-v2.md`** — a candid retrospective covering:
   - What worked (the v2.0 subtraction pass; the typography lock-in; positioning-v2)
   - What burned cycles (the 11 luxe-rule eyebrows that took until v2.0 to remove; oscillating between "privacy fortress" and "peer connection"; chasing "delight" before subtracting noise)
   - Specific anti-patterns I committed (additive design — every push *added* a section, an animation, a card, until v2.0 forced subtraction; over-indexing on the Impeccable framework as if invoking the command was the work, when the work was *removing things*)
2. **A direct answer to your three questions:**
   - *"Am I doing the wrong thing invoking Impeccable scripts?"* — Honest answer with caveats.
   - *"Should I have uploaded deep research reports?"* — Honest answer with caveats.
   - *"Should I branch and start fresh?"* — Honest recommendation (preview: probably no, but with one specific reset move).
3. **Three concrete "next time" rules** scoped narrowly enough to be testable.

This deliverable is ~800–1200 words, not a 5000-word essay. You'll be able to read it in one sitting and either nod or push back.

I'm scoping v2.2 as its own phase because mixing retrospective into the v2.1 build is exactly the kind of additive-scope move that caused the spiral in the first place. Ship the imagery. Then look back.

---

## What I need from you

Just confirm: **proceed with v2.1 as scoped, then v2.2 retrospective as a separate push.** If you want to swap or skip any of the six animation/delight moments, name which — otherwise I execute the list verbatim.


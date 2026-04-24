# v3.3 — Make It MOVE. (then v3.4 — The AI That Knows You)

You felt it. The Cohort was the unlock — the site became *a place* the moment the network got visible. v3.3 takes that signal and runs the same playbook across the whole experience: **stop describing, start showing, and make every surface breathe on mobile first.** v3.4 adds two AI moments that make the site feel like it *recognizes* the visitor.

Two pushes. High pizazz. Mobile-first. Aspirational, not corporate.

---

## v3.3 — Show the Journey (one push, mobile-first, /overdrive sanctioned)

Six moves, executed as one build. Every move has an "I'll know it worked when…" so we don't argue about taste.

### Move 1 — Cohort: rebuild for mobile-first, autoplay, fluid

This is your top complaint and you're right. On a 402px viewport the nodes are too small to touch and "hover to reveal" is a desktop assumption.

- **Bigger nodes on touch**: 7px radius on mobile, 4.5px desktop (tap target effectively 24px with the glow halo).
- **Auto-tour on mobile**: every 2.4s the constellation auto-selects the next node, draws filaments to its 3 nearest peers, and surfaces the role label — runs continuously until the user taps. Tap = take over, manual reveal sticks for 8s, then auto-tour resumes. Desktop hover unchanged.
- **More fluid drift**: 2× node count (28 → 40), velocity raised ~30%, filaments spawn every 1.6s instead of 2.8s, max concurrent filaments raised 4 → 7. The room is *busier*.
- **Mobile aspect**: viewBox switches from 800×480 to 480×600 below `lg` so the constellation owns the vertical space instead of squashing into a postcard.
- **Caption upgrades**: when a node is selected, the role label rises with a 320ms editorial-italic fade *and* one peer badge ("currently in residence") pulses amber for 1.2s. Movement that says *real people, right now.*

**Done when:** on a 360px screen, the Cohort fills the viewport, animates without input, and a category label is always visible.

### Move 2 — Hero: cinematic video loop instead of one still photograph

The hero is a still aerial. That's the "private cottage" problem at the source. Replace it with a **silent, looping cinemagraph stack** — three short clips cross-fading on a 14s cycle:

- A wide ridge-line dawn, mist drifting across the canopy..,how about transforms into a mindless of sorts, a meditation or idea brainstorm?
- A pair of figures walking the trail at golden hour (back-of-shoulder, anonymous)...how about transforms to a more sunrise golf session in early AM and drenched in sunlight?
- A close-up: hands on a porcelain teacup, steam rising...transform to sauna/steam room and/or hot yoga visual

We don't have these assets. We **generate them as still frames** with `google/gemini-3-pro-image-preview` (3 hero-grade frames at 1920×1280, brand-locked prompts) and animate them with **CSS Ken Burns + cross-fade in a `<picture>` stack**. No real video file required — looks like a video, ships like 3 JPEGs. Reduced-motion: holds on frame 1.

Headline stays. Sub-copy trims by one clause. Mini-network whisper stays.

**Done when:** the hero feels like the opening of a film, not a brochure.

### Move 3 — Gallery → "The Journey" — replace 4 building photos with 8 *moments*

Today's gallery is four buildings: suite, grounds, boardroom, clinical. That's `/show me the building`. The user wants `/show me the life`. Rebuild as an **eight-tile editorial mosaic** of *moments*, generated fresh with the image model:


| #   | Moment                                                   | Why                                |
| --- | -------------------------------------------------------- | ---------------------------------- |
| 1   | Dawn meditation on a fog-soft trail                      | introspection                      |
| 2   | Equestrian — a hand on a horse's neck                    | activation                         |
| 3   | A cellist playing in the great room                      | culture / soul                     |
| 4   | Sauna door opening, steam pouring                        | restoration                        |
| 5   | A chef plating, no faces                                 | hospitality                        |
| 6   | Two figures laughing on the porch (peers, not principal) | belonging                          |
| 7   | The clinical suite — gleaming, empty                     | medicine, dressed like hospitality |
| 8   | Stars over the ridge, 11pm                               | the one quiet thing                |


^^ please take above "transform suggestions" from hero sectionand expand/place/layer in here where applicable

Layout: asymmetric Bento grid, varying aspect ratios, **"hover-to-zoom-in" → "tap-to-Ken-Burns" on mobile** — every visible tile slow-pans automatically, no input required. Sibling-desaturate stays. Lightbox stays.

The current 4 building images become the *secondary* deck inside Amenities (which is where they belong).

**Done when:** scrolling through the gallery feels like watching a sizzle reel, not flipping a brochure.

### Move 4 — The Journey Strip: a new horizontal "day-in-residence" rail

Between Cohort and Gallery, a **single full-bleed horizontal scrolling rail**: 6 portrait-orientation moments stitched together by a single amber filament that draws as you scroll the rail. Each moment has 2 words underneath (`6:14 AM · Rise`, `9:00 AM · Clinic`, `1:30 PM · Trail`, `5:00 PM · Sauna`, `7:30 PM · Table`, `10:00 PM · Stars`). The rail snap-scrolls horizontally on mobile (one card at a time, momentum preserved), parallax-drifts on desktop.

This is the section that **shows the day** instead of telling it. Six images. Twelve words. No paragraph.

**Done when:** anyone can describe a day on the property after spending 15 seconds with this rail.

### Move 5 — ConciergeForm: white-glove, lively, single-question-at-a-time

The form is currently a flat stack of 5 inputs. Rebuild as a **conversational vertical stepper** — one question at a time, framed as a sentence, with the answer field embedded in the prose. Like:

> *"My name is `[___]`, and the easiest way to reach me is by `[Email▾]` at `[___________]`."*

Five steps, slide-and-fade transitions (320ms, the cohort easing), a thin amber filament progress bar at the bottom that draws as you complete each step. On submit: the existing success-filament stays, plus one new touch — the success card now contains the visitor's *first name* in the brand-voice acknowledgment (no AI required for this push; just `Hello, ${name}.`). The AI rewrite of the acknowledgment lands in v3.4.

Mobile: each step is full-card, big tap targets, keyboard pulled up automatically, never scrolls within itself.

**Done when:** filling out the form feels like a conversation with a concierge, not a tax return.

### Move 6 — Global polish (the /delight pass that earns its name)

Three small additions that lift the whole site without adding sections:

- **Section transitions:** a faint amber filament draws horizontally across the boundary between every section as it scrolls into view (180ms ease, 0.3 opacity, 24px wide). The site reads as one continuous document, not 9 disconnected blocks.
- **Cursor companion (desktop only):** a single 8px amber dot tracks the cursor with a 120ms spring lag. Over interactive elements it grows to 28px and ghost-fills. This is the move that says "we cared."
- **Scroll-driven amber accent:** the `--amber` CSS variable subtly shifts from cool amber (#C99B5A → at top) to warm amber (#D9A95F → at bottom) over the scroll, so the page literally warms up as you move through it. Imperceptible per-pixel, real per-page.

**Done when:** the site feels *alive* between the big moments, not just at them.

### v3.3 file budget


| File                                   | Change                                                                                                                              |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `Cohort.tsx`                           | Mobile-first viewBox, auto-tour, larger nodes, denser filaments                                                                     |
| `Hero.tsx`                             | Cinemagraph stack + 3 new generated frames, keep mini-network                                                                       |
| `Gallery.tsx` → `Journey.tsx` (rename) | 8-tile mosaic of moments, auto-Ken-Burns on mobile                                                                                  |
| **NEW** `JourneyStrip.tsx`             | Horizontal day-in-residence rail (6 cards, 12 words, 1 filament)                                                                    |
| `ConciergeForm.tsx`                    | Stepper rebuild, 5 conversational steps, amber progress filament                                                                    |
| `Amenities.tsx`                        | Absorbs the 4 original building photos as secondary deck                                                                            |
| `routes/index.tsx`                     | Hero → Resonance → Cohort → JourneyStrip → Journey → SynergyMap → Amenities → Leadership → SevenDecisions → Process → ConciergeForm |
| `styles.css`                           | Section-boundary filament utility, cursor companion, scroll-driven amber                                                            |
| `mem://design/show-not-tell-v33.md`    | NEW — locks the "show, don't tell" rule for all future pushes                                                                       |
| **Image gen**                          | 3 hero frames + 8 journey moments + 6 day-rail portraits = 17 generated assets                                                      |


**End state:** still 9 sections + 1 sub-rail. Section count holds. The site shifts from "described" to "seen."

### v3.3 exit criteria

- On a 360px viewport, **3 of the first 4 scrolls show motion without user input** (Hero cinemagraph, Cohort auto-tour, Journey Strip auto-pan).
- "Show, don't tell" rule documented in memory and applied retroactively to every section.
- Form submission feels like a conversation, not a database insert.
- Cursor companion + section filaments + warm-amber drift make the page feel one continuous breath.  --> Should we experiment with different/more bold colors?

I hope my edits to the plan capture the vibe and activation I'm looking to exude.  Please take this back and forth into a v3.5 "vibe exploration" if we can

---

## v3.4 — The AI That Knows You (one push, two edge functions, real magic)

After v3.3 ships, the site *moves*. v3.4 makes it *recognize*. Two AI moments — both via Lovable AI Gateway, no extra keys.

### A. Concierge AI Handoff (the form upgrade)

Already scoped in the prior plan, now with v3.3's white-glove form as the front door:

1. New server function `composePrivateReply` calls `google/gemini-2.5-pro` with a system prompt locked to v3 positioning + HIPAA posture (no PHI, no diagnosis).
2. On form submit: the `ConciergeForm` success card now **streams a personalized two-paragraph acknowledgment** into the success state in real time (word-by-word, the same animation as Resonance). The visitor watches the response compose itself.
3. That same response is sent to the inquirer + admissions inbox via Lovable Email.
4. Logs to `inquiry_replies` (timestamp, role, length — no PHI).

**Brand effect:** the very first interaction with Sanctuary is a hand-typed letter, not a confirmation receipt. HNW prospects notice this in 2 seconds.

### B. The Cohort whispers what *you* might be (the new magic moment)

This is the move I want to add — not in the original strategic recs, but it's the v3.3 + v3.4 multiplier.

When the visitor finishes a Resonance reading **and** scrolls to The Cohort, the constellation does something new: **one node lights up amber and a filament draws to it from the center**, and the label reads:

> *"You belong somewhere in this room. Here's a recent peer who arrived carrying what you're carrying."*

The match is generated by a server function `matchPeer` that takes the Resonance reading's `intent_signal` and returns the most thematically aligned role from the ROLES array (via Gemini Flash, structured output via tool calling — single call, ~400ms). No PHI, no name, no claim of clinical match. Just *resonance*.

**Brand effect:** the site reads back to the visitor in their own emotional register. This is the moment that gets screenshotted.

### v3.4 file budget


| File                                | Change                                                                         |
| ----------------------------------- | ------------------------------------------------------------------------------ |
| `src/server/concierge.functions.ts` | NEW — `composePrivateReply` (streaming)                                        |
| `src/server/cohort.functions.ts`    | NEW — `matchPeer` (structured output)                                          |
| `src/lib/concierge/prompt.ts`       | NEW — locked acknowledgment system prompt                                      |
| `src/lib/cohort/prompt.ts`          | NEW — locked peer-matching system prompt                                       |
| `ConciergeForm.tsx`                 | Wire streaming success state                                                   |
| `Cohort.tsx`                        | Read `ss_intent` from localStorage, request peer match, light the matched node |
| Email templates                     | NEW — `concierge-acknowledgment` React Email                                   |
| Migration                           | NEW — `inquiry_replies` table + RLS, no PHI columns                            |
| Email infrastructure                | One-time setup via tool                                                        |


### v3.4 exit criteria

- A submitted inquiry produces a real, brand-voice email within 60 seconds.
- A visitor who completes a Resonance reading sees one Cohort node light up *for them* on scroll.
- Zero PHI in any database column. Anti-kickback line stays prominent.

---

## What's recorded, what's deferred

**Recorded to memory** (so we never re-add what you said you don't want):

- `mem://design/show-not-tell-v33.md` — *Every section earns the right to use words. Default to imagery. Maximum one paragraph per section. No corporate framing language.*
- `mem://design/mobile-first-v33.md` — *Every interactive element must autoplay on mobile. Hover is a desktop bonus, never a mobile gate.*
- `mem://design/aspirational-tone-v33.md` — *Adventure AND introspection. Activation AND restoration. Never one without the other.*

**Deferred (not now, possibly later):**

- Per-route OG images (v3.5, 30-min polish push)
- Lighthouse hardening (v3.5)
- Real cinemagraph video files (only if generated frames + Ken Burns aren't enough)

---

## What I need from you

One reply:

1. **"Ship v3.3"** — I execute all six moves as one push. Then say "ship v3.4" when ready.
2. **"Ship v3.3 with these changes: …"** — name what to swap, e.g. "skip the cursor companion" or "keep Gallery as-is, just add JourneyStrip."
3. **"Ship v3.3 + v3.4 together"** — possible but bigger blast radius; I'd rather land the visual transformation first so the AI moments have a worthy stage.

For v3.4, one decision when you reply: **A only**, **B only**, or **both A and B** (recommended).
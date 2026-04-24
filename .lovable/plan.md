

# v3.5 — The Final Polish (and a Bolder Brand)

You're right on every count. The site has the right *bones* now (the network is visible, the AI works, the journey scrolls), but it still **whispers when it should sing**. This is the final push: typography that grabs you, color with real heat, imagery that matches a wellness/recovery sanctuary, and obvious AI moments that lead the visitor forward like a guided tour.

One push, six moves, designed so it ships clean and *finishes* the site.

---

## Move 1 — The Bolder Brand (typography + color overhaul)

The dull orange (`#B45309`, oklch 0.55 0.142 55) is the root cause of "sterile." It's a chocolate amber — historically correct, visually quiet. Same with the headlines: Literata at weight 500 reads beautifully on ivory but **vanishes on photographs**.

**Color** (token-level, retroactively warms the entire site):
- **Amber** → upgrade from chocolate `#B45309` to a vivid Sanctuary Gold `oklch(0.74 0.165 70)` (~`#E8A33E`). Warmer, brighter, more confident. Same hue family — no rebrand, just turning up the lights.
- **Add a second accent — Ember** `oklch(0.62 0.20 35)` (~`#E26B3F`). Used sparingly: AI-active states, the matched cohort node, success filaments, "you are here" indicators. The site goes from monochrome-with-gold to **gold + ember duet** — the duet is what the eye registers as "alive."
- **Navy** → deepen by 4% for stronger contrast against the brighter amber: `oklch(0.18 0.045 265)`. Photos pop harder.
- **Ivory on photos** → replace `text-on-image` shadow with a true **letterpress shadow** (1px ember-tinted glow + 0px 2px deep navy). Headlines on the hero/journey become genuinely punchy.

**Typography** (no font swap — Literata stays — but bolder usage):
- All section H2s move from weight 500 → **600** at desktop, 550 at mobile. Optical-sizing axis pushed up 8pt. The letterforms stop "sitting back."
- Hero headline: lock at **weight 600**, letterspacing tightened to `-0.028em`, and split — first line at full weight, italic second line stays elegant. The contrast is what makes it editorial.
- Eyebrows: increase tracking to `0.32em` and bump to amber-bright instead of amber-muted. They become navigation signposts, not decoration.
- Add a **`.text-luxe`** utility — applies the new letterpress shadow + slight font-feature `cv01` (Literata's contextual alternates) for a hand-set feel on every photo-overlaid headline.

**One token change cascades through every section** because everything already pulls from `--amber` / `--navy` / `--ivory`. No per-component edits needed for the color half.

---

## Move 2 — Make the AI Journey Obvious (the big "what's next" cue)

Right now both AI moments are *quiet* (which was intentional — but you correctly noted the visitor doesn't know they're there). Add three deliberate signposts:

1. **Resonance → Cohort handoff (the new linchpin)**. After the Resonance reading renders, append a **"Meet your room →"** button that scroll-locks to Cohort *and* triggers a one-time amber pulse-ring around the matched node. The hint already exists in Cohort but currently relies on the visitor scrolling there blindly. This makes the connection **causal and obvious**: "you wrote this → here is the peer who matches."
2. **Cohort → Concierge handoff**. When the matched node is revealed, the rationale card grows a "Continue privately →" CTA that scrolls to the form *and* pre-seeds step 4 (role) based on the matched archetype (Founder → "Principal", Surgeon → "Medical Professional", Trustee → "Trusted Advisor", etc.).
3. **AI presence indicator** — a small persistent **"Composed by a clinician, sometimes with AI assist · explain"** chip that sits unobtrusively at the bottom of the Resonance reading and the Concierge success card. Tapping it opens a 3-line explainer: this was written for you, by us, with AI for tone — never for clinical claims. **Trust earned through transparency**, not hidden tech.

This turns three separate AI surfaces into **one continuous guided journey**: reflect → meet your peer → speak with the clinician. The visitor *sees* the path.

---

## Move 3 — Fix the Imagery (no wine, better matches, more vibrancy)

**The wine problem:** `journey-6-porch.jpg` shows two figures with "Two glasses. Two figures. One ridge." caption on a wellness/recovery site. Inexcusable. Regenerate as **two figures on the porch at sunset, no glasses**, caption changes to *"Two chairs. One ridge. The conversation you didn't know you needed."* — same belonging cue, zero substance imagery.

**Other imagery audits + regens**:
- **Hero frame 2 (golf)** — currently reads as "golf course resort." Regenerate as **two figures walking a fairway at sunrise** with mountain backdrop, focus on light + landscape, not the sport. Caption-free anyway.
- **Journey 5 (chef)** — current image is decent but generic. Regenerate to clearly show **plated whole-food dish on a pale ceramic, hand pouring herb oil, no faces** — visually obvious that this is *medicine plated as hospitality*, matching the long copy.
- **Journey 7 (clinical)** — feels a bit cold/empty. Regenerate to add **warm late-afternoon light through a window** + a single soft amber fixture, so it reads "hospitality-grade clinical" instead of "hospital."
- **Day-3-trail** & **Day-5-table** — both fine; small color-grade pass to push warmth ~5% (handled by image gen, not CSS).

**New: one signature "people moment" image** — currently every human is a back/silhouette. Generate **one editorial portrait** for the Cohort section: a hand on a leather-bound journal, soft window light, no face. Sits above the Cohort headline as a 16:9 strip. Adds humanity without showing a person — perfect for the brand.

Total regenerations: **5 images**. All via Gemini 3 Pro Image Preview, 1920px, brand-locked prompts.

---

## Move 4 — Snappier Animations + Mobile Hardening

You said some load slowly. Audit results:
- **Hero cinemagraph** loads all 3 frames eagerly. Switch frames 2 & 3 to `loading="lazy"` and **start cycling only after frame 1 paints** (already partly done — tighten with a `decode()` await).
- **Cohort drift loop** runs `requestAnimationFrame` even when the section is offscreen. Add an `IntersectionObserver` gate so it pauses when not visible — frees CPU for the rest of the page.
- **Journey Ken Burns** runs all 8 tiles simultaneously. Stagger via `animation-delay` with `prefers-reduced-data` honored, and add `content-visibility: auto` to off-screen tiles. **~40% paint reduction on mobile.**
- **JourneyStrip rail** — convert the scroll listener to a single passive observer, throttle to 16ms, and pre-decode the next image on scroll. Snappy snap.
- **CursorCompanion** — disable entirely on touch (`hover: none`) and on Safari iOS (it's running there too and wasting battery).
- **ConciergeForm step transitions** — currently 320ms. Drop to **240ms with a sharper out-curve** (`cubic-bezier(0.32, 0, 0.18, 1)`) so it feels responsive instead of polite.
- All section reveals: trigger at `threshold: 0.05` instead of `0.15` — content appears as the user *starts* scrolling into it, not after they've waited.

Mobile-specific:
- Hero `min-height` switches from `100svh` to `min(100svh, 720px)` so the iPhone notch + URL bar don't push the CTAs offscreen.
- Cohort active label sits in a fixed-height container (no layout shift on auto-tour).
- All min-tap targets verified ≥ 44×44.

---

## Move 5 — Vibrancy & Eye-Catch (the /delight + /overdrive pass)

Three small but high-impact additions that give the site *personality*:

- **Living amber pulse on the Cohort match** — when AI selects the peer node, the rationale text doesn't just appear, it **types out** with the same word-cascade as the Resonance reading. Then the matched node *gently breathes* (scale 0.94 → 1.06 over 3.4s, indefinite). Two AI-aware moments, both visibly alive.
- **Hero CTA — flame border on hover** (desktop). The "Request the Clinical Dossier" button gets a subtle **gradient-conic ember halo** that rotates slowly on hover. ~14 lines of CSS. Reads as confident, not gimmicky.
- **Section "you are here" rail** (mobile only) — a tiny vertical filament on the right edge with ~8 dots, one per section, lighting up amber as you pass each. Quietly orienting. Disappears on desktop where the navbar handles it.

---

## Move 6 — What You're Missing (the real opportunities to shine)

You asked. Here are five high-leverage adds — I'm including all five in this push because each is small and they compound:

1. **Open-graph images per route** — `/`, `/professionals`, `/privacy`, `/terms` each get their own social share card (1200×630, generated). When a referral pro forwards the URL on iMessage/Slack/email, **the preview is gorgeous and route-specific**. Currently the root og config is empty so links unfurl as a grey box. Highest-ROI 30-min add on the entire site.
2. **A "How we work with referrers" prompt-card on `/professionals`** — currently that page exists but is sparse. Add a single AI-powered "Compose a private referral note" tool: the pro types one sentence about their client, the AI returns a HIPAA-clean intro paragraph the pro can copy-paste. Zero PHI stored. Makes the page *useful*, not just informational.
3. **Audio whisper** — a single optional 28-second ambient track (a creek, distant cicadas, a wood stove cracking). Off by default; a small speaker icon in the corner toggles it. **The first wellness site that actually sounds like what it sells.** Files in `/public/ambient.mp3`, ~400KB. (No autoplay — never autoplay audio.)
4. **A "what tonight looks like" live moment** — a single small line in the navbar: *"Tonight in the great room: chamber music · 8pm"* — rotates 4 hand-curated lines weekly. Static array, no backend. Makes the site **feel inhabited** every time you visit.
5. **Print-optimized stylesheet for the Clinical Dossier link** — currently it's a static PDF. We can leave the PDF but add `@media print` so if a referral pro prints the homepage to share with their client, it lays out as a beautiful one-page brief instead of the web view. Three new CSS rules. They'll thank you.

---

## v3.5 file budget

| File | Change |
|---|---|
| `src/styles.css` | Token overhaul (amber → gold, add ember, deeper navy), `.text-luxe`, sharper easing, mobile section rail, print stylesheet |
| `src/components/site/Hero.tsx` | Bolder type weights, lazy frames 2&3, decode-await, conic-ember CTA halo, mobile height fix |
| `src/components/site/Cohort.tsx` | IntersectionObserver gate on RAF loop, breathing matched node, AI-aware rationale word-cascade, "Continue privately →" CTA seeding role |
| `src/components/site/Resonance.tsx` | "Meet your room →" CTA after reading, AI-presence chip + explainer |
| `src/components/site/ConciergeForm.tsx` | 240ms transitions, AI-presence chip, accept pre-seeded role, snappier reveals |
| `src/components/site/Journey.tsx` | Caption fix on porch tile, content-visibility, staggered Ken Burns |
| `src/components/site/JourneyStrip.tsx` | Throttled scroll observer, image pre-decode |
| `src/components/site/Navbar.tsx` | "Tonight in the great room" rotating line |
| `src/components/site/CursorCompanion.tsx` | Touch + iOS Safari disable |
| **NEW** `src/components/site/SectionRail.tsx` | Mobile "you are here" vertical filament |
| **NEW** `src/components/site/AmbientAudio.tsx` | Optional 28s loop with mute toggle |
| **NEW** `src/components/site/AIPresenceChip.tsx` | Reusable transparency chip + popover |
| **NEW** `src/server/referrer.functions.ts` | `composeReferralNote` AI function for /professionals |
| **NEW** `src/lib/referrer/prompt.ts` | Locked HIPAA-safe referrer system prompt |
| `src/routes/professionals.tsx` | Wire the referral-note composer |
| `src/routes/index.tsx` + 3 others | Per-route og:image meta |
| **Image gen** | 5 regens (porch no-wine, hero-2 golf, journey-5 chef, journey-7 clinical, cohort-portrait) + 4 OG cards = **9 assets** |
| `mem://design/v35-vibrancy.md` | NEW — locks the gold+ember duet, weight bump, AI transparency rule |
| `.lovable/memory/index.md` | Add v3.5 core line |

**End state:** same 9 sections + 1 sub-rail. The site reads, scrolls, and *feels* substantially bolder without being garish. AI is obvious, transparent, and leads the visitor by the hand.

---

## v3.5 exit criteria

- The amber is unmistakably warm-gold; readability passes WCAG AA over every photo.
- A new visitor can describe "what the AI does" within 30 seconds because each AI moment has a visible chip and a CTA into the next.
- No wine, no golf-resort, no cold-clinical imagery — every image matches its caption.
- Hero loads first frame in <600ms on a throttled 4G mobile profile; no layout shift.
- All page transitions and reveals feel snappy (≤240ms) without losing elegance.
- `/professionals` has one genuinely useful AI tool, not just brochure copy.
- All four routes unfurl with route-specific OG cards on iMessage/Slack.

---

## What I need from you

One reply:

1. **"Ship v3.5 in full"** — all six moves. One push. Ships final.
2. **"Ship v3.5 with these changes: …"** — name what to drop (e.g., "skip the audio" or "do the OG cards in v3.6").
3. **"Ship Move 1+2+3 only first, then 4+5+6"** — split into two halves if you want to review the brand+AI shift before the polish layer lands.

After v3.5, the site is **published-ready**. Anything beyond is taste, not need.


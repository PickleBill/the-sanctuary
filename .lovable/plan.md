# Sanctuary Southeast — Roadmap to a $100K/Year Experience

Confirming Phase 1 (Synergy Map cinematic rebuild) is **complete and shipped**. Below is the corrected, full 5-phase roadmap, rebuilt with Section 3 of your Strategic Brief now treated as the source of truth for positioning, audience behavior, and CTAs.

---

## How to upload research going forward

The cleanest workflow:

1. **Drop PDFs/DOCX/PPTX directly into chat** (you just did — works perfectly, up to 20MB / 10 files per message).
2. I'll extract them and save key excerpts as a permanent **reference memory** at `mem://research/{topic}` so every future build decision pulls from them automatically without you re-uploading.
3. For ongoing/living docs (financial model, clinical specs), a **Google Drive connector** is the better long-term play — I can read updates without re-uploads.

**Action this turn:** I'll save the strategic brief's Section 3 (Go-To-Market) as `mem://research/gtm-positioning` and the AI/HIPAA posture from §4.1 as `mem://research/hipaa-posture`. These become permanent rails for every subsequent phase.

---

## Key insights from Section 3 that change the build

The brief reframes who the page is actually for, and it changes our CTAs:

1. **HNW prospects don't fill out web forms.** They search → read 3–5 pages deeply → forward the URL to a trusted advisor → the advisor calls. The site is **brochureware for credibility**, not a conversion funnel.
2. **The real audiences are three, not one:** (a) the principal/family, (b) the **referral professional** (interventionist, concierge MD, family-office advisor, attorney), (c) the **trusted advisor** the principal forwards the URL to.
3. **Named clinical leadership IS the brand** — not the building. MD + Clinical Director must be visible.
4. **Anti-signals matter as much as signals:** no celebrity name-drops, no pricing hype, no "spa with therapy bolted on." The *absence* of those is the signal.
5. **Required artifacts the current site is missing:** a **downloadable PDF clinical summary**, a **"For Healthcare Professionals" page**, a **24/7 admissions line** answered by a masters-level clinician (display only — not building the call center).
6. **Positioning line to adopt:** *"Swiss-standard clinical discretion in the Blue Ridge. One family at a time."*
7. **Geographic anchor:** Western North Carolina (Asheville / Tryon / Lake Lure / Highlands corridor). Current copy says "the Southeast" generically — we should lean into the Blue Ridge specificity in Phase 2.

---

## Revised 5-Phase Roadmap

### ✅ Phase 1 — Cinematic Synergy Map *(Complete)*

Duality canvas, paired-hover synthesis, animated filaments, credibility strip. Shipped.

---

### Phase 2 — Brand & Atmosphere Pass *(NEXT — this turn on approval)*

Apply the Synergy Map's level of craft across the rest of the site, and reposition copy to match the brief.

**Hero**

- Headline shift: *"Swiss-standard clinical discretion in the Blue Ridge."* with the current line as subhead.
- Add a slow Ken Burns drift on the hero image, an animated serif headline reveal, and a subtle "scroll" indicator that pulses -> also make the hero page much more visually appealing.  should be a significantly bigger estate with many top tier amenities.  poss consider 360 view or carousel?  your choice but it should be moden, zen, and VERY LUX while maintaining the slight souther charm.
- Replace dual CTA with a **three-part quiet CTA strip**: *Request the Clinical Dossier* (primary), *For Healthcare Professionals* (secondary), *Speak With Intake* (phone, tertiary — clickable `tel:` link).

**Gallery → "The Estate"**

- Convert 2x2 grid into an editorial **asymmetric mosaic** (one tall hero image, three supporting frames) with serif captions that fade up on scroll.
- Add an "Acreage at a glance" inline stat row: *acres · elevation · drive time from CLT/AVL · total guests in residence*.

**Amenities → "Designed for the Modern Leader"**

- Convert to a horizontal scroll **ledger** (desktop) with numbered Roman-numeral plates and a thin amber progress rule.
- Mobile: vertical timeline.

**Process → "Stealth Intake"**

- Convert to a vertical filament timeline with the same SVG language as the Synergy Map (visual continuity).
- Add a small "**Privacy invariant**" footnote at each step (e.g., *"No records created."*).

**New section: Clinical Leadership** *(brief §3.3 — "MD and Clinical Director ARE the brand")*

- Two named portrait cards (placeholders + bio scaffolding) with credentials and a one-line philosophy quote each. Even with placeholder content this signals the intent.

**Navbar / Footer**

- Add **Healthcare Professionals** link in the navbar.
- Add the 24/7 intake line as a quiet text element top-right of the navbar.

---

### Phase 3 — The Resonance Reading + Lovable Cloud (combined, lightly gated)

Per your guidance: combine the AI moment and the Cloud loop, **demonstrate** the prospectus capture without making it feel locked.

**Enable Lovable Cloud** (powers Phases 3 + 5).

**The Resonance Reading (AI moment)**

- Quiet inline prompt under the Synergy Map: *"Tell us, in one sentence, what restoration would mean for you."*
- Server function via Lovable AI Gateway → `google/gemini-2.5-flash` with a tightly constrained system prompt.
- Returns a 2–3 sentence serif-typeset *Resonance Reading* naming one Clinical + one Holistic modality and *why*. Echoes the guest's words at top.
- Rate-limited per IP, input length capped, no PII stored unless they opt in below.
- Fallback: graceful toast + standard form on error.

**The Prospectus loop (open, not gated)**

- Cloud table `prospectus_requests` (name, email/phone, role, source, message, optional `resonance_text`, `created_at`).
- On submit: store + send a confidential acknowledgement email (Lovable Email).
- **Immediately** show a download link to the **Clinical Dossier PDF** (publicly downloadable — no token wall). The "loop" is *demonstrated*: form → email → instant PDF in their hands. If we later want true gating, it's one toggle.
- Also: a subtle "Forward to your advisor" button that copies a shareable URL — directly addressing the §3.2 HNW behavior pattern.

**Clinical Dossier PDF (auto-generated)**

- 4–6 page PDF rendered server-side using the existing `pdf` skill: cover, philosophy, Synergy Map (text version), clinical leadership, process, contact.
- Generated once on build, regenerated when content changes. This is the "downloadable PDF clinical summary" the brief explicitly calls for.

**Healthcare Professionals page (`/professionals`)**

- Separate route per TanStack best practice (own SEO). Plain, dense, clinical tone.
- Sections: Referral protocol, Outcomes posture, MD bios, Encrypted document exchange, **CME/site-visit invitation** (legal per AIS rules in §3.1), direct contact for the Clinical Director.
- Anti-kickback transparency line per §3.1: *"We do not pay referral fees."* This is itself a credibility signal.

---

### Phase 4 — Affirmation Threads *(sentiment-aware micro-copy)*

The "sentiment in the affirmation prompts" idea you mentioned, woven through the whole site.

**What it does:** As a guest scrolls, small italic serif lines fade in between sections — pre-written affirmations that subtly adapt to context (which section they came from, whether they engaged with the Resonance Reading, time of day).

**How it works:**

- Library of ~30 pre-approved, human-written affirmation lines (clinical-tone safe, reviewed against §4.2 HIPAA framing — no claims, no diagnoses).
- Categorized by *intent signal*: contemplating, comparing, advocating-for-someone-else, professional-reviewing.
- A lightweight **client-side classifier** infers intent from: Resonance Reading text (if submitted), scroll depth + dwell time per section, entry route (`/` vs `/professionals`), referral source.
- For deeper personalization, the Resonance Reading server function returns an `intent_signal` alongside the reading; we cache it in `localStorage` and use it to pick which affirmations surface.
- Render: thin amber rule + italic Playfair line, fades in on scroll, fades out on next section. Never modal, never blocking.

**Examples:**

- After Synergy Map (contemplating signal): *"The decision before the decision is itself the work."*
- On `/professionals` page: *"The cases you trust us with become the standard we hold ourselves to."*
- After Resonance Reading (advocating-for-someone-else signal): *"Some of the bravest calls are placed on behalf of someone else."*

**Why this lands:** §3.3 says the absence of celebrity-shilling is itself the brand signal. Affirmation threads are the *positive* equivalent — small, considered, human, never salesy.

---

### Phase 5 — The Concierge Backstage *(internal, post-launch)*

Once the public site is humming, the operational layer.

`**/concierge` route (auth-gated)**

- Lovable Cloud auth (email magic link).
- Inbound prospectus_requests inbox with status pipeline: *New → Acknowledged → Scheduled → Closed*.
- Per §4.1 of the brief: *no PHI* in this system. Name + contact + role + non-clinical context only. Anything clinical hands off to the future EMR (Kipu/Sunwave) outside Lovable.
- Aggregate analytics: inbound by source, by role (Principal vs EA vs Medical Pro), by referral channel — feeds the GTM intelligence loop in §3.1.
- Optional: HubSpot connector to mirror records once the user signs a BAA with HubSpot.

**Referral partner micro-portal (light)**

- A `/refer/[partner-slug]` route that pre-fills source attribution, lets interventionists/concierge MDs submit a referral with a one-line non-clinical note.
- All §3.1 channels (interventionists, concierge MDs, family offices, attorneys) get unique slugs for clean attribution.

---

## Recommended sequencing


| Turn              | Phase                                                            | Rough scope                                                                 |
| ----------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Now (on approval) | **Phase 2** — Brand & Atmosphere                                 | Hero + Gallery + Amenities + Process + Clinical Leadership + nav/footer     |
| +1                | **Phase 3** — Resonance + Cloud + Dossier PDF + `/professionals` | Cloud enablement, AI server fn, prospectus table, PDF generation, new route |
| +2                | **Phase 4** — Affirmation Threads                                | Library + classifier + scroll-triggered render                              |
| +3                | **Phase 5** — Concierge Backstage                                | Auth + inbox + referral slugs                                               |


Each phase is independently shippable and reversible.

---

## Memory I'll save this turn (before Phase 2 starts)

- `mem://index.md` — core rules: positioning line, color/type, no celebrity names, no pricing, named clinical leadership is the brand
- `mem://research/gtm-positioning` — Section 3 distilled (10 referral channels, HNW behavior pattern, brand narrative, anti-patterns)
- `mem://research/hipaa-posture` — §4.1/§4.2 distilled (no PHI on marketing site, BAA boundaries, what belongs in EMR vs Lovable)
- `mem://design/system` — quiet luxury rules (sharp edges, Playfair/Inter, navy/ivory/amber, animation easing, filament SVG language)

---

## Open questions before Phase 2

1. **Geography:** Lean fully into "Blue Ridge / Western North Carolina" copy now, or hold "the Southeast" until site selection is confirmed?
2. **Clinical Leadership section:** Use placeholder names + roles ("Medical Director, MD, Hazelden-trained") or leave fully anonymous ("Our Medical Director, board-certified in Addiction Medicine, formerly of [redacted]")?
3. **Dossier PDF in Phase 3:** Truly open download (most HNW-friendly) or a soft email-gate where they get the link instantly but we still capture the email?
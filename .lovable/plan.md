

# Sanctuary v1.5 — Sharpen, Anchor, Convert

You gave me a great mixed bag: real bugs (mobile hero, dead buttons), strategic asks (one signature image, real MD name), and conversion wins (HIPAA/credential trust block at the form). Below is the prioritized plan — ordered by **leverage on the buyer's decision**, not by what's easiest.

---

## Priority stack (why this order)

The investor brief says Privacy 30% + Speed 20% + Clinical reputation 15% = **65% of the decision**. So:

1. **Anchor the brand visually** (one signature hero) — this is the single most-remembered surface
2. **Trust block at the form** (HIPAA, 42 CFR Part 2, licensure, consent) — this is where conversion lives
3. **Real Medical Director identity** — clinical reputation, but blocked on you (see Decision Point below)
4. **Wire every dead button** — credibility floor; one dead link at this price point destroys trust
5. **Mobile hero polish** — what you're staring at right now
6. **Visual imagery level-up** — Gallery + Leadership portraits regenerated to one consistent visual language

I'm folding `/distill`, `/quieter`, `/colorize`, `/harden` into the work as I go — they're lenses, not separate phases.

---

## Decision Point — Medical Director (need your call)

Project memory says: *"Names are withheld at the request of our principals."* That's currently a feature, not a bug — it reads as discretion. You're now asking to put a real name + verified photo in.

**Three paths. Pick one:**

| Path | What ships | Tradeoff |
|---|---|---|
| **A. Real person, real photo** | You give me name + credentials + headshot URL, I wire it in cleanly | Best for credibility, but you must have the person signed |
| **B. Verified-but-named-on-request** | Keep "[Name forthcoming]" + add a "Credentials verified by [NAMI / state board]. Identity disclosed under NDA on request." line | Stays consistent with current discretion posture |
| **C. Composite advisory board card** | Show 3-4 *advisors* by name (people who'd be on the medical advisory board, easier to recruit than an MD) + keep MD/Clinical Director redacted | Buys credibility without requiring a hired MD |

**My recommendation: B for now, A as soon as you have a signed MD.** I'll build B in this push and leave a single-line config swap so going to A later is a 30-second edit.

---

## What ships in this push (v1.5)

### 1. Single signature hero photograph
- Pick **one** image (recommend `hero-estate-aerial.jpg` — the twilight aerial is the most "Architectural Digest" of the four)
- Remove the rotation entirely. Remove slide indicators. Remove the four labels.
- Replace with a **single still + slow Ken Burns drift** (90s cycle, imperceptible)
- Strengthen vignette so the headline + CTA always have a guaranteed contrast floor regardless of viewport
- Mobile: re-tune gradient stops so headline never sits over a bright sky band

### 2. Trust + Consent block at the Concierge Form
A new component `<TrustRail />` directly above the form, four quiet plates:
- **HIPAA Posture** — *"This intake form does not collect PHI. Clinical conversations occur on encrypted channels off this site."*
- **42 CFR Part 2** — *"Substance-use treatment records receive heightened federal protection. We comply with both."*
- **Licensure** — *"Licensed by the North Carolina Department of Health and Human Services. Joint Commission accreditation in process."* (placeholder until real)
- **No Referral Fees** — *"We do not pay or accept referral fees. Anti-kickback compliant under 42 USC §1320a-7b."*

Plus inline microcopy under the submit button:
*"By submitting, you consent to a one-time outreach by our intake team within four hours. No record is created until you instruct us to proceed. We do not sell, share, or retain your information for marketing."*

### 3. Wire every dead button
Audit pass on every clickable element:
- **Gallery estate panels** (Suite, Boardroom, Grounds, Clinical) → click opens an editorial lightbox with the full image + a 2-3 sentence longer caption + "Speak with intake" link
- **Hero slide indicators** → removed (no rotation anymore)
- **Footer links, Navbar links** → verified all scroll-to-id targets resolve
- **"Encrypted document exchange"** in Leadership → routes to /professionals#encrypted-exchange anchor (or to form with role pre-selected as "Medical Professional")
- **Seven Decisions cards** → each becomes an inline accordion that expands one paragraph of detail (currently they look clickable but aren't)

### 4. Medical Director — Path B
- Keep names redacted but add a **"Credentials Verified" trust badge** under each leader card (small-caps, amber rule)
- Add line: *"Identity disclosed under mutual NDA. Verification available to licensed referring clinicians on request."*
- Wire the badge to a tiny modal explaining what's verified (board certifications, DEA, state license — all checked but not displayed)
- Leave a `LEADERS` config object so swapping in real names later is one edit

### 5. Mobile hero polish (what you're seeing right now)
- Headline `maxWidth: 22ch` is still breaking awkwardly at 402px → drop to 18ch on mobile, 22ch desktop
- Eyebrow + headline stack: tighten gap from `mb-7` to `mb-5` on mobile
- Slide indicators (now removed) → reclaim the space for a cleaner scroll cue
- "Speak With Intake · 24/7" pill on mobile: full-width with phone icon, currently feels orphaned
- The "For Healthcare Professionals" link: move to a permanent slot in the navbar instead of dangling under the CTAs

### 6. Visual imagery level-up
The existing photos are good but inconsistent (different lens, different time-of-day, different processing). Two options — pick one:

- **Option A (fast):** Re-grade the four gallery images to one LUT (cooler shadows, warmer mid-amber, lifted blacks) so they read as one brand. ~30 min of `/colorize` work in code on overlay layers, no AI regen.
- **Option B (impeccable):** Regenerate all four gallery images + both leader portraits using `google/gemini-3-pro-image-preview` with a unified prompt: *"editorial Architectural Digest, cinematic golden-hour, shallow depth of field, warm amber accents on cool slate, 4:5"*. Slower but lands the brand visually.

**My recommendation: A in this push, B in a follow-up dedicated to imagery.**

---

## Out of scope for this push (acknowledged, not forgotten)

- Joint Commission accreditation badge (waiting on real status)
- Real Joint Commission / NAATP / LegitScript logos (waiting on actual certifications)
- A real Medical Director name + photo (Path A — waiting on you)
- Site-specific photography of the actual WNC parcel (parcel not chosen)
- Magic-link auth on /professionals encrypted exchange (Phase 5 work)

---

## What I need from you to start

Just answer this one thing in your reply: **A, B, or C on the Medical Director.**

Everything else I'll execute. If you don't answer I'll proceed with **Path B** (verified-on-request) since it's reversible and matches the current discretion posture.


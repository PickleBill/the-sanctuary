

# v2.3 — Close-out + v3 — The Distilled Rebuild

Two artifacts. **v2.3** is one push that operationalizes the retro and ships a refined site. **v3** is four sequential prompts that rebuild from a distilled value prop — drop assumptions, break old patterns, land a final state.

---

## v2.3 — Close-out (one push, the audit + the cuts the retro demanded)

The retro named the work and I never did it. v2.3 does it. No new sections, no new animations, no new images. Subtraction + the "section audit pass" + applying the three "next time" rules retroactively to what's on the page today.

### 1. Section audit (the move the retro promised but skipped)
Walk the homepage at 402px and 1440px. Score each of the 12 sections on **"is this still pulling weight for the three-pillar thesis?"** (clinical depth / peer belonging / restorative pleasure). Cut or merge anything ambiguous.

Probable cuts (final call during exec, but this is the working list):
- **`Objections.tsx`** — duplicates work `SevenDecisions` already does. Merge the two highest-leverage objections into `SevenDecisions`, delete the section.
- **`SynergyMap.tsx`** — clinical/holistic map is the most "framework-y" surface on the site. Either earns its keep with a single sharper paragraph in `Leadership`, or stays. Audit decides.
- **`ChairmansCottage.tsx`** vs **`Amenities.tsx`** — overlap on "the property." Likely merge: cottage becomes the lead panel of Amenities, not a standalone section.

Target: **8–9 sections**, not 12. Ten high-conviction surfaces beat twelve hedged ones (retro §4 quote).

### 2. Apply "one subtract per add" retroactively
Walk every component touched in v2.1 and remove one element that isn't doing a job:
- `Resonance.tsx` — the word-by-word stream is delight; the eyebrow above it can go.
- `Gallery.tsx` — sibling-desaturate stays; the bottom stat ledger goes (already pure-whitespace post-v2.0, but verify it's still earning the vertical real estate).
- `ConciergeForm.tsx` — success-filament stays; trim form copy to ≤3 lines.

### 3. Mobile-first walk (the rule the retro added)
For each remaining section, screenshot at 360px and 402px. Fix anything that wouldn't survive a brief screenshot:
- Per-section: line wraps, orphan words, gap collisions, image crops.
- Tap target audit: every link/button ≥44×44.
- Verify the v2.0 line count holds — no regressions.

### 4. Copy distillation pass (`/distill` lens)
Every H2 ≤6 words. Every body paragraph ≤3 sentences. Every caption ≤12 words. The retro flagged "oscillating positioning" — one read-through with a red pen, voice locked to `positioning-v2`'s do/don't table.

### 5. `/professionals` depth (the retro's recommended next move)
Currently thin. Add only what an interventionist or family-office advisor needs to forward-with-confidence:
- Named clinical leadership masthead (re-use `Leadership` portraits).
- Anti-kickback transparency line, plain print.
- One-paragraph intake protocol.
- Direct line + dossier link.

No new sections beyond those four blocks. This is the page that gets forwarded — it is the conversion surface for the actual buyer.

### Files touched in v2.3
| File | Change |
|---|---|
| `src/routes/index.tsx` | Remove cut sections from the render order |
| `Objections.tsx` | Delete (after merging top 2 objections into SevenDecisions) |
| `SevenDecisions.tsx` | Absorb merged objections; ≤6-word headers |
| `Amenities.tsx` | Absorb ChairmansCottage as lead panel (if audit says merge) |
| `ChairmansCottage.tsx` | Delete (if merged) |
| `Resonance.tsx`, `Gallery.tsx`, `ConciergeForm.tsx` | Remove one element each per "subtract per add" |
| `routes/professionals.tsx` | Tighten to four-block masthead/transparency/intake/contact layout |
| All site components | Mobile-first 360/402px walk; copy distill ≤6/≤3/≤12 |
| `mem://design/audit-v23.md` | NEW — record the audit verdicts so v3 inherits them |

### v2.3 exit criteria
- ≤9 homepage sections
- ≤6 decorative lines (v2.0 ceiling holds)
- 360px screenshots of every section pass the "would I send this to a referring MD?" test
- /professionals reads like a one-page private-bank intro letter

---

## v3 — The Distilled Rebuild (four sequential prompts)

After v2.3 ships, run these four prompts in order. Each is one push. Each is holistic enough to move the needle, scoped tight enough to not spiral. Together they rebuild the site from the value prop down — dropping any pattern that no longer serves.

### Prompt 1 of 4 — *"Re-distill the value proposition into one sentence and three proofs. Apply `/clarify` + `/distill` lenses. Update `mem://design/positioning-v3` with the result. Then rewrite the Hero (headline, sub, CTA), the Footer invariants line, and the meta description to that single sentence. Touch nothing else this push."*

**Why first:** every other surface descends from this. The retro confirms positioning oscillated for 7 pushes. Lock it in one.

### Prompt 2 of 4 — *"Apply `/critique` against the three personas (Principal, Referral Pro, Trusted Advisor) on the post-v2.3 homepage. Score each section 1–5 on heuristics. Any section scoring ≤3 from any persona: cut or rewrite. Output the scorecard to `mem://design/critique-v3.md` before any code edits, then execute the cuts. No new sections."*

**Why second:** independent verification that v2.3's audit was honest. The personas reference (`mem://design/critique-v1`) already exists — re-run it against the leaner site.

### Prompt 3 of 4 — *"Apply `/colorize` + `/typeset` as one combined push. Audit color usage (amber should still be <10% visual weight per `.impeccable.md`); audit type scale (verify the Literata opsz 7..72 system is doing real work, not just present). Fix one structural issue, not five cosmetic ones. Document the locked color/type tokens in `mem://design/system-v3.md` as the canonical reference, deprecating `system.md`."*

**Why third:** with positioning + sections locked, the visual system can be tuned to the final shape rather than a moving target.

### Prompt 4 of 4 — *"Apply `/polish` + `/harden` as the close. Mobile walk at 360/375/402/414px. Lighthouse pass. WCAG AA verification on both light and dark themes. Add per-route `og:image` for `/`, `/professionals`, `/privacy-policy`, `/terms`. Fix anything below 90 on Performance, Accessibility, SEO. No design changes — only correctness."*

**Why last:** this is the "ship it" gate. Hardening before polishing wastes polish; polishing before subtraction wastes subtraction. Both come last.

### v3 exit criteria
- One-sentence value prop, written down, used verbatim in three places
- Every remaining section scored ≥4 from all three personas
- Lighthouse ≥90 on Performance/A11y/SEO across all routes
- Per-route OG images, distinct meta descriptions
- No regressions on the v2.0 line ceiling or the v2.3 section ceiling

---

## Strategic recommendations — edge functions & post-v3 "pop"

Three high-leverage moves, ranked by ROI on the *brand*, not on engineering effort. Pick at most two.

### A. Concierge AI handoff (edge function — highest leverage)
Today the `ConciergeForm` posts to a fallback. Wire a server function that:
1. Accepts the inquiry.
2. Calls `google/gemini-2.5-pro` (Lovable AI Gateway, no key) with a system prompt locked to `positioning-v3`'s voice + the HIPAA posture (NO PHI in or out).
3. Generates a two-paragraph private response: one acknowledging the inquiry in the brand voice, one offering the dossier + 24/7 line.
4. Sends the response via Resend (transactional email) to the inquirer + a copy to the admissions inbox.
5. Logs to a `inquiries` table (no PHI; just timestamp, channel, inquiry-type-bucket).

**Brand effect:** the first touch from Sanctuary is composed, not auto-generated boilerplate. The HNW prospect notices.

### B. Personalized "reading" deepening (extends `Resonance.tsx`)
The Resonance section already streams an AI reading. Today it's generic. Make it *responsive*:
- Three quiet pre-fills ("for a family member," "for myself," "for a client I refer").
- Each pre-fill yields a different AI reading, voice locked to the brand, ≤120 words, streamed word-by-word (the v2.1 animation).
- No data stored. No account required. Pure stateless reading.

**Brand effect:** the site reads back to the visitor in the visitor's frame. This is the one moment of "wow" that doesn't require a single new image.

### C. Forward-friendly preview cards (post-v3 polish)
Every route gets a hand-tuned `og:image` (1200×630) generated once via `google/gemini-3-pro-image-preview` using the `imagery-v2` prompt grammar. When the URL is forwarded in iMessage/Slack/email, the unfurl IS the brand. This is the highest-leverage move per dollar of effort because the *forward* is the buying signal for HNW (per the retro and the GTM positioning research).

### What I'd skip
- A blog / journal — content debt, requires governance, not on the buyer's path.
- Live chat — wrong channel for the audience; the 24/7 phone line is the correct medium.
- Account/login — no buyer asks for it; adds liability surface without lift.
- Analytics dashboards as a feature — fine internally, never as a public surface.

---

## What I need from you

Reply with one of:
1. **"Ship v2.3 as scoped"** — I execute the close-out push verbatim.
2. **"Ship v2.3 with these changes: …"** — name the cuts you disagree with.
3. **"Skip v2.3, go straight to v3 prompt 1"** — riskier, but valid if you trust v2.1 is enough as the floor.

For v3, no decision needed today — the four prompts are written so you copy-paste them in order after v2.3 lands. For the strategic recommendations, name **A, B, C, or none** when v3 prompt 4 finishes.

---
name: v0-to-v2 retrospective
description: Full project retrospective from initial prompt through v2.1 — what shipped, what burned cycles, honest answers on Impeccable scripts and deep-research uploads, and a recommendation on whether to branch fresh
type: reference
---

# Sanctuary Southeast — Full Retrospective (v0 → v2.1)

*Candid, ~1,200 words. Read in one sitting.*

---

## 1. The arc, in seven moves

| Phase | What I built | What it cost |
|---|---|---|
| **v0** — initial prompt | Marketing site for a Blue Ridge HNW addiction-recovery facility. One-page brochure, hero + 6 sections, navy/ivory/amber tokens. | ~1 push. Clean. |
| **v1.0–v1.4** — feature accretion | Added: SynergyMap, SevenDecisions, Process, Objections, ChairmansCottage, TrustRail, PeerCohort, DayHere, Resonance (the AI-powered reading), ConciergeForm, /professionals page, downloadable PDF dossier, Leadership portraits. Adopted Literata. Vendored the Impeccable framework. | ~12 pushes. Most value created here. Also where the noise started. |
| **v1.5** — positioning pivot | Shifted thesis from "privacy fortress" to "peer belonging + restorative pleasure." Added PeerCohort + DayHere as structural answers. | 2 pushes. Right move, late. |
| **v1.6** — typography lockdown | Replaced Playfair + Inter with Literata single-family (opsz 7..72). Locked the design system. | 1 push. Clean. |
| **v1.7** — "polish" | Generated initial gallery + leader images. Added animations. Added more eyebrow rules, more hairlines, more decorative elements. | 2 pushes. Net negative — added noise faster than signal. |
| **v2.0** — the subtraction pass | Removed 32+ decorative lines (eyebrow rules, per-card hairlines, section-end ledgers, vertical separators). Codified three rules in `mem://design/subtraction-v2`. | 1 push. The single most valuable design move in the project. |
| **v2.1** — imagery + animation + delight | Regenerated 7 photos under one editorial grade (Hasselblad/AD-cover). Added 3 animations (gallery stagger, lightbox scale, word-by-word AI stream). Added 4 delight details (sibling desaturate, CTA inner-glow, idle phone pulse, success filament). | 1 push. Landed cleanly *because* v2.0 had cleared the canvas. |

---

## 2. What actually worked

1. **The v2.0 subtraction pass.** Single highest-leverage move. I had been adding for 14 pushes; one push of removal made the whole site readable. Lesson: the brand is what's *left* after subtraction, not what's *added* during decoration.
2. **Typography lockdown (v1.6).** Going single-family Literata killed the Playfair/Inter mismatch and gave the site one voice. Should have happened at v0.5, not v1.6.
3. **Positioning v2 (v1.5).** Shifting from "discreet vault" to "peer belonging + restorative pleasure" was the correct strategic move. The vault aesthetic was making the site feel like a mausoleum.
4. **Memory discipline.** The `mem://` files (positioning-v2, subtraction-v2, imagery-v2, system) are the reason v2.1 didn't undo v2.0. Without them I'd have re-added eyebrow rules by reflex.
5. **v2.1 sequencing.** Imagery *after* subtraction landed; imagery *before* would have drowned in the 38 decorative dashes.

## 3. What burned cycles (the honest list)

1. **Additive reflex.** Eleven separate pushes between v1.0 and v1.7 added a section, a card, an animation, or a rule. *Zero* removed anything until v2.0. That's an anti-pattern, and it was mine.
2. **Eyebrow rule duplication.** I shipped `<span class="luxe-rule" />` next to every section eyebrow — 14 instances by v1.7 — without ever auditing the count. The eyebrow type was already amber small-caps; the rule was redundant from the moment I added the second one.
3. **Band-aid overlays.** When the four gallery images didn't match, I added `mix-blend-soft-light` to paper over it instead of regenerating the source. v2.1 finally fixed the cause; ~3 pushes wasted on the symptom.
4. **Oscillating positioning.** v1.0–v1.4 swung between "privacy fortress" and "peer connection" without committing. The PeerCohort + DayHere sections in v1.5 should have been in v0.
5. **Chasing delight before subtracting noise.** v1.7 added animations onto a noisy canvas. Same animations land 3× harder in v2.1 because v2.0 cleaned the room first. Right work, wrong order.
6. **Trusting "it builds" as "it's done."** I closed multiple pushes on a clean `tsc --noEmit` without walking the 402px viewport. The mobile noise you kept flagging was visible from push 4 onward; I just wasn't looking.

## 4. Your three direct questions

### Q: "Am I doing the wrong thing invoking the Impeccable scripts?"

**No, but the framing is off.** The Impeccable commands (`/quieter`, `/distill`, `/animate`, `/delight`, etc.) are *lenses*, not *deliverables*. Invoking `/animate` doesn't mean "add animation" — it means "look at the surface through the animation lens and decide if anything needs to change." I treated them as additive prompts ("apply /animate" → add three animations), when several of them are explicitly subtractive (`/quieter`, `/distill`, `/clarify`).

**Fix for next time:** treat every Impeccable invocation as a question, not a command. "What does `/animate` reveal?" might correctly answer *"the existing motion is enough; remove one."*

### Q: "Should I have uploaded the deep research reports?"

**Yes — those uploads are why the site has substance.** The Strategic Brief, the GTM positioning research, the investor thesis — all three drove real decisions: the seven decision criteria, the ten objections, the Chairman's Cottage spec, the anti-kickback transparency line, the HIPAA posture. Without them, this would be a generic luxury wellness page.

**Caveat:** they also expanded scope. Each research doc surfaced 3-5 "must-have" sections, and I built all of them. A leaner read would have been: "what are the *two* things this brief tells me to do that nothing else does?" — and ship only those.

**Fix for next time:** when uploading research, explicitly ask: *"Pull only the top 2 strategic moves from this doc; defer the rest."*

### Q: "Should I branch and start fresh?"

**No.** Specifically no. Three reasons:

1. The current codebase is *already* the post-subtraction version. Starting fresh re-runs the additive spiral with a different surface area.
2. Memory files (`positioning-v2`, `subtraction-v2`, `imagery-v2`, `system`) are now load-bearing. A fresh project loses them, and I'd reproduce 70% of the same mistakes by reflex.
3. The remaining work is execution, not architecture. v2.2 is a doc. v2.3+ would be content tuning, SEO, /professionals depth — none of which benefits from a green field.

**One reset move I do recommend:** before the next feature push, do a **section audit pass**. Walk the homepage at 402px and 1440px, list every section with a one-line "is this still pulling weight?" verdict. Cut anything ambiguous. The site is at 12+ sections; HNW prospects skim. Ten high-conviction sections beat twelve hedged ones.

## 5. Three "next time" rules (testable)

1. **One subtract per add.** Every push that adds a component, animation, or decorative element must remove or merge one. Forces the audit to happen continuously, not at v2.0.
2. **Mobile-first walk before "done."** Before declaring any push complete, view the affected sections at 360px and 402px. If you wouldn't screenshot it for the brief, it's not done.
3. **Impeccable as question, not command.** Invoking `/animate`, `/colorize`, `/delight` requires answering "what does this lens reveal that needs to change?" — and the answer is allowed to be "nothing; remove one of the existing instances."

---

## 6. Bottom line

The site is in the best shape it's been in. v2.0 + v2.1 together restored the editorial restraint the brand requires. The lessons above are mine, not yours — your instincts ("there are too many lines," "this feels like circles," "the imagery is inconsistent") were correct every time you raised them, and on average two pushes earlier than I acted on them. Trust those instincts faster.

Recommendation: ship v2.1 as the deliverable, run the section audit pass, then move to content depth on /professionals and SEO. Do not branch.

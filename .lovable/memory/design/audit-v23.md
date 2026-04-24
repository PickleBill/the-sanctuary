---
name: audit-v23
description: v2.3 close-out audit verdicts — section count, cuts, merges, and the "subtract per add" log. Inheritable by v3.
type: feature
---

# v2.3 — The Close-out Audit

## Section count
v2.0 → v2.1 → v2.3
12 → 12 → **10** homepage sections.

Final order: Hero → Gallery → SynergyMap → Resonance → PeerCohort → Amenities → DayHere → Leadership → SevenDecisions → Process → ConciergeForm.

## Cuts

| Cut | Reason | Where it went |
|---|---|---|
| `Objections.tsx` | Duplicated work `SevenDecisions` already does at higher craft | Top 2 objections merged into `SevenDecisions`: "people will find out" → Privacy body; "I cannot be away" → Business continuity body. Third objection (Swiss comparison) cut entirely — it's a defensive frame, not a buying signal. |
| `ChairmansCottage.tsx` | Standalone navy section overlapped Amenities + competed with Hero for attention | Became the lead panel ("I") of `Amenities`. The cottage now sits where it belongs: as the most-named amenity in a five-card ledger, not as a separate brand pillar. |

## Kept (against the working list)

| Kept | Why |
|---|---|
| `SynergyMap` | Carries the "two disciplines, one program" thesis nothing else carries. Cutting it would force `Leadership` to bear that weight, and `Leadership` is already doing the named-clinician job. |
| `Process` | The 4-step intake is procedural, not framework — `SevenDecisions` is criteria, `Process` is choreography. Different jobs. |
| `PeerCohort` | "You are not the first" is the second of three thesis pillars (peer belonging). Non-negotiable. |

## Subtract-per-add applied

| Component | Removed |
|---|---|
| `Resonance` | "A Quiet Question" eyebrow (the H2 already asks the question — the eyebrow was throat-clearing). |
| `Gallery` | Bottom stat ledger (212 acres / 2,400ft / 45 min / One). The hero copy and the lightbox captions already carry the geography; the stat strip was redundant ledger-density. |
| `ConciergeForm` | The three-dot bullet list ("Reply within four hours", "Encrypted channels", "One conversation"). Folded the first two into the body sentence; the third was already implicit in "one family in residence". |

## Copy distill

H2s tightened to ≤6 words on each line:
- SevenDecisions italic: "Half of them are privacy and speed" (7) → "Privacy and speed lead" (4).
- SynergyMap italic: "composed as one program" (4) → "one composed program" (3).

Body paragraphs verified ≤3 sentences across remaining sections.

## /professionals — full refactor

Reduced from 6 sections to 4 blocks:
1. **Masthead** — named clinical leadership (re-uses `LEADERS` from `Leadership.tsx`).
2. **Transparency** — anti-kickback in plain English.
3. **Intake** — one paragraph, end-to-end protocol (no step-list).
4. **Contact** — direct line + dossier + return link.

Removed the encrypted-document-exchange section and the outcomes-posture stat grid; both are detail an interventionist will ask for in the peer call, not the page.

## Inheritable rules for v3

1. **No section gets added without first proving an existing section can be removed.** v2.3 enforced this retroactively; v3 enforces it at design time.
2. **H2 ≤6 words per line, body ≤3 sentences, captions ≤12 words.** This is now the shape the writing has to fit.
3. **Eyebrows are optional, not obligatory.** Resonance proved a section can open with the H2 alone. Future sections only get an eyebrow if it's earning its own line.

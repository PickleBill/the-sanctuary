

# v2.0 — The Subtraction Pass

You're right, and I owe you a direct answer: this is a **`/quieter` + `/distill`** problem, not a `/shape` problem. `/shape` is for designing new features. What we have is a mature site with one specific decorative element used 14+ times. The fix is surgical removal, not re-discovery.

## The diagnosis (counted, not guessed)

The "line" problem is one element used as a crutch. Three families:

**1. Eyebrow rules (the worst offender — 11 instances):** Every section header (`Hero`, `Amenities`, `Gallery`, `Leadership`, `SevenDecisions`, `Process`, `Objections`, `PeerCohort`, `SynergyMap`, `TrustRail`, `ChairmansCottage`, `Resonance`) opens with `<span className="luxe-rule" /> SECTION LABEL`. Plus Navbar logo, Navbar phone, Footer invariants. That's 14+ identical 3rem amber dashes. The eyebrow itself is already small-caps amber tracked at 0.24em — that's *already* a typographic signal. The rule is redundant.

**2. Per-card decorative rules (8 instances):** `Amenities` puts an `h-px bg-amber/60` above every amenity title. `PeerCohort` puts a `w-6 h-px bg-amber` next to every role. `DayHere` puts filament rules between every hour and every editorial line (×6 rows × 2 = 12 hairlines). `Leadership` adds a `border-l border-amber/50` blockquote bar. None of these add hierarchy — they add noise.

**3. Section-end ledgers and dividers (4 instances):** `Gallery` ends with a 4-up stat grid wrapped in `border-t border-b` with internal `border-r`/`border-b` creating a visible cross-grid. `Amenities` has a progress rule. `Navbar` has a vertical `w-px` between nav and CTA. `SynergyMap` has a vertical center spine plus per-row hairlines.

Net count on the homepage at 402px viewport: **~38 visible decorative lines** between hero and footer. A site about restraint should have under 10.

## The fix — three rules, applied globally

**Rule 1: One rule per page maximum.** The signature filament-draw stays on the *Hero* (it's the brand mark). It is removed everywhere else. Section eyebrows lose the `<span class="luxe-rule">` prefix entirely — the small-caps amber type is the signal.

**Rule 2: No rules inside repeating units.** Per-card hairlines come out of `Amenities`, `PeerCohort`, `DayHere`, `Leadership`. Hierarchy in those grids is reasserted with **space + weight** (Literata 500 vs 400, generous gaps), not rules. This is straight from the spatial-design ref: "Use the fewest dimensions needed for clear hierarchy. Space alone can be enough."

**Rule 3: Section ends close with space, not lines.** `Gallery`'s stat ledger loses all `border-*` — becomes a 4-column rhythm of numerals on whitespace. `Footer`'s top border, `Navbar`'s scrolled-state border, and the navbar vertical separator all come out. Footer keeps exactly one rule above the `© 2026` line.

## What ships in v2.0

| File | Change |
|---|---|
| `src/styles.css` | Keep `.luxe-rule` class (still used in 1-2 places) but document new usage rule in comment |
| `Hero.tsx` | Keep filament burn-in (brand signature). Remove `luxe-rule` from eyebrow. |
| `Amenities.tsx` | Remove eyebrow rule. Remove per-card `w-8 h-px bg-amber/60`. Remove progress rule (replace with numeric "03 / 06" counter only). |
| `Gallery.tsx` | Remove eyebrow rule. Strip ALL borders from stat ledger — pure typographic 4-column. |
| `Leadership.tsx` | Remove eyebrow rule. Remove `border-l` blockquote bar (use indentation + italic). Keep credentials-verified hover rule (1 instance, functional affordance). |
| `SevenDecisions.tsx` | Remove eyebrow rule. |
| `Process.tsx` | Remove eyebrow rule. |
| `Objections.tsx` | Remove eyebrow rule. |
| `PeerCohort.tsx` | Remove eyebrow rule. Remove the 24-wide opener rule. Remove per-role `w-6 h-px` rules. Roles become a clean 2-column type rhythm. |
| `SynergyMap.tsx` | Remove eyebrow rule. Remove vertical center spine. Keep per-row filaments (they're the *interactive* signal, not decoration). |
| `TrustRail.tsx` | Remove eyebrow rule. Compliance plates close-ranked on whitespace. |
| `ChairmansCottage.tsx` | Remove eyebrow rule. |
| `Resonance.tsx` | Remove eyebrow rule. Reading panel keeps its `border-t border-amber/40` (functional state divider). |
| `DayHere.tsx` | Remove the 12 per-row hairlines. Keep the single vertical timeline spine — that *is* the metaphor of the section. |
| `Footer.tsx` | Remove top section border. Remove invariants-rail bottom border. Keep the one rule above © line. |
| `Navbar.tsx` | Remove vertical `w-px` separator between nav and CTA. Remove scrolled-state `border-b`. Keep mobile drawer `divide-y` (functional). Remove `luxe-rule` from logo and phone link. |

**End state: ~6 lines on the homepage.** Hero filament (brand), Synergy Map filaments (interactive), DayHere spine (metaphor), Resonance state divider (functional), Navbar mobile drawer dividers (functional), Footer copyright rule (terminal punctuation). Every remaining line is *doing a job*.

## Why I'm not invoking `/shape`

`/shape` runs a discovery interview to design a new feature. We're not designing — we're removing. The right command is **`/quieter`** (reduce visual intensity by removing decorative elements) layered with **`/distill`** (cut what isn't pulling weight). I'm executing both lenses in this single pass rather than as separate phases — the work is identical.

## What this unblocks

Once v2.0 ships and the noise is gone, the **hero image refactor** (next push, v2.1) will land on a calmer canvas, which means a single signature photograph will actually *land* instead of competing with 38 decorative dashes. That's the right sequence — quiet the room before turning up the music.

## Tag this v2.0

`v2.0 — The Subtraction Pass.` Memory entry: `mem://design/subtraction-v2` documenting the three rules above, so I never re-add a decorative rule next to an eyebrow without checking against the rule.


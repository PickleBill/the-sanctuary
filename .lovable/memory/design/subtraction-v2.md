---
name: subtraction-v2
description: v2.0 Subtraction Pass rules — three hard constraints on decorative horizontal/vertical rules. Never add a luxe-rule next to a section eyebrow.
type: constraint
---

# v2.0 Subtraction Pass — Three Rules

The site had ~38 decorative lines on the homepage at 402px. Most were the same `<span className="luxe-rule" />` (a 3rem amber dash) repeated next to every section eyebrow, every card, every list item. v2.0 removed them all. These rules prevent regression.

## Rule 1 — One rule per page maximum (decorative class)

The signature filament-draw in `Hero.tsx` (the amber hairline that animates in under the headline) is the brand mark. It stays.

Section eyebrows must NOT prefix with `<span className="luxe-rule" />`. The eyebrow itself — small-caps, amber, 0.24em tracking — is already the typographic signal. Adding a rule next to it is redundant.

**Why:** A repeated decorative element loses meaning. When everything is "luxurious", nothing is.

## Rule 2 — No decorative rules inside repeating units

Per-card, per-row, per-list-item hairlines are forbidden. Hierarchy in grids is asserted with **space + weight** (Literata 500 vs 400, generous gaps), not with rules.

Specifically forbidden:
- `<span className="block w-Xx h-px bg-amber" />` next to titles in cards
- `<span className="luxe-rule" />` next to titles in cards
- `border-l border-amber/Xx` blockquote bars inside repeating leader/testimonial cards
- Inter-row hairlines inside timelines, ledgers, or stat strips (use whitespace)

**Why:** Repeating a decoration N times multiplies its visual cost by N. Quiet design uses the gap, not the line.

## Rule 3 — Section ends close with space, not lines

Stat ledgers, value strips, and credibility bars at the end of a section must use pure typographic rhythm — `gap-y-8 gap-x-8`, no `border-t`, no `border-b`, no `gap-px bg-border`.

Footer keeps exactly **one** rule: above the `© YEAR` copyright line (terminal punctuation for the document).

Navbar keeps **zero** decorative rules: no `border-b` on scroll state, no vertical `w-px` separator between nav and CTA. The mobile drawer's `divide-y` is functional (separating tap targets) and stays.

**Why:** Borders create visual cells. Whitespace creates visual rhythm. A site about restraint should breathe.

## Permitted exceptions (functional, not decorative)

These remain because they do a job, not because they look nice:

1. **Hero filament burn-in** — brand signature, fires once on mount.
2. **DayHere vertical spine** — *is* the timeline metaphor, the section makes no sense without it.
3. **SynergyMap per-row filaments** — encode the *interaction state* (active row glows amber); they are an affordance, not decoration.
4. **Resonance reading-state divider** (`border-t border-amber/40` above the AI reading) — marks a functional state change (input → output).
5. **Footer copyright rule** — terminal punctuation for the document.
6. **Mobile drawer `divide-y`** — separates tap targets in the navbar drawer.
7. **Leadership "Credentials Verified" hover rule** — the line *is* the affordance; it extends on hover to confirm interactivity.

If you need to add a new line, it must fit one of these seven roles. If it doesn't, use space.

## How to apply

Before adding any `border-*`, `bg-amber`, `h-px`, `w-px`, or `luxe-rule` to a component, ask:
1. Is it a brand mark used once? (Hero filament — OK)
2. Is it a metaphor the section depends on? (DayHere spine — OK)
3. Does it encode interaction state? (SynergyMap row — OK)
4. Is it the terminal rule of the document? (Footer © — OK)
5. Is it separating tap targets in a touch drawer? (Mobile divide-y — OK)
6. Otherwise — **delete it. Use `gap-y-*` or `mt-*` instead.**

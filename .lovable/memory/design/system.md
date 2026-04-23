---
name: design system
description: Quiet-luxury composition rules — type, color discipline, motion, section heading pattern
type: design
---

# Sanctuary Southeast — Design System

## Type system (Literata, single-family)
- All headings: `font-serif`, weight 500, `letter-spacing: -0.018em` to `-0.022em`
- Display headlines: `clamp(2rem, 1.5rem + 3vw, 3.75rem)`, line-height 1.06
- Lead paragraphs: `var(--text-body)`, optionally `editorial-italic` weight 400 for hero leads
- Eyebrows: `.eyebrow` class, tracking `0.24em` (NOT 0.32em — too heavy at 11px)
- Small-caps tabular for credentials, stat labels: tracking `0.18em`
- Hung punctuation on every display headline: add `hang-punct` class

## Section heading pattern (use everywhere — Hero, Gallery, Synergy, Cottage, Leadership, Process)
```tsx
<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 lg:mb-20">
  <div className="lg:col-span-8">
    <p className="eyebrow mb-5"><span className="luxe-rule mr-3" /> Section Label</p>
    <h2 className="font-serif text-foreground mb-7 hang-punct"
        style={{ fontSize: "clamp(2rem, 1.5rem + 3vw, 3.75rem)", lineHeight: 1.06, letterSpacing: "-0.02em", fontWeight: 500 }}>
      First half.
      <span className="block editorial-italic text-foreground/70" style={{ fontWeight: 400 }}>
        Italic completion.
      </span>
    </h2>
    <p className="text-muted-foreground leading-relaxed max-w-xl" style={{ fontSize: "var(--text-body)" }}>
      Lead paragraph.
    </p>
  </div>
</div>
```
Asymmetric 8/12 grid. Headline split: roman first half + italic completion on a new line.

## Color discipline (single-accent rule)
Amber is reserved for THREE uses only:
1. Eyebrow rule (`.luxe-rule`)
2. Active filament/node in interactive surfaces (Synergy Map, hover states)
3. The single primary CTA (`Request the Clinical Dossier`)

Demoted from amber to ivory/foreground at varied opacity:
- Section title accents (use `text-foreground/70` italic, not `text-amber`)
- Hero "in the Blue Ridge." (was amber/90, now ivory/85 italic)
- Decorative dividers
- Secondary copy emphasis

## Motion vocabulary
- Hero Ken Burns drift: 9000ms linear scale, 1800ms opacity crossfade
- Filament-draw: `.filament-draw` utility, 1200ms `cubic-bezier(0.22, 1, 0.36, 1)`, origin left
- Section reveal: 1000ms ease-out, opacity + translateY-4
- Stillness is the brand — nothing else moves on scroll

## Quieter pass values (reference)
- Hero gradient overlay: navy 38%/12%/78% (NOT 60%/30%/88%)
- Synergy ambient glow: 25% opacity (NOT 60%), amber 6% mix (NOT 10%)
- Leader portrait gradient: navy 16% (NOT 25%)
- Gallery caption gradient: navy 70% (NOT 88%)
- Node glow: 12px box-shadow at amber 45% mix (NOT 18px at 70%)

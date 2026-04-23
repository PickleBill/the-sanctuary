

# Where we are & what ships next

## Current state (honest assessment)

**Phase 1 — Synergy Map cinematic rebuild:** ✅ shipped
**Phase 2 — Brand & Atmosphere pass:** ✅ shipped (Hero/Gallery/Amenities/Process/Leadership/Nav/Footer)
**Impeccable typography pass (Literata single-family):** ✅ shipped at the token level
**Phase 3 — Resonance + Cloud + Dossier + /professionals:** ✅ wired end-to-end (form submits, AI reading returns, PDF downloads, /professionals route live)

**What's still rough (what you're seeing):**
- Per-component Impeccable polish was applied unevenly. Several sections still carry pre-Literata copy density, line-length, and rhythm — text reads "sloppy" because we swapped the font but didn't re-set the type *per section*.
- Mobile (402px viewport you're on right now) was never given a dedicated pass. The horizontal-scroll Amenities ledger, Synergy Map duality, and Hero CTA strip need mobile-specific treatment.
- No `/audit` (a11y/contrast/perf) or `/critique` (UX scoring) has run yet — those were deferred until Phase 3 wiring finished. It's finished.
- A handful of copy strings still use "the Southeast" instead of "Blue Ridge" (per your earlier direction).
- The Resonance section's empty/loading/error states haven't been polished.
- ConciergeForm success state is functional but not editorial.

## The next push (one shippable round)

This is **one** turn that produces a publishable v1. Sequenced so each step builds on the last and nothing is left half-done.

### 1. Full `/impeccable` per-section pass *(typography + spacing + rhythm)*
Walk every section once with the Impeccable lens applied at the *component* level, not just the token level:
- Hero: tighten headline measure, set lead paragraph to `text-lead`, fix CTA strip rhythm on mobile (stack, don't crowd)
- Synergy Map: reduce side-by-side density on mobile (<640px collapses to vertical with filaments rotated 90°)
- Resonance: editorial empty state, italic loading state ("Listening…"), serif-set reading output, error toast in brand voice
- Amenities: mobile = vertical Roman-numeral ledger (kill horizontal scroll under 768px); desktop unchanged
- Process: tighten filament timeline spacing, ensure "Privacy invariant" footnotes are visually subordinate
- Leadership: portrait card type hierarchy (name = display, credentials = small-caps, philosophy = editorial-italic)
- Gallery: caption typography pass + mobile mosaic re-flow
- ConciergeForm: editorial success state with PDF link + "Forward to advisor" copy-link button
- Footer: small-caps section labels, tabular phone number
- Navbar: mobile drawer typography pass

### 2. Copy sweep *(Blue Ridge + voice consistency)*
- Find/replace "the Southeast" → "the Blue Ridge" / "Western North Carolina" everywhere
- Strip any remaining exclamation points (Impeccable rule)
- Ensure third-person clinical or first-person plural voice throughout
- Verify no celebrity names, no pricing, no spa terminology slipped in

### 3. `/audit` pass *(technical — fix as found)*
Run through each section against:
- WCAG AA contrast (light + dark themes, amber on ivory is the risk pixel)
- Tap target sizes ≥44px on mobile
- `prefers-reduced-motion` honored on Ken Burns, filaments, scroll reveals
- Image `alt` text editorial-quality (not "image of estate")
- `<head>` metadata per route (og:image on / and /professionals)
- Lighthouse-style perf check: image dimensions set, fonts preloaded, no CLS on hero

Fix P0/P1 inline. Defer P2/P3 to a polish backlog.

### 4. `/critique` pass *(UX scoring)*
Score the four key surfaces against Impeccable's heuristics + the three personas from `.impeccable.md`:
- Home (Principal/Family lens)
- /professionals (Referral Professional lens)
- Resonance Reading flow (Trusted Advisor lens)
- Mobile home (all three lenses, 402px viewport)

Capture findings in a short critique report saved to `mem://design/critique-v1.md` for future reference. Fix anything scored below 7/10 in the same turn.

### 5. Mobile-specific polish *(402px is your current viewport)*
Since you're literally looking at mobile right now:
- Hero: stack CTAs, reduce display headline to `--text-h1` instead of `--text-display`
- Synergy Map: vertical layout with filaments rotated, paired-hover becomes paired-tap
- Resonance: textarea full-width, submit button full-width
- Navbar: confirm drawer animation honors reduced-motion
- All sections: verify 16px minimum body, 24px minimum tap targets, no horizontal overflow

### 6. Pre-publish checklist
- TypeScript clean (`tsc --noEmit`)
- All routes load without console errors
- ConciergeForm submits successfully end-to-end
- Resonance Reading returns within 6s or falls back gracefully
- /clinical-dossier.pdf downloads
- 24/7 number is a working `tel:` link
- og:image set on / and /professionals
- Favicon + page title correct

## What ships at the end of this turn

A v1 that is:
- **Editorially consistent** — Literata applied with intent at every section, not just at the token layer
- **Mobile-publishable** — works at 402px without compromise
- **Voice-consistent** — Blue Ridge positioning throughout, no spa language, no exclamation points
- **Audited** — WCAG AA, reduced-motion, tap targets verified
- **Critiqued** — scored against the three personas, findings logged
- **Functionally complete** — Resonance + Form + PDF + /professionals all working

After this turn you can publish and start sharing the URL with advisors and the first wave of referral professionals.

## What we explicitly defer to Phase 4+

- Affirmation Threads (Phase 4)
- Concierge Backstage (Phase 5)
- Real clinical leadership names/photos (waiting on you)
- Site-selection-specific copy (waiting on real estate)
- Email magic-link auth, HubSpot connector, partner micro-portal slugs

These are roadmap, not scope creep.

## Memory updates this turn

- `mem://design/critique-v1.md` — new, the critique findings
- `mem://design/system.md` — updated with per-component patterns established during the pass
- `mem://index.md` — updated "what ships v1" section


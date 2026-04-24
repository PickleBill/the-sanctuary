# Phase 2 Hardening — COMPLETE (v4.0)

Status: shipped.

## What landed in Phase 2

1. **Per-route SEO** — every route now owns its `<title>`, description, OG/twitter
   meta, plus a `<link rel="canonical">` pointing at the production host. OG image
   URLs are absolute so social scrapers resolve them on the first hop.
2. **Crawler basics** — `public/robots.txt` (allow all) and `public/sitemap.xml`
   (4 routes) are now in place. All routes explicitly emit `robots: index,follow`.
3. **Structured data** — Homepage emits a `MedicalBusiness` JSON-LD block via
   `head().scripts`. No legal-page schema (intentional — keeps signal clean).
4. **Boundaries (verified)** — `__root.tsx` already defines `notFoundComponent`
   for unmatched URLs, and `router.tsx` already sets `defaultErrorComponent`
   with retry. No additional work needed.
5. **Performance hygiene**
   - `decoding="async"` added alongside existing `loading="lazy"` on Gallery,
     Amenities, Cohort, Journey, Leadership, and Professionals images.
   - Hero already runs `loading="eager"` + `fetchPriority="high"` for LCP.
   - `<link rel="preconnect">` added in root for `fonts.googleapis.com` and
     `fonts.gstatic.com` so the Literata @import resolves a round-trip faster.
6. **Memory** — Decisions captured in `mem://design/v40-hardening.md` so the
   next pass doesn't re-debate hostname/canonical/robots policy.

## Files touched

- `public/robots.txt` (new)
- `public/sitemap.xml` (new)
- `src/routes/__root.tsx` (preconnects)
- `src/routes/index.tsx` (canonical, JSON-LD, absolute OG URLs, robots meta)
- `src/routes/professionals.tsx` (canonical, absolute OG URLs, robots meta)
- `src/routes/privacy-policy.tsx` (canonical, absolute OG URLs, robots meta)
- `src/routes/terms.tsx` (canonical, absolute OG URLs, robots meta)
- `src/components/site/{Gallery,Amenities,Cohort,Journey,Leadership}.tsx` (decoding="async")
- `.lovable/memory/design/v40-hardening.md` (new memory note)

## What's next (Phase 3 candidates — NOT started)

These are options for the next phase, not commitments:

- **Image format pass** — convert hero + above-the-fold JPGs to WebP/AVIF if
  mobile Lighthouse perf needs the bump.
- **Custom domain** — when you cut over from `the-sanctuary.lovable.app`,
  the canonical/sitemap/og:url strings need a sweep (5 files).
- **Analytics** — none currently wired. Plausible or Fathom are quiet-luxury
  appropriate.
- **Form wiring audit** — verify ConciergeForm and ReferralNoteComposer
  edge functions log/relay correctly with real submissions.

Reply with which (if any) you want to open as Phase 3.

---
name: v40 hardening pass
description: Phase 2 hardening — per-route SEO, canonical/robots/JSON-LD, sitemap, perf attribute hygiene
type: feature
---

# Phase 2 Hardening (v4.0)

Status: shipped.

## What's locked

- **SEO**: Every route owns its title/description/og + a `<link rel="canonical">`
  pointing to the `the-sanctuary.lovable.app` host. OG/twitter image URLs are
  fully qualified (absolute) so social scrapers don't 404 on relative paths.
- **Robots/Sitemap**: `public/robots.txt` (allow all) and `public/sitemap.xml`
  (4 routes) are static files served as-is.
- **Structured data**: Homepage emits a single `MedicalBusiness` JSON-LD block
  via `head().scripts`. Do NOT add JSON-LD to legal pages — keeps signal clean.
- **Robots meta**: All 4 routes explicitly `index,follow`. Home + Professionals
  also include `max-image-preview:large` so Google can use real previews.
- **Boundaries**: `__root.tsx` defines `notFoundComponent` (global 404).
  `router.tsx` defines `defaultErrorComponent` (app-wide error retry).
- **Perf attributes**: Every below-the-fold `<img>` carries both
  `loading="lazy"` AND `decoding="async"`. Hero is `loading="eager"` +
  `fetchPriority="high"` (LCP image).
- **Font perf**: `__root.tsx` adds `<link rel="preconnect">` for both
  `fonts.googleapis.com` and `fonts.gstatic.com` (with crossorigin) so the
  Literata @import in `styles.css` resolves faster.

## What we did NOT do (intentional)

- No JSON-LD on /privacy-policy or /terms.
- No og:image on the root route — leaf routes set their own; a root og:image
  would override every child per TanStack head() concatenation rules.
- No image format conversion (WebP/AVIF). Current JPGs ship fine; revisit if
  Lighthouse perf < 85 on mobile.

## If you change the production hostname

The canonical URLs and sitemap are hard-coded to
`https://the-sanctuary.lovable.app`. If you switch to a custom domain, update
in 5 files: `public/sitemap.xml`, `public/robots.txt`, and the `head()` of
each route in `src/routes/`.

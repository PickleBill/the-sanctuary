---
name: known-noise
description: Console warnings/errors that are external (browser extensions, third-party scripts) — do NOT chase as bugs
type: reference
---

# Known harmless console noise

## __gcruniqueid hydration warning
- **Source:** Grammarly (and similar Chromium extensions that augment form fields)
- **Symptom:** React hydration warning naming `__gcruniqueid` on `<form>`, `<textarea>`, `<input>`, `<select>`
- **Cause:** Extension injects attributes into form elements between SSR HTML delivery and React hydration
- **Affects production users:** No — only users with the offending extension installed
- **Fix in our code:** None. Do not add `suppressHydrationWarning` reflexively; that hides real bugs.
- **Don't re-investigate.**

## Chrome devtools "Download the React DevTools" info
- Informational, not an error. Ignore.

## "Source map" warnings from `tw-animate-css` or other vendor packages
- Build-time noise from missing source maps in third-party CSS. Harmless.

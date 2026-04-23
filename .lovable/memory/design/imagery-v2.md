---
name: imagery-v2
description: v2.1 locked image-generation prompt grammar — Architectural Digest cover grade, Hasselblad medium format, warm-cool split. Use this suffix for every regen so the photo set stays unified.
type: design
---

# v2.1 Imagery — Locked Prompt Grammar

The site's photographs were unified in v2.1 (hero + 4 gallery + 2 leader portraits) under one editorial grade. Future regens MUST share the suffix below or the set will fall back into stylistic drift.

## Locked suffix (every photo)

> "shot on Hasselblad medium format, golden-hour warm-cool split lighting, shallow DOF, editorial Architectural Digest cover quality, no people, no text, no logos, photorealistic"

For portraits, swap `no people` for: `Rembrandt lighting, warm amber rim on cool slate shadows, dignified, no smile, looking past the camera, 4:5`.

## Subject sentence by slot

- **Hero** (`hero-signature.jpg`, 1920×1088): "twilight aerial of a private Blue Ridge mountain estate, century white oaks, infinity pool catching the last gold light, soft ridge fog rolling in"
- **Suite** (`gallery-suite-v2.jpg`, 1280×1600): "single Blue Ridge stone-and-cedar bedroom suite at dusk, cashmere throw on a leather reading chair, brass library lamp lit, view to dim mountain ridge"
- **Grounds** (`gallery-grounds-v2.jpg`, 1280×960): "white oak canopy filtering amber light onto a soft-surface walking trail, stocked pond, meditation pavilion through trees"
- **Boardroom** (`gallery-boardroom-v2.jpg`, 1280×960): "walnut conference table with brass inlay, leather captain's chair at head, single brass pendant casting amber pool of light, slate-blue shadows, sound-treated linen wall panels"
- **Clinical** (`gallery-clinical-v2.jpg`, 1920×832): "five-star clinical wellness suite, recovery chaise in linen, brass fixtures, infusion station tucked discreetly, warm wood meeting clinical white, large window onto Blue Ridge at dusk"
- **Medical Director** (`leader-medical-director-v2.jpg`, 1024×1280): "55-year-old physician, soft charcoal blazer over white medical coat, library backdrop with brass lamp and walnut shelves of leather-bound medical texts"
- **Clinical Director** (`leader-clinical-director-v2.jpg`, 1024×1280): "50-year-old clinical psychologist, soft charcoal blazer with cream silk blouse, library backdrop with brass lamp and walnut shelves"

## Model

`google/gemini-3-pro-image-preview` (premium tier) for the hero LCP image. Standard tier is acceptable for gallery + portraits — the cost differential is not justified at the resolutions we ship.

## Why locked

Pre-v2.1, the four gallery images were stylistically inconsistent (different lens, different time-of-day, different color temperature). Code papered over it with a `mix-blend-soft-light` overlay applied across all four. v2.1 removed that band-aid by regenerating the source images as one cohort. If a single image is regenerated later without this suffix, the unifying overlay is no longer there to hide the mismatch — the new image will visibly clash. Always regen with the suffix.

## Color contract with the design system

The "warm amber rim on cool slate shadows" language deliberately matches `--amber` and `--navy` tokens. Photos are doing color reinforcement, not just decoration. Do not introduce a new dominant hue (sage, rose, terracotta) without first updating the design system tokens to match.

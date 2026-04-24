---
name: Cohort — mobile UX (name plate above, room sheet below)
description: On mobile the constellation must be readable in 2 seconds. Name plate sits ABOVE the SVG, "View the room — 40" chip sits below opening a bottom sheet of all archetypes.
type: design
---

**Rule:** On viewports < 1024px:

1. **Name plate ABOVE the SVG.** Always-visible focal point with min-height 88px. Shows the active archetype in 1.4rem editorial italic. The SVG is the visualization of what the name plate is showing — never the source of truth. (Original v3.3-v3.6 placed the name plate BELOW the SVG, which meant on small phones users couldn't see the SVG and the name simultaneously.)

2. **"View the room — 40 →" chip BELOW the SVG.** Small amber chip. Tap opens a navy-glass bottom sheet (`CohortRoomSheet`) listing all 40 archetypes scrollable. The matched archetype (if any) is flagged with a `--bloom` dot + "✦ Matched" tag. Tapping any archetype closes the sheet and activates it on the constellation.

3. **Constellation viewBox is 480×480 on mobile** (square, not 480×600 tall). 6 cols × 7 rows distribution. Tighter and more visually balanced.

4. **The "Continue privately" CTA on a matched node uses `cta-flame`** for the ember halo, signaling "this is the next step." Always pair with `<AIPresenceChip variant="ivory" />` so the AI lineage is visible.

**Why:** Cohort is the brand's signature surface — it has to communicate quickly on a phone. Name-plate-below + small SVG = visitor scrolls, sees nothing, leaves. Name-plate-above + room-sheet + larger square SVG = visitor sees a name, sees the constellation, can read the whole room in one gesture.

**Forbidden:**
- Moving the name plate back below the SVG on mobile
- Removing the "View the room" chip
- Using `--bloom` for anything other than the AI-match moment (Cohort matched node, Resonance "Composed for you" badge)

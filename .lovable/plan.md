

# v3.2 — Show The Network. Stop Telling.

You're right, and you've put your finger on the actual problem: **we've been polishing a brochure for a private cottage when you wanted a manifesto for a peer network.** Every pass made the cottage prettier. None of them made the network *visible*.

This plan is two pushes, scoped tight, and they answer your three asks:
- Make the site *interactive* (you can touch the network, not just read about it)
- Make the message *futuristic / community* (the room is the product, not the building)
- Make it *stand out* (one moment that no other treatment-site has)

---

## The honest diagnosis (why every pass felt marginal)

I read the homepage section by section. The "private cottage" feel isn't from any one element — it's from the **information architecture itself**:

| Section | What it says | What you see |
|---|---|---|
| Hero | "Care worth coming to. Among peers who understand." | Aerial of an empty estate. No peers visible. |
| Gallery | Building, building, building, building | Buildings. |
| SynergyMap | Clinical + holistic = synthesis | A clever diagram. Still about *services*. |
| Resonance | An AI mirror | One of two interactive moments — buried mid-page |
| **PeerCohort** | **"You are not the first."** | **Six static words: Founder, Surgeon, Trustee, Justice, Operator, Parent. That's your dead space.** |
| Amenities | The cottage, the grounds | Cottage. |
| DayHere | A day's rhythm | A timeline of *one person* alone. |
| Leadership | Two named MDs | The ONLY humans on the page. |

The whole second half is "things you'll have." Nothing on the page conveys **the room is composed of people like you, working together, right now**. PeerCohort literally tells you "you are not the first" and then shows you a list of nouns. Of course it feels dead.

That is what v3.2 fixes — not by adding sections, but by **rebuilding two existing surfaces to embody the network**, plus turning on the first AI edge function so the site *responds to who's reading it*.

---

## v3.2 — The Network Push (one build)

Three lenses, applied as one move: **`/shape`** (rebuild PeerCohort + Hero), **`/animate`** (give the network breath), **`/delight`** (one signature moment), **`/distill`** (cut what no longer pulls weight).

### 1. Rebuild PeerCohort → "The Cohort" — the network made visible

Replace the static 6-word list with a **living constellation**: 24–32 anonymous nodes (small filled circles, amber/ivory) softly drifting on a navy field, connected by faint amber filaments that draw and fade between nodes every few seconds. Each node has a hover-revealed *category* (`Founder · raised Series C`, `Surgeon · Mayo`, `Federal Judge`, `Trustee · family office`, `Olympian · retired`, `Operator · two exits`, `Author · NYT bestseller`, `Parent · principal of two`). No names, no faces, no testimonials — pure category, true to brand.

**Interaction:**
- Idle: nodes drift slowly, filaments draw between random pairs (1.4s ease, fade out 2s) — roughly one new connection per 3s. Visualizes "the room is talking to itself."
- Hover a node: that node brightens, surrounding 3–5 nodes connect to it with amber filaments, the category label fades in beneath. Sibling nodes desaturate to 30% — same focus-grammar as the gallery. (Keyboard: arrow keys cycle through nodes; Enter reveals.)
- Reduced-motion: static graph, hover-only reveals, no drift, no auto-filaments.

**Implementation:** single SVG, 60fps capped, ≤32 nodes (fits comfortably on a 360px viewport at ~12px node spacing), pure React + `requestAnimationFrame`, no canvas, no library. The filament-draw uses the same `cubic-bezier(0.22, 1, 0.36, 1)` and amber stroke as Hero/SynergyMap — the network *is* the brand mark, drawn out.

This is the section that converts "another treatment center" → "a peer network with a clinic attached." It's the magic moment.

### 2. Hero — make the network the headline

Two changes, both copy + composition, no asset regen:

- **Headline rewrite** (locks v3 positioning that we said we'd lock and never did):
  > **The room is the medicine.**
  > *Care, in the company of peers.*
  This puts the *room* (network) in front of the *care* (clinical) — the order matters. "Care worth coming to" puts the building first; this puts the people first.
- **Sub-copy** trimmed to one sentence:
  > A private medical-wellness sanctuary in the Blue Ridge — where executives, surgeons, judges, and founders restore in the company of peers who've sat in the same chair.
- **Mini-network preview**: 5 small amber nodes drift across the bottom-left of the hero (above the CTA cluster), with the same connect-and-fade behavior as The Cohort, at 30% opacity. A whisper of what's below the fold. ~6 lines of SVG, no perf cost.

### 3. Resonance — promote it from buried form to "talk to the room"

The AI mirror is your strongest interactive asset and it sits seventh on the page. Two structural moves:

- **Move it directly after Hero** (becomes second section). The first thing a visitor does after the headline is *talk to the site* — that's the futuristic feel you're asking for.
- **Add three pre-fills** (the v3 strategic-rec B that you asked us to ship now): `For myself` · `For someone I love` · `For a client I refer`. Each pre-fill seeds the textarea and slightly tunes the system prompt's voice (we already have a server function — this is one parameter).
- Reading panel adds one new line: *"Three other people are reading something quiet right now."* (Static for v3.2 — no fake telemetry. Becomes real in v3.3 if you ship the inquiry-log edge function. See strategic recs below.)

### 4. Distill — cut what no longer carries

With The Cohort doing the peer-network job and Resonance doing the interactive job, two sections become redundant:
- **DayHere** (the solo-timeline) — merge its single best line ("You will rise to a quiet bell") into Amenities as a one-line caption. Delete the section. (The cottage-day was the most "private retreat" surface on the site — it works against the new positioning.)
- **PeerCohort** as it exists today — fully replaced by The Cohort.

End state: **9 sections** (was 10). Hero → Resonance → The Cohort → Gallery → SynergyMap → Amenities → Leadership → SevenDecisions → Process → ConciergeForm. The first four pages of scroll all *show the network in motion*.

### 5. Files touched

| File | Change |
|---|---|
| `PeerCohort.tsx` | Rename → `Cohort.tsx`. Full rebuild as SVG constellation w/ drift + filaments + hover reveal. |
| `Hero.tsx` | Headline + sub rewrite. Add 5-node mini-network SVG bottom-left. |
| `Resonance.tsx` | Add three pre-fill chips. Add "three others reading" line under reading panel. |
| `routes/index.tsx` | Reorder: Hero → Resonance → Cohort → Gallery → SynergyMap → Amenities → Leadership → SevenDecisions → Process → ConciergeForm. Remove DayHere. |
| `Amenities.tsx` | Absorb DayHere's "rise to a quiet bell" line as one caption. |
| `DayHere.tsx` | DELETE. |
| `mem://design/positioning-v3.md` | NEW — lock "The room is the medicine" verbatim. |
| `.lovable/memory/index.md` | Update positioning core line. |

### v3.2 exit criteria
- The Cohort is the section users screenshot and send to friends. (If it isn't, I missed.)
- "Futuristic / community" is *visible* in the first three scrolls — not implied in copy.
- Section count down to 9. No regressions on the v2.0 line-ceiling.

---

## v3.3 — Concierge AI Handoff (one build, one edge function)

The first AI edge function from the strategic-recs (move A — highest ROI). One push, scoped to the back-end + a small UI tweak.

### What ships
1. New server function `composePrivateReply` calls `google/gemini-2.5-pro` via Lovable AI Gateway with a system prompt locked to v3 positioning ("The room is the medicine") + HIPAA posture (no PHI, no diagnosis, no clinical advice).
2. On `ConciergeForm` submit:
   - Inquiry inserts into existing `prospectus_requests` table (already there).
   - `composePrivateReply` runs in parallel — generates a two-paragraph response in brand voice (acknowledgment + dossier offer + 24/7 line).
   - Reply sent via Lovable Email (built-in, no Resend) to the inquirer + admissions inbox.
   - Success state shows: *"A private note is on its way to you."* (replaces today's generic confirmation).
3. Logs to a new `inquiry_replies` table: timestamp, role, response-length, fallback-bool. **No PHI. No message body. Just metadata.**

### Why this, why now
You said pick two AI moves. v3.2 ships move B (Resonance pre-fills) inline because the plumbing is already there. v3.3 ships move A standalone because it requires:
- New edge function with retry/fallback
- Email infrastructure (Lovable Emails — built-in, no Resend account needed)
- A new logging table + RLS

That's its own push. Trying to cram it into v3.2 is exactly the additive-spiral that burned cycles before.

### Files touched in v3.3
| File | Change |
|---|---|
| `src/server/concierge.functions.ts` | NEW — `composePrivateReply` server function |
| `src/lib/concierge/prompt.ts` | NEW — locked system prompt |
| `ConciergeForm.tsx` | Wire success state to new server fn; new copy |
| Email templates | NEW — `concierge-acknowledgment` React Email template |
| Migration | NEW — `inquiry_replies` table + RLS |
| Lovable Email infra | Setup via tool (one-time) |

### v3.3 exit criteria
- An inquiry submitted at 2am gets a brand-voice email by 2:01am.
- Admissions inbox gets a copy with the form data + the AI's reply.
- No PHI logged. No clinical claims in the reply (system-prompt guarded).

---

## What's deferred (and why I'm not adding it)

You have a few builds left. After v3.2 + v3.3 the site is *stunning, interactive, and on-brand*. What I'd consciously skip rather than spread thin:
- **Strategic rec C (per-route OG images)** — 30 minutes of polish, do it as the very last move only if you have a build to spare.
- A `/critique` formal scorecard — v3.2's structural rebuild *is* the critique response. A scorecard at this point is bureaucracy.
- Any new section. The page does not need more rooms; it needs the existing rooms to be alive.

If you finish v3.2 and v3.3 and decide one more polish push is worth it, that's **v3.4 — Polish & Harden**: per-route OG images, Lighthouse pass, WCAG AA verify, mobile walk at 360/375/402/414. No design changes — only correctness. That's the ship-it gate.

---

## What I need from you

One reply:
1. **"Ship v3.2"** — I rebuild PeerCohort as The Cohort, rewrite Hero, promote Resonance, cut DayHere. One push.
2. **"Ship v3.2 with these changes: …"** — name what you'd swap (e.g. "keep DayHere," or "use different roles in The Cohort").
3. **"Skip v3.2, ship v3.3 first"** — possible but not advised; the AI handoff lands harder when the network is visible first.

For v3.3 (the edge function) — no decision needed today. After v3.2 lands, just say "ship v3.3." For v3.4 polish — only if you want it after the two main pushes.


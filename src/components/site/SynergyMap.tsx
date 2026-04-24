import { useEffect, useRef, useState } from "react";

/**
 * v3.9 — SynergyMap rebuild (Phase 1 closeout).
 *
 * Goals from the closeout plan:
 *  - Distinct section identity (no longer navy-on-navy with JourneyStrip).
 *    The section is now an ivory field with a navy "Clinical" rail and an
 *    ivory "Holistic" rail meeting at an amber seam. The whole section
 *    reads as a quiet diptych — its own visual language.
 *  - Cleaner, more symmetrical desktop grid. No modal — the pair context
 *    appears inline below the active row, calmly, in place.
 *  - Mobile keeps the literal split-stage card (it works), 6s auto-advance,
 *    hold-to-pause. No competing surfaces.
 *  - WeekRhythm strip stays at the bottom as a quiet rhythm footer.
 */

type Pair = {
  clinical: string;
  holistic: string;
  context: string;
};

const PAIRS: Pair[] = [
  {
    clinical: "Genetic & metabolic panel",
    holistic: "A long table, every night",
    context:
      "The bloodwork tells us what to change; nutrition at the long table is how the markers actually move.",
  },
  {
    clinical: "Trauma-informed psychiatry",
    holistic: "The cellist in the great room",
    context:
      "The hard hour in the morning makes room for the soft one at night — and the cellist makes the soft one stick.",
  },
  {
    clinical: "Neurofeedback & HRV training",
    holistic: "Fly-fishing on private water",
    context:
      "HRV is the metric; standing in the river is the unsupervised practice that trains the same nervous system.",
  },
  {
    clinical: "Family conjoint, structured",
    holistic: "The horse, twice a week",
    context:
      "What you can't say in the conjoint room, you sometimes find next to a thousand pounds of patient animal.",
  },
  {
    clinical: "Integrative pharmacology",
    holistic: "Painting in the studio",
    context:
      "The dose finds the floor; the studio is where you remember you have a self that wants to make something.",
  },
  {
    clinical: "Vagal tone & sleep architecture",
    holistic: "Sauna at five, stars at nine",
    context:
      "Heat then cold then dark — the daily rhythm the clinic measures and the body remembers.",
  },
];

const WEEK = [
  { day: "Monday",    short: "Mon", line: "Bloodwork at dawn. The trail at noon. A cellist at eight." },
  { day: "Tuesday",   short: "Tue", line: "Neurofeedback. The chef's tasting menu. Stars on the ridge." },
  { day: "Wednesday", short: "Wed", line: "Family conjoint, two hours. An hour with the horse. Sauna at five." },
  { day: "Thursday",  short: "Thu", line: "Integrative psychiatry. Fly fishing on private water. A long table." },
  { day: "Friday",    short: "Fri", line: "Genetic panel review. Pickleball at golden hour. Wine of the week — withheld." },
  { day: "Saturday",  short: "Sat", line: "A slow morning. Painting in the studio. The fire pit, late." },
  { day: "Sunday",    short: "Sun", line: "Walk before the bell. Brunch on the porch. The week, considered." },
];

const AUTO_MS = 6000;

function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export function SynergyMap() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [activeRow, setActiveRow] = useState(0);
  const [mobileIdx, setMobileIdx] = useState(0);
  const [held, setHeld] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-advance mobile carousel until user interacts (6s). Pauses while held.
  const autoLockRef = useRef(false);
  useEffect(() => {
    if (autoLockRef.current || held) return;
    const id = window.setInterval(() => {
      setMobileIdx((i) => (i + 1) % PAIRS.length);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [held]);

  const lockAuto = () => {
    autoLockRef.current = true;
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setHeld(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    setHeld(false);
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      lockAuto();
      setMobileIdx((i) => {
        const next = dx < 0 ? (i + 1) % PAIRS.length : (i - 1 + PAIRS.length) % PAIRS.length;
        return next;
      });
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="synergy"
      className="relative py-24 lg:py-36 bg-background text-foreground scroll-mt-24 overflow-hidden"
    >
      {/* Faint amber wash gives the section its own field — no longer navy-on-navy. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--amber) 6%, transparent), transparent 70%)",
        }}
        aria-hidden
      />
      <div ref={ref} className="relative mx-auto max-w-6xl px-6 lg:px-10">
        {/* ── Header ── */}
        <div className="mb-14 lg:mb-20 max-w-3xl">
          <p className="eyebrow mb-5">The synergy</p>
          <h2
            className="font-serif text-foreground hang-punct"
            style={{
              fontSize: "clamp(2rem, 1.4rem + 2.8vw, 3.75rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.024em",
              fontWeight: 650,
            }}
          >
            The clinic and the day,
            <span className="block editorial-italic text-foreground/70" style={{ fontWeight: 400 }}>
              holding hands.
            </span>
          </h2>
          <p
            className="text-muted-foreground leading-relaxed mt-7 max-w-2xl"
            style={{ fontSize: "var(--text-lead)" }}
          >
            Every clinical hour has a holistic counterpart. The work hides
            inside the day — which is the point.
          </p>
        </div>

        {/* ── Desktop diptych ── */}
        <div className="hidden lg:block">
          <div
            className="grid grid-cols-12 items-stretch"
            style={{
              boxShadow: "0 0 0 1px color-mix(in oklab, var(--navy) 10%, transparent)",
            }}
          >
            {/* Clinical rail header — navy */}
            <div className="col-span-5 bg-navy text-ivory px-8 py-5">
              <p className="small-caps text-ivory/70 text-[11px] tracking-[0.32em]">Clinical</p>
            </div>
            {/* Seam header — amber rule */}
            <div className="col-span-2 bg-navy flex items-center justify-center" aria-hidden>
              <span className="block w-2 h-2 rounded-full" style={{ background: "var(--amber)" }} />
            </div>
            {/* Holistic rail header — ivory */}
            <div className="col-span-5 bg-background px-8 py-5" style={{ boxShadow: "inset 1px 0 0 color-mix(in oklab, var(--navy) 10%, transparent)" }}>
              <p className="small-caps text-foreground/55 text-[11px] tracking-[0.32em]">Holistic</p>
            </div>

            {PAIRS.map((p, i) => {
              const active = activeRow === i;
              return (
                <button
                  key={i}
                  type="button"
                  className={`contents group cursor-pointer transition-opacity duration-700 ${
                    inView ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                  onMouseEnter={() => setActiveRow(i)}
                  onFocus={() => setActiveRow(i)}
                  onClick={() => setActiveRow(i)}
                  aria-pressed={active}
                  aria-label={`Pairing: ${p.clinical} with ${p.holistic}`}
                >
                  {/* Clinical cell — navy */}
                  <div
                    className="col-span-5 bg-navy text-ivory px-8 py-6 font-serif transition-colors duration-300 text-left"
                    style={{
                      fontSize: "clamp(1.05rem, 0.95rem + 0.45vw, 1.3rem)",
                      fontWeight: 500,
                      color: active ? "var(--amber)" : "var(--ivory)",
                      boxShadow: "inset 0 1px 0 color-mix(in oklab, var(--ivory) 8%, transparent)",
                    }}
                  >
                    {p.clinical}
                  </div>

                  {/* Seam — amber filament that grows when active */}
                  <div
                    className="col-span-2 bg-navy flex items-center justify-center py-6 relative"
                    style={{ boxShadow: "inset 0 1px 0 color-mix(in oklab, var(--ivory) 8%, transparent)" }}
                  >
                    <div
                      aria-hidden
                      className="h-px transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{
                        background: "var(--amber)",
                        width: active ? "100%" : "30%",
                        opacity: active ? 0.95 : 0.35,
                      }}
                    />
                    <span
                      aria-hidden
                      className="absolute w-1.5 h-1.5 rounded-full transition-all duration-500"
                      style={{
                        background: "var(--amber)",
                        opacity: active ? 1 : 0.6,
                        transform: active ? "scale(1.25)" : "scale(1)",
                      }}
                    />
                  </div>

                  {/* Holistic cell — ivory */}
                  <div
                    className="col-span-5 bg-background px-8 py-6 font-serif editorial-italic text-foreground transition-colors duration-300 text-left"
                    style={{
                      fontSize: "clamp(1.05rem, 0.95rem + 0.45vw, 1.3rem)",
                      fontWeight: 400,
                      color: active ? "color-mix(in oklab, var(--amber) 80%, var(--foreground))" : undefined,
                      boxShadow:
                        "inset 1px 0 0 color-mix(in oklab, var(--navy) 10%, transparent), inset 0 1px 0 color-mix(in oklab, var(--navy) 8%, transparent)",
                    }}
                  >
                    {p.holistic}
                  </div>
                </button>
              );
            })}

            {/* Inline context drawer — calm, in place, no modal. */}
            <div
              className="col-span-12 bg-navy text-ivory px-8 py-6"
              style={{
                boxShadow: "inset 0 1px 0 color-mix(in oklab, var(--amber) 35%, transparent)",
              }}
              aria-live="polite"
            >
              <div className="flex items-start gap-5">
                <p className="small-caps text-amber text-[10px] tracking-[0.32em] shrink-0 pt-1.5">
                  Why it holds
                </p>
                <p
                  key={activeRow}
                  className="text-ivory/85 leading-relaxed synergy-context-fade"
                  style={{ fontSize: "var(--text-body)" }}
                >
                  {PAIRS[activeRow].context}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile split-stage card ── */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between mb-4">
            <p className="small-caps text-amber text-[10px] tracking-[0.28em] tabular">
              {String(mobileIdx + 1).padStart(2, "0")} / {String(PAIRS.length).padStart(2, "0")}
            </p>
            <p className="small-caps text-foreground/45 text-[10px] tracking-[0.24em]">
              {held ? "Holding…" : "Hold to pause · Swipe ↔"}
            </p>
          </div>

          <div
            className="relative select-none touch-pan-y"
            style={{
              boxShadow: "0 0 0 1px color-mix(in oklab, var(--amber) 22%, transparent)",
            }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onTouchCancel={() => setHeld(false)}
          >
            <div key={mobileIdx} className="synergy-card-rise">
              {/* Top half — Clinical, navy on navy with ivory text */}
              <div className="bg-navy px-6 pt-7 pb-9 sm:px-9 relative">
                <p className="small-caps text-amber/80 text-[10px] tracking-[0.28em] mb-3">
                  Clinical
                </p>
                <p
                  className="font-serif text-ivory leading-snug"
                  style={{ fontSize: "1.35rem", fontWeight: 500 }}
                >
                  {PAIRS[mobileIdx].clinical}
                </p>
              </div>

              {/* The seam — amber filament + dot */}
              <div className="relative h-0">
                <div
                  className="absolute left-0 right-0 -translate-y-1/2 flex items-center gap-3 px-6 sm:px-9"
                  style={{ top: 0 }}
                  aria-hidden
                >
                  <span className="block h-px flex-1" style={{ background: "var(--amber)", opacity: 0.7 }} />
                  <span
                    className="block w-2 h-2 rounded-full"
                    style={{ background: "var(--amber)", boxShadow: "0 0 12px color-mix(in oklab, var(--amber) 50%, transparent)" }}
                  />
                  <span className="block h-px flex-1" style={{ background: "var(--amber)", opacity: 0.7 }} />
                </div>
              </div>

              {/* Bottom half — Holistic, ivory on ivory with navy text. */}
              <div className="bg-background px-6 pt-9 pb-7 sm:px-9">
                <p className="small-caps text-foreground/55 text-[10px] tracking-[0.28em] mb-3">
                  Holistic
                </p>
                <p
                  className="font-serif editorial-italic text-foreground leading-snug"
                  style={{ fontSize: "1.35rem", fontWeight: 400 }}
                >
                  {PAIRS[mobileIdx].holistic}
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4 text-[14px]">
                  {PAIRS[mobileIdx].context}
                </p>
              </div>
            </div>
          </div>

          {/* Pager + arrows */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {PAIRS.map((_, i) => {
                const active = i === mobileIdx;
                return (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to pair ${i + 1}`}
                    onClick={() => {
                      lockAuto();
                      setMobileIdx(i);
                    }}
                    className="block transition-all duration-300"
                    style={{
                      width: active ? 18 : 6,
                      height: 6,
                      background: active ? "var(--amber)" : "color-mix(in oklab, var(--foreground) 25%, transparent)",
                      boxShadow: active ? "0 0 10px color-mix(in oklab, var(--ember) 60%, transparent)" : undefined,
                    }}
                  />
                );
              })}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous pair"
                onClick={() => {
                  lockAuto();
                  setMobileIdx((i) => (i - 1 + PAIRS.length) % PAIRS.length);
                }}
                className="w-10 h-10 flex items-center justify-center text-foreground/60 hover:text-amber transition-colors"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next pair"
                onClick={() => {
                  lockAuto();
                  setMobileIdx((i) => (i + 1) % PAIRS.length);
                }}
                className="w-10 h-10 flex items-center justify-center text-foreground/60 hover:text-amber transition-colors"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* ── Stat strip ── */}
        <div className="mt-20 lg:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-y-10 gap-x-8 max-w-4xl">
          {[
            { figure: "4:1", label: "Staff to Guest Ratio" },
            { figure: "90", label: "Day Median Program" },
            { figure: "1", label: "Family in Residence at a Time" },
          ].map((stat) => (
            <div key={stat.label}>
              <p
                className="font-serif text-foreground mb-2 tabular"
                style={{ fontSize: "var(--text-h2)", lineHeight: 1, fontWeight: 700 }}
              >
                {stat.figure}
              </p>
              <p className="small-caps text-muted-foreground text-[11px] tracking-[0.28em]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── WeekRhythm footer strip ── */}
        <div className="mt-20 lg:mt-28 pt-14 lg:pt-16" style={{ borderTop: "1px solid color-mix(in oklab, var(--navy) 12%, transparent)" }}>
          <p className="small-caps text-muted-foreground text-[11px] tracking-[0.28em] mb-8">
            And, week by week
          </p>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-y-1 max-w-5xl">
            {WEEK.map((d, i) => (
              <li
                key={d.day}
                className={`flex items-baseline gap-5 sm:gap-8 py-3 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
                style={{ transitionDelay: `${300 + i * 70}ms` }}
              >
                <span
                  className="font-serif text-amber tabular shrink-0 w-12 sm:w-16"
                  style={{ fontSize: "0.95rem", fontWeight: 600 }}
                >
                  <span className="hidden sm:inline">{d.day}</span>
                  <span className="sm:hidden">{d.short}</span>
                </span>
                <p
                  className="font-serif editorial-italic text-foreground/85 leading-snug flex-1"
                  style={{ fontSize: "clamp(0.95rem, 0.9rem + 0.3vw, 1.1rem)", fontWeight: 400 }}
                >
                  {d.line}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <style>{`
        @keyframes synergyCardRise {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .synergy-card-rise {
          animation: synergyCardRise 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes synergyContextFade {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .synergy-context-fade {
          animation: synergyContextFade 360ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .synergy-card-rise, .synergy-context-fade { animation: none !important; }
        }
      `}</style>
    </section>
  );
}

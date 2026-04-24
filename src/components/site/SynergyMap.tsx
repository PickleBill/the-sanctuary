import { useEffect, useRef, useState } from "react";

/**
 * v3.7 — SynergyMap (restored, done right).
 *
 * Six clinical/holistic pairs. Desktop: a quiet two-column weave with a
 * single connecting filament between the halves on hover. Mobile: a
 * swipeable card stack with pager — one pair per card, single connector
 * per card. The ONE place we keep an amber line — it's structural, not
 * decorative. WeekRhythm preserved as a footer strip in the same section.
 */

type Pair = {
  clinical: string;
  holistic: string;
};

const PAIRS: Pair[] = [
  { clinical: "Genetic & metabolic panel",       holistic: "A long table, every night" },
  { clinical: "Trauma-informed psychiatry",      holistic: "The cellist in the great room" },
  { clinical: "Neurofeedback & HRV training",    holistic: "Fly-fishing on private water" },
  { clinical: "Family conjoint, structured",     holistic: "The horse, twice a week" },
  { clinical: "Integrative pharmacology",        holistic: "Painting in the studio" },
  { clinical: "Vagal tone & sleep architecture", holistic: "Sauna at five, stars at nine" },
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
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const [mobileIdx, setMobileIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Auto-advance mobile carousel until user interacts
  const autoLockRef = useRef(false);
  useEffect(() => {
    if (autoLockRef.current) return;
    const id = window.setInterval(() => {
      setMobileIdx((i) => (i + 1) % PAIRS.length);
    }, 3800);
    return () => window.clearInterval(id);
  }, []);

  const lockAuto = () => {
    autoLockRef.current = true;
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
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
      className="relative py-24 lg:py-36 bg-navy text-ivory scroll-mt-24 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 25%, color-mix(in oklab, var(--amber) 8%, transparent), transparent 75%)",
        }}
      />
      <div ref={ref} className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* ── Header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 lg:mb-20">
          <div className="lg:col-span-9">
            <p className="eyebrow mb-5">The synergy</p>
            <h2
              className="font-serif text-ivory hang-punct text-luxe"
              style={{
                fontSize: "clamp(2rem, 1.4rem + 2.8vw, 3.75rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.024em",
                fontWeight: 650,
              }}
            >
              The clinic and the day,
              <span className="block editorial-italic text-ivory/85" style={{ fontWeight: 400 }}>
                holding hands.
              </span>
            </h2>
            <p
              className="text-ivory/85 leading-relaxed mt-7 max-w-2xl"
              style={{ fontSize: "var(--text-lead)" }}
            >
              Every clinical hour has a holistic counterpart. The work hides
              inside the day — which is the point.
            </p>
          </div>
        </div>

        {/* ── Desktop weave ── */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-12 gap-x-6 max-w-5xl">
            <div className="col-span-5 mb-6">
              <p className="small-caps text-ivory/55 text-[11px] tracking-[0.32em]">Clinical</p>
            </div>
            <div className="col-span-2" />
            <div className="col-span-5 mb-6">
              <p className="small-caps text-ivory/55 text-[11px] tracking-[0.32em]">Holistic</p>
            </div>

            {PAIRS.map((p, i) => {
              const active = activeRow === i;
              return (
                <div
                  key={i}
                  className={`contents group cursor-default transition-opacity duration-700 ${
                    inView ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                  onMouseEnter={() => setActiveRow(i)}
                  onMouseLeave={() => setActiveRow(null)}
                >
                  <div
                    className="col-span-5 py-5 font-serif text-ivory/95 transition-colors duration-300"
                    style={{
                      fontSize: "clamp(1.05rem, 0.95rem + 0.45vw, 1.35rem)",
                      fontWeight: 500,
                      color: active ? "var(--amber)" : undefined,
                    }}
                  >
                    {p.clinical}
                  </div>

                  {/* connector — single short amber filament that grows on hover */}
                  <div className="col-span-2 flex items-center justify-center py-5">
                    <div
                      aria-hidden
                      className="h-px transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{
                        background: "var(--amber)",
                        width: active ? "100%" : "32%",
                        opacity: active ? 0.95 : 0.3,
                      }}
                    />
                    <span
                      aria-hidden
                      className="absolute w-1.5 h-1.5 rounded-full transition-all duration-500"
                      style={{
                        background: "var(--amber)",
                        opacity: active ? 1 : 0.5,
                        transform: active ? "scale(1.2)" : "scale(1)",
                      }}
                    />
                  </div>

                  <div
                    className="col-span-5 py-5 font-serif editorial-italic text-ivory/95 transition-colors duration-300"
                    style={{
                      fontSize: "clamp(1.05rem, 0.95rem + 0.45vw, 1.35rem)",
                      fontWeight: 400,
                      color: active ? "var(--amber)" : undefined,
                    }}
                  >
                    {p.holistic}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Mobile swipe stack ── */}
        <div className="lg:hidden">
          <div
            className="relative bg-navy/40 p-7 sm:p-9 select-none touch-pan-y"
            style={{
              boxShadow: "inset 0 0 0 1px color-mix(in oklab, var(--amber) 14%, transparent)",
            }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="flex items-center justify-between mb-6">
              <p className="small-caps text-amber text-[10px] tracking-[0.32em] tabular">
                {String(mobileIdx + 1).padStart(2, "0")} / {String(PAIRS.length).padStart(2, "0")}
              </p>
              <p className="small-caps text-ivory/45 text-[10px] tracking-[0.28em]">
                Swipe ↔
              </p>
            </div>

            <div key={mobileIdx} className="synergy-card-rise">
              <p className="small-caps text-ivory/60 text-[10px] tracking-[0.32em] mb-3">
                Clinical
              </p>
              <p
                className="font-serif text-ivory leading-snug mb-7"
                style={{ fontSize: "1.35rem", fontWeight: 500 }}
              >
                {PAIRS[mobileIdx].clinical}
              </p>

              {/* connector */}
              <div className="flex items-center gap-3 my-5">
                <span
                  aria-hidden
                  className="block h-px flex-1"
                  style={{ background: "var(--amber)", opacity: 0.6 }}
                />
                <span
                  aria-hidden
                  className="block w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--amber)" }}
                />
                <span
                  aria-hidden
                  className="block h-px flex-1"
                  style={{ background: "var(--amber)", opacity: 0.6 }}
                />
              </div>

              <p className="small-caps text-ivory/60 text-[10px] tracking-[0.32em] mb-3">
                Holistic
              </p>
              <p
                className="font-serif editorial-italic text-ivory leading-snug"
                style={{ fontSize: "1.35rem", fontWeight: 400 }}
              >
                {PAIRS[mobileIdx].holistic}
              </p>
            </div>

            {/* Pager + arrows */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {PAIRS.map((_, i) => (
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
                      width: i === mobileIdx ? 18 : 6,
                      height: 6,
                      background: i === mobileIdx ? "var(--amber)" : "color-mix(in oklab, var(--ivory) 35%, transparent)",
                    }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous pair"
                  onClick={() => {
                    lockAuto();
                    setMobileIdx((i) => (i - 1 + PAIRS.length) % PAIRS.length);
                  }}
                  className="w-10 h-10 flex items-center justify-center text-ivory/70 hover:text-amber transition-colors"
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
                  className="w-10 h-10 flex items-center justify-center text-ivory/70 hover:text-amber transition-colors"
                >
                  →
                </button>
              </div>
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
                className="font-serif text-amber mb-2 tabular text-luxe"
                style={{ fontSize: "var(--text-h2)", lineHeight: 1, fontWeight: 700 }}
              >
                {stat.figure}
              </p>
              <p className="small-caps text-ivory/75 text-[11px] tracking-[0.3em]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── WeekRhythm footer strip — preserved, quieter ── */}
        <div className="mt-20 lg:mt-28 pt-14 lg:pt-16" style={{ borderTop: "1px solid color-mix(in oklab, var(--amber) 18%, transparent)" }}>
          <p className="small-caps text-ivory/55 text-[11px] tracking-[0.32em] mb-8">
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
                  className="font-serif editorial-italic text-ivory/85 leading-snug flex-1"
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
          animation: synergyCardRise 380ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .synergy-card-rise { animation: none !important; }
        }
      `}</style>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";

/**
 * v3.6 — WeekRhythm
 *
 * Replaces SynergyMap. Same data idea (clinical + holistic, interleaved)
 * but felt as a LIFE RHYTHM — what a week here actually looks like.
 * Seven days. Seven sentences. No grid, no plates, no filaments.
 */

type Day = {
  day: string;
  short: string;
  line: string;
};

const week: Day[] = [
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

export function WeekRhythm() {
  const { ref, inView } = useInView<HTMLDivElement>();
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 lg:mb-20">
          <div className="lg:col-span-9">
            <p className="eyebrow mb-5">A week, in residence</p>
            <h2
              className="font-serif text-ivory hang-punct text-luxe"
              style={{
                fontSize: "clamp(2rem, 1.4rem + 2.8vw, 3.75rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.024em",
                fontWeight: 650,
              }}
            >
              What a week
              <span className="block editorial-italic text-ivory/85" style={{ fontWeight: 400 }}>
                looks like.
              </span>
            </h2>
            <p
              className="text-ivory/85 leading-relaxed mt-7 max-w-2xl"
              style={{ fontSize: "var(--text-lead)" }}
            >
              Clinical and holistic, interleaved. The work hides inside the day — which is the point.
            </p>
          </div>
        </div>

        {/* Seven days — quiet horizontal cadence on desktop, stacked on mobile */}
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-y-2 lg:gap-y-1 max-w-5xl">
          {week.map((d, i) => (
            <li
              key={d.day}
              className={`flex items-baseline gap-6 sm:gap-10 py-5 lg:py-6 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span
                className="font-serif text-amber tabular shrink-0 w-14 sm:w-20"
                style={{ fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.25rem)", fontWeight: 600, letterSpacing: "0.02em" }}
              >
                <span className="hidden sm:inline">{d.day}</span>
                <span className="sm:hidden">{d.short}</span>
              </span>
              <p
                className="font-serif editorial-italic text-ivory leading-snug flex-1"
                style={{ fontSize: "clamp(1.125rem, 1rem + 0.7vw, 1.5rem)", fontWeight: 400 }}
              >
                {d.line}
              </p>
            </li>
          ))}
        </ol>

        {/* Stat strip — moved here from the old SynergyMap */}
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
      </div>
    </section>
  );
}

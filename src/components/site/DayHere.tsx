import { useEffect, useRef, useState } from "react";

/**
 * v1.6 — "A Day Here"
 *
 * The joy proof. Six time-stamped editorial moments. No commentary, just a
 * quiet schedule that shows the buyer what *life* looks like, not what the
 * facility offers. This is the most important new surface in v1.6.
 */

const MOMENTS = [
  { hour: "6:30", line: "Sunrise on the upper field. Coffee, no obligations." },
  { hour: "8:00", line: "Bloodwork and breakfast, in that order." },
  {
    hour: "10:30",
    line: "Group with three others. No one introduces themselves by what they do.",
  },
  {
    hour: "13:00",
    line: "Trout stream, or the library, or a nap. The afternoon is yours.",
  },
  {
    hour: "17:00",
    line: "Dinner at one long table. Conversation drifts. Someone laughs.",
  },
  { hour: "21:00", line: "A book. A bath. The ridge goes dark." },
];

export function DayHere() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="day-here"
      className="relative bg-background py-28 lg:py-40 scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 lg:mb-20">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-5">
              <span className="luxe-rule mr-3" /> A Day Here
            </p>
            <h2
              className="font-serif text-foreground mb-7 hang-punct"
              style={{
                fontSize: "clamp(2rem, 1.5rem + 3vw, 3.75rem)",
                lineHeight: 1.06,
                letterSpacing: "-0.02em",
                fontWeight: 500,
              }}
            >
              What a Tuesday
              <span className="block editorial-italic text-foreground/70" style={{ fontWeight: 400 }}>
                actually looks like.
              </span>
            </h2>
            <p
              className="text-muted-foreground leading-relaxed max-w-xl"
              style={{ fontSize: "var(--text-body)" }}
            >
              No printed schedule. No mandatory blocks beyond the clinical work. The hours below are typical, not prescriptive — your day is composed with you, not for you.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <ol className="relative mx-auto max-w-3xl">
          {/* Vertical spine — drawn from top */}
          <span
            aria-hidden
            className={`absolute left-[5.5rem] sm:left-[7rem] top-2 bottom-2 w-px bg-border origin-top transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              visible ? "scale-y-100" : "scale-y-0"
            }`}
          />
          {MOMENTS.map((m, i) => (
            <li
              key={m.hour}
              className={`relative grid grid-cols-[5rem_auto_1fr] sm:grid-cols-[6.5rem_auto_1fr] gap-4 sm:gap-6 py-6 sm:py-8 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
              style={{ transitionDelay: `${300 + i * 220}ms` }}
            >
              {/* Hour */}
              <div className="text-right pt-1">
                <span className="small-caps text-amber text-[12px] tracking-[0.28em] tabular">
                  {m.hour}
                </span>
                {/* Filament out from hour */}
                <span
                  aria-hidden
                  className={`block h-px bg-amber/60 mt-2 ml-auto origin-right transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    visible ? "scale-x-100" : "scale-x-0"
                  }`}
                  style={{
                    width: "1.5rem",
                    transitionDelay: `${500 + i * 220}ms`,
                  }}
                />
              </div>

              {/* Node */}
              <div className="relative flex items-start pt-2">
                <span
                  aria-hidden
                  className={`block w-2 h-2 rotate-45 bg-amber transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    visible ? "opacity-100 scale-100" : "opacity-0 scale-50"
                  }`}
                  style={{ transitionDelay: `${600 + i * 220}ms` }}
                />
              </div>

              {/* Editorial line */}
              <p
                className="font-serif editorial-italic text-foreground/85 leading-snug"
                style={{
                  fontSize: "clamp(1.125rem, 0.95rem + 0.85vw, 1.5rem)",
                  fontWeight: 400,
                  lineHeight: 1.35,
                }}
              >
                {m.line}
              </p>
            </li>
          ))}
        </ol>

        {/* Coda */}
        <div
          className={`mx-auto max-w-3xl mt-16 lg:mt-20 pt-10 border-t border-border transition-all duration-1000 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
          style={{ transitionDelay: "1900ms" }}
        >
          <p
            className="text-muted-foreground leading-relaxed max-w-2xl"
            style={{ fontSize: "var(--text-body)" }}
          >
            There is medicine inside every hour of this — bloodwork, group, somatic recovery, family integration when it&rsquo;s called for. We just decline to call it a curriculum. The work is real. The day is also yours.
          </p>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";

const items = [
  {
    num: "I",
    title: "Discretion, by default",
    desc: "Universal NDAs, encrypted channels, private arrival. The privacy is so complete you stop thinking about it — which is the point.",
  },
  {
    num: "II",
    title: "The work, when it must continue",
    desc: "A sound-proof private office, satellite-grade fiber, and a secure conference stack — for the calls you cannot miss. Used sparingly, by design.",
  },
  {
    num: "III",
    title: "Things worth doing again",
    desc: "Fly fishing on private water. A round at a quiet course. An hour with a horse who doesn't care what you do for a living.",
  },
  {
    num: "IV",
    title: "Food you would order on purpose",
    desc: "A private chef working from a metabolic dietitian's brief. Plated as hospitality. Designed as medicine. You will eat better here than at home.",
  },
  {
    num: "V",
    title: "Family, brought back into the room",
    desc: "On-site lodging for spouses and counsel. Family-systems sessions led by senior clinicians. The conversation you've been postponing, made possible.",
  },
];

export function Amenities() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="amenities" className="py-28 lg:py-40 bg-background scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* /shape: header in 8/12 columns; matches every other section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 lg:mb-16">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-5">
              <span className="luxe-rule mr-3" /> Executive Amenities
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
              Designed for the
              <span className="block editorial-italic text-foreground/70" style={{ fontWeight: 400 }}>
                modern leader.
              </span>
            </h2>
            <p
              className="text-muted-foreground leading-relaxed max-w-xl"
              style={{ fontSize: "var(--text-body)" }}
            >
              Five quiet commitments — some clinical, some hospitable, all designed to make a serious month of work feel like a place you would want to come back to.
            </p>
          </div>
        </div>

        {/* Desktop: horizontal ledger */}
        <div className="hidden md:block">
          <div
            ref={scrollerRef}
            className="overflow-x-auto -mx-6 lg:-mx-10 px-6 lg:px-10 scrollbar-none snap-x snap-mandatory"
            style={{ scrollbarWidth: "none" }}
          >
            <ol className="flex gap-px bg-border w-max">
              {items.map((it, i) => (
                <li
                  key={it.num}
                  className="bg-background snap-start group transition-colors duration-700 hover:bg-primary w-[420px] lg:w-[480px] p-10 lg:p-12 flex flex-col"
                >
                  <div className="flex items-baseline justify-between mb-8">
                    <p
                      className="font-serif text-amber leading-none"
                      style={{ fontSize: "var(--text-h2)", fontWeight: 400, letterSpacing: "-0.02em" }}
                    >
                      {it.num}
                    </p>
                    <p className="small-caps text-muted-foreground/70 group-hover:text-ivory/60 transition-colors text-[11px] tracking-[0.24em] tabular">
                      {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                    </p>
                  </div>
                  <h3
                    className="font-serif text-foreground group-hover:text-ivory mb-5 transition-colors"
                    style={{ fontSize: "var(--text-h4)", lineHeight: 1.15, fontWeight: 500 }}
                  >
                    {it.title}
                  </h3>
                  <p className="text-sm lg:text-base text-muted-foreground leading-relaxed group-hover:text-ivory/80 transition-colors">
                    {it.desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Progress rule */}
          <div className="mt-10 h-px bg-border relative">
            <div
              className="absolute left-0 top-0 h-px bg-amber transition-[width] duration-300"
              style={{ width: `${Math.max(8, progress * 100)}%` }}
            />
          </div>
        </div>

        {/* Mobile: vertical timeline. Counter is set on its own line above the title to prevent collision with the Roman numeral. */}
        <ol className="md:hidden grid grid-cols-1 gap-px bg-border">
          {items.map((it, i) => (
            <li key={it.num} className="bg-background px-6 py-8 group">
              <p className="small-caps text-muted-foreground/70 text-[10px] tracking-[0.32em] tabular mb-5">
                <span className="text-amber/80">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-muted-foreground/40"> / {String(items.length).padStart(2, "0")}</span>
              </p>
              <p
                className="font-serif text-amber leading-none mb-5"
                style={{ fontSize: "clamp(2.25rem, 8vw, 3rem)", fontWeight: 400, letterSpacing: "-0.02em" }}
              >
                {it.num}
              </p>
              <h3
                className="font-serif mb-3 text-foreground"
                style={{ fontSize: "var(--text-h4)", lineHeight: 1.15, fontWeight: 500 }}
              >
                {it.title}
              </h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">{it.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

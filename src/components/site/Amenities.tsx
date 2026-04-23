import { useEffect, useRef, useState } from "react";

const items = [
  {
    num: "I",
    title: "Ironclad Privacy",
    desc: "Universal NDAs for every staff member, encrypted communication channels, and private arrival protocols ensure your presence is known only to those you choose.",
  },
  {
    num: "II",
    title: "Business Continuity",
    desc: "Sound-proof private offices, satellite-grade internet, and secure conferencing keep critical leadership operations uninterrupted throughout your stay.",
  },
  {
    num: "III",
    title: "Bespoke Re-Engagement",
    desc: "Curated activities — fly fishing on private waters, championship golf, equestrian work — restore identity and confidence beyond the clinical container.",
  },
  {
    num: "IV",
    title: "Personal Chef & Nutrition",
    desc: "Private chef cuisine designed by metabolic and functional dietitians. Every meal is a clinical instrument, plated as hospitality.",
  },
  {
    num: "V",
    title: "Family Integration",
    desc: "Discrete on-site lodging for spouses or principals' counsel, with private family-systems sessions led by senior clinicians.",
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
        <div className="max-w-2xl mb-12 lg:mb-16">
          <p className="eyebrow mb-5">
            <span className="luxe-rule mr-3" /> Executive Amenities
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-foreground">
            Designed for the modern leader.
          </h2>
          <p className="mt-6 text-muted-foreground text-base lg:text-lg leading-relaxed">
            Five quiet commitments that distinguish a clinical container from a hotel with therapy. <span className="hidden md:inline">Drag to explore.</span>
          </p>
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

        {/* Mobile: vertical timeline */}
        <ol className="md:hidden grid grid-cols-1 gap-px bg-border">
          {items.map((it, i) => (
            <li key={it.num} className="bg-background p-8 group">
              <div className="flex items-baseline justify-between mb-5">
                <p
                  className="font-serif text-amber"
                  style={{ fontSize: "var(--text-h3)", fontWeight: 400 }}
                >
                  {it.num}
                </p>
                <p className="small-caps text-muted-foreground/70 text-[11px] tracking-[0.24em] tabular">
                  {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </p>
              </div>
              <h3
                className="font-serif mb-3 text-foreground"
                style={{ fontSize: "var(--text-h4)", lineHeight: 1.15, fontWeight: 500 }}
              >
                {it.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

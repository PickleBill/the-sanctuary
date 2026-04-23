import { useEffect, useRef, useState } from "react";
import suite from "@/assets/gallery-suite.jpg";
import boardroom from "@/assets/gallery-boardroom.jpg";
import grounds from "@/assets/gallery-grounds.jpg";
import clinical from "@/assets/gallery-clinical.jpg";

const stats = [
  { value: "212", label: "Private Acres" },
  { value: "2,400ft", label: "Elevation" },
  { value: "45 min", label: "From AVL · 2hr from CLT" },
  { value: "One", label: "Family in residence" },
];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: 0.15 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function Frame({
  src,
  title,
  caption,
  className = "",
  delay = 0,
}: {
  src: string;
  title: string;
  caption: string;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <figure
      ref={ref}
      className={`group relative overflow-hidden bg-card transition-all duration-1000 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-full h-full overflow-hidden">
        <img
          src={src}
          alt={title}
          loading="lazy"
          width={1280}
          height={960}
          className="w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
        />
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 45%, color-mix(in oklab, var(--navy) 88%, transparent) 100%)",
        }}
        aria-hidden
      />
      <figcaption className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-ivory">
        <p className="eyebrow text-amber mb-2">{title.split(" ")[0]}</p>
        <h3 className="font-serif text-xl lg:text-2xl mb-2">{title}</h3>
        <p className="text-sm text-ivory/80 max-w-md leading-relaxed">{caption}</p>
      </figcaption>
    </figure>
  );
}

export function Gallery() {
  return (
    <section id="gallery" className="py-28 lg:py-40 bg-background scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl mb-16 lg:mb-20">
          <p className="eyebrow mb-5">
            <span className="luxe-rule mr-3" /> The Estate
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6">
            A sanctuary of unrivaled privacy.
          </h2>
          <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
            Two hundred private acres in the Blue Ridge — gated, sealed, and composed for a single family in residence at a time. Stone-and-cedar architecture, century-old oaks, and an infinity pool that reads the ridgeline.
          </p>
        </div>

        {/* Editorial asymmetric mosaic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Tall hero frame */}
          <Frame
            src={suite}
            title="Private Suite"
            caption="Single-occupancy residence wings with bespoke linens, library nooks, and a personal concierge."
            className="lg:col-span-7 lg:row-span-2 aspect-[4/5] lg:aspect-auto lg:min-h-[680px]"
          />
          <Frame
            src={grounds}
            title="Therapeutic Grounds"
            caption="Two hundred acres of oak-shaded gardens, walking meditations, and quiet water."
            className="lg:col-span-5 aspect-[4/3]"
            delay={120}
          />
          <Frame
            src={boardroom}
            title="Executive Boardroom"
            caption="Sound-proofed, encrypted spaces for uninterrupted leadership."
            className="lg:col-span-5 aspect-[4/3]"
            delay={240}
          />
          <Frame
            src={clinical}
            title="Clinical Wellness Suite"
            caption="Five-star medical environments staffed by board-certified specialists."
            className="lg:col-span-12 aspect-[16/7]"
            delay={360}
          />
        </div>

        {/* Acreage at a glance */}
        <div className="mt-16 lg:mt-20 border-t border-b border-border">
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`py-8 lg:py-10 px-6 ${
                  i < stats.length - 1 ? "lg:border-r border-border" : ""
                } ${i % 2 === 0 ? "border-r lg:border-r" : ""} ${
                  i < 2 ? "border-b lg:border-b-0" : ""
                }`}
              >
                <dt className="eyebrow text-muted-foreground/80 mb-3 text-[10px]">
                  {s.label}
                </dt>
                <dd className="font-serif text-3xl lg:text-4xl text-foreground">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

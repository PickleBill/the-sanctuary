import { useEffect, useRef, useState } from "react";
import medical from "@/assets/leader-medical-director.jpg";
import clinical from "@/assets/leader-clinical-director.jpg";

const leaders = [
  {
    role: "Medical Director",
    name: "[Name forthcoming]",
    credentials: "MD, Diplomate ABAM · Board-certified, Internal Medicine & Addiction Medicine",
    formerly: "Formerly affiliated with the Hazelden Betty Ford Foundation",
    quote:
      "Discretion and clinical excellence are not in tension. They are the same standard, expressed in different rooms.",
    img: medical,
  },
  {
    role: "Clinical Director",
    name: "[Name forthcoming]",
    credentials: "PhD, Licensed Clinical Psychologist · Trauma-Informed Care, Family Systems",
    formerly: "Two decades caring for executives, surgeons, and public figures",
    quote:
      "We design one program for one family at a time. There is no cohort to fit into — only the work in front of us.",
    img: clinical,
  },
];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: 0.2 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

export function Leadership() {
  return (
    <section
      id="leadership"
      className="py-28 lg:py-40 bg-secondary scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* /shape: header sits in 7/12 columns left, /distill: one thing — "the people are the program" */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 lg:mb-20">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-5">
              <span className="luxe-rule mr-3" /> Clinical Leadership
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
              The people
              <span className="block editorial-italic text-foreground/70" style={{ fontWeight: 400 }}>
                are the program.
              </span>
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-xl" style={{ fontSize: "var(--text-body)" }}>
              We do not sell a building. We sell the judgment of the two clinicians who personally compose your care — present on the estate, not on a quarterly visit.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {leaders.map((l, i) => (
            <LeaderCard key={l.role} leader={l} delay={i * 150} />
          ))}
        </div>

        <div className="mt-12 max-w-3xl">
          <p className="text-xs lg:text-sm text-muted-foreground italic leading-relaxed">
            Names are withheld at the request of our principals. Full credentials, CVs, and references are shared directly during private consultation, and on request from licensed referring clinicians via our{" "}
            <button
              onClick={() => {
                const el = document.getElementById("concierge-form");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="underline decoration-amber/50 underline-offset-4 hover:text-foreground transition-colors"
            >
              encrypted document exchange
            </button>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

function LeaderCard({
  leader,
  delay,
}: {
  leader: (typeof leaders)[number];
  delay: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`bg-background p-8 lg:p-12 transition-all duration-1000 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex flex-col sm:flex-row gap-8 lg:gap-10 items-start">
        <div className="w-full sm:w-48 lg:w-56 shrink-0">
          <div className="aspect-[4/5] overflow-hidden bg-muted relative">
            <img
              src={leader.img}
              alt={`Portrait of the ${leader.role}`}
              loading="lazy"
              width={1024}
              height={1280}
              className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.04]"
            />
            {/* /quieter: gradient softened from 25% navy to 16%, photo carries */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent 65%, color-mix(in oklab, var(--navy) 16%, transparent) 100%)",
              }}
              aria-hidden
            />
          </div>
        </div>

        <div className="flex-1">
          {/* /typeset: role as small-caps eyebrow, name as display, credentials as small-caps tabular,
              philosophy as editorial-italic pulled from a quiet amber rule */}
          <p className="small-caps text-amber mb-3 text-[11px] tracking-[0.24em]">
            {leader.role}
          </p>
          <h3
            className="font-serif text-foreground mb-5 hang-punct"
            style={{
              fontSize: "clamp(1.625rem, 1.4rem + 1vw, 2.25rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.018em",
              fontWeight: 500,
            }}
          >
            {leader.name}
          </h3>
          <p className="small-caps text-foreground/75 text-[11px] tracking-[0.18em] mb-2 tabular leading-relaxed">
            {leader.credentials}
          </p>
          <p className="text-[13px] text-muted-foreground italic leading-relaxed mb-7">
            {leader.formerly}
          </p>
          <blockquote className="border-l border-amber/50 pl-5 py-1">
            <p
              className="font-serif editorial-italic text-foreground/85 leading-[1.5]"
              style={{ fontSize: "var(--text-lead)", fontWeight: 400 }}
            >
              &ldquo;{leader.quote}&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
    </div>
  );
}

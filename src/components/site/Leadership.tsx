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
        <div className="max-w-2xl mb-16 lg:mb-20">
          <p className="eyebrow mb-5">
            <span className="luxe-rule mr-3" /> Clinical Leadership
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6">
            The people are the program.
          </h2>
          <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
            We do not sell a building. We sell the judgment of the two clinicians who will personally compose your care. They are present on the estate, not on a quarterly visit.
          </p>
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
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent 60%, color-mix(in oklab, var(--navy) 25%, transparent) 100%)",
              }}
              aria-hidden
            />
          </div>
        </div>

        <div className="flex-1">
          <p className="eyebrow text-amber mb-3">{leader.role}</p>
          <h3 className="font-serif text-2xl lg:text-3xl text-foreground mb-4">
            {leader.name}
          </h3>
          <p className="text-sm text-foreground/80 leading-relaxed mb-2">
            {leader.credentials}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            {leader.formerly}
          </p>
          <blockquote className="border-l border-amber/60 pl-5 py-1">
            <p className="font-serif text-base lg:text-lg italic text-foreground leading-relaxed">
              "{leader.quote}"
            </p>
          </blockquote>
        </div>
      </div>
    </div>
  );
}

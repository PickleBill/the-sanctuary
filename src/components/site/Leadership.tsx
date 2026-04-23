import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import medical from "@/assets/leader-medical-director.jpg";
import clinical from "@/assets/leader-clinical-director.jpg";

/**
 * v1.5 — Leadership configured via a single LEADERS object so swapping in real
 * names + photos later is a one-line change. Path B: identity withheld but
 * verification posture made explicit (board cert, DEA, state license — all
 * checked, available to licensed referring clinicians under NDA).
 */

type Leader = {
  role: string;
  name: string;            // "[Name forthcoming]" until signed
  credentials: string;     // visible
  formerly: string;        // visible
  quote: string;
  img: string;
  /**
   * Items we have verified internally — shown in the credentials modal so a
   * referring clinician can see exactly what is on file before requesting NDA.
   */
  verified: string[];
};

export const LEADERS: Leader[] = [
  {
    role: "Medical Director",
    name: "[Name forthcoming]",
    credentials: "MD, Diplomate ABAM · Board-certified, Internal Medicine & Addiction Medicine",
    formerly: "Formerly affiliated with the Hazelden Betty Ford Foundation",
    quote:
      "Discretion and clinical excellence are not in tension. They are the same standard, expressed in different rooms.",
    img: medical,
    verified: [
      "Board certification — American Board of Internal Medicine",
      "Board certification — American Board of Addiction Medicine (ABAM)",
      "Active DEA registration",
      "Unrestricted North Carolina medical license",
      "Curriculum vitae and references on file",
    ],
  },
  {
    role: "Clinical Director",
    name: "[Name forthcoming]",
    credentials: "PhD, Licensed Clinical Psychologist · Trauma-Informed Care, Family Systems",
    formerly: "Two decades caring for executives, surgeons, and public figures",
    quote:
      "We design one program for one family at a time. There is no cohort to fit into — only the work in front of us.",
    img: clinical,
    verified: [
      "PhD, Clinical Psychology",
      "Active North Carolina psychology license",
      "Specialty training — Trauma-Informed Care, Internal Family Systems",
      "Curriculum vitae and references on file",
    ],
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
  const [openModal, setOpenModal] = useState<Leader | null>(null);

  return (
    <section
      id="leadership"
      className="py-28 lg:py-40 bg-secondary scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
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
          {LEADERS.map((l, i) => (
            <LeaderCard
              key={l.role}
              leader={l}
              delay={i * 150}
              onVerify={() => setOpenModal(l)}
            />
          ))}
        </div>

        <div className="mt-12 max-w-3xl space-y-3">
          <p className="text-xs lg:text-sm text-muted-foreground italic leading-relaxed">
            Identity disclosed under mutual NDA. Verification available to licensed referring clinicians on request via our{" "}
            <Link
              to="/professionals"
              className="not-italic underline decoration-amber/50 underline-offset-4 hover:text-foreground transition-colors"
            >
              encrypted document exchange
            </Link>
            .
          </p>
        </div>
      </div>

      {openModal && (
        <CredentialsModal leader={openModal} onClose={() => setOpenModal(null)} />
      )}
    </section>
  );
}

function LeaderCard({
  leader,
  delay,
  onVerify,
}: {
  leader: Leader;
  delay: number;
  onVerify: () => void;
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
              className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.04] portrait-grade"
            />
            {/* Unified portrait grade — cool slate shadows, warm amber midtones */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-soft-light"
              style={{
                background:
                  "linear-gradient(140deg, color-mix(in oklab, var(--navy) 18%, transparent) 0%, transparent 45%, color-mix(in oklab, var(--amber) 14%, transparent) 100%)",
              }}
              aria-hidden
            />
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
          <p className="text-[13px] text-muted-foreground italic leading-relaxed mb-6">
            {leader.formerly}
          </p>
          <blockquote className="border-l border-amber/50 pl-5 py-1 mb-6">
            <p
              className="font-serif editorial-italic text-foreground/85 leading-[1.5]"
              style={{ fontSize: "var(--text-lead)", fontWeight: 400 }}
            >
              &ldquo;{leader.quote}&rdquo;
            </p>
          </blockquote>

          {/* Credentials Verified badge — opens modal listing what is on file */}
          <button
            onClick={onVerify}
            className="inline-flex items-center gap-3 group py-2 -ml-1 px-1"
            aria-label={`See what credentials are verified for the ${leader.role}`}
          >
            <span className="luxe-rule group-hover:w-16 transition-all duration-500" aria-hidden />
            <span className="small-caps text-foreground/65 group-hover:text-amber transition-colors text-[10px] tracking-[0.28em]">
              Credentials Verified · See What's on File
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function CredentialsModal({ leader, onClose }: { leader: Leader; onClose: () => void }) {
  // Close on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-[fadeIn_200ms_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="credentials-title"
    >
      <button
        className="absolute inset-0 bg-navy/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close"
      />
      <div className="relative bg-background border border-border max-w-lg w-full p-8 lg:p-10 shadow-luxe">
        <p className="small-caps text-amber text-[11px] tracking-[0.28em] mb-3">
          {leader.role} · Verified
        </p>
        <h3
          id="credentials-title"
          className="font-serif text-foreground mb-5"
          style={{ fontSize: "var(--text-h4)", lineHeight: 1.15, fontWeight: 500 }}
        >
          What is on file.
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          The items below have been verified internally. Full credentials, CVs, and references are released to licensed referring clinicians under mutual NDA.
        </p>
        <ul className="space-y-3 mb-8">
          {leader.verified.map((item) => (
            <li key={item} className="flex gap-3 text-[14px] text-foreground/85 leading-[1.55]">
              <span className="text-amber mt-1.5 shrink-0" aria-hidden>◆</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/professionals"
            onClick={onClose}
            className="flex-1 text-center border border-amber/60 px-5 py-3 small-caps text-[11px] tracking-[0.24em] text-foreground hover:bg-amber hover:text-amber-foreground transition-colors duration-500"
          >
            Request Under NDA
          </Link>
          <button
            onClick={onClose}
            className="flex-1 border border-border px-5 py-3 small-caps text-[11px] tracking-[0.24em] text-foreground/70 hover:border-foreground/40 hover:text-foreground transition-colors duration-500"
          >
            Close
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}

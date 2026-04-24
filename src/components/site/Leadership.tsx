import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import medical from "@/assets/leader-medical-director-v2.jpg";
import clinical from "@/assets/leader-clinical-director-v2.jpg";

/**
 * v3.6 — Clinical Leadership.
 *
 * Rewritten copy: warm, human, peer-not-judge framing. The clinicians
 * are people you'd want at the dinner table — not credentials being
 * displayed. Verification on file is still available; it just isn't the
 * loudest thing on the page.
 */

type Leader = {
  role: string;
  name: string;
  credentials: string;
  story: string;     // human one-liner about who they are, not what they've done
  quote: string;
  img: string;
  verified: string[];
};

export const LEADERS: Leader[] = [
  {
    role: "Medical Director",
    name: "[Name forthcoming]",
    credentials: "MD, Diplomate ABAM",
    story:
      "Two decades caring for surgeons, founders, and federal judges. Keeps a small fly-fishing journal and refuses to take calls before sunrise.",
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
    credentials: "PhD, Licensed Clinical Psychologist",
    story:
      "Trauma-informed care, family systems. Plays cello on Sunday afternoons. Has held one of these chairs herself — that is part of why she's here.",
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
      className="py-24 lg:py-36 bg-secondary scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 lg:mb-20">
          <div className="lg:col-span-9">
            <p className="eyebrow mb-5">Clinical Leadership</p>
            <h2
              className="font-serif text-foreground hang-punct"
              style={{
                fontSize: "clamp(2rem, 1.4rem + 2.8vw, 3.75rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.024em",
                fontWeight: 650,
              }}
            >
              Two clinicians.
              <span className="block editorial-italic text-foreground/70" style={{ fontWeight: 400 }}>
                Both, on the estate.
              </span>
            </h2>
            <p className="text-foreground/80 leading-relaxed max-w-2xl mt-7" style={{ fontSize: "var(--text-body)" }}>
              You meet them on day one. They write your program by hand. They are the people you'll have coffee with on Tuesday mornings — not a quarterly visiting consultant.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-10 lg:gap-px md:bg-transparent lg:bg-border">
          {LEADERS.map((l, i) => (
            <LeaderCard
              key={l.role}
              leader={l}
              delay={i * 150}
              onVerify={() => setOpenModal(l)}
            />
          ))}
        </div>

        <div className="mt-12 max-w-3xl">
          <p className="text-sm text-muted-foreground italic leading-relaxed">
            Identities disclosed under mutual NDA. Credentials available to licensed referring clinicians on request via our{" "}
            <Link
              to="/professionals"
              className="not-italic text-foreground underline decoration-amber underline-offset-4 decoration-2 hover:text-amber transition-colors"
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
              className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.04]"
            />
          </div>
        </div>

        <div className="flex-1">
          <p className="small-caps text-amber mb-3 text-[11px] tracking-[0.28em] font-semibold">
            {leader.role}
          </p>
          <h3
            className="font-serif text-foreground mb-3 hang-punct"
            style={{
              fontSize: "clamp(1.625rem, 1.4rem + 1vw, 2.25rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              fontWeight: 650,
            }}
          >
            {leader.name}
          </h3>
          <p className="small-caps text-foreground/70 text-[11px] tracking-[0.18em] mb-5 tabular leading-relaxed">
            {leader.credentials}
          </p>
          <p className="text-[14px] text-foreground/80 leading-relaxed mb-6">
            {leader.story}
          </p>
          <blockquote className="mb-6 pl-4 border-l-2 border-amber/60">
            <p
              className="font-serif editorial-italic text-foreground/85 leading-[1.45]"
              style={{ fontSize: "var(--text-lead)", fontWeight: 400 }}
            >
              &ldquo;{leader.quote}&rdquo;
            </p>
          </blockquote>

          <button
            onClick={onVerify}
            className="inline-flex items-center gap-2 group py-2 -ml-1 px-1 small-caps text-foreground/70 hover:text-amber transition-colors text-[11px] tracking-[0.24em] font-semibold"
            aria-label={`See what credentials are verified for the ${leader.role}`}
          >
            Credentials on file
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function CredentialsModal({ leader, onClose }: { leader: Leader; onClose: () => void }) {
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
        className="absolute inset-0 bg-navy/80 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close"
      />
      <div className="relative bg-background border border-border max-w-lg w-full p-8 lg:p-10 shadow-luxe">
        <p className="small-caps text-amber text-[11px] tracking-[0.28em] mb-3 font-semibold">
          {leader.role} · Verified
        </p>
        <h3
          id="credentials-title"
          className="font-serif text-foreground mb-5"
          style={{ fontSize: "var(--text-h4)", lineHeight: 1.15, fontWeight: 650 }}
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
            className="flex-1 text-center bg-amber text-amber-foreground px-5 py-3 small-caps text-[11px] tracking-[0.24em] font-semibold hover:bg-ember hover:text-ember-foreground transition-colors duration-300"
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

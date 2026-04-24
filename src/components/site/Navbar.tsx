import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

const sections = [
  { id: "gallery", label: "Estate" },
  { id: "synergy", label: "Week" },
  { id: "day-here", label: "A Day Here" },
  { id: "amenities", label: "Amenities" },
  { id: "leadership", label: "Leadership" },
  { id: "process", label: "Process" },
];

// v3.5/3.6 — "Tonight in the great room" — quieter, smaller, dimmer pulse.
const TONIGHT_LINES = [
  "Tonight in the great room: chamber music · 8pm",
  "This evening on the porch: a fire, a cellist, a long conversation",
  "Tonight: a poet from Asheville, in the library at dusk",
  "Tonight in the kitchen: the chef's six-course tasting · 7:30",
];
function tonightLine(): string {
  const d = new Date();
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = (t.getUTCDay() + 6) % 7;
  t.setUTCDate(t.getUTCDate() - dayNum + 3);
  const firstThursday = new Date(Date.UTC(t.getUTCFullYear(), 0, 4));
  const week = 1 + Math.round(((t.getTime() - firstThursday.getTime()) / 86400000 - 3 + ((firstThursday.getUTCDay() + 6) % 7)) / 7);
  return TONIGHT_LINES[week % TONIGHT_LINES.length];
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

/**
 * v3.6 — The Sanctuary wordmark.
 * A hand-drawn amber arc (single stroke, ridge curve) sits to the left of
 * the wordmark. Eyebrow "Blue Ridge" tracks above the name. Renders compact
 * in scrolled state. Always sits on dark navy-glass scrim — readable on any
 * underlying section.
 */
function SanctuaryMark({ compact = false }: { compact?: boolean }) {
  const arcSize = compact ? 28 : 34;
  return (
    <span className="flex items-center gap-3 group">
      <svg
        width={arcSize}
        height={arcSize}
        viewBox="0 0 34 32"
        aria-hidden
        className="shrink-0"
      >
        {/* v3.7 — Double Blue Ridge silhouette + first-light sunrise dot.
            Back ridge sits softer (haze); front ridge crisp; tiny amber sun
            partially eclipsed by the front ridge — first light over the mountain. */}
        {/* sunrise dot, behind everything */}
        <circle cx="17" cy="14" r="2.4" fill="var(--amber)" opacity="0.95" />
        {/* back ridge — softer, hazier */}
        <path
          d="M 1 24 Q 10 10, 17 16 T 33 22"
          fill="none"
          stroke="var(--amber)"
          strokeOpacity="0.42"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* front ridge — crisp */}
        <path
          d="M 2 26 Q 11 12, 17 18 T 32 24"
          fill="none"
          stroke="var(--amber)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* horizon */}
        <path
          d="M 6 29 L 28 29"
          fill="none"
          stroke="var(--amber)"
          strokeOpacity="0.35"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className="text-[8px] tracking-[0.36em] uppercase font-semibold text-amber/85"
          style={{ marginBottom: 2 }}
        >
          Blue Ridge
        </span>
        <span
          className="font-serif text-ivory"
          style={{
            fontSize: compact ? "1.05rem" : "1.2rem",
            fontWeight: 600,
            letterSpacing: "0.01em",
            fontFeatureSettings: '"cv01" 1, "ss01" 1, "kern" 1',
          }}
        >
          The Sanctuary
        </span>
      </span>
    </span>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const tonight = useMemo(() => tonightLine(), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        // v3.6 — persistent navy-glass scrim. Always readable, regardless of
        // underlying section. No bg-flip flicker.
        background: "color-mix(in oklab, oklch(0.18 0.045 265) 78%, transparent)",
        backdropFilter: "blur(14px) saturate(140%)",
        WebkitBackdropFilter: "blur(14px) saturate(140%)",
        borderBottom: scrolled
          ? "1px solid color-mix(in oklab, var(--amber) 18%, transparent)"
          : "1px solid transparent",
        transition: "border-color 320ms cubic-bezier(0.32, 0, 0.18, 1)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 flex items-center justify-between h-20">
        <Link to="/" aria-label="The Sanctuary — Blue Ridge, North Carolina">
          <SanctuaryMark compact={scrolled} />
        </Link>

        <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToId(s.id)}
              className="nav-link text-[12px] tracking-[0.18em] uppercase font-semibold text-ivory hover:text-amber transition-colors"
            >
              {s.label}
            </button>
          ))}
          <Link
            to="/professionals"
            className="nav-link text-[11px] tracking-[0.22em] uppercase font-semibold text-ivory/85 hover:text-amber transition-colors"
          >
            For Professionals
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          <a
            href="tel:+18005550199"
            className="text-[11px] tracking-[0.22em] uppercase font-semibold text-ivory/80 hover:text-amber transition-colors tabular"
          >
            24/7 · +1 (800) 555-0199
          </a>
          <button
            onClick={() => scrollToId("concierge-form")}
            className="bg-amber text-amber-foreground px-6 py-3 text-[11px] tracking-[0.22em] uppercase font-semibold hover:bg-ember hover:text-ember-foreground transition-colors duration-300"
          >
            Private Consultation
          </button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden -mr-2 p-2 text-ivory hover:text-amber transition-colors"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span className="relative block w-6 h-[14px]">
            <span
              className={`absolute left-0 right-0 h-px bg-current transition-all duration-300 ${
                open ? "top-[6px] rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 right-0 h-px bg-current transition-all duration-300 ${
                open ? "top-[6px] opacity-0" : "top-[6px] opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 right-0 h-px bg-current transition-all duration-300 ${
                open ? "top-[6px] -rotate-45" : "top-[12px]"
              }`}
            />
          </span>
        </button>
      </div>

      {/* v3.6 — "Tonight" line moved BELOW the bar, smaller, dimmer pulse */}
      <div
        className={`hidden lg:block transition-[max-height,opacity] duration-500 overflow-hidden ${
          scrolled ? "max-h-8 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10 h-7 flex items-center justify-end gap-3">
          <span aria-hidden className="block w-1 h-1 rounded-full bg-ember tonight-pulse" />
          <span className="text-ivory/55 text-[11px] italic font-serif tracking-normal">{tonight}</span>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-navy/95 backdrop-blur-md">
          <div
            className="px-6 py-7 flex flex-col"
            style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.75rem)" }}
          >
            <p className="small-caps text-amber text-[11px] tracking-[0.24em] mb-4">
              Discover
            </p>
            <div className="flex flex-col">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setOpen(false);
                    setTimeout(() => scrollToId(s.id), 50);
                  }}
                  className="text-left font-serif text-lg text-ivory py-4 min-h-[48px] hover:text-amber transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  {s.label}
                </button>
              ))}
              <Link
                to="/professionals"
                onClick={() => setOpen(false)}
                className="text-left font-serif text-lg text-ivory py-4 min-h-[48px] hover:text-amber transition-colors"
                style={{ fontWeight: 600 }}
              >
                For Healthcare Professionals
              </Link>
            </div>
            <button
              onClick={() => {
                setOpen(false);
                setTimeout(() => scrollToId("concierge-form"), 50);
              }}
              className="bg-amber text-amber-foreground px-6 py-4 min-h-[52px] small-caps text-[11px] tracking-[0.28em] mt-8 font-semibold"
            >
              Request the Clinical Dossier
            </button>
            <a
              href="tel:+18005550199"
              className="mt-4 text-center small-caps text-ivory/75 hover:text-amber text-[11px] tracking-[0.28em] tabular py-3 min-h-[44px] pt-5"
            >
              Speak With Intake · 24/7 · +1 (800) 555-0199
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

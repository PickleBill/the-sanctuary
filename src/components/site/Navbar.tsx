import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

/**
 * v3.9 reset — calmer Navbar.
 *
 * - Logo: balanced, simple — gold ridge with sun in real negative space,
 *   wordmark "The Sanctuary" alone. Clicking it always returns to the
 *   top of the home page (smooth scroll if already on /).
 * - Removed the "Tonight in the great room" rotating line — it was the
 *   source of an SSR/CSR hydration mismatch and added noise.
 * - In-page nav buttons keep their semantic targets (#gallery, #synergy,
 *   etc.). Estate now actually exists on the page (Gallery is rendered).
 * - The "Private Consultation" CTA scrolls to the form's anchor, which
 *   now lands on the form itself rather than the compliance rail.
 */

const sections = [
  { id: "gallery", label: "Estate" },
  { id: "synergy", label: "Week" },
  { id: "amenities", label: "Amenities" },
  { id: "leadership", label: "Leadership" },
  { id: "process", label: "Process" },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

function scrollToTop() {
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}

/**
 * The Sanctuary mark — final.
 *
 * Two simple mountain peaks (a far peak behind, a near peak in front) with
 * a single sun centered above. Drawn as straight strokes so the mark reads
 * crisply at favicon/navbar sizes. Sun + ridge are vertically and
 * horizontally balanced inside a 40×32 viewBox. No haze, no extra ornament.
 */
function SanctuaryMark({ compact = false }: { compact?: boolean }) {
  const size = compact ? 30 : 36;
  return (
    <span className="flex items-center gap-2 sm:gap-3">
      <svg
        width={size}
        height={(size * 32) / 40}
        viewBox="0 0 40 32"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        {/* Sun — centered, sitting above the saddle of the ridge */}
        <circle cx="20" cy="9" r="2.6" fill="var(--amber)" />

        {/* Far peak — softer, sits behind */}
        <path
          d="M 4 26 L 14 14 L 22 22"
          stroke="var(--amber)"
          strokeOpacity="0.55"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Near peak — crisp, sits in front */}
        <path
          d="M 12 26 L 24 12 L 36 26"
          stroke="var(--amber)"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="font-serif text-ivory leading-none whitespace-nowrap"
        style={{
          fontSize: compact ? "1.1rem" : "1.28rem",
          fontWeight: 600,
          letterSpacing: "0.005em",
          fontFeatureSettings: '"cv01" 1, "ss01" 1, "kern" 1',
        }}
      >
        The Sanctuary
      </span>
    </span>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window === "undefined") return;
    // Always scroll to the very top when the logo is clicked, regardless
    // of which route the visitor is on. If we're already on "/", we
    // intercept the link entirely so the smooth scroll runs instead of
    // a same-route navigation that does nothing visible.
    if (window.location.pathname === "/") {
      e.preventDefault();
    }
    scrollToTop();
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
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
        <Link
          to="/"
          aria-label="The Sanctuary — return to top"
          onClick={onLogoClick}
          className="hover:opacity-90 transition-opacity"
        >
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
              Begin a Private Consultation
            </button>
            <a
              href="tel:+18005550199"
              className="mt-4 text-center small-caps text-ivory/75 hover:text-amber text-[11px] tracking-[0.28em] tabular py-3 min-h-[44px] pt-5"
            >
              24/7 Intake · +1 (800) 555-0199
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

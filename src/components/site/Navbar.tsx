import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const sections = [
  { id: "gallery", label: "The Estate" },
  { id: "synergy", label: "Approach" },
  { id: "day-here", label: "A Day Here" },
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

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      {/* Quiet 24/7 line above the bar on desktop when scrolled */}
      <div
        className={`hidden lg:block border-b border-border/60 transition-[max-height,opacity] duration-500 overflow-hidden ${
          scrolled ? "max-h-10 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10 h-9 flex items-center justify-end gap-6">
          <span className="text-[10px] tracking-[0.32em] uppercase text-muted-foreground">
            Discreet · Encrypted · 24/7
          </span>
          <a
            href="tel:+18005550199"
            className="text-[11px] tracking-[0.24em] uppercase font-medium text-foreground hover:text-amber transition-colors flex items-center gap-2 tabular"
          >
            <span className="luxe-rule" aria-hidden /> +1 (800) 555-0199
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="luxe-rule" aria-hidden />
          <span className="font-serif text-lg tracking-wide text-foreground">
            Sanctuary <span className="text-amber">Southeast</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToId(s.id)}
              className="text-sm tracking-wide text-foreground/80 hover:text-amber transition-colors"
            >
              {s.label}
            </button>
          ))}
          <span className="h-4 w-px bg-border" aria-hidden />
          <Link
            to="/professionals"
            className="text-xs tracking-[0.2em] uppercase font-medium text-foreground/70 hover:text-amber transition-colors"
          >
            Healthcare Professionals
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          {!scrolled && (
            <a
              href="tel:+18005550199"
              className="text-[11px] tracking-[0.24em] uppercase font-medium text-foreground/80 hover:text-amber transition-colors"
            >
              24/7 · +1 (800) 555-0199
            </a>
          )}
          <button
            onClick={() => scrollToId("concierge-form")}
            className="bg-primary text-primary-foreground px-6 py-3 text-xs tracking-[0.22em] uppercase font-semibold hover:bg-amber transition-colors"
          >
            Private Consultation
          </button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden -mr-2 p-2 text-foreground hover:text-amber transition-colors"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {/* Editorial hamburger: two equal hairlines + an amber rule.
              Replaces the previous broken-looking 3-line / asymmetric mark. */}
          <span className="relative block w-6 h-[14px]">
            <span
              className={`absolute left-0 right-0 h-px bg-current transition-all duration-300 ${
                open ? "top-[6px] rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 right-0 h-px bg-amber transition-all duration-300 ${
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
        <div className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border">
          <div
            className="px-6 py-7 flex flex-col"
            style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.75rem)" }}
          >
            <p className="small-caps text-amber text-[11px] tracking-[0.24em] mb-4">
              Discover
            </p>
            <div className="flex flex-col divide-y divide-border/60">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setOpen(false);
                    setTimeout(() => scrollToId(s.id), 50);
                  }}
                  className="text-left font-serif text-lg text-foreground/90 py-4 min-h-[48px] hover:text-amber transition-colors"
                >
                  {s.label}
                </button>
              ))}
              <Link
                to="/professionals"
                onClick={() => setOpen(false)}
                className="text-left font-serif text-lg text-foreground/90 py-4 min-h-[48px] hover:text-amber transition-colors"
              >
                For Healthcare Professionals
              </Link>
            </div>
            <button
              onClick={() => {
                setOpen(false);
                setTimeout(() => scrollToId("concierge-form"), 50);
              }}
              className="bg-amber text-amber-foreground px-6 py-4 min-h-[52px] small-caps text-[11px] tracking-[0.28em] mt-8"
            >
              Request the Clinical Dossier
            </button>
            <a
              href="tel:+18005550199"
              className="mt-4 text-center small-caps text-foreground/70 hover:text-amber text-[11px] tracking-[0.28em] tabular py-3 min-h-[44px] border-t border-border/60 pt-5"
            >
              Speak With Intake · 24/7 · +1 (800) 555-0199
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const sections = [
  { id: "gallery", label: "The Estate" },
  { id: "synergy", label: "Approach" },
  { id: "amenities", label: "Amenities" },
  { id: "leadership", label: "Leadership" },
  { id: "process", label: "Process" },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
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
            className="text-[11px] tracking-[0.24em] uppercase font-medium text-foreground hover:text-amber transition-colors flex items-center gap-2"
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
          <button
            onClick={() => scrollToId("leadership")}
            className="text-xs tracking-[0.2em] uppercase font-medium text-foreground/70 hover:text-amber transition-colors"
          >
            Healthcare Professionals
          </button>
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
          className="lg:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-px bg-current mb-1.5" />
          <span className="block w-6 h-px bg-current mb-1.5" />
          <span className="block w-4 h-px bg-current ml-auto" />
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background border-t border-border">
          <div className="px-6 py-6 flex flex-col gap-4">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setOpen(false);
                  setTimeout(() => scrollToId(s.id), 50);
                }}
                className="text-left text-sm tracking-wide text-foreground/80"
              >
                {s.label}
              </button>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                setTimeout(() => scrollToId("leadership"), 50);
              }}
              className="text-left text-xs tracking-[0.2em] uppercase font-medium text-foreground/70"
            >
              Healthcare Professionals
            </button>
            <a
              href="tel:+18005550199"
              className="text-left text-xs tracking-[0.2em] uppercase font-medium text-amber"
            >
              24/7 Intake — +1 (800) 555-0199
            </a>
            <button
              onClick={() => {
                setOpen(false);
                setTimeout(() => scrollToId("concierge-form"), 50);
              }}
              className="bg-primary text-primary-foreground px-6 py-3 text-xs tracking-[0.22em] uppercase font-semibold mt-2"
            >
              Private Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

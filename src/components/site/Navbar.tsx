import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const sections = [
  { id: "gallery", label: "The Estate" },
  { id: "synergy", label: "Approach" },
  { id: "amenities", label: "Amenities" },
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
      <div className="mx-auto max-w-7xl px-6 lg:px-10 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="luxe-rule" aria-hidden />
          <span className="font-serif text-lg tracking-wide text-foreground">
            Sanctuary <span className="text-amber">Southeast</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToId(s.id)}
              className="text-sm tracking-wide text-foreground/80 hover:text-amber transition-colors"
            >
              {s.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => scrollToId("concierge-form")}
          className="hidden lg:inline-flex bg-primary text-primary-foreground px-6 py-3 text-xs tracking-[0.22em] uppercase font-semibold hover:bg-amber transition-colors"
        >
          Private Consultation
        </button>

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

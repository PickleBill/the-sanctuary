import { useEffect, useState } from "react";

/**
 * v3.5 — SectionRail (mobile-only "you are here" filament)
 *
 * 8 dots on a vertical hairline pinned to the right edge. Each dot lights
 * amber when its section enters view. Tappable — scrolls to that section.
 * Hidden on desktop (the navbar handles wayfinding there).
 *
 * Sections are passed as ids; we observe each. Reduced-motion: no transition.
 */
const SECTIONS = [
  { id: "resonance", label: "Reflect" },
  { id: "cohort", label: "Cohort" },
  { id: "journey-strip", label: "A Day" },
  { id: "journey", label: "Moments" },
  { id: "synergy", label: "Approach" },
  { id: "amenities", label: "Amenities" },
  { id: "leadership", label: "Leadership" },
  { id: "concierge-form", label: "Begin" },
];

export function SectionRail() {
  const [active, setActive] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show after user scrolls past the hero a little
    const onScroll = () => setVisible(window.scrollY > 240);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        // Pick the entry most centered in the viewport
        let best: IntersectionObserverEntry | null = null;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
        }
        if (best) setActive((best.target as HTMLElement).id);
      },
      { threshold: [0.2, 0.4, 0.6], rootMargin: "-30% 0px -30% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Section progress"
      className={`section-rail lg:hidden fixed right-3 top-1/2 -translate-y-1/2 z-40 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <ul className="flex flex-col items-center gap-3 py-3">
        {SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <button
                onClick={() => scrollTo(s.id)}
                aria-label={`Jump to ${s.label}`}
                aria-current={isActive ? "true" : undefined}
                className="group relative flex items-center justify-end h-6 w-6"
              >
                <span
                  aria-hidden
                  className={`block h-px transition-all duration-500 ${
                    isActive ? "w-5 bg-amber" : "w-2.5 bg-ivory/35"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

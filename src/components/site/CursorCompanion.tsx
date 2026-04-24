import { useEffect, useRef, useState } from "react";

/**
 * v3.3 — Cursor companion (desktop only)
 * 8px amber dot tracks the cursor with a 120ms spring lag.
 * Grows to 28px ghost-fill over interactive elements.
 * Hidden on touch / reduced-motion.
 */
export function CursorCompanion() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;
    if (reduce || !fine) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      const el = e.target as HTMLElement | null;
      const inter = !!el?.closest("a, button, [role='button'], input, select, textarea, label, .journey-tile");
      setHovering(inter);
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.18;
      current.current.y += (target.current.y - current.current.y) * 0.18;
      const d = dotRef.current;
      if (d) {
        d.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="cursor-companion fixed top-0 left-0 z-[60] pointer-events-none"
      style={{
        width: hovering ? 28 : 8,
        height: hovering ? 28 : 8,
        background: hovering ? "transparent" : "var(--amber)",
        border: hovering ? "1px solid var(--amber)" : "none",
        borderRadius: "9999px",
        transition: "width 320ms cubic-bezier(0.22,1,0.36,1), height 320ms cubic-bezier(0.22,1,0.36,1), background 320ms ease, border 320ms ease",
        mixBlendMode: "difference",
        opacity: 0.85,
      }}
    />
  );
}

import { useEffect, useRef, useState } from "react";

/**
 * v3.5 — AI Presence Chip
 *
 * Sits unobtrusively below an AI-composed reading. Tap to reveal a quiet
 * three-line explainer about how the AI was used. Trust earned through
 * transparency, not hidden tech.
 *
 * Variants:
 *  - "ivory" → for use over dark/navy backgrounds (Cohort, Hero context)
 *  - "navy"  → for use over light/ivory backgrounds (Resonance, Concierge)
 */
export function AIPresenceChip({
  variant = "navy",
  className = "",
}: {
  variant?: "navy" | "ivory";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isIvory = variant === "ivory";
  const baseTone = isIvory
    ? "text-ivory/55 hover:text-amber border-ivory/15 hover:border-amber/60"
    : "text-muted-foreground hover:text-amber border-border hover:border-amber/60";
  const popTone = isIvory
    ? "bg-navy text-ivory/85 border-ivory/15"
    : "bg-card text-foreground/85 border-border";

  return (
    <div ref={wrapRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={`group inline-flex items-center gap-2 small-caps text-[10px] tracking-[0.28em] px-3 py-1.5 border transition-colors duration-300 ${baseTone}`}
      >
        <span aria-hidden className="block w-1 h-1 rounded-full bg-amber/85 ai-chip-dot" />
        Composed with AI assist · explain
      </button>

      {open && (
        <div
          role="dialog"
          className={`ai-chip-pop absolute left-0 top-full mt-2 z-30 w-[min(86vw,320px)] border ${popTone} p-4 shadow-luxe`}
        >
          <p className="small-caps text-amber text-[10px] tracking-[0.28em] mb-2">
            How AI is used here
          </p>
          <ul className="text-[12px] leading-relaxed space-y-1.5">
            <li>· Written for you, by us — clinicians shape the words.</li>
            <li>· AI helps with tone and cadence, never with clinical claims.</li>
            <li>· Your text leaves nothing behind unless you proceed.</li>
          </ul>
        </div>
      )}

      <style>{`
        @keyframes aiChipDot {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.6); }
        }
        .ai-chip-dot { animation: aiChipDot 1.8s ease-in-out infinite; }
        @keyframes aiChipPop {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ai-chip-pop { animation: aiChipPop 220ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        @media (prefers-reduced-motion: reduce) {
          .ai-chip-dot, .ai-chip-pop { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

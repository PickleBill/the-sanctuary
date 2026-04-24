import { useEffect } from "react";
import { COHORT_ROLES } from "@/lib/cohort/roles";

/**
 * v3.7 — CohortRoomSheet
 *
 * Bottom-sheet modal listing all 40 archetypes in the room. Solves the
 * "I want to read them all" itch on mobile without cluttering the
 * constellation. The matched archetype (if any) is flagged with a bloom
 * dot — the AI-moment color, used here to thread the AI signal through.
 */

export function CohortRoomSheet({
  open,
  onClose,
  matchedId,
  activeId,
  onPick,
}: {
  open: boolean;
  onClose: () => void;
  matchedId: number | null;
  activeId: number | null;
  onPick: (id: number) => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center sm:items-center animate-[fadeIn_220ms_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cohort-room-title"
    >
      <button
        className="absolute inset-0 bg-navy/85 backdrop-blur-md"
        onClick={onClose}
        aria-label="Close"
      />

      <div
        className="relative bg-navy text-ivory w-full sm:max-w-lg max-h-[85vh] sm:max-h-[80vh] flex flex-col cohort-sheet-rise"
        style={{
          boxShadow: "0 -20px 80px -20px color-mix(in oklab, var(--amber) 22%, transparent)",
          borderTop: "1px solid color-mix(in oklab, var(--amber) 35%, transparent)",
        }}
      >
        {/* Drag handle */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center">
          <span className="block w-10 h-1 rounded-full bg-ivory/30" />
        </div>

        <div className="px-6 sm:px-8 pt-5 sm:pt-8 pb-4 flex items-start justify-between gap-4">
          <div>
            <p className="small-caps text-amber text-[10px] tracking-[0.32em] mb-2 font-semibold">
              The room · 40 archetypes
            </p>
            <h3
              id="cohort-room-title"
              className="font-serif text-ivory leading-tight"
              style={{ fontSize: "1.5rem", fontWeight: 650 }}
            >
              Who else is here.
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-10 h-10 -mt-1 -mr-2 flex items-center justify-center text-ivory/60 hover:text-amber transition-colors text-xl"
          >
            ✕
          </button>
        </div>

        <p className="px-6 sm:px-8 text-[13px] text-ivory/65 leading-relaxed mb-4">
          Each is a recent resident, anonymized. Tap any to see it on the
          constellation.
        </p>

        <ol className="flex-1 overflow-y-auto px-6 sm:px-8 pb-6 space-y-1">
          {COHORT_ROLES.map((role, i) => {
            const isMatched = matchedId === i;
            const isActive = activeId === i;
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => {
                    onPick(i);
                    onClose();
                  }}
                  className="w-full text-left flex items-center gap-3 py-3 px-2 -mx-2 hover:bg-ivory/5 transition-colors"
                  style={{
                    color: isActive ? "var(--amber)" : isMatched ? "var(--ivory)" : undefined,
                  }}
                >
                  <span
                    aria-hidden
                    className="block w-1.5 h-1.5 rounded-full shrink-0"
                    style={{
                      background: isMatched
                        ? "var(--bloom)"
                        : isActive
                        ? "var(--amber)"
                        : "color-mix(in oklab, var(--ivory) 30%, transparent)",
                      boxShadow: isMatched
                        ? "0 0 12px color-mix(in oklab, var(--bloom) 70%, transparent)"
                        : undefined,
                    }}
                  />
                  <span
                    className="font-serif editorial-italic text-ivory/90 leading-snug flex-1"
                    style={{ fontSize: "0.98rem", fontWeight: 400 }}
                  >
                    {role}
                  </span>
                  {isMatched && (
                    <span className="small-caps text-[9px] tracking-[0.28em] font-semibold" style={{ color: "var(--bloom)" }}>
                      ✦ Matched
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <style>{`
        @keyframes cohortSheetRise {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cohort-sheet-rise {
          animation: cohortSheetRise 360ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .cohort-sheet-rise { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

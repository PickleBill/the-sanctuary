import { useEffect } from "react";
import { COHORT_ROLES } from "@/lib/cohort/roles";
import { AIPresenceChip } from "@/components/site/AIPresenceChip";

/**
 * Phase 1 closeout — CohortRoomSheet
 *
 * Bottom sheet listing all 40 archetypes. When a visitor has been matched
 * by the AI to a peer, the matched archetype gets a bloom dot + "✦
 * Matched" tag, the rationale renders inline, and the "Continue privately"
 * handoff CTA appears inside the sheet. This consolidates what previously
 * lived as three competing surfaces on the Cohort section into ONE place.
 */

export function CohortRoomSheet({
  open,
  onClose,
  matchedId,
  activeId,
  matchRationale,
  onPick,
}: {
  open: boolean;
  onClose: () => void;
  matchedId: number | null;
  activeId: number | null;
  matchRationale?: string;
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

  const matchedRole = matchedId != null ? COHORT_ROLES[matchedId] : null;

  const continuePrivately = () => {
    if (matchedRole) {
      let seeded = "Principal";
      if (/Surgeon|Cardiologist|Anesthesiologist|Oncologist|Scientist|MD/i.test(matchedRole)) {
        seeded = "Medical Professional";
      } else if (/Trustee|Counsel|Partner|Advisor|GC|Chief of Staff|Manager|GP|Investor/i.test(matchedRole)) {
        seeded = "Trusted Advisor";
      }
      try { localStorage.setItem("ss_role_seed", seeded); } catch { /* ignore */ }
    }
    onClose();
    setTimeout(() => {
      const el = document.getElementById("concierge-form");
      const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }, 80);
  };

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

        {/* AI match panel — appears at the top when the AI has identified a peer */}
        {matchedRole && (
          <div
            className="mx-6 sm:mx-8 mb-5 p-5"
            style={{
              borderTop: "1px solid color-mix(in oklab, var(--bloom) 45%, transparent)",
              borderBottom: "1px solid color-mix(in oklab, var(--bloom) 22%, transparent)",
              background: "color-mix(in oklab, var(--bloom) 6%, transparent)",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span aria-hidden className="block w-1.5 h-1.5 rounded-full" style={{ background: "var(--bloom)" }} />
              <p className="small-caps text-[10px] tracking-[0.32em] font-semibold" style={{ color: "var(--bloom)" }}>
                ✦ A quiet resonance
              </p>
            </div>
            <p
              className="font-serif editorial-italic text-ivory leading-snug mb-3"
              style={{ fontSize: "1.1rem", fontWeight: 400 }}
            >
              {matchedRole}
            </p>
            {matchRationale && (
              <p className="text-[13px] text-ivory/75 leading-relaxed mb-5">
                "{matchRationale}"
              </p>
            )}
            <div className="flex items-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={continuePrivately}
                className="cta-flame group inline-flex items-center gap-2 bg-amber text-amber-foreground px-5 py-3 small-caps text-[10.5px] tracking-[0.28em] hover:-translate-y-0.5 transition-transform duration-300 font-semibold"
              >
                Continue privately
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
              <AIPresenceChip variant="ivory" />
            </div>
          </div>
        )}

        {!matchedRole && (
          <p className="px-6 sm:px-8 text-[13px] text-ivory/65 leading-relaxed mb-4">
            Each is a recent resident, anonymized. Tap any to see it on the constellation.
          </p>
        )}

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

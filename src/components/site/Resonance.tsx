import { useState, useTransition } from "react";
import { useServerFn } from "@tanstack/react-start";
import { generateResonance } from "@/server/resonance.functions";
import type { ResonanceReading } from "@/lib/resonance/prompt";

export function Resonance() {
  const generate = useServerFn(generateResonance);
  const [text, setText] = useState("");
  const [reading, setReading] = useState<ResonanceReading | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (text.trim().length < 8) {
      setError("Please share at least a sentence.");
      return;
    }
    startTransition(async () => {
      try {
        const result = await generate({ data: { text: text.trim() } });
        setReading(result);
        try {
          localStorage.setItem(
            "ss_intent",
            JSON.stringify({ signal: result.intent_signal, at: Date.now() }),
          );
          localStorage.setItem(
            "ss_resonance",
            JSON.stringify({ text: text.trim(), reading: result.reading }),
          );
        } catch {}
      } catch {
        setError("A quiet line — please try again, or call our 24/7 intake.");
      }
    });
  };

  return (
    <section
      id="resonance"
      className="py-24 sm:py-28 lg:py-40 bg-secondary scroll-mt-24"
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        {/* /shape: header in 8/12 columns; same family as every other section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 lg:mb-16">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-5">
              <span className="luxe-rule mr-3" /> A Quiet Question
            </p>
            <h2
              className="font-serif text-foreground mb-7 hang-punct"
              style={{
                fontSize: "clamp(2rem, 1.5rem + 3vw, 3.75rem)",
                lineHeight: 1.06,
                letterSpacing: "-0.02em",
                fontWeight: 500,
              }}
            >
              What would restoration mean,
              <span className="block editorial-italic text-foreground/70" style={{ fontWeight: 400 }}>
                in a single sentence?
              </span>
            </h2>
            <p
              className="text-muted-foreground leading-relaxed max-w-xl"
              style={{ fontSize: "var(--text-body)" }}
            >
              We will reflect your words back through the lens of our program — one clinical, one holistic — so you can see whether our cadence resonates with yours.
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="mb-10">
          <label className="block group">
            <span className="small-caps text-[11px] tracking-[0.24em] text-muted-foreground mb-3 block">
              In your own words
            </span>
            {/* Wrapper carries the focus border so it isn't clipped by parent padding.
                Use group-focus-within (the parent label has `group`) for the amber line. */}
            <div className="relative pb-1">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={600}
                rows={4}
                placeholder="What would a good week here look like?"
                className="w-full bg-background px-1 py-3 text-foreground text-base sm:text-lg placeholder:text-muted-foreground/60 focus:outline-none resize-none editorial-italic border-0"
              />
              <span
                aria-hidden
                className="absolute left-0 right-0 bottom-0 h-px bg-border"
              />
              <span
                aria-hidden
                className="absolute left-0 bottom-0 h-px bg-amber transition-[width] duration-500 origin-left group-focus-within:w-full"
                style={{ width: text.length > 0 ? "100%" : "0%" }}
              />
            </div>
          </label>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-xs text-muted-foreground tabular">
              {text.length}/600 — your words are not stored unless you proceed.
            </p>
            <button
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 min-h-[52px] text-[11px] tracking-[0.28em] uppercase font-semibold hover:bg-amber transition-colors duration-500 disabled:opacity-60"
            >
              {isPending ? (
                <span className="editorial-italic normal-case tracking-normal text-sm">Listening…</span>
              ) : (
                "Receive a Reading"
              )}
            </button>
          </div>

          {error && (
            <p className="mt-4 text-sm text-destructive editorial-italic">{error}</p>
          )}
        </form>

        {reading && (
          <article className="border-t border-amber/40 pt-10 lg:pt-12 animate-[fadeUp_900ms_cubic-bezier(0.22,1,0.36,1)]">
            <p className="small-caps text-amber text-[11px] tracking-[0.32em] mb-5">
              Your Resonance Reading
            </p>
            <p
              className="font-serif editorial-italic text-foreground/70 mb-6 max-w-2xl"
              style={{ fontSize: "var(--text-lead)" }}
            >
              "{reading.echo}"
            </p>
            <p
              className="font-serif text-foreground leading-relaxed mb-8 max-w-2xl"
              style={{ fontSize: "var(--text-h4)", lineHeight: 1.45, fontWeight: 400 }}
            >
              {reading.reading}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border max-w-2xl">
              <div className="bg-background p-6">
                <p className="small-caps text-amber/80 text-[10px] tracking-[0.32em] mb-2">
                  Clinical
                </p>
                <p className="font-serif text-foreground" style={{ fontSize: "var(--text-h4)", fontWeight: 500 }}>
                  {reading.clinical}
                </p>
              </div>
              <div className="bg-background p-6">
                <p className="small-caps text-amber/80 text-[10px] tracking-[0.32em] mb-2">
                  Holistic
                </p>
                <p className="font-serif text-foreground" style={{ fontSize: "var(--text-h4)", fontWeight: 500 }}>
                  {reading.holistic}
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById("concierge-form");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto bg-amber text-amber-foreground px-7 py-4 min-h-[52px] text-[11px] tracking-[0.28em] uppercase font-semibold hover:-translate-y-0.5 transition-transform duration-500"
              >
                Continue Privately
              </button>
              <a
                href="/clinical-dossier.pdf"
                download
                className="w-full sm:w-auto border border-border px-7 py-4 min-h-[52px] text-[11px] tracking-[0.28em] uppercase font-medium text-foreground hover:border-amber hover:text-amber transition-colors duration-500 text-center flex items-center justify-center"
              >
                Download the Clinical Dossier
              </a>
            </div>

            {reading.fallback && (
              <p className="mt-6 text-xs text-muted-foreground italic">
                Composed offline — our intake clinician will read your words personally if you continue.
              </p>
            )}
          </article>
        )}
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

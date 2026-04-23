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
        } catch {}
      } catch {
        setError("A quiet line — please try again, or call our 24/7 intake.");
      }
    });
  };

  return (
    <section
      id="resonance"
      className="py-28 lg:py-40 bg-secondary scroll-mt-24"
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <div className="text-center mb-12 lg:mb-14">
          <p className="eyebrow mb-5">
            <span className="luxe-rule mr-3" /> A Quiet Question
          </p>
          <h2
            className="font-serif text-foreground"
            style={{ fontSize: "var(--text-h2)", lineHeight: 1.08, fontWeight: 500 }}
          >
            What would restoration mean,
            <br />
            <span className="editorial-italic text-foreground/70">in a single sentence?</span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            We will reflect your words back through the lens of our program — one clinical, one holistic — so you can see whether our cadence resonates with yours.
          </p>
        </div>

        <form onSubmit={onSubmit} className="mb-10">
          <label className="block">
            <span className="small-caps text-[11px] tracking-[0.32em] text-muted-foreground mb-3 block">
              In your own words
            </span>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={600}
              rows={3}
              placeholder="What would the next chapter ask of you?"
              className="w-full bg-background border-b-2 border-border px-1 py-3 text-foreground text-lg placeholder:text-muted-foreground/60 focus:outline-none focus:border-amber transition-colors resize-none editorial-italic"
            />
          </label>

          <div className="mt-6 flex items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground tabular">
              {text.length}/600 — your words are not stored unless you proceed.
            </p>
            <button
              type="submit"
              disabled={isPending}
              className="bg-primary text-primary-foreground px-8 py-4 text-[11px] tracking-[0.28em] uppercase font-semibold hover:bg-amber transition-colors duration-500 disabled:opacity-60"
            >
              {isPending ? "Reading…" : "Receive a Reading"}
            </button>
          </div>

          {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
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

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById("concierge-form");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-amber text-amber-foreground px-7 py-4 text-[11px] tracking-[0.28em] uppercase font-semibold hover:-translate-y-0.5 transition-transform duration-500"
              >
                Continue Privately
              </button>
              <a
                href="/clinical-dossier.pdf"
                className="border border-border px-7 py-4 text-[11px] tracking-[0.28em] uppercase font-medium text-foreground hover:border-amber hover:text-amber transition-colors duration-500 text-center"
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

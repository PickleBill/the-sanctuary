import { useState } from "react";
import { composeReferralNote } from "@/server/referrer.functions";
import { AIPresenceChip } from "@/components/site/AIPresenceChip";

/**
 * v3.5 — Referral Note Composer (for /professionals)
 *
 * One sentence in. A clinician-voiced, HIPAA-clean intro paragraph out.
 * Zero PHI persisted. The tool that makes /professionals genuinely useful
 * instead of merely informational.
 */
export function ReferralNoteComposer() {
  const [context, setContext] = useState("");
  const [channel, setChannel] = useState("phone");
  const [windowText, setWindowText] = useState("the next two business days");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [fallback, setFallback] = useState(false);

  const onCompose = async () => {
    setError("");
    setNote("");
    setCopied(false);
    if (context.trim().length < 8) {
      setError("A sentence or two is enough — keep PHI out.");
      return;
    }
    setLoading(true);
    try {
      const res = await composeReferralNote({
        data: { context: context.trim(), callbackChannel: channel, callbackWindow: windowText },
      });
      setNote(res.note);
      setFallback(res.fallback);
    } catch (e) {
      console.error(e);
      setError("The composer is briefly offline. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(note);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-background border-t border-border">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <p className="small-caps text-amber text-[11px] tracking-[0.32em] mb-5">
          A Quiet Tool, For You
        </p>
        <h2
          className="font-serif text-foreground mb-7 hang-punct"
          style={{ fontSize: "var(--text-h2)", lineHeight: 1.06, fontWeight: 600, letterSpacing: "-0.02em" }}
        >
          Compose a private intro,
          <span className="block editorial-italic text-foreground/70" style={{ fontWeight: 400 }}>
            in a clinician's voice.
          </span>
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-2xl mb-10" style={{ fontSize: "var(--text-body)" }}>
          One sentence about your client — no names, no DOB, no diagnoses. We return a short, peer-to-peer paragraph you can paste into an email or text. <strong className="text-foreground/85">Your text is never stored.</strong>
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input column */}
          <div className="flex flex-col gap-5">
            <label className="block">
              <span className="small-caps text-foreground/60 text-[10px] tracking-[0.28em] mb-2 block">
                The texture, in a sentence
              </span>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                rows={5}
                maxLength={800}
                placeholder="e.g. A high-functioning principal in their 50s; complex picture not well held in standard outpatient settings; family willing but exhausted."
                className="w-full bg-card border border-border px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-amber transition-colors leading-relaxed font-serif"
              />
              <span className="block text-right text-[10px] text-muted-foreground mt-1 tabular">
                {context.length}/800 — no PHI
              </span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="small-caps text-foreground/60 text-[10px] tracking-[0.28em] mb-2 block">
                  Reach me by
                </span>
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                  className="w-full bg-card border border-border px-3 py-2.5 text-[14px] text-foreground focus:outline-none focus:border-amber transition-colors"
                >
                  <option value="phone">Phone</option>
                  <option value="encrypted email">Encrypted email</option>
                  <option value="Signal">Signal</option>
                </select>
              </label>
              <label className="block">
                <span className="small-caps text-foreground/60 text-[10px] tracking-[0.28em] mb-2 block">
                  When
                </span>
                <input
                  value={windowText}
                  onChange={(e) => setWindowText(e.target.value)}
                  maxLength={80}
                  className="w-full bg-card border border-border px-3 py-2.5 text-[14px] text-foreground focus:outline-none focus:border-amber transition-colors"
                />
              </label>
            </div>
            <button
              onClick={onCompose}
              disabled={loading}
              className="bg-amber text-amber-foreground px-6 py-4 min-h-[52px] small-caps text-[11px] tracking-[0.28em] hover:opacity-90 disabled:opacity-60 transition-opacity duration-300 font-semibold"
            >
              {loading ? "Composing…" : "Compose the note"}
            </button>
            {error && (
              <p className="text-[12px] text-destructive italic">{error}</p>
            )}
          </div>

          {/* Output column */}
          <div className="bg-secondary border border-border p-6 lg:p-7 flex flex-col min-h-[280px]">
            {!note && !loading && (
              <p className="text-muted-foreground italic text-sm m-auto text-center max-w-xs">
                Your composed paragraph will appear here. You can edit before sending.
              </p>
            )}
            {loading && (
              <p className="text-muted-foreground italic text-sm m-auto">A clinician is shaping the words…</p>
            )}
            {note && (
              <>
                <p className="font-serif text-foreground/90 leading-relaxed text-[15px] whitespace-pre-line flex-1">
                  {note}
                </p>
                <div className="mt-5 pt-4 border-t border-border flex items-center justify-between gap-4 flex-wrap">
                  <AIPresenceChip variant="navy" />
                  <button
                    onClick={onCopy}
                    className="small-caps text-[11px] tracking-[0.24em] text-amber hover:text-foreground transition-colors px-3 py-2 border border-amber/40 hover:border-foreground"
                  >
                    {copied ? "Copied ✓" : "Copy to clipboard"}
                  </button>
                </div>
                {fallback && (
                  <p className="mt-3 text-[11px] text-muted-foreground italic">
                    A standard template was returned (the composer briefly preferred caution).
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

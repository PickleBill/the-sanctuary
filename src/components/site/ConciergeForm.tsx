import { useState, useTransition } from "react";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { submitProspectus } from "@/server/resonance.functions";
import { TrustRail } from "@/components/site/TrustRail";

const schema = z.object({
  name: z.string().trim().min(1, "Please share your name.").max(100),
  contactMethod: z.enum(["Email", "Phone", "Signal"]),
  contactValue: z.string().trim().min(3, "How may we reach you?").max(120),
  role: z.enum(["Principal", "Executive Assistant", "Medical Professional", "Trusted Advisor"]),
  message: z.string().trim().max(1000).optional(),
});

export function ConciergeForm() {
  const submit = useServerFn(submitProspectus);
  const [submitted, setSubmitted] = useState(false);
  const [dossierUrl, setDossierUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      contactMethod: fd.get("contactMethod"),
      contactValue: fd.get("contactValue"),
      role: fd.get("role"),
      message: fd.get("message") || undefined,
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please review your details.");
      return;
    }

    // Pull resonance context if the visitor completed a reading earlier
    let resonanceText: string | undefined;
    let resonanceReading: string | undefined;
    let intentSignal: string | undefined;
    try {
      const raw = localStorage.getItem("ss_intent");
      if (raw) {
        const parsed = JSON.parse(raw) as { signal?: string };
        intentSignal = parsed?.signal;
      }
      const r = localStorage.getItem("ss_resonance");
      if (r) {
        const parsedR = JSON.parse(r) as { text?: string; reading?: string };
        resonanceText = parsedR?.text;
        resonanceReading = parsedR?.reading;
      }
    } catch {}

    startTransition(async () => {
      try {
        const result = await submit({
          data: {
            ...parsed.data,
            source: "homepage",
            resonanceText,
            resonanceReading,
            intentSignal,
          },
        });
        if (result.ok) {
          setSubmitted(true);
          setDossierUrl(result.dossierUrl);
        } else {
          setError(result.error);
        }
      } catch {
        setError("A quiet line — please call our 24/7 intake at +1 (800) 555-0199.");
      }
    });
  };

  return (
    <section
      id="concierge-form"
      className="bg-background scroll-mt-24"
    >
      <TrustRail />
      <div className="mx-auto max-w-5xl px-6 lg:px-10 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5">Concierge</p>
            <h2
              className="font-serif text-foreground mb-7 hang-punct"
              style={{
                fontSize: "clamp(1.875rem, 1.5rem + 2.4vw, 3rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                fontWeight: 500,
              }}
            >
              Begin a private
              <span className="block editorial-italic text-foreground/70" style={{ fontWeight: 400 }}>
                conversation.
              </span>
            </h2>
            <p
              className="text-muted-foreground leading-relaxed max-w-md"
              style={{ fontSize: "var(--text-body)" }}
            >
              A real clinician — not an intake form — picks up the next step. Tell us only what feels useful, in whatever language you would tell a friend. The compliance posture is in the rail above; this is the human part.
            </p>

            <div className="mt-10 space-y-3 text-[14px] text-muted-foreground">
              <p className="flex gap-3"><span className="text-amber" aria-hidden>◆</span> Reply within four hours, often sooner</p>
              <p className="flex gap-3"><span className="text-amber" aria-hidden>◆</span> Encrypted channels available on request</p>
              <p className="flex gap-3"><span className="text-amber" aria-hidden>◆</span> One conversation, one principal — no call centers</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            {submitted ? (
              <SuccessCard dossierUrl={dossierUrl} />
            ) : (
              <form onSubmit={onSubmit} className="space-y-6" noValidate>
                <Field label="Name">
                  <input
                    name="name"
                    type="text"
                    required
                    maxLength={100}
                    autoComplete="name"
                    className="w-full bg-transparent border-b border-border px-1 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-amber transition-colors"
                  />
                </Field>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="Preferred Contact Method">
                    <select
                      name="contactMethod"
                      defaultValue="Email"
                      className="w-full bg-transparent border-b border-border px-1 py-3 text-foreground focus:outline-none focus:border-amber transition-colors"
                    >
                      <option>Email</option>
                      <option>Phone</option>
                      <option>Signal</option>
                    </select>
                  </Field>

                  <Field label="Contact Detail">
                    <input
                      name="contactValue"
                      type="text"
                      required
                      maxLength={120}
                      placeholder="Email, phone, or Signal handle"
                      className="w-full bg-transparent border-b border-border px-1 py-3 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-amber transition-colors"
                    />
                  </Field>
                </div>

                <Field label="Role">
                  <select
                    name="role"
                    defaultValue="Principal"
                    className="w-full bg-transparent border-b border-border px-1 py-3 text-foreground focus:outline-none focus:border-amber transition-colors"
                  >
                    <option>Principal</option>
                    <option>Executive Assistant</option>
                    <option>Medical Professional</option>
                    <option>Trusted Advisor</option>
                  </select>
                </Field>

                <Field label="Message">
                  <textarea
                    name="message"
                    rows={4}
                    maxLength={1000}
                    placeholder="Any specific privacy or medical requirements?"
                    className="w-full bg-transparent border-b border-border px-1 py-3 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-amber transition-colors resize-none"
                  />
                </Field>

                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isPending}
                  className="bg-primary text-primary-foreground px-8 py-4 text-xs tracking-[0.24em] uppercase font-semibold hover:bg-amber transition-colors duration-500 mt-4 disabled:opacity-60"
                >
                  {isPending ? "Sending…" : "Submit Secure Request"}
                </button>

                {/* Consent microcopy — directly under submit, low visual weight,
                    high legal weight. /quieter pass: italic, muted, max-width capped. */}
                <p className="text-xs text-muted-foreground italic leading-relaxed max-w-md mt-5">
                  By submitting, you consent to a one-time outreach by our intake team within four hours. No record is created until you instruct us to proceed. We do not sell, share, or retain your information for marketing.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="small-caps block text-[11px] tracking-[0.32em] text-muted-foreground mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}

function SuccessCard({ dossierUrl }: { dossierUrl: string | null }) {
  const [copied, setCopied] = useState(false);
  const [bodyShown, setBodyShown] = useState(false);

  // Closing rhyme: 900ms filament-draw across the bottom edge, then content fades in.
  // Echoes the hero's signature filament burn-in.
  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setBodyShown(true);
      return;
    }
    const t = window.setTimeout(() => setBodyShown(true), 900);
    return () => window.clearTimeout(t);
  }, []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {}
  };
  return (
    <div className="relative border border-border bg-secondary p-8 sm:p-10 lg:p-12 overflow-hidden">
      {/* Filament-draw — closing rhyme to the hero. */}
      <span aria-hidden className="success-filament absolute left-0 right-0 bottom-0 h-px bg-amber origin-left" />

      <div className={`transition-opacity duration-700 ease-out ${bodyShown ? "opacity-100" : "opacity-0"}`}>
        <p className="small-caps text-amber text-[11px] tracking-[0.32em] mb-5">Received</p>
        <h3
          className="font-serif text-foreground mb-5 hang-punct"
          style={{ fontSize: "var(--text-h3)", lineHeight: 1.1, fontWeight: 500 }}
        >
          Thank you.
        </h3>
        <p className="text-foreground/85 leading-relaxed mb-4 max-w-md editorial-italic" style={{ fontSize: "var(--text-lead)" }}>
          A clinician will be on the line within four hours, often sooner.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
          The conversation begins privately, on your terms. Nothing is recorded until you instruct us to proceed.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          {dossierUrl && (
            <a
              href={dossierUrl}
              download
              className="w-full sm:w-auto border border-amber/60 px-6 py-4 min-h-[52px] small-caps text-[11px] tracking-[0.28em] text-foreground hover:bg-amber hover:text-amber-foreground transition-colors duration-500 text-center flex items-center justify-center"
            >
              Download the Clinical Dossier
            </a>
          )}
          <button
            type="button"
            onClick={onCopy}
            className="w-full sm:w-auto border border-border px-6 py-4 min-h-[52px] small-caps text-[11px] tracking-[0.28em] text-foreground hover:border-amber hover:text-amber transition-colors duration-500"
          >
            {copied ? "Link copied" : "Forward to your advisor"}
          </button>
        </div>
        <p className="mt-8 text-xs text-muted-foreground italic max-w-md leading-relaxed">
          For urgent matters, our 24/7 intake line is{" "}
          <a href="tel:+18005550199" className="text-foreground hover:text-amber transition-colors tabular">
            +1 (800) 555-0199
          </a>
          .
        </p>
      </div>
      <style>{`
        @keyframes successFilament { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .success-filament { animation: successFilament 900ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        @media (prefers-reduced-motion: reduce) {
          .success-filament { animation: none !important; transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}

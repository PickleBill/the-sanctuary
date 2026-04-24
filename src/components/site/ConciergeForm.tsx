import { useEffect, useRef, useState, useTransition } from "react";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { submitProspectus } from "@/server/resonance.functions";
import { composePrivateReply } from "@/server/concierge.functions";
import { TrustRail } from "@/components/site/TrustRail";
import { AIPresenceChip } from "@/components/site/AIPresenceChip";

/**
 * v3.3 — Conversational concierge stepper.
 *
 * Replaces the flat-stack form with a one-question-at-a-time prose stepper.
 * Each step is a sentence with the input embedded inline. 320ms slide-fade.
 * Amber filament progress bar at the bottom draws as you complete steps.
 * Mobile: full-card per step, big tap targets, autofocus on advance.
 *
 * AI streaming + composePrivateReply lands in v3.4.
 */

const schema = z.object({
  name: z.string().trim().min(1, "Please share your name.").max(100),
  contactMethod: z.enum(["Email", "Phone", "Signal"]),
  contactValue: z.string().trim().min(3, "How may we reach you?").max(120),
  role: z.enum(["Principal", "Executive Assistant", "Medical Professional", "Trusted Advisor"]),
  message: z.string().trim().max(1000).optional(),
});

type FormData = z.infer<typeof schema>;

const TOTAL_STEPS = 5;

export function ConciergeForm() {
  const submit = useServerFn(submitProspectus);
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [dossierUrl, setDossierUrl] = useState<string | null>(null);
  const [replyPayload, setReplyPayload] = useState<{
    firstName: string;
    role: string;
    contactMethod: string;
    message?: string;
    resonanceText?: string;
    resonanceReading?: string;
    intentSignal?: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  // v3.5 — accept a pre-seeded role from the Cohort match handoff
  const initialRole: FormData["role"] = (() => {
    if (typeof window === "undefined") return "Principal";
    try {
      const seed = localStorage.getItem("ss_role_seed");
      if (seed === "Principal" || seed === "Executive Assistant" || seed === "Medical Professional" || seed === "Trusted Advisor") {
        return seed;
      }
    } catch {}
    return "Principal";
  })();

  const [data, setData] = useState<FormData>({
    name: "",
    contactMethod: "Email",
    contactValue: "",
    role: initialRole,
    message: "",
  });

  const inputRef = useRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null>(null);

  // Focus the active step's primary input on advance
  useEffect(() => {
    if (submitted) return;
    const t = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 360);
    return () => window.clearTimeout(t);
  }, [step, submitted]);

  const advance = () => {
    setError(null);
    // Per-step validation
    if (step === 0 && !data.name.trim()) {
      setError("Please share your name.");
      return;
    }
    if (step === 2 && data.contactValue.trim().length < 3) {
      setError("How may we reach you?");
      return;
    }
    if (step < TOTAL_STEPS - 1) {
      setDirection(1);
      setStep(step + 1);
    } else {
      doSubmit();
    }
  };

  const back = () => {
    setError(null);
    if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const doSubmit = () => {
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please review your details.");
      return;
    }

    let resonanceText: string | undefined;
    let resonanceReading: string | undefined;
    let intentSignal: string | undefined;
    try {
      const raw = localStorage.getItem("ss_intent");
      if (raw) {
        const parsedI = JSON.parse(raw) as { signal?: string };
        intentSignal = parsedI?.signal;
      }
      const r = localStorage.getItem("ss_resonance");
      if (r) {
        const parsedR = JSON.parse(r) as { text?: string; reading?: string };
        resonanceText = parsedR?.text;
        resonanceReading = parsedR?.reading;
      }
    } catch {}

    const submittedFirstName = parsed.data.name.split(/\s+/)[0] || parsed.data.name;
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
          setSubmittedName(submittedFirstName);
          setReplyPayload({
            firstName: submittedFirstName,
            role: parsed.data.role,
            contactMethod: parsed.data.contactMethod,
            message: parsed.data.message,
            resonanceText,
            resonanceReading,
            intentSignal,
          });
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

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      advance();
    }
  };

  // Step renderers — each returns a "sentence with embedded inputs"
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <StepLine prefix="My name is" suffix=".">
            <InlineInput
              value={data.name}
              onChange={(v) => setData({ ...data, name: v })}
              placeholder="your name"
              autoComplete="name"
              size={Math.max(8, data.name.length || 14)}
              inputRef={(el) => (inputRef.current = el)}
            />
          </StepLine>
        );
      case 1:
        return (
          <StepLine prefix={`Reach me, ${firstName(data.name) || "please"}, by`} suffix=".">
            <InlineSelect
              value={data.contactMethod}
              onChange={(v) => setData({ ...data, contactMethod: v as FormData["contactMethod"] })}
              options={["Email", "Phone", "Signal"]}
              inputRef={(el) => (inputRef.current = el)}
            />
          </StepLine>
        );
      case 2:
        return (
          <StepLine prefix="My" mid={data.contactMethod.toLowerCase()} midConn="is">
            <InlineInput
              value={data.contactValue}
              onChange={(v) => setData({ ...data, contactValue: v })}
              placeholder={
                data.contactMethod === "Email"
                  ? "name@example.com"
                  : data.contactMethod === "Phone"
                    ? "+1 (___) ___-____"
                    : "@signal-handle"
              }
              size={Math.max(14, data.contactValue.length || 22)}
              inputRef={(el) => (inputRef.current = el)}
              type={
                data.contactMethod === "Email"
                  ? "email"
                  : data.contactMethod === "Phone"
                    ? "tel"
                    : "text"
              }
              autoComplete={
                data.contactMethod === "Email"
                  ? "email"
                  : data.contactMethod === "Phone"
                    ? "tel"
                    : "off"
              }
            />
            <span className="text-foreground/70">.</span>
          </StepLine>
        );
      case 3:
        return (
          <StepLine prefix="I am inquiring as a" suffix=".">
            <InlineSelect
              value={data.role}
              onChange={(v) => setData({ ...data, role: v as FormData["role"] })}
              options={["Principal", "Executive Assistant", "Medical Professional", "Trusted Advisor"]}
              inputRef={(el) => (inputRef.current = el)}
            />
          </StepLine>
        );
      case 4:
        return (
          <div className="space-y-4">
            <p
              className="font-serif text-foreground hang-punct"
              style={{
                fontSize: "clamp(1.5rem, 1.1rem + 1.6vw, 2.25rem)",
                lineHeight: 1.18,
                fontWeight: 500,
                letterSpacing: "-0.018em",
              }}
            >
              <span className="editorial-italic text-foreground/70">If anything matters most,</span>{" "}
              tell us here.
            </p>
            <textarea
              ref={(el) => {
                inputRef.current = el;
              }}
              value={data.message}
              onChange={(e) => setData({ ...data, message: e.target.value })}
              maxLength={1000}
              rows={5}
              placeholder="Privacy requirements, timing, what you're carrying — anything at all."
              className="w-full bg-transparent border-b-2 border-border px-1 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-amber transition-colors resize-none editorial-italic text-lg"
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  advance();
                }
              }}
            />
            <p className="text-xs text-muted-foreground italic">Optional. ⌘↵ to submit.</p>
          </div>
        );
    }
  };

  return (
    <section id="concierge-form" className="bg-background scroll-mt-24">
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
              A clinician — not an intake form — picks up the next step. Reply within four hours, often sooner. Encrypted channels on request.
            </p>
          </div>

          <div className="lg:col-span-7">
            {submitted ? (
              <SuccessCard dossierUrl={dossierUrl} firstName={submittedName} payload={replyPayload} />
            ) : (
              <div className="relative">
                {/* Step canvas */}
                <div className="min-h-[260px] sm:min-h-[200px] flex items-center" onKeyDown={onKeyDown}>
                  <div
                    key={step}
                    className={`w-full ${
                      direction === 1 ? "step-enter-right" : "step-enter-left"
                    }`}
                  >
                    {renderStep()}
                    {error && (
                      <p className="text-sm text-destructive mt-4">{error}</p>
                    )}
                  </div>
                </div>

                {/* Controls */}
                <div className="mt-6 sm:mt-8 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={back}
                    disabled={step === 0 || isPending}
                    className="small-caps text-[11px] tracking-[0.28em] text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <span aria-hidden>←</span> Back
                  </button>

                  <p className="small-caps text-muted-foreground/60 text-[10px] tracking-[0.32em] tabular hidden sm:block">
                    <span className="text-amber/80">{String(step + 1).padStart(2, "0")}</span>
                    <span className="text-muted-foreground/40"> / {String(TOTAL_STEPS).padStart(2, "0")}</span>
                  </p>

                  <button
                    type="button"
                    onClick={advance}
                    disabled={isPending}
                    className="group bg-primary text-primary-foreground px-7 py-4 min-h-[52px] small-caps text-[11px] tracking-[0.24em] hover:bg-amber transition-colors duration-500 disabled:opacity-60 flex items-center gap-3"
                  >
                    {isPending ? (
                      "Sending…"
                    ) : step === TOTAL_STEPS - 1 ? (
                      <>Send Privately <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span></>
                    ) : (
                      <>Continue <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span></>
                    )}
                  </button>
                </div>

                {/* Progress filament */}
                <div className="mt-8 relative h-px bg-border w-full overflow-hidden">
                  <span
                    className="block h-px bg-amber origin-left"
                    style={{
                      transform: `scaleX(${(step + 1) / TOTAL_STEPS})`,
                      transformOrigin: "left center",
                      transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  />
                </div>

                {/* Microcopy under the filament */}
                <p className="text-xs text-muted-foreground italic leading-relaxed max-w-md mt-6">
                  Five short questions. By submitting, you consent to a one-time outreach by our intake team within four hours. We do not sell, share, or retain your information for marketing.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes stepEnterRight {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes stepEnterLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .step-enter-right { animation: stepEnterRight 240ms cubic-bezier(0.32, 0, 0.18, 1) both; }
        .step-enter-left  { animation: stepEnterLeft  240ms cubic-bezier(0.32, 0, 0.18, 1) both; }
        @media (prefers-reduced-motion: reduce) {
          .step-enter-right, .step-enter-left { animation: none !important; }
        }
      `}</style>
      </section>
      {/* TrustRail — quiet trust footer beneath the form, not above it. */}
      <TrustRail />
    </>
  );
}

function firstName(full: string) {
  return full.trim().split(/\s+/)[0] || "";
}

function StepLine({
  prefix,
  mid,
  midConn,
  suffix,
  children,
}: {
  prefix: string;
  mid?: string;
  midConn?: string;
  suffix?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className="font-serif text-foreground hang-punct flex flex-wrap items-baseline gap-x-3 gap-y-3"
      style={{
        fontSize: "clamp(1.5rem, 1.1rem + 1.8vw, 2.25rem)",
        lineHeight: 1.3,
        fontWeight: 500,
        letterSpacing: "-0.018em",
      }}
    >
      <span className="editorial-italic text-foreground/75">{prefix}</span>
      {mid && <span className="text-foreground/95">{mid}</span>}
      {midConn && <span className="editorial-italic text-foreground/75">{midConn}</span>}
      {children}
      {suffix && <span className="text-foreground/70">{suffix}</span>}
    </p>
  );
}

function InlineInput({
  value,
  onChange,
  placeholder,
  size,
  type = "text",
  autoComplete,
  inputRef,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  size: number;
  type?: string;
  autoComplete?: string;
  inputRef: (el: HTMLInputElement | null) => void;
}) {
  return (
    <input
      ref={inputRef}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      size={size}
      className="bg-transparent border-b-2 border-amber/60 focus:border-amber outline-none px-1 pb-1 text-foreground placeholder:text-muted-foreground/50 transition-colors min-w-[140px]"
      style={{ fontSize: "inherit", fontWeight: "inherit", lineHeight: "inherit", maxWidth: "100%" }}
    />
  );
}

function InlineSelect({
  value,
  onChange,
  options,
  inputRef,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  inputRef: (el: HTMLSelectElement | null) => void;
}) {
  return (
    <span className="relative inline-block">
      <select
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent border-b-2 border-amber/60 focus:border-amber outline-none px-1 pb-1 pr-7 text-foreground cursor-pointer appearance-none transition-colors"
        style={{ fontSize: "inherit", fontWeight: "inherit", lineHeight: "inherit" }}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <span aria-hidden className="absolute right-1 top-1/2 -translate-y-1/2 text-amber pointer-events-none">▾</span>
    </span>
  );
}

type ReplyPayload = {
  firstName: string;
  role: string;
  contactMethod: string;
  message?: string;
  resonanceText?: string;
  resonanceReading?: string;
  intentSignal?: string;
};

function SuccessCard({
  dossierUrl,
  firstName,
  payload,
}: {
  dossierUrl: string | null;
  firstName: string;
  payload: ReplyPayload | null;
}) {
  const composeReply = useServerFn(composePrivateReply);
  const [copied, setCopied] = useState(false);
  const [bodyShown, setBodyShown] = useState(false);
  const [reply, setReply] = useState<string | null>(null);
  const [replyLoading, setReplyLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const fetchedRef = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setBodyShown(true);
      return;
    }
    const t = window.setTimeout(() => setBodyShown(true), 600);
    return () => window.clearTimeout(t);
  }, []);

  // v3.4 — Fetch the personalized AI acknowledgment once, then reveal word-by-word.
  useEffect(() => {
    if (!payload || fetchedRef.current) return;
    fetchedRef.current = true;
    let cancelled = false;
    (async () => {
      try {
        const result = await composeReply({ data: payload });
        if (cancelled) return;
        setReply(result.reply);
        setIsFallback(!!result.fallback);
      } catch {
        if (cancelled) return;
        setReply(
          `${payload.firstName}, your note arrived in the right hands. A clinician will be on the line within four hours, often sooner. Nothing is recorded until you instruct us to proceed.`,
        );
        setIsFallback(true);
      } finally {
        if (!cancelled) setReplyLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [payload, composeReply]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {}
  };

  const greeting = firstName ? `Hello, ${firstName}.` : "Thank you.";

  return (
    <div className="relative border border-border bg-secondary p-8 sm:p-10 lg:p-12 overflow-hidden">
      <span aria-hidden className="success-filament absolute left-0 right-0 bottom-0 h-px bg-amber origin-left" />

      <div className={`transition-opacity duration-700 ease-out ${bodyShown ? "opacity-100" : "opacity-0"}`}>
        <p className="small-caps text-amber text-[11px] tracking-[0.32em] mb-5">
          {replyLoading ? "Composing — a clinician is reading…" : "A private letter"}
        </p>
        <h3
          className="font-serif text-foreground mb-5 hang-punct"
          style={{ fontSize: "var(--text-h3)", lineHeight: 1.1, fontWeight: 500 }}
        >
          {greeting}
        </h3>

        {/* v3.4 — AI-composed acknowledgment. Streams word-by-word. */}
        <div className="mb-8 max-w-md min-h-[7rem]">
          {replyLoading ? (
            <p className="text-muted-foreground editorial-italic flex items-center gap-2">
              <span aria-hidden className="inline-block w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
              <span className="reply-loading">composing</span>
            </p>
          ) : reply ? (
            <StreamedReply text={reply} />
          ) : null}
          {isFallback && !replyLoading && (
            <p className="mt-4 text-xs text-muted-foreground italic">
              Composed offline — our clinician will read your words personally on the call.
            </p>
          )}
        </div>
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
        <div className="mt-6">
          <AIPresenceChip variant="navy" />
        </div>
        <p className="mt-6 text-xs text-muted-foreground italic max-w-md leading-relaxed">
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
        @keyframes replyWordIn {
          from { opacity: 0; transform: translateY(3px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .reply-word {
          display: inline-block;
          opacity: 0;
          animation: replyWordIn 240ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .reply-loading::after {
          content: "…";
          display: inline-block;
          animation: replyWordIn 800ms ease-in-out infinite alternate;
        }
        @media (prefers-reduced-motion: reduce) {
          .success-filament { animation: none !important; transform: scaleX(1); }
          .reply-word { animation: none !important; opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}

/**
 * v3.4 — Word-by-word reveal for the AI acknowledgment.
 * ~32ms cascade, capped at 90 words so a longer reply never drags.
 * Preserves paragraph breaks so the two-paragraph format reads correctly.
 */
function StreamedReply({ text }: { text: string }) {
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
  let cursor = 0;
  const cap = 90;
  return (
    <div className="space-y-4">
      {paragraphs.map((para, pIdx) => {
        const words = para.split(/(\s+)/);
        return (
          <p
            key={pIdx}
            className="font-serif text-foreground leading-relaxed"
            style={{ fontSize: "var(--text-body)", lineHeight: 1.55, fontWeight: 400 }}
          >
            {words.map((w, i) => {
              if (/^\s+$/.test(w)) return <span key={i}>{w}</span>;
              const delay = Math.min(cursor, cap) * 32;
              cursor += 1;
              return (
                <span key={i} className="reply-word" style={{ animationDelay: `${delay}ms` }}>
                  {w}
                </span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
}

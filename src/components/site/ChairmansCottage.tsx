import { useEffect, useRef, useState } from "react";

/**
 * The Chairman's Cottage — the productized answer to objection #1
 * ("I can't be away from work for 30 days.")
 *
 * Quiet, single-paragraph editorial section. No pricing, no list of features.
 * The discretion is the message.
 */
export function ChairmansCottage() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="chairmans-cottage"
      className="relative bg-navy text-ivory py-28 lg:py-40 overflow-hidden scroll-mt-24"
    >
      <div className="relative mx-auto max-w-3xl px-6 lg:px-10">
        <div
          className={`transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="eyebrow !text-amber mb-7">
            <span className="luxe-rule mr-3" /> The Chairman&rsquo;s Cottage
          </p>

          <h2
            className="font-serif text-ivory leading-[1.08]"
            style={{
              fontSize: "clamp(2rem, 1.5rem + 3vw, 3.5rem)",
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            For the principal who
            <span className="block editorial-italic text-ivory/75" style={{ fontWeight: 400 }}>
              cannot be away.
            </span>
          </h2>

          <div
            aria-hidden
            className={`mt-10 h-px bg-amber/70 transition-[width] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              visible ? "w-24" : "w-0"
            }`}
          />

          <p
            className="mt-10 text-ivory/85 leading-[1.65] max-w-2xl"
            style={{ fontSize: "var(--text-lead)" }}
          >
            A detached cottage on the estate. One guest. A secure private office with
            encrypted communications and conference-grade connectivity. The same
            board-certified clinical team. The same Swiss-standard protocols. None of the
            interruption.
          </p>

          <p className="mt-7 text-ivory/60 leading-relaxed max-w-2xl text-[15px] sm:text-base">
            For founders mid-raise, executives in the middle of a transaction, and
            principals whose absence would itself be the disclosure. The work continues.
            The recovery does not pause.
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-px bg-ivory/10 border-y border-ivory/10">
            {[
              { label: "Detached residence" },
              { label: "Secure private office" },
              { label: "Same clinical team" },
            ].map((item) => (
              <div key={item.label} className="bg-navy px-6 py-7">
                <p className="small-caps text-ivory/60 text-[11px] tracking-[0.28em]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-xs text-ivory/45 italic max-w-xl">
            Availability is limited. Pricing and terms are shared privately, after the
            clinical conversation.
          </p>
        </div>
      </div>
    </section>
  );
}

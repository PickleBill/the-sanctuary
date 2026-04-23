import { useEffect, useRef, useState } from "react";

/**
 * v1.6 — "You Are Not The First"
 *
 * The peer-belonging surface. Privacy stops being the headline because the
 * room is composed of peers, not strangers. No names, no faces, no
 * testimonials — pure category.
 */

const ROLES = [
  "Founder",
  "Surgeon",
  "Trustee",
  "Justice",
  "Operator",
  "Parent",
];

export function PeerCohort() {
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
      id="peer-cohort"
      className="relative bg-secondary py-24 sm:py-28 lg:py-36 scroll-mt-24"
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div
          className={`transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="eyebrow mb-5">
            <span className="luxe-rule mr-3" /> Among Peers
          </p>

          <h2
            className="font-serif text-foreground mb-9 hang-punct"
            style={{
              fontSize: "clamp(2rem, 1.5rem + 3vw, 3.75rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            You are not
            <span className="block editorial-italic text-foreground/70" style={{ fontWeight: 400 }}>
              the first.
            </span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p
                className="text-foreground/85 leading-relaxed mb-6"
                style={{ fontSize: "var(--text-lead)", lineHeight: 1.55 }}
              >
                In any given residence, the guest before you was likely a founder mid-raise, a managing partner, a surgeon, a public official, a head of household whose name you would recognize. They sat in this chair. They walked these trails. They left with people they still text.
              </p>
              <p
                className="text-muted-foreground leading-relaxed mb-10"
                style={{ fontSize: "var(--text-body)" }}
              >
                You will not be the first. You will not be the last. That is the quiet relief of being here — a room full of people who already know the weight you walked in with, and who are not impressed by it.
              </p>

              <div
                aria-hidden
                className={`h-px bg-amber/70 transition-[width] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] mb-8 ${
                  visible ? "w-24" : "w-0"
                }`}
              />

              <p
                className="font-serif editorial-italic text-foreground/80"
                style={{ fontSize: "var(--text-h4)", fontWeight: 400, lineHeight: 1.35 }}
              >
                Privacy is the floor. Belonging is the point.
              </p>
            </div>

            {/* Right column — sequential role descriptors. Mobile uses a single
                column so each role gets readable padding and sits as its own line. */}
            <div className="lg:col-span-5">
              <p className="small-caps text-muted-foreground/70 text-[11px] tracking-[0.28em] mb-7">
                Recent residents — by category only
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
                {ROLES.map((role, i) => (
                  <li
                    key={role}
                    className={`bg-background px-5 py-5 sm:py-6 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center gap-4 sm:block ${
                      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                    }`}
                    style={{ transitionDelay: `${300 + i * 140}ms` }}
                  >
                    <span className="block w-6 h-px bg-amber sm:mb-3 shrink-0" aria-hidden />
                    <span
                      className="font-serif text-foreground"
                      style={{ fontSize: "var(--text-h4)", fontWeight: 500, letterSpacing: "-0.012em" }}
                    >
                      {role}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-muted-foreground italic leading-relaxed">
                We never confirm whether a particular person has been a guest. We never deny it either. Some of them now refer their friends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Link } from "@tanstack/react-router";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-primary-foreground/10">
      {/* Invariants rail — speed-of-admission as a published commitment */}
      <div className="border-b border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-10 lg:py-12">
          <p className="small-caps text-amber text-[11px] tracking-[0.24em] mb-5">
            <span className="luxe-rule mr-3 align-middle" /> Our Invariants
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">
            <p className="font-serif text-primary-foreground/90 text-lg leading-snug">
              30-minute clinician callback
              <span className="block text-primary-foreground/55 text-[13px] mt-1.5 small-caps tracking-[0.18em]">
                day or night
              </span>
            </p>
            <p className="font-serif text-primary-foreground/90 text-lg leading-snug">
              24–72 hour admission window
              <span className="block text-primary-foreground/55 text-[13px] mt-1.5 small-caps tracking-[0.18em]">
                from first conversation
              </span>
            </p>
            <p className="font-serif text-primary-foreground/90 text-lg leading-snug">
              One conversation, one principal
              <span className="block text-primary-foreground/55 text-[13px] mt-1.5 small-caps tracking-[0.18em]">
                no call centers
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <p className="font-serif text-xl tracking-wide">
              Sanctuary <span className="text-amber">Southeast</span>
            </p>
            <p className="mt-4 text-sm text-primary-foreground/70 max-w-sm leading-relaxed">
              A private medical-wellness retreat in the Blue Ridge of Western North Carolina. One family in residence at a time.
            </p>

            <div className="mt-8 space-y-2">
              <p className="eyebrow text-amber mb-3">24/7 Intake</p>
              <a
                href="tel:+18005550199"
                className="block font-serif text-2xl text-primary-foreground hover:text-amber transition-colors tabular"
              >
                +1 (800) 555-0199
              </a>
              <a
                href="mailto:intake@sanctuarysoutheast.com"
                className="block text-sm text-primary-foreground/70 hover:text-amber transition-colors"
              >
                intake@sanctuarysoutheast.com
              </a>
              <p className="text-xs text-primary-foreground/50 pt-2 italic">
                Answered by a masters-level clinician. Encrypted on request.
              </p>
            </div>
          </div>

          <div>
            <p className="small-caps text-amber mb-5 text-[12px] tracking-[0.24em]">Discover</p>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => scrollToId("gallery")} className="hover:text-amber transition-colors">The Estate</button></li>
              <li><button onClick={() => scrollToId("synergy")} className="hover:text-amber transition-colors">Approach</button></li>
              <li><button onClick={() => scrollToId("chairmans-cottage")} className="hover:text-amber transition-colors">The Chairman&rsquo;s Cottage</button></li>
              <li><button onClick={() => scrollToId("amenities")} className="hover:text-amber transition-colors">Amenities</button></li>
              <li><button onClick={() => scrollToId("leadership")} className="hover:text-amber transition-colors">Clinical Leadership</button></li>
              <li><button onClick={() => scrollToId("process")} className="hover:text-amber transition-colors">Process</button></li>
            </ul>
          </div>

          <div>
            <p className="small-caps text-amber mb-5 text-[12px] tracking-[0.24em]">Professionals</p>
            <ul className="space-y-3 text-sm">
              <li><Link to="/professionals" className="hover:text-amber transition-colors">For Healthcare Professionals</Link></li>
              <li><button onClick={() => scrollToId("concierge-form")} className="hover:text-amber transition-colors">Referral Inquiries</button></li>
              <li><button onClick={() => scrollToId("concierge-form")} className="hover:text-amber transition-colors">Encrypted Document Exchange</button></li>
              <li><Link to="/privacy-policy" className="hover:text-amber transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-amber transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-primary-foreground/60 tracking-wide">
          <p>© {new Date().getFullYear()} Sanctuary Southeast. A Private Medical Wellness Corporation. All rights reserved.</p>
          <p className="italic">We do not pay referral fees.</p>
        </div>
      </div>
    </footer>
  );
}

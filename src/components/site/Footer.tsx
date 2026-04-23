import { Link } from "@tanstack/react-router";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-primary-foreground/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p className="font-serif text-xl tracking-wide">
              Sanctuary <span className="text-amber">Southeast</span>
            </p>
            <p className="mt-4 text-sm text-primary-foreground/70 max-w-xs leading-relaxed">
              A private medical wellness corporation serving executives and
              high-net-worth individuals.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-5">Discover</p>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => scrollToId("gallery")} className="hover:text-amber transition-colors">The Estate</button></li>
              <li><button onClick={() => scrollToId("synergy")} className="hover:text-amber transition-colors">Approach</button></li>
              <li><button onClick={() => scrollToId("amenities")} className="hover:text-amber transition-colors">Amenities</button></li>
              <li><button onClick={() => scrollToId("process")} className="hover:text-amber transition-colors">Process</button></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5">Company</p>
            <ul className="space-y-3 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-amber transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-amber transition-colors">Terms</Link></li>
              <li><button onClick={() => scrollToId("concierge-form")} className="hover:text-amber transition-colors">Referral Partners</button></li>
              <li><button onClick={() => scrollToId("concierge-form")} className="hover:text-amber transition-colors">Careers</button></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/10 text-xs text-primary-foreground/60 tracking-wide">
          © {new Date().getFullYear()} Sanctuary Southeast. All rights reserved. A Private Medical Wellness Corporation.
        </div>
      </div>
    </footer>
  );
}

import heroImage from "@/assets/hero-estate.jpg";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <img
        src={heroImage}
        alt="Sanctuary Southeast — a private luxury estate at golden hour beneath ancient oak trees"
        width={1920}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--navy) 55%, transparent) 0%, color-mix(in oklab, var(--navy) 35%, transparent) 45%, color-mix(in oklab, var(--navy) 80%, transparent) 100%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 pt-32 pb-20 w-full">
        <div className="max-w-3xl">
          <p className="eyebrow text-amber mb-6">
            <span className="luxe-rule mr-3" /> A Private Medical Wellness Retreat
          </p>
          <h1 className="font-serif text-ivory text-4xl sm:text-5xl lg:text-7xl leading-[1.05] mb-8">
            Recovery Defined by Discretion and Excellence.
          </h1>
          <p className="text-ivory/85 text-lg lg:text-xl max-w-2xl leading-relaxed font-light mb-10">
            A private, medical-wellness retreat in the heart of the Southeast,
            designed for the high-functioning executive who refuses to
            compromise on privacy or luxury.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => scrollToId("concierge-form")}
              className="bg-amber text-amber-foreground px-8 py-4 text-xs tracking-[0.24em] uppercase font-semibold hover:-translate-y-0.5 transition-transform duration-300"
            >
              Request Private Prospectus
            </button>
            <button
              onClick={() => scrollToId("gallery")}
              className="border border-ivory/40 text-ivory px-8 py-4 text-xs tracking-[0.24em] uppercase font-semibold hover:bg-ivory hover:text-navy transition-colors duration-500"
            >
              Explore the Estate
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-ivory/70 text-[10px] tracking-[0.4em] uppercase">
        Scroll
      </div>
    </section>
  );
}

const items = [
  {
    num: "01",
    title: "Ironclad Privacy",
    desc: "Universal NDAs for every staff member, encrypted communication channels, and private arrival protocols ensure your presence is known only to those you choose.",
  },
  {
    num: "02",
    title: "Business Continuity",
    desc: "Sound-proof private offices, high-speed satellite internet, and secure conferencing keep critical leadership operations uninterrupted throughout your stay.",
  },
  {
    num: "03",
    title: "Bespoke Re-Engagement",
    desc: "Curated activities — fly fishing, championship golf, equestrian work — restore identity and confidence beyond the clinical container.",
  },
];

export function Amenities() {
  return (
    <section id="amenities" className="py-28 lg:py-40 bg-background scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl mb-16 lg:mb-20">
          <p className="eyebrow mb-5"><span className="luxe-rule mr-3" /> Executive Amenities</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-foreground">
            Designed for the Modern Leader.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {items.map((it) => (
            <div
              key={it.num}
              className="bg-background p-10 lg:p-12 group transition-colors duration-500 hover:bg-primary hover:text-primary-foreground"
            >
              <p className="font-serif text-amber text-sm tracking-widest mb-8 group-hover:text-amber">
                {it.num} / 03
              </p>
              <h3 className="font-serif text-2xl lg:text-3xl mb-6 text-foreground group-hover:text-primary-foreground transition-colors">
                {it.title}
              </h3>
              <p className="text-sm lg:text-base text-muted-foreground leading-relaxed group-hover:text-primary-foreground/80 transition-colors">
                {it.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

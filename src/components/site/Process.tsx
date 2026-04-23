const steps = [
  {
    num: "I",
    title: "Confidential Inquiry",
    desc: "A discreet first conversation with our executive intake director — no records, no obligations.",
  },
  {
    num: "II",
    title: "Private Clinical Review",
    desc: "Independent medical assessment conducted under strict confidentiality, on your schedule.",
  },
  {
    num: "III",
    title: "Bespoke Program Design",
    desc: "Your program is composed across clinical, holistic, and executive workstreams.",
  },
  {
    num: "IV",
    title: "Quiet Arrival",
    desc: "Private transport, sealed perimeter, and a sanctuary that begins the moment you arrive.",
  },
];

export function Process() {
  return (
    <section id="process" className="py-28 lg:py-40 bg-primary text-primary-foreground scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl mb-16 lg:mb-20">
          <p className="eyebrow mb-5"><span className="luxe-rule mr-3" /> The Process</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-primary-foreground">
            Stealth Intake. Considered Care.
          </h2>
          <p className="mt-6 text-primary-foreground/70 text-base lg:text-lg leading-relaxed">
            Four quiet steps from first contact to first morning on the estate.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-primary-foreground/10">
          {steps.map((s) => (
            <li key={s.num} className="bg-primary p-8 lg:p-10">
              <p className="font-serif text-amber text-3xl mb-6">{s.num}</p>
              <h3 className="font-serif text-xl text-primary-foreground mb-4">{s.title}</h3>
              <p className="text-sm text-primary-foreground/70 leading-relaxed">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

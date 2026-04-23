const clinical = [
  { title: "24/7 Medical Supervision", desc: "Board-certified physicians and nursing staff on-site continuously." },
  { title: "Genetic Testing", desc: "Personalized pharmacology informed by your individual genome." },
  { title: "Neuro-Feedback", desc: "Advanced brain-mapping to recalibrate executive function and rest." },
  { title: "Integrative Psychiatry", desc: "Trauma-informed care from leaders in addiction medicine." },
];

const holistic = [
  { title: "Executive Coaching", desc: "Confidential 1:1 sessions with C-suite-experienced practitioners." },
  { title: "Cold Plunge & Sauna", desc: "Daily contrast therapy paired with somatic recovery rituals." },
  { title: "Gourmet Nutrition", desc: "Private chef cuisine designed by metabolic and functional dietitians." },
  { title: "Equestrian & Nature Therapy", desc: "Quiet, embodied work conducted across our private acreage." },
];

function Column({
  eyebrow,
  heading,
  items,
}: {
  eyebrow: string;
  heading: string;
  items: { title: string; desc: string }[];
}) {
  return (
    <div>
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h3 className="font-serif text-2xl lg:text-3xl text-foreground mb-10">
        {heading}
      </h3>
      <ul className="space-y-px">
        {items.map((it) => (
          <li
            key={it.title}
            className="group border-t border-border last:border-b py-6 cursor-default transition-colors duration-500 hover:bg-secondary"
          >
            <div className="flex items-baseline gap-4 px-2">
              <span className="text-amber text-xs font-medium tracking-widest">
                ◆
              </span>
              <div className="flex-1">
                <p className="font-serif text-lg text-foreground">{it.title}</p>
                <p className="text-sm text-muted-foreground mt-2 max-h-0 opacity-0 overflow-hidden transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-3 leading-relaxed">
                  {it.desc}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SynergyMap() {
  return (
    <section id="synergy" className="py-28 lg:py-40 bg-secondary scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <p className="eyebrow mb-5">
            <span className="luxe-rule mr-3" /> The Synergy Map
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-foreground">
            Where Medical Rigor Meets Holistic Wellness.
          </h2>
          <p className="text-muted-foreground mt-6 text-base lg:text-lg leading-relaxed">
            Two disciplines, one continuous program — engineered for sustainable
            recovery without disruption to the life you have built.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <Column eyebrow="Clinical Foundation" heading="Evidence-Based Medicine" items={clinical} />
          <Column eyebrow="Holistic Restoration" heading="The Art of Recovery" items={holistic} />
        </div>
      </div>
    </section>
  );
}

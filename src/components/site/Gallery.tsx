import suite from "@/assets/gallery-suite.jpg";
import boardroom from "@/assets/gallery-boardroom.jpg";
import grounds from "@/assets/gallery-grounds.jpg";
import clinical from "@/assets/gallery-clinical.jpg";

const items = [
  { title: "The Private Suite", caption: "Single-occupancy residences with bespoke linens and concierge service.", img: suite },
  { title: "Executive Boardroom", caption: "Sound-proofed, encrypted spaces for uninterrupted leadership.", img: boardroom },
  { title: "Therapeutic Grounds", caption: "Acres of private oak-shaded gardens for reflection and recovery.", img: grounds },
  { title: "Clinical Wellness Suite", caption: "Five-star medical environments staffed by board-certified specialists.", img: clinical },
];

export function Gallery() {
  return (
    <section id="gallery" className="py-28 lg:py-40 bg-background scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl mb-16 lg:mb-20">
          <p className="eyebrow mb-5"><span className="luxe-rule mr-3" /> The Estate</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6">
            A Sanctuary of Unrivaled Privacy.
          </h2>
          <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
            A visual tour of our private suites, executive boardrooms, and
            holistic spa facilities — each space crafted for the rare guest
            who requires both clinical excellence and absolute discretion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {items.map((it) => (
            <figure key={it.title} className="group relative overflow-hidden bg-card">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={it.img}
                  alt={it.title}
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                />
              </div>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 50%, color-mix(in oklab, var(--navy) 85%, transparent) 100%)",
                }}
                aria-hidden
              />
              <figcaption className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-ivory">
                <h3 className="font-serif text-xl lg:text-2xl mb-2">{it.title}</h3>
                <p className="text-sm text-ivory/80 max-w-md">{it.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

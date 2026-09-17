import { site } from "@/content/site";
import SocialLinks from "./SocialLinks";
import Photo from "./Photo";
import Reveal from "./Reveal";

export default function Gallery() {
  return (
    <section id="galerie" className="scroll-mt-24 bg-white/50 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-gold">
                Galerie
              </p>
              <h2 className="rule-gold mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">
                Quelques réalisations
              </h2>
            </div>
            <SocialLinks
              variant="label"
              prefix="Tout voir sur"
              className="flex flex-wrap items-center gap-x-6 gap-y-2"
              itemClassName="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-rose"
            />
          </div>
        </Reveal>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {site.gallery.map((item, i) => (
            <li key={item.alt}>
              <Reveal delay={(i % 3) * 70}>
                <Photo
                  src={item.src}
                  alt={item.alt}
                  tone={item.tone}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 45vw, 30vw"
                  className="aspect-4/5 w-full rounded-2xl shadow-sm transition-transform duration-500 hover:scale-[1.015]"
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

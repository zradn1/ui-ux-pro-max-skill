import { site } from "@/content/site";
import { StarIcon } from "./Icons";
import Reveal from "./Reveal";

function Stars({ rating }: { rating: number }) {
  return (
    <span
      className="inline-flex items-center gap-0.5 text-gold"
      // Les icônes sont décoratives : la note est donnée une seule fois, ici.
      role="img"
      aria-label={`Note : ${rating} sur 5`}
    >
      {Array.from({ length: rating }, (_, i) => (
        <StarIcon key={i} className="h-3.5 w-3.5" />
      ))}
    </span>
  );
}

function Card({ quote, author, rating }: (typeof site.testimonials)[number]) {
  return (
    <figure className="flex h-full flex-col rounded-3xl border border-line bg-white p-7 sm:p-8">
      {/*
        Guillemet ouvrant en gros corps, décoratif : il pose le ton sans
        alourdir la carte. Masqué aux lecteurs d'écran, qui liraient un
        caractère isolé sans valeur.
      */}
      <span
        aria-hidden="true"
        className="font-display text-5xl leading-none text-blush"
      >
        &ldquo;
      </span>

      <blockquote className="mt-2 flex-1 font-display text-lg leading-relaxed text-ink">
        {quote}
      </blockquote>

      <figcaption className="mt-7 flex items-center justify-between gap-4 border-t border-line pt-5">
        <span className="text-sm font-medium uppercase tracking-[0.14em] text-muted">
          {author}
        </span>
        <Stars rating={rating} />
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  // Section masquée si aucun avis n'est renseigné dans content/site.ts.
  if (site.testimonials.length === 0) return null;

  return (
    <section id="avis" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-gold">
            Avis
          </p>
          <h2 className="rule-gold mt-4 max-w-2xl font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            Ce qu&apos;en disent nos clientes
          </h2>
        </Reveal>

        <Reveal delay={80}>
          {/*
            Un seul balisage pour les deux mises en page : carrousel à défilement
            par à-coups sous `sm`, grille de trois au-delà. Le défilement est
            natif (scroll-snap), donc pas de librairie, pas de JavaScript, et le
            clavier comme le tactile fonctionnent d'office.

            `-mx-5 px-5` fait déborder la piste jusqu'aux bords de l'écran sans
            créer de débordement horizontal : `overflow-x-auto` la découpe.
          */}
          <ul className="mt-12 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
            {site.testimonials.map((t, i) => (
              <li
                key={t.author}
                className="w-[82%] shrink-0 snap-center sm:w-auto sm:shrink"
              >
                <Reveal delay={(i % 3) * 70}>
                  <Card {...t} />
                </Reveal>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

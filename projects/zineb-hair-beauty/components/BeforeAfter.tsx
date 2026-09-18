import Image from "next/image";
import { site } from "@/content/site";
import { ArrowIcon } from "./Icons";
import Reveal from "./Reveal";

type Shot = typeof site.beforeAfter.before;

/**
 * Une des deux photos, dans un cadre 3:4.
 *
 * Le cadre porte le rapport d'aspect et l'image le remplit en `fill` : la place
 * est donc réservée avant même que le fichier arrive, et rien ne bouge au
 * chargement. Les deux sources étant déjà en 3:4, `object-cover` ne coupe
 * rien de visible — il se contente d'absorber le pixel d'écart entre elles.
 */
function Shot({
  shot,
  priority = false,
}: {
  shot: Shot;
  priority?: boolean;
}) {
  return (
    <figure className="relative">
      <div className="relative aspect-3/4 overflow-hidden rounded-xl bg-blush shadow-lg shadow-ink/5 sm:rounded-2xl">
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          // Chaque photo occupe la moitié de la colonne, plafonnée à 560 px.
          sizes="(min-width: 1152px) 560px, 46vw"
          priority={priority}
          className="object-cover object-center"
        />
      </div>

      {/*
        Étiquette en surimpression CSS, jamais incrustée dans la photo.
        Pastille opaque plutôt qu'un voile dégradé : le dégradé assombrirait
        la chevelure et donnerait un rendu artificiel.
      */}
      <figcaption className="absolute left-3 top-3 sm:left-4 sm:top-4">
        <span className="inline-flex items-center rounded-full bg-cream/95 px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.12em] text-ink shadow-sm backdrop-blur-sm sm:px-4 sm:py-1.5 sm:text-xs sm:tracking-[0.18em]">
          {shot.label}
        </span>
      </figcaption>
    </figure>
  );
}

export default function BeforeAfter() {
  const { beforeAfter: ba } = site;

  return (
    <section id="avant-apres" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-gold">
            {ba.eyebrow}
          </p>
          <h2 className="rule-gold mt-4 max-w-2xl font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            {ba.title}
          </h2>
        </Reveal>

        <Reveal delay={80}>
          {/*
            Côte à côte à toutes les largeurs : mises l'une sous l'autre, on
            perd la comparaison d'un coup d'œil, qui est tout l'intérêt.
            L'écart se resserre sur petit écran pour laisser la place aux photos.
          */}
          <div className="relative mt-12 grid grid-cols-2 gap-2.5 sm:gap-5 lg:gap-6">
            <Shot shot={ba.before} priority />
            <Shot shot={ba.after} />

            {/* Pastille centrale, posée sur l'écart entre les deux photos. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 inline-flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-cream text-gold shadow-md shadow-ink/10 sm:h-12 sm:w-12"
            >
              <ArrowIcon className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
            </span>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted">
            {ba.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

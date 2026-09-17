import { site } from "@/content/site";
import { whatsappUrl } from "@/lib/booking";
import { WhatsAppIcon, ArrowIcon } from "./Icons";
import SocialLinks from "./SocialLinks";
import Photo from "./Photo";
import Reveal from "./Reveal";

export default function Hero() {
  const { hero } = site;

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-24">
      {/* Halo décoratif */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-32 h-[34rem] w-[34rem] rounded-full bg-blush blur-3xl opacity-60"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-gold">
              {hero.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-5 font-display text-[2.6rem] leading-[1.06] tracking-tight text-ink sm:text-6xl lg:text-[4.1rem]">
              {hero.title}
              <br />
              <span className="italic text-rose">{hero.titleAccent}</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
              {hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full bg-rose px-7 py-4 text-base font-medium text-white shadow-lg shadow-rose/20 transition-all hover:bg-[#8f3354] hover:shadow-xl hover:shadow-rose/25"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {hero.primaryCta}
              </a>
              <a
                href="#prestations"
                className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-line bg-white/60 px-7 py-4 text-base font-medium text-ink transition-colors hover:border-rose hover:text-rose"
              >
                {hero.secondaryCta}
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <SocialLinks
              className="mt-8 flex flex-wrap items-center gap-x-6"
              itemClassName="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-rose"
            />
          </Reveal>
        </div>

        {/* Composition photo : une grande verticale + une petite en décalage. */}
        <Reveal delay={200} className="relative">
          <div className="relative mx-auto aspect-4/5 w-full max-w-md lg:max-w-none">
            <Photo
              src={site.gallery[0]?.src}
              alt={site.gallery[0]?.alt ?? "Réalisation du salon"}
              tone={1}
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="h-full w-full rounded-[2rem] shadow-2xl shadow-ink/10"
            />
            <div className="absolute -bottom-8 -left-6 hidden aspect-square w-40 sm:block lg:-left-12 lg:w-48">
              <Photo
                src={site.gallery[1]?.src}
                alt={site.gallery[1]?.alt ?? "Détail d'une réalisation"}
                tone={2}
                sizes="200px"
                className="h-full w-full rounded-2xl border-4 border-cream shadow-xl shadow-ink/10"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

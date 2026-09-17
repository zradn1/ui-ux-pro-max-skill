import { site } from "@/content/site";
import { whatsappUrl } from "@/lib/booking";
import { ArrowIcon } from "./Icons";
import Reveal from "./Reveal";

export default function Services() {
  return (
    <section id="prestations" className="scroll-mt-24 bg-white/50 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-gold">
            Prestations
          </p>
          <h2 className="rule-gold mt-4 max-w-2xl font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            Ce que nous faisons, et comment
          </h2>
        </Reveal>

        <div className="mt-14 space-y-16 lg:space-y-20">
          {site.services.map((group, groupIndex) => (
            <Reveal key={group.id} delay={groupIndex * 60}>
              <div className="grid gap-8 lg:grid-cols-[minmax(0,15rem)_1fr] lg:gap-14">
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <h3 className="font-display text-2xl text-ink sm:text-[1.75rem]">
                    {group.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {group.intro}
                  </p>
                </div>

                <ul className="divide-y divide-line border-t border-line">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <a
                        href={whatsappUrl(`${group.title} — ${item.name}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex min-h-16 items-start justify-between gap-6 py-6 transition-colors hover:bg-blush/40"
                      >
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <span className="font-medium text-ink transition-colors group-hover:text-rose">
                              {item.name}
                            </span>
                            {item.duration && (
                              <span className="text-xs uppercase tracking-wider text-muted">
                                {item.duration}
                              </span>
                            )}
                          </div>
                          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                            {item.description}
                          </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-3 pt-0.5">
                          {item.price && (
                            <span className="whitespace-nowrap text-sm font-medium text-gold">
                              {item.price}
                            </span>
                          )}
                          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-all group-hover:border-rose group-hover:bg-rose group-hover:text-white">
                            <ArrowIcon className="h-4 w-4" />
                          </span>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-14 rounded-2xl border border-line bg-cream px-6 py-5 text-sm leading-relaxed text-muted">
            Chaque ligne ouvre WhatsApp avec la prestation déjà indiquée — il ne
            reste qu&apos;à proposer un créneau. Pour un devis (mariage,
            transformation couleur), envoyez une photo, la réponse sera plus précise.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

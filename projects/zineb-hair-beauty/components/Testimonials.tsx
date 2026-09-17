import { site } from "@/content/site";
import Reveal from "./Reveal";

export default function Testimonials() {
  // Section volontairement masquée tant qu'aucun avis réel n'a été ajouté
  // dans content/site.ts.
  if (site.testimonials.length === 0) return null;

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-gold">
            Avis
          </p>
          <h2 className="rule-gold mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            Ce qu&apos;en disent nos clientes
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {site.testimonials.map((t, i) => (
            <li key={t.author}>
              <Reveal delay={(i % 3) * 70}>
                <figure className="flex h-full flex-col justify-between rounded-3xl border border-line bg-white p-7">
                  <blockquote className="font-display text-lg leading-relaxed text-ink">
                    <span aria-hidden="true" className="text-rose">
                      “
                    </span>
                    {t.quote}
                    <span aria-hidden="true" className="text-rose">
                      ”
                    </span>
                  </blockquote>
                  <figcaption className="mt-6 text-sm font-medium uppercase tracking-[0.14em] text-muted">
                    {t.author}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

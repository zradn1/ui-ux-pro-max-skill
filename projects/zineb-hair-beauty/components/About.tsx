import { site } from "@/content/site";
import Photo from "./Photo";
import Reveal from "./Reveal";

export default function About() {
  const { about } = site;
  // Les chiffres non renseignés dans content/site.ts sont simplement ignorés.
  const stats = about.stats.filter((s) => s.value);

  return (
    <section id="salon" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <div className="relative aspect-4/5 w-full max-w-md lg:max-w-none">
            <Photo
              src={site.gallery[2]?.src}
              alt={site.gallery[2]?.alt ?? "L'intérieur du salon"}
              tone={3}
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="h-full w-full rounded-[2rem] shadow-xl shadow-ink/10"
            />
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-gold">
              {about.eyebrow}
            </p>
            <h2 className="rule-gold mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">
              {about.title}
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-7 space-y-5">
              {about.body.map((paragraph) => (
                <p key={paragraph} className="leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          {stats.length > 0 && (
            <Reveal delay={160}>
              <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6 border-t border-line pt-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="block font-display text-4xl text-rose">
                        {stat.value}
                      </span>
                      <span className="mt-1 block text-xs uppercase tracking-[0.16em] text-muted">
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

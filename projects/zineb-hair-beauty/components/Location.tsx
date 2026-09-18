import { site } from "@/content/site";
import { formattedAddress, groupedHours, whatsappUrl } from "@/lib/booking";
import { ArrowIcon, ClockIcon, MapPinIcon, WhatsAppIcon } from "./Icons";
import Reveal from "./Reveal";

/**
 * Carte Google Maps, ou l'encadré qui la remplace tant qu'aucune URL
 * d'intégration n'est renseignée.
 *
 * Les deux occupent exactement le même cadre en 4:3 : renseigner l'URL plus
 * tard ne déplacera donc rien sur la page.
 */
function Map() {
  const { mapsEmbedUrl } = site.address;

  if (!mapsEmbedUrl) {
    return (
      <div className="flex aspect-4/3 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-blush/40 px-6 text-center">
        <MapPinIcon className="h-7 w-7 text-gold" />
        <p className="mt-4 font-display text-lg text-ink">
          Carte à connecter
        </p>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
          Aucune adresse n&apos;a encore été communiquée pour le salon. Renseignez
          <code className="mx-1 rounded bg-white px-1.5 py-0.5 text-xs text-ink">
            address.mapsEmbedUrl
          </code>
          dans <code className="text-xs text-ink">content/site.ts</code> et la
          carte s&apos;affichera ici, au même format.
        </p>
      </div>
    );
  }

  return (
    <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-line bg-blush">
      <iframe
        src={mapsEmbedUrl}
        title={`Emplacement du salon ${site.name} sur Google Maps`}
        // `lazy` : la carte n'est chargée qu'à l'approche du viewport, donc
        // elle ne pèse pas sur le premier rendu de la page.
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}

export default function Location() {
  const { location } = site;
  const address = formattedAddress();
  const hours = groupedHours();

  return (
    <section id="nous-trouver" className="scroll-mt-24 bg-white/50 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-gold">
            {location.eyebrow}
          </p>
          <h2 className="rule-gold mt-4 max-w-2xl font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            {location.title}
          </h2>
          <p className="mt-6 max-w-xl leading-relaxed text-muted">
            {location.subtitle}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
          <Reveal>
            <div className="flex flex-col gap-8">
              {address && (
                <div>
                  <h3 className="flex items-center gap-2.5 font-display text-xl text-ink">
                    <MapPinIcon className="h-5 w-5 text-rose" />
                    L&apos;adresse
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted">{address}</p>
                </div>
              )}

              {/*
                Horaires en résumé, pas en tableau : la section « Horaires &
                accès » plus haut porte déjà le détail jour par jour, et le
                répéter ici n'apprendrait rien.
              */}
              <div>
                <h3 className="flex items-center gap-2.5 font-display text-xl text-ink">
                  <ClockIcon className="h-5 w-5 text-rose" />
                  Horaires
                </h3>
                <dl className="mt-3 space-y-1.5 text-sm">
                  {hours.map((group) => (
                    <div key={group.label} className="flex gap-2 text-muted">
                      <dt>{group.label}</dt>
                      <dd className="before:mr-2 before:content-['·']">
                        {group.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full bg-rose px-7 py-4 font-medium text-white transition-colors hover:bg-[#8f3354] active:bg-[#7d2c49]"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Nous contacter sur WhatsApp
                </a>

                {/* Bouton masqué tant qu'aucun lien Maps n'est renseigné :
                    mieux vaut pas de bouton qu'un bouton qui ne mène nulle part. */}
                {site.address.mapsUrl && (
                  <a
                    href={site.address.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-line bg-white px-7 py-4 font-medium text-ink transition-colors hover:border-rose hover:text-rose"
                  >
                    Voir sur Google Maps
                    <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                )}
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <Map />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

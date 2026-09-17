"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { formattedAddress, groupedHours, telUrl, whatsappUrl } from "@/lib/booking";
import { ClockIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "./Icons";
import SocialLinks from "./SocialLinks";
import Reveal from "./Reveal";

export default function Visit() {
  // Le jour courant est calculé après le montage : le rendu serveur et le
  // rendu client restent identiques, donc pas d'erreur d'hydratation.
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => {
    const days = [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ];
    setToday(days[new Date().getDay()]);
  }, []);

  const address = formattedAddress();

  return (
    <section id="infos" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-gold">
            Infos pratiques
          </p>
          <h2 className="rule-gold mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            Horaires &amp; accès
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2 lg:gap-6">
          {/* Horaires */}
          <Reveal>
            <div className="h-full rounded-3xl border border-line bg-white p-7 sm:p-8">
              <h3 className="flex items-center gap-2.5 font-display text-xl text-ink">
                <ClockIcon className="h-5 w-5 text-rose" />
                Horaires d&apos;ouverture
              </h3>
              {/*
                Les jours consécutifs de mêmes horaires sont regroupés
                (« Mardi → Dimanche »). Le découpage est calculé à partir de
                `hours` dans content/site.ts : rien à retoucher ici si les
                horaires changent.
              */}
              <dl className="mt-6 divide-y divide-line/70">
                {groupedHours().map((group) => {
                  const isToday = today !== null && group.days.includes(today);
                  return (
                    <div
                      key={group.label}
                      className={`flex items-center justify-between gap-4 py-3 text-sm ${
                        isToday ? "font-medium text-ink" : "text-muted"
                      }`}
                    >
                      <dt className="flex items-center gap-2">
                        {group.label}
                        {isToday && (
                          <span className="rounded-full bg-blush px-2 py-0.5 text-[0.65rem] uppercase tracking-wider text-rose">
                            Aujourd&apos;hui
                          </span>
                        )}
                      </dt>
                      <dd>{group.value}</dd>
                    </div>
                  );
                })}
              </dl>
              <p className="mt-6 text-sm leading-relaxed text-muted">
                Accueil uniquement sur rendez-vous, afin que chaque cliente ait
                le temps qu&apos;il lui faut.
              </p>
            </div>
          </Reveal>

          {/* Contact & accès */}
          <Reveal delay={80}>
            <div className="flex h-full flex-col rounded-3xl border border-line bg-white p-7 sm:p-8">
              <h3 className="flex items-center gap-2.5 font-display text-xl text-ink">
                <MapPinIcon className="h-5 w-5 text-rose" />
                Nous contacter
              </h3>

              {address && (
                <p className="mt-6 leading-relaxed text-muted">{address}</p>
              )}

              <div className="mt-6 mb-6 flex flex-col gap-3">
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full bg-rose px-6 py-4 font-medium text-white transition-colors hover:bg-[#8f3354]"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Écrire sur WhatsApp
                </a>
                <a
                  href={telUrl()}
                  className="inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full border border-line px-6 py-4 font-medium text-ink transition-colors hover:border-rose hover:text-rose"
                >
                  <PhoneIcon className="h-5 w-5" />
                  {site.contact.phoneDisplay}
                </a>
              </div>

              {/* `mt-auto` colle ce bloc en bas : la carte reste équilibrée avec
                  celle des horaires, même quand l'adresse n'est pas renseignée. */}
              <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 text-sm">
                {/* `contents` : les <li> rejoignent la rangée flex du parent,
                    sans imbriquer une seconde liste dans la mise en page. */}
                <SocialLinks
                  className="contents"
                  itemClassName="inline-flex min-h-11 items-center gap-2 text-muted transition-colors hover:text-rose"
                />
                {site.contact.email && (
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="inline-flex min-h-11 items-center text-muted transition-colors hover:text-rose"
                  >
                    {site.contact.email}
                  </a>
                )}
                {site.address.mapsUrl && (
                  <a
                    href={site.address.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 text-muted transition-colors hover:text-rose"
                  >
                    <MapPinIcon className="h-4 w-4" />
                    Itinéraire
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

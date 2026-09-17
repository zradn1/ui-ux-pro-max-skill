import { site } from "@/content/site";
import { whatsappUrl } from "@/lib/booking";
import { WhatsAppIcon } from "./Icons";
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
            Ce que nous faisons
          </h2>
        </Reveal>

        {/*
          Liste plutôt que grille de cartes, et largeur limitée à max-w-3xl :
          avec quatre lignes, une pleine largeur éloignerait le bouton WhatsApp
          du texte auquel il correspond.
        */}
        <ul className="mt-12 max-w-3xl divide-y divide-line border-t border-line">
          {site.services.map((service, i) => (
            <li key={service.name}>
              <Reveal delay={i * 60}>
                <a
                  href={whatsappUrl(service.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  // Toute la ligne est cliquable. `active:` double le survol
                  // pour le tactile, où il n'existe pas.
                  className="group -mx-1 flex min-h-16 items-center justify-between gap-4 rounded-xl px-1 py-6 transition-colors hover:bg-blush/40 active:bg-blush/70 sm:gap-6"
                >
                  <div className="min-w-0">
                    <span className="font-medium text-ink transition-colors group-hover:text-rose group-active:text-rose">
                      {service.name}
                      {/* Complète le nom annoncé par les lecteurs d'écran sans
                          l'écraser : la description visible reste lue. */}
                      <span className="sr-only"> — réserver sur WhatsApp</span>
                    </span>
                    {service.description && (
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                        {service.description}
                      </p>
                    )}
                  </div>

                  {/* Icône WhatsApp plutôt qu'une flèche : elle dit où mène
                      le clic avant qu'on clique. */}
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-all group-hover:border-rose group-hover:bg-rose group-hover:text-white group-active:border-rose group-active:bg-rose group-active:text-white">
                    <WhatsAppIcon className="h-4 w-4" />
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <p className="mt-12 max-w-3xl rounded-2xl border border-line bg-cream px-6 py-5 text-sm leading-relaxed text-muted">
            Chaque ligne ouvre WhatsApp avec la prestation déjà indiquée — il ne
            reste qu&apos;à proposer un créneau. Pour un devis, envoyez une photo :
            la réponse sera plus précise.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

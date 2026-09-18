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

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:gap-6">
          {site.services.map((service, i) => (
            <li key={service.name}>
              <Reveal delay={(i % 2) * 80}>
                {/*
                  Carte en colonne avec le bouton poussé en bas par `mt-auto` :
                  les cartes gardent la même hauteur et leurs boutons restent
                  alignés, même quand une description manque.
                */}
                <article className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-rose/40 hover:shadow-xl hover:shadow-ink/5 sm:p-8">
                  {/* Filet doré décoratif, repris du reste du site. */}
                  <span
                    aria-hidden="true"
                    className="block h-px w-10 bg-gradient-to-r from-gold to-transparent transition-all duration-300 group-hover:w-16"
                  />

                  <h3 className="mt-6 font-display text-2xl leading-tight text-ink sm:text-[1.75rem]">
                    {service.name}
                  </h3>

                  {service.description && (
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                      {service.description}
                    </p>
                  )}

                  <a
                    href={whatsappUrl(service.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    // Pleine largeur sur mobile pour la zone de tap, largeur
                    // du contenu au-delà : un bandeau rose dans chaque carte
                    // alourdirait la mise en page sur grand écran.
                    className="mt-8 inline-flex min-h-13 items-center justify-center gap-2.5 self-stretch rounded-full bg-rose px-7 py-3.5 font-medium text-white transition-colors hover:bg-[#8f3354] active:bg-[#7d2c49] sm:self-start"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Prendre rendez-vous
                    {/* Précise la destination pour les lecteurs d'écran, que
                        l'icône seule n'indique pas. */}
                    <span className="sr-only"> pour {service.name} sur WhatsApp</span>
                  </a>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <p className="mt-12 rounded-2xl border border-line bg-cream px-6 py-5 text-sm leading-relaxed text-muted">
            Chaque bouton ouvre WhatsApp avec la prestation déjà indiquée — il ne
            reste qu&apos;à proposer un créneau. Pour un devis, envoyez une photo :
            la réponse sera plus précise.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

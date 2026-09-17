import { site } from "@/content/site";
import { formattedAddress, telUrl } from "@/lib/booking";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  const address = formattedAddress();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-cream">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            {/* Version carrée : le pied de page a la hauteur pour l'accueillir. */}
            <Logo variant="stacked" className="h-24 w-auto sm:h-28" />
            {/*
              La version carrée du logo porte déjà la signature « Révélez votre
              beauté ». On ne la répète en texte que lorsqu'elle n'est pas
              affichée : sans fichier carré, le pied de page retombe sur le
              lockup horizontal ou sur le repli typographique, qui ne la portent pas.
            */}
            {site.baseline && !site.logo.stackedSrc && (
              <p className="mt-4 font-display text-base italic text-rose">
                {site.baseline}
              </p>
            )}
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {site.footer.note}
            </p>
          </div>

          <div className="text-sm text-muted">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-gold">
              Contact
            </p>
            {address && <p className="mb-2">{address}</p>}
            <p className="mb-2">
              <a
                href={telUrl()}
                className="inline-flex min-h-11 items-center transition-colors hover:text-rose"
              >
                {site.contact.phoneDisplay}
              </a>
            </p>
            <SocialLinks
              className="flex flex-col"
              itemClassName="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-rose"
            />
          </div>
        </div>

        <p className="mt-12 border-t border-line pt-6 text-xs text-muted">
          © {year} {site.name}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

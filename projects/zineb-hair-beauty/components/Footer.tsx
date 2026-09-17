import { site } from "@/content/site";
import { formattedAddress, telUrl } from "@/lib/booking";
import { InstagramIcon } from "./Icons";

export default function Footer() {
  const address = formattedAddress();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-cream">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-xl text-ink">
              {site.shortName}
              <span className="text-rose">.</span>
              <span className="ml-2 text-xs font-sans font-medium uppercase tracking-[0.2em] text-muted">
                Hair &amp; Beauty
              </span>
            </p>
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
            <a
              href={site.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-rose"
            >
              <InstagramIcon className="h-4 w-4" />
              {site.contact.instagramHandle}
            </a>
          </div>
        </div>

        <p className="mt-12 border-t border-line pt-6 text-xs text-muted">
          © {year} {site.name}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

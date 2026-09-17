import { site } from "@/content/site";
import { telUrl, whatsappUrl } from "@/lib/booking";
import { PhoneIcon, WhatsAppIcon } from "./Icons";
import Reveal from "./Reveal";

export default function CallToAction() {
  const { cta } = site;

  return (
    <section className="px-5 pb-20 sm:px-8 lg:pb-28">
      <Reveal>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-deep px-7 py-16 text-center sm:px-12 lg:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-rose/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-gold/15 blur-3xl"
          />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl leading-tight text-cream sm:text-4xl lg:text-[2.75rem]">
              {cta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-[#cbb8bf]">
              {cta.body}
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full bg-rose-soft px-7 py-4 text-base font-medium text-deep transition-transform hover:scale-[1.02]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {cta.button}
              </a>
              <a
                href={telUrl()}
                className="inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full border border-white/25 px-7 py-4 text-base font-medium text-cream transition-colors hover:border-rose-soft hover:text-rose-soft"
              >
                <PhoneIcon className="h-5 w-5" />
                Appeler
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

import { site } from "@/content/site";
import { activeTikTokVideos } from "@/lib/tiktok";
import SocialLinks from "./SocialLinks";
import Photo from "./Photo";
import TikTokEmbed from "./TikTokEmbed";
import Reveal from "./Reveal";

export default function Gallery() {
  // Bloc vidéo masqué tant qu'aucune URL exploitable n'est renseignée
  // dans `tiktokVideos` (content/site.ts).
  const videos = activeTikTokVideos();

  return (
    <section id="galerie" className="scroll-mt-24 bg-white/50 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-gold">
                Galerie
              </p>
              <h2 className="rule-gold mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">
                Quelques réalisations
              </h2>
            </div>
            <SocialLinks
              variant="label"
              prefix="Tout voir sur"
              className="flex flex-wrap items-center gap-x-6 gap-y-2"
              itemClassName="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-rose"
            />
          </div>
        </Reveal>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {site.gallery.map((item, i) => (
            <li key={item.alt}>
              <Reveal delay={(i % 3) * 70}>
                <Photo
                  src={item.src}
                  alt={item.alt}
                  tone={item.tone}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 45vw, 30vw"
                  className="aspect-4/5 w-full rounded-2xl shadow-sm transition-transform duration-500 hover:scale-[1.015]"
                />
              </Reveal>
            </li>
          ))}
        </ul>

        {videos.length > 0 && (
          <div className="mt-16 border-t border-line pt-14">
            <Reveal>
              <h3 className="font-display text-2xl text-ink sm:text-[1.75rem]">
                En vidéo
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                Quelques transformations filmées au salon.
              </p>
            </Reveal>

            <ul className="mt-9 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((video, i) => (
                <li key={video.id}>
                  <Reveal delay={(i % 3) * 70}>
                    <TikTokEmbed
                      id={video.id}
                      url={video.url}
                      caption={video.caption}
                    />
                  </Reveal>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-xs leading-relaxed text-muted">
              Les vidéos ne sont chargées qu&apos;au clic sur Lecture. TikTok
              peut alors déposer des cookies sur votre appareil.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

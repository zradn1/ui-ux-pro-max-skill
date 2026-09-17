"use client";

import { useState } from "react";
import { tiktokEmbedUrl } from "@/lib/tiktok";
import { TikTokIcon, ArrowIcon } from "./Icons";

/**
 * Lecteur TikTok en « façade » : on affiche d'abord une vignette locale, et
 * l'iframe n'est insérée qu'au clic sur Lecture.
 *
 * Pourquoi pas le script officiel embed.js : il se charge sur chaque visite,
 * pèse plusieurs centaines de kilo-octets et dépose des cookies tiers avant
 * même que la visiteuse ait demandé quoi que ce soit. Ici, tant que personne
 * ne clique, le site ne contacte pas TikTok — et la page reste aussi rapide
 * que le reste du site, qui est entièrement statique.
 */
export default function TikTokEmbed({
  id,
  url,
  caption,
}: {
  id: string;
  url: string;
  caption: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className="mx-auto w-full max-w-[330px]">
      <div className="relative aspect-9/16 overflow-hidden rounded-2xl bg-deep shadow-lg shadow-ink/10">
        {playing ? (
          <iframe
            src={tiktokEmbedUrl(id)}
            title={`Vidéo TikTok : ${caption}`}
            allow="encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Lire la vidéo TikTok : ${caption}`}
            className="group absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-5 bg-gradient-to-br from-[#3a2830] via-deep to-[#1b1317] p-6 text-center"
          >
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[#cbb8bf]">
              <TikTokIcon className="h-3.5 w-3.5" />
              TikTok
            </span>

            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-rose-soft transition-transform duration-300 group-hover:scale-110">
              {/* Triangle de lecture, légèrement décalé pour paraître centré. */}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="ml-1 h-7 w-7 text-deep"
              >
                <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.3-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" />
              </svg>
            </span>

            <span className="font-display text-lg leading-snug text-cream">
              {caption}
            </span>
          </button>
        )}
      </div>

      {/*
        La légende n'est pas répétée ici : elle est déjà lisible sur la vignette
        avant lecture, et le lecteur TikTok affiche la sienne une fois lancé.
        Reste le lien direct, utile si un bloqueur empêche l'iframe de s'afficher.
      */}
      <figcaption className="mt-3">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ouvrir sur TikTok : ${caption}`}
          className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-rose"
        >
          Ouvrir sur TikTok
          <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </figcaption>
    </figure>
  );
}

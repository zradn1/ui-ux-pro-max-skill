import Image from "next/image";
import { site } from "@/content/site";

/**
 * Logo du salon, en deux déclinaisons.
 *
 * - `horizontal` : le lockup large, pour l'en-tête. Une barre de 80 px ne
 *   laisse pas la place à une version carrée, qui n'y ferait qu'une quarantaine
 *   de pixels de large — illisible.
 * - `stacked` : la version carrée, pour le pied de page, où la hauteur ne
 *   manque pas. Si aucun fichier carré n'est fourni, on retombe sur l'horizontal.
 *
 * Tant qu'aucun fichier n'est renseigné, un repli typographique composé avec
 * les polices du site prend le relais : rien n'est cassé en attendant.
 */
export default function Logo({
  variant = "horizontal",
  className = "h-9 w-auto",
  priority = false,
}: {
  variant?: "horizontal" | "stacked";
  className?: string;
  priority?: boolean;
}) {
  const { logo } = site;

  const useStacked = variant === "stacked" && Boolean(logo.stackedSrc);
  const src = useStacked ? logo.stackedSrc : logo.src;
  const width = useStacked ? logo.stackedWidth : logo.width;
  const height = useStacked ? logo.stackedHeight : logo.height;

  if (!src) {
    return (
      <span className="inline-flex items-baseline whitespace-nowrap">
        <span className="font-display text-lg leading-tight tracking-tight text-ink sm:text-xl">
          {site.shortName}
          <span className="text-rose">.</span>
        </span>
        <span className="ml-2 hidden font-sans text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted sm:inline">
          Hair &amp; Beauty
        </span>
      </span>
    );
  }

  const image = (
    <Image
      src={src}
      alt={site.name}
      width={width}
      height={height}
      priority={priority}
      // `w-auto` accompagne la hauteur imposée en classe : le rapport
      // largeur/hauteur est préservé et Next.js ne signale pas d'écart.
      className={className}
    />
  );

  if (!logo.whiteBackground) return image;

  /*
   * Dépannage pour un fichier à fond blanc opaque (JPEG, PNG aplati).
   *
   * On l'assume au lieu de le subir : le logo est posé sur une pastille
   * blanche arrondie, ce qui se lit comme un choix graphique plutôt que
   * comme un rectangle blanc oublié sur le crème.
   *
   * On a d'abord essayé `mix-blend-mode: multiply`, qui fait normalement
   * disparaître le blanc — sans succès : l'en-tête est `fixed` avec un
   * `z-index`, donc il forme son propre contexte d'empilement et l'image n'a
   * rien derrière elle avec quoi se mélanger. Le fond blanc restait visible.
   *
   * La vraie solution reste un fichier transparent (SVG de préférence) :
   * mettez alors `whiteBackground: false` et la pastille disparaît.
   */
  return (
    <span className="inline-flex items-center rounded-xl bg-white px-3 py-2 ring-1 ring-line/70">
      {image}
    </span>
  );
}

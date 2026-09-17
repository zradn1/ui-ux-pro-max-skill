import type { Social } from "@/content/site";
import { activeSocials } from "@/lib/booking";
import { InstagramIcon, TikTokIcon } from "./Icons";

const ICONS: Record<Social["platform"], typeof InstagramIcon> = {
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
};

const LABELS: Record<Social["platform"], string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
};

/**
 * Liste des réseaux sociaux du salon, alimentée par `socials` dans
 * content/site.ts. Les comptes non renseignés sont filtrés en amont, donc ce
 * composant ne rend rien tant qu'aucun réseau n'est configuré.
 *
 * - `variant="handle"` : icône + pseudo (pied de page, fiche contact, héro).
 * - `variant="label"`  : icône + nom de la plateforme (galerie, où le pseudo
 *   n'apporte rien et où l'on veut « Voir sur TikTok »).
 */
export default function SocialLinks({
  variant = "handle",
  prefix,
  className = "",
  itemClassName = "",
}: {
  variant?: "handle" | "label";
  /** Texte placé devant le nom de la plateforme, ex. « Tout voir sur ». */
  prefix?: string;
  className?: string;
  itemClassName?: string;
}) {
  const socials = activeSocials();
  if (socials.length === 0) return null;

  return (
    <ul className={className}>
      {socials.map((social) => {
        const Icon = ICONS[social.platform];
        const label = LABELS[social.platform];
        // Le pseudo peut être vide même si l'URL existe : on retombe alors
        // sur le nom de la plateforme plutôt que d'afficher un lien muet.
        const showsHandle = variant === "handle" && Boolean(social.handle);
        const text = showsHandle
          ? social.handle
          : [prefix, label].filter(Boolean).join(" ");

        return (
          <li key={social.platform}>
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              // Deux comptes peuvent porter le même pseudo : à l'oral,
              // « @zineb_hair_beauty » deux fois de suite ne distingue rien.
              // On nomme donc la plateforme, que seule l'icône indique à l'écran.
              aria-label={showsHandle ? `${label} : ${social.handle}` : undefined}
              className={itemClassName}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {text}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

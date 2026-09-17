import { site } from "@/content/site";

/** Numéro au format attendu par wa.me : chiffres uniquement, indicatif compris. */
const digits = (value: string) => value.replace(/\D/g, "");

/**
 * Lien WhatsApp avec message pré-rempli.
 * `context` précise la prestation depuis laquelle on a cliqué, au format
 * « CATÉGORIE — PRESTATION », sur la ligne suivant la salutation.
 */
export function whatsappUrl(context?: string) {
  const base = site.contact.whatsappMessage;
  const text = context ? `${base}\nPrestation : ${context}` : base;
  return `https://wa.me/${digits(site.contact.phoneE164)}?text=${encodeURIComponent(text)}`;
}

export function telUrl() {
  return `tel:${site.contact.phoneE164}`;
}

/**
 * Adresse sur une ligne. Renvoie "" tant que ni la rue ni la ville ne sont
 * renseignées — le pays seul n'est pas une adresse affichable, et les blocs
 * qui l'utilisent se masquent d'eux-mêmes.
 */
export function formattedAddress() {
  const { street, city, country } = site.address;
  if (!street && !city) return "";
  return [street, city, country].filter(Boolean).join(", ");
}

const DAY_INDEX: Record<string, number> = {
  Dimanche: 0,
  Lundi: 1,
  Mardi: 2,
  Mercredi: 3,
  Jeudi: 4,
  Vendredi: 5,
  Samedi: 6,
};

/** Renvoie l'entrée d'horaires correspondant au jour passé (par défaut aujourd'hui). */
export function todayHours(now = new Date()) {
  return site.hours.find((h) => DAY_INDEX[h.day] === now.getDay());
}

/** Abréviations schema.org (Mo, Tu…) pour les données structurées. */
const SCHEMA_DAY: Record<string, string> = {
  Lundi: "Mo",
  Mardi: "Tu",
  Mercredi: "We",
  Jeudi: "Th",
  Vendredi: "Fr",
  Samedi: "Sa",
  Dimanche: "Su",
};

export function schemaOpeningHours() {
  return site.hours
    .filter((h) => !h.closed && h.open && h.close)
    .map((h) => `${SCHEMA_DAY[h.day]} ${h.open}-${h.close}`);
}

/** « 12:00 » → « 12h00 ». Les données restent en 24 h pour schema.org. */
function frenchTime(value: string) {
  return value.replace(":", "h");
}

export type HoursGroup = {
  /** « Mardi → Dimanche », ou « Lundi » pour un jour isolé. */
  label: string;
  /** « 12h00 → 22h00 », ou « Fermé ». */
  value: string;
  /** Jours couverts, pour repérer celui d'aujourd'hui. */
  days: string[];
};

/**
 * Regroupe les jours consécutifs de mêmes horaires.
 *
 * Lister sept lignes identiques n'apprend rien : « Mardi → Dimanche,
 * 12h00 → 22h00 » se lit d'un coup d'œil. Le regroupement est calculé, pas
 * écrit en dur — si les horaires changent un jour de la semaine, l'affichage
 * se redécoupe tout seul, et les données structurées restent la seule source.
 *
 * L'ordre du tableau `hours` fait foi : il commence un mardi pour que la
 * plage ouverte sorte en premier.
 */
export function groupedHours(): HoursGroup[] {
  const groups: HoursGroup[] = [];

  for (const entry of site.hours) {
    const value = entry.closed
      ? "Fermé"
      : `${frenchTime(entry.open)} → ${frenchTime(entry.close)}`;

    const last = groups[groups.length - 1];
    if (last && last.value === value) {
      last.days.push(entry.day);
      last.label = `${last.days[0]} → ${entry.day}`;
    } else {
      groups.push({ label: entry.day, value, days: [entry.day] });
    }
  }

  return groups;
}

/**
 * Réseaux sociaux réellement renseignés, dans l'ordre de `content/site.ts`.
 * Une entrée sans URL est ignorée : le site n'affiche jamais de lien mort.
 */
export function activeSocials() {
  return site.socials.filter((s) => s.url);
}

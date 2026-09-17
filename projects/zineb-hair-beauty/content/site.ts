/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CONTENU DU SITE — fichier unique à modifier
 * ─────────────────────────────────────────────────────────────────────────────
 *  Tout le texte, les coordonnées, les services et les horaires du site sont
 *  ici. Aucun autre fichier n'a besoin d'être touché pour mettre le site à jour.
 *
 *  ⚠️  Les valeurs marquées « À COMPLÉTER » sont des espaces réservés.
 *      Remplacez-les par les vraies informations du salon avant la mise en
 *      ligne. Cherchez « À COMPLÉTER » dans ce fichier pour les retrouver.
 */

export type Service = {
  name: string;
  description: string;
  /** Durée indicative, ex. « 45 min ». Laisser vide pour masquer. */
  duration?: string;
  /** Ex. « dès 250 DH ». Laisser vide tant que les tarifs ne sont pas validés. */
  price?: string;
};

export type ServiceGroup = {
  id: string;
  title: string;
  intro: string;
  items: Service[];
};

export type Testimonial = {
  quote: string;
  author: string;
};

/** Réseau social affiché sur le site. `url` vide = entrée ignorée partout. */
export type Social = {
  platform: "instagram" | "tiktok";
  url: string;
  /** Affiché à l'écran, ex. « @zineb_hair_beauty ». */
  handle: string;
};

/* ── Réseaux sociaux ─────────────────────────────────────────────────────────
   L'ordre ici est l'ordre d'affichage sur tout le site.
   Une entrée dont `url` est vide est automatiquement masquée — pas besoin de
   la supprimer tant que le compte n'existe pas.
   Pour ajouter un réseau (Facebook, Pinterest…), ajoutez son icône dans
   components/Icons.tsx puis référencez-la dans components/SocialLinks.tsx.
   ─────────────────────────────────────────────────────────────────────────── */
const socials: Social[] = [
  {
    platform: "instagram",
    url: "https://www.instagram.com/zineb_hair_beauty/",
    handle: "@zineb_hair_beauty",
  },
  {
    // À COMPLÉTER — URL complète du profil TikTok et pseudo affiché.
    // Tant que `url` est vide, TikTok n'apparaît nulle part sur le site.
    platform: "tiktok",
    url: "",
    handle: "",
  },
];

/* ── Prestations ─────────────────────────────────────────────────────────────
   Adaptez librement : ajoutez, renommez ou supprimez groupes et lignes.
   ─────────────────────────────────────────────────────────────────────────── */
const services: ServiceGroup[] = [
  {
    id: "coiffure",
    title: "Coiffure",
    intro: "Coupe, brushing et mise en forme, adaptés à votre nature de cheveu.",
    items: [
      {
        name: "Coupe & brushing",
        description:
          "Diagnostic, shampooing traitant, coupe sur mesure et finition au brushing.",
        duration: "1 h",
      },
      {
        name: "Brushing & mise en plis",
        description:
          "Lissage, boucles ou volume selon l'effet souhaité, avec protection thermique.",
        duration: "45 min",
      },
      {
        name: "Coiffure de mariée & événement",
        description:
          "Essai préalable, coiffure tenue longue durée et retouches le jour J.",
        duration: "sur devis",
      },
    ],
  },
  {
    id: "couleur",
    title: "Couleur",
    intro: "Couleur, mèches et balayage, avec un protocole qui préserve la fibre.",
    items: [
      {
        name: "Coloration",
        description:
          "Couleur racines ou longueurs, teinte choisie ensemble après test de compatibilité.",
        duration: "1 h 30",
      },
      {
        name: "Balayage & mèches",
        description:
          "Éclaircissement progressif pour un rendu naturel et un entretien espacé.",
        duration: "2 h 30",
      },
      {
        name: "Patine & gloss",
        description:
          "Ravive la couleur, neutralise les reflets indésirables et apporte de la brillance.",
        duration: "30 min",
      },
    ],
  },
  {
    id: "soins",
    title: "Soins",
    intro: "Des protocoles ciblés pour réparer, hydrater et faire tenir la couleur.",
    items: [
      {
        name: "Soin profond réparateur",
        description:
          "Reconstruction de la fibre après décoloration, chaleur ou lissage.",
        duration: "45 min",
      },
      {
        name: "Soin hydratant & anti-frisottis",
        description:
          "Hydratation en profondeur, idéale pour les cheveux bouclés ou secs.",
        duration: "45 min",
      },
      {
        name: "Traitement cuir chevelu",
        description:
          "Gommage et massage pour assainir le cuir chevelu et stimuler la pousse.",
        duration: "30 min",
      },
    ],
  },
  {
    id: "beaute",
    title: "Beauté & esthétique",
    intro: "Les finitions qui complètent la prestation coiffure.",
    items: [
      {
        name: "Manucure & pose",
        description: "Mise en beauté des ongles, vernis classique ou semi-permanent.",
        duration: "1 h",
      },
      {
        name: "Soin du visage",
        description:
          "Nettoyage, gommage et masque adaptés à votre type de peau.",
        duration: "1 h",
      },
      {
        name: "Épilation & sourcils",
        description:
          "Épilation à la cire et restructuration des sourcils.",
        duration: "30 min",
      },
    ],
  },
];

/* ── Avis clientes ───────────────────────────────────────────────────────────
   À COMPLÉTER — n'ajoutez que de vrais avis, avec l'accord de la personne.
   Tant que ce tableau est vide, la section n'apparaît pas sur le site.
   ─────────────────────────────────────────────────────────────────────────── */
const testimonials: Testimonial[] = [];

export const site = {
  /* ── Identité ───────────────────────────────────────────────────────────── */
  name: "Zineb Hair & Beauty",
  shortName: "Zineb",
  tagline: "Salon de coiffure & institut de beauté",
  /** Utilisé dans les balises SEO et le partage sur les réseaux. */
  description:
    "Salon de coiffure et institut de beauté. Coupe, couleur, soins, coiffure de mariée, manucure et esthétique — sur rendez-vous.",

  /* ── Coordonnées ────────────────────────────────────────────────────────── */
  contact: {
    // À COMPLÉTER — format international, sans espaces, pour les liens tel:/WhatsApp
    phoneE164: "+212600000000",
    // À COMPLÉTER — version affichée à l'écran
    phoneDisplay: "+212 6 00 00 00 00",
    // À COMPLÉTER — laisser vide ("") pour masquer le bouton e-mail
    email: "",
    /** Message pré-rempli à l'ouverture de WhatsApp. */
    whatsappMessage:
      "Bonjour Zineb Hair & Beauty 👋 Je souhaite prendre rendez-vous.",
  },

  /* ── Adresse ────────────────────────────────────────────────────────────── */
  address: {
    // À COMPLÉTER
    street: "",
    // À COMPLÉTER
    city: "",
    country: "Maroc",
    /** À COMPLÉTER — lien « Partager » depuis Google Maps. Vide = carte masquée. */
    mapsUrl: "",
  },

  /* ── Horaires ───────────────────────────────────────────────────────────── */
  /** À COMPLÉTER — mettez `closed: true` pour les jours de fermeture. */
  hours: [
    { day: "Lundi", open: "09:00", close: "19:00", closed: false },
    { day: "Mardi", open: "09:00", close: "19:00", closed: false },
    { day: "Mercredi", open: "09:00", close: "19:00", closed: false },
    { day: "Jeudi", open: "09:00", close: "19:00", closed: false },
    { day: "Vendredi", open: "09:00", close: "19:00", closed: false },
    { day: "Samedi", open: "09:00", close: "20:00", closed: false },
    { day: "Dimanche", open: "", close: "", closed: true },
  ],

  /* ── Section héro ───────────────────────────────────────────────────────── */
  hero: {
    eyebrow: "Coiffure & Beauté",
    title: "Votre beauté,",
    titleAccent: "entre de bonnes mains",
    subtitle:
      "Coupe, couleur, soins et esthétique dans un salon pensé pour que vous repartiez en confiance. Prise de rendez-vous en un message.",
    primaryCta: "Réserver sur WhatsApp",
    secondaryCta: "Voir les prestations",
  },

  /* ── À propos ───────────────────────────────────────────────────────────── */
  about: {
    eyebrow: "Le salon",
    title: "Un savoir-faire, une écoute",
    body: [
      "Chaque prestation commence par un diagnostic : votre nature de cheveu, votre routine, le temps que vous voulez y consacrer. C'est ce qui fait la différence entre une belle coiffure le jour J et une coiffure qui tient des semaines.",
      "Produits professionnels, matériel entretenu, hygiène rigoureuse. Vous êtes reçue sur rendez-vous, sans attente, dans un espace calme.",
    ],
    /** Chiffres mis en avant. À COMPLÉTER ou supprimer les entrées non vérifiées. */
    stats: [
      { value: "", label: "Années d'expérience" },
      { value: "", label: "Clientes accompagnées" },
    ],
  },

  /* ── Réseaux sociaux (voir le tableau `socials` plus haut) ─────────────── */
  socials,

  /* ── Prestations (voir le tableau `services` plus haut) ──────────────── */
  services,

  /* ── Galerie ────────────────────────────────────────────────────────────── */
  /**
   * À COMPLÉTER — remplacez chaque `src` par une vraie photo placée dans
   * /public/gallery/ (ex. "/gallery/coupe-01.jpg"). Gardez des `alt` descriptifs :
   * c'est ce que lisent les lecteurs d'écran et Google.
   * Format conseillé : 1200×1500 px (portrait 4:5), < 300 Ko, en .webp.
   */
  gallery: [
    { src: "", alt: "Coupe dégradée avec brushing lisse", tone: 1 },
    { src: "", alt: "Balayage caramel sur cheveux longs", tone: 2 },
    { src: "", alt: "Chignon de mariée avec tresse latérale", tone: 3 },
    { src: "", alt: "Boucles définies après soin hydratant", tone: 4 },
    { src: "", alt: "Couleur rouge profond sur carré court", tone: 5 },
    { src: "", alt: "Manucure en vernis semi-permanent nude", tone: 6 },
  ],

  /* ── Avis (voir le tableau `testimonials` plus haut) ──────────────────── */
  testimonials,

  /* ── Appel à l'action final ─────────────────────────────────────────────── */
  cta: {
    title: "Prête à passer au salon ?",
    body: "Envoyez un message sur WhatsApp avec la prestation qui vous intéresse et le créneau qui vous arrange. Réponse rapide pendant les heures d'ouverture.",
    button: "Prendre rendez-vous",
  },

  /* ── Pied de page ───────────────────────────────────────────────────────── */
  footer: {
    note: "Sur rendez-vous. Merci de prévenir au moins 24 h à l'avance en cas d'annulation.",
  },

  /** À COMPLÉTER — domaine final, utilisé pour le SEO et le sitemap. */
  url: "https://example.com",
};

export type Site = typeof site;

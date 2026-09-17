import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { site } from "@/content/site";
import { formattedAddress, schemaOpeningHours } from "@/lib/booking";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "salon de coiffure",
    "institut de beauté",
    "coupe",
    "couleur",
    "balayage",
    "coiffure mariée",
    "manucure",
    site.address.city,
  ].filter(Boolean),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#fbf6f2",
  width: "device-width",
  initialScale: 1,
};

/**
 * Données structurées LocalBusiness : ce qui permet à Google d'afficher
 * horaires, téléphone et avis directement dans les résultats de recherche.
 */
function schema() {
  const address = formattedAddress();
  return {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.contact.phoneE164,
    ...(site.contact.email ? { email: site.contact.email } : {}),
    ...(address
      ? {
          address: {
            "@type": "PostalAddress",
            ...(site.address.street ? { streetAddress: site.address.street } : {}),
            ...(site.address.city ? { addressLocality: site.address.city } : {}),
            addressCountry: "MA",
          },
        }
      : {}),
    openingHours: schemaOpeningHours(),
    sameAs: [site.contact.instagram].filter(Boolean),
    ...(site.address.mapsUrl ? { hasMap: site.address.mapsUrl } : {}),
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        {/*
          Pose la classe `js` avant le premier rendu. Les animations
          d'apparition ne masquent le contenu que si ce script a tourné.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js")`,
          }}
        />
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-cream"
        >
          Aller au contenu
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema()) }}
        />
      </body>
    </html>
  );
}

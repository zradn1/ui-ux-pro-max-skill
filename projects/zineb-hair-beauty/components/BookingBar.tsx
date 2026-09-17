"use client";

import { useEffect, useState } from "react";
import { telUrl, whatsappUrl } from "@/lib/booking";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

/**
 * Barre de réservation fixe, mobile uniquement.
 * Elle n'apparaît qu'une fois le héros dépassé, pour ne pas masquer
 * le premier écran.
 */
export default function BookingBar() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-transform duration-300 lg:hidden ${
        shown ? "translate-y-0" : "translate-y-full"
      }`}
      // Masqué au clavier tant qu'il est hors écran.
      aria-hidden={!shown}
    >
      <div className="flex items-center gap-2.5">
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={shown ? 0 : -1}
          className="inline-flex min-h-13 flex-1 items-center justify-center gap-2.5 rounded-full bg-rose px-5 py-3.5 font-medium text-white"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Réserver
        </a>
        <a
          href={telUrl()}
          tabIndex={shown ? 0 : -1}
          aria-label="Appeler le salon"
          className="inline-flex h-13 w-13 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink"
        >
          <PhoneIcon className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { whatsappUrl } from "@/lib/booking";
import { WhatsAppIcon } from "./Icons";

const links = [
  { href: "#prestations", label: "Prestations" },
  { href: "#salon", label: "Le salon" },
  { href: "#galerie", label: "Galerie" },
  { href: "#infos", label: "Horaires & accès" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu mobile ouvert : on bloque le scroll de la page derrière.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-cream/95 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#"
          className="font-display text-lg leading-tight tracking-tight text-ink sm:text-xl"
        >
          {site.shortName}
          <span className="text-rose">.</span>
          <span className="ml-2 hidden text-[0.7rem] font-sans font-medium uppercase tracking-[0.2em] text-muted sm:inline">
            Hair &amp; Beauty
          </span>
        </a>

        <nav aria-label="Navigation principale" className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted transition-colors hover:text-rose"
            >
              {l.label}
            </a>
          ))}
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-rose px-5 text-sm font-medium text-white transition-transform hover:scale-[1.02] hover:bg-[#8f3354]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Réserver
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className="-mr-2 inline-flex h-12 w-12 items-center justify-center rounded-full text-ink lg:hidden"
        >
          <span className="relative block h-4 w-6" aria-hidden="true">
            <span
              className={`absolute left-0 block h-px w-6 bg-current transition-transform duration-300 ${
                open ? "top-2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-2 block h-px w-6 bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-6 bg-current transition-transform duration-300 ${
                open ? "top-2 -rotate-45" : "top-4"
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="menu-mobile"
        hidden={!open}
        className="border-t border-line bg-cream lg:hidden"
      >
        <nav aria-label="Navigation mobile" className="mx-auto max-w-6xl px-5 py-6 sm:px-8">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 items-center border-b border-line/70 font-display text-xl text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-rose px-6 py-4 text-base font-medium text-white"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Réserver sur WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}

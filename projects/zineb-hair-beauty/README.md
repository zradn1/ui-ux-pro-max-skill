# Zineb Hair & Beauty — site vitrine

One-page marketing site for a hair salon / beauty studio. French copy, WhatsApp-first
booking, no backend and no database — it builds to static pages you can host anywhere.

Built with Next.js 16 (App Router) + Tailwind CSS v4.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

---

## 1. Fill in the real content first

**Everything editable lives in one file: [`content/site.ts`](content/site.ts).**
No component needs to be touched to update the site.

Search that file for `À COMPLÉTER` to find every placeholder. Until they're
replaced, the site runs fine but shows stand-in values:

| What | Where in `content/site.ts` | Currently |
|---|---|---|
| Phone number | `contact.phoneE164` / `contact.phoneDisplay` | `+212600000000` — placeholder |
| Email (optional) | `contact.email` | empty → button hidden |
| Street & city | `address.street`, `address.city` | empty → address block hidden |
| Google Maps link | `address.mapsUrl` | empty → "Itinéraire" link hidden |
| Opening hours | `hours` | Mon–Sat 09:00–19:00, Sun closed — **confirm with the salon** |
| Prices | `price` on any service | omitted → price column hidden |
| Photos | `gallery[].src` | empty → gradient placeholders |
| Reviews | `testimonials` | empty → **whole section hidden** |
| TikTok account | `socials` → `platform: "tiktok"` | empty → **hidden everywhere** |
| TikTok videos | `tiktokVideos` | empty → **video block hidden** |
| Final domain | `url` | `https://example.com` |

Two things worth stressing:

- **`contact.phoneE164` must be the real number** — every WhatsApp button and every
  `tel:` link is generated from it. This is the single most important value in the file.
- **Only add real reviews** to `testimonials`, with the person's permission. The section
  stays hidden while the array is empty, so there's no pressure to invent any.

### Social accounts

`socials` in `content/site.ts` drives every social link on the site — hero, gallery
header, contact card, footer, and the `sameAs` field in the search-engine markup. Set
the URL once and all five update together:

```ts
const socials: Social[] = [
  { platform: "instagram", url: "https://www.instagram.com/zineb_hair_beauty/", handle: "@zineb_hair_beauty" },
  { platform: "tiktok",    url: "https://www.tiktok.com/@…",                    handle: "@…" },
];
```

The Instagram account is the client's, confirmed. **The TikTok entry is blank** —
fill in the real profile URL and handle. An entry with an empty `url` is filtered out
everywhere, so the site never shows a dead link; there's no need to delete the row
while the account is still being set up.

The array order is the display order. To add Facebook or Pinterest later: add the
platform to the `Social` type, add its icon to `components/Icons.tsx`, register it in
the two maps at the top of `components/SocialLinks.tsx`, then add a row here.

### TikTok videos in the gallery

`tiktokVideos` in `content/site.ts` adds an "En vidéo" block under the photo grid.
Paste the link from TikTok's **Share → Copy link**:

```ts
const tiktokVideos: TikTokVideo[] = [
  { url: "https://www.tiktok.com/@zineb_hair_beauty/video/7412345678901234567",
    caption: "Balayage caramel, avant / après" },
];
```

A bare numeric ID works too. **Short `vm.tiktok.com/…` links do not** — they carry no
video ID, so they're silently skipped; use the long URL with `/video/<id>` in it.
Anything unparseable is dropped rather than rendering a broken player. Empty array →
the whole block disappears. Two or three videos is plenty before the page gets long.

**These load on click, not on page load.** The card shows a local placeholder, and the
TikTok iframe is only inserted when the visitor presses play. I verified this: zero
network requests to tiktok.com until the click, then exactly one.

This deliberately avoids TikTok's official `embed.js`. That script runs on every page
load, weighs in at hundreds of KB, and sets third-party cookies before the visitor has
asked for anything — on a site that is otherwise fully static, it would be the single
heaviest thing on the page. Each card also carries an "Ouvrir sur TikTok" link, so the
video is still reachable if a tracker blocker stops the iframe.

One caveat I could not test: **this sandbox has no network access to tiktok.com**, so I
verified the placeholder, the click behaviour and the generated iframe URL, but never
saw a real video play. Check one on a real machine before showing the client. If the
player looks cropped, adjust `aspect-9/16` in `components/TikTokEmbed.tsx` — TikTok's
own recommended box is 325×575.

Each link's accessible name is the platform plus the handle ("Instagram :
@zineb_hair_beauty"), because both accounts may share the same handle — on screen the
icon distinguishes them, but read aloud they would otherwise be identical.

The service list, descriptions and durations are written as a sensible starting point
for a salon of this type. Read them with the client and adjust — they're normal copy,
not facts I verified about this business.

### Adding photos

1. Drop the images in `public/gallery/`.
2. Point each `gallery[].src` at them, e.g. `"/gallery/balayage-01.webp"`.
3. Keep the `alt` text descriptive in French — it's what screen readers announce and
   what Google indexes.

Recommended: portrait 4:5 (e.g. 1200×1500), `.webp`, under 300 KB each.
`next/image` handles resizing and lazy-loading from there.

The first three entries do double duty — `gallery[0]` and `gallery[1]` are the hero
composition, `gallery[2]` is the portrait in the "Le salon" section — so put the
strongest images there.

Until a `src` is set, `components/Photo.tsx` renders a soft gradient block from the
brand palette, so the layout always looks finished rather than broken.

---

## 2. Deploy

**Vercel / Netlify** — connect the repo, set the project root to this folder, and the
defaults work. Then set `url` in `content/site.ts` to the real domain so the sitemap
and share previews are correct.

**Plain static hosting** (cPanel, o2switch, OVH, any FTP host) — add to `next.config.mjs`:

```js
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true },
};
```

Then `npm run build` writes a static site to `out/` — upload that folder. Note that
`images.unoptimized` turns off automatic resizing, so compress the photos yourself first.

---

## 3. Design system

Chosen with this repo's own toolkit (`src/ui-ux-pro-max/`), from the
Beauty/Spa/Wellness product profile and the "Classic Elegant" font pairing.

**Type** — Playfair Display (headings) + Inter (body), self-hosted at build time by
`next/font`, so there's no render-blocking request to Google.

**Colour** — tokens are defined once in `app/globals.css` under `@theme`:

| Token | Hex | Use |
|---|---|---|
| `cream` | `#FBF6F2` | page background |
| `blush` | `#F3E6E9` | soft surfaces, badges |
| `ink` | `#2A1D22` | body text |
| `deep` | `#241A1F` | dark CTA panel |
| `muted` | `#6B5560` | secondary text |
| `rose` | `#A63D62` | primary actions |
| `gold` | `#8A6D33` | eyebrows, accents |
| `rose-soft` / `gold-soft` | `#E4A8BC` / `#D4B87E` | accents **on dark only** |
| `line` | `#E7D9DD` | borders, dividers |

Every text/background pair used in the UI was measured against WCAG AA (4.5:1):

```
ink on cream    15.08   rose on cream   5.65   muted on cream   6.33
ink on blush    13.34   white on rose   6.06   gold on cream    4.53
cream on deep   15.75   rose-soft on deep 8.55 gold-soft on deep 8.82
```

`rose` on `deep` is only 2.79:1 — that's why dark sections use `rose-soft` instead.
Keep that rule if you add sections to the dark panel.

---

## 4. Accessibility & performance notes

These are deliberate; please keep them if you edit the components.

- Single `<h1>`, then `h2`/`h3` in order — verified with a DOM pass.
- Skip link ("Aller au contenu") as the first focusable element.
- Tap targets are at least 44px tall (`min-h-11` / `min-h-13`), with ≥8px spacing.
- `:focus-visible` outlines are defined globally — don't remove them for looks.
- Scroll-reveal animations only hide content once the inline `js` class is set, so if
  JavaScript fails or is disabled the full page still renders. Verified: ~3,300
  characters of content visible with JS off.
- `prefers-reduced-motion: reduce` disables the reveals and smooth scrolling.
- The sticky mobile booking bar sets `tabindex="-1"` while off-screen so it isn't a
  keyboard trap, and respects `env(safe-area-inset-bottom)` on notched phones.
- Social links are named by platform, not just handle, so two accounts sharing a
  handle don't read identically.
- TikTok play buttons are named "Lire la vidéo TikTok : <caption>", and each iframe
  gets a matching `title`, so neither is an unlabelled control.
- `LocalBusiness`/`HairSalon` JSON-LD is generated in `app/layout.tsx` from
  `content/site.ts` — hours, phone and Instagram flow straight from the content file
  into Google's rich results. It gets more useful once the address is filled in.

---

## 5. Structure

```
app/
  layout.tsx      fonts, SEO metadata, JSON-LD, skip link
  page.tsx        section order
  globals.css     design tokens + reveal animation
  icon.svg        favicon
  sitemap.ts / robots.ts
components/       one file per section, plus Photo / Reveal / Icons / SocialLinks /
                  TikTokEmbed
content/site.ts   ← all editable content
lib/booking.ts    WhatsApp + tel link builders, hours helpers
lib/tiktok.ts     TikTok URL → video ID, embed URL
```

To reorder sections, edit `app/page.tsx`. To remove one, delete its line there.

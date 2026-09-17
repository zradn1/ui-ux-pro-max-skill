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
| Phone line | `contact.phoneE164` / `contact.phoneDisplay` | ✅ `0783 785 925` → `+33783785925` |
| WhatsApp number | `contact.whatsappE164` | ✅ `+212783785925` — separate field |
| Email (optional) | `contact.email` | empty → button hidden |
| Street & city | `address.street`, `address.city` | empty → address block hidden |
| Google Maps link | `address.mapsUrl` | empty → "Itinéraire" link hidden |
| Opening hours | `hours` | ✅ Tue–Sun 12:00–22:00, Mon closed — confirmed |
| Service descriptions | `services[].description` | 2 of 4 intentionally empty |
| Photos | `gallery[].src` | empty → gradient placeholders |
| Logo files | `logo.src` / `logo.stackedSrc` | ✅ both lockups in place |
| Reviews | `testimonials` | empty → **whole section hidden** |
| TikTok account | `socials` → `platform: "tiktok"` | empty → **hidden everywhere** |
| TikTok videos | `tiktokVideos` | empty → **video block hidden** |
| Final domain | `url` | `https://example.com` |

Two things worth stressing:

- **The phone line and WhatsApp are two separate fields, on two different country
  codes.** `contact.phoneE164` is `+33783785925` and feeds the four `tel:` links, the
  number shown on screen, and the structured data. `contact.whatsappE164` is
  `+212783785925` (Morocco) and feeds all eighteen WhatsApp links. The salon confirmed
  this split explicitly.

  Worth re-checking on a real phone: the two numbers share the same nine digits
  (`783785925`) and differ only in country code. If the salon's line is in fact the
  Moroccan one, then tapping the displayed `0783 785 925` from France would dial an
  unrelated French subscriber. If that turns out to be the case, set `phoneE164` to
  `+212783785925` and `phoneDisplay` to `+212 783 785 925` — two lines, and every
  `tel:` link follows.

### Opening hours

`hours` holds one entry per day in 24-hour `HH:MM`, which is what the structured data
Google reads expects. The French `12h00` form is produced at render time.

Consecutive days sharing the same times are collapsed automatically by `groupedHours()`
in `lib/booking.ts`, so the card shows two lines rather than seven:

```
Mardi → Dimanche      12h00 → 22h00
Lundi                 Fermé
```

The array starts on **Tuesday**, not Monday. That is deliberate: the grouping walks the
array in order, and a Monday-first order would split the open run into two pieces
("Mardi → Dimanche" would become "Mardi → Samedi" plus a stray "Dimanche"). If you
change the hours so a day differs, the display re-splits on its own — nothing to edit
in the component.
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

### Services

`services` holds the salon's four confirmed services, flat — no categories, no prices,
no durations. An earlier, longer list turned out not to match what the salon actually
offers, so **do not add to this array without confirmation**.

There are no `price` or `duration` fields at all any more. They were removed from the
`Service` type rather than left empty, so there is nothing to accidentally fill with a
guess.

`description` is optional, and two of the four are deliberately blank:

| Service | Description | Why |
|---|---|---|
| Balayage Ombré | ✅ | The name names the technique; describing it invents nothing |
| Protéine | ✅ | Kept to what "protéine" means in hair care, nothing about protocol |
| Soin cheveux | — | Already its own summary; anything more would specify a protocol |
| Cils | — | Could be extensions, a lash lift or a tint — writing one would be a guess |

The rows are built so a missing description simply closes up. If the salon tells you
what "Cils" and "Soin cheveux" actually cover, add the text and it appears.

### The logo

Both lockups the salon supplied are in `public/`, already wired up:

| Slot | File | Used in | Rendered at |
|---|---|---|---|
| `src` | `logo-horizontal.webp` (1000×475) | header | 118×56 desktop, 93×44 mobile |
| `stackedSrc` | `logo-square.webp` (700×698) | footer | 128px tall |

**What was done to the originals.** They arrived as transparent PNGs, 2172×724 and
1254×1254. Two changes:

1. **Trimmed the transparent padding.** The horizontal file's artwork was only
   1268×602 inside a 2172×724 canvas — roughly 20% dead space each side. That padding
   counts toward the CSS height, so the logo rendered about a fifth smaller than the
   space it occupied. Cropping to the artwork means `h-14` really is 56px of logo. The
   trim also changes the true aspect ratio from 3.00 to 2.105, which is why `width`
   and `height` read the way they do.
2. **Resized and re-encoded as lossless WebP.** 437KB and 439KB became 165KB and
   125KB with no quality loss. Sizes were chosen for the largest place each is used,
   with 3× headroom for high-density screens.

The originals are untouched on your machine — keep them for print and for any future
resize, since these web copies are downscaled.

**The header logo needs its height.** This lockup stacks three lines of text
("Zineb.", "HAIR & BEAUTY", and the baseline). At the 40px I first tried, each line
fell under 8px and turned to mush. 56px in an 80px bar is the working compromise; if
you shrink it, the two smaller lines stop being readable.

### Icons

- `app/icon.svg` — the browser-tab favicon. **Deliberately not the real monogram.**
  Tabs render favicons at 16–32px, and the illustrated mark (hair strands plus a face
  in profile) is unreadable at that size — I rendered it at 16px to check. So the icon
  keeps the brand's geometry and colours (espresso `#3d2317`, cream, a rose dot,
  all sampled off the logo) in a shape that survives. Cream on espresso measures
  13.5:1.
- `app/apple-icon.png` — 180×180, and this one **is** the real monogram, cropped from
  the horizontal lockup on a cream ground. At 180px the detail holds up. Opaque on
  purpose: iOS flattens these, and transparency would render black.

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
components/       one file per section, plus Logo / Photo / Reveal / Icons /
                  SocialLinks / TikTokEmbed
content/site.ts   ← all editable content
lib/booking.ts    WhatsApp + tel link builders, hours helpers
lib/tiktok.ts     TikTok URL → video ID, embed URL
```

To reorder sections, edit `app/page.tsx`. To remove one, delete its line there.

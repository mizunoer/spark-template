# Mythic-RX Brand Kit

This folder is the single source of truth for the **mythic-rx.com** brand. It mirrors the brand-kit structure used by sister brands so launch tooling stays operationally aligned, but every asset inside is **Mythic-RX–specific**. Do not reuse sister-brand files here.

## Folder map

| Folder | Purpose |
|---|---|
| `email/` | Email-signature lockups (PNG + HTML snippet) sized for Gmail, Outlook, Apple Mail. |
| `logo/` | Light-background primary logo lockups (horizontal + stacked) in PNG. |
| `marketing/` | Larger print/marketing exports — sales decks, conference posters, sponsorship one-sheets. |
| `marks/` | The standalone Mythic-RX "M" mark — favicon source, app icon source, mark-only export. |
| `reversed/` | Logo lockups for dark backgrounds (white / knockout). |
| `social/` | Social avatars (1:1 square crops, 1024×1024) and OG images (1200×630). |
| `source/` | Native vector source files (`.ai`) — designers only. Do not link to these from public pages. |
| `svg/` | Production SVGs — the canonical scalable assets. Use these on web wherever possible. |
| `transparent-png/` | Transparent-background PNG exports of the SVGs above for tools that can't render SVG. |
| `web/` | Pre-packaged favicons, manifest, and `mrx-brand.css` — drop-in for the website. |

## Brand palette (source of truth)

Defined in `assets/css/mythic-rx.css` `:root` block. Summary:

- `--mrx-blue` — `#1E6B3A` Translucent Forest (primary)
- `--mrx-cyan` — `#0F4D2E` Deep Emerald (mid-stop / hover)
- `--mrx-teal` — `#0B3A20` Evergreen (gradient end / dark accent)
- `--mrx-navy` — `#072517` Darker Evergreen (deep dark backgrounds)
- `--mrx-mint` — `#CFE3CC` Soft Mint (light surfaces / badges)
- Charcoal text: `#2E2E2E`. Stone muted: `#4A4A4A`. Fog: `#DADAD3`.
- Gold accent (used sparingly for ratings, highlights): `#F8DE70`.

## Usage rules

1. **Web pages** should reference `assets/img/...` (favicons, headers) and `assets/css/mythic-rx.css` (palette). The brand-kit folder is the upstream source; the web folder under `assets/img/` is the deployed copy.
2. **Email** signatures use PNG (`email/`) — never link to local SVGs in emails; many clients block external CSS/SVG.
3. **Marketing** at print scale uses the `.ai` from `source/` exported at 300dpi, or large PNGs from `marketing/`.
4. **Social avatars** use the square 1024×1024 export in `social/`. The `<meta property="og:image">` references `assets/img/og-image.png`.
5. **Reversed logo** is required on any dark background where contrast against the green primary lockup would drop below WCAG 4.5:1.
6. **Do not stretch, recolor, or distort** the mark. If a use case needs a new lockup, request a new export from the source `.ai`.

## Brand-kit preview

Open `brand-kit-preview.html` in a browser to see every lockup, palette, and favicon side-by-side. This is the single QA surface a designer or stakeholder reviews before any external use.

## File-naming conventions

- All-lowercase, kebab-case.
- Prefixed `mythic-rx-` so files don't collide with template downloads.
- Variant suffixes: `-horizontal`, `-stacked`, `-mark-only`, `-reversed`, `-app-icon`, `-website-header`, `-email-signature`, `-social-avatar`.
- File extension reflects the export: `.svg` for vector, `.png` for raster.

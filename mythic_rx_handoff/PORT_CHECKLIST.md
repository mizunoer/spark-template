# Port Checklist — Nume → Mythic-RX

Work top-to-bottom. Each step has a clear "done when" line. Do not start a step before the previous one is green.

---

## Phase 1 — Brand foundation

### 1.1 Stand up the brand-kit folder

Create `mythic_rx_brand_kit/` at the Mythic-RX repo root with this structure:

```
mythic_rx_brand_kit/
  README.md
  brand-kit-preview.html
  email/
  logo/
  marketing/
  marks/
  reversed/
  social/
  source/
  svg/
  transparent-png/
  web/
```

**Done when** the directory tree exists and `README.md` describes intended use of each subfolder.

### 1.2 Generate or import Mythic-RX logo assets

Required deliverables (mirror Nume's set):

- `svg/mythic-rx-primary-horizontal.svg`
- `svg/mythic-rx-stacked.svg`
- `svg/mythic-rx-mark-only.svg`
- `svg/mythic-rx-reversed-horizontal.svg`
- `svg/mythic-rx-app-icon.svg`
- `svg/mythic-rx-email-signature.svg`
- `svg/mythic-rx-social-avatar.svg`
- `svg/mythic-rx-website-header.svg`
- Matching `transparent-png/` versions of each

**Done when** all SVGs render in a browser and PNGs are exported at the file sizes Nume produced (header logos around 30–60kb, app icon at 1024px, etc.).

### 1.3 Drop favicon set into `assets/img/`

Required at the Mythic-RX repo root, under `assets/img/`:

```
favicon.svg
favicon.ico
favicon-16x16.png
favicon-32x32.png
favicon-48x48.png
apple-touch-icon.png            (180x180)
android-chrome-192x192.png
android-chrome-512x512.png
og-image.png                    (1200x630)
social-avatar.png
email-signature.png
marketing-primary.png
marketing-reversed.png
app-icon-1024.png
logo/logo.svg
logo/logo.png
logo/logo-mobile.png
logo/logo-stacked.svg
logo/mark.svg
logo/mark.png
logo/white_logo.svg
logo/white_logo.png
```

**Done when** all paths resolve in a browser and `<link rel="icon" type="image/svg+xml" href="assets/img/favicon.svg">` shows the Mythic-RX mark in the tab.

### 1.4 Add `site.webmanifest`

Mirror Nume's at the repo root. Update `name`, `short_name`, `theme_color`, `background_color` to Mythic-RX values.

**Done when** Lighthouse passes the manifest check.

### 1.5 Create `assets/css/mythic-rx.css`

Use `templates/mythic-rx.tokens.css` from this handoff folder as the `:root` block. Then port the rest of Nume's `assets/css/nume-health.css` body (overrides, components, utility classes), renaming every `--nume-*` to `--mrx-*` and every `nume-health` text reference to `mythic-rx`.

**Done when** the file parses with no CSS errors and `--mrx-primary`, `--mrx-gradient`, `--mrx-shadow`, `--mrx-radius` resolve to real values.

---

## Phase 2 — Site-wide application

### 2.1 Update `inc/header.html` and `inc/footer.html`

Swap logo `<img src>` paths and any text mentions of the brand. Keep navigation structure.

**Done when** every page that includes these partials shows the Mythic-RX logo and footer text.

### 2.2 Update existing public pages

For each page already present in the Mythic-RX repo (do **not** create new ones here):

- Replace logo references in any inline header/footer markup not pulled from `inc/`.
- Replace `<title>` and meta description brand text.
- Confirm `<link rel="stylesheet" href="assets/css/mythic-rx.css">` is present.
- Confirm favicon `<link>` block is present.

**Done when** opening each page shows Mythic-RX branding end-to-end.

---

## Phase 3 — Landing system

### 3.1 Port `assets/css/landing.css`

Copy Nume's file verbatim. The `lp-*` class names are brand-neutral. The only thing that may need adjustment is references to `--nume-*` CSS variables — change those to `--mrx-*`.

**Done when** the file references only `--mrx-*` variables and no `--nume-*` survive.

### 3.2 Drop in `assets/js/landing-config.js`

Use `templates/landing-config.template.js` from this handoff folder. It is already renamed (`MRX_CONFIG`, "Mythic-RX") with every value reset to `[CLIENT TO CONFIRM]`.

**Done when** the file is at `assets/js/landing-config.js` and contains `window.MRX_CONFIG = {`.

### 3.3 Port `assets/js/landing-render.js`

Copy Nume's file. Apply two renames:

- `window.NUME_CONFIG` → `window.MRX_CONFIG`
- `window.numeTrack` → `window.mrxTrack`
- `console.debug("[nume.track]", eventName)` → `console.debug("[mrx.track]", eventName)`

Everything else (the binding logic, the `data-bind` selectors, `gtag`/`fbq` calls) stays identical.

**Done when** the file references only `MRX_CONFIG` and `mrxTrack` — zero `nume` survives.

### 3.4 Port the 5 landing pages

For each of:

- `glp1-cash-pay.html`
- `glp1-pricing.html`
- `weight-care-online.html`
- `switch-glp1-provider.html`
- `glp1-faq.html`

Apply only:

- Brand-name swaps in `<title>`, meta description, OG tags, header/footer text, canonical URL.
- Logo `<img src>` swaps.
- `assets/css/nume-health.css` → `assets/css/mythic-rx.css` in the `<link>` block.
- `theme-color` meta value updated to the Mythic-RX primary color hex.

**Do not modify**:

- The page structure.
- Any `data-bind`, `data-bind-attr`, `data-bind-list`, `data-bind-show`, or `data-track` attributes.
- The `lp-*` CSS class names.
- The fallback default copy inside the bound elements (the renderer leaves these in place when a value is null).

**Done when** all 5 pages load without console errors and unfilled values render as yellow `[CLIENT TO CONFIRM]` placeholders.

---

## Phase 4 — Tooling and tracker

### 4.1 Port `Client_Onboarding.html`

- Update `<title>` and the on-page hero copy to "Mythic-RX".
- In the Export function, change the emitted file content to start with `window.MRX_CONFIG = {`.
- Update the localStorage key from `nume_onboarding_v1` (or whatever Nume uses) to `mrx_onboarding_v1` so the two repos do not collide if both are opened in the same browser.

**Done when** the form saves drafts to `mrx_onboarding_v1` in localStorage and exports a `landing-config.js` that the renderer accepts.

### 4.2 Port `Marketing_Next_Steps.html`

- Update hero copy and meta title to Mythic-RX.
- Update internal links so each "What we shipped today" tile points to the Mythic-RX file path (which is the same string, just under a different repo).
- Reset every status pill to its default state:
  - All compliance gates → `pill-blocked` ("Blocking") or `pill-client` ("Awaiting client") — exactly as Nume is on day one.
  - All client deliverables → `pill-client` ("Pending").
  - All dev tasks → `pill-todo` ("Open").
- Verify the four stat cards still read **5 / 13 / 4 / 3**.

**Done when** opening the page shows the four counts above and matches the Nume layout, but with Mythic-RX branding.

### 4.3 Port `Update_Colors.html` and `ImageSelection.html`

These are internal client-facing tools. Update brand text and previews; keep the picker UX identical. The "selected" color set in `Update_Colors.html` should reflect Mythic-RX's actual brand palette (whatever you placed in `templates/mythic-rx.tokens.css`).

**Done when** both pages load and the previewed assets/colors match the new Mythic-RX brand kit.

---

## Phase 5 — Verification

Run these checks before reporting done.

1. From the Mythic-RX repo root:
   ```
   rg -l "nume|NUME_CONFIG|numeTrack|--nume-|nume-health"
   ```
   Should return **zero results**.

2. Open each landing page in a browser. DevTools console should be clean (only the `[mrx.track] page_view` debug line).

3. In `Marketing_Next_Steps.html`, the four stat cards must read **5 · 13 · 4 · 3**.

4. In `Client_Onboarding.html`, click "Export config". The downloaded file must:
   - Start with `window.MRX_CONFIG = {`.
   - Be droppable into `assets/js/landing-config.js` without syntax errors.

5. Open `glp1-cash-pay.html` after dropping in the exported config. The hero `[CLIENT TO CONFIRM]` placeholders should now show real values (whichever the client filled in).

If all five checks pass, the port is done.

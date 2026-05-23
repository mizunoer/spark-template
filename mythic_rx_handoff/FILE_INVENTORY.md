# File Inventory — Nume → Mythic-RX

All Nume paths are relative to `C:\Users\Mizun\source\repos\Numi`.
All Mythic-RX paths are relative to that repo's root.

## A. Brand assets — direct port (regenerate, do not copy)

These are visual assets. The Mythic-RX agent should regenerate these from Mythic-RX's own logo lockup; do not reuse Nume's PNGs/SVGs.

| Nume path | Mythic-RX target path | Notes |
|---|---|---|
| `nume_health_brand_kit/` | `mythic_rx_brand_kit/` | Mirror folder structure: `email/ logo/ marketing/ marks/ reversed/ social/ source/ svg/ transparent-png/ web/` |
| `nume_health_brand_kit/svg/nume-health-primary-horizontal.svg` | `mythic_rx_brand_kit/svg/mythic-rx-primary-horizontal.svg` | Regenerate from MRX lockup |
| `nume_health_brand_kit/svg/nume-health-stacked.svg` | `mythic_rx_brand_kit/svg/mythic-rx-stacked.svg` | Regenerate |
| `nume_health_brand_kit/svg/nume-health-mark-only.svg` | `mythic_rx_brand_kit/svg/mythic-rx-mark-only.svg` | Regenerate |
| `nume_health_brand_kit/svg/nume-health-reversed-horizontal.svg` | `mythic_rx_brand_kit/svg/mythic-rx-reversed-horizontal.svg` | Regenerate |
| `nume_health_brand_kit/svg/nume-health-app-icon.svg` | `mythic_rx_brand_kit/svg/mythic-rx-app-icon.svg` | Regenerate |
| `nume_health_brand_kit/svg/nume-health-email-signature.svg` | `mythic_rx_brand_kit/svg/mythic-rx-email-signature.svg` | Regenerate |
| `nume_health_brand_kit/svg/nume-health-social-avatar.svg` | `mythic_rx_brand_kit/svg/mythic-rx-social-avatar.svg` | Regenerate |
| `nume_health_brand_kit/svg/nume-health-website-header.svg` | `mythic_rx_brand_kit/svg/mythic-rx-website-header.svg` | Regenerate |
| `nume_health_brand_kit/transparent-png/*.png` | `mythic_rx_brand_kit/transparent-png/*.png` | Regenerate |
| `nume_health_brand_kit/web/favicon-*.png`, `favicon.ico`, `apple-touch-icon.png`, `android-chrome-*.png`, `site.webmanifest`, `nume-brand.css` | `mythic_rx_brand_kit/web/` mirrored | Regenerate; keep filenames identical except for the `nume-brand.css` rename below |
| `nume_health_brand_kit/web/nume-brand.css` | `mythic_rx_brand_kit/web/mrx-brand.css` | Rename + update vars |
| `nume_health_brand_kit/README.md` | `mythic_rx_brand_kit/README.md` | Update brand references |
| `nume_health_brand_kit/brand-kit-preview.html` | `mythic_rx_brand_kit/brand-kit-preview.html` | Update brand references |

## B. Web favicon set — `assets/img/`

| Nume path | Mythic-RX target path |
|---|---|
| `assets/img/favicon.svg` | `assets/img/favicon.svg` |
| `assets/img/favicon.ico` | `assets/img/favicon.ico` |
| `assets/img/favicon-16x16.png` | same |
| `assets/img/favicon-32x32.png` | same |
| `assets/img/favicon-48x48.png` | same |
| `assets/img/apple-touch-icon.png` | same |
| `assets/img/android-chrome-192x192.png` | same |
| `assets/img/android-chrome-512x512.png` | same |
| `assets/img/og-image.png` | same |
| `assets/img/social-avatar.png` | same |
| `assets/img/email-signature.png` | same |
| `assets/img/marketing-primary.png` | same |
| `assets/img/marketing-reversed.png` | same |
| `assets/img/app-icon-1024.png` | same |
| `assets/img/logo/logo.svg` | same |
| `assets/img/logo/logo.png` | same |
| `assets/img/logo/logo-mobile.png` | same |
| `assets/img/logo/logo-stacked.svg` | same |
| `assets/img/logo/mark.svg` | same |
| `assets/img/logo/mark.png` | same |
| `assets/img/logo/white_logo.svg` | same |
| `assets/img/logo/white_logo.png` | same |
| `site.webmanifest` (root) | same |

All filenames stay identical so HTML references do not need to change. Only the **content** of these files differs.

## C. Stylesheet / scripts — port + rename

| Nume path | Mythic-RX target path | Notes |
|---|---|---|
| `assets/css/nume-health.css` | `assets/css/mythic-rx.css` | Rename file. Inside, replace every `--nume-*` CSS variable with `--mrx-*`, and every "Nume Health" text reference with "Mythic-RX". Keep gradient/shadow/radius structure. |
| `assets/css/landing.css` | `assets/css/landing.css` | Same path. Replace any `--nume-*` references with `--mrx-*`. Class names (`lp-*`) stay. |
| `assets/css/style.css` | `assets/css/style.css` | If present in MRX, leave alone. Nume only made a 2-byte change here. |
| `assets/js/landing-config.js` | `assets/js/landing-config.js` | Use `templates/landing-config.template.js` from this handoff. |
| `assets/js/landing-render.js` | `assets/js/landing-render.js` | Port verbatim with the renames documented in `TOKEN_RENAME_MAP.md`. |

## D. Landing pages

| Nume path | Mythic-RX target path |
|---|---|
| `glp1-cash-pay.html` | `glp1-cash-pay.html` |
| `glp1-pricing.html` | `glp1-pricing.html` |
| `weight-care-online.html` | `weight-care-online.html` |
| `switch-glp1-provider.html` | `switch-glp1-provider.html` |
| `glp1-faq.html` | `glp1-faq.html` |

## E. Internal tools and tracker

| Nume path | Mythic-RX target path | Notes |
|---|---|---|
| `Client_Onboarding.html` | `Client_Onboarding.html` | Update brand text + export emits `window.MRX_CONFIG = {` + localStorage key changes. |
| `Marketing_Next_Steps.html` | `Marketing_Next_Steps.html` | Update brand text. Reset all status pills to default. |
| `Update_Colors.html` | `Update_Colors.html` | Update palette samples to Mythic-RX colors. |
| `ImageSelection.html` | `ImageSelection.html` | Update logo/favicon previews to Mythic-RX assets. |

## F. Site-wide pages — light touch

For each of these, only update brand text, logo references, and CSS link path. Do **not** restructure.

| Nume path | Mythic-RX target path |
|---|---|
| `index.html` | `index.html` (if present) |
| `index-2.html` | `index-2.html` (if present) |
| `index-3.html` | `index-3.html` (if present) |
| `assessment.html` | `assessment.html` (if present) |
| `cart.html` | `cart.html` (if present) |
| `checkout.html` | `checkout.html` (if present) |
| `contact.html` | `contact.html` (if present) |
| `login.html` | `login.html` (if present) |
| `register.html` | `register.html` (if present) |
| `reset-password.html` | `reset-password.html` (if present) |
| `shop.html` | `shop.html` (if present) |
| `shop-details.html` | `shop-details.html` (if present) |
| `recommendations.html` | `recommendations.html` (if present) |
| `thank-you.html` | `thank-you.html` (if present) |
| `inc/header.html` | `inc/header.html` (if present) |
| `inc/footer.html` | `inc/footer.html` (if present) |

If a file in this list is **not** in the Mythic-RX repo, skip it. Do not create it.

## G. Files NOT to port

- Anything under `project documents/` (Nume-specific working docs and brand guide PDFs).
- `.vs/`, `*.suo`, `*.sln`, `Web.config`, `index.php`, `.htaccess`, `ssl-manager.php` — environment-specific to Nume's Visual Studio + IIS setup. Mythic-RX may use a different stack.
- Any file in `Template1/` through `Template4/` — unused theme scaffolding.

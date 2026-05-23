# Token Rename Map — Nume → Mythic-RX

Apply these renames mechanically across every ported file. Use a case-sensitive editor or `rg`/`sed` with care — search for the longest forms first to avoid double-replacement.

## 1. JavaScript globals

| Nume identifier | Mythic-RX identifier | Where it appears |
|---|---|---|
| `window.NUME_CONFIG` | `window.MRX_CONFIG` | `landing-config.js`, `landing-render.js`, `Client_Onboarding.html` (export function), all 5 landing pages (none reference it directly — the renderer handles it) |
| `NUME_CONFIG` | `MRX_CONFIG` | Any reference, including the `var cfg = window.NUME_CONFIG \|\| {};` line in the renderer |
| `window.numeTrack` | `window.mrxTrack` | `landing-render.js` |
| `numeTrack(` | `mrxTrack(` | Any inline JS that calls the tracker |
| `console.debug("[nume.track]", ...)` | `console.debug("[mrx.track]", ...)` | `landing-render.js` |

## 2. CSS custom properties (design tokens)

Every variable on Nume's `:root` starts with `--nume-`. Rename to `--mrx-`. The full set:

| Nume var | Mythic-RX var |
|---|---|
| `--nume-blue` | `--mrx-blue` |
| `--nume-cyan` | `--mrx-cyan` |
| `--nume-teal` | `--mrx-teal` |
| `--nume-navy` | `--mrx-navy` |
| `--nume-slate-gray` | `--mrx-slate-gray` |
| `--nume-mint` | `--mrx-mint` |
| `--nume-offwhite` | `--mrx-offwhite` |
| `--nume-slate` | `--mrx-slate` |
| `--nume-white` | `--mrx-white` |
| `--nume-primary` | `--mrx-primary` |
| `--nume-primary-dark` | `--mrx-primary-dark` |
| `--nume-accent` | `--mrx-accent` |
| `--nume-accent-dark` | `--mrx-accent-dark` |
| `--nume-link` | `--mrx-link` |
| `--nume-link-hover` | `--mrx-link-hover` |
| `--nume-heading` | `--mrx-heading` |
| `--nume-text` | `--mrx-text` |
| `--nume-text-muted` | `--mrx-text-muted` |
| `--nume-light` | `--mrx-light` |
| `--nume-border` | `--mrx-border` |
| `--nume-gradient` | `--mrx-gradient` |
| `--nume-gradient-dark` | `--mrx-gradient-dark` |
| `--nume-shadow` | `--mrx-shadow` |
| `--nume-shadow-hover` | `--mrx-shadow-hover` |
| `--nume-shadow-soft` | `--mrx-shadow-soft` |
| `--nume-radius` | `--mrx-radius` |
| `--nume-radius-lg` | `--mrx-radius-lg` |
| `--nume-transition` | `--mrx-transition` |

A safe regex (apply only after confirming you are inside ported files, not the Nume repo):

```
--nume-   →   --mrx-
```

The Suxnix template overrides at the bottom of the file (`--tg-primary-color`, etc.) keep their `--tg-*` names because they belong to the template, not the brand. Their **values** still need to point at the new `--mrx-*` vars.

## 3. CSS class names

These class prefixes are brand-neutral. Do **not** rename them:

- `lp-*` (landing pages — `lp-page`, `lp-hero`, `lp-trust`, `lp-btn`, etc.)
- `ob-*` (onboarding form)
- `ns-*` (next-steps tracker)
- `tg-*` (Suxnix template — third-party)
- `pill-*` (status pills in tracker)

Renaming these would force a CSS-and-HTML rewrite for no brand benefit.

## 4. File names

| Nume file | Mythic-RX file |
|---|---|
| `assets/css/nume-health.css` | `assets/css/mythic-rx.css` |
| `nume_health_brand_kit/` | `mythic_rx_brand_kit/` |
| `nume_health_brand_kit/web/nume-brand.css` | `mythic_rx_brand_kit/web/mrx-brand.css` |
| `nume-health-*.svg` (in brand kit) | `mythic-rx-*.svg` |
| `nume-health-*.png` (in brand kit) | `mythic-rx-*.png` |

Do **not** rename:

- `assets/css/landing.css` (brand-neutral)
- `assets/js/landing-config.js` (filename stays; only contents change)
- `assets/js/landing-render.js` (filename stays; only contents change)
- The 5 landing-page filenames (`glp1-cash-pay.html`, etc.) — they are SEO URL paths.
- `Client_Onboarding.html`, `Marketing_Next_Steps.html`, `Update_Colors.html`, `ImageSelection.html` — generic internal-tool names.

## 5. Brand text in copy

Case-sensitive global swaps inside ported HTML:

| Find | Replace |
|---|---|
| `Nume Health` | `Mythic-RX` |
| `nume-health.com` | `mythic-rx.com` |
| `Nume Medical PC` (example placeholder) | reset to `[CLIENT TO CONFIRM]` |
| `support@nume-health.com` (example) | reset to `[CLIENT TO CONFIRM]` |
| `assets/img/favicon.svg` | unchanged (path is the same; only the file's contents are different) |

Do not blindly replace lowercase `nume` with `mrx` because it can collide with HTML attributes or CSS prefixes that already have a different meaning. Use word-boundary searches.

## 6. localStorage keys

In `Client_Onboarding.html`, the form persists draft progress to localStorage. Find the key Nume uses (e.g. `nume_onboarding_v1`) and rename to `mrx_onboarding_v1`. This prevents the two repos' onboarding drafts from colliding when both pages are open in the same browser.

## 7. Theme color

The `<meta name="theme-color">` tag uses Nume's primary blue (`#0077B6`). Replace with Mythic-RX's primary brand hex once decided. Until then, leave a placeholder you can grep for: `#000000 /* MRX_THEME_COLOR_PENDING */`.

## 8. Tracking event names — DO NOT rename

These stay generic and are **not** brand-prefixed:

- `page_view`
- `cta_click`
- `cta_click_header`
- `cta_click_hero`
- `cta_click_pricing`
- `quiz_started`
- `quiz_completed`
- `eligibility_submitted`

GA4 / Meta CAPI taxonomies are shared across both sites. Brand-prefixing these would break analytics rollups.

## Verification grep

After all renames, this command run from the Mythic-RX repo root must return zero results:

```
rg "nume|NUME_CONFIG|numeTrack|--nume-|nume-health|Nume Health|Nume Medical"
```

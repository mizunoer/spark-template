# `data-bind` Renderer Reference

`assets/js/landing-render.js` is a tiny dependency-free template engine that hydrates a static HTML page from a single config object on `window` (`MRX_CONFIG` on Mythic-RX). Read this before editing landing pages.

## Lifecycle

1. The page loads with **fallback default copy** baked into every bound element — so it renders fine even if the script fails or the config is missing.
2. `landing-config.js` runs first. It sets `window.MRX_CONFIG`.
3. `landing-render.js` runs after. On `DOMContentLoaded` it walks the DOM and overwrites bound elements with config values.
4. Missing values leave the fallback copy untouched.
5. Values that are still `[CLIENT TO CONFIRM]` render as a yellow placeholder (CSS class `lp-placeholder` is applied) so QA spots them immediately.

## Binding directives

### Text bindings — `data-bind="path.to.value"`

```html
<span data-bind="product.monthlyPrice">$XXX</span>
```

Reads `MRX_CONFIG.product.monthlyPrice`. If the value is a string, it replaces the element's text content. If it's an array, it joins with `, `.

### Attribute bindings — `data-bind-attr="attr1:path1; attr2:path2"`

```html
<a data-bind-attr="href:disclosures.privacyPolicyUrl">Privacy</a>
```

Sets the named HTML attribute(s) from the config path(s). Multiple attribute bindings are separated with `;`. Placeholder values (`[CLIENT TO CONFIRM]`) are skipped — the existing attribute stays as the fallback.

### List bindings — `data-bind-list="path" data-bind-list-tpl="<li>{value}</li>"`

For arrays of strings:

```html
<ul data-bind-list="product.included" data-bind-list-tpl="<li>{value}</li>"></ul>
```

For arrays of objects, use `{key}` per property:

```html
<ul data-bind-list="trust.testimonials"
    data-bind-list-tpl='<li><blockquote>{quote}</blockquote><cite>{author} — {meta}</cite></li>'>
</ul>
```

If the list is empty or contains only placeholders, the element is left untouched (preserving the fallback markup).

### Visibility — `data-bind-show="path"`

```html
<div data-bind-show="product.firstMonthPrice">First-month promo: <span data-bind="product.firstMonthPrice"></span></div>
```

Hides the element with `style.display = "none"` when the value is null, empty, an empty array, or a placeholder. Otherwise leaves the element visible.

### Tracking — `data-track="event_name"`

```html
<a class="lp-btn" data-track="cta_click_hero">Get started</a>
```

Click events bubble to the document; the renderer's listener calls `mrxTrack(eventName)`, which forwards to `gtag` and `fbq` if present, then logs to `console.debug`.

## Config schema reference

The full schema lives in `templates/landing-config.template.js`. The top-level keys, with brief notes:

```
brand            { name, domain, supportEmail, supportPhone, supportHours }
product          { label, publicName, medication, monthlyPrice, annualMonthlyPrice,
                   firstMonthPrice, included[], refillCadence, cancellation, refund }
product2         null  | same shape as product
states           { served[], notServedNote }
clinical         { prescribingEntity, providerNetwork, pharmacyPartners,
                   labRequirement, intakeSLA, shippingSLA }
trust            { badges[], testimonials[ {quote, author, meta} ] }
disclosures      { compoundedMedication, prescriptionNotGuaranteed, safetyShort,
                   privacyPolicyUrl, termsUrl, telehealthConsentUrl, consumerHealthDataUrl }
pages            { cashPay, pricing, weightCareOnline, switchProvider, faq }
                 each: { eyebrow, h1, subhead, ctaPrimary?, ctaSecondary? }
```

## Authoring rules for landing pages

- **Always include a fallback inside the bound element.** It must read correctly even if the renderer never runs (SEO + JS-disabled). Example: `<span data-bind="product.monthlyPrice">$XXX</span>`.
- **Never put PHI in the config.** The config is a single static JS file shipped to every visitor. Names, dosing, A1c, conditions — all forbidden.
- **Never put PHI in tracked events.** `mrxTrack` only takes a string event name. There is no second argument by design.
- **Use `data-bind-show` for any block that should disappear when its data is missing.** Don't leave empty headings or empty `<p>` tags onscreen.
- **List templates are inline-only.** They cannot reference external JS or call functions — only `{value}` and `{key}` substitutions.

## Adding a new bound element to a landing page

1. Decide which config key it maps to. Add the key to `landing-config.template.js` if it doesn't exist.
2. Add a fallback default value to the new key.
3. In the HTML, add `data-bind="..."` (or `data-bind-attr=`, `data-bind-list=`, `data-bind-show=`) with the dotted path.
4. Put a sane fallback inside the element so the page works without JS.

That's the whole protocol. The renderer is ~140 lines — read it directly when in doubt.

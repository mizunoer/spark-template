# Agent Brief — Adopt Nume's launch *system* on Mythic-RX.com (without overwriting Mythic-RX's goals)

> Paste this entire file as the opening prompt to the second Cursor agent working in the Mythic-RX.com repo.

## Read this first — what this port is, and what it isn't

A sister site, **nume-health.com**, just shipped a launch system: a brand kit, design tokens, a config-driven landing-page renderer (`data-bind`), a single client-onboarding form that exports the config, and an internal action tracker with status pills, compliance gates, deliverables, dev tasks, and channel guardrails.

You are bringing that **system** — the methods, functions, file layout, status grammar, and review concepts — to **mythic-rx.com**. You are **not** copying Nume's audience strategy, page set, or marketing copy.

The two sites are different products with different audiences:

| | nume-health.com | mythic-rx.com |
|---|---|---|
| Audience | Direct-to-consumer patients seeking cash-pay GLP-1 | **Partner physicians and clinic operators** |
| Buying motion | Patient eligibility quiz → cash-pay subscription | **Practice-level partnership / referral / fulfillment relationship** |
| Primary CTAs | "See if I qualify" / "View pricing" | **"Become a partner" / "Request formulary" / "Schedule a consult"** (or whatever Mythic-RX already uses) |
| Compliance focus | LegitScript, Google Healthcare Merchant, Meta/TikTok ad approval | **HIPAA Business Associate Agreements, partner agreements, per-state pharmacy & clinician licensing, EMR/integration security, off-label claim review** |
| Channels | Google Search + Meta + TikTok | **Medical society partnerships, conferences, KOL outreach, LinkedIn for HCPs, referral programs, sales enablement** |

Mythic-RX **already has** its own product positioning, voice, target segments, and (likely) existing landing pages aimed at partner physicians. **Do not overwrite any of that.** Your job is to layer Nume's system underneath the existing Mythic-RX content so it becomes config-driven, brandable, and trackable — not to replace it.

## Authoritative document

**This brief overrides every other document in the handoff folder where they conflict.** The supporting docs were drafted assuming a 1:1 Nume clone. Reinterpret them through the lens described below before acting on them.

| Supporting doc | How to read it for Mythic-RX |
|---|---|
| `PORT_CHECKLIST.md` | Phases 1–2 (brand foundation, site-wide application) apply as written. Phase 3 (landing system) applies, but you do **not** port Nume's 5 GLP-1 pages — instead you retrofit Mythic-RX's existing partner pages with the same `data-bind` plumbing. Phase 4 (tooling/tracker) applies, but the form fields and tracker rows are rewritten for the partner-physician audience (see "Reframe for B2B audience" below). |
| `FILE_INVENTORY.md` | Sections A–C, E (brand assets, favicons, stylesheet/scripts, internal tools/tracker) apply. **Section D (5 GLP-1 landing pages) does NOT apply** — skip it. Section F (site-wide pages) applies only for Mythic-RX pages that already exist. |
| `TOKEN_RENAME_MAP.md` | Applies fully. |
| `DATA_BIND_REFERENCE.md` | Applies fully. The renderer is audience-agnostic. |
| `COMPLIANCE_GATES.md` | The *concept* of gates and statuses applies. The *specific gates listed* (LegitScript, Google Healthcare Merchant, Meta/TikTok, etc.) are DTC-specific. Replace them with the B2B gate set in the "Reframe for B2B audience" section below. |
| `templates/landing-config.template.js` | Use it for **shape and grammar** (`MRX_CONFIG`, `[CLIENT TO CONFIRM]` placeholder convention, the pages/disclosures/brand structure). **Replace the schema content** with partner-physician fields per "Reframe for B2B audience" below. |
| `templates/mythic-rx.tokens.css` | Applies fully. |

## What carries over from Nume verbatim — the "methods and functions"

These are the parts of the system that are audience-agnostic. Adopt them as-is:

1. **Brand-kit folder structure** (`mythic_rx_brand_kit/` with `email/ logo/ marketing/ marks/ reversed/ social/ source/ svg/ transparent-png/ web/`) — same shape, Mythic-RX assets inside.
2. **Web favicon set** under `assets/img/` — same filenames, Mythic-RX content.
3. **Design tokens** in `assets/css/mythic-rx.css` — same `:root` shape, `--mrx-*` names, gradient/shadow/radius pattern.
4. **Shared landing CSS** at `assets/css/landing.css` — port verbatim with `--nume-*` → `--mrx-*`. Class names (`lp-*`) stay identical.
5. **Renderer** at `assets/js/landing-render.js` — port with `NUME_CONFIG` → `MRX_CONFIG`, `numeTrack` → `mrxTrack`, `[nume.track]` → `[mrx.track]`. Logic is unchanged.
6. **Config-driven binding pattern** — `data-bind`, `data-bind-attr`, `data-bind-list`, `data-bind-show`, `data-track`. Used the same way on Mythic-RX pages.
7. **`[CLIENT TO CONFIRM]` placeholder convention** — every unfilled value renders as a yellow placeholder via the `lp-placeholder` class so QA spots gaps instantly.
8. **Status pill grammar** — `pill-done` (green / Done), `pill-prog` (blue / In progress), `pill-blocked` (red / Blocking), `pill-client` (amber / Awaiting client / Pending), `pill-todo` (gray / Open). Use the same five statuses on Mythic-RX's tracker.
9. **Action-tracker layout** — stat cards on top, then numbered sections: (1) what we shipped, (2) compliance/launch gates, (3) client deliverables, (4) launch sequence, (5) open dev tasks, (6) channel guardrails. Same shape, different content.
10. **Onboarding-form export pattern** — single HTML form with localStorage autosave that produces a drop-in `landing-config.js`. Same UX, different fields.
11. **Selector tools** (`Update_Colors.html`, `ImageSelection.html`) — same UX patterns, branded for Mythic-RX.
12. **Privacy-safe analytics** — generic event names through `mrxTrack`. Never pass PHI; never identify a partner clinic in a client-side event payload.

## Reframe for B2B audience — what changes on Mythic-RX

### Landing pages

- **Do NOT port** `glp1-cash-pay.html`, `glp1-pricing.html`, `weight-care-online.html`, `switch-glp1-provider.html`, `glp1-faq.html`. They are patient-acquisition pages.
- **Do** retrofit Mythic-RX's existing partner-facing pages with the same `data-bind` plumbing so their copy, contacts, formulary, and disclosures all flow from `MRX_CONFIG`. If Mythic-RX already has pages like `partners.html`, `formulary.html`, `become-a-partner.html`, `clinic-resources.html`, `case-studies.html`, `contact-us.html` — those are the targets.
- Keep Mythic-RX's existing headlines, page structure, and CTA wording. Only swap hard-coded brand strings, prices, contacts, and disclosures for `data-bind` references that read from `MRX_CONFIG`.

### `MRX_CONFIG` schema — partner-physician fields

The `templates/landing-config.template.js` file has a DTC-shaped schema (consumer pricing, refund, served states for patients). Replace it with a **partner-physician** shape. Suggested keys (the second agent should refine to match Mythic-RX's actual program):

```js
window.MRX_CONFIG = {
  brand: { name, domain, partnerSupportEmail, partnerSupportPhone, partnerSupportHours },

  partnership: {
    audience: "Independent and group-practice physicians, NPs, PAs",
    propositionShort: "[CLIENT TO CONFIRM]",      // 1-line value prop for partner clinics
    onboardingTimeline: "[CLIENT TO CONFIRM]",    // e.g. "Most clinics fully onboarded in 7–10 business days"
    feeStructureSummary: "[CLIENT TO CONFIRM]",   // public-safe summary; full schedule is gated
    whiteLabelAvailable: null,                    // true | false | null
    referralModel: "[CLIENT TO CONFIRM]"          // e.g. "Co-managed prescribing", "Direct fulfillment", "Referral-only"
  },

  formulary: {
    categories: [],                               // e.g. ["Weight care (GLP-1)", "Hormone health", ...]
    medications: [],                              // [{ name, category, indication, fulfillmentNote }]
    formularyRequestUrl: "[CLIENT TO CONFIRM]"    // gated PDF / form URL
  },

  clinical: {
    medicalDirector: "[CLIENT TO CONFIRM]",       // named clinical lead, with credentials
    clinicalAdvisoryNote: "[CLIENT TO CONFIRM]",  // 1–2 sentence clinical-governance description
    pharmacyPartners: "[CLIENT TO CONFIRM]",      // licensure-attested description
    statesLicensed: ["[CLIENT TO CONFIRM]"],      // states where Mythic-RX can fulfill
    intakeSLA: "[CLIENT TO CONFIRM]",
    fulfillmentSLA: "[CLIENT TO CONFIRM]"
  },

  integrations: {
    emrIntegrations: [],                          // ["EMR1","EMR2"] or [] if none yet
    apiAvailable: null,                           // true | false | null
    integrationContact: "[CLIENT TO CONFIRM]"
  },

  legal: {
    baaProvided: null,                            // true | false | null — BAA on partner agreement
    partnerAgreementUrl: "[CLIENT TO CONFIRM]",   // gated link
    privacyPolicyUrl: "/privacy.html",
    termsUrl: "/terms.html",
    hipaaContact: "[CLIENT TO CONFIRM]"
  },

  trust: {
    badges: [],                                   // partner-relevant: "HIPAA-aligned", "Licensed pharmacy partners", etc.
    caseStudies: [],                              // [{ practiceType, region, outcomeShort }] — anonymized; with consent only
    pressMentions: []                             // [{ outlet, headline, url }]
  },

  disclosures: {
    offLabelClaim: "[CLIENT TO CONFIRM]",         // counsel-approved line on off-label / compounded usage
    notMedicalAdvice: "[CLIENT TO CONFIRM]",      // standard "informational only, prescribing decisions remain with the clinician"
    compoundedMedication: "[CLIENT TO CONFIRM]",
    safetyShort: "[CLIENT TO CONFIRM]"
  },

  pages: {
    /* Mirror whatever pages Mythic-RX already has, e.g.: */
    home:         { eyebrow, h1, subhead, ctaPrimary, ctaSecondary },
    partners:     { eyebrow, h1, subhead, ctaPrimary },
    formulary:    { eyebrow, h1, subhead },
    becomePartner:{ eyebrow, h1, subhead, ctaPrimary },
    contact:      { eyebrow, h1, subhead }
  }
};
```

If a partner field is sensitive (full fee schedule, partner agreement PDF, BAA terms), expose only the **gated link** in the public config. The actual document lives behind authentication / partner portal.

### `Client_Onboarding.html` — partner-program intake

Reframe the onboarding form to collect the partner-program fields above. Keep the form mechanics identical:

- Sticky progress bar
- Section accordion structure
- localStorage autosave to key `mrx_onboarding_v1`
- "Export config" button that emits a drop-in `assets/js/landing-config.js` starting with `window.MRX_CONFIG = {`
- `[CLIENT TO CONFIRM]` placeholder convention preserved

What changes is the **fields** the client fills in. There is no consumer pricing, refund, or "first-month promo" — instead there are partnership-tier names, fee-structure summary, white-label availability, EMR integrations, BAA status, medical director name and credentials, fulfillment SLA, etc.

### `Marketing_Next_Steps.html` — same review concepts, B2B content

Keep the structure verbatim. Only the **rows in the tables** change.

#### Stat-card counts (initial, day-zero state)

The four stat cards retain the same shape but their values reflect the actual Mythic-RX inventory the second agent ships. As a starting baseline, target counts that are **realistic for a B2B partner site** rather than copying Nume's `5 / 13 / 4 / 3`. Recompute after the actual ported pages and gates are in place.

#### Section 2 — compliance / launch gates (B2B)

Replace Nume's eight DTC gates with this B2B set. All start as `pill-blocked` or `pill-client` (the same "nothing is launch-ready until reviewed" rule applies):

| Gate | Owner | Default pill |
|---|---|---|
| Healthcare counsel review of all partner-facing claims and off-label / compounded language | Client / counsel | `pill-blocked` |
| Per-state pharmacy and clinician licensing list confirmed for every state Mythic-RX fulfills | Client | `pill-blocked` |
| Business Associate Agreement template approved (and signing process documented) | Client / counsel | `pill-blocked` |
| Partner agreement / SOW template approved | Client / counsel | `pill-blocked` |
| Medical director appointed and clinical-governance language approved | Client | `pill-client` |
| Privacy policy, terms, HIPAA notice, and partner-data-handling policy live | Client / counsel | `pill-client` |
| EMR integration security review (if any integrations are claimed) | Client | `pill-client` |
| Marketing-claim substantiation file (peer-reviewed citations, fair-balance language) | Client / counsel | `pill-client` |

#### Section 3 — client deliverables

Mirror the partner-program fields in `MRX_CONFIG`. Each row is a config field the client owes; all default to `pill-client` "Pending".

#### Section 4 — launch sequence (B2B partner rollout, not paid-media launch)

Replace Nume's 7-day Google/Meta/TikTok plan with a partner-rollout sequence. Suggested skeleton — refine to Mythic-RX's actual GTM plan:

| Day | Theme |
|---|---|
| Pre-launch | Counsel review, BAA template, formulary frozen, sales-enablement deck approved |
| Day 1 — Foundation | Partner pages live; partner-portal/intake form live; sales team trained on objection handling |
| Day 2 — Direct outreach | Founder/medical-director outreach to known clinic targets; LinkedIn for HCPs |
| Day 3 — Society / KOL | Outreach to medical societies and KOLs; co-marketing inquiries |
| Day 4 — Inbound channels | LinkedIn for HCPs, search ads for HCP-intent terms (no patient-targeted creative) |
| Day 5 — Conversion review | Demo-booked rate, qualified-clinic rate, dropoff in onboarding form |
| Weekend — Trust assets | Publish case studies, clinical FAQ for partners, formulary 1-pager |
| Week 2 — Scale | Conference outreach, referral program, second-tier partnership tier rollout |

#### Section 5 — open dev tasks

Replace Nume's three (assessment quiz, GA4/CAPI, state eligibility gate) with Mythic-RX-appropriate tasks. Suggested:

- Build the partner-intake form (multi-step, file-attachment for licensure docs, save state on each step).
- Wire `mrxTrack` events to GA4 (and optional LinkedIn Insight tag) — strictly **non-PHI, non-clinic-identifying** events: `page_view`, `cta_click`, `partner_intake_started`, `partner_intake_completed`, `formulary_request`.
- State-availability gate in the partner intake (`MRX_CONFIG.clinical.statesLicensed`) — short-circuit ineligible states with a "we'll let you know when we serve your state" capture, same pattern as Nume but applied to clinic state instead of patient state.

#### Section 6 — channel guardrails (B2B)

Replace the Google/Meta/TikTok/Affiliate table with the channels Mythic-RX actually uses. Suggested:

| Channel | Do | Don't |
|---|---|---|
| **LinkedIn for HCPs** | HCP-targeted, professional voice, peer-reviewed citations, fair-balance language | Patient targeting, weight-loss-result claims, before/after content |
| **Direct outreach / sales** | Named clinic accounts, BAA/partner agreement attached early, pricing under NDA only | Cold patient lists, unsolicited PHI in any form |
| **Conferences / societies** | Sponsorships with disclosed funding, peer-reviewed posters, MD-level CME content | Patient leads collected at booth without consent |
| **Search (HCP intent)** | Brand and HCP-keyword campaigns ("how to add weight-care to my practice", "compounding pharmacy partner"), creative aimed at clinicians | Patient-keyword campaigns ("Ozempic near me") — those belong on a DTC site, not Mythic-RX |
| **Content / SEO** | Clinical evidence reviews, formulary explainers, regulatory-update articles, case studies (with consent) | Patient testimonials, transformation imagery, drug-equivalency claims |

## Hard rules

1. **Mythic-RX's existing goals, positioning, and partner-facing copy are protected.** The port is additive — it gives Mythic-RX the *same review and rendering machinery* Nume now has, without changing what Mythic-RX is selling or to whom.
2. **No DTC patient-acquisition pages.** Do not port the 5 GLP-1 landing pages from Nume. Do not introduce patient-targeting CTAs.
3. **No factual content from Nume's config.** Prices, served states, prescribing-entity names, pharmacy partners, support contacts, testimonials, refund/cancellation language, disclosure wordings — all reset to `[CLIENT TO CONFIRM]`. Mythic-RX is a separate legal and operational entity.
4. **No invented compliance status.** Every gate in Mythic-RX's `Marketing_Next_Steps.html` starts at the day-zero default state (`pill-blocked` or `pill-client`). Mythic-RX is not LegitScript-certified, BAA-templated, counsel-cleared, or licensed-by-state just because Nume is on the same path. The same review concepts apply; the same status grammar applies; the actual statuses must reflect Mythic-RX's actual progress.
5. **Keep `lp-*`, `ob-*`, `ns-*`, `pill-*` CSS class names unchanged** — they are brand- and audience-neutral.
6. **Preserve `data-bind` / `data-bind-attr` / `data-bind-list` / `data-bind-show` / `data-track` attributes verbatim.** Only the config-object name (`MRX_CONFIG`) and the bound paths change.
7. **No new external dependencies.** Plain HTML/CSS/JS only.
8. **PHI-free and clinic-identity-free analytics.** `mrxTrack` only takes a generic event name. Never pass partner clinic NPI, partner name, EIN, or any patient data.
9. **Do not touch the Nume repo.** Read-only reference.

## Definition of done

- Brand foundation (Phase 1 of `PORT_CHECKLIST.md`) is complete: `mythic_rx_brand_kit/` exists, web favicon set is in place, `assets/css/mythic-rx.css` parses, design tokens resolve.
- Mythic-RX's existing partner pages have been retrofitted with `data-bind` markup and read from `MRX_CONFIG` — without changing their headlines, structure, or partner-facing voice.
- `assets/js/landing-config.js` exists with a partner-physician schema, every value `[CLIENT TO CONFIRM]` or null, starting line `window.MRX_CONFIG = {`.
- `assets/js/landing-render.js` is ported with `MRX_CONFIG` / `mrxTrack` / `[mrx.track]` renames; logic is unchanged.
- `Client_Onboarding.html` collects the partner-program fields, autosaves to `mrx_onboarding_v1` in localStorage, and exports a drop-in `landing-config.js`.
- `Marketing_Next_Steps.html` uses the same six-section layout and the same five-status pill grammar as Nume, but with the B2B gates, deliverables, launch sequence, dev tasks, and channel guardrails described above. All status pills reflect actual Mythic-RX progress (default: blocking / awaiting client / open).
- `Update_Colors.html` and `ImageSelection.html` are branded for Mythic-RX and preview Mythic-RX's actual palette and assets.
- A grep for `nume`, `Nume`, `NUME_CONFIG`, `numeTrack`, `--nume-`, or `nume-health.com` in **ported** files returns zero results.
- All landing-page console output is clean (the only debug line is `[mrx.track] page_view`).

## When in doubt

- **Audience question?** Resolve in favor of Mythic-RX's existing partner-physician positioning. The system serves the message, not the other way around.
- **Mechanics question?** Open the matching Nume reference file and mirror its shape.
- **Compliance question?** Default to the most conservative status (`pill-blocked`) and surface it as a gate in the tracker. Mythic-RX's counsel must explicitly clear every healthcare-claim and contractual artifact before any pill turns green.

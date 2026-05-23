# Compliance Gates — Reset for Mythic-RX

Every healthcare-compliance value used on Nume is **invalid** for Mythic-RX until the Mythic-RX side independently completes the same review. The two sites are legally distinct entities, even if they're operated by the same group.

This document tells the second agent what to reset in the ported tracker (`Marketing_Next_Steps.html`), so the page does not falsely imply Mythic-RX is launch-ready.

## 1. Compliance gates — must show as `Blocking` on day one

In Section 2 of `Marketing_Next_Steps.html`, all four blocking gates are reset to `pill-blocked`:

| Gate | Owner | Pill |
|---|---|---|
| Healthcare counsel review of landing-page claims | Client / counsel | `pill-blocked` "Blocking" |
| LegitScript / Google Healthcare Merchant Certification | Client | `pill-blocked` "Blocking" |
| Compounded-medication disclosure approved | Client / counsel | `pill-blocked` "Blocking" |
| Prescribing entity, network, pharmacy partners confirmed | Client | `pill-blocked` "Blocking" |

The four "Awaiting client" rows below stay as `pill-client` "Awaiting client":

| Gate | Owner | Pill |
|---|---|---|
| State availability list confirmed | Client | `pill-client` |
| Privacy policy / consumer health data policy / TOS / telehealth consent live | Client / counsel | `pill-client` |
| Refund & cancellation policy documented | Client | `pill-client` |
| Tracking events confirmed PHI-free with privacy counsel | Client / counsel | `pill-client` |

These are **the same eight gates Nume has** — copy the table verbatim, just keep every status at the default red/amber state.

## 2. Client deliverables — all 13 reset to `Pending`

Section 3 of `Marketing_Next_Steps.html` lists 13 fields the client must hand over. On Mythic-RX these are all `pill-client` "Pending" until the client fills `Client_Onboarding.html`. The list:

1. Public product name + active ingredient
2. Monthly price
3. Annual prepay equivalent (optional)
4. First-month promo (optional)
5. What's included list
6. Refund & cancellation copy
7. Refill cadence
8. Service states (2-letter list)
9. Prescribing entity legal name
10. Provider network description
11. Pharmacy partner description
12. Provider-review SLA + shipping SLA
13. Support email, phone, hours

## 3. Open dev tasks — all 3 reset to `Open`

Section 5 of the tracker. Three tasks, all `pill-todo`:

1. Build the multi-step assessment quiz (Layer 1)
2. Wire `mrxTrack` events to GA4 + (optionally) Meta CAPI
3. State eligibility gate in quiz

## 4. Channel guardrails — copy verbatim

Section 6 (Google Search / Meta / TikTok / Affiliate dos and don'ts) is identical for every cash-pay GLP-1 brand. Copy the table directly without changes.

## 5. Hard policy — values that must NEVER be copy-pasted from Nume

These config values, even if Nume has placeholder text, are not safe to reuse:

- `brand.supportEmail`, `brand.supportPhone`, `brand.supportHours` — operationally distinct.
- `clinical.prescribingEntity` — a legal entity name. Mythic-RX has its own.
- `clinical.providerNetwork` — different network arrangement.
- `clinical.pharmacyPartners` — different pharmacy contracts.
- `clinical.intakeSLA`, `clinical.shippingSLA` — different operations.
- `product.monthlyPrice`, `product.annualMonthlyPrice`, `product.firstMonthPrice` — different pricing.
- `product.refund`, `product.cancellation` — different policies.
- `states.served` — different state list driven by where Mythic-RX has licensed providers.
- `disclosures.compoundedMedication`, `disclosures.prescriptionNotGuaranteed`, `disclosures.safetyShort` — must be re-reviewed by Mythic-RX's own counsel even if the wording ends up identical. The decision-of-record matters.
- `disclosures.privacyPolicyUrl`, `termsUrl`, `telehealthConsentUrl`, `consumerHealthDataUrl` — different documents on a different domain.
- `trust.testimonials` — testimonials require written consent on file with the entity using them.

The pre-rendered `templates/landing-config.template.js` already has every one of these reset to `[CLIENT TO CONFIRM]`. **Don't loosen it.**

## 6. Why this matters

The Nume launch plan calls out that LegitScript / Google Healthcare Merchant cert, counsel review, and pharmacy/prescriber confirmations are **per-entity**, not per-website. If Mythic-RX runs paid traffic on landing pages that imply certification status it does not have, the consequences are account-level (ad-account suspensions, merchant disablement, FTC exposure) — not just a content fix.

Treat the tracker as a fresh launch, not a sister-site copy of Nume's progress.

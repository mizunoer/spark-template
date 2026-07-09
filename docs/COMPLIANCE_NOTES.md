# Mythic-RX — compliance notes (503A pharmacy)

**Entity:** Mythic Rx operates as a **503A compounding pharmacy** (patient-specific compounding under section 503A of the FD&C Act). Public copy on mythic-rx.com is **B2B partner-facing** (clinics, prescribers, clinic operators)—not direct-to-consumer patient marketing.

**This document is operational guidance for the launch team and agents. It is not legal advice.**

---

## Regulatory framing

| Topic | Notes |
|---|---|
| **503A status** | Compounding for identified patients based on valid prescriptions. Marketing must not imply Mythic-RX is a 503B outsourcing facility, a drug manufacturer, or a retail pharmacy unless counsel confirms that language. |
| **USP 795 / 797** | Sterile and non-sterile compounding quality claims (e.g. USP compliance) require ops substantiation and counsel-approved wording before use in ads or partner pages. |
| **Off-label / compounded claims** | Partner-facing formulary and service copy must stay within counsel-approved indications and fair-balance language. Do not inherit disclosure text from sister brands verbatim. |
| **HIPAA / BAA** | Clinic partnerships that involve PHI require a counsel-approved BAA and documented signing workflow before production partner onboarding. |

---

## Utah DOPL (primary licensure)

Mythic-RX’s **home-state pharmacy regulator** is the **Utah Division of Professional Licensing (DOPL)** — Pharmacy Licensing.

**Workflow:**

1. **Ops / client** maintains current Utah pharmacy license status and any discipline or renewal filings relevant to public claims.
2. **Legal counsel** confirms which license details (if any) may appear on the website, partner materials, or outreach (license number, entity name on license, address).
3. **Marketing / engineering** does not publish license numbers, “fully licensed,” or state lists until counsel and ops sign off on the **decision-of-record** in `landing-config.js` (`clinical.statesLicensed`, `clinical.pharmacyPartners`).
4. **Multi-state fulfillment:** Each non-Utah state in the public “licensed in” list must be **independently attested** (license, registration, or lawful fulfillment basis)—not assumed from Utah DOPL status alone.

**DOPL reference:** [Utah DOPL — Pharmacy](https://dopl.utah.gov/pharmacy/)

---

## Legal counsel review workflow

All partner-facing claims pass through **healthcare counsel** before launch gates clear. Nothing in this repo auto-approves copy.

### What counsel reviews

- Headlines, service descriptions, formulary categories, and FAQ answers on partner pages
- `disclosures.*` strings in `assets/js/landing-config.js`
- Privacy policy, HIPAA notice, terms, partner-data-handling policy
- BAA template, partner agreement / SOW, and marketing substantiation file
- Outbound email templates, conference one-pagers, and paid search copy (if used)

### Promotion path (per gate)

```
Blocking / Awaiting client → In progress (draft with counsel) → Done (decision-of-record filed)
```

Track status in **`Marketing_Next_Steps.html`** Section 2. A gate is **Done** only when counsel (or named delegate) has cleared that artifact for Mythic-RX specifically—not because a sister brand cleared a parallel item.

### Engineering rules

- Values marked `[CLIENT TO CONFIRM]` or empty disclosures **must not** be treated as approved for external use.
- Do not add patient DTC eligibility, cash-pay GLP-1 pricing, or telehealth prescribing funnels to mythic-rx.com without a separate strategy and counsel sign-off (that surface belongs on DTC brands, e.g. Nume).
- **`siteTrack` / analytics:** no clinic NPI, partner name, formulary selections, or contract values in event names (see `sister-sites-shared/shared/conventions/ANALYTICS_EVENTS.md`).

---

## Launch hard gates (summary)

From `Marketing_Next_Steps.html` / `sister-sites-shared/per-site/mythic-rx/COMPLIANCE_GATES.md`:

1. Healthcare counsel review of partner-facing claims (503A / compounded / off-label language)
2. Per-state pharmacy licensing list confirmed (**Utah DOPL home license + each expansion state**)
3. BAA template approved
4. Partner agreement / SOW approved
5. *(Awaiting client)* Medical director, legal pages live, EMR security review if claimed, marketing substantiation file

**No partner-facing page goes live to outreach until blocking gates are Done.**

---

## Related files

| File | Purpose |
|---|---|
| `Marketing_Next_Steps.html` | Live gate tracker |
| `assets/js/landing-config.js` | Counsel-approved copy + licensure fields |
| `Client_Onboarding.html` | Client intake → exports config |
| `privacy-policy.html` | HIPAA notice + privacy (counsel-owned content) |
| `sister-sites-shared/per-site/mythic-rx/COMPLIANCE_GATES.md` | Canonical gate list (shared folder) |

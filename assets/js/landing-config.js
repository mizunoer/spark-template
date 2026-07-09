/**
 * Mythic-RX — Partner-program Landing Page configuration
 * ========================================================================
 * Derived from sister-sites-shared/shared/schemas/landing-config.b2b.template.js
 * (consumed v2026.05.22.1).
 *
 * THIS IS THE ONE FILE THE CLIENT EDITS to change copy, contact info,
 * formulary references, and disclosures across every partner-facing
 * landing page. Update the values below; all `data-bind="..."` markers
 * on the pages pick them up automatically when the page loads.
 *
 * Anything left as `[CLIENT TO CONFIRM]` will render as a yellow-highlighted
 * placeholder on the page so missing values are easy to spot in QA.
 *
 * AUDIENCE: Partner physicians, NPs, PAs, and clinic operators —
 * NOT direct-to-consumer patients. Do not put patient-targeted CTAs,
 * prices, or eligibility claims in this file.
 *
 * REGULATORY: Mythic-RX is a 503A compounding pharmacy. Utah DOPL is
 * the home-state pharmacy regulator. All public copy and licensure fields
 * require healthcare-counsel approval — see docs/COMPLIANCE_NOTES.md.
 *
 * Two name bindings: the shared renderer reads `window.SITE_CONFIG`;
 * `window.MRX_CONFIG` is the brand-prefixed alias for DevTools-friendly
 * debugging. They point at the same object.
 *
 * To submit this configuration to engineering, fill in
 * `Client_Onboarding.html` and use the "Export config" button — it
 * generates this file for you.
 * ========================================================================
 */
window.SITE_CONFIG = window.MRX_CONFIG = {

  /* ---------- Brand ---------- */
  brand: {
    name: "[CLIENT TO CONFIRM]",                  // e.g. "Mythic-RX"
    domain: "[CLIENT TO CONFIRM]",                // e.g. "mythic-rx.com"
    partnerSupportEmail: "[CLIENT TO CONFIRM]",   // e.g. "partners@mythic-rx.com"
    partnerSupportPhone: "[CLIENT TO CONFIRM]",   // e.g. "(385) 584-6620"
    partnerSupportHours: "[CLIENT TO CONFIRM]"    // e.g. "Mon–Fri, 8a–6p MT"
  },

  /* ---------- Partnership program ---------- */
  partnership: {
    audience: "Independent and group-practice physicians, NPs, PAs",

    /* One-line value proposition (counsel-reviewed). */
    propositionShort: "[CLIENT TO CONFIRM]",

    /* How long onboarding typically takes once paperwork is signed. */
    onboardingTimeline: "[CLIENT TO CONFIRM]",    // e.g. "Most clinics fully onboarded in 7–10 business days"

    /* Public-safe summary of fee structure. Full schedule lives behind
       partner authentication / NDA. */
    feeStructureSummary: "[CLIENT TO CONFIRM]",

    /* White-labeling availability flag. */
    whiteLabelAvailable: null,                    // true | false | null

    /* Referral / fulfillment model. */
    referralModel: "[CLIENT TO CONFIRM]"          // e.g. "Co-managed prescribing", "Direct fulfillment", "Referral-only"
  },

  /* ---------- Formulary ---------- */
  formulary: {
    /* High-level categories. Leave empty until counsel-approved. */
    categories: [],                               // e.g. ["Weight care","Hormone health","Pain & inflammation"]

    /* Specific medications. Each entry: { name, category, indication, fulfillmentNote } */
    medications: [],

    /* Gated link to the full formulary PDF / partner-portal request form. */
    formularyRequestUrl: "[CLIENT TO CONFIRM]"
  },

  /* ---------- Clinical governance ---------- */
  clinical: {
    /* Fixed designation — do not change without counsel. Used in trust copy. */
    pharmacyDesignation: "503A compounding pharmacy",

    /* Named clinical lead with credentials. Required before any
       "MD-led" or "physician-directed" claim ships. */
    medicalDirector: "[CLIENT TO CONFIRM]",

    /* 1–2 sentence description of clinical governance / advisory board. */
    clinicalAdvisoryNote: "[CLIENT TO CONFIRM]",

    /* Pharmacy entity + licensure-attested description (counsel + DOPL). */
    pharmacyPartners: "[CLIENT TO CONFIRM]",

    /* Home state: Utah (DOPL). Each code must be ops-attested + counsel-approved. */
    statesLicensed: ["[CLIENT TO CONFIRM]"],

    /* Intake SLA (how fast Mythic-RX reviews submitted prescriptions). */
    intakeSLA: "[CLIENT TO CONFIRM]",

    /* Fulfillment SLA (how fast Mythic-RX ships post-approval). */
    fulfillmentSLA: "[CLIENT TO CONFIRM]"
  },

  /* ---------- Integrations ---------- */
  integrations: {
    /* EMR integrations available today. Leave [] if none yet. */
    emrIntegrations: [],                          // e.g. ["Athenahealth","Epic","DrChrono"]

    apiAvailable: null,                           // true | false | null

    integrationContact: "[CLIENT TO CONFIRM]"     // e.g. "integrations@mythic-rx.com"
  },

  /* ---------- Legal / compliance ---------- */
  legal: {
    /* Counsel review workflow — no public launch until cleared. */
    counselReviewRequired: true,

    /* BAA flag — is a Business Associate Agreement available with the
       partner agreement? */
    baaProvided: null,                            // true | false | null

    /* Gated link to the partner-agreement template (NDA). */
    partnerAgreementUrl: "[CLIENT TO CONFIRM]",

    /* Public-facing legal pages. */
    privacyPolicyUrl: "/privacy-policy.html",
    termsUrl: "/terms-and-conditions.html",

    /* Contact for HIPAA / privacy questions from partner clinics. */
    hipaaContact: "[CLIENT TO CONFIRM]"
  },

  /* ---------- Trust assets ---------- */
  trust: {
    /* Short partner-relevant trust chips. Counsel must approve each. */
    badges: [],                                   // e.g. ["HIPAA-aligned","Licensed pharmacy partners",...]

    /* Case studies (anonymized, with written consent on file).
       Each entry: { practiceType, region, outcomeShort } */
    caseStudies: [],

    /* Press mentions / coverage.
       Each entry: { outlet, headline, url } */
    pressMentions: []
  },

  /* ---------- Disclosure copy (counsel-approved) ---------- */
  disclosures: {
    /* Mythic-RX's healthcare counsel must approve each of these
       wordings independently — do NOT inherit any sister-brand language
       verbatim even if the topic is similar. Decision-of-record matters. */
    offLabelClaim: "[CLIENT TO CONFIRM]",
    notMedicalAdvice: "[CLIENT TO CONFIRM]",
    compoundedMedication: "[CLIENT TO CONFIRM]",
    safetyShort: "[CLIENT TO CONFIRM]"
  },

  /* ---------- Page-level copy overrides ---------- */
  pages: {
    home: {
      eyebrow: "Partner program",
      h1: "[CLIENT TO CONFIRM]",
      subhead: "[CLIENT TO CONFIRM]",
      ctaPrimary: "Become a partner",
      ctaSecondary: "Request formulary"
    },
    partners: {
      eyebrow: "For physicians",
      h1: "[CLIENT TO CONFIRM]",
      subhead: "[CLIENT TO CONFIRM]",
      ctaPrimary: "Schedule a consult"
    },
    formulary: {
      eyebrow: "Formulary",
      h1: "[CLIENT TO CONFIRM]",
      subhead: "[CLIENT TO CONFIRM]"
    },
    becomePartner: {
      eyebrow: "Onboarding",
      h1: "[CLIENT TO CONFIRM]",
      subhead: "[CLIENT TO CONFIRM]",
      ctaPrimary: "Start onboarding"
    },
    contact: {
      eyebrow: "Contact",
      h1: "[CLIENT TO CONFIRM]",
      subhead: "[CLIENT TO CONFIRM]"
    }
  }
};

/**
 * Mythic-RX — Partner-program Landing Page configuration
 * ========================================================================
 * THIS IS THE ONE FILE THE CLIENT EDITS to change copy, contact info,
 * formulary references, and disclosures across every partner-facing
 * landing page. Update the values below; all `data-bind="..."` markers
 * on the pages pick them up automatically when the page loads.
 *
 * Anything left as `[CLIENT TO CONFIRM]` renders as a yellow-highlighted
 * placeholder on the page so missing values are easy to spot in QA.
 *
 * AUDIENCE: Partner physicians, NPs, PAs, and clinic operators —
 * NOT direct-to-consumer patients. Do not put patient-targeted CTAs,
 * prices, or eligibility claims in this file.
 *
 * To submit this configuration to engineering, fill in
 * `Client_Onboarding.html` and use the "Export config" button — it
 * generates this file for you.
 * ========================================================================
 */
window.MRX_CONFIG = {

  /* ---------- Brand ---------- */
  brand: {
    name: "Mythic-RX",
    domain: "mythic-rx.com",
    partnerSupportEmail: "[CLIENT TO CONFIRM]",   // e.g. "partners@mythic-rx.com"
    partnerSupportPhone: "[CLIENT TO CONFIRM]",   // e.g. "(385) 584-6620"
    partnerSupportHours: "[CLIENT TO CONFIRM]"    // e.g. "Mon–Fri, 8a–6p MT"
  },

  /* ---------- Partnership program ---------- */
  partnership: {
    audience: "Independent and group-practice physicians, NPs, PAs",

    /* One-line value proposition for partner clinics (counsel-reviewed). */
    propositionShort: "[CLIENT TO CONFIRM]",

    /* How long onboarding typically takes once paperwork is signed. */
    onboardingTimeline: "[CLIENT TO CONFIRM]",    // e.g. "Most clinics fully onboarded in 7–10 business days"

    /* Public-safe summary of fee structure. Full fee schedule lives behind
       partner authentication (see partnership.feeScheduleUrl below). */
    feeStructureSummary: "[CLIENT TO CONFIRM]",

    /* Full fee schedule (gated PDF / partner-portal link). */
    feeScheduleUrl: "[CLIENT TO CONFIRM]",

    /* White-labeling availability flag. */
    whiteLabelAvailable: null,                    // true | false | null

    /* Referral / fulfillment model. */
    referralModel: "[CLIENT TO CONFIRM]",         // e.g. "Co-managed prescribing", "Direct fulfillment", "Referral-only"

    /* Partner tiers, if applicable. Leave [] until program is finalized. */
    tiers: []                                     // [{ name, idealFor, includes[] }]
  },

  /* ---------- Formulary ---------- */
  formulary: {
    /* High-level categories. Leave empty until counsel-approved list exists. */
    categories: [],                               // e.g. ["Weight care","Hormone health","Pain & inflammation"]

    /* Specific medications. Each entry: { name, category, indication, fulfillmentNote } */
    medications: [],

    /* Gated link to the full formulary PDF / partner-portal request form. */
    formularyRequestUrl: "[CLIENT TO CONFIRM]"
  },

  /* ---------- Clinical governance ---------- */
  clinical: {
    /* Named clinical lead, including credentials.
       Required before any "MD-led" or "physician-directed" claim ships. */
    medicalDirector: "[CLIENT TO CONFIRM]",

    /* 1–2 sentence description of clinical governance / advisory board. */
    clinicalAdvisoryNote: "[CLIENT TO CONFIRM]",

    /* Pharmacy partner description, licensure-attested. */
    pharmacyPartners: "[CLIENT TO CONFIRM]",

    /* States Mythic-RX is licensed to fulfill in.
       Two-letter list. Mirrors the partner-intake state gate. */
    statesLicensed: ["[CLIENT TO CONFIRM]"],

    /* Intake SLA (how fast Mythic-RX reviews submitted prescriptions). */
    intakeSLA: "[CLIENT TO CONFIRM]",             // e.g. "Most intakes reviewed within 1 business day"

    /* Fulfillment SLA (how fast Mythic-RX ships post-approval). */
    fulfillmentSLA: "[CLIENT TO CONFIRM]"         // e.g. "Most orders ship within 2–3 business days after approval"
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
    /* BAA flag — is a Business Associate Agreement available with the
       partner agreement? */
    baaProvided: null,                            // true | false | null

    /* Gated link to the partner-agreement template (under NDA). */
    partnerAgreementUrl: "[CLIENT TO CONFIRM]",

    /* Public-facing legal pages. Defaults below assume Mythic-RX's
       existing site structure; override if URLs differ. */
    privacyPolicyUrl: "privacy-policy.html",
    termsUrl: "terms-and-conditions.html",

    /* Contact for HIPAA / privacy questions from partner clinics. */
    hipaaContact: "[CLIENT TO CONFIRM]"
  },

  /* ---------- Trust assets ---------- */
  trust: {
    /* Short partner-relevant trust chips. Counsel must approve each.
       Empty defaults make the trust strip render with placeholder copy. */
    badges: [
      "[CLIENT TO CONFIRM]",
      "[CLIENT TO CONFIRM]",
      "[CLIENT TO CONFIRM]",
      "[CLIENT TO CONFIRM]"
    ],

    /* Case studies (anonymized, with written consent on file).
       Each entry: { practiceType, region, outcomeShort } */
    caseStudies: [],

    /* Press mentions / coverage.
       Each entry: { outlet, headline, url } */
    pressMentions: []
  },

  /* ---------- Disclosure copy ---------- */
  disclosures: {
    /* Mythic-RX's healthcare counsel must approve each of these
       wordings independently — do NOT inherit any sister-brand language
       verbatim even if the topic is similar. Decision-of-record matters. */
    offLabelClaim:
      "[CLIENT TO CONFIRM] — counsel-approved language on off-label / compounded medication use.",
    notMedicalAdvice:
      "[CLIENT TO CONFIRM] — counsel-approved 'informational only; prescribing decisions remain with the clinician' language.",
    compoundedMedication:
      "[CLIENT TO CONFIRM] — counsel-approved compounded-medication disclosure (503A scope, patient-specific Rx requirement, not FDA-approved).",
    safetyShort:
      "[CLIENT TO CONFIRM] — counsel-approved short safety statement, fair-balance for partner-facing materials."
  },

  /* ---------- Page-level copy overrides ---------- */
  /* Mirror Mythic-RX's existing public pages. Leave a field as
     null to keep the page's authored fallback copy untouched. */
  pages: {
    home: {
      eyebrow: null,
      h1: null,
      subhead: null,
      ctaPrimary: null,
      ctaSecondary: null
    },
    partners: {
      eyebrow: null,
      h1: null,
      subhead: null,
      ctaPrimary: null
    },
    formulary: {
      eyebrow: null,
      h1: null,
      subhead: null
    },
    becomePartner: {
      eyebrow: null,
      h1: null,
      subhead: null,
      ctaPrimary: null
    },
    contact: {
      eyebrow: null,
      h1: null,
      subhead: null
    },
    providerPortal: {
      eyebrow: null,
      h1: null,
      subhead: null,
      ctaPrimary: null
    },
    faq: {
      eyebrow: null,
      h1: null,
      subhead: null
    }
  }
};

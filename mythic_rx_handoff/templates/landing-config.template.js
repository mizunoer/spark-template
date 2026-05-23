/**
 * Mythic-RX — Landing Page configuration
 * ========================================================================
 * THIS IS THE ONE FILE THE CLIENT EDITS to change copy, pricing, states,
 * and disclosures across every landing page. Update the values below; all
 * `data-bind="..."` placeholders on the landing pages will pick them up
 * automatically when the page loads.
 *
 * Anything left as `[CLIENT TO CONFIRM]` will render as a yellow-highlighted
 * placeholder on the page so missing values are easy to spot in QA.
 *
 * If you change pricing, refund, states, or disclosure copy, the change is
 * reflected on:
 *   - glp1-cash-pay.html
 *   - glp1-pricing.html
 *   - weight-care-online.html
 *   - switch-glp1-provider.html
 *   - glp1-faq.html
 *
 * To submit the configuration to engineering, fill in `Client_Onboarding.html`
 * and use the "Export config" button — it generates this file for you.
 * ========================================================================
 */
window.MRX_CONFIG = {

  /* ---------- Brand ---------- */
  brand: {
    name: "Mythic-RX",
    domain: "mythic-rx.com",
    supportEmail: "[CLIENT TO CONFIRM]",     // e.g. "support@mythic-rx.com"
    supportPhone: "[CLIENT TO CONFIRM]",     // e.g. "(555) 123-4567"
    supportHours: "[CLIENT TO CONFIRM]"      // e.g. "Mon–Fri, 9am–6pm ET"
  },

  /* ---------- Base GLP-1 product (start with one) ---------- */
  product: {
    /* Internal label only — not shown to consumers. */
    label: "Base plan",

    /* Public name shown on pricing cards. Avoid “generic Ozempic” / brand
       equivalency language. */
    publicName: "[CLIENT TO CONFIRM]",       // e.g. "Compounded semaglutide plan"

    /* Active ingredient family. Used for plan logic only. */
    medication: "[CLIENT TO CONFIRM]",       // e.g. "compounded semaglutide"

    /* Monthly price (string, includes "$" symbol). */
    monthlyPrice: "[CLIENT TO CONFIRM]",     // e.g. "$199"

    /* Optional: annual prepay equivalent monthly price. Set to null if no
       annual plan is offered. */
    annualMonthlyPrice: null,                // e.g. "$149"

    /* Optional: first-month promotional price, if any. Must be substantiable. */
    firstMonthPrice: null,                   // e.g. "$99"

    /* What is included in the price. Render order is preserved. */
    included: [
      "[CLIENT TO CONFIRM]",
      "[CLIENT TO CONFIRM]",
      "[CLIENT TO CONFIRM]"
    ],

    /* Refill cadence. */
    refillCadence: "[CLIENT TO CONFIRM]",    // e.g. "Every 28 days, after provider check-in"

    /* Cancellation rule shown to consumers. */
    cancellation: "[CLIENT TO CONFIRM]",     // e.g. "Cancel before your next refill — no long-term commitment."

    /* Refund policy short-form copy. */
    refund: "[CLIENT TO CONFIRM]"            // e.g. "Full refund if a clinician determines you do not qualify."
  },

  /* ---------- Optional second product (leave null until launched) ---------- */
  product2: null,

  /* ---------- Service availability ---------- */
  states: {
    /* Use the two-letter code list. Replace with the actual served states. */
    served: ["[CLIENT TO CONFIRM]"],         // e.g. ["FL","TX","CA","NY"]
    notServedNote: "If your state isn't currently supported, we'll let you know before charging anything."
  },

  /* ---------- Operations / clinical ---------- */
  clinical: {
    prescribingEntity: "[CLIENT TO CONFIRM]",   // legal name of the prescribing PC/PA
    providerNetwork: "[CLIENT TO CONFIRM]",     // e.g. "Independent licensed clinicians"
    pharmacyPartners: "[CLIENT TO CONFIRM]",    // e.g. "U.S. licensed compounding pharmacies"
    labRequirement: "[CLIENT TO CONFIRM]",      // e.g. "A1c, CMP, lipids may be required."
    intakeSLA: "[CLIENT TO CONFIRM]",           // e.g. "Most reviews completed within 24–48 hours."
    shippingSLA: "[CLIENT TO CONFIRM]"          // e.g. "Most orders ship within 2–3 business days after approval."
  },

  /* ---------- Trust / social proof ---------- */
  trust: {
    /* Values are short. Each appears as a trust-bar chip across the top. */
    badges: [
      "Licensed U.S. providers",
      "U.S.-licensed pharmacy partners",
      "Secure & private intake",
      "No insurance required"
    ],

    /* Approved testimonials only. Each must have written consent on file
       with Mythic-RX. Leave empty until consent docs exist.
       DO NOT copy testimonials from Nume — consent is per-entity. */
    testimonials: [
      /* {
        quote: "...",
        author: "First name + last initial",
        meta: "Verified patient · Compensated"
      } */
    ]
  },

  /* ---------- Disclosure copy (legal-reviewed before launch) ---------- */
  disclosures: {
    /* Mythic-RX counsel must approve these wordings independently of Nume,
       even if the final language is similar. Do not ship without sign-off. */
    compoundedMedication:
      "[CLIENT TO CONFIRM] — counsel-approved compounded medication disclosure.",
    prescriptionNotGuaranteed:
      "[CLIENT TO CONFIRM] — counsel-approved 'prescription not guaranteed' disclosure.",
    safetyShort:
      "[CLIENT TO CONFIRM] — counsel-approved short safety statement (contraindications, GI / pancreatitis / MEN2 / pregnancy etc.).",
    privacyPolicyUrl: "/privacy.html",
    termsUrl: "/terms.html",
    telehealthConsentUrl: "/telehealth-consent.html",
    consumerHealthDataUrl: "/consumer-health-data.html"
  },

  /* ---------- Page-level copy overrides ---------- */
  /* Leave these alone unless you specifically want to change a headline
     for a campaign — the defaults are written to be conversion-safe. */
  pages: {
    cashPay: {
      eyebrow: "Cash-pay GLP-1",
      h1: "Clinician-guided weight-care, online.",
      subhead:
        "Start with a private eligibility assessment. Cash-pay prescription treatment options may be available after licensed provider review. No insurance required.",
      ctaPrimary: "See if I qualify",
      ctaSecondary: "View pricing"
    },
    pricing: {
      eyebrow: "Transparent pricing",
      h1: "One simple cash-pay plan.",
      subhead:
        "Provider review, medication if prescribed, supplies, shipping, and ongoing support — bundled into one monthly price."
    },
    weightCareOnline: {
      eyebrow: "Online weight-care",
      h1: "Online weight-care, reviewed by a licensed clinician.",
      subhead:
        "An education-first program. We help you understand options, confirm eligibility, and connect you to a provider who will determine whether treatment is appropriate."
    },
    switchProvider: {
      eyebrow: "Switching providers",
      h1: "Continue your GLP-1 plan with a new provider.",
      subhead:
        "Already on a GLP-1? Share your dose history and we'll have a licensed clinician review your continuation plan."
    },
    faq: {
      eyebrow: "FAQs",
      h1: "Common questions about cash-pay GLP-1 care."
    }
  }
};

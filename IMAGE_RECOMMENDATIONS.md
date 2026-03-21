# Mythic Rx – Image & Visual Recommendations

## Current status (implemented)

- **Page hero / CTA banners:** Use **`image/responsive-banner.jpg`** (your paid asset) for all full-width heroes and CTA strips. This replaced the earlier CSS-only gradient.
- **Staff / “People you can actually reach”:** **Hidden** (`d-none` on `index.html` and `about.html`) until real, approved headshots are available. **To show again:** remove the `d-none` class from those sections and remove `aria-hidden="true"`. Replace `MaleDoctor1.png` / `FemaleDoc1.png` with your files (same filenames or update `src` in HTML).
- **`team.html`:** Redirects to `about.html` (not `#team` while the block is hidden).

---

## Your image shopping list (priority order)

| Priority | What to find | Size / notes | Where it’s used |
|----------|----------------|--------------|-----------------|
| **1** | **Homepage hero** (optional upgrade) | 1920×450+ landscape; lab/facility, no busy stock faces | `index.html` — `Modern_Lab_Equip.png` (replace when you have a real facility shot) |
| **2** | **Two staff headshots** (when ready) | ~600×700 or 600×600; consistent lighting/background | Unhide team sections; use agreed filenames |
| **3** | **Blog cards** (if you publish blog) | 900×600 landscape each | `blog.html`, `single_blog.html` |
| **4** | **Location / misc** | 900×600, 600×600 as needed | `location.html` |
| **5** | **Testimonials page** (if live) | 600×800 or 400×400 avatars | `testimonial.html` |

**Filters that work well:** People (0–2), Orientation (landscape for heroes/cards), Main color **Green / Teal / Grey** for clinical feel. Format: **JPG or WebP**, ~80% quality.

---

Use this as a brief when sourcing or briefing a designer for replacement imagery. **Continuity and functionality** come first; gradients are already in place where they work best.

---

## 1. Banner subtext over graphics

**Recommendation:** Keep the **increased size** we applied.

- **What we did:** Added a `.banner-subtext` class used on all page banners: `font-size: clamp(1rem, 2.2vw, 1.2rem)`, `line-height: 1.5`, light text shadow.
- **Why:** Improves readability (e.g. the Sterile Compounding line on `service_detail.html`) without dominating the headline.
- **If you want to tweak:** Slightly larger is fine (e.g. max `1.25rem`); avoid going smaller for accessibility.

---

## 2. Placeholder images we replaced with gradients (no asset needed)

These are **intentionally** gradient-only for a clean, brand-consistent look and to avoid placeholder clutter:

| Page / block | Previous placeholder | Current solution |
|-------------|----------------------|-------------------|
| **services.html** | Image behind “Compounding services for clinics” | `.bg-gradient-mythic` (green brand gradient) |
| **services.html** | Image next to “Contact Us” form | `.bg-gradient-subtle` (soft green-grey) |
| **service_detail.html** | Image behind “We are Professional Pharmacy and Medical Service” | `.bg-gradient-mythic` |
| **get-started.html** | Image beside New Providers form | `.bg-gradient-subtle`; form column shows first on narrow screens (`order-1 order-xl-2`) |
| **contact.html** | Side image next to form | `.bg-gradient-subtle` |

**Recommendation:** Keep these as gradients unless you have a strong, on-brand photo (e.g. real lab or team). For “Contact Us” and “New Providers” side panels, a gradient is often **better** than a generic stock image.

---

## 3. Images you may still want to replace (sizes, formats, search criteria)

Use these specs when filtering in stock libraries (e.g. by **People**, **Orientation**, **Main color**).

### 3.1 Full-width page banners (hero)

- **Use:** Background for “Services”, “Contact”, “New Providers”, “About”, “Sterile Compounding”, CTA strips, FAQ, etc.
- **Current ref size:** ~1920×900 px (or 1920×1080).
- **Format:** JPG or WebP; 80–85% quality.
- **Suggested filters:**
  - **People:** No people or 1 person (professional, not dominant).
  - **Orientation:** Landscape.
  - **Main color:** Green, Teal, or Grey (to align with brand and overlay).
- **Search ideas:** “pharmacy lab clean”, “medical laboratory equipment”, “healthcare professional workspace”, “compounding pharmacy”.

**Recommendation:** If you don’t have a real lab/team photo, keep the dark green **cta-overlay** and use a single, calm hero image (e.g. lab bench, clean equipment) or keep a gradient/solid for consistency.

---

### 3.2 Index – CTA block (“Partner With Us…”)

- **Location:** `index.html` – full-width CTA above footer.
- **Size:** 1920×900 px (or same as other banners).
- **Filters:** As in 3.1 (landscape, green/teal/grey, no people or 1 person).
- **Alternative:** Keep existing overlay and use a gradient/solid for consistency.

---

### 3.3 Index – “Custom Compounding Solutions” / blog-style cards

- **Current:** `dummy-img-900x600.jpg` in 4 cards (USP 797, formulation testing, clinic collaboration, cold chain).
- **Size:** 900×600 px (3:2 landscape).
- **Format:** JPG or WebP.
- **Suggested filters:**
  - **People:** No people or 1–2 people (clinical/professional).
  - **Orientation:** Landscape.
  - **Main color:** Green, Teal, Blue, or Grey.
- **Search ideas:** “pharmacy cleanroom”, “lab testing”, “doctor pharmacist consultation”, “temperature-controlled shipping”.

---

### 3.4 About page – banner and “About Us” block

- **Banner:** Same as 3.1 (1920×900).
- **Main “About” block:** We replaced the large image with a gradient; the Vision/Mission card uses `.bg-gradient-mythic`. No image needed unless you add a real facility/team photo.
- **Team section:** Uses `MaleDoctor1.png` and `FemaleDoc1.png` (2 people). If you replace:
  - **Size:** ~600×700 px (portrait) or 600×600 (square); aspect ratio should allow cropping to card.
  - **People:** 1 person per image.
  - **Orientation:** Portrait or square.
  - **Main color:** Neutral (Grey, White, soft Green) so cards stay readable.

---

### 3.5 Contact page – banner only

- **Use:** Top-of-page banner.
- **Size / format / filters:** Same as 3.1.
- **Side panel:** Already a gradient; no image required.

---

### 3.6 Get-started / New Providers – banner and testimonial (if used)

- **Banner:** Same as 3.1.
- **Testimonial avatars (if you enable that block):** 400×400 px, square. **People:** 1 person. **Main color:** Neutral.

---

### 3.7 Blog and single post

- **Cards:** 900×600 px, landscape (same as 3.3).
- **Single post featured:** 900×600 px, landscape.

---

### 3.8 Location / testimonials / other pages

- **Location cards:** 600×600 px or 900×600 px depending on layout.
- **Testimonial photos:** 600×800 px (portrait) or 400×400 (avatar). **People:** 1 person. **Main color:** Neutral.

---

## 4. Format and tech summary

| Use case | Suggested size | Format | Aspect |
|----------|----------------|--------|--------|
| Hero / banner | 1920×900 or 1920×1080 | JPG / WebP | Landscape |
| Content cards (index, blog) | 900×600 | JPG / WebP | 3:2 landscape |
| Team / profile | 600×700 or 600×600 | JPG / PNG / WebP | Portrait or square |
| Contact / “side panel” | Replaced with gradient | — | — |
| Testimonial avatar | 400×400 | JPG / WebP | Square |

---

## 5. Buttons (done)

- All **dark green** submit/send buttons (contact, get-started, services) use **white text** and, where applicable, `btn-accent` for consistency.

---

## 6. Quick answers to your questions

- **“What size behind ‘Compounding services for clinics’?”**  
  We use a **gradient** (no image). If you add a photo later: ~600×700 px portrait or same aspect as the card.

- **“What size next to Contact Us?”**  
  We use a **gradient**. If you add a photo: ~600×600 or 600×800 px; **recommendation:** keep gradient for a cleaner, more professional look.

- **“Image behind ‘We are Professional Pharmacy and Medical Service’?”**  
  Replaced with **gradient**. Same as above if you ever switch back to an image.

- **“get-started placeholder – size or gradient? Responsiveness?”**  
  **Gradient** in place. On narrow viewports the form column is first (order-1), image/second column second (order-2).

- **“Contact cutout on responsive?”**  
  **Removed** the cutout; the Contact intro is now a simple rounded block (`rounded-4`), so it behaves consistently on all breakpoints.

- **“About + Team combined?”**  
  **Done.** One About page with “People you can actually reach” (2 people, **hidden until real photos**). `team.html` redirects to `about.html`. Team removed from nav.

If you want to add more filters (e.g. style, license) or page-specific notes, we can extend this doc.

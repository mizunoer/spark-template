# Complete Color Palette Extraction

This document contains all colors used in the Mythic Rx website. **All colors have been updated to the new brand palette.**

## Primary Brand Colors (CSS Variables)

Located in `css/style.css` (lines 84-112):

### Green Palette (Mythic Rx Brand - Updated)
```css
--mythic-green-1-sage: #CFE3CC;      /* Soft Mint - Light backgrounds */
--mythic-green-2-leaf: #1E6B3A;      /* Translucent Forest - Primary accent */
--mythic-green-3-moss: #0F4D2E;      /* Deep Emerald - Medium dark */
--mythic-green-4-forest: #0B3A20;    /* Evergreen - Dark accent */
```

### Grey/Cream Palette (Updated)
```css
--mythic-grey-1-platinum: #FFFFFF;   /* Mythic White - Primary background */
--mythic-grey-2-silver: #DADAD3;     /* Fog - Secondary backgrounds */
--mythic-grey-3-stone: #4A4A4A;      /* Stone - Muted text */
--mythic-grey-4-slate: #2E2E2E;      /* Charcoal - Main text color */
```

### Accent Palette (Updated)
```css
--mythic-brown-2-gold: #F8DE70;      /* Gold accent color */
```

## Semantic Color Variables

These map to the brand colors above:

```css
--primary: var(--mythic-grey-1-platinum);        /* #FFFFFF - Main background */
--text-color: var(--mythic-grey-4-slate);        /* #2E2E2E - Main text */
--text-color-2: var(--mythic-grey-3-stone);      /* #4A4A4A - Secondary text */
--background-color: #ffffff;                      /* White - Card backgrounds */
--accent-color: var(--mythic-green-2-leaf);       /* #1E6B3A - Primary accent */
--accent-color-2: var(--mythic-green-4-forest); /* #0B3A20 - Dark accent */
--accent-color-3: var(--mythic-green-1-sage);   /* #CFE3CC - Light accent */
--accent-color-4: var(--mythic-grey-2-silver);   /* #DADAD3 - Grey accent */
```

## Hardcoded Colors in CSS (All Updated)

### Star Ratings
- **Gold Stars:** `#F8DE70` (used in testimonials, ratings)
- **Inactive Stars:** `#CFE3CC` (soft mint)

### Scrollbar Colors
- **Scrollbar Track:** `#DADAD3` (fog grey)
- **Scrollbar Thumb:** `var(--accent-color)` (uses brand green #1E6B3A)
- **Scrollbar Thumb Hover:** `var(--accent-color-2)` (uses dark green #0B3A20)
- **Custom Scrollbar Drag:** `#1E6B3A` (translucent forest)

### Overlay Gradients (All Updated)
- **Blog Overlay:** `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(15, 77, 46, 0.6) 100%)`
- **Image Overlay:** `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(15, 77, 46, 0.8) 100%)`
- **Background Overlay:** `linear-gradient(180deg, rgba(0, 0, 0, 0) -78.74%, #0F4D2E 99.63%)`
- **Background Overlay 2:** `linear-gradient(0deg, rgba(30, 107, 58, 0.28), rgba(30, 107, 58, 0.28))`
- **Testimonial Overlay:** `linear-gradient(0deg, rgba(255, 255, 255, 0.96), rgba(255, 255, 255, 0.96))`
- **CTA Overlay:** `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(15, 77, 46, 0.6) 100%)`
- **Video Overlay:** `linear-gradient(180deg, rgba(11, 58, 32, 0.144) 0%, rgba(11, 58, 32, 0.72) 100%)`
- **Accent Opacity:** `linear-gradient(0deg, rgba(46, 46, 46, 0.86), rgba(46, 46, 46, 0.86))`

### Other Hardcoded Colors (All Updated)
- **Dark Transparent:** `#0F4D2EB7` (semi-transparent deep emerald)
- **Grey Text:** `#4A4A4A` (fallback)
- **Swiper Pagination:** `#0B3A20` (evergreen)
- **White:** `#FFFFFF` (used in borders, backgrounds)
- **Glass Effect:** `#1E6B3AD5` (mobile header background with blur - translucent forest)
- **Rating Active:** `#F8DE70` (gold)
- **Rating Inactive:** `#CFE3CC` (soft mint)
- **Divider:** `#C2C8A1` (light green-grey)
- **Link (class-link):** `#0F4D2E` (deep emerald)
- **List Icon:** `#2E2E2E` (charcoal)

## Colors in HTML (All Updated)

### Star Ratings (index.html, testimonial.html)
- **Active Stars:** `#F8DE70` (gold)
- **Inactive Stars:** `var(--text-color-1)` (undefined variable - needs fixing)

## Colors in SVG Files

From `BrandGuideInstructions/Mythic Brand assets (1).svg`:
- **Legacy Primary Green:** `#868d44` (may need updating to match new brand)
- **New Primary Green:** `#1E6B3A` (Translucent Forest)
- **Deep Emerald:** `#0F4D2E` (Primary brand green)
- **Soft Mint:** `#CFE3CC` (Light green)
- **Evergreen:** `#0B3A20` (Dark accent)
- **Gold:** `#F8DE70`
- **Mythic White:** `#FFFFFF`
- **Charcoal:** `#2E2E2E`
- **Stone:** `#4A4A4A`
- **Fog:** `#DADAD3`

## Color Usage Summary

| Color Variable | Hex Value | Usage |
|---------------|-----------|-------|
| `--primary` | `#FFFFFF` | Main page background, buttons, cards |
| `--text-color` | `#2E2E2E` | Headings, main text, navigation |
| `--text-color-2` | `#4A4A4A` | Body text, muted content |
| `--background-color` | `#FFFFFF` | Card backgrounds, form inputs |
| `--accent-color` | `#1E6B3A` | Primary buttons, links, highlights |
| `--accent-color-2` | `#0B3A20` | Dark buttons, borders, emphasis |
| `--accent-color-3` | `#CFE3CC` | Light backgrounds, subtle accents |
| `--accent-color-4` | `#DADAD3` | Secondary backgrounds |

## Brand Aesthetic

This color palette maintains the apothecary-scientific tone while visually aligning with a fluid emerald aesthetic:
- **Rich greens** (Deep Emerald, Translucent Forest, Evergreen)
- **Soft mints** (Soft Mint for light accents)
- **Natural gradients** balanced by warm cream and charcoal neutrals
- **Gold accents** for highlights and ratings

## Notes

- ✅ All CSS variables have been updated
- ✅ All hardcoded colors have been updated
- ✅ All HTML inline styles have been updated
- ✅ All overlay gradients have been updated
- ⚠️ The variable `--text-color-1` is referenced in HTML but not defined in CSS. Consider adding it or replacing with `--text-color`.
- ⚠️ SVG logo files may need manual updating to match the new brand colors if they're used directly.

# Kidzee Polichalur — Design System

> **Version:** 1.0
> **Date:** March 29, 2026
> **Source:** Extracted from kidzee.com official website + adapted for franchise use
> **Status:** Living document — update as brand evolves

---

## 1. Brand Foundation

### Origin
Design tokens extracted from the official Kidzee India website (kidzee.com). The franchise app adapts these for Kidzee Polichalur while maintaining brand consistency.

### Brand Personality
- **Playful** — rounded fonts, warm colors, child-friendly illustrations
- **Trustworthy** — consistent purple branding, professional layout
- **Warm** — yellow/orange accents, gradient backgrounds
- **Modern** — clean UI, responsive design, smooth transitions

---

## 2. Color Palette

### Primary Colors (from kidzee.com)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#65318E` | Brand purple — headings, CTAs, links |
| `--color-primary-dark` | `#4A2366` | Hover states, active elements |
| `--color-primary-light` | `#8B5CB8` | Backgrounds, subtle accents |
| `--color-accent` | `#FFF200` | Yellow highlight — badges, emphasis |
| `--color-accent-warm` | `#FFC107` | Gold — awards, stars, ratings |

### Secondary Colors (warm gradient palette)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-orange` | `#FD7E14` | Buttons, CTAs, active states |
| `--color-orange-dark` | `#E86A00` | Hover on orange elements |
| `--color-pink` | `#E91E8C` | Gradient endpoints, decorative |
| `--color-yellow` | `#FFD700` | Stars, highlights |

### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-success` | `#198754` | Confirmations, positive status |
| `--color-warning` | `#FFC107` | Alerts, caution states |
| `--color-error` | `#DC3545` | Errors, delete actions |
| `--color-info` | `#0DCAF0` | Information banners |

### Neutral Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-text-primary` | `#282828` | Body text, headings |
| `--color-text-secondary` | `#6C757D` | Captions, metadata |
| `--color-text-muted` | `#ADB5BD` | Placeholders, disabled text |
| `--color-bg-primary` | `#FFFBF5` | Page background (warm cream) |
| `--color-bg-secondary` | `#F8F9FA` | Card backgrounds, sections |
| `--color-bg-white` | `#FFFFFF` | Cards, inputs, modals |
| `--color-border` | `#DEE2E6` | Default borders |
| `--color-border-light` | `#E9ECEF` | Subtle borders |

### Gradient Presets

| Token | Value | Usage |
|-------|-------|-------|
| `--gradient-hero` | `from-yellow-400 via-orange-400 to-pink-500` | Hero sections, headers |
| `--gradient-footer` | `from-[#65318E] via-[#4A2366] to-[#2D1540]` | Footer (brand purple) |
| `--gradient-cta` | `from-orange-500 to-pink-500` | Primary action buttons |
| `--gradient-card-1` | `from-pink-50 to-rose-50` | Activity card variant 1 |
| `--gradient-card-2` | `from-blue-50 to-sky-50` | Activity card variant 2 |
| `--gradient-card-3` | `from-green-50 to-emerald-50` | Activity card variant 3 |
| `--gradient-card-4` | `from-yellow-50 to-amber-50` | Activity card variant 4 |
| `--gradient-card-5` | `from-purple-50 to-violet-50` | Activity card variant 5 |
| `--gradient-card-6` | `from-orange-50 to-red-50` | Activity card variant 6 |
| `--gradient-card-7` | `from-cyan-50 to-teal-50` | Activity card variant 7 |

---

## 3. Typography

### Font Families (from kidzee.com)

| Token | Font | Weight | Usage |
|-------|------|--------|-------|
| `--font-display` | `Fredoka` | 700, 900 | Headings, hero text, brand elements |
| `--font-display-light` | `Fredoka` | 300, 400 | Subheadings, lighter display text |
| `--font-body` | `Lato` | 400, 700 | Body text, paragraphs, forms |
| `--font-accent` | `Sniglet` | 400 | Buttons, playful UI elements, CTAs |

### Type Scale

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `--text-display` | `3rem` (48px) | 1.2 | Hero headings |
| `--text-h1` | `2.5rem` (40px) | 1.25 | Page titles |
| `--text-h2` | `2rem` (32px) | 1.3 | Section headings |
| `--text-h3` | `1.5rem` (24px) | 1.35 | Card titles, subsection heads |
| `--text-h4` | `1.25rem` (20px) | 1.4 | Small headings |
| `--text-body` | `1rem` (16px) | 1.75 | Body text (28px line-height) |
| `--text-body-lg` | `1.125rem` (18px) | 1.6 | Large body, featured text |
| `--text-sm` | `0.875rem` (14px) | 1.5 | Captions, metadata, tags |
| `--text-xs` | `0.75rem` (12px) | 1.5 | Badges, fine print |

### Font Weights

| Token | Weight | Usage |
|-------|--------|-------|
| `--weight-light` | 300 | Light display text |
| `--weight-normal` | 400 | Body text |
| `--weight-medium` | 500 | Emphasized body |
| `--weight-semibold` | 600 | Subheadings, labels |
| `--weight-bold` | 700 | Headings, strong text |
| `--weight-black` | 900 | Display, hero text |

---

## 4. Spacing

### Base Unit: 4px

| Token | Value | Usage |
|-------|-------|-------|
| `--space-0` | `0` | Reset |
| `--space-1` | `0.25rem` (4px) | Tight gaps |
| `--space-2` | `0.5rem` (8px) | Small gaps, inline spacing |
| `--space-3` | `0.75rem` (12px) | Form spacing |
| `--space-4` | `1rem` (16px) | Base unit, standard gap |
| `--space-5` | `1.25rem` (20px) | Medium padding |
| `--space-6` | `1.5rem` (24px) | Section padding |
| `--space-8` | `2rem` (32px) | Large gaps |
| `--space-10` | `2.5rem` (40px) | Section spacing |
| `--space-12` | `3rem` (48px) | Large section spacing |
| `--space-16` | `4rem` (64px) | Hero padding |
| `--space-20` | `5rem` (80px) | Major section breaks |

---

## 5. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-none` | `0` | Square elements |
| `--radius-sm` | `0.25rem` (4px) | Inputs, small elements |
| `--radius-md` | `0.5rem` (8px) | Buttons, badges |
| `--radius-lg` | `0.75rem` (12px) | Cards, panels |
| `--radius-xl` | `1rem` (16px) | Large cards, modals |
| `--radius-2xl` | `1.5rem` (24px) | Feature cards |
| `--radius-full` | `9999px` | Pills, avatars, circles |
| `--radius-blob` | `15px 5px` | Playful asymmetric (from kidzee.com `.grey_btn`) |

---

## 6. Shadows & Elevation

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.07)` | Cards, default elevation |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.10)` | Hover states, modals |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.10)` | Featured cards, dropdowns |
| `--shadow-glow` | `0 0 20px rgba(101,49,142,0.15)` | Purple brand glow |
| `--shadow-warm` | `0 4px 15px rgba(253,126,20,0.20)` | Orange CTA glow |

---

## 7. Motion & Transitions

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-fast` | `100ms` | Instant feedback (hover color) |
| `--duration-normal` | `150ms` | Standard transitions (buttons, inputs) |
| `--duration-moderate` | `200ms` | Card hover, elevation changes |
| `--duration-slow` | `300ms` | Panel slides, accordion |
| `--duration-slower` | `500ms` | Page transitions, modals |
| `--easing-default` | `ease-in-out` | Standard motion |
| `--easing-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful bounce (child-friendly) |
| `--easing-smooth` | `cubic-bezier(0.4, 0, 0.2, 1)` | Smooth deceleration |

---

## 8. Breakpoints

| Token | Value | Usage |
|-------|-------|-------|
| `--breakpoint-sm` | `576px` | Landscape phones |
| `--breakpoint-md` | `768px` | Tablets |
| `--breakpoint-lg` | `992px` | Small laptops |
| `--breakpoint-xl` | `1200px` | Desktops |
| `--breakpoint-2xl` | `1400px` | Large screens |

---

## 9. Component Specifications

### Button Variants

| Variant | Background | Text | Radius | Padding |
|---------|-----------|------|--------|---------|
| Primary | `gradient-cta` | White | `radius-full` | `space-3 space-6` |
| Secondary | White | `color-primary` | `radius-full` | `space-3 space-6` |
| Ghost | Transparent | `color-primary` | `radius-full` | `space-3 space-6` |
| Playful | `color-primary` | White | `radius-blob` | `space-2 space-5` |
| Danger | `color-error` | White | `radius-md` | `space-2 space-4` |

### Card Variants

| Variant | Background | Border | Shadow | Radius |
|---------|-----------|--------|--------|--------|
| Activity | Gradient (1-7 rotating) | 1px matching | `shadow-md` | `radius-2xl` |
| Stat | White | `border-light` | `shadow-sm` | `radius-2xl` |
| Admin | White | `border` | `shadow-sm` | `radius-xl` |

### Form Inputs

| State | Border | Shadow | Background |
|-------|--------|--------|-----------|
| Default | `color-border` | None | White |
| Focus | `color-orange` | `0 0 0 3px rgba(253,126,20,0.1)` | White |
| Error | `color-error` | `0 0 0 3px rgba(220,53,69,0.1)` | White |
| Disabled | `border-light` | None | `bg-secondary` |

---

## 10. Icon System

### Source
Lucide React (current). Consider adding Kidzee-style decorative icons from brand assets.

### Sizes

| Token | Size | Usage |
|-------|------|-------|
| `--icon-sm` | `16px` | Inline with text |
| `--icon-md` | `20px` | Buttons, nav items |
| `--icon-lg` | `24px` | Section icons, cards |
| `--icon-xl` | `32px` | Feature highlights |
| `--icon-2xl` | `48px` | Stats, hero sections |

---

## 11. Assets from kidzee.com

### Fonts (TTF files available in sitesucker/)
- `Fredoka-Bold.b10b943099d1beb7.ttf`
- `Fredoka-Light.37b38c82bb847260.ttf`
- `Lato-Regular.c44e96b6632c6d83.ttf`
- `Sniglet-Regular.11787626bc8f32c7.ttf`

### Logos (available in sitesucker/)
- `kidzee_logo.ad9653e32eef47bf.svg` — Primary logo
- `KidzeeFooterLogo.e7fa21a05c991232.png` — Footer variant
- `KidzeeFooterLogo_whiteText.7ecbc8bc34bc72c4.png` — White text variant

### Decorative (available in sitesucker/)
- Wave backgrounds (mobile/desktop)
- Character illustrations (monkey, butterfly, bird, fish)
- Program icons (playgroup, nursery, kindergarten)

---

## 12. Audit: Current App vs Design System

### Color Hardcoding (BEFORE)

| File | Hardcoded Values | Status |
|------|-----------------|--------|
| `page.tsx` (home) | 15+ Tailwind color classes | Needs migration |
| `header.tsx` | 8+ gradient/color classes | Needs migration |
| `footer.tsx` | 6+ gradient/color classes (wrong palette!) | Needs migration + fix |
| `activity-card.tsx` | 7 hardcoded gradient arrays + 12+ colors | Needs migration |
| `year-selector.tsx` | 4+ color classes | Needs migration |
| `admin/page.tsx` | 20+ color classes | Needs migration |
| `admin/login/page.tsx` | 10+ color classes | Needs migration |

### Key Issues Found

1. **Footer uses wrong brand colors** — Purple-Blue-Cyan gradient instead of brand purple
2. **No Fredoka/Sniglet/Lato fonts** — App uses system Arial
3. **100+ hardcoded Tailwind color classes** — No CSS variables
4. **No tailwind.config.ts** — Can't customize theme
5. **Inconsistent gradients** — Header and hero use slightly different warm gradients
6. **No focus/disabled states** — Accessibility gap
7. **No dark mode support** — No theme toggle infrastructure

### Migration Priority

1. **P0 (Critical):** Install brand fonts (Fredoka, Lato, Sniglet)
2. **P0 (Critical):** Create CSS variables + Tailwind config with token values
3. **P1 (High):** Fix footer to use brand purple gradient
4. **P1 (High):** Replace all hardcoded colors with CSS variable references
5. **P2 (Medium):** Add component variants (Button, Card, Input)
6. **P2 (Medium):** Add focus states and accessibility improvements
7. **P3 (Low):** Add dark mode support
8. **P3 (Low):** Add decorative Kidzee illustrations

---

## 13. Implementation: CSS Variables

```css
/* Add to globals.css */
:root {
  /* Brand */
  --color-primary: #65318E;
  --color-primary-dark: #4A2366;
  --color-primary-light: #8B5CB8;
  --color-accent: #FFF200;
  --color-accent-warm: #FFC107;

  /* Warm palette */
  --color-orange: #FD7E14;
  --color-orange-dark: #E86A00;
  --color-pink: #E91E8C;
  --color-yellow: #FFD700;

  /* Semantic */
  --color-success: #198754;
  --color-warning: #FFC107;
  --color-error: #DC3545;
  --color-info: #0DCAF0;

  /* Neutrals */
  --color-text: #282828;
  --color-text-secondary: #6C757D;
  --color-text-muted: #ADB5BD;
  --color-bg: #FFFBF5;
  --color-bg-alt: #F8F9FA;
  --color-surface: #FFFFFF;
  --color-border: #DEE2E6;

  /* Typography */
  --font-display: 'Fredoka', cursive;
  --font-body: 'Lato', sans-serif;
  --font-accent: 'Sniglet', cursive;

  /* Spacing base */
  --space-unit: 0.25rem;

  /* Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.10);

  /* Motion */
  --duration-fast: 100ms;
  --duration-normal: 150ms;
  --duration-slow: 300ms;
  --easing: ease-in-out;
}
```

---

*This is a living document. Update when brand guidelines change or new components are added.*

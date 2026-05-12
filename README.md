# Mall of America — Interactive Commercial Sales Deck

A cinematic, fully interactive browser-based sales presentation for Mall of America's commercial team. Designed to feel less like a website and more like a curated keynote — editorial typography, cinematic media, and a non-linear chapter system inspired by Digideck and Apple keynotes.

**Built for:** Prospective retail tenants, luxury maisons, brand sponsors, and event partners
**Deploy:** Vercel / Netlify / any static host

---

## What It Is

Not a website. Not a slide deck. A purpose-built interactive sales tool that:

- Creates emotional buy-in within 10 seconds — cinematic hero MP4, mask-reveal headline, editorial stat row
- Lets prospects control their journey non-linearly via a left chapter rail (01–08)
- Carries a **signature floating logo** that travels with the viewer — anchoring brand identity through every chapter
- Drives toward 3 commercial actions: **leasing**, **sponsorship**, **event booking**
- Works screen-shared on a sales call OR sent as a standalone link

---

## Chapters

| # | Section | Purpose |
|---|---|---|
| 00 | **Hero** | Cinematic intro — autoplay MP4, mask-reveal headline, anchored CTAs |
| 01 | **Why MOA** | The data case — 40M visitors, parallax ghost typography, catchment map |
| 02 | **Retail** | Tenant marquee, editorial leasing tiers, pull-quote insight |
| 03 | **Luxury** | Premium wing — named maisons, atmosphere copy, editorial spread |
| 04 | **Dining** | F&B ecosystem — editorial venue list, opportunity tiers |
| 05 | **Entertainment** | Attractions mosaic — Nickelodeon Universe, SEA LIFE, FlyOver |
| 06 | **Events** | Underline-tab event types, past activations, capability spread |
| 07 | **Sponsorship** | 3-tier activation menu, audience snapshot, past brand wins |
| 08 | **Partnership** | Editorial inquiry sheet — bottom-line inputs, kicker labels |

Between chapters: **ImageInterlude** and **VideoInterlude** components provide cinematic full-bleed parallax breathing room.

---

## Signature Interactions

- **Floating Logo** — Travels through three phases: ARRIVAL (hero, top-right), TRAVEL (inline with the navbar wordmark, perfectly aligned via flexbox), LANDING (footer slot). Phase detection via IntersectionObserver — robust against reflows, font-loading, and scroll overshoot.
- **Digideck-style Chapter Rail** — Persistent left numeric index 01–08 with hover labels and active-state hairline.
- **Live Chapter Readout** — Top bar shows the current chapter number + label as you scroll.
- **Mask-line Headline Reveal** — Hero headline animates line-by-line from below a mask, with a gilded gradient on the final line.
- **Custom Gold Cursor** — Dot + trailing ring follower throughout.
- **Lazy-mounted Video Interludes** — IntersectionObserver gates iframe/video mounting for performance.

---

## Tech Stack

- **React 19 + Vite 8** — modern component architecture, fast HMR
- **Framer Motion 12** — spring physics, AnimatePresence, scroll-triggered reveals
- **Tailwind CSS v4** — layout utilities
- **Fonts:** Bebas Neue (display), Italiana + Cormorant Garamond (editorial serif), DM Sans (UI)
- **IntersectionObserver** — scroll-triggered reveals, count-ups, lazy media, logo phase detection
- **HTML5 `<video>`** — local autoplay MP4 hero with poster fallback

---

## Setup

```bash
git clone https://github.com/YOUR_USERNAME/moa-deck
cd moa-deck
npm install
npm run dev       # development at http://localhost:5173
npm run build     # production build → /dist
npm run preview   # preview production build locally
npm run lint      # ESLint
```

### Required assets in `/public`

| File | Purpose |
|---|---|
| `hero.mp4` | Cinematic hero background (H.264 + AAC, ~1080p, recommended ≤15 MB) |
| `hero-poster.jpg` | Hero poster — shown before video decodes & if video fails |
| `moa logo.svg` | Brand mark used by FloatingLogo, navbar, footer |
| `dinning.jpeg` | Dining interlude image |
| `mutlistory interior.jpeg` | Interior interlude image |
| `videos/nicklodean.mp4` | Nickelodeon Universe drone clip (Attractions interlude) |

### Deploy to Vercel

```bash
npm i -g vercel && vercel --prod
```

Or import the repo at vercel.com — zero config needed.

### Deploy to Netlify

Drag the `/dist` folder to netlify.com/drop after `npm run build`.

---

## Design System

**Aesthetic:** Dark luxury editorial — Saint Laurent restraint + Tesla data confidence + Apple keynote pacing.

**Color tokens** (defined in `src/index.css`):

- `--ink` `#0A0A0A` — primary background
- `--gold` `#C9A84C` — primary accent
- `--gold-light` `#F0D58A` — gilded highlight (used in gradient text)

**Typography:**

- **Bebas Neue** — compressed display headlines
- **Italiana** — editorial serif numerals & wordmarks
- **Cormorant Garamond** — italic editorial captions
- **DM Sans** — UI / kickers / body

**Motion:**

- Custom easing token `--ease-cinema: cubic-bezier(0.22, 1, 0.36, 1)` for restrained acceleration
- Spring physics for the floating logo (stiffness 110, damping 24)
- All animations IntersectionObserver-gated — no scroll listeners doing layout work

---

## AI Asset Manifest

Detailed prompts for generating cinematic imagery and video are in `prompts/AI-PROMPTS.md` — covering Midjourney, Flux, DALL·E, Veo, Runway, Kling, and Luma Dream Machine. Use them to produce drop-in replacements for the placeholder media.

---

## Folder Structure

```
moa-deck/
├── public/
│   ├── hero.mp4              # cinematic hero loop
│   ├── hero-poster.jpg       # poster / fallback
│   ├── moa logo.svg          # brand mark
│   ├── dinning.jpeg
│   ├── mutlistory interior.jpeg
│   └── videos/
│       └── nicklodean.mp4
├── prompts/
│   └── AI-PROMPTS.md         # cinematic image/video prompt manifest
├── src/
│   ├── components/
│   │   ├── Navigation.jsx    # Top bar + left chapter rail + mobile sheet
│   │   ├── FloatingLogo.jsx  # Signature floating logo (3-phase)
│   │   ├── ImageInterlude.jsx# Full-bleed parallax image strip
│   │   ├── VideoInterlude.jsx# Lazy-mounted MP4 / YouTube interlude
│   │   ├── Cursor.jsx        # Custom gold cursor
│   │   └── Footer.jsx        # Footer + landing slot for FloatingLogo
│   ├── sections/
│   │   ├── Hero.jsx          # Local MP4 + poster + mask-reveal headline
│   │   ├── WhyMOA.jsx        # Stats, parallax ghost type, catchment
│   │   ├── Retail.jsx        # Marquee + editorial leasing tiers
│   │   ├── Luxury.jsx        # Premium wing editorial spread
│   │   ├── Dining.jsx        # F&B editorial list
│   │   ├── Entertainment.jsx # Attractions mosaic
│   │   ├── Events.jsx        # Underline tabs + past highlights
│   │   ├── Sponsorship.jsx   # 3-tier activation menu
│   │   └── Leasing.jsx       # Editorial inquiry sheet
│   ├── hooks/
│   │   └── useIntersection.js# useIntersection + useCountUp
│   ├── index.css             # Tokens, base styles, utilities, logo phase CSS
│   ├── App.jsx               # Section orchestration + interludes
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## Performance Notes

- Hero MP4 should be re-encoded to H.264 baseline + AAC, ~1080p, target ≤15 MB for fast first-paint. Use HandBrake's "Web" preset.
- All non-hero videos are IntersectionObserver-gated — they don't mount until near the viewport.
- Images in interludes use `loading="lazy"` + `decoding="async"`.
- Custom cursor is disabled below `lg` breakpoint to keep mobile responsive.

---

## Roadmap

1. Three.js interactive floor plan / property map for tenants
2. Sponsorship ROI calculator with live audience modeling
3. Headless CMS (Sanity / Contentful) so the commercial team can update stats without redeploying
4. Analytics layer — track prospect engagement signals into CRM (HubSpot / Salesforce)
5. URL-based personalization (`?audience=luxury-tenant` swaps copy & emphasis)
6. Mobile-first PWA for offline rep use on showroom iPads
7. Multi-language editions (CN / KR / JP) for international tenant outreach

---

## Credits

- **Design & engineering:** crafted with Cascade (Windsurf) + Claude (Anthropic)
- **Imagery & video:** placeholders sourced from publicly available MOA media; production builds should use the AI prompt manifest in `prompts/AI-PROMPTS.md` or licensed footage
- **Fonts:** Google Fonts (Bebas Neue, Italiana, Cormorant Garamond, DM Sans)


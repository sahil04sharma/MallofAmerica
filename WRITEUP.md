# Mall of America — Design & Build Write-Up

**Live:** [mallof-america.vercel.app](https://mallof-america.vercel.app)
**Repo:** [github.com/sahil04sharma/MallofAmerica](https://github.com/sahil04sharma/MallofAmerica)

---

## The Brief, in One Sentence

Replace the fragmented sales process — YouTube videos, PDFs, spreadsheets, verbal narration — with a single, cinematic, browser-based experience that makes a prospective tenant, sponsor, or event partner say *"I need to be here"* in the first ten seconds.

---

## Design Rationale

### Why "editorial" instead of "tech startup"

Most sales decks default to a sans-serif, data-heavy, utility aesthetic. That works for SaaS. It does not work for a property that hosts Tiffany & Co., KATSEYE concerts, and Nickelodeon Universe under one roof. The competitive set isn't HubSpot — it's *Vogue*, *Architectural Digest*, and the Saint Laurent flagship's e-commerce experience.

So the type system mirrors that:
- **Bebas Neue** for compressed, cinematic display headlines (Apple keynote-style scale)
- **Italiana** for editorial serif numerals & wordmarks (luxury fashion houses use this exact lineage)
- **Cormorant Garamond** italic for captions (editorial pull-quotes)
- **DM Sans** for kickers and UI (only place a clean modern sans is allowed)

Color is restrained on purpose: near-black `#0A0A0A` and a single hand-picked gold `#C9A84C`. No second accent, no gradient stack, no "brand spectrum." Restraint reads as confidence.

### Why a Digideck-style chapter rail (and not a top nav)

The brief explicitly references Digideck. The pattern matters because a sales rep needs to **jump non-linearly** during a live call — "let me show you the sponsorship tiers" — without scroll-hunting. A persistent left rail with numeric chapters (01–08) gives:

- Constant orientation (which chapter the prospect is in)
- Single-click jump to any section
- Hover-to-reveal labels keep the rail visually quiet
- A bottom-right vertical progress indicator reinforces "where am I in the deck"

Combined with **arrow-key navigation**, a rep can drive the whole presentation from the keyboard during a screen-share. Mouse never needed.

### The signature interaction: the floating logo

The brief asks for something *memorable*. Most decks settle for nice scroll animations. I wanted one element that anchors brand identity through the entire experience — visible in every chapter, evolving as the user travels.

The MOA logo:
1. **ARRIVAL** — sits large, top-right of the hero
2. **TRAVEL** — descends into the navbar, perfectly aligned next to the wordmark
3. **LANDING** — flies down into the footer brand mark

Implementation lesson learned the hard way: a `position: fixed` element animating to align with a flow-positioned text node is fundamentally fragile (font reflow, scroll-driven padding changes, spring overshoot all cause sub-pixel drift). The robust solution is **flexbox does the alignment, animation does the transition**. Real `<img>` elements live inside the navbar and footer slots; the floating logo only handles the in-between phases and crossfades with the inline ones. IntersectionObserver — not scroll math — drives phase changes.

### The signature data moment: live visitor ticker

The brief's #1 goal is "make them feel the scale within seconds." Numbers do that better than words. A live, ticking counter — "Live · Today · 47,283 Guests" — in the top-right of the hero turns abstract scale ("40 million annual visitors") into a visceral, current-moment fact. The number is calculated from time-of-day against a realistic daily baseline (110K guests/day), so it always feels plausible.

### Why mask-line headline reveals

Most landing pages animate headlines with a single fade-in. Editorial design (think *The New York Times Magazine* opening spreads) reveals headlines line-by-line, each rising from beneath a mask. It takes 2.5 seconds longer but signals "this was crafted, not generated." The final line uses a gilded gradient text-fill — the only place in the entire deck I use a gradient.

### Why Phase 2 modules are first-class, not stretch goals

The brief says Phase 2 ("Events, Sponsorship, Leasing Paths") is optional. I built all three as full chapters because they're where the **business actions** live. A deck that only shows "what MOA is" without giving each prospect type their own targeted module misses the entire point — the deck is a sales tool, not a brochure.

- **Events (Ch. 06)** — underline-tab module with 4 event types, past activations, capability spread
- **Sponsorship (Ch. 07)** — 3-tier activation menu (Founding / Strategic / Activation), audience snapshot
- **Partnership (Ch. 08)** — editorial inquiry sheet with category-aware copy that reframes itself based on which path is selected

---

## How I Used AI

| Tool | Used For |
|---|---|
| **Cascade (Windsurf) + Claude** | Architecture, all components, copywriting, refactoring, debugging |
| **Nano Banana** | Generated atmospheric interior + dining imagery (in `/public`) |
| **Midjourney v6 / Flux Pro** | Prompted via `prompts/AI-PROMPTS.md` — luxury wing renderings, aerial exteriors |
| **Veo / Runway / Kling** | Prompts staged for cinematic event/luxury footage (drop-in ready) |

The full prompt manifest with reproducible prompts lives at [`prompts/AI-PROMPTS.md`](./prompts/AI-PROMPTS.md). Each prompt is tuned for the specific section, with style anchors ("Saint Laurent campaign," "1992 Annie Leibovitz") to keep generations on-brand.

**Where AI saved the most time:** copywriting tone calibration. The difference between "MOA hosts events" (generic) and "Three hundred events a year. Forty million captive guests. Every activation amplified." (the actual deck copy) is hours of iteration that AI compressed to minutes.

---

## Performance & Production Notes

- Hero MP4 served as a single H.264 file with `<link rel="preload">` for instant first paint
- Poster image always renders as a base layer — even before video decodes, even offline
- All non-hero videos and interlude images are IntersectionObserver-gated (no eager mounting)
- Custom cursor disabled below `lg` breakpoint (mobile reads as native)
- Italiana / Cormorant / DM Sans / Bebas Neue all preconnected to Google Fonts
- Open Graph + Twitter card metadata so the URL renders beautifully in Slack / iMessage / LinkedIn

---

## What I'd Build With Another Week

1. **Three.js interactive floor plan** — let prospects click any storefront on a 3D map, see the suite size, current tenant, and click "Inquire about this space"
2. **Sponsorship ROI calculator** — slider for budget, picks tier, shows projected impressions / activations / earned media
3. **Headless CMS** (Sanity or Contentful) — so the commercial team can update stats, swap tenant logos, post new past activations without a redeploy
4. **Analytics layer** — heatmap which sections each prospect lingers on, push the engagement signal into HubSpot/Salesforce so reps follow up smarter
5. **URL-based personalization** — `?audience=luxury-tenant` swaps copy emphasis (lead with Luxury chapter, deprioritize pop-ups)
6. **Mobile PWA** — offline-cached for showroom iPad use, no wifi dependency
7. **Multi-language editions** (CN / KR / JP) for international tenant outreach

---

## What I'd Tell the Commercial Team

This deck has one job: get the meeting. Every chapter ends pointing at the same place — the editorial inquiry sheet. The story compounds: scale → retail → luxury → dining → entertainment → events → sponsorship → "now let's talk." If a prospect makes it past Chapter 3, they're qualified. If they fill out the form, they're closing themselves.

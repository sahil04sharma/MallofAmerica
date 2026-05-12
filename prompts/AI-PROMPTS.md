# AI Asset Prompt Manifest

This deck uses AI-generated imagery for cinematic interludes between chapters.
Each prompt below is engineered for **Midjourney v6 / Flux 1.1 Pro / DALL-E 3** with a unified visual language: editorial, cinematic, restrained gold-and-shadow palette consistent with the deck's typography system (Bebas Neue / Italiana / Cormorant Garamond).

## Visual System

All prompts share these constraints to ensure visual cohesion:

```
--ar 21:9                  # cinemascope aspect for full-bleed strips
--style raw                # Midjourney — no auto-stylization
--quality 2 --v 6          # high fidelity
mood: editorial, cinematic, low-key luxury, deep shadows, warm gold accents
palette: charcoal #0A0A0A, warm gold #C9A84C, ivory whites, no neon
lighting: directional, soft falloff, single key light, atmospheric
no people facing camera unless specified — figures should be incidental
no logos, no text, no signage
post: subtle film grain, slight desaturation, mild contrast lift
```

---

## 1. Scale — Grand Atrium Interlude
**Used between**: WhyMOA → Retail
**Replaces**: `INTERLUDES.scale`

```
A vast, multi-story interior atrium of an enormous luxury shopping mall,
shot from a low cinematic drone angle looking up. Glass skylights above,
a single distant figure walking, dramatic warm gold spill from premium
storefronts below, deep shadow in mid-ground, soft volumetric light rays.
Architectural scale evokes a grand hotel lobby, not a retail center.
21:9 cinematic, editorial photography, low ISO film aesthetic, dusk-blue
ambient with gold accent lighting, restrained color, mild grain.
--ar 21:9 --style raw --v 6
```

---

## 2. Luxury Wing — Premium Boutique Aisle
**Used between**: Retail → Luxury
**Replaces**: `INTERLUDES.luxuryWing`

```
Empty luxury boutique corridor at twilight. Polished black marble floor,
brushed brass detailing, a row of unbranded glass storefronts each lit
internally with warm gold light. Hermetic, hushed atmosphere — closer
to a Parisian flagship than a mall. Single distant silhouette of a
shopper carrying a paper bag. Shallow depth of field, anamorphic lens
flare, deep shadow in foreground, gold highlights in mid-ground.
21:9, magazine fashion editorial, cinematic, no signage or text.
--ar 21:9 --style raw --v 6
```

---

## 3. Dining — Atmospheric Fine Restaurant
**Used between**: Luxury → Dining
**Replaces**: `INTERLUDES.dining`

```
Wide editorial shot of an upscale restaurant interior at golden hour.
Dark wood tables, warm pendant lights casting amber pools, a few
silhouetted diners in soft focus, glass walls hinting at a bustling
mall corridor beyond. Wine glasses catching light, brass details,
minimal styling, no text on menus. Mood is hushed, intentional,
slightly cinematic — Soho House meets Le Bernardin. Shot on a 35mm
prime, slight bloom on highlights, deep blacks.
--ar 21:9 --style raw --v 6
```

---

## 4. Attractions — Theme Park Energy
**Used between**: Dining → Entertainment
**Replaces**: `INTERLUDES.attractions`

```
Long-exposure photograph of an indoor theme park rollercoaster track,
showing motion light trails of a coaster cart streaking through the
frame. Massive vaulted ceiling, dramatic uplighting on neon-purple and
gold accents, a Ferris wheel partially visible at far right. Dwarfed
human figures watching from a balcony, scale emphasized. Cinematic,
high contrast, deep shadows, warm color grade with electric purple
accent. 30-second exposure aesthetic, slight chromatic aberration.
--ar 21:9 --style raw --v 6
```

---

## 5. Events — Concert Stage Moment
**Used between**: Entertainment → Events
**Replaces**: `INTERLUDES.events`

```
Wide shot from the back of a live concert venue, audience silhouettes
in foreground (no faces visible), stage lit with warm gold spotlights
from above, single performer (silhouetted, no recognizable identity)
center stage. Atmospheric haze, light beams cutting through smoke,
audience phones held up dotting the dark with tiny gold pinpricks.
Editorial concert photography, shot on Canon R5 with 70-200 f/2.8,
high ISO film grain, shadow-heavy, anamorphic flare.
--ar 21:9 --style raw --v 6
```

---

## 6. Hero Poster — Drone Approach
**Replaces**: `/public/hero-poster.jpg`

```
Cinematic drone shot at blue hour approaching the exterior of a vast,
illuminated modern shopping complex set against a wide Midwestern sky.
Building reads as architectural icon, not a strip mall — clean glass,
warm interior glow visible through skylights, parking infrastructure
softened by twilight. Gradient sky from deep navy at top to warm amber
at horizon. Subtle atmospheric haze, single small aircraft contrail
crossing upper third. 16:9, hyper-cinematic, Roger Deakins-influenced
color grade. No text, no recognizable signage.
--ar 16:9 --style raw --v 6
```

---

## Generation Workflow

1. **Generate** each prompt in Midjourney/Flux/DALL-E (suggest 4 variations per prompt, pick the strongest).
2. **Upscale** to minimum 2400px width for retina sharpness.
3. **Optimize** through Squoosh or `sharp` to WebP at quality 80, target ~250KB each.
4. **Place** in `/public/interludes/` as: `scale.webp`, `luxury-wing.webp`, `dining.webp`, `attractions.webp`, `events.webp`, `hero-poster.webp`.
5. **Update** the `INTERLUDES` object in `src/App.jsx` to point at the local paths.

## AI Tools Used in This Project

| Asset Class | Tool | Use |
|---|---|---|
| Cinematic interlude imagery | Midjourney v6 / Flux 1.1 Pro | Section-divider full-bleed stills |
| Hero poster (video fallback) | Midjourney v6 | Architectural exterior at blue hour |
| Component scaffolding & copywriting iteration | Claude Sonnet 4.5 | Editorial caption writing, narrative pacing review |
| Code refactoring & animation choreography | Claude Sonnet 4.5 (Cascade) | Implementation, motion-design, refactor passes |

All AI outputs were art-directed, color-corrected, and editorially curated to match the deck's restrained luxury visual system.

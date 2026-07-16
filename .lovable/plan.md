# Premium Corporate Redesign — AEGIS POWER INTEGRATIONS

Positioning: **60% Engineering Company / 40% AI System Integration**. Target audience: NTT, Google, semiconductor fabs, EPC contractors, enterprise IT. Reference bar: Siemens / Schneider Electric / Honeywell / Cisco / Dell — restrained, corporate, technology-forward. Keep existing brand colors (deep navy, graphite, cool white, tech blue), logo, and Traditional Chinese primary language with English secondary.

## Design system refinements (`src/styles.css`, chrome)

- Tighten type scale: display for hero (clamp 2.75–4.25rem), refined H2/H3 rhythm, generous letter-spacing on eyebrows and uppercase labels.
- Corporate spacing: wider section padding (`py-24 md:py-32`), 12-column grid, larger container max-width (1280px).
- Motion: subtle fade/slide-in on scroll via `framer-motion` (already common). No showy animations — enterprise restraint.
- Icons: Lucide, thin stroke, uniform 20/24 sizing in rounded neutral tiles (no gold-heavy accents on every card).
- Buttons: refine `btn-primary` (deep navy) + `btn-outline` (border, ghost hover). Consistent 44px height.
- Cards: hairline borders, soft elevation on hover only, no gradient fills.
- Site nav: keep sticky, add faint bottom border on scroll; refine active state to underline accent.
- Footer: fix the run-on line (already done), reorganize into 4 columns (Engineering / AI Integration / Business Applications / Company) + legal row with Privacy & Terms links.

## Home page (`src/routes/index.tsx`) — full rebuild of sections

1. **Hero**
   - Headline: `Engineering × AI × Digital Transformation`
   - Sub: enterprise-grade integration partner for semiconductor, data center, and enterprise customers.
   - CTAs: `Contact Us` → `/contact`, `View Services` → `/engineering`.
   - Background: existing fiber hero image with dark gradient overlay for legibility.

2. **Trust Metrics** — 4 stat cards (years of engineering experience, projects delivered, industries served, enterprise integrations). Use placeholder-friendly figures ("15+", "200+", "6", "24/7").

3. **Industries We Serve** — 6-card grid: Semiconductor, Data Centers, Manufacturing, Commercial Buildings, Energy & ESG, Enterprise AI. Each with icon + short EN/ZH description.

4. **Engineering Services** — 6 cards: Structured Cabling, Fiber Optic Installation, Electrical Integration, Mechanical Coordination, Project Management, Decommission Services.

5. **AI Integration** — 6 cards: Workflow Automation, AI Agent, CRM, ERP, Business Intelligence, Enterprise AI.

6. **Business Applications** — product cards for Aegis CostFlow, Aegis SalesOps, Aegis AI Launch (existing routes), with concise value props.

7. **Why Choose Us** — 5 items: Engineering Experience, Professional PM, Enterprise Integration, Fast Response, Scalable Solutions.

8. **Project Experience** — 4–6 anonymized case cards (industry / scope / outcome), no client names. Uses existing engineering imagery.

9. **CTA band** — final "Contact Us / Book a Consultation" strip before footer.

## Contact page (`src/routes/contact.tsx`)

- Swap Gmail for enterprise placeholders:
  - `johnny@aegispowerapi.com` (general / partnerships)
  - `sales@aegispowerapi.com` (sales / RFQ)
- Update in contact cards, form fallback link, footer contact block (`site-chrome.tsx`).

## Footer (`site-chrome.tsx`)

Columns: Engineering / AI Integration / Business Applications / Company (About, Contact) + legal row (Privacy Policy, Terms). Create placeholder routes:
- `src/routes/privacy.tsx`
- `src/routes/terms.tsx`

## SEO & performance

- Ensure canonical uses production domain (`https://aegispowerapi.com`) via `src/lib/seo.ts`.
- Tighten meta titles/descriptions on home to match new positioning (Engineering × AI).
- Add `loading="lazy"` and explicit `width`/`height` on below-the-fold images.
- Preload hero image via root `head().links` for LCP.

## Out of scope

- No changes to BuildQuest sub-app, Aegis product deep pages beyond copy alignment, or backend.
- No new brand palette — refinement only within existing tokens.

## Tech notes

- Framer Motion already available; use `motion.div` with `whileInView` for subtle reveals.
- Reuse existing image assets under `src/assets/`.
- All copy remains bilingual (ZH primary + EN secondary label where applicable), matching current site tone.

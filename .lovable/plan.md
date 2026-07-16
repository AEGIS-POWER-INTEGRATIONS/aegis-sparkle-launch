
# AEGIS POWER INTEGRATIONS — 全面優化計畫

Scope: extend the current site (do NOT rebuild). Prior turns already delivered: bilingual scaffolding (`src/lib/i18n.tsx`), footer with Privacy/Terms links, `/privacy`, `/terms`, `/industries` hub + 7 industry pages, `/insights` hub + 8 entries, sitemap.xml with new routes, header nav with 中/EN switcher.

Given the volume, work is split into **5 landable phases**. Each phase leaves the site in a shippable state.

---

## Phase 1 — Single source of truth & trust-safe copy (foundation)

Everything else depends on this.

1. Create `src/lib/site-config.ts` — one file for company name, legal name, address, `johnny@` and `sales@` emails, phone (placeholder), social, default CTAs. Replace hardcoded copies in `site-chrome.tsx`, `contact.tsx`, `__root.tsx`, JSON-LD blocks.
2. Grep and remove any lingering `hello@aegis.app`, `jtianfalcon@gmail.com`, Gmail addresses, or unrelated brand names.
3. Sweep home + all landing pages for forbidden claims: "20+ 專案", "1000+", "24/7", "保證", "零風險", "絕對安全", Google/NTT/customer logos or names. Replace with the qualitative capability statements from spec §5.
4. Add the disclosure line on `/energy-experience` and any project-experience card: "本頁部分內容為核心團隊過往參與之專案經驗，實際承攬主體及合作範圍依個別專案為準。"

## Phase 2 — Navigation, footer, contact, forms

1. Header nav (both desktop and mobile hamburger — add mobile menu if missing) reflects final IA:
   `首頁 / 工程服務 / AI 系統整合 / 企業應用 / 產業解決方案 / 專案經驗 / 案例與觀點 / 關於我們 / 聯絡我們`.
   Language switcher moves into hamburger on mobile.
2. Footer already restructured — verify columns match spec §17 exactly (Services / Company / Legal / Contact) and pull from `site-config`.
3. `/contact` form rebuild:
   - Fields per spec §15 (name, company, title, email, phone, service, company size, current systems, pain points, timeline, budget, notes).
   - Zod validation both languages; success message per spec.
   - Reply-time text: "原則上將於 1–2 個工作日內回覆".
   - Consent checkbox tied to `/privacy`.
   - Service options list per spec.
4. `/demo` (預約諮詢) aligned to same form pattern with a subset of fields.

## Phase 3 — Content pages: engineering / AI / business apps / pricing / about

Rewrite copy blocks (not layouts) to spec:

1. `/engineering` — add the 8-step execution flow (site survey → handover) and expanded capability list; remove any absolute-guarantee wording.
2. `/ai-integration` — reframe as enterprise workflow (not chat tool); add 7-step adoption flow; add data-governance section limited to actually-doable items (permissions, audit log, third-party disclosure, data-scope confirmation). Change "custom software development" language to "系統配置、流程整合與必要功能擴充".
3. `/costflow`, `/salesops`, `/ai-launch` — replace "立即購買 / 免費試用" CTAs with 預約展示 / 需求訪談 / 申請導入評估. Flag anything not shipped as 規劃中.
4. `/pricing` — restructure into 5 cooperation models (診斷評估 / 月費顧問 / 企業專案 / 工程專案 / 教育訓練). Remove fixed prices; use "依需求個別評估" language.
5. `/about` — restructure per spec §14 (positioning, background, philosophy, service model, capabilities, engineering×AI integration, cooperation flow, team roles, direction, CTA). Neutral wording on legacy ERP vendors.

## Phase 4 — Experience, industries, insights expansion

1. `/energy-experience` → rename purpose to "專案經驗總覽" with 8 categories per spec §13, kept anonymized; retain existing energy assets under one category.
2. Industries: add the 3 missing pages per spec §9 (Professional Services / 商務中心與共享辦公 / 批發、貿易與供應鏈) to the existing 7, using the same data-driven template.
3. Insights: add remaining article stubs from spec §12 list (currently 8; spec suggests 12). Add table of contents, related articles, related services, share buttons, publish date, cover placeholder to article template. Kept anonymized and methodology-focused.

## Phase 5 — SEO, hreflang, privacy/terms polish, QA sweep

1. Per-page bilingual `title` / `description`. Add `<link rel="alternate" hreflang="zh-TW">`, `hreflang="en">`, `hreflang="x-default">` on every route via `head().links`. Since we use a single-URL bilingual model, both hreflang variants point to the same URL — document that trade-off in a code comment (true `/en/*` routes are out of scope this pass).
2. Verify `og:image`, canonical, og:url self-reference each leaf route.
3. Expand `/privacy` and `/terms` to the full section list in spec §18, with 生效/更新 dates and the ZH-authoritative clause.
4. 404 page: already bilingual — verify.
5. Manual QA sweep: mobile menu, language persistence across routes, no simplified Chinese, no untranslated strings, no dead links, no console errors. Playwright pass on `/`, `/engineering`, `/ai-integration`, `/industries`, `/industries/semiconductor`, `/insights`, `/contact`, `/pricing`, `/about`.

---

## Explicitly out of scope (this plan)

- Visual redesign, new palettes, or new hero imagery.
- `/en/*` prefixed routes (would require duplicating every route file; single-URL bilingual is the agreed model — noted in the previous turn).
- Real backend for the contact form (stays as the current submit path).
- Analytics/GSC integration (requires user OAuth).
- Any new client-logo or testimonial content (blocked on user-supplied approved data).

## Awaiting from you

To finish cleanly I'll need:
- Verified company phone number.
- Confirmed office address (currently: 台中市西區台灣大道二段2號20樓 — please confirm).
- Statutory info: 統一編號 (VAT / 統編) and 負責人 for Terms/Privacy footers.
- Whether `johnny@` and `sales@` mailboxes are live (otherwise I'll mark them as primary but note in an admin comment).
- Any approved anonymized project descriptors you want on `/energy-experience` and the industry pages.
- Green light on omitting all customer logos/names sitewide until you supply approved assets.

## Delivery order

I'll ship Phase 1 → 5 in sequence. Each phase is ~1 turn of edits. If you want a different priority (e.g. Phase 5 SEO first), tell me and I'll reorder.

## Technical notes

- All new copy uses `<L zh en>` / `useLang()` — no new i18n framework.
- Config in `src/lib/site-config.ts` is a plain typed object; imported wherever needed.
- Form validation with `zod` (already in the project).
- No new dependencies expected.
- `src/routeTree.gen.ts` regenerates automatically; not hand-edited.

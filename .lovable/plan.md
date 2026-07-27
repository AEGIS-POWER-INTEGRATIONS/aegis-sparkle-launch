## 第四階段執行計畫（分為 4 個可交付批次）

### 批次 A：SEO 架構 + sitemap + robots（低風險，先做）
- 為每個正式頁面補齊 `head()`：獨立 title / description / canonical / og:*（自我指向 URL）/ JSON-LD。
- 頁面覆蓋：`/`、`/engineering`、`/ai-integration`、`/industries` 與各產業子頁、`/about`、`/company-profile`、`/contact`、`/pricing`、`/privacy`、`/knowledge` 及已完成的知識文章。
- JSON-LD：首頁 `Organization + WebSite`；服務頁 `Service`；文章頁 `Article + BreadcrumbList`；聯絡頁 `LocalBusiness`；FAQ 段落 `FAQPage`。
- 導入 `<Breadcrumb>` 元件於子頁上方。
- 重寫 `src/routes/sitemap[.]xml.ts`：只列 published 路由；排除 draft 文章、`/pricing/success`（若存在）、`404`、`/lovable/*`；讀取 `knowledge.ts` / `insights.ts` 的 `draft: false` 判斷。
- `public/robots.txt` 新增 `Sitemap: https://aegispowerapi.com/sitemap.xml`。
- 關鍵字自然融入指定 12 個主題（不堆疊）。

### 批次 B：知識中心與提示詞庫發布規範
- `src/lib/knowledge.ts` 擴充欄位：`summary`、`toc`、`useCase`、`caveats`、`faq`、`updatedAt`、`author`、`relatedIds`、`ctaHref`；AI 相關文章加 `verifiedAt`、`appliesTo`、`officialSources`、`versionNotice`。
- 知識文章模板 `src/routes/knowledge.$slug.tsx` 補齊：目錄、CTA、相關文章、更新日期、免責。
- 未含完整欄位者標記 `draft: true`，不出現在 sitemap，也不生成公開頁。
- 提示詞頁 `src/routes/knowledge.prompts.$slug.tsx`：複製按鈕（`navigator.clipboard` + sonner 成功提示）、適用情境、前置資料、變數說明、輸出範例、注意事項、版本紀錄、相關推薦。
- 桌機顯示側欄目錄，手機改浮動 TOC 按鈕（不遮擋正文）。

### 批次 C：圖片效能（風險中等）
- 啟用 `vite-imagetools`，對 `src/assets` 中 Hero/首屏圖產出 `.webp` / `.avif` 變體 + `<picture>` 元素。
- Logo 若目前為 PNG，改用既有 SVG 版本；`api-mark.png` 保留為 favicon 尺寸。
- 明確 `width`/`height` 避免 CLS；首屏加 `fetchpriority="high"`，其餘 `loading="lazy" decoding="async"`。
- 檢查所有 `<img alt>`：資訊性補描述，裝飾性用 `alt=""`。
- 產出前後大小對照表。

### 批次 D：中英文正式雙語架構（風險高、影響最大）
- 加入 `/zh-tw/*` 與 `/en/*` 兩組平行路由（透過 layout route），維持根路由 `/` 為 `zh-tw` 別名並 302 → `/zh-tw/`（或使用 `<link rel="alternate">` + 內容協商，二擇一，將於實作前再確認）。
- 首階段僅對以下 7 頁完成英文正式翻譯：首頁、工程、資料中心、AI 顧問、關於、聯絡、隱私。其餘僅提供中文，英文頁面直接 302 → 對應中文。
- 每頁補 `hreflang`（`zh-Hant-TW`、`en`、`x-default`）、`html lang`、語言切換元件重新啟用。
- sitemap 分別列出兩個語言 URL。

### 批次 E：QA 與報告
- Playwright 巡檢所有公開 URL：狀態碼、canonical、hreflang、breadcrumb、手機溢出。
- `scripts/seo-verify.mjs` 擴充：檢查每頁 title/description 不重複、canonical 自我指向。
- 產出完成報告（頁面清單、sitemap 數、翻譯進度、圖片大小對照、待人工提供資料、建議 GSC 重送清單）。

## 建議執行順序
先做 **批次 A**（純 metadata / sitemap，無視覺風險），完成後回報並讓您驗收；再依序 B → C → D → E。

## 需要您確認的兩件事
1. **雙語 URL 策略**：採 (a) `/` = 中文，`/en/*` = 英文（保留現行網址、SEO 影響最小）；或 (b) 嚴格 `/zh-tw/*` + `/en/*`（現行網址全數 301，較符合您原始描述但風險較高）？
2. **英文翻譯文案**：7 個核心頁的英文正式版是否由我依現有 zh 內容改寫（會標註為 AI 撰寫、您可再校訂），或您會提供正式翻譯稿？

確認後我從批次 A 開始執行。

# 宏鼎集成官網整站優化計畫

範圍極大（18 大類、~200 條需求），為避免破壞既有可運作功能（表單、SEO 驗證、既有路由），分成 **6 階段**執行。每階段結束網站皆為可上線狀態。開始前先做一次全站清單盤點。

---

## 第 0 步：現況盤點（不改檔案，只讀）

- 列出 `src/routes/*` 所有路由 → 標記：保留 / 改寫 / 隱藏 (noindex) / 刪除。
- 檢查 `sitemap[.]xml.ts` 目前包含的 URL。
- 檢查 `src/lib/knowledge.ts`、`src/lib/insights.ts`、`src/lib/industries.ts` 內每篇是否有完整內文，還是只有 stub。
- 檢查 `src/components/site-chrome.tsx` 目前的導覽結構。
- 檢查 `src/routes/pricing.tsx`, `costflow.tsx`, `salesops.tsx`, `ai-launch.tsx` 目前是否還有 SaaS 電商語氣（"立即購買"、"NT$5,000"）。
- 檢查 `src/routes/energy-experience.tsx`、`buildquest.*` 這些是否還在導覽與 sitemap。

盤點結果以短列表在階段 1 起手前回報。

---

## 第 1 階段：核心重定位 + 導覽 + Footer（品牌骨架）

1. **`src/lib/site-config.ts`** 加入新的核心敘述、六大導覽、下拉子項、footer 短定位、統一 CTA 文案。
2. **`src/components/site-chrome.tsx`**：
   - 桌機導覽壓縮成 6 項（工程服務 / 企業 AI 顧問 / 產業方案 / 案例與知識 / 關於宏鼎 / 聯絡我們）+ 右側 CTA「預約需求諮詢」。
   - 每個主項使用 hover dropdown（子項照規格）。
   - 手機漢堡：accordion 展開，字級/間距重排，語言切換移入。
3. **Footer**：改為 4 欄（服務 / 公司 / 法務 / 聯絡）＋ 新公司短定位。移除多餘重複連結。
4. **`src/routes/__root.tsx`** 更新 Organization JSON-LD 的 description 對齊新定位。

驗收：全站每頁的頁首頁尾一致，手機漢堡可用，CTA 皆導向 `/contact?type=...`。

---

## 第 2 階段：首頁 + AI 顧問頁 + 工程頁 完整改寫

只改文字內容與區塊組合，不動配色與框架。

1. **`src/routes/index.tsx`**：H1 改為「工程現場的執行力 / 結合企業 AI 的升級力」＋ 6 大區塊照規格逐一改寫。加 CTA 帶 `?type=engineering` 與 `?type=ai-health`。
2. **`src/routes/ai-integration.tsx`**：頁面 H1 改「成為企業長期合作的外部 AI 事務所」；6 項服務改寫；加入應用情境區塊；移除誤導字樣。
3. **`src/routes/engineering.tsx`**：H1 改「以現場執行力，完成可靠的工程整合」；8 項服務；加入保密聲明；移除任何未經證實的證照/金額/數量。
4. AI 頁大圖亮度：改 CSS gradient overlay `from-ink/50` 或替換較亮的 asset。

---

## 第 3 階段：產業方案 + 合作方式（原 pricing）+ 關於宏鼎

1. **`src/lib/industries.ts`** 重寫，改為「問題 / 宏鼎可協助」結構，四大類（製造 / 工程專案型 / 中小企業 / 環保能源 ESG）並保留資料中心與科技廠子頁。
2. **`src/routes/industries.$slug.tsx`** 模板套用新結構。
3. **`src/routes/pricing.tsx`** → 保留路由但頁面內容重寫為「合作方式」六種模式，全部改為「預約諮詢 / 依需求評估」字樣，移除 SaaS 電商元件（最受歡迎 badge、立即購買等）。
4. Aegis CostFlow / SalesOps / AI Launch：三頁改成「解決方案工具」語氣，加免責語，移除 SaaS 購買 CTA。
5. **`src/routes/about.tsx`**：H1 改「整合工程、流程與技術，讓改變真正落地」，使命、六大原則、合作夥伴網絡措辭；移除任何虛構團隊/認證。

---

## 第 4 階段：案例、知識中心、提示詞、noindex 清理

1. **`src/lib/insights.ts`**：
   - 未完成 stub 從公開列表隱藏（`published: false`）。
   - 「成功案例」頁面標題改為「應用情境與導入觀點」，並在每篇上顯示 badge：實際案例／匿名案例／應用情境／解決方案示例／專業觀點。
   - 移除虛構百分比。
2. **`src/lib/knowledge.ts`** / `src/lib/prompts.ts` / `src/lib/ai-tips.ts`：
   - 未完成文章從列表移除。
   - 每篇保留：標題、摘要、作者、發布日、更新日、分類、閱讀時間、相關文章、返回按鈕、CTA。
   - 提示詞頁加「一鍵複製」按鈕 + 「已複製」提示。
3. **文章模板** `src/components/knowledge/article-template.tsx`：頂部與底部返回按鈕、手機版返回導覽、諮詢 CTA。
4. `src/routes/sitemap[.]xml.ts`：只納入 `published: true` 的文章與正式頁面；移除 `energy-experience`、`buildquest.*`、未完成文章、`/demo`（若已移除）。
5. 未發佈頁在其 `head()` 加 `{ name: "robots", content: "noindex,nofollow" }`。

---

## 第 5 階段：統一諮詢表單 + CTA 路由

1. **`src/routes/contact.tsx`**：
   - 依規格新增/調整欄位（含產業別、公司規模、需求類型下拉、預計導入時間、希望聯絡方式、個資同意）。
   - 讀取 URL `?type=` 預帶需求類型。
   - Zod 驗證、loading state、錯誤保留使用者資料。
   - 送出成功文案照規格。
   - 移除頁面上直接顯示的私人 email（改成「透過表單聯絡」，一般查詢信箱保留但脫敏）。
2. 全站按鈕 audit：所有 `Link to="/contact"` 改帶 `search={{ type }}`。移除失效 / 空按鈕。
3. `/demo` 若仍存在，`Navigate` 302 → `/contact?type=ai-health`（避免破壞既有反向連結），從 sitemap 移除。

---

## 第 6 階段：SEO + 效能 + 視覺一致性 + 驗收

1. **SEO 技術**：
   - 每頁唯一 title / description（尤其 industries 子頁、insights 子頁、knowledge 子頁）。
   - Canonical / og:url 自我引用。
   - Article JSON-LD 補齊；BreadcrumbList 加在深層路由（industries、insights、knowledge）。
   - FAQPage JSON-LD 只加在頁面上真的顯示 FAQ 的頁。
   - hreflang：先保持單網址雙語＋在 `<head>` 明確標示 zh-Hant-TW；不建立殘缺 `/en/*`。
2. **視覺一致性**：
   - Logo 尺寸 checkpoint（桌機 50px / 手機 42px 保持）。
   - 全站容器最大寬度、標題字級、按鈕 hover/focus/disabled 檢查一輪。
   - AI 頁右側大圖 overlay 調亮。
   - `prefers-reduced-motion` 對動畫降級。
   - 檢查 `alt`、對比、鍵盤 focus ring。
3. **效能**：現有圖片已 webp；補上 `loading="lazy"` 給非首屏圖；`fetchPriority="high"` 給 hero。
4. **Playwright 驗收**：`/`, `/engineering`, `/ai-integration`, `/industries`, `/industries/manufacturing`, `/pricing`, `/insights`, `/knowledge`, `/about`, `/contact` — 桌機 + 手機截圖 + console/network 無 error。
5. **最終報告**：列出已改頁面、已新增、已 noindex/隱藏、已修正 SEO 項目、尚需公司提供資料、需要人工確認項目。

---

## 明確不做（以避免破壞或超出承諾）

- 不建立獨立 `/en/*` 子網站（英文內容不足）。
- 不動 Supabase / auth email / `/lovable/*` webhook 相關檔案。
- 不動 Search Console verification meta、`notify.aegispowerapi.com` 相關設定。
- 不改 API keys、.env、`src/integrations/supabase/*`。
- 不刪 `buildquest.*` 路由（僅從 sitemap 與導覽移除，避免破壞既有連結）。
- 不新增未經確認的公司資訊（統編仍留空、地址/電話沿用已驗證值）。
- 不改用新色系或新框架，維持既有品牌識別。

## 需要你確認的兩件事

1. **`/demo` 路由**：直接 301 到 `/contact?type=ai-health`，還是保留為獨立表單？
2. **`buildquest.*` 與 `energy-experience` 頁**：確認可從主導覽 + sitemap 隱藏（保留檔案避免壞連結）嗎？

## 交付方式

每階段一次 turn，結束時簡短回報＋列出下一階段預計動的檔案。全部完成後跑一次 Playwright 全站截圖 + 產出驗收報告。

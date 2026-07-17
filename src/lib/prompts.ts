/**
 * Enterprise Prompt Library — data source.
 *
 * All content is Traditional Chinese (zh-TW). Titles / summaries kept concise
 * for card display; each prompt carries a full structured prompt body with
 * role, task, background, variables, steps, output format, criteria,
 * uncertainty-handling, no-fabrication rule and self-check requirement.
 *
 * NOTE: Prompt content contains variable placeholders in the form [變數名稱].
 * Users are expected to replace these before using the prompt with an LLM.
 */

export type PromptCategory = "website-build" | "system-build" | "management";
export type PromptDifficulty = "beginner" | "intermediate" | "advanced";
export type PromptAudienceTag =
  | "sme"
  | "manufacturing"
  | "engineering"
  | "general";

export const PROMPT_CATEGORY_LABEL: Record<PromptCategory, string> = {
  "website-build": "網站建置",
  "system-build": "系統建置",
  management: "企業管理",
};

export const PROMPT_DIFFICULTY_LABEL: Record<PromptDifficulty, string> = {
  beginner: "入門",
  intermediate: "中階",
  advanced: "進階",
};

export const PROMPT_AUDIENCE_LABEL: Record<PromptAudienceTag, string> = {
  sme: "中小企業",
  manufacturing: "製造業",
  engineering: "工程業",
  general: "通用",
};

export type PromptVariable = { name: string; description: string };

export type Prompt = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: PromptCategory;
  tags: string[];
  audience: string;
  industries: PromptAudienceTag[];
  difficulty: PromptDifficulty;
  updatedAt: string; // ISO
  preparation: string[];
  variables: PromptVariable[];
  promptContent: string;
  usageSteps: string[];
  example: string;
  commonMistakes: string[];
  cautions: string[];
  relatedSlugs: string[];
  seoTitle: string;
  seoDescription: string;
};

/** Common variables reused across many prompts. */
const V = {
  company: { name: "[公司名稱]", description: "貴公司正式名稱" },
  industry: { name: "[所屬產業]", description: "例如：精密機械製造、系統整合、工程顧問" },
  size: { name: "[員工人數]", description: "例如：25 人、120 人、500 人以上" },
  service: { name: "[主要服務或產品]", description: "貴公司主要提供的產品或服務" },
  audience: { name: "[目標客戶]", description: "例如：中型製造業採購主管、地區政府採購單位" },
  problem: { name: "[目前遇到的問題]", description: "簡述目前想解決的問題與情境" },
  budget: { name: "[預算範圍]", description: "例如：NT$ 30 萬 – 60 萬；未定" },
  deadline: { name: "[預計完成時間]", description: "例如：Q2 上線、3 個月內" },
} as const;

const NO_FAB = "若下列變數尚未填寫或資訊不足，請直接列出缺漏欄位並詢問使用者，不要自行假設或編造資料。";
const SELF_CHECK =
  "產出結束後，請在最後條列自我檢查：(1) 是否有虛構的數字、法規、標準或客戶名稱；(2) 是否忽略任何未填寫的重要變數；(3) 是否明確標示假設條件。";

/** Standard tail appended to every prompt. */
const PROMPT_TAIL = `

【不確定資訊處理】
${NO_FAB}

【禁止事項】
- 禁止捏造統計數字、法規條號、認證名稱或客戶案例。
- 遇到專業判斷不足時，請明確標註「需由人員確認」而非自行推論。

【最後自我檢查】
${SELF_CHECK}`;

function p(
  data: Omit<Prompt, "promptContent"> & { body: string },
): Prompt {
  const { body, ...rest } = data;
  return { ...rest, promptContent: body.trim() + PROMPT_TAIL };
}

// ────────────────────────────────────────────────────────────────
// 網站建置類（10 篇）
// ────────────────────────────────────────────────────────────────

const WEBSITE: Prompt[] = [
  p({
    id: "w1",
    slug: "corporate-website-architecture",
    title: "企業官網整體架構規劃提示詞",
    summary: "協助盤點官網目標、目標客群、核心頁面與資訊架構，產出可與設計、開發討論的網站藍圖。",
    category: "website-build",
    tags: ["官網", "資訊架構", "B2B"],
    audience: "行銷、產品或資訊主管",
    industries: ["general", "manufacturing", "engineering", "sme"],
    difficulty: "beginner",
    updatedAt: "2026-07-17",
    preparation: [
      "公司主要服務、產品線與差異化說明。",
      "近 1 年主要成交客戶類型（不需真實名稱）。",
      "既有網站現況（若有）與希望改善的地方。",
    ],
    variables: [V.company, V.industry, V.service, V.audience, V.problem],
    body: `你現在是一位資深 B2B 網站策略顧問，擅長為工程、製造與科技整合類企業規劃官方網站的資訊架構與內容策略。

【任務目標】
為以下公司規劃一份可交付給設計與開發團隊使用的官網架構建議書，包含目標、對象、核心頁面、內容重點、SEO 主題與導覽結構。

【公司背景】
- 公司名稱：${V.company.name}
- 所屬產業：${V.industry.name}
- 主要服務或產品：${V.service.name}
- 目標客戶：${V.audience.name}
- 目前遇到的問題：${V.problem.name}

【執行步驟】
1. 先用 3–5 行摘要判斷公司的網站定位與需重點溝通的訊息。
2. 依網站的主要商業目標（獲取詢價 / 品牌信任 / 招募 / 說明服務）列出優先順序。
3. 列出建議的 6–10 個一級頁面，每頁包含：頁面名稱、目的、主要溝通對象、必要內容區塊、關鍵行動（CTA）。
4. 針對每個頁面，提出 3–5 個 SEO 主題方向與可能的長尾關鍵字（僅提出方向，不捏造搜尋量）。
5. 建議導覽列與 Footer 結構，並說明為何如此安排。

【輸出格式】
以中文條列與表格輸出，段落之間留空行。表格欄位固定為：頁面 / 目的 / 對象 / 內容重點 / CTA。

【判斷標準】
- 頁面規劃需符合公司實際規模，不應要求中小企業維護部落格 100 篇文章。
- 內容重點必須可對應到「真實存在的服務」，禁止臆測或虛構產品線。`,
    usageSteps: [
      "填入公司背景四項變數。",
      "把提示詞貼到 ChatGPT / Claude 等 LLM，取得初版架構。",
      "依照第 3 步的頁面表格與內部團隊討論，剔除不必要頁面。",
      "把最終架構交給設計 / 開發團隊，做為 wireframe 依據。",
    ],
    example:
      "以「宏鼎集成」為例，可填入：公司=宏鼎集成、產業=工程整合與 AI 顧問、主要服務=工程整合服務與 AI 系統整合、目標客戶=製造業與資料中心工程主管、目前問題=官網無法清楚呈現雙主軸服務。",
    commonMistakes: [
      "只填「產品名稱」而不寫「目標客戶」，AI 會產出泛用建議。",
      "希望 AI 直接生成完整文案，導致頁面架構與品牌訊息不一致。",
      "沒有先決定商業目標，導致頁面過多且無主次。",
    ],
    cautions: [
      "AI 建議僅為草稿，最終架構需與品牌、業務、SEO 三方討論後再定案。",
      "禁止讓 AI 猜測公司真實案例；相關內容應由公司提供或改為抽象敘述。",
    ],
    relatedSlugs: ["brand-value-proposition", "b2b-homepage-copy", "website-seo-content"],
    seoTitle: "企業官網整體架構規劃提示詞｜AEGIS 企業 AI 提示詞庫",
    seoDescription: "可直接使用的 B2B 官網架構規劃提示詞，協助企業盤點目標、目標客戶、核心頁面與 SEO 主題。",
  }),
  p({
    id: "w2",
    slug: "brand-value-proposition",
    title: "品牌定位與網站價值主張提示詞",
    summary: "依公司背景協助整理品牌定位、差異化重點與網站首頁應該傳達的核心價值主張。",
    category: "website-build",
    tags: ["品牌定位", "價值主張", "訊息策略"],
    audience: "創辦人、行銷主管",
    industries: ["general", "sme", "engineering", "manufacturing"],
    difficulty: "beginner",
    updatedAt: "2026-07-17",
    preparation: [
      "公司提供的服務或產品清單。",
      "3–5 家主要競爭對手的名稱與網站（若有）。",
      "公司希望被客戶記住的一句話（若已有）。",
    ],
    variables: [V.company, V.industry, V.service, V.audience, V.problem],
    body: `你是一位擅長 B2B 品牌訊息與價值主張設計的顧問。你的任務是從企業提供的背景資料，推導出可用於網站首頁與提案文件的品牌定位與價值主張。

【公司背景】
- 公司名稱：${V.company.name}
- 所屬產業：${V.industry.name}
- 主要服務或產品：${V.service.name}
- 目標客戶：${V.audience.name}
- 客戶目前面臨的痛點：${V.problem.name}

【執行步驟】
1. 用「對誰、解決什麼問題、以什麼方式、與競品差異」四要素，整理 1 句 25–35 字的核心定位。
2. 提出 3 個備選價值主張（每個 40–60 字），並簡要說明適用情境。
3. 為首頁 Hero 區塊撰寫：主標、副標、支持性條列 3 點、CTA 建議 2 個。
4. 條列 5 條「反面訊息」——本公司刻意「不」訴求的內容，避免品牌訊息模糊。

【輸出格式】
以標題 + 條列的方式輸出，並使用【】區隔各段。價值主張需附評分（1–5）：清晰度、差異化、可證明性。`,
    usageSteps: [
      "填入公司背景。",
      "將 3 個備選價值主張與內部同仁討論投票。",
      "定稿後交給設計與文案，落實在首頁 Hero、關於我們與提案書。",
    ],
    example:
      "填入宏鼎集成資料時，可讓 AI 產出「以工程整合與 AI 顧問雙主軸，協助企業把系統『真正接得起來』」的定位方向作為起點，再由團隊修飾。",
    commonMistakes: [
      "把「所有優點」都塞進主張，導致失焦。",
      "使用 AI 產出的英文流行語（Empower / Transform）而未翻成貼近客戶的中文。",
    ],
    cautions: [
      "避免宣稱「業界第一」「唯一」等難以證明的字眼。",
      "價值主張需經過實際客戶訪談驗證，AI 只是加速起點。",
    ],
    relatedSlugs: ["corporate-website-architecture", "b2b-homepage-copy"],
    seoTitle: "品牌定位與價值主張提示詞｜AEGIS 企業 AI 提示詞庫",
    seoDescription: "為 B2B 企業產出可落地的品牌定位與網站首頁價值主張，內含反面訊息與清晰度評分。",
  }),
  p({
    id: "w3",
    slug: "b2b-homepage-copy",
    title: "B2B 企業首頁文案生成提示詞",
    summary: "以結構化方式輸出企業官網首頁完整文案：Hero、服務摘要、社會證明、CTA 與 FAQ。",
    category: "website-build",
    tags: ["首頁文案", "文案", "B2B"],
    audience: "行銷、內容編輯",
    industries: ["general", "sme", "engineering", "manufacturing"],
    difficulty: "intermediate",
    updatedAt: "2026-07-17",
    preparation: [
      "已定案的品牌價值主張。",
      "3–5 個核心服務或產品的簡短描述。",
      "已核可可公開的客戶類型（不含名稱）。",
    ],
    variables: [V.company, V.industry, V.service, V.audience, { name: "[品牌價值主張]", description: "已定案的 1 句話品牌定位" }],
    body: `你是一位 B2B 網站文案專家。請依照以下公司資訊，撰寫首頁完整文案，語氣專業、清楚、避免行銷口號。

【公司資訊】
- 公司名稱：${V.company.name}
- 所屬產業：${V.industry.name}
- 主要服務：${V.service.name}
- 目標客戶：${V.audience.name}
- 品牌價值主張：[品牌價值主張]

【頁面結構】
1. Hero：主標 12–18 字、副標 30–45 字、CTA 1 主 1 次。
2. 快速信任區塊：3 條可證明的能力點（每條 15 字內）。
3. 服務摘要：每項服務 40–60 字 + 3 個對客戶的具體效益。
4. 誰適合我們：3 條理想客戶輪廓（產業、規模、情境）。
5. 常見問題：4 題，每題答案 40–80 字，避免虛構承諾。
6. 結尾 CTA：2 種——立即聯絡、預約諮詢。

【判斷標準】
- 每句話都能對應到「真實提供的服務」，不創造不存在的功能。
- 避免出現具體數字（例：客戶數、專案數、滿意度）除非使用者已提供。`,
    usageSteps: [
      "填入公司資訊與價值主張。",
      "取得 AI 初稿後，交由熟悉業務的同仁校對每一條「效益」。",
      "上稿前再核對是否有未經確認的數字。",
    ],
    example: "填入宏鼎集成時，AI 可先產出中性草稿，實際採用前需由業務主管確認服務描述。",
    commonMistakes: [
      "直接把 AI 產出的「已服務 100+ 客戶」貼上網站。",
      "在 FAQ 直接承諾「7 天內完工」等未經確認事項。",
    ],
    cautions: ["禁止讓 AI 憑空產生統計數字或客戶名稱。"],
    relatedSlugs: ["brand-value-proposition", "corporate-website-architecture"],
    seoTitle: "B2B 企業首頁文案提示詞｜AEGIS 企業 AI 提示詞庫",
    seoDescription: "結構化產出 B2B 企業首頁文案：Hero、服務摘要、理想客戶輪廓、FAQ 與 CTA。",
  }),
  p({
    id: "w4",
    slug: "service-page-content",
    title: "企業服務頁內容規劃提示詞",
    summary: "為單一服務頁規劃內容架構、目標對象、關鍵字方向與 FAQ 題目。",
    category: "website-build",
    tags: ["服務頁", "內容架構", "SEO"],
    audience: "行銷、業務窗口",
    industries: ["general", "engineering", "manufacturing", "sme"],
    difficulty: "beginner",
    updatedAt: "2026-07-17",
    preparation: ["該服務的實際流程與交付內容。", "常見客戶提問清單。"],
    variables: [V.company, V.service, V.audience, V.problem, { name: "[本服務名稱]", description: "此服務頁要呈現的服務名稱" }],
    body: `你是資深 B2B 內容策略師。請為指定服務規劃一頁完整的服務頁內容。

【背景】
- 公司名稱：${V.company.name}
- 目標客戶：${V.audience.name}
- 客戶痛點：${V.problem.name}
- 本服務名稱：[本服務名稱]

【頁面結構】
1. 頁面標題與副標。
2. 為誰設計（3 條）。
3. 我們解決的問題（3–5 條）。
4. 服務流程（4–6 步驟，每步包含輸入 / 交付物）。
5. 常見情境（2 個匿名情境）。
6. 常見問題（5 題）。
7. CTA 建議 2 個。

【判斷標準】禁止捏造流程；如缺少細節請列出應向客戶取得的資訊。`,
    usageSteps: ["填入變數。", "與交付團隊確認流程步驟。", "定稿後上稿。"],
    example: "為「工程整合服務」頁使用時，先向專案經理取得實際流程 4–6 步。",
    commonMistakes: ["把「服務」寫成「產品規格」，忘記強調對客戶的價值。"],
    cautions: ["匿名情境須經內部核可，禁止揭露客戶敏感資訊。"],
    relatedSlugs: ["landing-page", "corporate-website-architecture"],
    seoTitle: "企業服務頁內容規劃提示詞｜AEGIS",
    seoDescription: "為單一 B2B 服務頁產出完整內容架構、流程步驟、常見情境與 FAQ。",
  }),
  p({
    id: "w5",
    slug: "landing-page",
    title: "Landing Page 銷售頁規劃提示詞",
    summary: "為單一活動、白皮書或方案設計高轉換的落地頁架構與文案骨架。",
    category: "website-build",
    tags: ["Landing Page", "轉換", "行銷"],
    audience: "行銷、業務",
    industries: ["general", "sme"],
    difficulty: "intermediate",
    updatedAt: "2026-07-17",
    preparation: ["活動 / 白皮書主題與提供物。", "希望留下的名單類型。"],
    variables: [V.company, V.audience, { name: "[活動或提供物]", description: "落地頁要推廣的主題" }, { name: "[主要行動]", description: "希望使用者完成的動作，例如下載白皮書" }],
    body: `你是 B2B 轉換率優化顧問。請為以下活動撰寫一頁 Landing Page 架構與文案骨架。

【背景】
- 公司：${V.company.name}
- 目標受眾：${V.audience.name}
- 活動或提供物：[活動或提供物]
- 主要行動：[主要行動]

【結構】
1. Hero：主標、副標、CTA。
2. 3 條為何值得閱讀 / 參加。
3. 內容 / 議程摘要。
4. 適合對象 / 不適合對象。
5. 反對意見處理（3 題）。
6. 表單附近文案與隱私提示。
7. 感謝頁初稿。

【判斷標準】禁止使用「保證 X 倍成長」等未經證明的語句。`,
    usageSteps: ["填入變數。", "與法遵確認資料收集用途。", "上線後追蹤實際轉換。"],
    example: "推廣「AI 導入健檢諮詢」時，主要行動可設為預約 30 分鐘線上諮詢。",
    commonMistakes: ["文案過度誇大", "缺乏對「不適合對象」的說明，導致名單品質差"],
    cautions: ["收集個資須符合當地個資法規。"],
    relatedSlugs: ["b2b-homepage-copy", "website-seo-content"],
    seoTitle: "Landing Page 銷售頁提示詞｜AEGIS",
    seoDescription: "產出高清晰度的 B2B Landing Page 架構與文案骨架，含反對意見處理。",
  }),
  p({
    id: "w6",
    slug: "website-requirements-doc",
    title: "網站功能需求書生成提示詞",
    summary: "將業務期望轉為可交給設計與開發團隊的功能需求書草稿。",
    category: "website-build",
    tags: ["需求書", "SOW", "開發"],
    audience: "資訊、產品、專案經理",
    industries: ["general", "engineering", "manufacturing"],
    difficulty: "intermediate",
    updatedAt: "2026-07-17",
    preparation: ["業務期望清單。", "既有系統整合需求（若有）。"],
    variables: [V.company, V.industry, { name: "[網站主要目標]", description: "例如：詢價、招募、品牌形象" }, V.deadline, V.budget],
    body: `你是資深專案經理，擅長把業務需求整理成清楚的網站功能需求書。

【背景】
- 公司：${V.company.name} / ${V.industry.name}
- 網站主要目標：[網站主要目標]
- 完成時間：${V.deadline.name}
- 預算範圍：${V.budget.name}

【輸出章節】
1. 專案目標與成功指標。
2. 使用者角色與情境。
3. 資訊架構與頁面清單。
4. 功能模組（含表單、CMS、多語系、追蹤、SEO 基本設定）。
5. 非功能需求（效能、可用性、無障礙、資安基本）。
6. 內容產出責任表。
7. 交付里程碑與驗收條件。
8. 假設與風險。

【判斷標準】所有效能與可用性標準需明確可測，不使用「快」「順」等模糊字眼。`,
    usageSteps: ["填入變數。", "與資訊主管確認技術限制。", "定稿後交由開發估價。"],
    example: "填入預算 NT$60–100 萬、Q3 上線，AI 會產出可據以比稿的初版 SOW。",
    commonMistakes: ["把「AI 智能推薦」等模糊功能寫入需求，導致驗收爭議。"],
    cautions: ["需求變更需納入版本控管，避免範圍失控。"],
    relatedSlugs: ["corporate-website-architecture", "website-launch-checklist"],
    seoTitle: "網站功能需求書提示詞｜AEGIS",
    seoDescription: "把業務期望整理成可交付的網站需求書，涵蓋角色、模組、非功能需求與驗收。",
  }),
  p({
    id: "w7",
    slug: "ui-ux-design-system",
    title: "網站 UI／UX 與設計系統規劃提示詞",
    summary: "為官網或系統規劃基礎 UI 樣式、元件與 UX 原則，供設計師與工程師共用。",
    category: "website-build",
    tags: ["UI", "UX", "設計系統"],
    audience: "產品、設計、前端",
    industries: ["general", "engineering"],
    difficulty: "intermediate",
    updatedAt: "2026-07-17",
    preparation: ["品牌指南（若有）。", "現有網站或系統截圖。"],
    variables: [V.company, { name: "[品牌風格關鍵字]", description: "例如：專業、沉穩、科技、B2B" }, { name: "[主要使用裝置]", description: "例如：桌機為主、手機 40%" }],
    body: `你是資深 UX 設計顧問。請依下列輸入規劃設計系統與 UX 原則。

【背景】
- 公司：${V.company.name}
- 品牌風格關鍵字：[品牌風格關鍵字]
- 主要使用裝置：[主要使用裝置]

【輸出】
1. 5 條 UX 原則（每條含判斷標準）。
2. 色彩系統：主色 / 輔色 / 文字 / 背景 / 狀態色。
3. 字體系統：標題、內文、按鈕；建議字級與行高。
4. 間距與圓角。
5. 常用元件：按鈕、輸入框、卡片、表格、標籤、Toast，含狀態。
6. 響應式斷點與導覽策略。
7. 無障礙檢查（對比、鍵盤操作、ARIA）。

【判斷標準】禁止建議與品牌風格關鍵字衝突的視覺；請說明每個色彩用途，不只給色票。`,
    usageSteps: ["填入變數。", "把輸出交給設計師建立 Figma 樣式。", "與前端確認 tokens 命名。"],
    example: "宏鼎集成品牌風格：專業、沉穩、科技，主要裝置：桌機為主、手機 30%。",
    commonMistakes: ["色彩對比不足導致內文難讀。", "只有畫面沒有元件狀態（hover / disabled）。"],
    cautions: ["需符合 WCAG 2.1 AA 對比。"],
    relatedSlugs: ["website-requirements-doc", "website-audit"],
    seoTitle: "UI／UX 與設計系統規劃提示詞｜AEGIS",
    seoDescription: "為 B2B 官網或內部系統產出可交付的設計系統與 UX 原則。",
  }),
  p({
    id: "w8",
    slug: "website-seo-content",
    title: "網站 SEO 關鍵字與內容架構提示詞",
    summary: "從公司服務與客戶疑問推導出 SEO 主題群組與內容地圖。",
    category: "website-build",
    tags: ["SEO", "內容策略", "關鍵字"],
    audience: "行銷、內容",
    industries: ["general", "sme"],
    difficulty: "intermediate",
    updatedAt: "2026-07-17",
    preparation: ["公司服務清單。", "業務常被問到的問題。"],
    variables: [V.company, V.service, V.audience],
    body: `你是 B2B SEO 策略師。請為以下公司規劃 SEO 主題群組與內容地圖。

【背景】
- 公司：${V.company.name}
- 主要服務：${V.service.name}
- 目標客戶：${V.audience.name}

【任務】
1. 從服務推導 3–5 個 Topic Cluster，每個含 1 個 Pillar 主題與 4–6 個 Cluster 主題。
2. 針對每個主題給出：可能的長尾關鍵字方向（不捏造搜尋量）、搜尋意圖分類（Informational / Commercial / Transactional）、建議內容形式（服務頁、指南、比較、案例）。
3. 建議內部連結策略。
4. 給出 30 天、90 天、180 天的內容產出優先順序。

【判斷標準】禁止捏造具體搜尋量；如需驗證請標註「建議以 GSC / 關鍵字工具實測」。`,
    usageSteps: ["填入變數。", "使用實際工具驗證關鍵字。", "依 30/90/180 天路線圖排產出計畫。"],
    example: "為工程整合公司產出的 Cluster 可能包含：資料中心佈線、系統整合驗收、AI 導入等。",
    commonMistakes: ["把 AI 產出的關鍵字直接視為搜尋量真實資料。"],
    cautions: ["關鍵字策略需搭配內容品質，否則排名無法維持。"],
    relatedSlugs: ["corporate-website-architecture", "service-page-content"],
    seoTitle: "網站 SEO 關鍵字與內容架構提示詞｜AEGIS",
    seoDescription: "以 Topic Cluster 方法規劃 B2B 網站 SEO 主題與內容產出優先順序。",
  }),
  p({
    id: "w9",
    slug: "website-launch-checklist",
    title: "網站上線前檢查與驗收提示詞",
    summary: "產出上線前需完成的技術、內容、SEO 與法遵檢查清單。",
    category: "website-build",
    tags: ["上線", "驗收", "檢查"],
    audience: "專案經理、資訊",
    industries: ["general", "engineering"],
    difficulty: "beginner",
    updatedAt: "2026-07-17",
    preparation: ["已完成的網站測試版。", "SEO 與追蹤基本設定文件（若有）。"],
    variables: [V.company, { name: "[網站網址]", description: "測試或正式網址" }, { name: "[主要語系]", description: "例如：繁體中文、繁中/英" }],
    body: `你是資深 QA 顧問。請為即將上線的網站生成上線前檢查清單。

【背景】
- 公司：${V.company.name}
- 網址：[網站網址]
- 語系：[主要語系]

【檢查分類】
1. 內容（typo、聯絡資訊、法遵條款、圖片版權）。
2. 技術（Lighthouse 分數、404、破損連結、HTTPS、301 導向、favicon、OG 圖）。
3. SEO（title / meta / canonical / sitemap / robots / Search Console 驗證 / GA4）。
4. 表單（送出、驗證、通知信、垃圾防護）。
5. 追蹤（GA、GTM、Pixel、事件命名）。
6. 資安與備份（憑證、備份頻率、CMS 帳號權限）。
7. 響應式（手機、平板、桌機）。

【輸出格式】表格：類別 / 檢查項 / 通過標準 / 狀態欄留空。`,
    usageSteps: ["填入變數。", "把 AI 產出的清單匯入專案管理工具。", "上線前逐項核對。"],
    example: "適合中小企業上線前使用，補齊常被遺漏的 SEO 與追蹤項目。",
    commonMistakes: ["只檢查桌機忘記手機。", "遺漏 Google Search Console 驗證與 sitemap 提交。"],
    cautions: ["法遵條款需由法務或顧問確認，不可全交由 AI 撰寫。"],
    relatedSlugs: ["website-requirements-doc", "website-audit"],
    seoTitle: "網站上線前檢查提示詞｜AEGIS",
    seoDescription: "生成技術、內容、SEO、法遵與追蹤的完整上線前檢查清單。",
  }),
  p({
    id: "w10",
    slug: "website-audit",
    title: "現有企業網站健檢與優化提示詞",
    summary: "從資訊架構、內容、SEO、UX 與轉換角度為既有網站提出優化建議。",
    category: "website-build",
    tags: ["網站健檢", "優化", "SEO"],
    audience: "行銷、資訊、經營層",
    industries: ["general", "sme", "manufacturing"],
    difficulty: "intermediate",
    updatedAt: "2026-07-17",
    preparation: ["現有網站網址。", "Google Analytics 或 GSC 匯出資料（若可）。"],
    variables: [V.company, { name: "[網站網址]", description: "既有網站網址" }, V.audience, { name: "[主要業務目標]", description: "例如：詢價、報名、招募" }],
    body: `你是 B2B 網站健檢顧問。請根據下列公司資訊產出網站健檢報告草稿。

【背景】
- 公司：${V.company.name}
- 網址：[網站網址]
- 目標客戶：${V.audience.name}
- 主要業務目標：[主要業務目標]

【健檢構面】
1. 資訊架構：導覽合理性、頁面層級、路徑。
2. 訊息與定位：Hero 是否清楚傳達價值。
3. 內容深度：服務、案例、資源是否可信。
4. SEO 基本：title、meta、H1、結構化資料、內部連結。
5. UX：可讀性、對比、行動裝置、載入速度。
6. 轉換：CTA 位置、表單長度、聯絡管道。
7. 追蹤：GA4 / GSC / GTM 是否完備。

【輸出】每構面列出：現況觀察、風險 / 影響、建議行動、優先度（P0/P1/P2）。若無法從網址直接判斷，請列為「需人工檢視」。`,
    usageSteps: ["把 AI 建議與實際數據比對。", "依優先度排入產品或行銷路線圖。"],
    example: "AI 可能會建議把「聯絡我們」CTA 移至 Hero 右上，但需驗證是否符合品牌調性。",
    commonMistakes: ["把 AI 「感覺不夠現代」的意見當作事實。"],
    cautions: ["AI 無法真實爬取全站；重要頁面建議人工提供內容片段。"],
    relatedSlugs: ["website-seo-content", "website-launch-checklist"],
    seoTitle: "企業網站健檢提示詞｜AEGIS",
    seoDescription: "從資訊架構、內容、SEO、UX 與轉換角度產出網站健檢報告草稿。",
  }),
];

// ────────────────────────────────────────────────────────────────
// 系統建置類（10 篇）
// ────────────────────────────────────────────────────────────────

const SYSTEM: Prompt[] = [
  p({
    id: "s1",
    slug: "erp-requirements",
    title: "ERP 系統需求分析提示詞",
    summary: "協助盤點 ERP 導入前的營運流程、模組範圍與資料整合需求。",
    category: "system-build",
    tags: ["ERP", "需求分析", "數位轉型"],
    audience: "資訊、財會、營運主管",
    industries: ["manufacturing", "engineering", "sme"],
    difficulty: "intermediate",
    updatedAt: "2026-07-17",
    preparation: ["現行流程盤點文件。", "現有系統清單與資料流向。"],
    variables: [V.company, V.industry, V.size, { name: "[年營收級距]", description: "例如：NT$ 5–10 億" }, { name: "[痛點 Top 3]", description: "目前最想解決的三個問題" }],
    body: `你是資深 ERP 導入顧問，熟悉製造與工程業的財務、生管、採購與庫存流程。請依以下背景進行 ERP 需求分析。

【背景】
- 公司：${V.company.name} / ${V.industry.name}
- 員工人數：${V.size.name}
- 年營收級距：[年營收級距]
- 痛點 Top 3：[痛點 Top 3]

【任務】
1. 用一段 200 字內描述目前流程猜想（明確標示「以下為假設」）。
2. 建議 ERP 模組範圍優先度（財會、總帳、應收付、採購、庫存、生管、成本、專案、報表 BI）。
3. 條列 20 條使用者故事（As-a / I-want / So-that）。
4. 建議資料整合對象（CRM、MES、e-Invoice、銀行、政府平台）。
5. 建議導入階段與里程碑（Wave 1 / 2 / 3）。
6. 建議關鍵風險與緩解方式。

【判斷標準】不可指名特定廠牌（SAP / Oracle 等）為唯一解，需說明適用情境。`,
    usageSteps: ["填入變數。", "與財會 / 生管訪談驗證假設。", "整理成 RFP 提供給候選廠商。"],
    example: "為 100 人製造業使用時，Wave 1 通常聚焦財會、庫存、採購。",
    commonMistakes: ["一次要求上線所有模組。", "沒有整理清楚現行流程就開始選型。"],
    cautions: ["ERP 導入涉及組織變革，不僅是選系統。"],
    relatedSlugs: ["crm-planning", "erp-migration-strategy-prompt"],
    seoTitle: "ERP 需求分析提示詞｜AEGIS",
    seoDescription: "系統化盤點 ERP 導入前的模組範圍、使用者故事、資料整合與導入階段。",
  }),
  p({
    id: "s2",
    slug: "crm-planning",
    title: "CRM 客戶管理系統規劃提示詞",
    summary: "規劃 CRM 導入目標、資料模型、階段與與 ERP／行銷工具的整合。",
    category: "system-build",
    tags: ["CRM", "銷售", "客戶管理"],
    audience: "業務、行銷、資訊",
    industries: ["general", "sme", "manufacturing"],
    difficulty: "intermediate",
    updatedAt: "2026-07-17",
    preparation: ["現有客戶名單來源。", "業務流程與階段定義。"],
    variables: [V.company, V.audience, V.size, { name: "[目前 CRM 現況]", description: "例如：Excel、無系統、既有 CRM 名稱" }, { name: "[主要銷售流程階段]", description: "例如：Lead→機會→提案→簽約→回款" }],
    body: `你是 CRM 顧問。請為以下企業規劃 CRM 導入。

【背景】
- 公司：${V.company.name}
- 員工人數：${V.size.name}
- 目標客戶：${V.audience.name}
- 目前 CRM 現況：[目前 CRM 現況]
- 銷售流程：[主要銷售流程階段]

【輸出】
1. CRM 導入目標 3–5 條，含衡量指標。
2. 資料模型：客戶、聯絡人、機會、報價、活動、任務欄位建議。
3. 銷售 Pipeline 設計（含各階段判斷標準）。
4. 業務日常操作情境 5 條。
5. 與 ERP、EDM、客服系統的整合建議。
6. 導入階段：Phase 1（基礎 CRM）、Phase 2（自動化）、Phase 3（AI 洞察）。
7. 常見失敗原因與對策。

【判斷標準】不預設特定品牌；成功指標需可量測。`,
    usageSteps: ["填入變數。", "與業務主管確認 Pipeline 定義。", "定案後開始選型。"],
    example: "中小型製造業常從 Excel 直接升級，需先解決客戶重複的問題。",
    commonMistakes: ["Pipeline 階段定義不清，導致業務不用。"],
    cautions: ["CRM 成功關鍵是資料紀律，不只是選系統。"],
    relatedSlugs: ["erp-requirements", "sales-pipeline-management-prompt"],
    seoTitle: "CRM 系統規劃提示詞｜AEGIS",
    seoDescription: "規劃 CRM 目標、資料模型、Pipeline、整合與導入階段。",
  }),
  p({
    id: "s3",
    slug: "bi-dashboard",
    title: "BI 管理儀表板規劃提示詞",
    summary: "以「決策問題」出發規劃管理儀表板，避免堆砌無用指標。",
    category: "system-build",
    tags: ["BI", "儀表板", "資料"],
    audience: "經營層、資訊",
    industries: ["general", "manufacturing", "engineering"],
    difficulty: "intermediate",
    updatedAt: "2026-07-17",
    preparation: ["公司 KPI 現況。", "資料來源清單。"],
    variables: [V.company, { name: "[使用對象]", description: "例如：總經理、業務主管、廠長" }, { name: "[3 個主要決策問題]", description: "例如：本月是否達標？哪個產品線毛利下降？" }],
    body: `你是 BI 儀表板設計顧問。請為以下對象規劃管理儀表板。

【背景】
- 公司：${V.company.name}
- 使用對象：[使用對象]
- 3 個主要決策問題：[3 個主要決策問題]

【輸出】
1. 針對每個決策問題，列出 3–5 個核心指標與資料來源。
2. 儀表板分層：High-level（1 頁）、Drill-down（3–5 頁）。
3. 圖表類型建議與理由。
4. 資料更新頻率（即時 / 每日 / 每週）。
5. 資料品質風險與治理建議。
6. 使用者培訓計畫大綱。

【判斷標準】避免產出「什麼都看」的儀表板；每個指標必須連結到具體決策或行動。`,
    usageSteps: ["填入變數。", "與資料工程師確認來源可行性。", "先建立 MVP 再擴充。"],
    example: "業務主管儀表板通常聚焦：Pipeline 金額、預估達成率、Top 客戶動態。",
    commonMistakes: ["把 ERP 所有報表搬上 BI 卻沒重新設計。"],
    cautions: ["資料品質是儀表板信任的根基。"],
    relatedSlugs: ["kpi-dashboard-design-prompt", "sales-pipeline-management-prompt"],
    seoTitle: "BI 管理儀表板規劃提示詞｜AEGIS",
    seoDescription: "以決策問題出發，規劃分層儀表板與指標選擇。",
  }),
  p({
    id: "s4",
    slug: "engineering-pm-system",
    title: "工程專案管理系統規劃提示詞",
    summary: "規劃跨工地、跨承包商的工程專案管理系統模組與資料模型。",
    category: "system-build",
    tags: ["工程", "PM", "專案管理"],
    audience: "工程 PM、資訊",
    industries: ["engineering"],
    difficulty: "intermediate",
    updatedAt: "2026-07-17",
    preparation: ["現行專案流程。", "工地回報方式（LINE / Excel / 系統）。"],
    variables: [V.company, { name: "[年度專案數]", description: "近 1 年執行專案數量級" }, { name: "[主要專案類型]", description: "例如：資料中心佈線、弱電整合" }],
    body: `你是工程業數位化顧問。請規劃工程專案管理系統。

【背景】
- 公司：${V.company.name}
- 年度專案數：[年度專案數]
- 主要專案類型：[主要專案類型]

【輸出】
1. 資料模型：專案、階段、任務、資源、材料、變更單、驗收、缺失。
2. 工地端與辦公室端的角色與操作情境。
3. 進度回報機制（每日 / 每週 / 里程碑）。
4. 風險與變更管理流程。
5. 成本、毛利計算欄位與規則。
6. 與 CostFlow、ERP、財會系統的整合建議。
7. 導入階段建議。

【判斷標準】必須考慮工地連線不穩、需離線紀錄同步的需求。`,
    usageSteps: ["填入變數。", "與工地主任訪談驗證回報習慣。", "先做行動端 MVP。"],
    example: "資料中心佈線專案通常需要按樓層、機櫃、光纖芯數追蹤。",
    commonMistakes: ["以辦公室視角設計系統，工地實際不用。"],
    cautions: ["涉及分包商資料存取，需設定完善權限。"],
    relatedSlugs: ["cost-margin-analysis-prompt", "engineering-project-risk-prompt"],
    seoTitle: "工程專案管理系統提示詞｜AEGIS",
    seoDescription: "規劃跨工地、跨承包商的工程專案管理系統資料模型與流程。",
  }),
  p({
    id: "s5",
    slug: "inventory-procurement",
    title: "庫存與採購管理系統規劃提示詞",
    summary: "為製造與工程業規劃庫存 / 採購系統的欄位、流程與 KPI。",
    category: "system-build",
    tags: ["庫存", "採購", "供應鏈"],
    audience: "資材、採購、資訊",
    industries: ["manufacturing", "engineering", "sme"],
    difficulty: "intermediate",
    updatedAt: "2026-07-17",
    preparation: ["現行庫存管理方式。", "主要供應商清單。"],
    variables: [V.company, V.industry, { name: "[主要庫存類別]", description: "例如：原料、成品、耗材、工具" }, { name: "[主要痛點]", description: "例如：呆滯料多、料號重複、缺料頻繁" }],
    body: `你是 SCM 顧問。請為以下企業規劃庫存與採購系統。

【背景】
- 公司：${V.company.name} / ${V.industry.name}
- 主要庫存類別：[主要庫存類別]
- 主要痛點：[主要痛點]

【輸出】
1. 料號規則建議（結構化編碼）。
2. 資料欄位（料件、供應商、採購單、進貨、庫存異動、盤點）。
3. 採購流程（請購→簽核→下單→進貨→驗收→付款）。
4. 安全庫存與再訂購點計算方式。
5. KPI 建議（呆滯率、庫存周轉、達交率）。
6. 與 ERP、MES、財會的整合建議。
7. 導入階段。

【判斷標準】禁止建議「AI 自動下單」等未經驗證機制。`,
    usageSteps: ["填入變數。", "先解決料號與盤點問題，再做自動化。"],
    example: "工程業常見痛點是耗材無料號、無法追蹤成本。",
    commonMistakes: ["跳過料號整理直接上系統。"],
    cautions: ["盤點紀律與流程重要於系統功能。"],
    relatedSlugs: ["erp-requirements", "supply-chain-inventory-prompt"],
    seoTitle: "庫存與採購系統規劃提示詞｜AEGIS",
    seoDescription: "為製造與工程業規劃庫存 / 採購系統欄位、流程與 KPI。",
  }),
  p({
    id: "s6",
    slug: "workflow-automation",
    title: "企業工作流程自動化規劃提示詞",
    summary: "盤點可自動化流程、優先順序與工具選型建議。",
    category: "system-build",
    tags: ["自動化", "流程", "低程式碼"],
    audience: "資訊、營運",
    industries: ["general", "sme"],
    difficulty: "intermediate",
    updatedAt: "2026-07-17",
    preparation: ["現有流程清單。", "工具現況（Google Workspace、M365、LINE 等）。"],
    variables: [V.company, V.size, { name: "[目前最耗時的 3 個流程]", description: "例如：報價審核、請購、月報" }],
    body: `你是流程自動化顧問。請盤點以下企業的可自動化流程。

【背景】
- 公司：${V.company.name}
- 員工人數：${V.size.name}
- 目前最耗時的 3 個流程：[目前最耗時的 3 個流程]

【輸出】
1. 為每個流程繪製 as-is（現況）與 to-be（自動化後）文字版流程。
2. 自動化程度分類：純提醒、部分自動、完全自動、需 AI 判斷。
3. 工具選型類別（表單、審批、iPaaS、RPA、AI）與適用情境。
4. 優先度排序：Effort × Value 矩陣。
5. 導入路線圖（30 / 90 / 180 天）。
6. 常見坑：例外處理、稽核紀錄、權限。

【判斷標準】不預設特定產品；如需 API 整合請提醒確認官方支援。`,
    usageSteps: ["填入變數。", "先做 1 個 quick win 建立信任。", "再擴大到跨部門。"],
    example: "報價審核常可先以審批工作流 + 通知取代 email。",
    commonMistakes: ["把爛流程自動化 → 更快犯錯。"],
    cautions: ["自動化前先確認流程本身合理。"],
    relatedSlugs: ["sop-writing-prompt", "meeting-notes-prompt"],
    seoTitle: "企業流程自動化提示詞｜AEGIS",
    seoDescription: "盤點可自動化流程、優先順序與工具類別。",
  }),
  p({
    id: "s7",
    slug: "roles-permissions",
    title: "系統帳號、角色與權限規劃提示詞",
    summary: "為新系統規劃角色矩陣與最小權限原則。",
    category: "system-build",
    tags: ["權限", "角色", "資安"],
    audience: "資訊、資安",
    industries: ["general", "engineering", "manufacturing"],
    difficulty: "intermediate",
    updatedAt: "2026-07-17",
    preparation: ["組織結構圖。", "主要業務流程角色。"],
    variables: [V.company, { name: "[系統名稱]", description: "本次規劃的系統" }, { name: "[主要角色]", description: "例如：業務、業助、PM、財會、老闆" }],
    body: `你是 IT 治理顧問。請規劃系統角色與權限。

【背景】
- 公司：${V.company.name}
- 系統：[系統名稱]
- 主要角色：[主要角色]

【輸出】
1. 角色矩陣（Role × Feature），標示 CRUD。
2. 敏感操作清單（匯出、刪除、財務、個資）。
3. 最小權限原則具體落實方式。
4. 例外授權流程。
5. 記錄與稽核建議欄位。
6. 定期權限盤點頻率建議。

【判斷標準】禁止讓所有主管有全權限；區分「檢視」與「修改」。`,
    usageSteps: ["填入變數。", "與各主管確認實際需求。", "在系統中落實 RBAC。"],
    example: "業助通常僅需檢視合約、修改報價，不需刪除。",
    commonMistakes: ["把「老闆」設為超級管理員但無稽核。"],
    cautions: ["涉及個資的角色須符合個資法要求。"],
    relatedSlugs: ["system-security-checklist", "user-stories-acceptance"],
    seoTitle: "系統角色權限規劃提示詞｜AEGIS",
    seoDescription: "為企業內部系統規劃角色矩陣、最小權限與稽核。",
  }),
  p({
    id: "s8",
    slug: "database-entities",
    title: "系統資料庫與核心實體規劃提示詞",
    summary: "為新系統從業務流程推導出核心實體與關聯。",
    category: "system-build",
    tags: ["資料庫", "資料模型", "ERD"],
    audience: "資訊、後端",
    industries: ["general", "engineering", "manufacturing"],
    difficulty: "advanced",
    updatedAt: "2026-07-17",
    preparation: ["業務流程說明。", "既有系統資料匯出（若有）。"],
    variables: [V.company, { name: "[系統名稱]", description: "本次規劃的系統" }, { name: "[主要業務物件]", description: "例如：客戶、報價、專案、料號" }],
    body: `你是資深資料庫架構師。請規劃系統核心實體與關聯。

【背景】
- 公司：${V.company.name}
- 系統：[系統名稱]
- 主要業務物件：[主要業務物件]

【輸出】
1. 實體清單，每個實體含：欄位、資料型別、必填、預設、備註。
2. 主鍵與關聯（1:N / N:M）。
3. 稽核欄位（建立時間、建立者、修改時間、修改者）。
4. 軟刪除策略。
5. 索引建議。
6. 常見查詢範例 5 條，並確認資料模型支援。
7. 隱私 / 敏感欄位分類。

【判斷標準】禁止設計過度規範化導致查詢困難；避免過度非規範化導致一致性風險。`,
    usageSteps: ["填入變數。", "以草圖工具（dbdiagram、Mermaid）畫出 ERD。", "與後端 review。"],
    example: "報價系統核心通常包含 Customer、Quote、QuoteItem、Product。",
    commonMistakes: ["把所有欄位放同一張表。", "沒有軟刪除導致合規風險。"],
    cautions: ["個資欄位需考慮加密與存取記錄。"],
    relatedSlugs: ["user-stories-acceptance", "roles-permissions"],
    seoTitle: "系統資料庫規劃提示詞｜AEGIS",
    seoDescription: "從業務流程推導核心實體、欄位、關聯與索引。",
  }),
  p({
    id: "s9",
    slug: "user-stories-acceptance",
    title: "系統使用者故事與驗收條件提示詞",
    summary: "把功能需求轉為可驗收的使用者故事與 Given-When-Then。",
    category: "system-build",
    tags: ["User Story", "驗收", "敏捷"],
    audience: "PM、QA",
    industries: ["general", "engineering", "manufacturing"],
    difficulty: "intermediate",
    updatedAt: "2026-07-17",
    preparation: ["功能需求清單。", "主要角色。"],
    variables: [V.company, { name: "[系統名稱]", description: "本次系統" }, { name: "[功能主題]", description: "例如：報價審核、專案回報" }],
    body: `你是資深敏捷 PM。請把功能需求轉為使用者故事。

【背景】
- 公司：${V.company.name}
- 系統：[系統名稱]
- 功能主題：[功能主題]

【輸出】
1. 10–15 條使用者故事（As-a / I want / So that）。
2. 每條故事 3–5 條驗收條件（Given-When-Then）。
3. 標示優先度（Must / Should / Could / Won't）。
4. 標示相依關係。
5. 建議測試資料類型。

【判斷標準】故事需以「使用者能得到什麼結果」描述，不描述介面細節。`,
    usageSteps: ["填入變數。", "與 QA 共同 review 驗收條件。", "納入 backlog。"],
    example: "「作為業務主管，我希望可以查看本月 Pipeline，以便追蹤達成率。」",
    commonMistakes: ["用「畫面上加一個按鈕」寫故事。"],
    cautions: ["驗收條件必須可測，避免『使用者滿意』這類主觀敘述。"],
    relatedSlugs: ["database-entities", "system-security-checklist"],
    seoTitle: "使用者故事與驗收條件提示詞｜AEGIS",
    seoDescription: "把功能需求轉為 As-a / Given-When-Then 可驗收的使用者故事。",
  }),
  p({
    id: "s10",
    slug: "system-security-checklist",
    title: "系統資安與上線檢查提示詞",
    summary: "為新系統上線前產出資安與可靠性檢查清單。",
    category: "system-build",
    tags: ["資安", "上線", "檢查"],
    audience: "資訊、資安、DevOps",
    industries: ["general", "engineering", "manufacturing"],
    difficulty: "intermediate",
    updatedAt: "2026-07-17",
    preparation: ["系統架構圖。", "資料流圖。"],
    variables: [V.company, { name: "[系統名稱]", description: "系統名稱" }, { name: "[資料敏感度]", description: "例如：含個資、含財務、僅內部" }],
    body: `你是資安與可靠性工程顧問。請為以下系統產出上線檢查清單。

【背景】
- 公司：${V.company.name}
- 系統：[系統名稱]
- 資料敏感度：[資料敏感度]

【檢查構面】
1. 身份與存取（MFA、SSO、角色權限、離職流程）。
2. 資料保護（傳輸加密、儲存加密、備份、匿名化）。
3. 應用安全（OWASP Top 10、依賴掃描、Secrets 管理）。
4. 監控與稽核（日誌、警示、留存）。
5. 高可用（RTO / RPO、容錯、備援）。
6. 供應鏈與第三方（SaaS 授權、資料處理協議）。
7. 事故應變流程。
8. 教育訓練與釣魚演練。

【輸出格式】表格：構面 / 檢查項 / 判斷標準 / 責任人 / 狀態。禁止提出未經驗證的資安產品名稱。`,
    usageSteps: ["填入變數。", "與資安 / 法遵 review。", "納入上線 Go/No-Go 決策。"],
    example: "含個資系統必須完成資料處理紀錄與同意書。",
    commonMistakes: ["只做功能測試，忽略資安測試。"],
    cautions: ["涉及個資與跨境資料，需符合當地法規。"],
    relatedSlugs: ["website-launch-checklist", "roles-permissions"],
    seoTitle: "系統資安上線檢查提示詞｜AEGIS",
    seoDescription: "產出系統上線前的資安、稽核、備援與應變檢查清單。",
  }),
];

// ────────────────────────────────────────────────────────────────
// 企業管理類（10 篇）
// ────────────────────────────────────────────────────────────────

const MANAGEMENT: Prompt[] = [
  p({
    id: "m1",
    slug: "sop-writing-prompt",
    title: "企業 SOP 制定提示詞",
    summary: "把口耳相傳的流程整理為條理清楚、可培訓與稽核的 SOP。",
    category: "management",
    tags: ["SOP", "流程", "制度"],
    audience: "營運、HR、部門主管",
    industries: ["general", "sme", "manufacturing", "engineering"],
    difficulty: "beginner",
    updatedAt: "2026-07-17",
    preparation: ["口述現行做法。", "常見錯誤案例。"],
    variables: [V.company, { name: "[SOP 主題]", description: "例如：客訴處理、進貨驗收" }, { name: "[相關角色]", description: "涉及部門與角色" }, V.problem],
    body: `你是企業流程顧問。請把口述流程整理為正式 SOP。

【背景】
- 公司：${V.company.name}
- SOP 主題：[SOP 主題]
- 相關角色：[相關角色]
- 目前的問題：${V.problem.name}

【SOP 章節】
1. 目的。
2. 適用範圍。
3. 名詞定義。
4. 角色與責任（RACI）。
5. 前置條件。
6. 步驟（每步含輸入、動作、輸出、判斷）。
7. 例外處理。
8. 稽核紀錄與 KPI。
9. 版本歷史。

【判斷標準】步驟需可被新人在無指導下執行；如缺資訊請列出向誰確認。`,
    usageSteps: ["填入變數。", "把 AI 產出的 SOP 交給實際執行者試做。", "修訂後定案。"],
    example: "客訴處理 SOP 常見漏洞是缺少『48 小時內回覆』的 KPI。",
    commonMistakes: ["把 SOP 寫得像小說，難以照做。"],
    cautions: ["涉及安全與法規的 SOP 需專業審核。"],
    relatedSlugs: ["meeting-notes-prompt", "workflow-automation"],
    seoTitle: "企業 SOP 制定提示詞｜AEGIS",
    seoDescription: "把口述流程轉為條理化的 SOP，含 RACI、KPI 與例外處理。",
  }),
  p({
    id: "m2",
    slug: "meeting-notes-prompt",
    title: "會議紀錄與行動事項整理提示詞",
    summary: "把冗長會議討論整理為決議、待辦、負責人與截止日。",
    category: "management",
    tags: ["會議", "行動事項", "生產力"],
    audience: "各部門",
    industries: ["general", "sme"],
    difficulty: "beginner",
    updatedAt: "2026-07-17",
    preparation: ["會議逐字稿或摘要。"],
    variables: [{ name: "[會議主題]", description: "會議主題" }, { name: "[出席者]", description: "與會人員" }, { name: "[會議內容或逐字稿]", description: "貼上會議討論內容" }],
    body: `你是專案助理。請把以下會議內容整理為正式紀錄。

【輸入】
- 會議主題：[會議主題]
- 出席者：[出席者]
- 會議內容：[會議內容或逐字稿]

【輸出】
1. 5 行以內的會議摘要。
2. 決議事項清單。
3. 行動事項表：項目 / 負責人 / 截止日 / 產出物。
4. 待確認事項（含負責追問的人）。
5. 下次會議建議。

【判斷標準】禁止把「討論」寫為「決議」；未明確指定負責人者請列於待確認。`,
    usageSteps: ["把逐字稿或錄音轉寫貼上。", "確認負責人與截止日後寄出。"],
    example: "常見問題：AI 把「有人提到」誤認為「決議」，需人工核對。",
    commonMistakes: ["把長篇會議全交給 AI 而不 review。"],
    cautions: ["涉及機密資料時，注意公司對 AI 工具的資料使用政策。"],
    relatedSlugs: ["monthly-management-report", "sop-writing-prompt"],
    seoTitle: "會議紀錄提示詞｜AEGIS",
    seoDescription: "把會議討論整理為決議、行動事項與待確認事項。",
  }),
  p({
    id: "m3",
    slug: "quarterly-goals",
    title: "年度與季度營運目標規劃提示詞",
    summary: "以 OKR / KPI 結構協助部門設定可衡量的季度目標。",
    category: "management",
    tags: ["OKR", "KPI", "目標管理"],
    audience: "經營層、部門主管",
    industries: ["general", "sme"],
    difficulty: "intermediate",
    updatedAt: "2026-07-17",
    preparation: ["年度總目標。", "各部門現況。"],
    variables: [V.company, { name: "[部門名稱]", description: "設定目標的部門" }, { name: "[年度目標]", description: "公司年度戰略目標" }, { name: "[目前挑戰]", description: "本季主要挑戰" }],
    body: `你是策略規劃顧問。請協助以下部門設計本季目標。

【背景】
- 公司：${V.company.name}
- 部門：[部門名稱]
- 年度目標：[年度目標]
- 目前挑戰：[目前挑戰]

【輸出】
1. 3 個 Objective（12 週可完成、有雄心但可達）。
2. 每個 Objective 3–5 個 Key Results（可量化）。
3. 每個 Key Result 對應的行動計畫、負責人、里程碑。
4. 風險與應變。
5. 每週檢視節奏建議。

【判斷標準】KR 需可量化；避免同時使用「提升客戶滿意度」這種無指標的敘述。`,
    usageSteps: ["填入變數。", "與部門 review KR 是否過度樂觀。", "納入週會追蹤。"],
    example: "業務部 O1：Q3 達成報價轉化率 25%；KR1：提報有效報價 30 件…",
    commonMistakes: ["OKR 訂完後放桌上不追蹤。"],
    cautions: ["KR 需誠實面對挑戰，避免自欺數字。"],
    relatedSlugs: ["monthly-management-report", "kpi-dashboard-design-prompt"],
    seoTitle: "季度營運目標 OKR 提示詞｜AEGIS",
    seoDescription: "以 OKR 結構協助部門設計可衡量的季度目標與行動計畫。",
  }),
  p({
    id: "m4",
    slug: "sales-pipeline-management-prompt",
    title: "業務管線與客戶分級管理提示詞",
    summary: "設計符合公司實際銷售節奏的 Pipeline 階段與客戶分級規則。",
    category: "management",
    tags: ["業務", "Pipeline", "分級"],
    audience: "業務主管",
    industries: ["general", "sme", "manufacturing"],
    difficulty: "intermediate",
    updatedAt: "2026-07-17",
    preparation: ["近 12 個月成交案分析（若有）。", "業務團隊人數與資歷。"],
    variables: [V.company, V.service, V.audience, { name: "[平均銷售周期]", description: "從 Lead 到簽約平均天數" }],
    body: `你是 B2B 業務顧問。請為以下公司設計業務 Pipeline 與客戶分級。

【背景】
- 公司：${V.company.name}
- 主要服務：${V.service.name}
- 目標客戶：${V.audience.name}
- 平均銷售周期：[平均銷售周期]

【輸出】
1. Pipeline 階段（5–7 階段），每階段：定義、進入 / 離開條件、機率、預期輸出。
2. 客戶分級（A/B/C）標準：規模、產業、成交機率、策略價值。
3. 每級客戶的接觸頻率建議。
4. 常見『假 Pipeline』警訊。
5. 預估準確度提升的 3 個做法。

【判斷標準】機率百分比需符合實際歷史轉換率；未有資料時請標註為假設。`,
    usageSteps: ["填入變數。", "與資深業務 review 階段定義。", "納入 CRM。"],
    example: "工程業銷售周期通常 3–9 個月，Pipeline 需能拉長。",
    commonMistakes: ["Pipeline 階段用『很有希望』等主觀字眼。"],
    cautions: ["避免業務為衝報表把假機會塞入 Pipeline。"],
    relatedSlugs: ["crm-planning", "monthly-management-report"],
    seoTitle: "業務 Pipeline 管理提示詞｜AEGIS",
    seoDescription: "設計符合實際銷售節奏的 Pipeline 階段與客戶分級。",
  }),
  p({
    id: "m5",
    slug: "engineering-project-risk-prompt",
    title: "專案進度與風險管理提示詞",
    summary: "為工程或系統專案產出進度追蹤與風險登錄冊模板。",
    category: "management",
    tags: ["專案管理", "風險", "進度"],
    audience: "PM、專案經理",
    industries: ["engineering", "manufacturing"],
    difficulty: "intermediate",
    updatedAt: "2026-07-17",
    preparation: ["專案章程或 SOW。", "團隊成員角色。"],
    variables: [V.company, { name: "[專案名稱]", description: "本專案名稱" }, { name: "[專案類型]", description: "例如：資料中心佈線、ERP 導入" }, V.deadline],
    body: `你是資深 PMO 顧問。請為以下專案產出進度追蹤與風險管理框架。

【背景】
- 公司：${V.company.name}
- 專案名稱：[專案名稱]
- 專案類型：[專案類型]
- 完成時間：${V.deadline.name}

【輸出】
1. WBS 前兩層。
2. 里程碑與截止日建議。
3. 風險登錄冊：風險 / 影響 / 機率 / 分數 / 緩解 / 負責人。列出 10 條起始風險。
4. 每週進度回報格式。
5. 溝通計畫（誰、看什麼、頻率、通路）。
6. 變更控管流程。

【判斷標準】風險描述需含觸發條件與量化影響；避免只寫「延遲」。`,
    usageSteps: ["填入變數。", "與團隊確認 WBS。", "納入專案週會。"],
    example: "資料中心專案常見風險：進場管制、材料到料延遲、電力窗口。",
    commonMistakes: ["把里程碑訂為『儘快完成』。"],
    cautions: ["風險登錄冊需持續更新。"],
    relatedSlugs: ["engineering-pm-system", "cost-margin-analysis-prompt"],
    seoTitle: "專案進度與風險管理提示詞｜AEGIS",
    seoDescription: "為專案產出 WBS、風險登錄冊、進度報告與變更流程。",
  }),
  p({
    id: "m6",
    slug: "cost-margin-analysis-prompt",
    title: "報價、成本與專案毛利分析提示詞",
    summary: "協助建立報價成本結構、毛利模擬與敏感度分析。",
    category: "management",
    tags: ["報價", "成本", "毛利"],
    audience: "業務、財會、專案",
    industries: ["engineering", "manufacturing"],
    difficulty: "advanced",
    updatedAt: "2026-07-17",
    preparation: ["歷史報價與實際成本資料。", "主要成本項目分類。"],
    variables: [V.company, { name: "[報價類型]", description: "例如：工程整合、系統導入、耗材" }, { name: "[主要成本項目]", description: "例如：人工、材料、外包、差旅" }],
    body: `你是財務與專案成本顧問。請協助建立報價成本模型。

【背景】
- 公司：${V.company.name}
- 報價類型：[報價類型]
- 主要成本項目：[主要成本項目]

【輸出】
1. 成本結構樹（Level 1–3）。
2. 每項成本的計算公式與資料來源。
3. 直接 / 間接成本區分。
4. 毛利率計算方式與目標毛利建議區間。
5. 敏感度分析：關鍵 3 個變數 ±10% 時毛利變動。
6. 常見成本低估項目清單。
7. 報價審核檢查點。

【判斷標準】禁止假設具體數字；提供公式與試算表結構，數字由公司填入。`,
    usageSteps: ["填入變數。", "與財會 review 公式。", "建立 Excel / BI 試算表。"],
    example: "工程整合常低估：加班費、材料損耗、變更管理成本。",
    commonMistakes: ["用毛利率反推售價卻忽略競爭情勢。"],
    cautions: ["毛利策略需與長期客戶關係一併評估。"],
    relatedSlugs: ["engineering-project-risk-prompt", "monthly-management-report"],
    seoTitle: "報價成本毛利分析提示詞｜AEGIS",
    seoDescription: "建立報價成本結構、毛利模擬與敏感度分析框架。",
  }),
  p({
    id: "m7",
    slug: "job-description-kpi",
    title: "職務說明與績效指標制定提示詞",
    summary: "整合職務說明書、關鍵職責與 KPI，避免部門績效標準模糊。",
    category: "management",
    tags: ["HR", "職務說明", "KPI"],
    audience: "HR、部門主管",
    industries: ["general", "sme"],
    difficulty: "intermediate",
    updatedAt: "2026-07-17",
    preparation: ["組織圖。", "部門年度目標。"],
    variables: [V.company, { name: "[職務名稱]", description: "例如：業務助理、專案經理" }, { name: "[部門]", description: "所屬部門" }, { name: "[匯報對象]", description: "直屬主管" }],
    body: `你是資深 HR 顧問。請為以下職務撰寫職務說明書與 KPI。

【背景】
- 公司：${V.company.name}
- 職務：[職務名稱] / [部門]
- 匯報對象：[匯報對象]

【輸出】
1. 職務目的 3 行。
2. 主要職責 5–8 條（動詞+對象+標準）。
3. 每條職責對應 KPI 或衡量方式。
4. 必要條件與加分條件。
5. 職涯發展路徑。
6. 90 天上手計畫。

【判斷標準】禁止使用「有責任感」這種難以評估的敘述；KPI 需可量化或事件化。`,
    usageSteps: ["填入變數。", "與部門主管確認職責與 KPI 分配。", "納入招募與績效面談。"],
    example: "業助 KPI：報價出稿平均時效、發票錯誤率、客訴處理及時率。",
    commonMistakes: ["把「多工能力強」列為主要 KPI。"],
    cautions: ["KPI 需符合勞動法與公平原則。"],
    relatedSlugs: ["quarterly-goals", "sop-writing-prompt"],
    seoTitle: "職務說明與 KPI 制定提示詞｜AEGIS",
    seoDescription: "整合職務說明、關鍵職責與可量化 KPI。",
  }),
  p({
    id: "m8",
    slug: "monthly-management-report",
    title: "企業月報與管理報表生成提示詞",
    summary: "把跨部門月度數字整理為經營層可讀的月報與行動建議。",
    category: "management",
    tags: ["月報", "經營", "管理報表"],
    audience: "經營層、部門主管",
    industries: ["general", "sme", "manufacturing"],
    difficulty: "intermediate",
    updatedAt: "2026-07-17",
    preparation: ["各部門數字（業務、財會、專案）。", "近 3 個月趨勢。"],
    variables: [V.company, { name: "[報告月份]", description: "例如：2026 年 7 月" }, { name: "[主要指標]", description: "例如：營收、Pipeline、專案毛利" }, { name: "[原始數字]", description: "貼上部門提供的原始資料" }],
    body: `你是 CEO 助理。請把以下數字整理為經營層月報。

【輸入】
- 公司：${V.company.name}
- 月份：[報告月份]
- 主要指標：[主要指標]
- 原始數字：[原始數字]

【輸出】
1. 執行摘要 5 行。
2. 各指標達成率與趨勢分析（附簡易文字圖）。
3. 三個好消息、三個警訊。
4. 每個警訊的可能原因與需追問的問題。
5. 下月建議行動 5 條，含負責人。
6. 需要老闆決策的 3 件事。

【判斷標準】禁止「感覺不錯」這種評語；每項結論需引用具體數字。`,
    usageSteps: ["把原始數字整理好貼上。", "AI 產出後由財會 / 業務主管審核。"],
    example: "老闆想在 15 分鐘看完月報時特別有效。",
    commonMistakes: ["AI 把跨月數字比錯，需人工核對。"],
    cautions: ["敏感財務數字須符合公司揭露政策。"],
    relatedSlugs: ["quarterly-goals", "cost-margin-analysis-prompt"],
    seoTitle: "企業月報生成提示詞｜AEGIS",
    seoDescription: "把跨部門月度數字整理為執行摘要、警訊與行動建議。",
  }),
  p({
    id: "m9",
    slug: "supply-chain-inventory-prompt",
    title: "採購、供應鏈與庫存決策提示詞",
    summary: "以資料為基礎協助分析供應商風險與庫存策略。",
    category: "management",
    tags: ["採購", "供應鏈", "庫存"],
    audience: "採購、資材",
    industries: ["manufacturing", "engineering"],
    difficulty: "advanced",
    updatedAt: "2026-07-17",
    preparation: ["供應商清單。", "近 12 個月採購與交期資料。"],
    variables: [V.company, { name: "[主要品項]", description: "本次分析品項" }, { name: "[主要供應商]", description: "供應商列表" }, { name: "[已知風險]", description: "例如：漲價、缺料、地緣風險" }],
    body: `你是資深供應鏈顧問。請協助分析供應商與庫存策略。

【背景】
- 公司：${V.company.name}
- 主要品項：[主要品項]
- 主要供應商：[主要供應商]
- 已知風險：[已知風險]

【輸出】
1. 品項 ABC 分析建議欄位。
2. 供應商評估矩陣（品質、交期、價格、財務、地緣）。
3. 單一供應商依賴風險評估。
4. 安全庫存策略（服務水準、需求變動）。
5. 現金流影響評估。
6. 短、中、長期行動建議。

【判斷標準】禁止建議「與供應商切割」等未經充分評估之決策。`,
    usageSteps: ["填入變數。", "以實際數字做 ABC。", "與採購主管 review。"],
    example: "半導體相關供應鏈需納入地緣與匯率風險。",
    commonMistakes: ["只看價格忽略交期與品質。"],
    cautions: ["斷貨風險評估需與生產與業務同步。"],
    relatedSlugs: ["inventory-procurement", "engineering-project-risk-prompt"],
    seoTitle: "供應鏈與庫存決策提示詞｜AEGIS",
    seoDescription: "以資料為基礎分析供應商風險、庫存策略與現金流影響。",
  }),
  p({
    id: "m10",
    slug: "ai-transformation-assessment",
    title: "企業 AI 數位轉型需求評估提示詞",
    summary: "在正式啟動 AI 專案前，先評估流程成熟度、資料現況與導入優先順序。",
    category: "management",
    tags: ["AI 導入", "數位轉型", "需求評估"],
    audience: "經營層、資訊、營運",
    industries: ["general", "sme", "manufacturing", "engineering"],
    difficulty: "intermediate",
    updatedAt: "2026-07-17",
    preparation: ["公司主要業務流程。", "現有系統清單。", "資料現況（Excel、系統、紙本）。"],
    variables: [V.company, V.industry, V.size, { name: "[主要期望]", description: "例如：客服自動化、報價加速、報表產出" }, { name: "[主要限制]", description: "例如：預算、人力、資料品質" }],
    body: `你是企業 AI 導入顧問。請針對以下公司做初步 AI 導入評估。

【背景】
- 公司：${V.company.name} / ${V.industry.name}
- 員工人數：${V.size.name}
- 主要期望：[主要期望]
- 主要限制：[主要限制]

【評估構面】
1. 流程成熟度（有無 SOP、可否重複執行）。
2. 資料現況（有無數位化、資料品質、可存取性）。
3. 系統整備度（API、權限、雲端 / 本地）。
4. 組織能力（有無資料 / AI 專責人員）。
5. 治理與資安（政策、個資、風險）。
6. 現有痛點的 AI 適用性評估（哪些適合 / 不適合）。

【輸出】
- 各構面 1–5 分打分與依據（若資訊不足請列為需訪談）。
- 依據期望與限制，建議 3 個「Quick Win」與 1 個「策略型專案」，附預估投入。
- 建議未來 90 / 180 / 365 天路線圖。

【判斷標準】禁止宣稱 AI 可完全取代專業人員；評估應含「不建議 AI 化」的情境。`,
    usageSteps: ["填入變數。", "以評估結果與經營層對齊。", "選定 Quick Win 啟動 PoC。"],
    example: "中小型製造業常見 Quick Win：報價文件自動比對、客戶郵件分類。",
    commonMistakes: ["直接跳到「導入 ChatGPT Enterprise」而未評估資料。"],
    cautions: ["AI 導入涉及流程與人員變動，需與 HR、法遵協同。"],
    relatedSlugs: ["workflow-automation", "erp-requirements"],
    seoTitle: "企業 AI 導入需求評估提示詞｜AEGIS",
    seoDescription: "在正式啟動 AI 專案前，評估流程成熟度、資料、系統與組織能力。",
  }),
];

export const PROMPTS: Prompt[] = [...WEBSITE, ...SYSTEM, ...MANAGEMENT];

export function getPrompt(slug: string): Prompt | undefined {
  return PROMPTS.find((p) => p.slug === slug);
}

export function getPromptsByCategory(cat: PromptCategory): Prompt[] {
  return PROMPTS.filter((p) => p.category === cat);
}

export function getRelatedPrompts(p: Prompt): Prompt[] {
  return p.relatedSlugs
    .map((s) => getPrompt(s))
    .filter((x): x is Prompt => Boolean(x));
}

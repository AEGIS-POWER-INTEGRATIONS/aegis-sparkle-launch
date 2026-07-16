export type Bi = { zh: string; en: string };

export type InsightCategory =
  | "case-study"
  | "ai-adoption"
  | "digital-transformation"
  | "engineering-management"
  | "workflow"
  | "automation";

export type Insight = {
  slug: string;
  category: InsightCategory;
  industryTag?: Bi;
  title: Bi;
  summary: Bi;
  readMinutes: number;
  // For case studies:
  challenge?: Bi;
  solution?: Bi;
  implementation?: Bi[];
  outcome?: Bi[];
  relatedServices?: { label: Bi; to: string }[];
  // For articles:
  sections?: { heading: Bi; body: Bi }[];
};

export const CATEGORY_LABEL: Record<InsightCategory, Bi> = {
  "case-study": { zh: "客戶案例", en: "Case Study" },
  "ai-adoption": { zh: "AI 導入指南", en: "AI Adoption Guide" },
  "digital-transformation": { zh: "數位轉型觀點", en: "Digital Transformation" },
  "engineering-management": { zh: "工程管理實務", en: "Engineering Management" },
  workflow: { zh: "企業流程優化", en: "Workflow Improvement" },
  automation: { zh: "自動化範例", en: "Automation Example" },
};

const engineering = { label: { zh: "工程整合服務", en: "Engineering Integration" }, to: "/engineering" };
const ai = { label: { zh: "AI 系統整合", en: "AI System Integration" }, to: "/ai-integration" };
const costflow = { label: { zh: "Aegis CostFlow", en: "Aegis CostFlow" }, to: "/costflow" };
const salesops = { label: { zh: "Aegis SalesOps", en: "Aegis SalesOps" }, to: "/salesops" };
const aiLaunch = { label: { zh: "Aegis AI Launch", en: "Aegis AI Launch" }, to: "/ai-launch" };

export const INSIGHTS: Insight[] = [
  {
    slug: "semiconductor-supplier-quote-ai",
    category: "case-study",
    industryTag: { zh: "半導體 · 供應鏈", en: "Semiconductor · Supply Chain" },
    title: { zh: "半導體供應鏈：以 AI 加速供應商報價比對", en: "Semiconductor: Accelerating Supplier Quote Analysis with AI" },
    summary: { zh: "某半導體客戶原本以人工比對數十家供應商報價，導入 AI 輔助後將分析時間縮短逾 70%。", en: "A semiconductor customer replaced manual comparison of dozens of supplier quotes with AI-assisted analysis, cutting review time by 70%+." },
    readMinutes: 5,
    challenge: { zh: "採購團隊每次專案需比對數十家供應商的 BOM 與報價，作業高度重複、易出錯，且難以留下可再利用的分析。", en: "Procurement had to compare BOMs and prices across dozens of suppliers per project — repetitive, error-prone work that left no reusable analysis." },
    solution: { zh: "由 AEGIS 建立標準化資料模型與 AI 輔助比對流程，結合企業內既有 ERP 資料。", en: "AEGIS built a standardized data model with AI-assisted comparison, integrated with the customer's existing ERP." },
    implementation: [
      { zh: "盤點採購流程與資料格式，訂定統一欄位規則。", en: "Audit procurement workflows and data formats; define unified field rules." },
      { zh: "建立報價匯入與清洗流程，接入 AI 比對服務。", en: "Build quote-ingestion and normalization pipelines feeding the AI comparison service." },
      { zh: "與採購、財務團隊共同驗證輸出並調整規則。", en: "Validate outputs with procurement and finance; iterate the rules." },
    ],
    outcome: [
      { zh: "單案報價分析時間縮短逾 70%。", en: "Per-project quote-analysis time reduced by 70%+." },
      { zh: "採購決策紀錄可追溯、可再利用。", en: "Procurement decisions are now traceable and reusable." },
      { zh: "跨專案累積出可持續使用的供應商資料資產。", en: "Cross-project supplier data has become a durable company asset." },
    ],
    relatedServices: [ai, costflow],
  },
  {
    slug: "data-center-ticket-automation",
    category: "case-study",
    industryTag: { zh: "資料中心 · 維運", en: "Data Center · Operations" },
    title: { zh: "資料中心：工單自動分類與 SLA 追蹤", en: "Data Center: Automated Ticket Routing and SLA Tracking" },
    summary: { zh: "維運團隊在高頻工單下建立自動分類與派工機制，把首應時間從數小時縮短到分鐘級。", en: "An operations team introduced automated ticket classification and routing, cutting first-response time from hours to minutes under high ticket volume." },
    readMinutes: 6,
    challenge: { zh: "工單累積速度快、種類多樣，資深工程師被大量分類與派工工作占用，事故根因分析被延遲。", en: "Rapid, varied ticket flow pulled senior engineers into triage, delaying root-cause analysis on real incidents." },
    solution: { zh: "AEGIS 導入 AI 工單分類、SLA 監控與知識庫串接，並優化告警去噪。", en: "AEGIS deployed AI ticket classification, SLA monitoring and knowledge-base integration, together with alert de-duplication." },
    implementation: [
      { zh: "梳理工單類型與 SLA 標準。", en: "Map ticket types and SLA standards." },
      { zh: "建立 AI 分類模型與人工覆核機制。", en: "Deploy an AI classifier with human-in-the-loop review." },
      { zh: "整合知識庫與 SOP，供工程師快速引用。", en: "Integrate the knowledge base and SOPs for fast engineer lookup." },
    ],
    outcome: [
      { zh: "首應時間由數小時縮短至分鐘級。", en: "First-response time dropped from hours to minutes." },
      { zh: "資深工程師可聚焦於高價值事故處理。", en: "Senior engineers freed to focus on high-value incidents." },
      { zh: "SLA 達成率長期穩定改善。", en: "SLA attainment improved sustainably." },
    ],
    relatedServices: [ai, engineering],
  },
  {
    slug: "epc-cost-transparency",
    category: "case-study",
    industryTag: { zh: "EPC 工程 · 成本管理", en: "EPC · Cost Management" },
    title: { zh: "EPC 統包：以結構化報價建立成本透明度", en: "EPC: Structured Estimating for Cost Transparency" },
    summary: { zh: "統包商以 CostFlow 整合報價與成本資料，讓專案毛利、變更影響一目了然。", en: "An EPC contractor unified estimating and cost data in CostFlow, making project margin and change-order impact obvious." },
    readMinutes: 5,
    challenge: { zh: "報價與實際成本分散在多份 Excel，變更單影響難以即時反映在毛利上。", en: "Estimates and actuals were scattered across many spreadsheets, so change orders never reflected in margin quickly enough." },
    solution: { zh: "以 Aegis CostFlow 建立標準化報價結構，同步串接實際成本與變更紀錄。", en: "Aegis CostFlow provided a standardized estimating structure linked to actuals and change orders." },
    implementation: [
      { zh: "與工程、財務團隊共同定義報價結構。", en: "Co-design the estimating structure with engineering and finance." },
      { zh: "將歷史專案資料匯入並清整。", en: "Import and clean historical project data." },
      { zh: "建立變更單流程與毛利即時儀表板。", en: "Add change-order workflow and a live margin dashboard." },
    ],
    outcome: [
      { zh: "專案毛利可視化，決策周期縮短。", en: "Project margin is now visible; decision cycles are shorter." },
      { zh: "變更單審核紀錄完整可追溯。", en: "Change-order approvals are fully traceable." },
      { zh: "跨專案累積可比較的報價資料庫。", en: "A comparable estimating database now accumulates across projects." },
    ],
    relatedServices: [costflow, ai],
  },
  {
    slug: "manufacturing-sales-weekly-report",
    category: "case-study",
    industryTag: { zh: "製造業 · 業務", en: "Manufacturing · Sales" },
    title: { zh: "製造業：AI 週報讓業務主管每週節省一天", en: "Manufacturing: AI Weekly Reports Save Sales Leaders a Day per Week" },
    summary: { zh: "業務主管以 SalesOps 自動彙整週報與客戶紀錄，把行政時間變回策略時間。", en: "Sales leaders used SalesOps to auto-aggregate weekly reports and customer notes, converting admin time back into strategy time." },
    readMinutes: 4,
    challenge: { zh: "業務主管每週花大量時間整理業務進度與客戶動態，決策速度受限。", en: "Sales leaders spent hours each week compiling activity and customer updates, throttling decision speed." },
    solution: { zh: "以 Aegis SalesOps 建立業務資料模型與 AI 週報流程。", en: "Aegis SalesOps established a sales data model and an AI weekly-report workflow." },
    implementation: [
      { zh: "定義業務關鍵欄位與紀錄規範。", en: "Define key sales fields and note conventions." },
      { zh: "串接既有客戶資料與郵件紀錄。", en: "Connect existing customer data and email logs." },
      { zh: "AI 生成週報，主管審核與批註。", en: "AI drafts the weekly report; managers review and annotate." },
    ],
    outcome: [
      { zh: "業務主管每週節省約一個工作天。", en: "Sales leaders save roughly one working day per week." },
      { zh: "客戶動態即時反映到管理層。", en: "Customer signals now surface to leadership in near real time." },
    ],
    relatedServices: [salesops, ai],
  },
  {
    slug: "sme-ai-launch-adoption",
    category: "case-study",
    industryTag: { zh: "中小企業 · 導入", en: "SME · Adoption" },
    title: { zh: "中小企業：從一個流程開始的 AI 落地", en: "SME: AI Adoption That Starts From One Workflow" },
    summary: { zh: "以 Aegis AI Launch 從報價與客戶回覆兩個流程切入，讓 AI 真的被員工使用。", en: "Aegis AI Launch entered through estimating and customer replies — two workflows employees actually use." },
    readMinutes: 5,
    challenge: { zh: "曾嘗試導入 AI 工具但無人使用，管理層擔心投入無法回收。", en: "Previous AI tools were introduced but nobody used them; leadership worried the investment would be lost." },
    solution: { zh: "AEGIS 從報價與客服兩個高頻流程切入，搭配教育訓練與內部負責人培養。", en: "AEGIS entered through estimating and customer service — two high-frequency workflows — paired with training and an internal owner." },
    implementation: [
      { zh: "選定 2 個高頻流程與量測指標。", en: "Pick two high-frequency workflows and metrics." },
      { zh: "設計符合實際使用情境的 AI 提示與流程。", en: "Design prompts and workflows around real usage." },
      { zh: "培訓內部負責人並建立回饋機制。", en: "Train an internal owner and set up a feedback loop." },
    ],
    outcome: [
      { zh: "AI 工具在 30 天內於選定流程達到日常使用。", en: "AI tools reached daily use in the selected workflows within 30 days." },
      { zh: "內部負責人可自行擴展至第三、第四個流程。", en: "The internal owner can now extend the approach to further workflows." },
    ],
    relatedServices: [aiLaunch, ai],
  },
  {
    slug: "ai-adoption-guide",
    category: "ai-adoption",
    title: { zh: "企業 AI 導入指南：從單點應用到組織能力", en: "Enterprise AI Adoption: From Point Solutions to Organizational Capability" },
    summary: { zh: "AI 導入不是一次性工程，而是與流程、資料、人才共同演化的組織能力。", en: "AI adoption is not a one-off project — it is an organizational capability that evolves with workflows, data and people." },
    readMinutes: 8,
    sections: [
      { heading: { zh: "為什麼多數 AI 導入無法規模化", en: "Why most AI rollouts stall" }, body: { zh: "常見原因是選錯場景、資料不足、或缺乏內部負責人。AI 工具本身可用，但沒有可持續的機制。", en: "The usual causes are the wrong use case, insufficient data, or the lack of an internal owner. The tool works — but nothing sustains it." } },
      { heading: { zh: "選對切入場景", en: "Choose the right entry point" }, body: { zh: "從高頻、資訊密集、可量測的流程開始，例如報價、業務週報、客服。", en: "Start with high-frequency, information-heavy, measurable workflows — quotes, weekly sales reports, customer service." } },
      { heading: { zh: "資料先行", en: "Data first" }, body: { zh: "先把資料格式、權限與流程整理好，再導入 AI 才能形成長期優勢。", en: "Fix data formats, access and workflows before AI — that is what turns pilots into durable advantage." } },
      { heading: { zh: "內部負責人", en: "Internal owner" }, body: { zh: "每個 AI 應用都需要一位內部負責人，負責與員工共同調整、修正與擴展。", en: "Every AI application needs an internal owner who iterates with employees and extends what works." } },
    ],
  },
  {
    slug: "engineering-project-management",
    category: "engineering-management",
    title: { zh: "工程專案管理實務：把不確定性變成可管理的節奏", en: "Engineering Project Management: Turning Uncertainty into a Manageable Cadence" },
    summary: { zh: "從報價、變更、驗收到維運，工程專案的每個節點都需要可觀察與可協調的機制。", en: "From estimating to commissioning and operations, every milestone in an engineering project needs observable, coordinated mechanics." },
    readMinutes: 7,
    sections: [
      { heading: { zh: "報價的紀律", en: "The discipline of estimating" }, body: { zh: "報價的品質決定了整個專案的財務與時程基準，值得以結構化方式管理。", en: "Estimating quality sets the financial and schedule baseline for the whole project — worth structuring rigorously." } },
      { heading: { zh: "變更管理", en: "Change management" }, body: { zh: "變更是常態，關鍵是讓變更成本與時程影響能即時反映到管理層。", en: "Change is normal — the point is to make its cost and schedule impact visible to leadership instantly." } },
      { heading: { zh: "現場與後勤的資訊落差", en: "Field vs. back-office data gap" }, body: { zh: "縮短現場與後勤之間的資訊延遲，是提升專案交付品質最直接的槓桿。", en: "Reducing the information lag between field and back office is the most direct lever on delivery quality." } },
    ],
  },
  {
    slug: "workflow-automation-examples",
    category: "automation",
    title: { zh: "企業自動化實例：五個立即可行的場景", en: "Enterprise Automation: Five Scenarios You Can Start This Quarter" },
    summary: { zh: "從報價、客服、業務週報到採購比對與工單分類，這些場景已經被驗證可以落地。", en: "Quoting, customer replies, weekly sales reports, procurement comparison, ticket triage — all proven to land in production." },
    readMinutes: 6,
    sections: [
      { heading: { zh: "1. 報價草稿", en: "1. Draft quotes" }, body: { zh: "以歷史案件與價格資料為基礎，AI 產生報價草稿並提示風險項目。", en: "Using historical projects and pricing, AI drafts quotes and flags risk items." } },
      { heading: { zh: "2. 客服回覆", en: "2. Customer replies" }, body: { zh: "以公司語氣與 FAQ 為基礎，AI 提供第一版回覆讓客服快速調整。", en: "Grounded in company tone and FAQs, AI proposes a first draft the service team quickly tunes." } },
      { heading: { zh: "3. 業務週報", en: "3. Weekly sales reports" }, body: { zh: "從 CRM、郵件與紀錄自動整理業務週報。", en: "Auto-assemble weekly reports from CRM, email and notes." } },
      { heading: { zh: "4. 採購比對", en: "4. Procurement comparison" }, body: { zh: "供應商報價與 BOM 差異自動比對。", en: "Auto-compare supplier quotes and BOM deltas." } },
      { heading: { zh: "5. 工單分類", en: "5. Ticket triage" }, body: { zh: "工單自動分類、派工並鏈結 SOP。", en: "Auto-classify, route and link tickets to the relevant SOP." } },
    ],
  },
];

export function getInsight(slug: string): Insight | undefined {
  return INSIGHTS.find((i) => i.slug === slug);
}

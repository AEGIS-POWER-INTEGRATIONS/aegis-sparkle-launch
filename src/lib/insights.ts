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
  "case-study": { zh: "情境案例", en: "Scenario Example" },
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
    title: { zh: "半導體供應鏈：以 AI 加速供應商報價比對（情境案例）", en: "Semiconductor: Accelerating Supplier Quote Analysis with AI (Scenario)" },
    summary: { zh: "以半導體採購常見流程設計的導入情境，說明 AI 輔助如何降低人工比對報價所需的時間。", en: "A scenario built from typical semiconductor procurement workflows, illustrating how AI-assisted comparison can reduce manual quote-review effort." },
    readMinutes: 5,
    challenge: { zh: "採購團隊每次專案需比對數十家供應商的 BOM 與報價，作業高度重複、易出錯，且難以留下可再利用的分析。", en: "Procurement has to compare BOMs and prices across dozens of suppliers per project — repetitive, error-prone work that leaves no reusable analysis." },
    solution: { zh: "由 AEGIS 建立標準化資料模型與 AI 輔助比對流程，結合企業內既有 ERP 資料。", en: "AEGIS builds a standardized data model with AI-assisted comparison, integrated with the existing ERP." },
    implementation: [
      { zh: "盤點採購流程與資料格式，訂定統一欄位規則。", en: "Audit procurement workflows and data formats; define unified field rules." },
      { zh: "建立報價匯入與清洗流程，接入 AI 比對服務。", en: "Build quote-ingestion and normalization pipelines feeding the AI comparison service." },
      { zh: "與採購、財務團隊共同驗證輸出並調整規則。", en: "Validate outputs with procurement and finance; iterate the rules." },
    ],
    outcome: [
      { zh: "預期改善方向：降低單案報價分析所需的人工時間。", en: "Expected direction: reduce manual quote-analysis effort per project." },
      { zh: "預期改善方向：採購決策紀錄可追溯、可再利用。", en: "Expected direction: procurement decisions become traceable and reusable." },
      { zh: "預期改善方向：跨專案累積可長期使用的供應商資料資產。", en: "Expected direction: cross-project supplier data becomes a durable asset." },
    ],

    relatedServices: [ai, costflow],
  },
  {
    slug: "data-center-ticket-automation",
    category: "case-study",
    industryTag: { zh: "資料中心 · 維運", en: "Data Center · Operations" },
    title: { zh: "資料中心：工單自動分類與 SLA 追蹤（情境案例）", en: "Data Center: Automated Ticket Routing and SLA Tracking (Scenario)" },
    summary: { zh: "以資料中心維運常見痛點設計的導入情境，說明如何以 AI 分類與 SLA 監控縮短工單首應時間。", en: "A scenario built from common data-center operations pain points, illustrating how AI classification and SLA monitoring can shorten first-response time." },
    readMinutes: 6,
    challenge: { zh: "工單累積速度快、種類多樣，資深工程師被大量分類與派工工作占用，事故根因分析被延遲。", en: "Rapid, varied ticket flow pulls senior engineers into triage, delaying root-cause analysis on real incidents." },
    solution: { zh: "AEGIS 導入 AI 工單分類、SLA 監控與知識庫串接，並優化告警去噪。", en: "AEGIS deploys AI ticket classification, SLA monitoring and knowledge-base integration, together with alert de-duplication." },
    implementation: [
      { zh: "梳理工單類型與 SLA 標準。", en: "Map ticket types and SLA standards." },
      { zh: "建立 AI 分類模型與人工覆核機制。", en: "Deploy an AI classifier with human-in-the-loop review." },
      { zh: "整合知識庫與 SOP，供工程師快速引用。", en: "Integrate the knowledge base and SOPs for fast engineer lookup." },
    ],
    outcome: [
      { zh: "預期改善方向：縮短工單分類與派工的人工延遲。", en: "Expected direction: reduce manual delay in ticket triage and routing." },
      { zh: "預期改善方向：資深工程師可聚焦於高價值事故處理。", en: "Expected direction: senior engineers can focus on high-value incidents." },
      { zh: "預期改善方向：建立可長期追蹤的 SLA 與工單資料。", en: "Expected direction: build long-term traceable SLA and ticket data." },
    ],

    relatedServices: [ai, engineering],
  },
  {
    slug: "epc-cost-transparency",
    category: "case-study",
    industryTag: { zh: "EPC 工程 · 成本管理", en: "EPC · Cost Management" },
    title: { zh: "EPC 統包：以結構化報價建立成本透明度（情境案例）", en: "EPC: Structured Estimating for Cost Transparency (Scenario)" },
    summary: { zh: "以 EPC 統包常見痛點設計的導入情境，說明如何以 CostFlow 整合報價與實際成本。", en: "A scenario built from common EPC contractor pain points, illustrating how CostFlow can unify estimating and actual cost data." },
    readMinutes: 5,
    challenge: { zh: "報價與實際成本分散在多份 Excel，變更單影響難以即時反映在毛利上。", en: "Estimates and actuals are scattered across many spreadsheets, so change orders rarely reflect in margin quickly enough." },
    solution: { zh: "以 Aegis CostFlow 建立標準化報價結構，同步串接實際成本與變更紀錄。", en: "Aegis CostFlow provides a standardized estimating structure linked to actuals and change orders." },
    implementation: [
      { zh: "與工程、財務團隊共同定義報價結構。", en: "Co-design the estimating structure with engineering and finance." },
      { zh: "將歷史專案資料匯入並清整。", en: "Import and clean historical project data." },
      { zh: "建立變更單流程與毛利即時儀表板。", en: "Add change-order workflow and a live margin dashboard." },
    ],
    outcome: [
      { zh: "預期改善方向：讓專案毛利更清楚可視化，決策更即時。", en: "Expected direction: make project margin visible and decisions faster." },
      { zh: "預期改善方向：變更單審核紀錄完整可追溯。", en: "Expected direction: change-order approvals become fully traceable." },
      { zh: "預期改善方向：跨專案累積可比較的報價資料庫。", en: "Expected direction: build a comparable cross-project estimating database." },
    ],

    relatedServices: [costflow, ai],
  },
  {
    slug: "manufacturing-sales-weekly-report",
    category: "case-study",
    industryTag: { zh: "製造業 · 業務", en: "Manufacturing · Sales" },
    title: { zh: "製造業：以 AI 週報縮短業務主管的行政時間（情境案例）", en: "Manufacturing: Reducing Sales Leaders' Admin Time with AI Weekly Reports (Scenario)" },
    summary: { zh: "以製造業業務團隊常見流程設計的導入情境，說明 SalesOps 如何協助自動彙整週報與客戶紀錄。", en: "A scenario built from typical manufacturing sales workflows, illustrating how SalesOps can help auto-aggregate weekly reports and customer notes." },
    readMinutes: 4,
    challenge: { zh: "業務主管每週花大量時間整理業務進度與客戶動態，決策速度受限。", en: "Sales leaders spend hours each week compiling activity and customer updates, throttling decision speed." },
    solution: { zh: "以 Aegis SalesOps 建立業務資料模型與 AI 週報流程。", en: "Aegis SalesOps establishes a sales data model and an AI weekly-report workflow." },
    implementation: [
      { zh: "定義業務關鍵欄位與紀錄規範。", en: "Define key sales fields and note conventions." },
      { zh: "串接既有客戶資料與郵件紀錄。", en: "Connect existing customer data and email logs." },
      { zh: "AI 生成週報，主管審核與批註。", en: "AI drafts the weekly report; managers review and annotate." },
    ],
    outcome: [
      { zh: "預期改善方向：降低業務主管每週整理報告的行政時間。", en: "Expected direction: reduce leaders' weekly report-preparation time." },
      { zh: "預期改善方向：客戶動態能更即時反映到管理層。", en: "Expected direction: customer signals surface to leadership faster." },
    ],

    relatedServices: [salesops, ai],
  },
  {
    slug: "sme-ai-launch-adoption",
    category: "case-study",
    industryTag: { zh: "中小企業 · 導入", en: "SME · Adoption" },
    title: { zh: "中小企業：從一個流程開始的 AI 落地（情境案例）", en: "SME: AI Adoption That Starts From One Workflow (Scenario)" },
    summary: { zh: "以中小企業常見情境設計的導入示例，示範如何從報價與客戶回覆等高頻流程切入 AI。", en: "A scenario for SMEs, illustrating how AI can be introduced through high-frequency workflows such as estimating and customer replies." },
    readMinutes: 5,
    challenge: { zh: "曾嘗試導入 AI 工具但無人使用，管理層擔心投入無法回收。", en: "Previous AI tools were introduced but nobody used them; leadership worried the investment would be lost." },
    solution: { zh: "AEGIS 從報價與客服兩個高頻流程切入，搭配教育訓練與內部負責人培養。", en: "AEGIS enters through estimating and customer service — two high-frequency workflows — paired with training and an internal owner." },
    implementation: [
      { zh: "選定 2 個高頻流程與量測指標。", en: "Pick two high-frequency workflows and metrics." },
      { zh: "設計符合實際使用情境的 AI 提示與流程。", en: "Design prompts and workflows around real usage." },
      { zh: "培訓內部負責人並建立回饋機制。", en: "Train an internal owner and set up a feedback loop." },
    ],
    outcome: [
      { zh: "預期改善方向：AI 工具能於選定流程被員工實際使用。", en: "Expected direction: AI tools become part of daily use in the chosen workflows." },
      { zh: "預期改善方向：內部負責人可將經驗擴展至更多流程。", en: "Expected direction: the internal owner can extend the approach to further workflows." },
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

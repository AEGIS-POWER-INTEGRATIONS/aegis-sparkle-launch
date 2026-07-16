export type Bi = { zh: string; en: string };

export type Industry = {
  slug: string;
  name: Bi;
  tagline: Bi;
  hero: Bi;
  challenges: Bi[];
  painPoints: Bi[];
  aiOpportunities: Bi[];
  engineeringOpportunities: Bi[];
  roadmap: { phase: Bi; detail: Bi }[];
  relatedServices: { label: Bi; to: string }[];
};

const engineering = { label: { zh: "工程整合服務", en: "Engineering Integration" }, to: "/engineering" };
const ai = { label: { zh: "AI 系統整合", en: "AI System Integration" }, to: "/ai-integration" };
const costflow = { label: { zh: "Aegis CostFlow", en: "Aegis CostFlow" }, to: "/costflow" };
const salesops = { label: { zh: "Aegis SalesOps", en: "Aegis SalesOps" }, to: "/salesops" };
const aiLaunch = { label: { zh: "Aegis AI Launch", en: "Aegis AI Launch" }, to: "/ai-launch" };

export const INDUSTRIES: Industry[] = [
  {
    slug: "semiconductor",
    name: { zh: "半導體產業", en: "Semiconductor" },
    tagline: { zh: "為晶圓廠與封測供應鏈提供高規格的工程整合與資料流自動化。", en: "High-spec engineering integration and data-flow automation for fabs and OSAT supply chains." },
    hero: { zh: "從無塵室基礎工程、廠務網路，到供應鏈與品質資料的 AI 化，AEGIS 協助半導體客戶在嚴苛環境下維持穩定與可追溯的營運。", en: "From cleanroom infrastructure and facility networks to AI-enabled supply chain and quality data, AEGIS supports semiconductor customers with reliable, traceable operations under demanding conditions." },
    challenges: [
      { zh: "嚴格的品質、良率與可追溯性要求", en: "Strict quality, yield and traceability requirements" },
      { zh: "高可用性與極低中斷容忍度的營運要求", en: "High-availability operations with very low downtime tolerance" },
      { zh: "多廠區、多供應商跨系統資訊落差", en: "Data gaps across multi-site, multi-vendor systems" },
      { zh: "工程變更頻繁、文件與版本管理複雜", en: "Frequent engineering changes with complex document and version control" },
    ],
    painPoints: [
      { zh: "廠務、IT、產線資料分屬多套系統，無法即時整合", en: "Facility, IT and production data siloed across multiple systems" },
      { zh: "供應鏈報價、變更與交期靠人工郵件與 Excel 追蹤", en: "Supplier quotes, changes and lead times tracked manually via email and Excel" },
      { zh: "品質異常追溯耗時，跨部門溝通成本高", en: "Quality-issue root-cause analysis is slow and cross-team-heavy" },
    ],
    aiOpportunities: [
      { zh: "供應商報價與 BOM 差異自動比對", en: "Automated supplier quote and BOM variance analysis" },
      { zh: "工程變更單 (ECN) 智能歸檔與影響分析", en: "AI-assisted ECN classification and impact analysis" },
      { zh: "品質異常紀錄語意搜尋與案例推薦", en: "Semantic search over quality logs with case recommendations" },
      { zh: "廠務資料異常偵測與預測性維護", en: "Anomaly detection and predictive maintenance on facility data" },
    ],
    engineeringOpportunities: [
      { zh: "無塵室與廠務網路 (Fab LAN) 建置與升級", en: "Cleanroom and Fab LAN deployment and upgrades" },
      { zh: "光纖骨幹、跨棟連線與資料中心支援", en: "Fiber backbone, cross-building links and data-center support" },
      { zh: "監控、門禁與人員追蹤系統整合", en: "Surveillance, access control and personnel-tracking integration" },
      { zh: "設備連網 (SECS/GEM 週邊) 與資料匯集", en: "Equipment connectivity (SECS/GEM-adjacent) and data aggregation" },
    ],
    roadmap: [
      { phase: { zh: "階段一 · 現場診斷", en: "Phase 1 · Site Discovery" }, detail: { zh: "工程與資料流盤點，識別關鍵瓶頸與可量測指標。", en: "Engineering and data-flow audit; identify bottlenecks and measurable KPIs." } },
      { phase: { zh: "階段二 · 基礎工程", en: "Phase 2 · Infrastructure" }, detail: { zh: "先完成網路、資料與監控基礎，做為後續 AI 應用的可靠來源。", en: "Establish reliable network, data and monitoring foundations before AI." } },
      { phase: { zh: "階段三 · AI 導入", en: "Phase 3 · AI Pilots" }, detail: { zh: "從報價比對、ECN 分類等單點應用起步，快速驗證價值。", en: "Start with quote comparison, ECN classification and other narrow pilots to prove value." } },
      { phase: { zh: "階段四 · 規模化", en: "Phase 4 · Scale" }, detail: { zh: "將驗證有效的流程推廣至多廠區與供應鏈上游。", en: "Roll validated workflows out to additional sites and upstream suppliers." } },
    ],
    relatedServices: [engineering, ai, costflow],
  },
  {
    slug: "data-centers",
    name: { zh: "資料中心", en: "Data Centers" },
    tagline: { zh: "從機房基礎工程到營運自動化，支援超大規模與企業級資料中心。", en: "From white-space engineering to operations automation for hyperscale and enterprise data centers." },
    hero: { zh: "AEGIS 為資料中心提供結構化佈線、光纖骨幹、機櫃與配電支援，並協助建立監控與工單自動化，讓維運團隊聚焦於價值決策。", en: "AEGIS delivers structured cabling, fiber backbone, rack and power support for data centers, together with monitoring and ticketing automation that lets operations teams focus on high-value decisions." },
    challenges: [
      { zh: "高密度部署下的散熱、供電與佈線挑戰", en: "Cooling, power and cabling challenges in high-density deployments" },
      { zh: "多租戶與跨區域維運標準一致性", en: "Consistent operations standards across multi-tenant, multi-region sites" },
      { zh: "工單、事件與變更管理的高頻運作", en: "High-frequency ticketing, incident and change management" },
    ],
    painPoints: [
      { zh: "監控系統告警過多，重要事件被淹沒", en: "Monitoring noise buries the incidents that actually matter" },
      { zh: "變更工單流程冗長，跨團隊等待時間長", en: "Change-request workflows are slow and cross-team wait times are high" },
      { zh: "維運知識分散於個人與郵件之中", en: "Operations knowledge scattered across individuals and email threads" },
    ],
    aiOpportunities: [
      { zh: "告警去噪與事件根因輔助分析", en: "Alert de-duplication and AI-assisted incident RCA" },
      { zh: "工單自動分類、指派與 SLA 追蹤", en: "Auto ticket classification, routing and SLA tracking" },
      { zh: "維運知識庫語意搜尋與 SOP 生成", en: "Semantic search over the ops knowledge base and SOP drafting" },
    ],
    engineeringOpportunities: [
      { zh: "結構化佈線、光纖骨幹與 MMR/MDA 建置", en: "Structured cabling, fiber backbone and MMR/MDA build-out" },
      { zh: "機櫃、PDU、走線與冷通道規劃支援", en: "Rack, PDU, cable pathway and cold-aisle planning support" },
      { zh: "監控、門禁、CCTV 與環境感測整合", en: "Monitoring, access control, CCTV and environmental sensor integration" },
    ],
    roadmap: [
      { phase: { zh: "階段一 · 需求規劃", en: "Phase 1 · Requirements" }, detail: { zh: "確認容量、可用性與維運模式，訂定驗收標準。", en: "Confirm capacity, availability and ops model; define acceptance criteria." } },
      { phase: { zh: "階段二 · 基礎工程", en: "Phase 2 · Infrastructure" }, detail: { zh: "完成佈線、配電、機櫃與監控基礎建置。", en: "Deploy cabling, power, racks and monitoring foundations." } },
      { phase: { zh: "階段三 · 營運自動化", en: "Phase 3 · Ops Automation" }, detail: { zh: "導入工單、告警與知識庫的 AI 輔助流程。", en: "Introduce AI-assisted ticketing, alerting and knowledge workflows." } },
      { phase: { zh: "階段四 · 持續優化", en: "Phase 4 · Continuous Improvement" }, detail: { zh: "以 KPI 與事件回顧驅動流程與基礎設施升級。", en: "Iterate infrastructure and workflows via KPI and post-incident reviews." } },
    ],
    relatedServices: [engineering, ai],
  },
  {
    slug: "epc-engineering",
    name: { zh: "EPC 工程統包", en: "EPC Engineering" },
    tagline: { zh: "為 EPC 統包商提供工程資料、報價與現場管理的整合能力。", en: "Integrated engineering data, quotation and site management capability for EPC contractors." },
    hero: { zh: "EPC 專案橫跨設計、採購、施工與試運轉，AEGIS 協助統包商把分散的工程資料、報價與現場資訊串成可管理的整體。", en: "EPC projects span design, procurement, construction and commissioning. AEGIS helps contractors turn fragmented engineering, quotation and site data into a coherent, manageable whole." },
    challenges: [
      { zh: "設計、採購、施工三方資料難以同步", en: "Design, procurement and construction data hard to keep in sync" },
      { zh: "變更單頻繁，成本與時程風險累積", en: "Frequent change orders accumulate cost and schedule risk" },
      { zh: "現場執行與後勤支援資訊落差大", en: "Wide information gaps between field execution and back-office support" },
    ],
    painPoints: [
      { zh: "報價與成本分析仰賴大量 Excel 與人力核對", en: "Estimating and cost analysis rely on heavy Excel and manual review" },
      { zh: "現場進度回報依靠通訊軟體與紙本記錄", en: "Site progress tracked over chat apps and paper forms" },
      { zh: "追加減、簽核與文件版本管理不透明", en: "Change orders, approvals and document versions lack transparency" },
    ],
    aiOpportunities: [
      { zh: "工程報價智能拆項與歷史案件比對", en: "AI-assisted BOQ breakdown and historical-project benchmarking" },
      { zh: "變更單自動草擬與影響評估", en: "Auto-drafted change orders with impact assessment" },
      { zh: "施工日報、會議紀錄摘要與待辦追蹤", en: "Daily-report and meeting-note summarization with action tracking" },
    ],
    engineeringOpportunities: [
      { zh: "現場弱電、監控、通訊系統的統一規劃", en: "Unified planning for on-site ELV, surveillance and comms systems" },
      { zh: "跨承包商協力管理與界面整合", en: "Multi-contractor coordination and interface management" },
      { zh: "驗收前的系統整合測試與文件交付", en: "System integration testing and document handover before acceptance" },
    ],
    roadmap: [
      { phase: { zh: "階段一 · 專案盤點", en: "Phase 1 · Project Baseline" }, detail: { zh: "選定 1–2 個試點專案，盤點現有流程與資料。", en: "Pick 1–2 pilot projects; audit current workflows and data." } },
      { phase: { zh: "階段二 · 報價與成本", en: "Phase 2 · Estimating & Cost" }, detail: { zh: "以 CostFlow 導入結構化報價與成本追蹤。", en: "Deploy structured estimating and cost tracking with CostFlow." } },
      { phase: { zh: "階段三 · 現場數位化", en: "Phase 3 · Field Digitalization" }, detail: { zh: "串接施工回報、變更單與文件版本管理。", en: "Connect field reporting, change orders and document version control." } },
      { phase: { zh: "階段四 · AI 輔助決策", en: "Phase 4 · AI-Assisted Decisions" }, detail: { zh: "在成熟流程上加入 AI 摘要與風險預警。", en: "Layer AI summarization and risk flags onto mature workflows." } },
    ],
    relatedServices: [costflow, engineering, ai],
  },
  {
    slug: "manufacturing",
    name: { zh: "製造業", en: "Manufacturing" },
    tagline: { zh: "整合廠務、產線與辦公室流程，讓製造業具備可持續的數位能力。", en: "Integrate facility, production and back-office workflows into a durable digital capability for manufacturers." },
    hero: { zh: "AEGIS 從廠務工程、設備連網到 ERP / CRM 與 AI 應用，協助中大型製造業建立務實、可長期維運的數位化架構。", en: "From facility engineering and equipment connectivity to ERP/CRM and AI applications, AEGIS helps mid- and large-size manufacturers build a pragmatic, maintainable digital stack." },
    challenges: [
      { zh: "老舊設備與新系統並存，資料難以整合", en: "Legacy equipment and modern systems coexist, making data hard to unify" },
      { zh: "訂單、報價、生產、出貨流程橫跨多部門", en: "Order, quote, production and shipping workflows span many departments" },
      { zh: "人才與經驗傳承壓力大", en: "Significant pressure around workforce and know-how continuity" },
    ],
    painPoints: [
      { zh: "業務報價與出貨追蹤仰賴個人習慣", en: "Sales quoting and shipment tracking depend on individual habits" },
      { zh: "現場異常回報缺乏結構化資料", en: "Shop-floor issue reports lack structured data" },
      { zh: "跨系統資訊需人工搬運與比對", en: "Cross-system information requires manual transfer and reconciliation" },
    ],
    aiOpportunities: [
      { zh: "業務週報、客戶紀錄自動整理", en: "Automated sales weekly reports and customer-record summarization" },
      { zh: "報價、成本與交期的智能建議", en: "AI recommendations for pricing, cost and lead time" },
      { zh: "設備異常紀錄語意檢索", en: "Semantic search over equipment issue history" },
    ],
    engineeringOpportunities: [
      { zh: "廠區網路、光纖、監控與門禁整合", en: "Plant network, fiber, surveillance and access-control integration" },
      { zh: "OT / IT 界面規劃與資料收集", en: "OT/IT interface planning and data collection" },
      { zh: "辦公室與生產基地的統一資訊環境", en: "Unified information environment across offices and production sites" },
    ],
    roadmap: [
      { phase: { zh: "階段一 · 流程盤點", en: "Phase 1 · Process Audit" }, detail: { zh: "選定關鍵流程（如業務、報價、出貨）進行梳理。", en: "Pick core workflows (sales, quotes, shipping) and map them end-to-end." } },
      { phase: { zh: "階段二 · 資料底盤", en: "Phase 2 · Data Foundation" }, detail: { zh: "建立基礎網路、資料收集與權限管理。", en: "Establish network, data-collection and access-control basics." } },
      { phase: { zh: "階段三 · AI 應用", en: "Phase 3 · AI Applications" }, detail: { zh: "從業務、報價、客服等資訊密集流程切入。", en: "Enter through information-heavy workflows such as sales, quoting and service." } },
      { phase: { zh: "階段四 · 全面整合", en: "Phase 4 · Full Integration" }, detail: { zh: "將 AI、應用與工程資料整合成營運儀表板。", en: "Consolidate AI, applications and engineering data into operations dashboards." } },
    ],
    relatedServices: [salesops, ai, engineering],
  },
  {
    slug: "commercial-buildings",
    name: { zh: "商業建築", en: "Commercial Buildings" },
    tagline: { zh: "為辦公大樓、商辦與園區提供整合式弱電與智慧建築服務。", en: "Integrated ELV and smart-building services for offices, commercial towers and campuses." },
    hero: { zh: "AEGIS 協助業主與物業以「一個負責的整合廠商」為單位管理弱電、監控、門禁、網路與建築管理系統。", en: "AEGIS lets owners and property managers work with a single accountable integrator for ELV, surveillance, access, networking and building-management systems." },
    challenges: [
      { zh: "多系統、多承包商協調困難", en: "Multi-system, multi-contractor coordination is difficult" },
      { zh: "承租戶變動頻繁，隔間與線路需彈性", en: "Frequent tenant changes require flexible partitions and cabling" },
      { zh: "能源與碳排放揭露壓力增加", en: "Growing pressure to disclose energy and carbon data" },
    ],
    painPoints: [
      { zh: "空間與線路資料未集中管理", en: "Space and cabling records are not centrally managed" },
      { zh: "門禁、監控、告警系統各自為政", en: "Access, CCTV and alarm systems operate in isolation" },
      { zh: "報修、工單、驗收缺乏數位化流程", en: "Maintenance, tickets and acceptance lack digital workflows" },
    ],
    aiOpportunities: [
      { zh: "報修工單自動分類與派工", en: "Auto ticket classification and dispatch for maintenance requests" },
      { zh: "能源使用異常偵測與節能建議", en: "Anomaly detection and energy-saving recommendations" },
      { zh: "訪客、承租戶服務的智能問答", en: "AI-assisted visitor and tenant service Q&A" },
    ],
    engineeringOpportunities: [
      { zh: "弱電、網路、光纖骨幹的整體規劃", en: "End-to-end planning for ELV, networking and fiber backbone" },
      { zh: "IP 監控、門禁與訪客管理整合", en: "IP CCTV, access control and visitor-management integration" },
      { zh: "與 BMS / iBMS 的資料界接", en: "Interfacing with BMS/iBMS platforms" },
    ],
    roadmap: [
      { phase: { zh: "階段一 · 現況盤點", en: "Phase 1 · As-Is Audit" }, detail: { zh: "盤點既有系統、線路與服務合約。", en: "Audit existing systems, cabling and service contracts." } },
      { phase: { zh: "階段二 · 弱電整合", en: "Phase 2 · ELV Consolidation" }, detail: { zh: "以單一整合商提供弱電、監控、門禁服務。", en: "Consolidate ELV, CCTV and access under one integrator." } },
      { phase: { zh: "階段三 · 智慧化", en: "Phase 3 · Smart Layer" }, detail: { zh: "加入 BMS 界接、報修工單與 AI 服務。", en: "Add BMS integration, maintenance tickets and AI services." } },
      { phase: { zh: "階段四 · ESG 揭露", en: "Phase 4 · ESG Reporting" }, detail: { zh: "串接能源與碳排資料為長期報表基礎。", en: "Wire energy and carbon data into long-term reporting." } },
    ],
    relatedServices: [engineering, ai],
  },
  {
    slug: "energy-esg",
    name: { zh: "能源與 ESG", en: "Energy & ESG" },
    tagline: { zh: "把太陽能、儲能與能源管理，變成可驗證、可揭露的資料。", en: "Turn solar, storage and energy management into verifiable, reportable data." },
    hero: { zh: "AEGIS 具備能源工程與 ESG 揭露的實務經驗，協助業主把發電、用電與儲能資訊，整合成符合法規與投資人期待的資料。", en: "AEGIS combines hands-on energy engineering with ESG-reporting experience — turning generation, consumption and storage data into information that meets regulatory and investor expectations." },
    challenges: [
      { zh: "太陽能、儲能、電力管理各自成孤島", en: "Solar, storage and power management remain siloed" },
      { zh: "ESG 揭露需要跨部門、跨系統的資料", en: "ESG disclosure needs cross-department, cross-system data" },
      { zh: "現場工程品質直接影響資料可信度", en: "Field-engineering quality directly affects data credibility" },
    ],
    painPoints: [
      { zh: "報表製作耗時，且難以稽核", en: "Reports are slow to build and hard to audit" },
      { zh: "設備維護紀錄與績效資料未串接", en: "Maintenance records and performance data are not linked" },
      { zh: "節能建議缺乏量化依據", en: "Energy-saving recommendations lack quantitative grounding" },
    ],
    aiOpportunities: [
      { zh: "用電、發電資料異常偵測", en: "Anomaly detection over consumption and generation data" },
      { zh: "ESG 報告書草稿與資料檢核", en: "Draft ESG reports with automated data checks" },
      { zh: "節能場景模擬與投資回收試算", en: "Simulation of energy-saving scenarios and payback analysis" },
    ],
    engineeringOpportunities: [
      { zh: "太陽能、儲能系統的工程整合支援", en: "Engineering integration support for solar and storage systems" },
      { zh: "廠區配電、用電計量與資料收集", en: "Plant power distribution, metering and data collection" },
      { zh: "監控與告警系統界接", en: "Integration with monitoring and alarm systems" },
    ],
    roadmap: [
      { phase: { zh: "階段一 · 資料盤點", en: "Phase 1 · Data Audit" }, detail: { zh: "盤點電力、能源與 ESG 相關資料來源。", en: "Audit power, energy and ESG-related data sources." } },
      { phase: { zh: "階段二 · 工程升級", en: "Phase 2 · Infrastructure" }, detail: { zh: "補齊計量與監控基礎工程。", en: "Fill gaps in metering and monitoring infrastructure." } },
      { phase: { zh: "階段三 · 報表自動化", en: "Phase 3 · Automated Reporting" }, detail: { zh: "建立可追溯的 ESG 與能源報表流程。", en: "Build auditable ESG and energy reporting workflows." } },
      { phase: { zh: "階段四 · 決策輔助", en: "Phase 4 · Decision Support" }, detail: { zh: "以 AI 支援節能、投資與碳資產決策。", en: "Use AI to support energy-saving, investment and carbon-asset decisions." } },
    ],
    relatedServices: [engineering, ai],
  },
  {
    slug: "sme-digital",
    name: { zh: "中小企業數位轉型", en: "SMEs Digital Transformation" },
    tagline: { zh: "以務實的節奏，協助中小企業建立長期可用的數位能力。", en: "A pragmatic pace of digital adoption that SMEs can actually sustain." },
    hero: { zh: "AEGIS 以顧問 + 工程的雙重能力，協助中小企業從報價、業務、客戶服務等關鍵流程開始，逐步建立自己的數位化架構。", en: "Combining advisory and engineering capabilities, AEGIS helps SMEs start with critical workflows — estimating, sales, customer service — and gradually build a digital stack they own." },
    challenges: [
      { zh: "資源有限，難以一次導入大型系統", en: "Limited resources make big-bang system rollouts risky" },
      { zh: "缺乏內部 IT 與流程規劃人力", en: "Little internal IT or process-design capacity" },
      { zh: "擔心投入後無法持續維運", en: "Concern that new tools cannot be maintained long-term" },
    ],
    painPoints: [
      { zh: "業務、客服、行政依賴個人 Excel 與 LINE", en: "Sales, service and admin rely on personal Excel files and chat apps" },
      { zh: "客戶與案件資料難以累積為公司資產", en: "Customer and project data rarely become company assets" },
      { zh: "AI 工具導入後沒人使用", en: "AI tools get introduced but nobody actually uses them" },
    ],
    aiOpportunities: [
      { zh: "報價、合約、常見信件的 AI 草稿", en: "AI-drafted quotes, contracts and common emails" },
      { zh: "客服與 FAQ 智能問答", en: "AI-assisted customer service and FAQ Q&A" },
      { zh: "業務週報、CRM 紀錄自動整理", en: "Auto-summarized weekly sales reports and CRM notes" },
    ],
    engineeringOpportunities: [
      { zh: "辦公室網路與資訊環境整體規劃", en: "Overall planning for office network and IT environment" },
      { zh: "資料備份、權限與安全基礎建置", en: "Backup, access-control and security foundations" },
      { zh: "與現有 ERP / 會計系統的資料界接", en: "Data interfacing with existing ERP/accounting systems" },
    ],
    roadmap: [
      { phase: { zh: "階段一 · 現況訪談", en: "Phase 1 · Discovery" }, detail: { zh: "了解營運痛點與現有工具，制定合理節奏。", en: "Map operational pain points and current tools; set a realistic pace." } },
      { phase: { zh: "階段二 · 核心流程", en: "Phase 2 · Core Workflows" }, detail: { zh: "先數位化 1–2 個核心流程，累積可用資料。", en: "Digitize 1–2 core workflows first to accumulate usable data." } },
      { phase: { zh: "階段三 · AI 導入", en: "Phase 3 · AI Introduction" }, detail: { zh: "以 Aegis AI Launch 導入 AI 應用與教育訓練。", en: "Introduce AI applications and training with Aegis AI Launch." } },
      { phase: { zh: "階段四 · 內部能力", en: "Phase 4 · In-House Capability" }, detail: { zh: "培養內部負責人，形成可持續的數位化能力。", en: "Grow an in-house owner to sustain the digital capability long-term." } },
    ],
    relatedServices: [aiLaunch, salesops, costflow],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}

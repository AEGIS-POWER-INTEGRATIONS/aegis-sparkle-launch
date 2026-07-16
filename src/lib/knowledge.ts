/**
 * Knowledge Center — content architecture.
 *
 * This file defines the entire information structure for the Knowledge Center:
 * categories, article metadata, tag taxonomy, and lookup helpers.
 *
 * Article BODIES are intentionally NOT stored here — the article template
 * renders a "coming soon" placeholder when `body` is undefined. New articles
 * can later be added by appending to `ARTICLES` (or migrating to MDX / CMS)
 * without touching route files.
 */

export type Bi = { zh: string; en: string };

export type KnowledgeCategory = {
  slug: string;
  name: Bi;
  tagline: Bi;
  description: Bi;
  /** Route path if the category is served by another system (Category 6). */
  externalPath?: string;
};

export type KnowledgeTag =
  | "ai"
  | "engineering"
  | "manufacturing"
  | "data-center"
  | "workflow"
  | "digital-transformation"
  | "semiconductor"
  | "epc"
  | "commercial"
  | "energy"
  | "sme";

export const TAG_LABEL: Record<KnowledgeTag, Bi> = {
  ai: { zh: "AI", en: "AI" },
  engineering: { zh: "工程", en: "Engineering" },
  manufacturing: { zh: "製造業", en: "Manufacturing" },
  "data-center": { zh: "資料中心", en: "Data Center" },
  workflow: { zh: "流程自動化", en: "Workflow" },
  "digital-transformation": { zh: "數位轉型", en: "Digital Transformation" },
  semiconductor: { zh: "半導體", en: "Semiconductor" },
  epc: { zh: "EPC", en: "EPC" },
  commercial: { zh: "商業建築", en: "Commercial Buildings" },
  energy: { zh: "能源", en: "Energy" },
  sme: { zh: "中小企業", en: "SME" },
};

export type Author = {
  name: Bi;
  role: Bi;
};

export const DEFAULT_AUTHOR: Author = {
  name: { zh: "AEGIS 編輯團隊", en: "AEGIS Editorial Team" },
  role: { zh: "工程整合與 AI 顧問群", en: "Engineering & AI Advisory" },
};

export type FaqItem = { q: Bi; a: Bi };
export type TocEntry = { id: string; title: Bi };

export type KnowledgeArticle = {
  slug: string;
  category: string; // KnowledgeCategory.slug
  title: Bi;
  excerpt: Bi;
  tags: KnowledgeTag[];
  /** ISO date. */
  publishedAt: string;
  /** Reading time in minutes. */
  readingMinutes: number;
  author?: Author;
  /** Placeholder path for hero image; use a public URL when supplied. */
  heroImage?: string;
  /** Table of contents; template renders it when article body is filled in. */
  toc?: TocEntry[];
  /** Frequently-asked questions; renders JSON-LD when present. */
  faq?: FaqItem[];
  /** Related service links; falls back to a default set per-category. */
  relatedServices?: { label: Bi; to: string }[];
  /** Rendered HTML or markdown body — when omitted, template shows placeholder. */
  body?: Bi;
};

export const CATEGORIES: KnowledgeCategory[] = [
  {
    slug: "ai-integration",
    name: { zh: "AI 導入", en: "AI Integration" },
    tagline: {
      zh: "從流程盤點到落地部署的企業 AI 導入知識庫。",
      en: "Enterprise AI adoption — from process discovery to production rollout.",
    },
    description: {
      zh: "涵蓋 AI 導入策略、流程盤點方法、資料治理、AI 代理人與工作流程自動化的實務指南。",
      en: "Strategy, process discovery, data governance, AI agents and workflow automation, grounded in real integration practice.",
    },
  },
  {
    slug: "engineering-management",
    name: { zh: "工程管理", en: "Engineering Management" },
    tagline: {
      zh: "工程專案交付、風險控管與跨團隊協作的方法論。",
      en: "Delivery, risk management and cross-team coordination for engineering projects.",
    },
    description: {
      zh: "涵蓋範圍界定、排程、風險、驗收管理與品質治理，聚焦系統整合與跨專業協調實務。",
      en: "Scope, schedule, risk, acceptance and quality governance across system integration and multi-discipline delivery.",
    },
  },
  {
    slug: "manufacturing-transformation",
    name: { zh: "製造業數位轉型", en: "Manufacturing Digital Transformation" },
    tagline: {
      zh: "IT/OT 整合、報價成本管理與 AI 週報的實務框架。",
      en: "IT/OT integration, cost management and AI reporting frameworks for manufacturers.",
    },
    description: {
      zh: "從產線資料採集、成本與報價管理到業務 AI 週報，說明可落地的數位轉型路線圖。",
      en: "From shopfloor data capture to costing and sales AI reporting — a practical digital transformation roadmap.",
    },
  },
  {
    slug: "data-center-engineering",
    name: { zh: "資料中心工程", en: "Data Center Engineering" },
    tagline: {
      zh: "資料中心基礎設施、佈線、機櫃與運維整合。",
      en: "Data center infrastructure, cabling, racks and operations integration.",
    },
    description: {
      zh: "涵蓋結構化佈線、機櫃供電、光纖骨幹、機電協調與運維系統整合的深度知識。",
      en: "Structured cabling, rack power, fiber backbone, MEP coordination and operations system integration.",
    },
  },
  {
    slug: "success-stories",
    name: { zh: "成功案例", en: "Success Stories" },
    tagline: {
      zh: "以匿名情境呈現的專案類型、挑戰與解決方案。",
      en: "Anonymized project scenarios — challenge, solution, outcome.",
    },
    description: {
      zh: "以產業別歸類的匿名情境案例，涵蓋挑戰、解法、導入方式、成果與相關服務。",
      en: "Anonymized industry scenarios organised by challenge and solution — no customer names or logos.",
    },
  },
  {
    slug: "industry-solutions",
    name: { zh: "產業解決方案", en: "Industry Solutions" },
    tagline: {
      zh: "為主要產業設計的整合方案與導入路線。",
      en: "Integration playbooks and adoption roadmaps for target industries.",
    },
    description: {
      zh: "各產業的挑戰、AI 與工程機會、推薦導入路線圖，連結至獨立產業頁面。",
      en: "Per-industry challenges, AI and engineering opportunities, and recommended roadmaps — linked to dedicated industry pages.",
    },
    // Category 6 aggregates the existing /industries/* pages.
    externalPath: "/industries",
  },
];

const svc = {
  eng: { label: { zh: "工程整合服務", en: "Engineering Integration" }, to: "/engineering" },
  ai: { label: { zh: "AI 系統整合", en: "AI System Integration" }, to: "/ai-integration" },
  costflow: { label: { zh: "Aegis CostFlow", en: "Aegis CostFlow" }, to: "/costflow" },
  salesops: { label: { zh: "Aegis SalesOps", en: "Aegis SalesOps" }, to: "/salesops" },
  aiLaunch: { label: { zh: "Aegis AI Launch", en: "Aegis AI Launch" }, to: "/ai-launch" },
  industries: { label: { zh: "產業解決方案", en: "Industry Solutions" }, to: "/industries" },
} as const;

export const DEFAULT_RELATED_SERVICES_BY_CATEGORY: Record<string, { label: Bi; to: string }[]> = {
  "ai-integration": [svc.ai, svc.aiLaunch, svc.salesops],
  "engineering-management": [svc.eng, svc.industries],
  "manufacturing-transformation": [svc.costflow, svc.salesops, svc.ai],
  "data-center-engineering": [svc.eng, svc.industries],
  "success-stories": [svc.eng, svc.ai, svc.industries],
  "industry-solutions": [svc.industries, svc.eng, svc.ai],
};

/**
 * Generate 10 article placeholders per content-category (5 × 10 = 50).
 * Titles are meaningful stubs so listing pages read well before bodies land.
 */
function stub(
  slug: string,
  category: string,
  zhTitle: string,
  enTitle: string,
  tags: KnowledgeTag[],
  minutes = 6,
): KnowledgeArticle {
  return {
    slug,
    category,
    title: { zh: zhTitle, en: enTitle },
    excerpt: {
      zh: "本篇文章正在準備中。上線後將完整涵蓋方法、步驟、常見陷阱與可落地的範例。",
      en: "This article is in preparation. The final version will cover methodology, steps, common pitfalls and actionable examples.",
    },
    tags,
    publishedAt: "2026-01-01",
    readingMinutes: minutes,
  };
}

export const ARTICLES: KnowledgeArticle[] = [
  // ── AI Integration ───────────────────────────────────────────────
  stub("ai-adoption-framework", "ai-integration", "企業 AI 導入的七步框架", "A Seven-Step Framework for Enterprise AI Adoption", ["ai", "digital-transformation"], 8),
  stub("process-discovery-playbook", "ai-integration", "AI 導入前的流程盤點方法", "Process Discovery Before AI Adoption", ["ai", "workflow"], 7),
  stub("data-governance-basics", "ai-integration", "AI 導入所需的資料治理基礎", "Data Governance Foundations for AI Adoption", ["ai", "digital-transformation"]),
  stub("ai-agent-patterns", "ai-integration", "企業級 AI 代理人的常見設計模式", "Design Patterns for Enterprise AI Agents", ["ai", "workflow"], 9),
  stub("rag-vs-fine-tuning", "ai-integration", "RAG 與微調：如何為企業選擇合適的策略", "RAG vs Fine-Tuning: Choosing the Right Enterprise Approach", ["ai"], 8),
  stub("ai-workflow-automation", "ai-integration", "以 AI 重新設計跨系統工作流程", "Redesigning Cross-System Workflows with AI", ["ai", "workflow"]),
  stub("ai-security-checklist", "ai-integration", "企業 AI 導入的資安與權限清單", "Security & Access Checklist for Enterprise AI", ["ai"], 7),
  stub("measuring-ai-roi", "ai-integration", "衡量 AI 導入 ROI 的實務方法", "A Practical Approach to Measuring AI ROI", ["ai", "digital-transformation"]),
  stub("ai-change-management", "ai-integration", "AI 導入過程中的組織變革管理", "Change Management for AI Rollouts", ["ai", "digital-transformation"], 7),
  stub("ai-vendor-selection", "ai-integration", "選擇 AI 服務與模型供應商的評估要點", "Evaluating AI Platform and Model Vendors", ["ai"], 6),

  // ── Engineering Management ───────────────────────────────────────
  stub("scope-management", "engineering-management", "工程專案範圍管理實務", "Practical Scope Management for Engineering Projects", ["engineering"], 7),
  stub("risk-management-framework", "engineering-management", "工程風險辨識與控管框架", "A Framework for Engineering Risk Identification and Control", ["engineering"], 8),
  stub("acceptance-testing", "engineering-management", "系統整合驗收測試的設計原則", "Designing Acceptance Tests for System Integration", ["engineering"]),
  stub("multi-disciplinary-coordination", "engineering-management", "多專業工程協同的實務要點", "Coordinating Multi-Disciplinary Engineering Teams", ["engineering"], 7),
  stub("daily-reporting", "engineering-management", "工程專案每日回報制度的建立", "Establishing Daily Reporting for Engineering Projects", ["engineering", "workflow"]),
  stub("change-order-management", "engineering-management", "工程變更單管理與影響評估", "Change Order Management and Impact Assessment", ["engineering"]),
  stub("subcontractor-coordination", "engineering-management", "外包與分包廠商的協同管理", "Managing Subcontractors and External Vendors", ["engineering"], 6),
  stub("commissioning-checklist", "engineering-management", "系統整合交機驗收檢查清單", "System Integration Commissioning Checklist", ["engineering"]),
  stub("quality-governance", "engineering-management", "工程品質治理與稽核機制", "Quality Governance and Audit Mechanisms", ["engineering"], 7),
  stub("post-handover-support", "engineering-management", "交機後維運與支援機制設計", "Designing Post-Handover Operations and Support", ["engineering"]),

  // ── Manufacturing Digital Transformation ─────────────────────────
  stub("it-ot-integration", "manufacturing-transformation", "製造業 IT/OT 整合的實務路線", "A Practical IT/OT Integration Roadmap for Manufacturers", ["manufacturing", "digital-transformation"], 9),
  stub("cost-management-transformation", "manufacturing-transformation", "從 Excel 走向現代化的成本管理", "From Excel to Modern Cost Management", ["manufacturing"], 7),
  stub("quotation-workflow", "manufacturing-transformation", "工程與製造業報價流程的數位化", "Digitalising Quotation Workflows for Engineering and Manufacturing", ["manufacturing", "workflow"]),
  stub("sales-ai-weekly-reports", "manufacturing-transformation", "以 AI 週報改善業務可視化", "Improving Sales Visibility with AI Weekly Reports", ["manufacturing", "ai"]),
  stub("shopfloor-data-collection", "manufacturing-transformation", "現場資料採集與可視化的設計", "Designing Shopfloor Data Capture and Visualisation", ["manufacturing"]),
  stub("bom-and-material-management", "manufacturing-transformation", "BOM 與物料管理的數位化重點", "Digitalising BOM and Material Management", ["manufacturing"], 7),
  stub("kpi-dashboard-design", "manufacturing-transformation", "製造業經營 KPI 儀表板設計原則", "Designing Operational KPI Dashboards for Manufacturers", ["manufacturing", "workflow"]),
  stub("predictive-maintenance", "manufacturing-transformation", "從資料到預測性維護的導入路線", "From Data to Predictive Maintenance", ["manufacturing", "ai"]),
  stub("supply-chain-visibility", "manufacturing-transformation", "供應鏈可視化與資訊整合", "Supply Chain Visibility and Information Integration", ["manufacturing"]),
  stub("erp-migration-strategy", "manufacturing-transformation", "從舊有 ERP 遷移的策略與陷阱", "Strategies and Pitfalls for Migrating Legacy ERP", ["manufacturing", "digital-transformation"], 8),

  // ── Data Center Engineering ──────────────────────────────────────
  stub("structured-cabling-design", "data-center-engineering", "資料中心結構化佈線設計原則", "Structured Cabling Design Principles for Data Centers", ["data-center", "engineering"]),
  stub("rack-power-distribution", "data-center-engineering", "機櫃供電與電力品質整合", "Rack Power Distribution and Power Quality Integration", ["data-center", "engineering"], 8),
  stub("fiber-backbone-planning", "data-center-engineering", "資料中心光纖骨幹規劃", "Planning Data Center Fiber Backbones", ["data-center", "engineering"]),
  stub("mep-coordination", "data-center-engineering", "資料中心機電協調實務", "MEP Coordination Practices for Data Centers", ["data-center", "engineering"]),
  stub("cooling-and-airflow", "data-center-engineering", "冷通道與氣流管理的整合要點", "Cold Aisle and Airflow Management Integration", ["data-center"]),
  stub("cabling-lifecycle", "data-center-engineering", "資料中心佈線退役與遷移", "Data Center Cabling Decommission and Migration", ["data-center", "engineering"]),
  stub("monitoring-and-dcim", "data-center-engineering", "監控與 DCIM 系統整合的重點", "Monitoring and DCIM System Integration", ["data-center", "workflow"]),
  stub("physical-security", "data-center-engineering", "資料中心實體安全與門禁整合", "Physical Security and Access Control Integration", ["data-center", "engineering"]),
  stub("high-availability-design", "data-center-engineering", "資料中心高可用性設計實務", "High-Availability Design in Practice", ["data-center", "engineering"], 9),
  stub("commissioning-and-handover", "data-center-engineering", "資料中心驗收交機流程", "Data Center Commissioning and Handover", ["data-center", "engineering"]),

  // ── Success Stories (anonymized) ─────────────────────────────────
  stub("scenario-semiconductor-supplier-quote", "success-stories", "情境：半導體供應鏈報價比對", "Scenario: Semiconductor Supply Chain Quote Comparison", ["semiconductor", "ai", "workflow"]),
  stub("scenario-data-center-ticket-automation", "success-stories", "情境：資料中心工單流程自動化", "Scenario: Data Center Ticket Workflow Automation", ["data-center", "ai", "workflow"]),
  stub("scenario-epc-cost-transparency", "success-stories", "情境：EPC 專案成本透明化", "Scenario: Cost Transparency for an EPC Project", ["epc", "engineering"]),
  stub("scenario-manufacturing-weekly-report", "success-stories", "情境：製造業業務 AI 週報導入", "Scenario: Adopting AI Weekly Reports in Manufacturing", ["manufacturing", "ai"]),
  stub("scenario-sme-ai-adoption", "success-stories", "情境：中小企業 AI 導入起步", "Scenario: A Small Business Starting AI Adoption", ["sme", "ai"]),
  stub("scenario-energy-monitoring", "success-stories", "情境：能源監測平台的整合", "Scenario: Integrating an Energy Monitoring Platform", ["energy", "engineering"]),
  stub("scenario-commercial-building-elv", "success-stories", "情境：商業建築弱電系統整合", "Scenario: ELV Integration for a Commercial Building", ["commercial", "engineering"]),
  stub("scenario-fiber-installation", "success-stories", "情境：跨建物光纖佈設專案", "Scenario: Multi-Building Fiber Installation", ["engineering", "data-center"]),
  stub("scenario-workflow-migration", "success-stories", "情境：跨系統工作流程重構", "Scenario: Rebuilding a Cross-System Workflow", ["workflow", "ai"]),
  stub("scenario-esg-reporting", "success-stories", "情境：ESG 資料整合與報告自動化", "Scenario: ESG Data Integration and Reporting Automation", ["energy", "workflow"]),
];

// ── Lookups ────────────────────────────────────────────────────────

export function getCategory(slug: string): KnowledgeCategory | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getArticle(categorySlug: string, articleSlug: string): KnowledgeArticle | undefined {
  return ARTICLES.find((a) => a.category === categorySlug && a.slug === articleSlug);
}

export function getArticlesByCategory(categorySlug: string): KnowledgeArticle[] {
  return ARTICLES.filter((a) => a.category === categorySlug);
}

export function getRelatedArticles(article: KnowledgeArticle, limit = 4): KnowledgeArticle[] {
  const tagSet = new Set(article.tags);
  const scored = ARTICLES
    .filter((a) => a.slug !== article.slug)
    .map((a) => {
      const shared = a.tags.filter((t) => tagSet.has(t)).length;
      const sameCat = a.category === article.category ? 1 : 0;
      return { a, score: shared * 2 + sameCat };
    })
    .sort((x, y) => y.score - x.score);
  return scored.slice(0, limit).map((x) => x.a);
}

export function getAllTags(): KnowledgeTag[] {
  const set = new Set<KnowledgeTag>();
  ARTICLES.forEach((a) => a.tags.forEach((t) => set.add(t)));
  return Array.from(set);
}

export function articlePath(a: Pick<KnowledgeArticle, "category" | "slug">): string {
  return `/knowledge/${a.category}/${a.slug}`;
}

export function categoryPath(c: KnowledgeCategory): string {
  return c.externalPath ?? `/knowledge/${c.slug}`;
}

/**
 * Single source of truth for company-wide information and navigation.
 * Update values here and they propagate site-wide.
 */

export const SITE = {
  brand: "AEGIS POWER INTEGRATIONS",
  legalName: {
    zh: "宏鼎集成股份有限公司",
    en: "Aegis Power Integrations Co., Ltd.",
  },
  brandName: {
    zh: "宏鼎集成",
    en: "AEGIS POWER INTEGRATIONS",
  },
  domain: "https://aegispowerapi.com",
  address: {
    zh: "台中市西區台灣大道二段2號20樓",
    en: "20F., No. 2, Sec. 2, Taiwan Blvd., West Dist., Taichung City, Taiwan",
  },
  phone: "+886-955-104351",
  phoneDisplay: "+886 955 104 351",
  responsiblePerson: {
    zh: "田家駿",
    en: "Johnny Tian",
  },
  taxId: "",
  emails: {
    general: "jtian@aegispowerapi.com",
    sales: "sales@aegispowerapi.com",
  },
  replyWindow: {
    zh: "原則上將於 1–2 個工作日內回覆。",
    en: "We aim to reply within 1–2 business days.",
  },
  copyrightYear: 2026,
  positioning: {
    zh: "以工程實務為核心，整合企業流程、AI 應用與產業資源，協助企業穩健完成營運升級。",
    en: "Engineering-led industry integration: process, AI adoption and long-term partnership that helps enterprises deliver operational upgrades that stick.",
  },
  narrative: {
    zh: "宏鼎集成是一家以工程實務為基礎的產業整合服務公司，結合工程執行、企業流程顧問、AI 工具整合與導入陪跑，協助企業從現場問題出發，逐步建立更有效率、更透明、更具決策能力的營運方式。",
    en: "AEGIS POWER INTEGRATIONS is an engineering-led industry integration firm. We combine field execution, enterprise process consulting, AI tooling integration and long-term adoption support to help companies build more efficient, transparent and decision-ready operations.",
  },
} as const;

type ProfileBi = { zh: string; en: string };

/**
 * Formal company profile fields. Values marked `null` render as
 * "資料待公司確認" — never invent them client-side.
 */
export const COMPANY_PROFILE: {
  legalNameZh: string;
  legalNameEn: string;
  taxId: string | null;
  founded: string | null;
  responsiblePerson: ProfileBi;
  address: ProfileBi;
  phone: string;
  emails: { general: string; sales: string };
  website: string;
  serviceArea: ProfileBi;
  services: ProfileBi[];
  insurance: ProfileBi[] | null;
  certifications: ProfileBi[] | null;
  partnerships: ProfileBi[] | null;
} = {
  legalNameZh: "宏鼎集成股份有限公司",
  legalNameEn: "Aegis Power Integrations Co., Ltd.",
  taxId: null,
  founded: null,
  responsiblePerson: { zh: "田家駿", en: "Johnny Tian" },
  address: {
    zh: "台中市西區台灣大道二段2號20樓",
    en: "20F., No. 2, Sec. 2, Taiwan Blvd., West Dist., Taichung City, Taiwan",
  },
  phone: "+886-955-104351",
  emails: {
    general: "jtian@aegispowerapi.com",
    sales: "sales@aegispowerapi.com",
  },
  website: "https://aegispowerapi.com",
  serviceArea: {
    zh: "台灣全境（以北中南三大都會為主），並支援跨區域專案與海外供應鏈整合。",
    en: "Nationwide Taiwan (primarily Taipei, Taichung, Kaohsiung metros); cross-region and overseas supply-chain projects on request.",
  },
  services: [
    { zh: "工程整合服務（資料中心、弱電、光纖、機電）", en: "Engineering integration (data center, ELV, fiber, MEP)" },
    { zh: "工程專案管理與現場協調", en: "Engineering project management & site coordination" },
    { zh: "企業 AI 顧問與流程健檢", en: "Enterprise AI advisory & process diagnostic" },
    { zh: "AI 工具選型、PoC 導入與陪跑", en: "AI tool selection, PoC and adoption coaching" },
    { zh: "企業內訓與 AI 教育訓練", en: "Enterprise training & AI workshops" },
    { zh: "政府補助計畫輔導", en: "Government grant program advisory" },
  ],
  insurance: null,
  certifications: null,
  partnerships: null,
};

/**
 * Approved anonymized project descriptors for public-facing pages.
 * Do NOT display customer logos or customer names unless separately approved.
 */
export const APPROVED_PROJECTS: { zh: string; en: string }[] = [
  { zh: "國際級資料中心工程專案", en: "International data center engineering project" },
  { zh: "大型科技廠供應鏈專案", en: "Large-scale technology facility supply-chain project" },
  { zh: "光纖佈設與汰換工程專案", en: "Fiber installation and decommission project" },
  { zh: "弱電與結構化佈線整合專案", en: "Low-voltage and structured cabling integration project" },
  { zh: "儲能與機電整合工程專案", en: "Energy storage and electromechanical integration project" },
  { zh: "製造流程與成本管理改善專案", en: "Manufacturing workflow and cost-management improvement project" },
  { zh: "企業 AI 工作流程整合專案", en: "Enterprise AI workflow integration project" },
];

export const SITE_URL = SITE.domain;

/* ------------------------------------------------------------------------- */
/* Navigation                                                                */
/* ------------------------------------------------------------------------- */

export type NavChild = { to: string; zh: string; en: string };
export type NavItem = {
  to: string;
  zh: string;
  en: string;
  children?: NavChild[];
};

/**
 * Primary navigation. Six top-level items; children render as a dropdown on
 * desktop and as an accordion on mobile. `to` on a parent is the section hub
 * users land on when they click the parent label itself.
 */
export const PRIMARY_NAV: NavItem[] = [
  {
    to: "/engineering",
    zh: "工程服務",
    en: "Engineering",
    children: [
      { to: "/engineering", zh: "工程整合服務", en: "Engineering Integration" },
      { to: "/engineering#datacenter", zh: "資料中心與科技廠工程", en: "Data Center & Fab Engineering" },
      { to: "/engineering#lv", zh: "弱電與網路基礎建設", en: "Low-Voltage & Network Infrastructure" },
      { to: "/engineering#mep", zh: "機電與設備整合", en: "Electromechanical & Equipment Integration" },
      { to: "/engineering#pm", zh: "工程專案管理", en: "Engineering Project Management" },
    ],
  },
  {
    to: "/ai-integration",
    zh: "企業 AI 顧問",
    en: "AI Advisory",
    children: [
      { to: "/ai-integration", zh: "企業 AI 顧問與導入", en: "AI Advisory & Adoption" },
      { to: "/ai-integration#health", zh: "AI 導入健檢", en: "AI Readiness Diagnostic" },
      { to: "/ai-integration#blueprint", zh: "流程診斷與導入藍圖", en: "Process Diagnosis & Blueprint" },
      { to: "/ai-integration#tools", zh: "AI 工具整合", en: "AI Tool Integration" },
      { to: "/ai-integration#training", zh: "企業內訓與工作坊", en: "Enterprise Training & Workshops" },
      { to: "/ai-integration#poc", zh: "AI PoC 與導入陪跑", en: "AI PoC & Adoption Partnership" },
      { to: "/ai-integration#grants", zh: "政府補助與計畫輔導", en: "Government Grant Advisory" },
    ],
  },
  {
    to: "/industries",
    zh: "產業方案",
    en: "Industries",
    children: [
      { to: "/industries", zh: "產業方案總覽", en: "All Industries" },
      { to: "/industries/manufacturing", zh: "製造業", en: "Manufacturing" },
      { to: "/industries/project-based", zh: "工程與專案型企業", en: "Engineering & Project-Based" },
      { to: "/industries/sme", zh: "中小企業", en: "SMEs" },
      { to: "/industries/energy-esg", zh: "環保與能源", en: "Energy & ESG" },
      { to: "/industries/data-center", zh: "資料中心與科技產業", en: "Data Center & Tech" },
    ],
  },
  {
    to: "/insights",
    zh: "案例與知識",
    en: "Insights & Knowledge",
    children: [
      { to: "/insights", zh: "應用情境與導入觀點", en: "Insights & Scenarios" },
      { to: "/knowledge", zh: "知識中心", en: "Knowledge Center" },
      { to: "/knowledge/ai-tips", zh: "AI 使用技巧", en: "AI Tips" },
      { to: "/knowledge/prompts", zh: "企業管理提示詞", en: "Enterprise Prompts" },
    ],
  },
  { to: "/about", zh: "關於宏鼎", en: "About" },
  { to: "/contact", zh: "聯絡我們", en: "Contact" },
];

/** Primary top-right CTA — shown on desktop header. */
export const PRIMARY_CTA = {
  to: "/contact",
  zh: "預約需求諮詢",
  en: "Book Consultation",
} as const;

/** Standardized inquiry types used by the contact form + CTAs. */
export const INQUIRY_TYPES = {
  engineering: { zh: "工程合作", en: "Engineering partnership" },
  dataCenter: { zh: "資料中心／光纖／弱電", en: "Data center / fiber / ELV" },
  aiHealth: { zh: "AI 流程健檢", en: "AI process diagnostic" },
  training: { zh: "企業教育訓練", en: "Enterprise training" },
  poc: { zh: "PoC 導入評估", en: "PoC assessment" },
  aiMonthly: { zh: "月度顧問", en: "Monthly advisory" },
  grant: { zh: "政府補助輔導", en: "Government grant advisory" },
  partnership: { zh: "合作夥伴洽詢", en: "Partner inquiry" },
  other: { zh: "其他", en: "Other" },
} as const;

export type InquiryType = keyof typeof INQUIRY_TYPES;

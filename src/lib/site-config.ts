/**
 * Single source of truth for company-wide information.
 * Update values here and they propagate site-wide.
 *
 * Awaiting from company owner:
 *  - 統一編號 (Tax ID / VAT number) — currently placeholder
 *  - Confirmation that mailboxes johnny@ and sales@ are live for inbound mail
 */

export const SITE = {
  brand: "AEGIS POWER INTEGRATIONS",
  legalName: {
    zh: "宏鼎集成股份有限公司",
    en: "Aegis Power Integrations Co., Ltd.",
  },
  domain: "https://aegispowerapi.com",
  address: {
    zh: "台中市西區台灣大道二段2號20樓",
    en: "20F., No. 2, Sec. 2, Taiwan Blvd., West Dist., Taichung City, Taiwan",
  },
  // Verified by company owner.
  phone: "+886-955-104351",
  phoneDisplay: "+886 955 104 351",
  responsiblePerson: {
    zh: "田家駿",
    en: "Johnny Tian",
  },
  // TODO: replace once company provides official Tax ID.
  taxId: "",
  emails: {
    general: "johnny@aegispowerapi.com",
    sales: "sales@aegispowerapi.com",
  },
  replyWindow: {
    zh: "原則上將於 1–2 個工作日內回覆。",
    en: "We aim to reply within 1–2 business days.",
  },
  copyrightYear: 2026,
} as const;

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


/**
 * Single source of truth for company-wide information.
 * Update values here and they propagate site-wide.
 *
 * Awaiting from company owner:
 *  - verified phone number
 *  - 統一編號 (VAT number) and 負責人 for statutory pages
 *  - confirmation that mailboxes are live for inbound mail
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
    en: "20F, No. 2, Sec. 2, Taiwan Blvd., West Dist., Taichung, Taiwan",
  },
  // TODO: replace with verified phone number once confirmed by company.
  phone: "",
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

export const SITE_URL = SITE.domain;

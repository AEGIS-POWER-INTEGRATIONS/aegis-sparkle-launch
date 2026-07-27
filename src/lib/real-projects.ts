/**
 * Real project experience — kept separate from `insights.ts` scenario examples.
 *
 * Every entry MUST declare `ownership`:
 *   - "aegis"      → project directly undertaken by 宏鼎集成股份有限公司
 *   - "core-team"  → core team member's prior participation, NOT contracted by AEGIS
 *
 * Entries without complete, publicly-releasable information stay `draft: true`
 * and are hidden from the site. Never fabricate customer names, logos, or
 * on-site photography.
 */

export type Bi = { zh: string; en: string };

export type ProjectOwnership = "aegis" | "core-team";

export const OWNERSHIP_BADGE: Record<ProjectOwnership, Bi> = {
  aegis: { zh: "宏鼎集成專案", en: "AEGIS project" },
  "core-team": {
    zh: "核心團隊過往參與經驗",
    en: "Core team prior experience",
  },
};

export const OWNERSHIP_DISCLOSURE: Record<ProjectOwnership, Bi> = {
  aegis: {
    zh: "本專案由宏鼎集成股份有限公司承攬並執行。",
    en: "Directly undertaken and executed by Aegis Power Integrations Co., Ltd.",
  },
  "core-team": {
    zh: "本內容為核心團隊成員過往參與經驗，不代表該專案由宏鼎集成股份有限公司直接承攬。",
    en: "This describes prior experience of core team members and does NOT represent a project contracted by Aegis Power Integrations Co., Ltd.",
  },
};

export type RealProject = {
  slug: string;
  draft: boolean;
  ownership: ProjectOwnership;
  industry: Bi;
  background: Bi;
  scope: Bi;
  role: Bi;
  period: Bi;
  work: Bi[];
  deliverables: Bi[];
  photos: { src: string; alt: Bi }[];
  confidentiality: Bi;
};

/**
 * NOTE (Phase 3): the two entries below are TEMPLATES kept as drafts so the
 * UI/data shape is exercised but nothing publishes without AEGIS-approved copy
 * and imagery. Do NOT flip `draft: false` here without company confirmation.
 */
export const REAL_PROJECTS: RealProject[] = [
  {
    slug: "template-datacenter-fiber",
    draft: true,
    ownership: "core-team",
    industry: { zh: "資料中心 · 光纖佈設", en: "Data center · Fiber deployment" },
    background: {
      zh: "資料中心擴建案，需在既有機房環境下完成光纖與弱電佈設。",
      en: "Data-center expansion requiring fiber and ELV work inside a live facility.",
    },
    scope: {
      zh: "光纖主幹、機櫃跳接、弱電走線、驗收測試。",
      en: "Fiber backbone, rack patching, ELV cabling, acceptance testing.",
    },
    role: {
      zh: "核心團隊成員擔任現場工程執行與驗收協調角色。",
      en: "Core team member acted as on-site engineering execution and acceptance coordinator.",
    },
    period: { zh: "資料待公司確認", en: "Pending company confirmation" },
    work: [
      { zh: "資料待公司確認之工項清單。", en: "Task list pending company confirmation." },
    ],
    deliverables: [
      { zh: "資料待公司確認之交付內容。", en: "Deliverables pending company confirmation." },
    ],
    photos: [],
    confidentiality: {
      zh: "客戶名稱依保密協議不公開。",
      en: "Client identity withheld under NDA.",
    },
  },
  {
    slug: "template-manufacturing-quote-workflow",
    draft: true,
    ownership: "core-team",
    industry: { zh: "製造業 · 報價流程改善", en: "Manufacturing · Quote workflow" },
    background: {
      zh: "製造業客戶需要縮短報價週期與統一報價依據。",
      en: "Manufacturing client sought a shorter quote cycle and unified estimating basis.",
    },
    scope: {
      zh: "流程訪談、報價結構標準化、Excel 與內部系統整合建議。",
      en: "Process interviews, estimating structure standardization, Excel + internal system integration recommendations.",
    },
    role: {
      zh: "核心團隊成員擔任流程顧問與導入輔導。",
      en: "Core team member acted as process advisor and adoption coach.",
    },
    period: { zh: "資料待公司確認", en: "Pending company confirmation" },
    work: [
      { zh: "資料待公司確認之工項清單。", en: "Task list pending company confirmation." },
    ],
    deliverables: [
      { zh: "資料待公司確認之交付內容。", en: "Deliverables pending company confirmation." },
    ],
    photos: [],
    confidentiality: {
      zh: "客戶名稱依保密協議不公開。",
      en: "Client identity withheld under NDA.",
    },
  },
];

export const PUBLISHED_REAL_PROJECTS = REAL_PROJECTS.filter((p) => !p.draft);

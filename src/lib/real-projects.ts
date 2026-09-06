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
  period?: Bi;
  work: Bi[];
  deliverables: Bi[];
  photos: { src: string; alt: Bi }[];
  confidentiality: Bi;
};

/**
 * The first two entries are company-approved anonymized team experience.
 * Entries kept as `draft: true` are UI templates and never render publicly.
 * Do NOT flip `draft: false` without company confirmation, and never add
 * customer names, logos or on-site photography without written approval.
 */
export const REAL_PROJECTS: RealProject[] = [
  {
    slug: "chiayi-advanced-packaging-outdoor-piping",
    draft: false,
    ownership: "core-team",
    industry: { zh: "先進封裝廠 · 外管線工程", en: "Advanced packaging facility · Outdoor piping" },
    background: {
      zh: "嘉義先進封裝廠新建期間的廠外管線工程。",
      en: "Outdoor piping works during construction of an advanced packaging facility in Chiayi.",
    },
    scope: {
      zh: "廠區外管線施工介面協調與現場執行。",
      en: "Outdoor piping installation, site interface coordination and field execution.",
    },
    role: {
      zh: "核心團隊成員參與外管線工程，非整廠統包。",
      en: "Core team members participated in the outdoor piping scope — not a turnkey plant contract.",
    },
    work: [
      { zh: "外管線施工現場作業與介面協調。", en: "Outdoor piping field works and interface coordination." },
    ],
    deliverables: [
      { zh: "現場施工紀錄與進度回報。", en: "Site execution records and progress reporting." },
    ],
    photos: [],
    confidentiality: {
      zh: "客戶名稱與現場照片未經授權不公開；本頁以匿名案名呈現。",
      en: "Client name and site photography are withheld; presented anonymously.",
    },
  },
  {
    slug: "changbin-datacenter-fiber",
    draft: false,
    ownership: "core-team",
    industry: { zh: "大型資料中心 · 光纖工程", en: "Large data center · Fiber optic works" },
    background: {
      zh: "彰濱大型資料中心的光纖工程。",
      en: "Fiber optic works at a large data center in Changbin.",
    },
    scope: {
      zh: "光纖佈設、配接、線路標示與整理。",
      en: "Fiber deployment, patching, labelling and cable management.",
    },
    role: {
      zh: "核心團隊成員參與光纖工程施作，非整案承攬。",
      en: "Core team members participated in the fiber scope — not the overall project contract.",
    },
    work: [
      { zh: "光纖佈設與機櫃內配接作業。", en: "Fiber routing and in-rack patching." },
      { zh: "線路標示與線槽整理。", en: "Circuit labelling and cable tray dressing." },
    ],
    deliverables: [
      { zh: "線路標示清冊與配線紀錄。", en: "Labelling schedule and patching records." },
    ],
    photos: [],
    confidentiality: {
      zh: "客戶名稱與現場照片未經授權不公開；本頁以匿名案名呈現。",
      en: "Client name and site photography are withheld; presented anonymously.",
    },
  },

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
    work: [],
    deliverables: [],
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
    work: [],
    deliverables: [],
    photos: [],
    confidentiality: {
      zh: "客戶名稱依保密協議不公開。",
      en: "Client identity withheld under NDA.",
    },
  },
];

export const PUBLISHED_REAL_PROJECTS = REAL_PROJECTS.filter((p) => !p.draft);

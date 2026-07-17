/**
 * AI Tips — enterprise-oriented practical AI usage articles.
 * All content is Traditional Chinese. Content is written to be neutral —
 * tool comparisons must be based on documented capabilities, not marketing
 * claims, and readers are reminded to verify prices and features against
 * each vendor's official documentation.
 */

export type AiTipCategory =
  | "ai-basics"
  | "office"
  | "management"
  | "web-system"
  | "advanced"
  | "security";

export const AI_TIP_CATEGORY_LABEL: Record<AiTipCategory, string> = {
  "ai-basics": "AI 入門",
  office: "辦公效率",
  management: "企業管理",
  "web-system": "網站與系統",
  advanced: "進階技巧",
  security: "資安與風險",
};

export type AiTipAudience =
  | "beginner"
  | "sme-owner"
  | "manager"
  | "engineer"
  | "general";

export const AI_TIP_AUDIENCE_LABEL: Record<AiTipAudience, string> = {
  beginner: "AI 新手",
  "sme-owner": "中小企業經營者",
  manager: "部門主管",
  engineer: "工程 / 資訊人員",
  general: "全體同仁",
};

export type AiTipSection = {
  heading: string;
  content: string; // markdown-lite (plain paragraphs, we render as pre-wrapped text)
};

export type AiTip = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: AiTipCategory;
  tags: string[];
  audience: AiTipAudience[];
  readingTime: number;
  updatedAt: string;
  learningPoints: string[];
  sections: AiTipSection[];
  examples: { good: string; bad: string };
  commonMistakes: string[];
  cautions: string[];
  relatedPromptSlugs: string[];
  relatedArticleSlugs: string[];
  seoTitle: string;
  seoDescription: string;
};

function t(a: AiTip): AiTip {
  return a;
}

export const AI_TIPS: AiTip[] = [
  t({
    id: "t1",
    slug: "how-to-write-effective-prompts",
    title: "如何寫出真正有效的 AI 提示詞？",
    summary: "掌握角色、任務、背景、輸出格式與判斷標準，讓 AI 從『能講』變成『能用』。",
    category: "ai-basics",
    tags: ["提示詞", "入門"],
    audience: ["beginner", "sme-owner", "manager"],
    readingTime: 6,
    updatedAt: "2026-07-17",
    learningPoints: [
      "了解一個好提示詞的 5 個核心結構。",
      "學會替 AI 補背景、限制產出。",
      "知道什麼情境下要禁止 AI 自行假設。",
    ],
    sections: [
      {
        heading: "為什麼提示詞很重要？",
        content:
          "同樣的 AI 模型，兩位使用者可能得到差距很大的產出。差別通常不在模型，而在「你交代得夠不夠清楚」。把 AI 當作一位剛到職的顧問——你不會只丟一句「幫我做行銷計畫」給真人，AI 也一樣需要背景與目標。",
      },
      {
        heading: "一個好提示詞的 5 個核心結構",
        content:
          "1. 角色：告訴 AI 它現在是誰（例：資深 B2B 網站策略顧問）。\n2. 任務目標：這次希望產出什麼、要交給誰使用。\n3. 背景資訊：公司、產業、規模、對象、限制。\n4. 執行步驟或思考路徑：分幾個階段完成。\n5. 輸出格式與判斷標準：字數、章節、表格、禁止事項。",
      },
      {
        heading: "常見補強：不確定資訊怎麼辦？",
        content:
          "AI 沒有你的公司資料，很容易「編」。加上一句：「若下列變數尚未填寫或資訊不足，請直接列出缺漏欄位並詢問使用者，不要自行假設或編造資料。」可大幅降低幻覺。",
      },
      {
        heading: "什麼情境下要限制 AI 自主行動？",
        content:
          "涉及數字、法規、客戶名稱、財務資料時，請明確要求 AI「禁止捏造」。同時明確標示「需由人員確認」的欄位，才不會讓草稿看起來像已定稿。",
      },
    ],
    examples: {
      good:
        "你是資深 B2B 網站顧問。任務目標：為 [公司名稱] 產出官網架構建議書。公司背景：… 執行步驟：1. 摘要定位；2. 建議 6–10 頁… 輸出格式：條列 + 表格。禁止捏造：若變數不足請直接列出缺漏。",
      bad: "幫我寫一個網站架構。",
    },
    commonMistakes: [
      "沒有交代公司背景就期待 AI 產出量身建議。",
      "同一個對話塞太多任務，導致 AI 顧此失彼。",
      "把 AI 產出直接複製上稿，未做審核。",
    ],
    cautions: [
      "AI 產出僅為草稿，最終決策仍需人員判斷。",
      "敏感資料請確認公司對 AI 工具的資料使用政策。",
    ],
    relatedPromptSlugs: ["corporate-website-architecture", "sop-writing-prompt"],
    relatedArticleSlugs: ["why-ai-answers-inaccurate", "how-to-brief-company-context"],
    seoTitle: "如何寫出有效的 AI 提示詞？｜AEGIS AI 使用技巧",
    seoDescription: "掌握角色、任務、背景、步驟與輸出格式，讓 AI 從『能講』變成『能用』。",
  }),
  t({
    id: "t2",
    slug: "why-ai-answers-inaccurate",
    title: "為什麼 AI 回答不準？常見的五個原因",
    summary: "從輸入、模型、上下文、任務範圍與資料時效五個層面，理解 AI 為什麼給錯答案。",
    category: "ai-basics",
    tags: ["幻覺", "限制"],
    audience: ["beginner", "manager"],
    readingTime: 5,
    updatedAt: "2026-07-17",
    learningPoints: ["理解 AI 回答不準的常見原因。", "學會判斷是模型的問題還是提問的問題。"],
    sections: [
      {
        heading: "1. 輸入資訊不足",
        content:
          "AI 沒有你的內部資料。當你只丟一句話，它就會靠訓練資料「猜」你的產業與情境。補上背景資料通常可解決一半以上的準確度問題。",
      },
      {
        heading: "2. 模型的知識截止日",
        content:
          "多數模型有訓練資料截止時間，最新法規、產品版本或市場資料未必在內。時效性強的內容請以官方文件為主，AI 提供的只是起點。",
      },
      {
        heading: "3. 任務範圍超過 AI 能力",
        content: "AI 對「有標準答案」的任務較擅長；對需要現場經驗、多方協商或非公開資料的任務，容易產出看似合理但實際錯誤的答案。",
      },
      {
        heading: "4. 上下文長度限制",
        content: "一次貼太多文件，AI 只會記住前段或末段。分段提問並在每一段確認理解會更穩定。",
      },
      {
        heading: "5. 幻覺（Hallucination）",
        content:
          "即使全部給對，AI 仍可能編造引用、數字、法條。務必核對重要資料的原始來源，並在提示詞中加上「禁止捏造」規則。",
      },
    ],
    examples: {
      good: "請根據我貼上的合約條文回答；若條文未提及請直接回答「未涵蓋」。",
      bad: "台灣勞基法第 42 條規定什麼？（不確認就採信）",
    },
    commonMistakes: ["把 AI 產出的法條或標準條號直接引用。", "沒有分段提問就期待 AI 記住 20 頁文件。"],
    cautions: ["法規、財務、醫療資訊必須以官方文件為準。"],
    relatedPromptSlugs: ["sop-writing-prompt"],
    relatedArticleSlugs: ["how-to-write-effective-prompts", "verify-ai-output"],
    seoTitle: "為什麼 AI 回答不準？五個原因｜AEGIS",
    seoDescription: "從輸入、模型、任務範圍、上下文與幻覺五個層面理解 AI 錯誤的原因。",
  }),
  t({
    id: "t3",
    slug: "how-to-brief-company-context",
    title: "如何讓 ChatGPT 了解公司的背景與需求？",
    summary: "建立一份可重複使用的『公司簡介卡』，讓每次對話都能快速對齊背景。",
    category: "ai-basics",
    tags: ["背景", "客製化"],
    audience: ["sme-owner", "manager"],
    readingTime: 5,
    updatedAt: "2026-07-17",
    learningPoints: ["建立可重複使用的公司背景卡。", "了解哪些資訊不宜貼給公用 AI。"],
    sections: [
      {
        heading: "為什麼要有『公司簡介卡』？",
        content: "每次對話從頭介紹公司很浪費時間。整理一份 200–400 字的公司卡，貼在對話開頭，可以讓 AI 一次到位。",
      },
      {
        heading: "簡介卡應包含哪些欄位？",
        content:
          "公司名稱、產業、規模、主要服務、主要客戶類型、品牌價值主張、常用專有名詞（3–5 個）、目前重點目標、避免使用的詞彙、公開／不公開的資料界線。",
      },
      {
        heading: "哪些資訊不要放進去？",
        content:
          "客戶名冊、個資、財務明細、未公開專案細節、機密合約條款、還沒定案的策略。若使用企業版 AI 且合約允許，仍建議做匿名化。",
      },
      {
        heading: "如何維護？",
        content: "每季 review 一次；重大策略調整時同步更新。維護人可指定行銷或營運同仁，並版本控管。",
      },
    ],
    examples: {
      good:
        "『公司簡介：宏鼎集成，工程整合與 AI 顧問，員工 X 人，主要客戶為製造業與資料中心工程主管。我們強調「真正接得起來」，避免使用『解決方案』『賦能』等空泛詞…』",
      bad: "「請幫我做行銷」，然後把整份客戶資料庫貼上。",
    },
    commonMistakes: ["把公司卡寫得太行銷，AI 產出全是口號。", "簡介卡從未更新。"],
    cautions: ["公用 AI 工具請避免貼上未公開的財務、客戶名單。"],
    relatedPromptSlugs: ["brand-value-proposition", "b2b-homepage-copy"],
    relatedArticleSlugs: ["how-to-write-effective-prompts", "data-cannot-upload"],
    seoTitle: "如何讓 AI 了解公司背景？｜AEGIS",
    seoDescription: "建立可重複使用的公司簡介卡，讓每次對話快速對齊背景。",
  }),
  t({
    id: "t4",
    slug: "meeting-notes-with-ai",
    title: "如何用 AI 整理會議紀錄與待辦事項？",
    summary: "從錄音、逐字稿到行動清單，一套可以在企業內落地的會議紀錄流程。",
    category: "office",
    tags: ["會議", "生產力"],
    audience: ["general", "manager"],
    readingTime: 6,
    updatedAt: "2026-07-17",
    learningPoints: ["建立錄音→逐字稿→紀錄的 3 步驟流程。", "區分決議與討論。"],
    sections: [
      {
        heading: "3 步驟流程",
        content:
          "1. 錄音：與會前告知並取得同意。\n2. 逐字稿：使用工具轉寫（多語需注意混合語言支援）。\n3. AI 整理：使用結構化提示詞產出摘要、決議、行動、待確認。",
      },
      {
        heading: "區分『討論』與『決議』",
        content: "AI 常把「有人建議」誤認為「決議」。在提示詞中要求：只把「明確有結論的」列為決議，其他一律列為待確認。",
      },
      {
        heading: "行動事項四要素",
        content: "項目 / 負責人 / 截止日 / 產出物。四項齊全才算完整行動事項。",
      },
      {
        heading: "落地建議",
        content: "把 AI 產出的紀錄，寄給與會者做 24 小時內確認；同步匯入專案管理工具追蹤行動事項。",
      },
    ],
    examples: {
      good: "把提示詞改為：只列出『在會議中明確有決議的』事項，其他一律列於待確認。",
      bad: "直接讓 AI 摘要，然後全部視為決議。",
    },
    commonMistakes: ["未取得錄音同意。", "行動事項沒有負責人與截止日。"],
    cautions: ["會議內容含敏感資料時，需符合公司對 AI 工具的政策。"],
    relatedPromptSlugs: ["meeting-notes-prompt"],
    relatedArticleSlugs: ["how-to-write-effective-prompts"],
    seoTitle: "用 AI 整理會議紀錄｜AEGIS",
    seoDescription: "從錄音、逐字稿到行動清單，可落地的 AI 會議紀錄流程。",
  }),
  t({
    id: "t5",
    slug: "ai-sop-writing",
    title: "如何用 AI 協助製作企業 SOP？",
    summary: "把口述流程整理為條理清楚的 SOP，並保留人員判斷空間。",
    category: "management",
    tags: ["SOP", "流程"],
    audience: ["manager", "sme-owner"],
    readingTime: 6,
    updatedAt: "2026-07-17",
    learningPoints: ["用 AI 加速 SOP 初稿。", "避免 AI 寫出無法照做的『理論 SOP』。"],
    sections: [
      { heading: "為什麼 SOP 這麼難寫？", content: "現場經驗多在人腦中，一寫下來就少了細節。AI 可以協助整理，但沒有現場資訊時仍會寫出漂亮但不能用的 SOP。" },
      { heading: "3 步驟流程", content: "1. 現場訪談：讓執行者口述 2 個典型案例與 1 個例外案例。\n2. AI 整理：使用『SOP 制定提示詞』產出初稿。\n3. 試做驗證：找 1 位未參與訪談的同仁照做，記錄卡住的地方。" },
      { heading: "把例外處理寫進 SOP", content: "沒有例外處理的 SOP 只是紙上作業。至少列出 3 個常見例外與升級對象。" },
      { heading: "版本與稽核", content: "SOP 需版本號、生效日期、審核人；每年至少 review 1 次。" },
    ],
    examples: {
      good: "先訪談再讓 AI 整理，並要求列出「執行者可能卡住的地方」。",
      bad: "直接讓 AI 憑空產生「完美 SOP」。",
    },
    commonMistakes: ["把 AI 版 SOP 直接掛牆上，沒有試做。"],
    cautions: ["安全、法遵、財務類 SOP 必須專業審核。"],
    relatedPromptSlugs: ["sop-writing-prompt"],
    relatedArticleSlugs: ["meeting-notes-with-ai"],
    seoTitle: "如何用 AI 協助製作 SOP｜AEGIS",
    seoDescription: "把口述流程整理為條理化 SOP，並保留人員判斷空間。",
  }),
  t({
    id: "t6",
    slug: "ai-cost-margin",
    title: "如何用 AI 分析報價、成本與專案毛利？",
    summary: "以 AI 加速成本結構整理、公式檢查與敏感度分析，人員做最後判斷。",
    category: "management",
    tags: ["成本", "毛利", "報價"],
    audience: ["manager", "engineer"],
    readingTime: 7,
    updatedAt: "2026-07-17",
    learningPoints: ["用 AI 檢查成本結構完整性。", "以敏感度分析找出關鍵變數。"],
    sections: [
      { heading: "AI 適合做什麼？", content: "整理成本結構、檢查漏項、加速試算表框架、產出敏感度分析情境。" },
      { heading: "AI 不適合做什麼？", content: "決定最終售價、判斷市場競爭、承擔法遵責任。這些仍需業務與財會參與。" },
      { heading: "推薦流程", content: "1. 把成本項目列給 AI；2. 讓 AI 檢查是否缺少常被低估項目；3. 產出 Excel 公式建議；4. 用 AI 產出敏感度分析情境；5. 人員定案。" },
      { heading: "敏感度分析", content: "選 3 個變數（材料、人工、匯率），各 ±10% 觀察毛利變動，找出影響最大的因子。" },
    ],
    examples: { good: "「請列出工程整合報價常被低估的 10 項成本」+「請畫出成本結構樹」。", bad: "「請幫我算最合適的售價」（不提供任何背景）。" },
    commonMistakes: ["把 AI 建議的售價直接告訴客戶。"],
    cautions: ["財務決策責任在人員，非 AI。"],
    relatedPromptSlugs: ["cost-margin-analysis-prompt"],
    relatedArticleSlugs: ["ai-erp-crm-requirements", "verify-ai-output"],
    seoTitle: "用 AI 分析報價與毛利｜AEGIS",
    seoDescription: "以 AI 加速成本結構整理、公式檢查與敏感度分析。",
  }),
  t({
    id: "t7",
    slug: "ai-plan-website",
    title: "如何用 AI 規劃企業網站？",
    summary: "以 AI 加速資訊架構、內容盤點與 SEO 主題發想，避免直接把 AI 產出當定稿。",
    category: "web-system",
    tags: ["網站", "資訊架構", "SEO"],
    audience: ["manager", "sme-owner"],
    readingTime: 6,
    updatedAt: "2026-07-17",
    learningPoints: ["用 AI 快速產出網站架構草案。", "分辨『可交付』與『需人審』內容。"],
    sections: [
      { heading: "AI 適合做的部分", content: "頁面清單、內容框架、SEO 主題群、FAQ 題目、初稿文案。" },
      { heading: "需人員定案的部分", content: "品牌訊息、案例揭露程度、法遵條款、視覺方向。" },
      { heading: "建議流程", content: "1. 用『官網架構規劃提示詞』產出草稿；2. 用『價值主張提示詞』統一訊息；3. 用『首頁文案提示詞』產出初稿；4. 由熟悉業務的同仁校對；5. 上線前跑上線檢查提示詞。" },
      { heading: "與設計 / 開發協作", content: "把 AI 產出的頁面表格直接匯入 Figma / 專案管理工具，減少重複輸入。" },
    ],
    examples: { good: "先由業務提供服務清單與客戶類型，再用 AI 產出架構。", bad: "直接讓 AI 從零編出你不存在的服務。" },
    commonMistakes: ["把 AI 描述的『客戶數字』搬上網站。"],
    cautions: ["涉及 SEO 描述需符合實際內容，避免誤導。"],
    relatedPromptSlugs: ["corporate-website-architecture", "b2b-homepage-copy", "website-seo-content"],
    relatedArticleSlugs: ["ai-erp-crm-requirements"],
    seoTitle: "如何用 AI 規劃企業網站？｜AEGIS",
    seoDescription: "以 AI 加速資訊架構、內容盤點與 SEO，避免把 AI 產出直接定稿。",
  }),
  t({
    id: "t8",
    slug: "ai-erp-crm-requirements",
    title: "如何用 AI 撰寫 ERP／CRM 系統需求書？",
    summary: "把口述期望轉為可比稿的需求書，AI 幫你想全，人員把關關鍵決策。",
    category: "web-system",
    tags: ["ERP", "CRM", "需求書"],
    audience: ["manager", "engineer"],
    readingTime: 7,
    updatedAt: "2026-07-17",
    learningPoints: ["以 AI 產出可比稿的 RFP 草稿。", "識別哪些內容不能交給 AI 決定。"],
    sections: [
      { heading: "AI 可以做的部分", content: "使用者故事、資料模型草案、模組清單、非功能需求提醒、驗收條件模板。" },
      { heading: "不能交給 AI 的部分", content: "廠商選型、實際費用估算、資料遷移策略、實體佈署選擇。這些需與資訊、財會、營運共同決定。" },
      { heading: "建議流程", content: "1. 用『ERP 需求分析提示詞』盤點模組；2. 訪談各部門確認；3. 用『使用者故事提示詞』產出故事；4. 整合為 RFP；5. 邀 3–5 家廠商比稿。" },
      { heading: "驗收條件", content: "要求每個 must-have 有 Given-When-Then 驗收條件，避免上線後爭議。" },
    ],
    examples: { good: "「請以中型製造業為前提，產出 20 條使用者故事，含優先度與相依。」", bad: "「請幫我選 ERP。」" },
    commonMistakes: ["把 AI 建議的品牌當唯一選擇。"],
    cautions: ["導入 ERP／CRM 涉及組織變革，不僅是選系統。"],
    relatedPromptSlugs: ["erp-requirements", "crm-planning", "user-stories-acceptance"],
    relatedArticleSlugs: ["ai-plan-website"],
    seoTitle: "用 AI 撰寫 ERP／CRM 需求書｜AEGIS",
    seoDescription: "把口述期望轉為可比稿的 RFP，AI 幫你想全，人員把關關鍵決策。",
  }),
  t({
    id: "t9",
    slug: "data-cannot-upload",
    title: "使用生成式 AI 時，哪些公司資料不能直接上傳？",
    summary: "以資料敏感度分類，說明哪些資料需要匿名化、企業版帳號或完全不上傳。",
    category: "security",
    tags: ["資安", "個資", "AI 政策"],
    audience: ["manager", "engineer", "general"],
    readingTime: 6,
    updatedAt: "2026-07-17",
    learningPoints: ["理解四級資料敏感度。", "了解在哪個等級之上不宜使用公用 AI。"],
    sections: [
      { heading: "四級敏感度", content: "L1 公開資訊 → 可自由使用。\nL2 內部一般資訊 → 建議使用企業版 AI。\nL3 敏感（客戶名冊、個資、財務） → 需匿名化或不上傳。\nL4 機密（未公開合約、機敏財務、營業秘密） → 不上傳，尤其不用公用 AI。" },
      { heading: "常見誤區", content: "把整份客戶名單貼給 AI 做分析；把合約全文丟進去問問題；把員工薪資表交給 AI 排序。" },
      { heading: "如何匿名化", content: "把公司名、人名、金額、地址取代為代號；只保留分析所需的欄位；分批提問。" },
      { heading: "企業層級的做法", content: "撰寫『AI 使用政策』，明確允許、禁止與需審核的資料類型；提供企業版帳號並記錄使用行為。" },
    ],
    examples: { good: "把客戶名替換為『客戶 A』並移除身分證後 6 碼再上傳。", bad: "把 Excel 直接拖給公用 AI 分析。" },
    commonMistakes: ["以為刪掉姓名就等於匿名化。"],
    cautions: ["需符合個資法、GDPR 或客戶合約中的資料處理條款。"],
    relatedPromptSlugs: ["system-security-checklist", "roles-permissions"],
    relatedArticleSlugs: ["verify-ai-output", "how-to-brief-company-context"],
    seoTitle: "哪些公司資料不能上傳 AI？｜AEGIS",
    seoDescription: "以資料敏感度分類，說明匿名化、企業版與不上傳的界線。",
  }),
  t({
    id: "t10",
    slug: "verify-ai-output",
    title: "如何查核 AI 產生的數據、法規與市場資訊？",
    summary: "建立三層核對機制，避免把幻覺當事實。",
    category: "security",
    tags: ["幻覺", "查核", "資料"],
    audience: ["manager", "engineer", "general"],
    readingTime: 6,
    updatedAt: "2026-07-17",
    learningPoints: ["建立 3 層查核機制。", "分辨可信與不可信的引用形式。"],
    sections: [
      { heading: "第一層：來源核對", content: "任何具體數字、法條、標準、認證，必須要求 AI 提供來源，並回官方網站查核。若 AI 提供的網址不存在，即為幻覺。" },
      { heading: "第二層：邏輯核對", content: "檢查前後推論是否一致；同一個數字是否被套用到多個不同結論。" },
      { heading: "第三層：專家核對", content: "涉及法律、財務、醫療、工程安全，即使 AI 講得再有信心，仍需專業人員審核。" },
      { heading: "可以信、不可信的引用形式", content: "『依據我方公司提供的資料 X…』通常較可信；『依據 2024 年產業報告，市場規模為 XX 億』且無明確來源時，多半是幻覺。" },
    ],
    examples: { good: "『請提供這段結論的原始來源網址；若無法確認請直接說明無法確認。』", bad: "把 AI 引用的『政府某年度報告數字』直接引用給客戶。" },
    commonMistakes: ["以為 AI 講得越具體就越可信。"],
    cautions: ["專業責任仍在人員；AI 產出僅為草稿。"],
    relatedPromptSlugs: ["ai-transformation-assessment"],
    relatedArticleSlugs: ["why-ai-answers-inaccurate", "data-cannot-upload"],
    seoTitle: "如何查核 AI 的數據與法規？｜AEGIS",
    seoDescription: "建立三層查核機制，避免把 AI 幻覺當事實。",
  }),
  t({
    id: "t11",
    slug: "chatgpt-codex-lovable",
    title: "ChatGPT、Codex 與 Lovable 分別適合做什麼？",
    summary: "以工作任務類型比較三類工具的定位，功能與定價請以官方最新資訊為準。",
    category: "advanced",
    tags: ["工具比較", "AI 工具"],
    audience: ["general", "manager", "engineer"],
    readingTime: 6,
    updatedAt: "2026-07-17",
    learningPoints: ["理解通用對話、程式碼協作、應用建置三類工具的差別。", "選工具前先看任務類型。"],
    sections: [
      {
        heading: "免責宣告",
        content:
          "以下比較僅為一般定位說明，並非為特定情境下的最佳選擇。實際功能、版本與定價會經常更新，請以各家官方文件為準，並依你公司政策評估合規性。",
      },
      {
        heading: "通用對話與知識工作（如 ChatGPT）",
        content: "適合：撰寫、摘要、翻譯、發想、學習新主題、日常辦公助理。使用門檻最低。",
      },
      {
        heading: "程式碼協作型（如 GitHub Copilot、Codex 類產品）",
        content: "適合：程式撰寫、bug 排查、單元測試、程式碼重構。使用者需具備一定程式能力才能得到品質產出。",
      },
      {
        heading: "應用建置型（如 Lovable）",
        content: "適合：透過自然語言快速建置網站、內部工具、資訊系統原型。適合概念驗證（PoC）與早期版本，正式導入仍建議與工程團隊協作。",
      },
      {
        heading: "如何選？",
        content: "先問「這個任務的產出是什麼？」——內容 → 通用對話型；程式碼 → 程式碼協作型；可運作的應用 → 應用建置型。組合使用效果通常更好。",
      },
    ],
    examples: {
      good: "先用通用對話型整理需求，再用應用建置型做原型，最後由工程團隊評估是否升級。",
      bad: "只用一種工具解決所有問題，忽略工具定位差異。",
    },
    commonMistakes: ["因看到廣告就採用某個工具而不評估自己的任務類型。"],
    cautions: ["工具功能與定價會頻繁更新；請以官方最新資訊為準，勿以本文所述做決策依據。"],
    relatedPromptSlugs: ["ai-transformation-assessment"],
    relatedArticleSlugs: ["sme-ai-first-step"],
    seoTitle: "ChatGPT、Codex、Lovable 差別｜AEGIS",
    seoDescription: "以任務類型比較三類 AI 工具的定位；實際功能請以官方為準。",
  }),
  t({
    id: "t12",
    slug: "sme-ai-first-step",
    title: "中小企業導入 AI，第一步應該從哪裡開始？",
    summary: "從一個具體 Quick Win 開始，而不是先買企業級大平台。",
    category: "advanced",
    tags: ["中小企業", "AI 導入"],
    audience: ["sme-owner", "manager"],
    readingTime: 6,
    updatedAt: "2026-07-17",
    learningPoints: ["從 1 個部門、1 個流程開始。", "先建立能力，再決定平台。"],
    sections: [
      { heading: "為什麼不應該一開始就砸大錢？", content: "多數中小企業還未做流程盤點與資料整理，就導入大型 AI 平台，成效有限。建議先做 Quick Win 建立信心與能力。" },
      { heading: "推薦第一步", content: "1. 選 1 個「重複、規則清楚、產出可驗收」的流程（例：報價分類、客服信件初回、月報整理）。\n2. 用公用或企業版 AI 工具建立提示詞流程。\n3. 追蹤 2 週效益。" },
      { heading: "第二步：建立內部規範", content: "AI 使用政策、資料敏感度分類、允許 / 禁止使用清單、需要主管審核的類型。" },
      { heading: "第三步：延伸與整合", content: "當 Quick Win 有明確效益（時間、金額、品質），再考慮整合到 CRM、ERP、專案系統，或評估企業版方案。" },
      { heading: "何時考慮專業顧問？", content: "當內部沒有專責人員、流程涉及多部門、或涉及專業合規時，建議引入外部顧問加速落地。" },
    ],
    examples: { good: "先用 AI 幫客服每日整理未回覆的客戶信件，2 週後統計節省的時間。", bad: "第一天就砸 100 萬買企業級平台，卻沒人使用。" },
    commonMistakes: ["把 AI 當萬靈丹，跳過流程盤點。"],
    cautions: ["AI 不能完全取代專業判斷；導入時需伴隨培訓與制度調整。"],
    relatedPromptSlugs: ["ai-transformation-assessment", "workflow-automation"],
    relatedArticleSlugs: ["chatgpt-codex-lovable", "ai-erp-crm-requirements"],
    seoTitle: "中小企業導入 AI 的第一步｜AEGIS",
    seoDescription: "從一個 Quick Win 開始，先建立能力，再考慮企業級平台。",
  }),
];

export function getAiTip(slug: string): AiTip | undefined {
  return AI_TIPS.find((t) => t.slug === slug);
}

export function getAiTipsByCategory(cat: AiTipCategory): AiTip[] {
  return AI_TIPS.filter((t) => t.category === cat);
}

export function getRelatedAiTips(t: AiTip): AiTip[] {
  return t.relatedArticleSlugs
    .map((s) => getAiTip(s))
    .filter((x): x is AiTip => Boolean(x));
}

// Aegis BuildQuest — mock data & types
// Designed so future AI / backend integration only replaces a few functions.

export type SkillKey =
  | "progress"
  | "cost"
  | "quality"
  | "safety"
  | "subcontractor"
  | "client"
  | "documentation";

export const SKILL_LABEL: Record<SkillKey, string> = {
  progress: "進度控管",
  cost: "成本控管",
  quality: "品質管理",
  safety: "工安管理",
  subcontractor: "包商協調",
  client: "業主溝通",
  documentation: "文件紀錄",
};

export type ClassId =
  | "commander"
  | "knight"
  | "cost-mage"
  | "qa-judge"
  | "coordinator"
  | "client-liaison";

export interface EngineerClass {
  id: ClassId;
  name: string;
  subtitle: string;
  fit: string;
  description: string;
  primary: SkillKey[];
  glyph: string; // emoji-style mark (not a copyrighted asset)
  accent: "gold" | "cyan" | "violet" | "rose" | "green" | "blue";
}

export const CLASSES: EngineerClass[] = [
  {
    id: "commander",
    name: "工程指揮官",
    subtitle: "Project Commander",
    fit: "適合專案經理",
    description: "擅長進度控管、資源調度與業主回報，於戰場中央運籌全局。",
    primary: ["progress", "client", "documentation"],
    glyph: "◈",
    accent: "gold",
  },
  {
    id: "knight",
    name: "現場騎士",
    subtitle: "Site Knight",
    fit: "適合工地主任與現場工程師",
    description: "擅長施工協調、工安判斷與現場處理，第一線守護工地。",
    primary: ["safety", "progress", "quality"],
    glyph: "✦",
    accent: "cyan",
  },
  {
    id: "cost-mage",
    name: "成本術士",
    subtitle: "Cost Mage",
    fit: "適合成本控管與估價人員",
    description: "擅長預算控管、追加減與材料工時分析，掌控每一筆數字。",
    primary: ["cost", "documentation", "quality"],
    glyph: "❖",
    accent: "violet",
  },
  {
    id: "qa-judge",
    name: "品質審判官",
    subtitle: "QA Judge",
    fit: "適合品管與稽核人員",
    description: "擅長施工品質、缺失查核與驗收標準，以鐵則守護工程。",
    primary: ["quality", "documentation", "safety"],
    glyph: "⚖",
    accent: "rose",
  },
  {
    id: "coordinator",
    name: "包商協調師",
    subtitle: "Sub. Coordinator",
    fit: "適合工程主管與協調窗口",
    description: "擅長包商管理、溝通協調與衝突處理，串聯每一條工序。",
    primary: ["subcontractor", "progress", "client"],
    glyph: "✶",
    accent: "green",
  },
  {
    id: "client-liaison",
    name: "業主溝通官",
    subtitle: "Client Liaison",
    fit: "適合 PM 與業務工程師",
    description: "擅長業主會議、進度說明、風險溝通與交付管理。",
    primary: ["client", "documentation", "progress"],
    glyph: "✺",
    accent: "blue",
  },
];

export interface DialogChoice {
  id: string;
  text: string;
  deltas: Partial<Record<SkillKey, number>>;
  feedback: string;
}

export interface DialogTurn {
  id: string;
  aiName: string;
  aiRole: string;
  text: string;
  choices: DialogChoice[];
}

export type QuestType = "tutorial" | "field" | "negotiation" | "boss";

export interface Quest {
  id: string;
  chapter: number;
  name: string;
  type: QuestType;
  purpose: string;
  brief: string;
  aiPersona: { name: string; role: string; tone: string };
  winCondition: string;
  failCondition: string;
  rubric: Record<SkillKey, number>; // weight 0-100
  turns: DialogTurn[];
  recommendedClass: ClassId;
  difficulty: 1 | 2 | 3 | 4 | 5;
  enabled: boolean;
  rewardExp: number;
  rewardTitle?: string;
}

const makeChoice = (
  id: string,
  text: string,
  deltas: Partial<Record<SkillKey, number>>,
  feedback: string,
): DialogChoice => ({ id, text, deltas, feedback });

export const QUESTS: Quest[] = [
  {
    id: "q01-prep",
    chapter: 1,
    name: "開工前準備村",
    type: "tutorial",
    purpose: "確認圖面、工項、材料、人力、施工計畫與進場條件。",
    brief: "新案即將開工，你必須在進場前完成所有準備檢核。",
    aiPersona: { name: "陳工頭", role: "資深工地主任", tone: "務實、節奏快" },
    winCondition: "完成 3 項關鍵檢核並輸出開工檢核表",
    failCondition: "遺漏工安或圖面審查",
    rubric: { progress: 25, cost: 10, quality: 15, safety: 20, subcontractor: 10, client: 5, documentation: 15 },
    rewardExp: 120,
    rewardTitle: "開工守門人",
    recommendedClass: "commander",
    difficulty: 1,
    enabled: true,
    turns: [
      {
        id: "t1",
        aiName: "陳工頭",
        aiRole: "資深工地主任",
        text: "PM，明天就要進場了。圖面我們今天才拿到第三版，業主要求週五完成放樣。你想怎麼開？",
        choices: [
          makeChoice("a", "先召開開工會議，會中同步圖說與工項，並要求業主書面確認最新版圖面。", { progress: 8, documentation: 10, client: 5 }, "正確：先穩住圖面版本，避免後續變更追加爭議。"),
          makeChoice("b", "為了趕進度，今天先按舊圖放樣，等新圖再修。", { progress: -10, cost: -10, quality: -10 }, "高風險：放樣錯誤的成本會吃掉整個利潤。"),
          makeChoice("c", "只通知工班口頭交代，加快進場。", { documentation: -10, safety: -5 }, "缺乏紀錄，未來糾紛無依據。"),
        ],
      },
      {
        id: "t2",
        aiName: "陳工頭",
        aiRole: "資深工地主任",
        text: "工安計畫書還沒簽核，明天勞安要來巡。",
        choices: [
          makeChoice("a", "今晚補完工安計畫並夜間 line 群知會勞安窗口。", { safety: 12, documentation: 8 }, "工安先行，符合法規。"),
          makeChoice("b", "工安等明天現場再說。", { safety: -15 }, "勞檢開罰風險極高。"),
          makeChoice("c", "請包商各自負責自己的工安。", { safety: -8, subcontractor: -5 }, "責任不清，事故無人扛。"),
        ],
      },
      {
        id: "t3",
        aiName: "陳工頭",
        aiRole: "資深工地主任",
        text: "材料表跟採購單我看了，少了三項弱電端子。",
        choices: [
          makeChoice("a", "立刻補開採購單，並請供應商承諾到貨日，更新到進度表。", { cost: 8, progress: 10, documentation: 6 }, "材料連動進度，正確處置。"),
          makeChoice("b", "缺料先不管，等用到再說。", { progress: -12, cost: -8 }, "材料延誤是最常見停工原因。"),
          makeChoice("c", "請工班現場買。", { cost: -10, documentation: -8 }, "現場採購無發票會掉成本控管。"),
        ],
      },
    ],
  },
  {
    id: "q02-progress",
    chapter: 2,
    name: "進度迷宮",
    type: "field",
    purpose: "工程進度落後時，判斷原因並安排補救計畫。",
    brief: "本月進度落後 8%，業主已開始追問，必須找出原因並擬定補救。",
    aiPersona: { name: "林副理", role: "業主代表", tone: "壓力大、要數字" },
    winCondition: "提出根因分析與三項可量化補救措施",
    failCondition: "用承諾搪塞而沒有計畫",
    rubric: { progress: 30, cost: 10, quality: 10, safety: 5, subcontractor: 15, client: 20, documentation: 10 },
    rewardExp: 160,
    rewardTitle: "進度救援者",
    recommendedClass: "commander",
    difficulty: 2,
    enabled: true,
    turns: [
      {
        id: "t1",
        aiName: "林副理",
        aiRole: "業主代表",
        text: "你們這個月落後 8%，要怎麼追？",
        choices: [
          makeChoice("a", "我已經做了根因分析，是 A、B、C 三點，我有對應的補救表。", { progress: 12, client: 12, documentation: 8 }, "用結構化分析回應壓力，正確。"),
          makeChoice("b", "我們會努力追趕，請業主放心。", { client: -8, progress: -5 }, "空話會讓信任更崩。"),
          makeChoice("c", "都是包商的問題。", { subcontractor: -10, client: -6 }, "把責任推給包商會讓整個案場失序。"),
        ],
      },
      {
        id: "t2",
        aiName: "林副理",
        aiRole: "業主代表",
        text: "你打算怎麼追回這 8%？",
        choices: [
          makeChoice("a", "夜間班 + 雙工班並進 + 關鍵路徑前移，每週對齊進度。", { progress: 15, cost: -5, subcontractor: 8 }, "務實補救，可能微增成本但救得回。"),
          makeChoice("b", "全部加班趕工。", { progress: 5, safety: -10, cost: -8 }, "工安與品質風險。"),
          makeChoice("c", "請業主延後驗收。", { client: -12 }, "延期請求需有正式變更依據。"),
        ],
      },
    ],
  },
  {
    id: "q03-cost",
    chapter: 3,
    name: "成本守門人",
    type: "field",
    purpose: "面對成本超支，判斷材料、工時、外包與追加減責任。",
    brief: "案場目前已超支 6%，老闆要求說明。",
    aiPersona: { name: "王經理", role: "公司財務長", tone: "冷靜、要數字" },
    winCondition: "明確指出超支來源並提出可執行控制方案",
    failCondition: "無法定位來源",
    rubric: { progress: 10, cost: 35, quality: 10, safety: 5, subcontractor: 15, client: 10, documentation: 15 },
    rewardExp: 180,
    rewardTitle: "成本守門人",
    recommendedClass: "cost-mage",
    difficulty: 3,
    enabled: true,
    turns: [
      {
        id: "t1",
        aiName: "王經理",
        aiRole: "公司財務長",
        text: "成本超支 6%，主要是哪裡？",
        choices: [
          makeChoice("a", "比對預算與實支：材料 +3%、工時 +2%、外包追加 +1%。我有對應憑證。", { cost: 18, documentation: 10 }, "拆解到項目層級，正確。"),
          makeChoice("b", "大概是材料漲價吧。", { cost: -10, documentation: -8 }, "沒有依據等於沒回答。"),
          makeChoice("c", "包商請款比較多。", { cost: -5, subcontractor: -8 }, "歸咎沒有改善作用。"),
        ],
      },
      {
        id: "t2",
        aiName: "王經理",
        aiRole: "公司財務長",
        text: "接下來怎麼控制？",
        choices: [
          makeChoice("a", "凍結非關鍵採購、追加減提案、每週成本對帳會議。", { cost: 16, progress: 5, client: 4 }, "三件事可衡量，可執行。"),
          makeChoice("b", "再緊一點就好。", { cost: -8 }, "沒有可衡量動作。"),
          makeChoice("c", "之後一起跟業主提追加。", { client: -8 }, "未先界定範圍會被打回。"),
        ],
      },
    ],
  },
  {
    id: "q04-subcontractor",
    chapter: 4,
    name: "包商協調戰",
    type: "negotiation",
    purpose: "包商互相推責、工班不配合時，如何協調與紀錄。",
    brief: "弱電與機電在天花板搶位置，雙方都不退讓。",
    aiPersona: { name: "張包頭", role: "機電班頭", tone: "暴躁、護自己班" },
    winCondition: "達成書面協調並保留會議紀錄",
    failCondition: "口頭妥協沒有紀錄",
    rubric: { progress: 15, cost: 10, quality: 10, safety: 5, subcontractor: 35, client: 5, documentation: 20 },
    rewardExp: 170,
    recommendedClass: "coordinator",
    difficulty: 3,
    enabled: true,
    turns: [
      {
        id: "t1",
        aiName: "張包頭",
        aiRole: "機電班頭",
        text: "弱電那邊的線槽擋到我風管，我才不讓！",
        choices: [
          makeChoice("a", "馬上召開三方協調會，攤圖、定優先路徑、會議紀錄三方簽。", { subcontractor: 18, documentation: 12 }, "標準作法。"),
          makeChoice("b", "你們自己喬。", { subcontractor: -12, progress: -8 }, "現場主管失職。"),
          makeChoice("c", "誰先到誰先做。", { quality: -8, subcontractor: -6 }, "會造成重工。"),
        ],
      },
    ],
  },
  {
    id: "q05-material",
    chapter: 5,
    name: "材料延誤事件",
    type: "field",
    purpose: "材料未到、供應商延遲時，如何調整施工順序與回報風險。",
    brief: "光纖主幹材料延遲 10 天到貨。",
    aiPersona: { name: "供應商陳", role: "材料供應商", tone: "推託、找藉口" },
    winCondition: "調整施工順序並向業主預警",
    failCondition: "被動等料",
    rubric: { progress: 25, cost: 15, quality: 5, safety: 5, subcontractor: 15, client: 20, documentation: 15 },
    rewardExp: 150,
    recommendedClass: "commander",
    difficulty: 2,
    enabled: true,
    turns: [
      {
        id: "t1",
        aiName: "供應商陳",
        aiRole: "材料供應商",
        text: "不好意思，主幹線要再晚 10 天才會到。",
        choices: [
          makeChoice("a", "請出具書面延遲通知，同步調整施工順序，先做不依賴主幹的區域。", { progress: 15, documentation: 10, client: 8 }, "正確：紀錄＋備援工序。"),
          makeChoice("b", "那就停工等料。", { progress: -15, cost: -8 }, "停工是最差選擇。"),
          makeChoice("c", "私下找替代材料先用。", { quality: -12, documentation: -10 }, "規範外材料會驗收失敗。"),
        ],
      },
    ],
  },
  {
    id: "q06-safety",
    chapter: 6,
    name: "工安警戒副本",
    type: "field",
    purpose: "發現現場工安缺失時，如何停工、通報、改善與留下紀錄。",
    brief: "高處作業未繫安全帶被你發現。",
    aiPersona: { name: "工班阿明", role: "高處作業工", tone: "嫌麻煩" },
    winCondition: "立即停工、書面改善、教育訓練",
    failCondition: "口頭警告即放行",
    rubric: { progress: 10, cost: 5, quality: 5, safety: 45, subcontractor: 10, client: 5, documentation: 20 },
    rewardExp: 200,
    rewardTitle: "工安守護者",
    recommendedClass: "knight",
    difficulty: 3,
    enabled: true,
    turns: [
      {
        id: "t1",
        aiName: "工班阿明",
        aiRole: "高處作業工",
        text: "啊安全帶很麻煩啦，一下下而已。",
        choices: [
          makeChoice("a", "立即停工、開立缺失單、補做教育訓練、留下照片與簽名。", { safety: 25, documentation: 15 }, "完整工安 SOP，正確。"),
          makeChoice("b", "口頭警告繼續做。", { safety: -25 }, "出事就是公司負責人扛。"),
          makeChoice("c", "請他自己注意。", { safety: -15, documentation: -10 }, "形同沒有管理。"),
        ],
      },
    ],
  },
  {
    id: "q07-quality",
    chapter: 7,
    name: "品質稽核關卡",
    type: "field",
    purpose: "施工品質不符合標準時，如何判斷缺失、要求改善與安排複驗。",
    brief: "監控線材壓接不符標準。",
    aiPersona: { name: "稽核員李", role: "第三方品管", tone: "嚴格、按規範" },
    winCondition: "開立缺失、限期改善、安排複驗",
    failCondition: "私下放行",
    rubric: { progress: 10, cost: 10, quality: 40, safety: 5, subcontractor: 10, client: 10, documentation: 15 },
    rewardExp: 170,
    recommendedClass: "qa-judge",
    difficulty: 3,
    enabled: true,
    turns: [
      {
        id: "t1",
        aiName: "稽核員李",
        aiRole: "第三方品管",
        text: "你們這批壓接不合格，我要開缺失。",
        choices: [
          makeChoice("a", "接受缺失單，限期 3 天改善，並安排複驗，所有壓接重做並抽驗。", { quality: 22, documentation: 12 }, "正確 SOP。"),
          makeChoice("b", "拜託先讓我們交件，下次補。", { quality: -15, client: -8 }, "品質讓步會反噬整個案。"),
          makeChoice("c", "只改業主看得到的地方。", { quality: -20, documentation: -10 }, "風險巨大。"),
        ],
      },
    ],
  },
  {
    id: "q08-change",
    chapter: 8,
    name: "變更追加魔王",
    type: "boss",
    purpose: "業主臨時要求變更，但不想加錢時，如何界定範圍與提出追加。",
    brief: "業主要求新增 20 點監控但拒絕追加。",
    aiPersona: { name: "業主特助", role: "業主端窗口", tone: "強勢、講人情" },
    winCondition: "界定原合約範圍、提出書面追加單",
    failCondition: "口頭答應無紀錄",
    rubric: { progress: 10, cost: 25, quality: 10, safety: 5, subcontractor: 5, client: 25, documentation: 20 },
    rewardExp: 240,
    rewardTitle: "追加談判官",
    recommendedClass: "client-liaison",
    difficulty: 4,
    enabled: true,
    turns: [
      {
        id: "t1",
        aiName: "業主特助",
        aiRole: "業主端窗口",
        text: "這點小事，順手加一下，我們是長期合作。",
        choices: [
          makeChoice("a", "對照合約範圍，逐點列出超出項目，提出書面追加單再施作。", { cost: 18, client: 12, documentation: 15 }, "範圍 + 書面 = 專業。"),
          makeChoice("b", "好啦先做，之後再算。", { cost: -20, documentation: -15 }, "做了就拿不到錢。"),
          makeChoice("c", "直接拒絕。", { client: -15 }, "處理方式過硬會失去信任。"),
        ],
      },
    ],
  },
  {
    id: "q09-client",
    chapter: 9,
    name: "業主會議 Boss 戰",
    type: "boss",
    purpose: "面對業主催進度、質疑品質、要求降價時，如何專業回報。",
    brief: "月會上業主同時提出三項挑戰。",
    aiPersona: { name: "業主總經理", role: "業主決策者", tone: "強勢、結果導向" },
    winCondition: "用數據回應三項挑戰，達成共識",
    failCondition: "情緒回應或承諾無依據",
    rubric: { progress: 15, cost: 15, quality: 15, safety: 5, subcontractor: 5, client: 35, documentation: 10 },
    rewardExp: 280,
    rewardTitle: "業主會議王者",
    recommendedClass: "client-liaison",
    difficulty: 5,
    enabled: true,
    turns: [
      {
        id: "t1",
        aiName: "業主總經理",
        aiRole: "業主決策者",
        text: "進度慢、品質不好、價格還這麼貴，你怎麼說？",
        choices: [
          makeChoice("a", "用週報數據回應進度、用品管紀錄回應品質、用追加減清單回應成本。", { client: 22, progress: 8, documentation: 10 }, "三段式回應，專業。"),
          makeChoice("b", "我們都很努力。", { client: -15 }, "情緒不能取代數據。"),
          makeChoice("c", "那就降價好了。", { cost: -20, client: -5 }, "輕易降價會被持續壓。"),
        ],
      },
    ],
  },
  {
    id: "q10-handover",
    chapter: 10,
    name: "結案驗收之門",
    type: "boss",
    purpose: "整理文件、測試紀錄、缺失改善、驗收資料與交付條件。",
    brief: "案場驗收前一週，文件還沒整齊。",
    aiPersona: { name: "業主品管", role: "驗收方", tone: "細節控" },
    winCondition: "交付完整驗收包與測試報告",
    failCondition: "缺項或紀錄不全",
    rubric: { progress: 10, cost: 10, quality: 20, safety: 10, subcontractor: 5, client: 15, documentation: 30 },
    rewardExp: 260,
    rewardTitle: "結案大師",
    recommendedClass: "commander",
    difficulty: 4,
    enabled: true,
    turns: [
      {
        id: "t1",
        aiName: "業主品管",
        aiRole: "驗收方",
        text: "驗收當天要看的文件，你準備好了嗎？",
        choices: [
          makeChoice("a", "竣工圖、測試報告、缺失改善紀錄、保固書、操作手冊全部備齊，列清單。", { documentation: 25, quality: 10, client: 10 }, "標準交付，正確。"),
          makeChoice("b", "缺什麼補什麼。", { documentation: -10, client: -8 }, "驗收會被退件。"),
          makeChoice("c", "驗收當天再說。", { documentation: -20 }, "幾乎一定驗收失敗。"),
        ],
      },
    ],
  },
];

export const TITLES = [
  "初心工程師",
  "現場新銳",
  "工序統籌官",
  "成本鷹眼",
  "品質先鋒",
  "工安守護者",
  "包商談判家",
  "業主信任者",
  "結案大師",
  "Aegis 戰術導師",
];

export interface PlayerStats {
  classId: ClassId;
  name: string;
  level: number;
  exp: number;
  expToNext: number;
  title: string;
  stats: Record<SkillKey, number>;
  completedQuests: string[];
  totalScore: number;
  runs: number;
}

export const MOCK_PLAYER: PlayerStats = {
  classId: "commander",
  name: "李 PM",
  level: 7,
  exp: 320,
  expToNext: 500,
  title: "工序統籌官",
  stats: {
    progress: 78,
    cost: 64,
    quality: 70,
    safety: 58,
    subcontractor: 66,
    client: 74,
    documentation: 60,
  },
  completedQuests: ["q01-prep", "q02-progress", "q06-safety"],
  totalScore: 2480,
  runs: 12,
};

export interface QuestRun {
  id: string;
  questId: string;
  playerName: string;
  scores: Record<SkillKey, number>;
  total: number;
  grade: "S" | "A" | "B" | "C" | "D";
  expGained: number;
  titleGained?: string;
  aiAdvice: string[];
  nextRecommend: string;
  createdAt: string;
}

export function gradeFromTotal(total: number): QuestRun["grade"] {
  if (total >= 90) return "S";
  if (total >= 80) return "A";
  if (total >= 70) return "B";
  if (total >= 60) return "C";
  return "D";
}

export interface Employee {
  id: string;
  name: string;
  classId: ClassId;
  level: number;
  runs: number;
  avgScore: number;
  weakestQuestId: string;
  weakestSkill: SkillKey;
  lastActive: string;
}

export const TEAM: Employee[] = [
  { id: "u1", name: "李 PM", classId: "commander", level: 7, runs: 12, avgScore: 82, weakestQuestId: "q08-change", weakestSkill: "documentation", lastActive: "今天" },
  { id: "u2", name: "陳工地主任", classId: "knight", level: 6, runs: 10, avgScore: 78, weakestQuestId: "q09-client", weakestSkill: "client", lastActive: "昨天" },
  { id: "u3", name: "張估價", classId: "cost-mage", level: 5, runs: 8, avgScore: 74, weakestQuestId: "q04-subcontractor", weakestSkill: "subcontractor", lastActive: "3 天前" },
  { id: "u4", name: "林品管", classId: "qa-judge", level: 6, runs: 9, avgScore: 80, weakestQuestId: "q05-material", weakestSkill: "progress", lastActive: "今天" },
  { id: "u5", name: "黃協調", classId: "coordinator", level: 4, runs: 6, avgScore: 68, weakestQuestId: "q03-cost", weakestSkill: "cost", lastActive: "本週" },
  { id: "u6", name: "吳業務工程師", classId: "client-liaison", level: 5, runs: 7, avgScore: 76, weakestQuestId: "q07-quality", weakestSkill: "quality", lastActive: "今天" },
  { id: "u7", name: "周現場", classId: "knight", level: 3, runs: 5, avgScore: 62, weakestQuestId: "q06-safety", weakestSkill: "safety", lastActive: "本週" },
  { id: "u8", name: "蔡 PM", classId: "commander", level: 8, runs: 15, avgScore: 86, weakestQuestId: "q08-change", weakestSkill: "cost", lastActive: "今天" },
];

export interface KnowledgeItem {
  id: string;
  category: "SOP" | "工安規範" | "施工檢查表" | "進度回報" | "會議紀錄" | "追加減" | "驗收文件";
  title: string;
  summary: string;
  updatedAt: string;
}

export const KNOWLEDGE: KnowledgeItem[] = [
  { id: "k1", category: "SOP", title: "弱電工程開工前 SOP", summary: "圖面、放樣、材料、工班、工安五大項。", updatedAt: "2025-04" },
  { id: "k2", category: "SOP", title: "監控系統施工 SOP", summary: "點位確認、線材壓接、測試、驗收。", updatedAt: "2025-05" },
  { id: "k3", category: "工安規範", title: "高處作業工安規範", summary: "安全帶、護欄、警示、教育訓練。", updatedAt: "2025-03" },
  { id: "k4", category: "施工檢查表", title: "天花板封板前檢查表", summary: "弱電、機電、消防、空調四方確認。", updatedAt: "2025-06" },
  { id: "k5", category: "進度回報", title: "週進度報告範本", summary: "S 曲線、落後原因、補救措施。", updatedAt: "2025-05" },
  { id: "k6", category: "會議紀錄", title: "業主月會紀錄範本", summary: "議題、決議、待辦、責任人、期限。", updatedAt: "2025-06" },
  { id: "k7", category: "追加減", title: "追加減工程申請範本", summary: "原合約範圍、新增項目、單價、總額。", updatedAt: "2025-04" },
  { id: "k8", category: "驗收文件", title: "結案驗收文件清單", summary: "竣工圖、測試報告、缺失改善、保固、手冊。", updatedAt: "2025-06" },
];

// Future AI integration point.
export async function runAiTurn(_questId: string, _history: unknown[]): Promise<string> {
  return "（AI 對話將在串接後啟用）";
}

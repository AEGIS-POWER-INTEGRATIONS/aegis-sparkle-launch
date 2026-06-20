## 範圍確認

這是一個**全新的獨立 Web App**，與目前的 Aegis Business Apps 行銷網站是不同產品。我會在同一個專案中以新路由群 `/buildquest/*` 建立，與現有官網並存，避免破壞既有頁面。若你希望另開新專案，告訴我即可改成獨立 App。

第一版全部使用 mock data（TypeScript 型別 + 假資料 store），保留未來可換成 AI API / Lovable Cloud 的資料結構。

## 視覺設計方向

- **基調**：深色科技背景（深藍 #0B1020 / 深紫 #1A1230），現代企業 SaaS 卡片式 UI 為主體（60%）
- **RPG 元素**（25%）：等級徽章、EXP 進度條、稱號膠囊、能力雷達、任務卡、Boss 標記、像素感點綴 icon（不過度像素化）
- **指揮中心感**（15%）：HUD 風格資訊條、發光描邊、青綠/金色強調光
- **字體**：標題 Orbitron / Rajdhani 風格 + 內文 Noto Sans TC；不使用任何受版權保護的遊戲名稱或素材
- 響應式：桌機 3 欄、平板 2 欄、手機單欄堆疊

## 路由與頁面（10 個）

```
src/routes/buildquest/
  index.tsx            登入頁（mock 登入即進入）
  class-select.tsx     工程角色選擇（6 職業卡）
  hall.tsx             工程任務大廳（玩家 HUD + 推薦關卡）
  quests.tsx           關卡列表（10 關 + 篩選/狀態）
  quest.$id.tsx        AI 情境對話訓練（三欄式）
  result.$id.tsx       任務結果（評級 + 七維分數 + 建議）
  profile.tsx          個人工程能力值（雷達圖 + 紀錄）
  admin.tsx            專案主管後台（員工/排行/弱項）
  admin.quests.tsx     關卡管理（CRUD UI，mock）
  knowledge.tsx        工程知識庫（SOP/範本分類）
```

共用：`src/components/buildquest/`（PlayerHUD、QuestCard、StatBar、RadarChart、DialogBubble、RpgButton、ClassBadge…）；`src/lib/buildquest/mock.ts` 集中放型別與 mock data。

## 資料結構（為未來 AI / 後台預留）

```ts
type EngineerClass = 'commander' | 'knight' | 'cost-mage' | 'qa-judge' | 'coordinator' | 'client-liaison';
type SkillKey = 'progress' | 'cost' | 'quality' | 'safety' | 'subcontractor' | 'client' | 'documentation';

interface Player { id; name; classId; level; exp; expToNext; title; stats: Record<SkillKey, number>; completedQuests: string[] }
interface Quest { id; name; chapter; type; purpose; aiPersona; winCondition; failCondition; rubric: Record<SkillKey, number>; turns; enabled }
interface DialogTurn { role: 'ai' | 'player' | 'system'; text; choices?: { id; text; deltas: Partial<Record<SkillKey, number>> }[] }
interface QuestRun { id; questId; playerId; turns: DialogTurn[]; scores: Record<SkillKey, number>; total; grade: 'S'|'A'|'B'|'C'|'D'; expGained; titleGained?; aiAdvice; nextRecommend; createdAt }
interface Employee { id; name; classId; level; runs: number; avgScore; weakestQuestId }
```

AI 對話頁第一版用「選項式情境分支」+ 預設文字輸入欄（送出後 mock 回應）；切到真 AI 時只需替換 `runAiTurn(questId, history)` 一個函式。

## 六職業 / 十關卡

依需求逐字建立卡片內容、訓練目的、AI 角色名稱、評分權重（七大能力）、Boss 標記（變更追加魔王、業主會議 Boss 戰）。

## 導覽整合

- 現有官網（`/`, `/costflow` 等）不動。
- 在站頭新增「BuildQuest」入口連到 `/buildquest`。
- BuildQuest 內部使用自己的深色 Shell（含 PlayerHUD），與官網 Chrome 分離。

## 不做（第一版）

- 真實 AI 串接、真實登入/資料庫、PDF 報告下載（按鈕保留但顯示 toast）、關卡管理頁的實際持久化（僅 UI + local state）。

## 交付確認

確認後我會一次建立：型別 + mock data、共用元件、10 個路由頁、深色 RPG 樣式 token（加到 `src/styles.css`）、官網入口連結。需要的話再加上能力雷達圖（用純 SVG，免額外依賴）。

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo } from "react";
import { QUESTS, SKILL_LABEL, gradeFromTotal, type SkillKey } from "@/lib/buildquest/mock";
import { StatBar, ChapterBadge } from "@/components/buildquest/shared";

export const Route = createFileRoute("/buildquest/result/$id")({
  validateSearch: (s: Record<string, unknown>) => ({
    progress: Number(s.progress ?? 70),
    cost: Number(s.cost ?? 70),
    quality: Number(s.quality ?? 70),
    safety: Number(s.safety ?? 70),
    subcontractor: Number(s.subcontractor ?? 70),
    client: Number(s.client ?? 70),
    documentation: Number(s.documentation ?? 70),
  }),
  component: Result,
});

const GRADE_COLOR: Record<string, string> = {
  S: "#f4c75a", A: "#5fe1d5", B: "#5b8def", C: "#a78bfa", D: "#ff6b8a",
};

function Result() {
  const { id } = Route.useParams();
  const search = Route.useSearch();
  const quest = useMemo(() => QUESTS.find((q) => q.id === id), [id]);
  if (!quest) throw notFound();

  const skills: SkillKey[] = ["progress", "cost", "quality", "safety", "subcontractor", "client", "documentation"];
  const total = Math.round(
    skills.reduce((acc, k) => acc + search[k] * (quest.rubric[k] / 100), 0),
  );
  const grade = gradeFromTotal(total);
  const expGained = Math.round(quest.rewardExp * (total / 100));
  const titleGained = grade === "S" || grade === "A" ? quest.rewardTitle : undefined;

  const sorted = skills.map((k) => ({ k, v: search[k] })).sort((a, b) => b.v - a.v);
  const top = sorted[0];
  const weak = sorted[sorted.length - 1];

  const advices = [
    `本關於「${SKILL_LABEL[top.k]}」表現最佳（${top.v}），可考慮在團隊內擔任示範。`,
    `「${SKILL_LABEL[weak.k]}」是本次相對弱項（${weak.v}），建議下次優先強化。`,
    quest.type === "boss"
      ? "Boss 戰建議以數據與書面紀錄為主，避免情緒回應。"
      : "建議搭配知識庫對應 SOP，將判斷流程內化為團隊標準。",
  ];

  return (
    <div className="space-y-6">
      <div className="bq-panel bq-panel-glow p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bq-chip">QUEST CLEARED</span>
              <ChapterBadge n={quest.chapter} />
            </div>
            <h1 className="bq-display text-3xl sm:text-4xl font-extrabold mt-3">{quest.name}</h1>
            <p className="text-[var(--bq-text-dim)] mt-1">{quest.purpose}</p>
          </div>
          <div
            className="bq-display text-7xl font-extrabold leading-none"
            style={{ color: GRADE_COLOR[grade], textShadow: `0 0 28px ${GRADE_COLOR[grade]}66` }}
          >
            {grade}
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <Stat label="總分" value={total} accent="gold" />
          <Stat label="獲得 EXP" value={`+${expGained}`} accent="cyan" />
          <Stat label="評級" value={grade} accent="violet" />
          <Stat label="獲得稱號" value={titleGained ?? "—"} accent="rose" />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bq-panel p-5">
          <h2 className="bq-display text-sm tracking-widest text-[var(--bq-gold)] font-bold mb-4">七大能力得分</h2>
          <div className="space-y-3">
            {skills.map((k) => <StatBar key={k} skill={k} value={search[k]} variant="gold" />)}
          </div>
        </div>
        <div className="bq-panel p-5">
          <h2 className="bq-display text-sm tracking-widest text-[var(--bq-cyan)] font-bold mb-4">AI 改善建議</h2>
          <ul className="space-y-3 text-sm">
            {advices.map((a, i) => (
              <li key={i} className="flex gap-3">
                <span className="bq-display text-[var(--bq-gold)] mt-0.5">›</span>
                <span className="text-[var(--bq-text)]">{a}</span>
              </li>
            ))}
          </ul>
          <div className="bq-divider my-5" />
          <div className="text-xs text-[var(--bq-text-dim)] tracking-widest font-bold mb-2">下次訓練建議</div>
          <Link
            to="/buildquest/quests"
            className="block text-sm font-bold text-[var(--bq-gold)] hover:underline"
          >
            前往挑戰下一個強化能力的關卡 →
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-end">
        <button
          className="bq-btn bq-btn-ghost"
          onClick={() => alert("訓練報告下載功能將於正式版開放（PDF / Excel）。")}
        >
          ⬇ 下載訓練報告
        </button>
        <Link to="/buildquest/profile" className="bq-btn">查看能力值</Link>
        <Link to="/buildquest/hall" className="bq-btn bq-btn-gold">返回任務大廳</Link>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string | number; accent: "gold" | "cyan" | "violet" | "rose" }) {
  const color = { gold: "#f4c75a", cyan: "#5fe1d5", violet: "#a78bfa", rose: "#ff6b8a" }[accent];
  return (
    <div className="rounded-xl border border-[var(--bq-border)] p-3 bg-[rgba(255,255,255,0.02)]">
      <div className="text-[11px] tracking-widest text-[var(--bq-text-dim)] font-bold">{label}</div>
      <div className="bq-display text-2xl font-extrabold mt-1" style={{ color }}>{value}</div>
    </div>
  );
}

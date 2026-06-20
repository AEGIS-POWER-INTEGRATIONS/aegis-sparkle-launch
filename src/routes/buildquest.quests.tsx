import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MOCK_PLAYER, QUESTS } from "@/lib/buildquest/mock";
import { ChapterBadge, DifficultyDots } from "@/components/buildquest/shared";

export const Route = createFileRoute("/buildquest/quests")({
  component: QuestList,
});

const FILTERS: { id: "all" | "tutorial" | "field" | "negotiation" | "boss"; label: string }[] = [
  { id: "all", label: "全部" },
  { id: "tutorial", label: "教學" },
  { id: "field", label: "現場" },
  { id: "negotiation", label: "談判" },
  { id: "boss", label: "Boss" },
];

function QuestList() {
  const [filter, setFilter] = useState<typeof FILTERS[number]["id"]>("all");
  const quests = QUESTS.filter((q) => filter === "all" || q.type === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="bq-chip">QUEST INDEX</span>
          <h1 className="bq-display text-3xl font-extrabold mt-2">關卡列表</h1>
          <p className="text-[var(--bq-text-dim)] text-sm mt-1">10 個情境關卡，覆蓋真實工程管理場景。</p>
        </div>
        <div className="flex flex-wrap gap-1">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 text-xs font-bold rounded-md tracking-wider border transition ${
                filter === f.id
                  ? "bg-[var(--bq-gold)] text-[#20180a] border-[var(--bq-gold)]"
                  : "border-[var(--bq-border-strong)] text-[var(--bq-text-dim)] hover:text-[var(--bq-text)]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {quests.map((q) => {
          const done = MOCK_PLAYER.completedQuests.includes(q.id);
          return (
            <div key={q.id} className="bq-panel p-5 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <ChapterBadge n={q.chapter} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-lg">{q.name}</h3>
                    {q.type === "boss" && <span className="bq-chip bq-chip-rose">BOSS</span>}
                    {q.type === "negotiation" && <span className="bq-chip bq-chip-violet">談判</span>}
                    {q.type === "tutorial" && <span className="bq-chip bq-chip-cyan">教學</span>}
                    {done && <span className="bq-chip bq-chip-muted">已通關</span>}
                  </div>
                  <p className="text-sm text-[var(--bq-text-dim)] mt-1">{q.purpose}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-[var(--bq-text-dim)]">
                <div className="flex items-center gap-3">
                  <DifficultyDots n={q.difficulty} />
                  <span>對手：{q.aiPersona.name}</span>
                </div>
                <span className="bq-display text-[var(--bq-gold)]">+{q.rewardExp} EXP</span>
              </div>
              <div className="flex justify-end">
                <Link to="/buildquest/quest/$id" params={{ id: q.id }} className="bq-btn bq-btn-gold">
                  {done ? "再次挑戰" : "開始任務"} →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

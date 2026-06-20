import { createFileRoute, Link } from "@tanstack/react-router";
import { MOCK_PLAYER, QUESTS, SKILL_LABEL, type SkillKey } from "@/lib/buildquest/mock";
import { PlayerHUD, ChapterBadge, DifficultyDots, StatBar } from "@/components/buildquest/shared";

export const Route = createFileRoute("/buildquest/hall")({
  component: Hall,
});

function Hall() {
  const recommended = QUESTS.filter((q) => !MOCK_PLAYER.completedQuests.includes(q.id)).slice(0, 3);
  const topSkills = (Object.keys(SKILL_LABEL) as SkillKey[])
    .map((k) => ({ k, v: MOCK_PLAYER.stats[k] }))
    .sort((a, b) => b.v - a.v)
    .slice(0, 4);

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-6">
          <PlayerHUD />
          <div className="bq-panel p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="bq-display text-lg font-bold">推薦任務</h2>
              <Link to="/buildquest/quests" className="text-xs text-[var(--bq-gold)] hover:underline">查看全部 →</Link>
            </div>
            <div className="space-y-3">
              {recommended.map((q) => (
                <Link
                  key={q.id}
                  to="/buildquest/quest/$id"
                  params={{ id: q.id }}
                  className="flex items-center gap-4 p-3 rounded-xl border border-[var(--bq-border)] hover:border-[var(--bq-gold)]/50 hover:bg-[rgba(244,199,90,0.04)] transition"
                >
                  <ChapterBadge n={q.chapter} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold">{q.name}</span>
                      {q.type === "boss" && <span className="bq-chip bq-chip-rose">BOSS</span>}
                      {q.type === "negotiation" && <span className="bq-chip bq-chip-violet">談判</span>}
                    </div>
                    <p className="text-xs text-[var(--bq-text-dim)] mt-0.5 truncate">{q.purpose}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <DifficultyDots n={q.difficulty} />
                    <div className="bq-display text-xs text-[var(--bq-gold)] mt-1">+{q.rewardExp} EXP</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="bq-panel p-5">
            <h3 className="bq-display text-sm font-bold mb-3">今日狀態</h3>
            <ul className="text-sm space-y-2">
              <li className="flex justify-between"><span className="text-[var(--bq-text-dim)]">已完成任務</span><b>{MOCK_PLAYER.completedQuests.length}</b></li>
              <li className="flex justify-between"><span className="text-[var(--bq-text-dim)]">總訓練次數</span><b>{MOCK_PLAYER.runs}</b></li>
              <li className="flex justify-between"><span className="text-[var(--bq-text-dim)]">累積分數</span><b className="bq-display text-[var(--bq-gold)]">{MOCK_PLAYER.totalScore}</b></li>
            </ul>
          </div>
          <div className="bq-panel p-5">
            <h3 className="bq-display text-sm font-bold mb-3">能力高峰</h3>
            <div className="space-y-3">
              {topSkills.map((s) => <StatBar key={s.k} skill={s.k} value={s.v} variant="gold" />)}
            </div>
            <Link to="/buildquest/profile" className="block text-xs text-[var(--bq-gold)] hover:underline mt-4">查看完整能力雷達 →</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { CLASSES, QUESTS, SKILL_LABEL, TEAM, type SkillKey } from "@/lib/buildquest/mock";
import { ClassGlyph, StatBar } from "@/components/buildquest/shared";

export const Route = createFileRoute("/buildquest/admin")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const sorted = [...TEAM].sort((a, b) => b.avgScore - a.avgScore);
  const teamAvg = Math.round(TEAM.reduce((a, e) => a + e.avgScore, 0) / TEAM.length);
  const teamCompletion = Math.round((TEAM.filter((e) => e.runs >= 8).length / TEAM.length) * 100);

  // team weak skills aggregated
  const weakMap: Record<SkillKey, number> = {
    progress: 0, cost: 0, quality: 0, safety: 0, subcontractor: 0, client: 0, documentation: 0,
  };
  TEAM.forEach((e) => { weakMap[e.weakestSkill]++; });
  const weakRanking = (Object.keys(weakMap) as SkillKey[])
    .sort((a, b) => weakMap[b] - weakMap[a]);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <span className="bq-chip">COMMAND CENTER</span>
          <h1 className="bq-display text-3xl font-extrabold mt-2">專案主管後台</h1>
          <p className="text-[var(--bq-text-dim)] text-sm mt-1">監控團隊訓練進度、發掘弱項、提早預防專案風險。</p>
        </div>
        <Link to="/buildquest/admin-quests" className="bq-btn bq-btn-gold">管理關卡 →</Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KPI label="團隊成員" value={String(TEAM.length)} />
        <KPI label="平均分數" value={String(teamAvg)} accent />
        <KPI label="訓練完成率" value={`${teamCompletion}%`} />
        <KPI label="累計訓練次數" value={String(TEAM.reduce((a, e) => a + e.runs, 0))} />
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-4">
        <div className="bq-panel p-5">
          <h2 className="bq-display text-sm tracking-widest text-[var(--bq-gold)] font-bold mb-4">員工訓練列表</h2>
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[11px] tracking-widest text-[var(--bq-text-dim)]">
                  <th className="text-left px-2 py-2 font-bold">成員</th>
                  <th className="text-left px-2 py-2 font-bold">角色</th>
                  <th className="text-right px-2 py-2 font-bold">LV</th>
                  <th className="text-right px-2 py-2 font-bold">訓練次數</th>
                  <th className="text-right px-2 py-2 font-bold">平均分</th>
                  <th className="text-left px-2 py-2 font-bold">最弱關卡</th>
                  <th className="text-right px-2 py-2 font-bold">最近</th>
                </tr>
              </thead>
              <tbody>
                {TEAM.map((e) => {
                  const cls = CLASSES.find((c) => c.id === e.classId)!;
                  const weak = QUESTS.find((q) => q.id === e.weakestQuestId);
                  return (
                    <tr key={e.id} className="border-t border-[var(--bq-border)]">
                      <td className="px-2 py-2.5 font-semibold">{e.name}</td>
                      <td className="px-2 py-2.5">
                        <div className="flex items-center gap-2">
                          <ClassGlyph classId={e.classId} size={28} />
                          <span className="text-xs text-[var(--bq-text-dim)]">{cls.name}</span>
                        </div>
                      </td>
                      <td className="px-2 py-2.5 text-right bq-display text-[var(--bq-gold)]">{e.level}</td>
                      <td className="px-2 py-2.5 text-right">{e.runs}</td>
                      <td className="px-2 py-2.5 text-right bq-display font-bold">{e.avgScore}</td>
                      <td className="px-2 py-2.5 text-xs text-[var(--bq-rose)]">{weak?.name}</td>
                      <td className="px-2 py-2.5 text-right text-xs text-[var(--bq-text-dim)]">{e.lastActive}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="bq-panel p-5">
            <h3 className="bq-display text-sm tracking-widest text-[var(--bq-cyan)] font-bold mb-3">團隊排行榜</h3>
            <ol className="space-y-2 text-sm">
              {sorted.slice(0, 5).map((e, i) => (
                <li key={e.id} className="flex items-center gap-3">
                  <span
                    className="bq-display w-6 h-6 rounded-md flex items-center justify-center text-xs font-extrabold"
                    style={{
                      background: i === 0 ? "#f4c75a" : i === 1 ? "#5fe1d5" : i === 2 ? "#a78bfa" : "rgba(255,255,255,0.06)",
                      color: i < 3 ? "#0b0f1f" : "var(--bq-text-dim)",
                    }}
                  >{i + 1}</span>
                  <span className="flex-1">{e.name}</span>
                  <span className="bq-display text-[var(--bq-gold)] font-bold">{e.avgScore}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="bq-panel p-5">
            <h3 className="bq-display text-sm tracking-widest text-[var(--bq-rose)] font-bold mb-3">團隊弱項分析</h3>
            <div className="space-y-3">
              {weakRanking.slice(0, 4).map((k) => (
                <StatBar key={k} skill={k} value={100 - weakMap[k] * 20} variant="violet" />
              ))}
            </div>
            <p className="text-[11px] text-[var(--bq-text-dim)] mt-3">
              建議優先訓練：{SKILL_LABEL[weakRanking[0]]}、{SKILL_LABEL[weakRanking[1]]}。
            </p>
          </div>

          <div className="bq-panel p-5">
            <h3 className="bq-display text-sm tracking-widest text-[var(--bq-gold)] font-bold mb-2">專案風險學習報告</h3>
            <p className="text-xs text-[var(--bq-text-dim)] leading-relaxed">
              依據近 30 天訓練數據，本團隊在「變更追加」與「業主會議」情境失分最多，
              建議搭配《追加減工程申請範本》與《業主月會紀錄範本》進行專題演練。
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function KPI({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="bq-panel p-4">
      <div className="text-[11px] tracking-widest text-[var(--bq-text-dim)] font-bold">{label}</div>
      <div className={`bq-display text-3xl font-extrabold mt-1 ${accent ? "text-[var(--bq-gold)]" : "text-[var(--bq-text)]"}`}>{value}</div>
    </div>
  );
}

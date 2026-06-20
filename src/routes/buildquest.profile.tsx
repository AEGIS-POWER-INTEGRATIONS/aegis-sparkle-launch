import { createFileRoute, Link } from "@tanstack/react-router";
import { CLASSES, MOCK_PLAYER, QUESTS, SKILL_LABEL, type SkillKey } from "@/lib/buildquest/mock";
import { PlayerHUD, SkillRadar, StatBar, ChapterBadge } from "@/components/buildquest/shared";

export const Route = createFileRoute("/buildquest/profile")({
  component: Profile,
});

function Profile() {
  const p = MOCK_PLAYER;
  const cls = CLASSES.find((c) => c.id === p.classId)!;
  const skills = (Object.keys(SKILL_LABEL) as SkillKey[]).map((k) => ({ k, v: p.stats[k] }));
  const top = skills.reduce((a, b) => (b.v > a.v ? b : a));
  const weak = skills.reduce((a, b) => (b.v < a.v ? b : a));
  const recent = QUESTS.filter((q) => p.completedQuests.includes(q.id));
  const avg = Math.round(p.totalScore / Math.max(1, p.runs));

  return (
    <div className="space-y-6">
      <PlayerHUD />
      <div className="grid lg:grid-cols-[1fr_360px] gap-4">
        <div className="bq-panel p-5">
          <h2 className="bq-display text-sm tracking-widest text-[var(--bq-gold)] font-bold mb-2">能力雷達</h2>
          <p className="text-xs text-[var(--bq-text-dim)] mb-4">{cls.name} · 七大工程管理能力分布</p>
          <div className="flex justify-center"><SkillRadar stats={p.stats} size={320} /></div>
          <div className="grid sm:grid-cols-2 gap-3 mt-6">
            {skills.map((s) => <StatBar key={s.k} skill={s.k} value={s.v} variant="gold" />)}
          </div>
        </div>
        <aside className="space-y-4">
          <div className="bq-panel p-5 space-y-3 text-sm">
            <Row label="角色等級" value={`LV.${p.level}`} />
            <Row label="總經驗值" value={`${p.exp + (p.level - 1) * p.expToNext}`} />
            <Row label="已完成任務" value={String(p.completedQuests.length)} />
            <Row label="平均分數" value={String(avg)} accent />
            <Row label="最強能力" value={SKILL_LABEL[top.k]} accent />
            <Row label="最弱能力" value={SKILL_LABEL[weak.k]} />
          </div>
          <div className="bq-panel p-5">
            <h3 className="bq-display text-sm tracking-widest text-[var(--bq-cyan)] font-bold mb-3">最近完成任務</h3>
            <ul className="space-y-2">
              {recent.map((q) => (
                <li key={q.id}>
                  <Link
                    to="/buildquest/quest/$id"
                    params={{ id: q.id }}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[rgba(255,255,255,0.04)]"
                  >
                    <ChapterBadge n={q.chapter} />
                    <span className="text-sm flex-1">{q.name}</span>
                    <span className="text-[11px] text-[var(--bq-gold)]">通關</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-[var(--bq-text-dim)]">{label}</span>
      <span className={`bq-display font-bold ${accent ? "text-[var(--bq-gold)]" : "text-[var(--bq-text)]"}`}>{value}</span>
    </div>
  );
}

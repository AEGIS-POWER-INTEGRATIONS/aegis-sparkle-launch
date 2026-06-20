import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { QUESTS, SKILL_LABEL, type Quest, type SkillKey } from "@/lib/buildquest/mock";
import { ChapterBadge, DifficultyDots } from "@/components/buildquest/shared";

export const Route = createFileRoute("/buildquest/admin-quests")({
  component: QuestAdmin,
});

function QuestAdmin() {
  const [items, setItems] = useState<Quest[]>(QUESTS);
  const [editing, setEditing] = useState<string | null>(null);

  function toggle(id: string) {
    setItems((prev) => prev.map((q) => (q.id === id ? { ...q, enabled: !q.enabled } : q)));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <span className="bq-chip">QUEST CONFIG</span>
          <h1 className="bq-display text-3xl font-extrabold mt-2">關卡管理</h1>
          <p className="text-[var(--bq-text-dim)] text-sm mt-1">設定關卡內容、AI 角色、評分權重與啟用狀態。</p>
        </div>
        <div className="flex gap-2">
          <Link to="/buildquest/admin" className="bq-btn bq-btn-ghost">← 返回後台</Link>
          <button
            className="bq-btn bq-btn-gold"
            onClick={() => alert("新增關卡功能將於正式版開放。")}
          >＋ 新增關卡</button>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((q) => {
          const isEditing = editing === q.id;
          return (
            <div key={q.id} className="bq-panel p-5">
              <div className="flex items-start gap-4">
                <ChapterBadge n={q.chapter} />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-lg">{q.name}</h3>
                    <span className="bq-chip bq-chip-muted">{q.type}</span>
                    {q.enabled
                      ? <span className="bq-chip bq-chip-cyan">啟用中</span>
                      : <span className="bq-chip bq-chip-rose">停用</span>}
                    <DifficultyDots n={q.difficulty} />
                  </div>
                  <p className="text-sm text-[var(--bq-text-dim)] mt-1">{q.purpose}</p>

                  {isEditing && (
                    <div className="grid md:grid-cols-2 gap-3 mt-4 text-xs">
                      <Field label="AI 角色名稱" value={q.aiPersona.name} />
                      <Field label="AI 角色職務" value={q.aiPersona.role} />
                      <Field label="通關條件" value={q.winCondition} full />
                      <Field label="失敗條件" value={q.failCondition} full />
                      <div className="md:col-span-2">
                        <div className="text-[11px] tracking-widest text-[var(--bq-text-dim)] font-bold mb-2">評分標準（七大能力權重）</div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {(Object.keys(q.rubric) as SkillKey[]).map((k) => (
                            <div key={k} className="flex justify-between items-center px-2 py-1.5 rounded-md bg-[rgba(255,255,255,0.04)] border border-[var(--bq-border)]">
                              <span className="text-[var(--bq-text-dim)]">{SKILL_LABEL[k]}</span>
                              <span className="bq-display text-[var(--bq-gold)]">{q.rubric[k]}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    className="bq-btn bq-btn-ghost text-xs"
                    onClick={() => setEditing(isEditing ? null : q.id)}
                  >{isEditing ? "收合" : "編輯"}</button>
                  <button
                    className="bq-btn text-xs"
                    onClick={() => toggle(q.id)}
                  >{q.enabled ? "停用" : "啟用"}</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Field({ label, value, full }: { label: string; value: string; full?: boolean }) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <div className="text-[11px] tracking-widest text-[var(--bq-text-dim)] font-bold mb-1">{label}</div>
      <input className="bq-input" defaultValue={value} readOnly />
    </div>
  );
}

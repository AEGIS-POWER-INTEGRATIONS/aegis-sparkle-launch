import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CLASSES, SKILL_LABEL } from "@/lib/buildquest/mock";
import { ClassGlyph } from "@/components/buildquest/shared";

export const Route = createFileRoute("/buildquest/class-select")({
  component: ClassSelect,
});

function ClassSelect() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string>("commander");
  return (
    <div className="space-y-8">
      <div>
        <span className="bq-chip">CLASS SELECTION</span>
        <h1 className="bq-display text-3xl md:text-4xl font-extrabold mt-3">選擇你的工程角色</h1>
        <p className="text-[var(--bq-text-dim)] mt-2 max-w-2xl">
          每個職業對應一組真實工程職務與專精管理能力。選擇後即可進入任務大廳，
          系統會推薦最適合你的訓練路徑。
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CLASSES.map((c) => {
          const active = selected === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              className={`bq-panel text-left p-5 transition relative ${
                active ? "bq-panel-glow ring-2 ring-[var(--bq-gold)]/60" : "hover:translate-y-[-2px]"
              }`}
            >
              <div className="flex items-start gap-3">
                <ClassGlyph classId={c.id} size={52} />
                <div className="flex-1">
                  <div className="text-[11px] tracking-[0.2em] text-[var(--bq-text-dim)] font-bold">
                    {c.subtitle}
                  </div>
                  <h3 className="text-lg font-bold">{c.name}</h3>
                  <p className="text-xs text-[var(--bq-gold)] mt-0.5">{c.fit}</p>
                </div>
              </div>
              <p className="text-sm text-[var(--bq-text-dim)] mt-3 leading-relaxed">{c.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {c.primary.map((s) => (
                  <span key={s} className="bq-chip bq-chip-cyan">{SKILL_LABEL[s]}</span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end gap-2 sticky bottom-3">
        <button className="bq-btn bq-btn-ghost" onClick={() => navigate({ to: "/buildquest" })}>返回</button>
        <button className="bq-btn bq-btn-gold" onClick={() => navigate({ to: "/buildquest/hall" })}>
          確認角色，進入任務大廳 →
        </button>
      </div>
    </div>
  );
}

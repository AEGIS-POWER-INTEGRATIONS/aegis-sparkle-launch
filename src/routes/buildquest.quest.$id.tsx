import { createFileRoute, useNavigate, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MOCK_PLAYER, QUESTS, SKILL_LABEL, type DialogChoice, type SkillKey } from "@/lib/buildquest/mock";
import { ClassGlyph, ChapterBadge, DifficultyDots } from "@/components/buildquest/shared";

export const Route = createFileRoute("/buildquest/quest/$id")({
  component: QuestPlay,
  notFoundComponent: () => <div className="bq-panel p-6">找不到此關卡。</div>,
});

interface LogEntry {
  role: "ai" | "player" | "system";
  text: string;
  feedback?: string;
}

function QuestPlay() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const quest = useMemo(() => QUESTS.find((q) => q.id === id), [id]);
  if (!quest) throw notFound();

  const [turnIdx, setTurnIdx] = useState(0);
  const [log, setLog] = useState<LogEntry[]>([
    { role: "system", text: `任務開始：${quest.brief}` },
    { role: "ai", text: quest.turns[0].text },
  ]);
  const [scores, setScores] = useState<Record<SkillKey, number>>({
    progress: 50, cost: 50, quality: 50, safety: 50, subcontractor: 50, client: 50, documentation: 50,
  });
  const [input, setInput] = useState("");

  const currentTurn = quest.turns[turnIdx];
  const remaining = quest.turns.length - turnIdx;
  const done = turnIdx >= quest.turns.length;

  function applyChoice(c: DialogChoice) {
    setScores((prev) => {
      const next = { ...prev };
      for (const [k, v] of Object.entries(c.deltas)) {
        const key = k as SkillKey;
        next[key] = Math.max(0, Math.min(100, next[key] + (v as number)));
      }
      return next;
    });
    const newLog: LogEntry[] = [
      ...log,
      { role: "player", text: c.text },
      { role: "system", text: c.feedback },
    ];
    const nextIdx = turnIdx + 1;
    if (nextIdx < quest.turns.length) {
      newLog.push({ role: "ai", text: quest.turns[nextIdx].text });
    }
    setLog(newLog);
    setTurnIdx(nextIdx);
  }

  function finish() {
    const params = new URLSearchParams();
    (Object.keys(scores) as SkillKey[]).forEach((k) => params.set(k, String(scores[k])));
    navigate({ to: "/buildquest/result/$id", params: { id: quest.id }, search: Object.fromEntries(params) as never });
  }

  return (
    <div className="grid lg:grid-cols-[260px_1fr_260px] gap-4">
      {/* LEFT: player + mission */}
      <aside className="space-y-4 order-2 lg:order-1">
        <div className="bq-panel p-4">
          <div className="flex items-center gap-3">
            <ClassGlyph classId={MOCK_PLAYER.classId} size={44} />
            <div>
              <div className="bq-display text-xs text-[var(--bq-gold)]">LV.{MOCK_PLAYER.level}</div>
              <div className="font-bold text-sm">{MOCK_PLAYER.name}</div>
              <div className="text-[11px] text-[var(--bq-text-dim)]">{MOCK_PLAYER.title}</div>
            </div>
          </div>
          <div className="mt-3 text-xs">
            <div className="flex justify-between text-[var(--bq-text-dim)] mb-1"><span>EXP</span><span>{MOCK_PLAYER.exp}/{MOCK_PLAYER.expToNext}</span></div>
            <div className="bq-bar bq-bar-gold"><span style={{ width: `${(MOCK_PLAYER.exp / MOCK_PLAYER.expToNext) * 100}%` }} /></div>
          </div>
        </div>
        <div className="bq-panel p-4 space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <ChapterBadge n={quest.chapter} />
            <div>
              <div className="font-bold">{quest.name}</div>
              <DifficultyDots n={quest.difficulty} />
            </div>
          </div>
          <div>
            <div className="text-[11px] text-[var(--bq-text-dim)] tracking-widest font-bold">任務目標</div>
            <p className="text-xs mt-1 text-[var(--bq-text)]">{quest.purpose}</p>
          </div>
          <div>
            <div className="text-[11px] text-[var(--bq-text-dim)] tracking-widest font-bold">通關條件</div>
            <p className="text-xs mt-1">{quest.winCondition}</p>
          </div>
          <div>
            <div className="text-[11px] text-[var(--bq-text-dim)] tracking-widest font-bold">失敗條件</div>
            <p className="text-xs mt-1 text-[var(--bq-rose)]">{quest.failCondition}</p>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-[var(--bq-border)]">
            <span className="text-[11px] text-[var(--bq-text-dim)]">剩餘回合</span>
            <span className="bq-display text-[var(--bq-gold)] font-bold">{Math.max(0, remaining)}</span>
          </div>
        </div>
      </aside>

      {/* CENTER: dialog */}
      <section className="bq-panel bq-panel-glow p-5 space-y-4 order-1 lg:order-2 min-h-[60vh] flex flex-col">
        <div className="flex items-center gap-3 pb-3 border-b border-[var(--bq-border)]">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#a78bfa] to-[#5b8def] flex items-center justify-center bq-display font-extrabold text-lg text-white">
            {quest.aiPersona.name.slice(0, 1)}
          </div>
          <div>
            <div className="font-bold">{quest.aiPersona.name}</div>
            <div className="text-[11px] text-[var(--bq-text-dim)]">{quest.aiPersona.role}｜{quest.aiPersona.tone}</div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[50vh]">
          {log.map((entry, i) => {
            if (entry.role === "system") {
              return (
                <div key={i} className="text-[11px] text-center text-[var(--bq-text-dim)] tracking-widest">
                  ◇ {entry.text} ◇
                </div>
              );
            }
            const isAi = entry.role === "ai";
            return (
              <div key={i} className={`flex ${isAi ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    isAi
                      ? "bg-[rgba(167,139,250,0.12)] border border-[rgba(167,139,250,0.35)] rounded-bl-sm"
                      : "bg-[rgba(244,199,90,0.16)] border border-[rgba(244,199,90,0.45)] text-[var(--bq-gold-soft)] rounded-br-sm"
                  }`}
                >
                  {entry.text}
                </div>
              </div>
            );
          })}
        </div>

        {!done ? (
          <div className="space-y-2 pt-3 border-t border-[var(--bq-border)]">
            <div className="text-[11px] text-[var(--bq-text-dim)] tracking-widest font-bold">選擇你的判斷</div>
            <div className="space-y-2">
              {currentTurn.choices.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => applyChoice(c)}
                  className="w-full text-left p-3 rounded-xl border border-[var(--bq-border)] hover:border-[var(--bq-gold)]/60 hover:bg-[rgba(244,199,90,0.05)] transition text-sm"
                >
                  <span className="bq-display text-[var(--bq-gold)] mr-2">{String.fromCharCode(65 + i)}.</span>
                  {c.text}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 pt-2">
              <input
                className="bq-input flex-1"
                placeholder="或自行輸入回覆（AI 模式 v2 啟用）"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button className="bq-btn bq-btn-ghost text-xs" onClick={() => { setInput(""); }}>送出</button>
            </div>
          </div>
        ) : (
          <div className="pt-4 border-t border-[var(--bq-border)] flex justify-end">
            <button className="bq-btn bq-btn-gold" onClick={finish}>結算任務 →</button>
          </div>
        )}
      </section>

      {/* RIGHT: skill hints */}
      <aside className="space-y-4 order-3">
        <div className="bq-panel p-4">
          <h3 className="bq-display text-xs tracking-widest text-[var(--bq-gold)] font-bold mb-3">本關評分權重</h3>
          <ul className="space-y-2 text-xs">
            {(Object.keys(quest.rubric) as SkillKey[]).map((k) => (
              <li key={k} className="flex justify-between">
                <span className="text-[var(--bq-text-dim)]">{SKILL_LABEL[k]}</span>
                <span className="bq-display text-[var(--bq-text)]">{quest.rubric[k]}%</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bq-panel p-4">
          <h3 className="bq-display text-xs tracking-widest text-[var(--bq-cyan)] font-bold mb-3">即時能力指標</h3>
          <ul className="space-y-2 text-xs">
            {(Object.keys(scores) as SkillKey[]).map((k) => (
              <li key={k}>
                <div className="flex justify-between mb-1"><span className="text-[var(--bq-text-dim)]">{SKILL_LABEL[k]}</span><span>{scores[k]}</span></div>
                <div className="bq-bar"><span style={{ width: `${scores[k]}%` }} /></div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}

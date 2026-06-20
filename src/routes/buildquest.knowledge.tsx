import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { KNOWLEDGE, type KnowledgeItem } from "@/lib/buildquest/mock";

export const Route = createFileRoute("/buildquest/knowledge")({
  component: Knowledge,
});

const CATEGORIES: (KnowledgeItem["category"] | "全部")[] = [
  "全部", "SOP", "工安規範", "施工檢查表", "進度回報", "會議紀錄", "追加減", "驗收文件",
];

function Knowledge() {
  const [cat, setCat] = useState<typeof CATEGORIES[number]>("全部");
  const [q, setQ] = useState("");
  const items = KNOWLEDGE.filter((k) => (cat === "全部" || k.category === cat) && (q === "" || k.title.includes(q) || k.summary.includes(q)));

  return (
    <div className="space-y-6">
      <div>
        <span className="bq-chip">KNOWLEDGE LIBRARY</span>
        <h1 className="bq-display text-3xl font-extrabold mt-2">工程知識庫</h1>
        <p className="text-[var(--bq-text-dim)] text-sm mt-1">SOP、工安規範、檢查表、回報與驗收文件範本，做為訓練判斷的依據。</p>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <input
          className="bq-input md:max-w-sm"
          placeholder="搜尋文件 …"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="flex flex-wrap gap-1">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-3 py-1.5 text-xs font-bold rounded-md tracking-wider border transition ${
                cat === c
                  ? "bg-[var(--bq-gold)] text-[#20180a] border-[var(--bq-gold)]"
                  : "border-[var(--bq-border-strong)] text-[var(--bq-text-dim)] hover:text-[var(--bq-text)]"
              }`}
            >{c}</button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {items.map((k) => (
          <article key={k.id} className="bq-panel p-5">
            <div className="flex items-center justify-between">
              <span className="bq-chip bq-chip-violet">{k.category}</span>
              <span className="text-[11px] text-[var(--bq-text-dim)]">更新 {k.updatedAt}</span>
            </div>
            <h3 className="font-bold text-lg mt-3">{k.title}</h3>
            <p className="text-sm text-[var(--bq-text-dim)] mt-1 leading-relaxed">{k.summary}</p>
            <div className="flex justify-end mt-4">
              <button
                className="bq-btn bq-btn-ghost text-xs"
                onClick={() => alert(`「${k.title}」完整內容將於正式版開放。`)}
              >開啟範本 →</button>
            </div>
          </article>
        ))}
        {items.length === 0 && (
          <div className="bq-panel p-8 text-center text-[var(--bq-text-dim)] md:col-span-2">沒有符合的文件。</div>
        )}
      </div>
    </div>
  );
}

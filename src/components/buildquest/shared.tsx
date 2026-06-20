import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { CLASSES, MOCK_PLAYER, SKILL_LABEL, type ClassId, type SkillKey } from "@/lib/buildquest/mock";

export function BqShell({ children }: { children: ReactNode }) {
  return <div className="bq">{children}</div>;
}

const NAV: { to: string; label: string }[] = [
  { to: "/buildquest/hall", label: "任務大廳" },
  { to: "/buildquest/quests", label: "關卡列表" },
  { to: "/buildquest/profile", label: "能力值" },
  { to: "/buildquest/knowledge", label: "知識庫" },
  { to: "/buildquest/admin", label: "主管後台" },
];

export function BqNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <header className="border-b border-[var(--bq-border)] backdrop-blur-md sticky top-0 z-30 bg-[#0b0f1f]/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
        <Link to="/buildquest" className="flex items-center gap-2">
          <span className="bq-display text-[var(--bq-gold)] text-lg font-extrabold tracking-widest">AEGIS</span>
          <span className="text-[var(--bq-text)] text-sm font-bold tracking-widest">BUILDQUEST</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 text-sm">
          {NAV.map((n) => {
            const active = pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`px-3 py-1.5 rounded-md font-semibold tracking-wide transition ${
                  active
                    ? "text-[var(--bq-gold)] bg-[rgba(244,199,90,0.08)]"
                    : "text-[var(--bq-text-dim)] hover:text-[var(--bq-text)]"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <Link to="/" className="text-xs text-[var(--bq-text-dim)] hover:text-[var(--bq-gold)] hidden sm:inline">
          ← 返回官網
        </Link>
      </div>
    </header>
  );
}

export function BqFooter() {
  return (
    <footer className="mt-16 border-t border-[var(--bq-border)] py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-xs text-[var(--bq-text-dim)] flex flex-col sm:flex-row justify-between gap-2">
        <p>Aegis BuildQuest｜AI 工程管理修煉系統 · MVP 原型</p>
        <p>本系統為原創訓練平台，不使用任何受版權保護之遊戲素材。</p>
      </div>
    </footer>
  );
}

export function PlayerHUD({ compact = false }: { compact?: boolean }) {
  const p = MOCK_PLAYER;
  const cls = CLASSES.find((c) => c.id === p.classId)!;
  const pct = Math.round((p.exp / p.expToNext) * 100);
  return (
    <div className={`bq-panel bq-panel-glow p-4 ${compact ? "" : "md:p-5"}`}>
      <div className="flex items-center gap-4">
        <ClassGlyph classId={cls.id} size={compact ? 44 : 56} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bq-display text-[var(--bq-gold)] text-sm font-bold">LV.{p.level}</span>
            <span className="font-bold text-base truncate">{p.name}</span>
            <span className="bq-chip bq-chip-violet">{cls.name}</span>
          </div>
          <p className="text-xs text-[var(--bq-text-dim)] mt-1">稱號：{p.title}</p>
          <div className="mt-2 flex items-center gap-2 text-xs">
            <span className="text-[var(--bq-text-dim)] w-8">EXP</span>
            <div className="bq-bar bq-bar-gold flex-1"><span style={{ width: `${pct}%` }} /></div>
            <span className="bq-display text-[var(--bq-gold)]">{p.exp}/{p.expToNext}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const ACCENT_HEX: Record<string, string> = {
  gold: "#f4c75a", cyan: "#5fe1d5", violet: "#a78bfa", rose: "#ff6b8a", green: "#66e39a", blue: "#5b8def",
};

export function ClassGlyph({ classId, size = 48 }: { classId: ClassId; size?: number }) {
  const cls = CLASSES.find((c) => c.id === classId)!;
  const color = ACCENT_HEX[cls.accent];
  return (
    <div
      className="flex items-center justify-center rounded-xl relative shrink-0"
      style={{
        width: size, height: size,
        background: `radial-gradient(circle at 30% 30%, ${color}33, transparent 70%), #0e1430`,
        border: `1px solid ${color}66`,
        boxShadow: `0 0 24px -6px ${color}55`,
      }}
    >
      <span className="bq-display font-extrabold" style={{ color, fontSize: size * 0.5 }}>{cls.glyph}</span>
    </div>
  );
}

export function StatBar({
  skill, value, max = 100, variant = "default",
}: { skill: SkillKey; value: number; max?: number; variant?: "default" | "gold" | "violet" }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const cls = variant === "gold" ? "bq-bar bq-bar-gold" : variant === "violet" ? "bq-bar bq-bar-violet" : "bq-bar";
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-[var(--bq-text-dim)]">{SKILL_LABEL[skill]}</span>
        <span className="bq-display text-[var(--bq-text)] font-bold">{value}</span>
      </div>
      <div className={cls}><span style={{ width: `${pct}%` }} /></div>
    </div>
  );
}

// Pure SVG radar for the 7 skills.
export function SkillRadar({ stats, size = 280 }: { stats: Record<SkillKey, number>; size?: number }) {
  const keys: SkillKey[] = ["progress", "cost", "quality", "safety", "subcontractor", "client", "documentation"];
  const cx = size / 2, cy = size / 2, r = size / 2 - 36;
  const angle = (i: number) => (Math.PI * 2 * i) / keys.length - Math.PI / 2;
  const point = (i: number, v: number) => {
    const rr = (v / 100) * r;
    return [cx + rr * Math.cos(angle(i)), cy + rr * Math.sin(angle(i))] as const;
  };
  const grid = [20, 40, 60, 80, 100];
  const polygon = keys.map((k, i) => point(i, stats[k]).join(",")).join(" ");
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
      {grid.map((g) => (
        <polygon
          key={g}
          points={keys.map((_, i) => point(i, g).join(",")).join(" ")}
          fill="none" stroke="rgba(160,180,240,0.12)" strokeWidth="1"
        />
      ))}
      {keys.map((_, i) => {
        const [x, y] = point(i, 100);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(160,180,240,0.1)" />;
      })}
      <polygon points={polygon} fill="rgba(244,199,90,0.22)" stroke="#f4c75a" strokeWidth="2" />
      {keys.map((k, i) => {
        const [x, y] = point(i, 118);
        return (
          <text key={k} x={x} y={y} fontSize="11" fill="#9aa4cc" textAnchor="middle" dominantBaseline="middle">
            {SKILL_LABEL[k]}
          </text>
        );
      })}
    </svg>
  );
}

export function ChapterBadge({ n }: { n: number }) {
  return (
    <span
      className="bq-display inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-extrabold"
      style={{
        background: "linear-gradient(180deg, #1d2658, #0f1530)",
        border: "1px solid rgba(244,199,90,0.45)",
        color: "#f4c75a",
      }}
    >
      {String(n).padStart(2, "0")}
    </span>
  );
}

export function DifficultyDots({ n }: { n: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: i <= n ? "#f4c75a" : "rgba(255,255,255,0.15)" }}
        />
      ))}
    </span>
  );
}

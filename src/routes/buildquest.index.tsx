import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/buildquest/")({
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  return (
    <div className="grid md:grid-cols-2 gap-8 items-center min-h-[70vh]">
      <div className="space-y-5">
        <span className="bq-chip">MISSION ONLINE</span>
        <h1 className="bq-display text-4xl md:text-5xl font-extrabold leading-tight">
          進入 <span className="text-[var(--bq-gold)]">BuildQuest</span>
          <br />工程管理修煉場
        </h1>
        <p className="text-[var(--bq-text-dim)] max-w-md leading-relaxed">
          這不是遊戲，這是 AI 工程管理訓練平台。
          選擇你的工程角色，挑戰 10 種真實工程情境，
          建立可被量化的管理判斷力。
        </p>
        <ul className="space-y-2 text-sm text-[var(--bq-text-dim)]">
          <li>· 6 種工程角色職業，對應實際職務</li>
          <li>· 10 個情境關卡，涵蓋進度、成本、工安、包商、業主、驗收</li>
          <li>· AI 任務評分 + 七大能力雷達分析</li>
          <li>· 主管後台可查看團隊弱項與訓練紀錄</li>
        </ul>
      </div>

      <div className="bq-panel bq-panel-glow p-6 sm:p-8">
        <div className="text-xs tracking-[0.2em] text-[var(--bq-gold)] font-bold mb-2">LOGIN</div>
        <h2 className="text-2xl font-bold mb-6">指揮官登入</h2>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-[var(--bq-text-dim)] block mb-1">識別代號 / 姓名</label>
            <input
              className="bq-input"
              placeholder="例如：李 PM"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs text-[var(--bq-text-dim)] block mb-1">通行碼</label>
            <input className="bq-input" type="password" placeholder="••••••••" defaultValue="demo-pass" />
          </div>
          <button
            className="bq-btn bq-btn-gold w-full mt-2"
            onClick={() => navigate({ to: "/buildquest/class-select" })}
          >
            進入修煉場 →
          </button>
          <p className="text-[11px] text-[var(--bq-text-dim)] text-center">
            原型版本：點擊即可進入，未連接真實帳號系統
          </p>
        </div>
        <div className="bq-divider my-6" />
        <div className="flex justify-between text-xs text-[var(--bq-text-dim)]">
          <Link to="/buildquest/knowledge" className="bq-link-row">查看知識庫</Link>
          <Link to="/" className="bq-link-row">返回 Aegis 官網</Link>
        </div>
      </div>
    </div>
  );
}

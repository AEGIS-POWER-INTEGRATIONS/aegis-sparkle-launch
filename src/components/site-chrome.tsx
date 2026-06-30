import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import logoAsset from "@/assets/api-logo.png.asset.json";

function Brand({ size = "md" }: { size?: "md" | "lg" }) {
  const imgCls = size === "lg" ? "h-14 w-14 md:h-16 md:w-16" : "h-11 w-11 md:h-12 md:w-12";
  const titleCls = size === "lg" ? "text-xl md:text-2xl" : "text-[17px] md:text-[19px]";
  const subCls = size === "lg" ? "text-[11px] md:text-xs" : "text-[10px] md:text-[11px]";
  return (
    <Link to="/" className="flex items-center gap-4">
      <img
        src={logoAsset.url}
        alt="宏鼎集成 Aegis Power Integrations"
        className={`${imgCls} object-contain shrink-0`}
      />
      <div className="leading-tight">
        <div className={`${titleCls} font-semibold tracking-tight text-foreground`}>宏鼎集成</div>
        <div className={`${subCls} text-muted-foreground tracking-[0.14em] font-medium mt-0.5`}>
          AEGIS POWER INTEGRATIONS
        </div>
      </div>
    </Link>
  );
}

const navItems = [
  { to: "/", label: "首頁" },
  { to: "/about", label: "關於宏鼎" },
  { to: "/engineering", label: "工程集成" },
  { to: "/energy-experience", label: "工程經驗" },
  { to: "/ai-integration", label: "AI 系統整合" },
  { to: "/costflow", label: "Aegis 產品線" },
  { to: "/pricing", label: "價格方案" },
  { to: "/contact", label: "聯絡我們" },
] as const;

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="container-x flex h-20 md:h-24 items-center justify-between gap-6">
        <Brand />

        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground lg:flex">
          {navItems.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/demo" className="btn btn-primary">預約諮詢</Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface/60">
      <div className="container-x grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Brand size="lg" />
          <p className="mt-5 text-base font-semibold text-foreground">
            宏鼎集成股份有限公司
          </p>
          <p className="text-xs text-muted-foreground tracking-[0.14em] font-medium mt-1">
            AEGIS POWER INTEGRATIONS CO., LTD.
          </p>
          <p className="mt-4 text-sm text-muted-foreground max-w-md leading-relaxed">
            AI 時代的工程與企業系統整合夥伴，提供工程集成、AI 系統整合與 Aegis Business Apps 模組化企業系統。
          </p>
        </div>

        <div className="text-sm md:col-span-2">
          <div className="font-semibold mb-3">服務</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/engineering" className="hover:text-foreground">工程集成</Link></li>
            <li><Link to="/energy-experience" className="hover:text-foreground">能源工程經驗</Link></li>
            <li><Link to="/ai-integration" className="hover:text-foreground">AI 系統整合</Link></li>
            <li><Link to="/costflow" className="hover:text-foreground">Aegis 產品線</Link></li>
            <li><Link to="/pricing" className="hover:text-foreground">價格方案</Link></li>
          </ul>
        </div>

        <div className="text-sm md:col-span-2">
          <div className="font-semibold mb-3">公司</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">關於宏鼎</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">聯絡我們</Link></li>
            <li><Link to="/demo" className="hover:text-foreground">預約諮詢</Link></li>
          </ul>
        </div>

        <div className="text-sm md:col-span-3">
          <div className="font-semibold mb-3">聯絡資訊</div>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-foreground/70" />
              <span>台中市西區台灣大道二段2號20樓</span>
            </li>
            <li className="flex gap-2">
              <Mail className="h-4 w-4 mt-0.5 shrink-0 text-foreground/70" />
              <a href="mailto:jtianfalcon@gmail.com" className="hover:text-foreground break-all">
                jtianfalcon@gmail.com
              </a>
            </li>
            <li className="flex gap-2">
              <Phone className="h-4 w-4 mt-0.5 shrink-0 text-foreground/70" />
              <span>歡迎透過表單預約諮詢</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="container-x py-5 text-xs text-muted-foreground flex flex-wrap justify-between gap-2">
          <span>© 2026 宏鼎集成股份有限公司 Aegis Power Integrations Co., Ltd. All rights reserved.</span>
          <span>工程集成｜AI 系統整合｜企業管理系統導入</span>
        </div>
      </div>
    </footer>
  );
}

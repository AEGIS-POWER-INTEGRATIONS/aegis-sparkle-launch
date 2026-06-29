import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/api-logo.png.asset.json";

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <img
        src={logoAsset.url}
        alt="宏鼎集成 Aegis Power Integrations"
        className="h-10 w-10 object-contain"
      />
      <div className="leading-tight">
        <div className="text-[15px] font-semibold tracking-tight">宏鼎集成</div>
        <div className="text-[10px] text-muted-foreground tracking-wider">AEGIS POWER INTEGRATIONS</div>
      </div>
    </Link>
  );
}

const navItems = [
  { to: "/", label: "首頁" },
  { to: "/about", label: "關於宏鼎" },
  { to: "/engineering", label: "工程集成" },
  { to: "/ai-integration", label: "AI 系統整合" },
  { to: "/costflow", label: "Aegis 產品線" },
  { to: "/pricing", label: "價格方案" },
  { to: "/contact", label: "聯絡我們" },
] as const;

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-6">
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
      <div className="container-x grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Brand />
          <p className="mt-4 text-sm text-muted-foreground max-w-md leading-relaxed">
            宏鼎集成股份有限公司｜Aegis Power Integrations Co., Ltd.<br />
            AI 時代的工程與企業系統整合夥伴，提供工程集成、AI 系統整合與 Aegis Business Apps 模組化企業系統。
          </p>
        </div>
        <div className="text-sm">
          <div className="font-semibold mb-3">服務</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/engineering" className="hover:text-foreground">工程集成</Link></li>
            <li><Link to="/ai-integration" className="hover:text-foreground">AI 系統整合</Link></li>
            <li><Link to="/costflow" className="hover:text-foreground">Aegis 產品線</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <div className="font-semibold mb-3">公司</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">關於宏鼎</Link></li>
            <li><Link to="/pricing" className="hover:text-foreground">價格方案</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">聯絡我們</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="container-x py-5 text-xs text-muted-foreground flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} 宏鼎集成股份有限公司 Aegis Power Integrations Co., Ltd. All rights reserved.</span>
          <span>工程集成 · AI 系統整合 · 企業管理系統</span>
        </div>
      </div>
    </footer>
  );
}

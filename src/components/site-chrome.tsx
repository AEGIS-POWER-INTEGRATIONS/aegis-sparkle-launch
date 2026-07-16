import { Link } from "@tanstack/react-router";
import { Mail, MapPin } from "lucide-react";
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
          <Link to="/contact" className="btn btn-primary">Contact Us</Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface/60">
      <div className="container-x grid gap-10 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Brand size="lg" />
          <p className="mt-5 text-base font-semibold text-foreground">
            宏鼎集成股份有限公司
          </p>
          <p className="text-xs text-muted-foreground tracking-[0.14em] font-medium mt-1">
            AEGIS POWER INTEGRATIONS CO., LTD.
          </p>
          <p className="mt-4 text-sm text-muted-foreground max-w-md leading-relaxed">
            Engineering × AI × Digital Transformation. Enterprise integration
            partner for semiconductor, data center, manufacturing and enterprise
            customers.
          </p>

          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-foreground/70" />
              <span>台中市西區台灣大道二段2號20樓</span>
            </li>
            <li className="flex gap-2">
              <Mail className="h-4 w-4 mt-0.5 shrink-0 text-foreground/70" />
              <a href="mailto:johnny@aegispowerapi.com" className="hover:text-foreground break-all">
                johnny@aegispowerapi.com
              </a>
            </li>
            <li className="flex gap-2">
              <Mail className="h-4 w-4 mt-0.5 shrink-0 text-foreground/70" />
              <a href="mailto:sales@aegispowerapi.com" className="hover:text-foreground break-all">
                sales@aegispowerapi.com
              </a>
            </li>
          </ul>
        </div>

        <div className="text-sm md:col-span-2">
          <div className="font-semibold mb-3">Engineering</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/engineering" className="hover:text-foreground">Engineering Integration</Link></li>
            <li><Link to="/energy-experience" className="hover:text-foreground">Project Experience</Link></li>
          </ul>
        </div>

        <div className="text-sm md:col-span-2">
          <div className="font-semibold mb-3">AI Integration</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/ai-integration" className="hover:text-foreground">AI System Integration</Link></li>
            <li><Link to="/ai-launch" className="hover:text-foreground">Aegis AI Launch</Link></li>
          </ul>
        </div>

        <div className="text-sm md:col-span-2">
          <div className="font-semibold mb-3">Business Applications</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/costflow" className="hover:text-foreground">Aegis CostFlow</Link></li>
            <li><Link to="/salesops" className="hover:text-foreground">Aegis SalesOps</Link></li>
            <li><Link to="/pricing" className="hover:text-foreground">Pricing</Link></li>
          </ul>
        </div>

        <div className="text-sm md:col-span-2">
          <div className="font-semibold mb-3">Company</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><Link to="/demo" className="hover:text-foreground">Book Consultation</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="container-x py-6 text-xs text-muted-foreground flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1.5">
            <span>© 2026 宏鼎集成股份有限公司 Aegis Power Integrations Co., Ltd. All rights reserved.</span>
            <span>Engineering Integration｜AI System Integration｜Enterprise Applications</span>
          </div>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

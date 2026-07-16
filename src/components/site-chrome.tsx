import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import logoAsset from "@/assets/api-logo.png.asset.json";
import { L, useLang } from "@/lib/i18n";
import { SITE } from "@/lib/site-config";



function Brand({ size = "md" }: { size?: "md" | "lg" }) {
  // Icon sizes: mobile 32px, desktop 40px (lg variant used in footer bumps up).
  const imgCls =
    size === "lg"
      ? "h-11 w-11 md:h-12 md:w-12"
      : "h-8 w-8 md:h-10 md:w-10";
  // Chinese title: bold, tight line-height per spec.
  const titleCls =
    size === "lg"
      ? "text-[19px] md:text-[22px]"
      : "text-[16px] md:text-[18px]";
  // English subtitle: medium weight, ~0.06em tracking.
  const subCls =
    size === "lg"
      ? "text-[10px] md:text-[11px]"
      : "text-[9px] md:text-[10px]";
  return (
    <Link
      to="/"
      className="flex items-center gap-[10px] md:gap-3 shrink-0 leading-none"
      aria-label="宏鼎集成 Aegis Power Integrations"
    >
      <img
        src={logoAsset.url}
        alt="宏鼎集成 AEGIS POWER INTEGRATIONS 標誌"
        className={`${imgCls} object-contain shrink-0 block`}
      />

      <span className="flex flex-col justify-center min-w-0">
        <span
          className={`${titleCls} font-bold tracking-tight text-foreground`}
          style={{ lineHeight: 1.05 }}
        >
          宏鼎集成
        </span>
        <span
          className={`${subCls} text-muted-foreground font-medium uppercase mt-[3px] whitespace-nowrap`}
          style={{ letterSpacing: "0.06em", lineHeight: 1.1 }}
        >
          AEGIS POWER INTEGRATIONS
        </span>
      </span>
    </Link>
  );
}

const navItems = [
  { to: "/", zh: "首頁", en: "Home" },
  { to: "/about", zh: "關於我們", en: "About" },
  { to: "/engineering", zh: "工程服務", en: "Engineering" },
  { to: "/ai-integration", zh: "AI 系統整合", en: "AI Integration" },
  { to: "/industries", zh: "產業解決方案", en: "Industry Solutions" },
  { to: "/costflow", zh: "企業應用", en: "Business Apps" },
  { to: "/knowledge", zh: "知識中心", en: "Knowledge Center" },
  { to: "/insights", zh: "案例與觀點", en: "Insights & Stories" },
  { to: "/pricing", zh: "價格方案", en: "Pricing" },
  { to: "/contact", zh: "聯絡我們", en: "Contact" },
] as const;

function LangSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  const btn =
    "px-1.5 py-0.5 rounded-sm transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary";
  const active = "text-foreground font-semibold";
  const idle = "text-muted-foreground hover:text-foreground";
  return (
    <div
      className={`flex items-center gap-0.5 text-xs font-medium ${className}`}
      role="group"
      aria-label="Language switcher"
    >
      <button
        type="button"
        onClick={() => setLang("zh-TW")}
        aria-pressed={lang === "zh-TW"}
        aria-label="切換為繁體中文"
        className={`${btn} ${lang === "zh-TW" ? active : idle}`}
      >
        中文
      </button>
      <span className="text-muted-foreground/40" aria-hidden="true">|</span>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        aria-label="Switch to English"
        className={`${btn} ${lang === "en" ? active : idle}`}
      >
        EN
      </button>
    </div>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);

  // Close menu on Escape and lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="container-x flex h-[72px] md:h-[76px] items-center justify-between gap-4">
        <Brand />

        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground lg:flex">
          {navItems.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="whitespace-nowrap hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              <L zh={n.zh} en={n.en} />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-3">
            <LangSwitcher />
            <Link to="/contact" className="btn btn-primary">
              <L zh="聯絡我們" en="Contact Us" />
            </Link>
          </div>
          <button
            type="button"
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-md border border-border/70 text-foreground hover:bg-surface/60 transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-nav"
          className="lg:hidden border-t border-border/60 bg-background/95 backdrop-blur"
        >
          <div className="container-x py-4 flex flex-col gap-1">
            <nav className="flex flex-col divide-y divide-border/50">
              {navItems.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="py-3 text-base font-medium text-foreground/90 hover:text-foreground"
                  activeProps={{ className: "py-3 text-base font-semibold text-foreground" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  <L zh={n.zh} en={n.en} />
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex items-center justify-between gap-4 pt-4 border-t border-border/60">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                <L zh="語言" en="Language" />
              </div>
              <LangSwitcher className="text-sm" />
            </div>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn btn-primary mt-4 w-full justify-center"
            >
              <L zh="聯絡我們" en="Contact Us" />
            </Link>
          </div>
        </div>
      )}
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
            <L
              zh="工程整合 × AI 導入 × 企業數位轉型。為半導體、資料中心、製造業與企業客戶提供整合服務。"
              en="Engineering × AI × Digital Transformation. Enterprise integration partner for semiconductor, data center, manufacturing and enterprise customers."
            />
          </p>

          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-foreground/70" />
              <span>
                <L zh={SITE.address.zh} en={SITE.address.en} />
              </span>
            </li>
            <li className="flex gap-2">
              <Phone className="h-4 w-4 mt-0.5 shrink-0 text-foreground/70" />
              <a href={`tel:${SITE.phone}`} className="hover:text-foreground">
                {SITE.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-2">
              <Mail className="h-4 w-4 mt-0.5 shrink-0 text-foreground/70" />
              <a
                href={`mailto:${SITE.emails.general}`}
                className="hover:text-foreground break-all"
              >
                {SITE.emails.general}
              </a>
            </li>
            <li className="flex gap-2">
              <Mail className="h-4 w-4 mt-0.5 shrink-0 text-foreground/70" />
              <a
                href={`mailto:${SITE.emails.sales}`}
                className="hover:text-foreground break-all"
              >
                {SITE.emails.sales}
              </a>
            </li>
          </ul>
        </div>


        <div className="text-sm md:col-span-2">
          <div className="font-semibold mb-3">
            <L zh="工程服務" en="Engineering" />
          </div>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <Link to="/engineering" className="hover:text-foreground">
                <L zh="工程集成服務" en="Engineering Integration" />
              </Link>
            </li>
            <li>
              <Link to="/energy-experience" className="hover:text-foreground">
                <L zh="專案經驗" en="Project Experience" />
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-sm md:col-span-2">
          <div className="font-semibold mb-3">
            <L zh="AI 系統整合" en="AI Integration" />
          </div>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <Link to="/ai-integration" className="hover:text-foreground">
                <L zh="AI 系統整合" en="AI System Integration" />
              </Link>
            </li>
            <li>
              <Link to="/ai-launch" className="hover:text-foreground">
                Aegis AI Launch
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-sm md:col-span-2">
          <div className="font-semibold mb-3">
            <L zh="企業應用" en="Business Applications" />
          </div>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <Link to="/costflow" className="hover:text-foreground">
                Aegis CostFlow
              </Link>
            </li>
            <li>
              <Link to="/salesops" className="hover:text-foreground">
                Aegis SalesOps
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="hover:text-foreground">
                <L zh="價格方案" en="Pricing" />
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-sm md:col-span-2">
          <div className="font-semibold mb-3">
            <L zh="關於我們" en="Company" />
          </div>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <Link to="/about" className="hover:text-foreground">
                <L zh="關於宏鼎" en="About" />
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-foreground">
                <L zh="聯絡我們" en="Contact" />
              </Link>
            </li>
            <li>
              <Link to="/demo" className="hover:text-foreground">
                <L zh="預約諮詢" en="Book Consultation" />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="container-x py-6 text-xs text-muted-foreground flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1.5">
            <span>
              © 2026 宏鼎集成股份有限公司 Aegis Power Integrations Co., Ltd.{" "}
              <L zh="版權所有。" en="All rights reserved." />
            </span>
            <span>
              <L
                zh="工程整合｜AI 系統整合｜企業應用"
                en="Engineering Integration｜AI System Integration｜Enterprise Applications"
              />
            </span>
          </div>
          <div className="flex gap-5 items-center">
            <Link to="/privacy" className="hover:text-foreground">
              <L zh="隱私權政策" en="Privacy Policy" />
            </Link>
            <Link to="/terms" className="hover:text-foreground">
              <L zh="使用條款" en="Terms" />
            </Link>
            <LangSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Link } from "@tanstack/react-router";
import { ChevronDown, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import logoAsset from "@/assets/api-logo.png.asset.json";
import markAsset from "@/assets/api-mark.png.asset.json";
import { L, useLang } from "@/lib/i18n";
import { PRIMARY_CTA, PRIMARY_NAV, SITE, type NavItem } from "@/lib/site-config";

function Brand({ variant = "header" }: { variant?: "header" | "footer" }) {
  if (variant === "footer") {
    return (
      <Link
        to="/"
        className="inline-flex items-center shrink-0"
        aria-label="宏鼎集成 Aegis Power Integrations"
      >
        <img
          src={logoAsset.url}
          alt="宏鼎集成 AEGIS POWER INTEGRATIONS 標誌"
          className="w-[180px] md:w-[200px] h-auto object-contain block"
        />
      </Link>
    );
  }

  return (
    <Link
      to="/"
      className="flex items-center gap-3 md:gap-3.5 shrink-0 leading-none"
      aria-label="宏鼎集成 Aegis Power Integrations"
    >
      <img
        src={markAsset.url}
        alt="宏鼎集成 AEGIS POWER INTEGRATIONS 標誌"
        className="h-[42px] w-[42px] md:h-[50px] md:w-[50px] object-contain shrink-0 block"
      />
      <span className="flex flex-col justify-center min-w-0">
        <span
          className="text-[18px] md:text-[22px] font-bold tracking-tight text-foreground"
          style={{ lineHeight: 1.05 }}
        >
          宏鼎集成
        </span>
        <span
          className="text-[10px] md:text-[11px] text-muted-foreground font-medium uppercase mt-[3px] whitespace-nowrap"
          style={{ letterSpacing: "0.06em", lineHeight: 1.1 }}
        >
          AEGIS POWER INTEGRATIONS
        </span>
      </span>
    </Link>
  );
}

/**
 * Language switcher — temporarily hidden while the English version is
 * incomplete. Site is served as zh-Hant-TW by default. Re-enable once the
 * English translation is fully audited.
 */
function LangSwitcher(_: { className?: string }) {
  return null;
}


/** Desktop nav item with hover/focus dropdown for children. */
function NavItemDesktop({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };
  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  if (!item.children || item.children.length === 0) {
    return (
      <Link
        to={item.to}
        className="whitespace-nowrap text-muted-foreground hover:text-foreground transition-colors"
        activeProps={{ className: "text-foreground" }}
        activeOptions={{ exact: item.to === "/" }}
      >
        <L zh={item.zh} en={item.en} />
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <Link
        to={item.to}
        className="inline-flex items-center gap-1 whitespace-nowrap text-muted-foreground hover:text-foreground transition-colors"
        activeProps={{ className: "text-foreground" }}
      >
        <L zh={item.zh} en={item.en} />
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </Link>

      {open && (
        <div
          className="absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3"
          role="menu"
        >
          <div className="rounded-xl border border-border/70 bg-background/98 shadow-lift backdrop-blur p-1.5">
            {item.children.map((c) => (
              <Link
                key={c.to}
                to={c.to}
                className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-surface/70 hover:text-foreground transition-colors"
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                <L zh={c.zh} en={c.en} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/** Mobile accordion nav item. */
function NavItemMobile({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = !!item.children?.length;

  return (
    <div className="border-b border-border/40 last:border-b-0">
      <div className="flex items-center">
        <Link
          to={item.to}
          onClick={onNavigate}
          className="flex-1 py-3.5 text-base font-medium text-foreground/90 hover:text-foreground"
          activeProps={{ className: "flex-1 py-3.5 text-base font-semibold text-foreground" }}
          activeOptions={{ exact: item.to === "/" }}
        >
          <L zh={item.zh} en={item.en} />
        </Link>
        {hasChildren && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-label={expanded ? "收合子選單" : "展開子選單"}
            className="grid h-11 w-11 place-items-center text-muted-foreground hover:text-foreground"
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        )}
      </div>
      {hasChildren && expanded && (
        <div className="pb-3 pl-3">
          {item.children!.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              onClick={onNavigate}
              className="block py-2 pl-3 border-l border-border/50 text-sm text-muted-foreground hover:text-foreground"
            >
              <L zh={c.zh} en={c.en} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);

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
      <div className="container-x flex h-[84px] md:h-[88px] items-center justify-between gap-4">
        <Brand />

        <nav className="hidden items-center gap-7 text-sm font-medium xl:flex">
          {PRIMARY_NAV.map((n) => (
            <NavItemDesktop key={n.to} item={n} />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden xl:flex items-center gap-4">
            <LangSwitcher />
            <Link to={PRIMARY_CTA.to} className="btn btn-primary">
              <L zh={PRIMARY_CTA.zh} en={PRIMARY_CTA.en} />
            </Link>
          </div>
          <button
            type="button"
            className="xl:hidden inline-flex h-11 w-11 items-center justify-center rounded-md border border-border/70 text-foreground hover:bg-surface/60 transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="xl:hidden border-t border-border/60 bg-background/98 backdrop-blur max-h-[calc(100vh-84px)] overflow-y-auto"
        >
          <div className="container-x py-3">
            <nav className="flex flex-col">
              {PRIMARY_NAV.map((n) => (
                <NavItemMobile key={n.to} item={n} onNavigate={() => setOpen(false)} />
              ))}
            </nav>

            <Link
              to={PRIMARY_CTA.to}
              onClick={() => setOpen(false)}
              className="btn btn-primary mt-5 w-full justify-center"
            >
              <L zh={PRIMARY_CTA.zh} en={PRIMARY_CTA.en} />
            </Link>

            <div className="mt-5 flex items-center justify-between gap-4 pt-4 border-t border-border/60">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                <L zh="語言" en="Language" />
              </div>
              <LangSwitcher className="text-sm" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border bg-surface/60">
      <div className="container-x grid gap-10 py-16 md:grid-cols-12">
        {/* Company */}
        <div className="md:col-span-4">
          <Brand variant="footer" />
          <p className="mt-5 text-base font-semibold text-foreground">
            {SITE.legalName.zh}
          </p>
          <p className="text-xs text-muted-foreground tracking-[0.14em] font-medium mt-1">
            {SITE.legalName.en.toUpperCase()}
          </p>
          <p className="mt-4 text-sm text-muted-foreground max-w-md leading-relaxed">
            <L zh={SITE.positioning.zh} en={SITE.positioning.en} />
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
          </ul>
        </div>

        {/* Services */}
        <div className="text-sm md:col-span-3">
          <div className="font-semibold mb-3">
            <L zh="服務" en="Services" />
          </div>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <Link to="/engineering" className="hover:text-foreground">
                <L zh="工程服務" en="Engineering" />
              </Link>
            </li>
            <li>
              <Link to="/ai-integration" className="hover:text-foreground">
                <L zh="企業 AI 顧問" en="AI Advisory" />
              </Link>
            </li>
            <li>
              <Link to="/industries" className="hover:text-foreground">
                <L zh="產業方案" en="Industries" />
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="hover:text-foreground">
                <L zh="合作方式" en="Engagement" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Company links */}
        <div className="text-sm md:col-span-2">
          <div className="font-semibold mb-3">
            <L zh="公司" en="Company" />
          </div>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <Link to="/about" className="hover:text-foreground">
                <L zh="關於宏鼎" en="About" />
              </Link>
            </li>
            <li>
              <Link to="/company-profile" className="hover:text-foreground">
                <L zh="公司簡介" en="Company Profile" />
              </Link>
            </li>
            <li>
              <Link to="/insights" className="hover:text-foreground">
                <L zh="案例與觀點" en="Insights" />
              </Link>
            </li>
            <li>
              <Link to="/knowledge" className="hover:text-foreground">
                <L zh="知識中心" en="Knowledge" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal + Contact */}
        <div className="text-sm md:col-span-3">
          <div className="font-semibold mb-3">
            <L zh="聯絡與法務" en="Contact & Legal" />
          </div>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <Link to="/contact" className="hover:text-foreground">
                <L zh="聯絡我們" en="Contact" />
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-foreground">
                <L zh="隱私權政策" en="Privacy Policy" />
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-foreground">
                <L zh="網站使用條款" en="Terms of Service" />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="container-x py-6 text-xs text-muted-foreground flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <span>
            © {year} {SITE.legalName.zh} {SITE.legalName.en}{" "}
            <L zh="版權所有。" en="All rights reserved." />
          </span>
          <div className="flex gap-5 items-center">
            <LangSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}

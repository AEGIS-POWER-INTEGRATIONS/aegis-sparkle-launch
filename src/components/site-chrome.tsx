import { Link } from "@tanstack/react-router";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-ink-foreground font-bold tracking-tight">
            A
          </span>
          <span className="font-semibold tracking-tight">Aegis Business Apps</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          <Link to="/costflow" className="hover:text-foreground transition-colors">CostFlow</Link>
          <Link to="/salesops" className="hover:text-foreground transition-colors">SalesOps</Link>
          <Link to="/ai-launch" className="hover:text-foreground transition-colors">AI Launch</Link>
          <Link to="/pricing" className="hover:text-foreground transition-colors">價格</Link>
          <Link to="/demo" className="hover:text-foreground transition-colors">預約 Demo</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/pricing" className="btn btn-ghost hidden sm:inline-flex">看方案</Link>
          <Link to="/demo" className="btn btn-primary">預約 Demo</Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface/60">
      <div className="container-x grid gap-8 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-ink-foreground font-bold">A</span>
            <span className="font-semibold">Aegis Business Apps</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            AI × 模組化系統 × 中小企業營運升級。把客製系統經驗，產品化成可訂閱的企業 App。
          </p>
        </div>
        <div className="text-sm">
          <div className="font-semibold mb-3">產品</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/costflow" className="hover:text-foreground">Aegis CostFlow</Link></li>
            <li><Link to="/salesops" className="hover:text-foreground">Aegis SalesOps</Link></li>
            <li><Link to="/ai-launch" className="hover:text-foreground">Aegis AI Launch</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <div className="font-semibold mb-3">公司</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/pricing" className="hover:text-foreground">價格方案</Link></li>
            <li><Link to="/demo" className="hover:text-foreground">預約 Demo</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="container-x py-5 text-xs text-muted-foreground flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} Aegis Business Apps. All rights reserved.</span>
          <span>Built for 工程公司與中小企業</span>
        </div>
      </div>
    </footer>
  );
}

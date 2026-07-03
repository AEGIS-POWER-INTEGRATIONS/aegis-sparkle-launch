import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "宏鼎集成｜AI 時代的工程與企業系統整合夥伴" },
      { name: "description", content: "宏鼎集成股份有限公司 Aegis Power Integrations Co., Ltd.｜提供工程集成、AI 系統整合與 Aegis Business Apps 企業管理系統，服務台灣工程公司、製造業與中小企業。" },
      { name: "keywords", content: "宏鼎集成, Aegis Power Integrations, 工程集成, 系統整合, AI 系統整合, 企業管理系統, 工程報價系統, 業務管理系統, CRM, 弱電工程, 光纖建置, 資料中心, 能源機電工程, 太陽光電, 儲能系統, 台灣工程公司, 製造業數位化, 中小企業 AI, Aegis CostFlow, Aegis SalesOps" },
      { name: "author", content: "宏鼎集成股份有限公司" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "宏鼎集成｜AI 時代的工程與企業系統整合夥伴" },
      { property: "og:description", content: "結合工程現場、企業流程與 AI 技術，協助企業建立可落地的數位化能力。" },
      { property: "og:site_name", content: "宏鼎集成股份有限公司 Aegis Power Integrations" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "zh_TW" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "宏鼎集成｜AI 時代的工程與企業系統整合夥伴" },
      { name: "twitter:description", content: "工程集成、AI 系統整合、Aegis 企業管理系統，一站式數位化服務。" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "宏鼎集成股份有限公司",
          alternateName: "Aegis Power Integrations Co., Ltd.",
          url: "https://aegis-sparkle-launch.lovable.app",
          description: "提供工程集成、AI 系統整合與 Aegis Business Apps 企業管理系統的台灣工程科技公司。",
          areaServed: "TW",
          knowsAbout: [
            "工程集成",
            "AI 系統整合",
            "企業管理系統",
            "弱電與光纖工程",
            "資料中心",
            "能源與機電工程",
            "太陽光電與儲能",
          ],
        }),
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}

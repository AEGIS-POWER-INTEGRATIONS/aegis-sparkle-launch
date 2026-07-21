import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "sonner";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { LanguageProvider, L } from "@/lib/i18n";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          <L zh="找不到頁面" en="Page not found" />
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          <L
            zh="您嘗試訪問的頁面不存在，或已被移動。"
            en="The page you're looking for doesn't exist or has been moved."
          />
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <L zh="返回首頁" en="Go home" />
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
          <L zh="頁面載入失敗" en="This page didn't load" />
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          <L
            zh="系統暫時發生問題，請重新整理或返回首頁。"
            en="Something went wrong on our end. You can try refreshing or head back home."
          />
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <L zh="重新嘗試" en="Try again" />
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            <L zh="返回首頁" en="Go home" />
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  beforeLoad: ({ location }) => {
    // Internal Lovable email routes handle their own auth; do not redirect them.
    if (location.pathname.startsWith("/lovable/")) return;
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "google-site-verification", content: "8r_Aj_GTimjEbblZu-3P5dnQ1VVIZlsclWnH2J_abR4" },
      { title: "AEGIS POWER INTEGRATIONS｜工程整合、AI 導入與企業數位轉型" },
      { name: "description", content: "宏鼎集成股份有限公司 Aegis Power Integrations Co., Ltd.｜提供資料中心、產業工程、系統整合、AI 導入、流程自動化及企業數位應用服務，協助企業提升專案執行與營運效率。" },
      { name: "keywords", content: "宏鼎集成, Aegis Power Integrations, 工程集成, 系統整合, AI 系統整合, 企業管理系統, 工程報價系統, 業務管理系統, CRM, 弱電工程, 光纖建置, 資料中心, 能源機電工程, 太陽光電, 儲能系統, 台灣工程公司, 製造業數位化, 中小企業 AI, Aegis CostFlow, Aegis SalesOps" },
      { name: "author", content: "宏鼎集成股份有限公司" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "AEGIS POWER INTEGRATIONS｜工程整合、AI 導入與企業數位轉型" },
      { property: "og:description", content: "結合工程現場、企業流程與 AI 技術，協助企業建立可落地的數位化能力。" },
      { property: "og:site_name", content: "宏鼎集成股份有限公司 Aegis Power Integrations" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "zh_TW" },
      { property: "og:locale:alternate", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AEGIS POWER INTEGRATIONS｜Engineering & AI Integration" },
      { name: "twitter:description", content: "Engineering integration, data center services, AI implementation and enterprise digital solutions." },
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
          "@id": "https://aegispowerapi.com/#organization",
          name: "宏鼎集成",
          legalName: "宏鼎集成股份有限公司",
          alternateName: [
            "AEGIS POWER INTEGRATIONS",
            "Aegis Power Integrations Co., Ltd.",
          ],
          url: "https://aegispowerapi.com/",
          logo: "https://aegispowerapi.com/__l5e/assets-v1/ac05f61c-af8a-40fd-985b-4b747d757366/api-logo.png",
          email: [
            "jtian@aegispowerapi.com",
            "sales@aegispowerapi.com",
          ],
          address: {
            "@type": "PostalAddress",
            streetAddress: "台灣大道二段2號20樓",
            addressLocality: "西區",
            addressRegion: "台中市",
            addressCountry: "TW",
          },
          areaServed: { "@type": "Country", name: "Taiwan" },
          knowsAbout: [
            "Engineering Integration",
            "AI System Integration",
            "Enterprise Applications",
            "Structured Cabling & Fiber Optic",
            "Data Centers",
            "Energy & Mechanical Engineering",
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": "https://aegispowerapi.com/#website",
          url: "https://aegispowerapi.com/",
          name: "宏鼎集成",
          alternateName: "AEGIS POWER INTEGRATIONS",
          publisher: { "@id": "https://aegispowerapi.com/#organization" },
          inLanguage: ["zh-Hant-TW", "en"],
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
    <html lang="zh-Hant-TW">

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
      <LanguageProvider>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
        <Toaster position="bottom-right" richColors closeButton />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

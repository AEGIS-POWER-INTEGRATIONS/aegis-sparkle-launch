import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service｜Aegis Power Integrations" },
      { name: "description", content: "宏鼎集成股份有限公司 Aegis Power Integrations 網站使用條款。" },
      { property: "og:title", content: "Terms of Service｜Aegis Power Integrations" },
      { property: "og:url", content: `${SITE_URL}/terms` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/terms` }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="py-20 md:py-28">
          <div className="container-x max-w-3xl">
            <span className="eyebrow"><span className="dot" /> Legal</span>
            <h1 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight">Terms of Service</h1>
            <p className="mt-3 text-sm text-muted-foreground tracking-widest uppercase">使用條款</p>

            <div className="mt-10 space-y-6 text-muted-foreground leading-relaxed text-sm">
              <p>
                本頁由宏鼎集成股份有限公司 Aegis Power Integrations Co., Ltd.（以下簡稱「本公司」）維護，
                規範您使用本網站及線上資訊的相關條件。
              </p>

              <h2 className="text-foreground text-lg font-semibold mt-8">1. Website Content｜網站內容</h2>
              <p>
                本網站所刊載之公司介紹、服務內容、產品功能與案例說明僅供參考，
                實際服務範圍、規格與商業條件以雙方合約為準。
              </p>

              <h2 className="text-foreground text-lg font-semibold mt-8">2. Intellectual Property｜智慧財產權</h2>
              <p>
                本網站所有內容包含文字、圖片、標誌、Logo 與品牌名稱，均為本公司或授權人之財產，
                未經授權不得複製、修改、傳播或用於商業用途。
              </p>

              <h2 className="text-foreground text-lg font-semibold mt-8">3. Third-Party Links｜第三方連結</h2>
              <p>
                本網站可能包含指向第三方網站之連結，本公司不對其內容、隱私政策或運作方式負責。
              </p>

              <h2 className="text-foreground text-lg font-semibold mt-8">4. Limitation of Liability｜責任限制</h2>
              <p>
                本公司對於使用本網站所產生之任何直接或間接損失不負賠償責任，
                但因本公司故意或重大過失所致者，不在此限。
              </p>

              <h2 className="text-foreground text-lg font-semibold mt-8">5. Governing Law｜準據法</h2>
              <p>
                本條款以中華民國法律為準據法，因本條款所生之爭議，
                雙方合意以台灣台中地方法院為第一審管轄法院。
              </p>

              <p className="text-xs mt-10">
                本條款為一般性說明，最終法律版本以本公司公告或雙方合約為準。
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

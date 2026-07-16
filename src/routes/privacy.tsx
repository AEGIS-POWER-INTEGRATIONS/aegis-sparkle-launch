import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy｜Aegis Power Integrations" },
      { name: "description", content: "宏鼎集成股份有限公司 Aegis Power Integrations 隱私權政策。" },
      { property: "og:title", content: "Privacy Policy｜Aegis Power Integrations" },
      { property: "og:url", content: `${SITE_URL}/privacy` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/privacy` }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="py-20 md:py-28">
          <div className="container-x max-w-3xl">
            <span className="eyebrow"><span className="dot" /> Legal</span>
            <h1 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight">Privacy Policy</h1>
            <p className="mt-3 text-sm text-muted-foreground tracking-widest uppercase">隱私權政策</p>

            <div className="prose prose-sm mt-10 max-w-none text-muted-foreground leading-relaxed space-y-6">
              <p>
                本頁由宏鼎集成股份有限公司 Aegis Power Integrations Co., Ltd.（以下簡稱「本公司」）維護，
                說明本公司在網站與服務過程中，如何蒐集、使用與保護您的個人資料。
              </p>

              <h2 className="text-foreground text-lg font-semibold mt-8">1. Information We Collect｜蒐集資訊</h2>
              <p>
                當您填寫諮詢表單或與本公司聯繫時，我們可能會蒐集姓名、公司、職稱、電話、Email
                與需求說明等資訊，用於後續聯繫、報價與服務洽談。
              </p>

              <h2 className="text-foreground text-lg font-semibold mt-8">2. Use of Information｜資料用途</h2>
              <p>
                本公司僅將您的資料用於服務諮詢、專案評估、報價與後續合作，
                不會將您的個人資料出售或提供予無關第三方。
              </p>

              <h2 className="text-foreground text-lg font-semibold mt-8">3. Data Protection｜資料保護</h2>
              <p>
                本公司採取合理的技術與管理措施保護您的個人資料，
                包括存取控制、傳輸加密與定期檢視。
              </p>

              <h2 className="text-foreground text-lg font-semibold mt-8">4. Cookies｜Cookie 使用</h2>
              <p>
                本網站可能使用必要之 Cookie 以提供基本服務與流量分析，您可透過瀏覽器設定管理 Cookie。
              </p>

              <h2 className="text-foreground text-lg font-semibold mt-8">5. Contact｜聯絡方式</h2>
              <p>
                如對本政策有任何疑問，請透過 <a href="mailto:johnny@aegispowerapi.com" className="text-primary hover:underline">johnny@aegispowerapi.com</a> 與本公司聯繫。
              </p>

              <p className="text-xs mt-10">
                本政策為一般性說明，最終法律版本以本公司公告或雙方合約為準。
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

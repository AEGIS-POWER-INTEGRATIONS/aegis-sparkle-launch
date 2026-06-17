import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { Check, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "預約 Demo｜Aegis Business Apps" },
      { name: "description", content: "預約 Aegis Business Apps 產品 Demo 與 AI 導入諮詢。" },
      { property: "og:title", content: "預約 Demo｜Aegis Business Apps" },
      { property: "og:description", content: "顧問依照產業、團隊規模與目前使用的工具，建議最適合的導入方案。" },
    ],
  }),
  component: Demo,
});

function Demo() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="py-20">
          <div className="container-x max-w-3xl">
            <span className="eyebrow"><span className="dot" /> Book a Demo</span>
            <h1 className="mt-6 text-4xl md:text-5xl">預約 Demo，確認你的企業最適合先導入哪一套系統。</h1>
            <p className="mt-5 text-lg text-muted-foreground">
              請留下基本資料，顧問會依照你的產業、團隊規模與目前使用的工具，建議最適合的導入方案。
            </p>
          </div>
        </section>

        <section className="pb-24">
          <div className="container-x grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="panel p-7 h-fit">
              <h3 className="text-xl">Demo 會議會討論什麼？</h3>
              <ul className="mt-5 space-y-3">
                {[
                  "目前公司流程與資料痛點",
                  "適合先導入 CostFlow、SalesOps 或 AI Launch",
                  "是否需要 Excel 匯入、LINE 串接或報表儀表板",
                  "導入時程、費用與第一階段驗收方式",
                ].map((t) => (
                  <li key={t} className="flex gap-3 text-sm"><Check className="h-5 w-5 mt-0.5 text-gold flex-none" /><span>{t}</span></li>
                ))}
              </ul>
              <div className="mt-7 rounded-lg border border-border bg-surface/50 p-4 text-sm">
                <div className="font-semibold mb-1">回覆時間</div>
                <div className="text-muted-foreground">工作日 24 小時內由顧問與你聯繫，安排 30 分鐘線上 Demo。</div>
              </div>
            </div>

            <div className="panel-lift p-8">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-gold mx-auto"><Check className="h-7 w-7" /></div>
                  <h3 className="mt-5 text-2xl">已收到你的預約需求</h3>
                  <p className="mt-3 text-muted-foreground">顧問將於 24 小時內與你聯繫，敬請留意 Email。</p>
                </div>
              ) : (
                <form
                  className="space-y-5"
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                >
                  <Field label="姓名" required>
                    <input className={inputCx} name="name" placeholder="請輸入姓名" required />
                  </Field>
                  <Field label="公司名稱" required>
                    <input className={inputCx} name="company" placeholder="請輸入公司名稱" required />
                  </Field>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Email" required>
                      <input className={inputCx} type="email" name="email" placeholder="you@example.com" required />
                    </Field>
                    <Field label="聯絡電話">
                      <input className={inputCx} name="phone" placeholder="選填" />
                    </Field>
                  </div>
                  <Field label="想了解的產品">
                    <select className={inputCx} name="product" defaultValue="Aegis CostFlow｜工程成本分析平台">
                      <option>Aegis CostFlow｜工程成本分析平台</option>
                      <option>Aegis SalesOps｜AI 業務管理系統</option>
                      <option>Aegis AI Launch｜企業 AI 導入</option>
                      <option>還不確定，想先請顧問建議</option>
                    </select>
                  </Field>
                  <Field label="目前遇到的問題">
                    <textarea
                      className={`${inputCx} min-h-[110px]`}
                      name="message"
                      placeholder="例如：報價都靠 Excel、業務回報很零散、想導入 AI 但不知道怎麼開始..."
                    />
                  </Field>
                  <button type="submit" className="btn btn-primary w-full">
                    送出預約需求 <Send className="h-4 w-4" />
                  </button>
                  <p className="text-xs text-muted-foreground">
                    ※ 此表單為示意。正式上線可串接 Google Form、Tally、HubSpot、LINE Notify 或 CRM。
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

const inputCx =
  "w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">
        {label}{required && <span className="text-gold ml-0.5">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { Check, Send, ShieldCheck, AlertCircle } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "預約諮詢｜Aegis Business Apps" },
      { name: "description", content: "預約 Aegis Business Apps 產品 Demo 與 AI 導入諮詢。顧問會在 1 個工作日內回覆。" },
      { property: "og:title", content: "預約諮詢｜Aegis Business Apps" },
      { property: "og:description", content: "顧問依照產業、團隊規模與目前使用的工具，提出最適合的導入方案。" },
    ],
  }),
  component: Demo,
});

const schema = z.object({
  name: z.string().trim().min(1, "請輸入姓名").max(100),
  company: z.string().trim().min(1, "請輸入公司名稱").max(200),
  job_title: z.string().trim().max(100).optional().or(z.literal("")),
  email: z.string().trim().email("Email 格式不正確").max(255),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  industry: z.string().trim().max(100).optional().or(z.literal("")),
  product_interest: z.string().trim().min(1).max(200),
  problem: z.string().trim().max(2000).optional().or(z.literal("")),
});

type FormState = z.infer<typeof schema>;

const initial: FormState = {
  name: "", company: "", job_title: "", email: "", phone: "",
  industry: "", product_interest: "Aegis CostFlow｜工程成本分析平台", problem: "",
};

function Demo() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of result.error.issues) {
        const k = issue.path[0] as keyof FormState;
        if (!fieldErrors[k]) fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("demo_requests").insert({
      name: result.data.name,
      company: result.data.company,
      job_title: result.data.job_title || null,
      email: result.data.email,
      phone: result.data.phone || null,
      industry: result.data.industry || null,
      product_interest: result.data.product_interest,
      problem: result.data.problem || null,
      source: typeof window !== "undefined" ? window.location.href : null,
    });
    setSubmitting(false);
    if (error) {
      setServerError("送出失敗，請稍後再試，或來信至 hello@aegis.app");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="py-20">
          <div className="container-x max-w-3xl">
            <span className="eyebrow"><span className="dot" /> 預約諮詢</span>
            <h1 className="mt-6 text-4xl md:text-5xl">預約諮詢，<br className="hidden md:block" />讓顧問建議最適合先導入的方案。</h1>
            <p className="mt-5 text-lg text-muted-foreground">
              填寫下方表單後，顧問將於 <span className="font-semibold text-foreground">1 個工作日內</span> 與您聯繫，安排 30 分鐘的線上 Demo 與導入評估。
            </p>
          </div>
        </section>

        <section className="pb-24">
          <div className="container-x grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-5 h-fit">
              <div className="panel p-7">
                <h3 className="text-xl">Demo 會議會討論什麼？</h3>
                <ul className="mt-5 space-y-3">
                  {[
                    "貴公司目前流程與資料痛點",
                    "適合先導入 CostFlow、SalesOps 或 AI Launch",
                    "Excel 匯入、LINE 串接、報表儀表板需求評估",
                    "導入時程、費用估算與第一階段驗收方式",
                  ].map((t) => (
                    <li key={t} className="flex gap-3 text-sm"><Check className="h-5 w-5 mt-0.5 text-gold flex-none" /><span>{t}</span></li>
                  ))}
                </ul>
              </div>
              <div className="panel p-6 flex gap-3">
                <ShieldCheck className="h-5 w-5 mt-0.5 text-gold flex-none" />
                <div className="text-sm">
                  <div className="font-semibold">資料安全</div>
                  <div className="text-muted-foreground mt-1">您提供的資訊僅供 Aegis Business Apps 顧問團隊聯繫使用，不會分享給第三方。</div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                也可以直接來信：<a href="mailto:hello@aegis.app" className="text-foreground font-medium underline underline-offset-4">hello@aegis.app</a>
              </div>
            </div>

            <div className="panel-lift p-8">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-gold mx-auto"><Check className="h-7 w-7" /></div>
                  <h3 className="mt-5 text-2xl">已收到您的預約需求</h3>
                  <p className="mt-3 text-muted-foreground max-w-md mx-auto">
                    顧問將於 1 個工作日內以 Email 與您聯繫，安排 30 分鐘線上 Demo。請留意您填寫的信箱。
                  </p>
                </div>
              ) : (
                <form className="space-y-5" onSubmit={onSubmit} noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="姓名" required error={errors.name}>
                      <input className={cx(errors.name)} value={form.name} maxLength={100}
                        onChange={(e) => update("name", e.target.value)} placeholder="王先生" />
                    </Field>
                    <Field label="職稱" error={errors.job_title}>
                      <input className={cx(errors.job_title)} value={form.job_title} maxLength={100}
                        onChange={(e) => update("job_title", e.target.value)} placeholder="總經理 / 業務主管 / IT 經理" />
                    </Field>
                  </div>

                  <Field label="公司名稱" required error={errors.company}>
                    <input className={cx(errors.company)} value={form.company} maxLength={200}
                      onChange={(e) => update("company", e.target.value)} placeholder="○○工程有限公司" />
                  </Field>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Email" required error={errors.email}>
                      <input type="email" className={cx(errors.email)} value={form.email} maxLength={255}
                        onChange={(e) => update("email", e.target.value)} placeholder="you@company.com" />
                    </Field>
                    <Field label="聯絡電話" error={errors.phone}>
                      <input className={cx(errors.phone)} value={form.phone} maxLength={50}
                        onChange={(e) => update("phone", e.target.value)} placeholder="02-1234-5678 / 09xx-xxx-xxx" />
                    </Field>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="產業" error={errors.industry}>
                      <select className={cx(errors.industry)} value={form.industry}
                        onChange={(e) => update("industry", e.target.value)}>
                        <option value="">請選擇</option>
                        <option>機電工程</option>
                        <option>弱電工程</option>
                        <option>光纖工程</option>
                        <option>監控工程</option>
                        <option>系統整合</option>
                        <option>營造 / 室內裝修</option>
                        <option>製造業</option>
                        <option>批發 / 零售</option>
                        <option>軟體 / 科技服務</option>
                        <option>其他</option>
                      </select>
                    </Field>
                    <Field label="想了解的產品" required error={errors.product_interest}>
                      <select className={cx(errors.product_interest)} value={form.product_interest}
                        onChange={(e) => update("product_interest", e.target.value)}>
                        <option>Aegis CostFlow｜工程成本分析平台</option>
                        <option>Aegis SalesOps｜AI 業務管理系統</option>
                        <option>Aegis AI Launch｜企業 AI 導入</option>
                        <option>還不確定，想先請顧問建議</option>
                      </select>
                    </Field>
                  </div>

                  <Field label="目前最大的問題" error={errors.problem}>
                    <textarea className={`${cx(errors.problem)} min-h-[120px] resize-y`} value={form.problem} maxLength={2000}
                      onChange={(e) => update("problem", e.target.value)}
                      placeholder="例如：報價都靠 Excel、版本常常搞錯；業務回報零散、主管追不到客戶進度；想導入 AI 但不知道從哪裡開始..." />
                  </Field>

                  {serverError && (
                    <div className="flex gap-2 rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4 mt-0.5 flex-none" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  <button type="submit" disabled={submitting} className="btn btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed">
                    {submitting ? "送出中..." : (<>送出預約需求 <Send className="h-4 w-4" /></>)}
                  </button>

                  <p className="text-xs text-muted-foreground">
                    送出即表示您同意 Aegis Business Apps 顧問團隊以 Email 或電話與您聯繫，您的資料僅供本次諮詢使用。
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

const baseInput =
  "w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-ring/30";

const cx = (error?: string) =>
  `${baseInput} ${error ? "border-destructive focus:border-destructive" : "border-input focus:border-ring"}`;

function Field({
  label, required, error, children,
}: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">
        {label}{required && <span className="text-gold ml-0.5">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

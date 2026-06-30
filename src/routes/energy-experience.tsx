import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { ArrowRight } from "lucide-react";

import s66 from "@/assets/energy-s66.webp.asset.json";
import s55 from "@/assets/energy-s55.webp.asset.json";
import s52 from "@/assets/energy-s52.webp.asset.json";
import s49 from "@/assets/energy-s49.webp.asset.json";
import s38 from "@/assets/energy-s38.webp.asset.json";
import s35 from "@/assets/energy-s35.webp.asset.json";
import s15 from "@/assets/energy-s15.webp.asset.json";
import s31 from "@/assets/energy-s31.webp.asset.json";
import s22 from "@/assets/energy-s22.webp.asset.json";

export const Route = createFileRoute("/energy-experience")({
  head: () => ({
    meta: [
      { title: "能源與機電工程經驗｜宏鼎集成" },
      {
        name: "description",
        content:
          "宏鼎集成核心工程團隊具備大型太陽光電、儲能系統、機電工程與現場施工管理經驗，涵蓋屋頂型光電、水面型光電與工業區儲能等領域。",
      },
      { property: "og:title", content: "能源與機電工程經驗｜宏鼎集成" },
      {
        property: "og:description",
        content: "核心工程團隊過往參與之能源與機電工程經驗。",
      },
      {
        property: "og:url",
        content: "https://aegis-sparkle-launch.lovable.app/energy-experience",
      },
      { property: "og:image", content: s66.url },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://aegis-sparkle-launch.lovable.app/energy-experience",
      },
    ],
  }),
  component: EnergyExperience,
});

type Item = { src: string; alt: string };

const water: Item[] = [
  { src: s22.url, alt: "太陽光電工程案場" },
  { src: s31.url, alt: "太陽光電工程案場" },
];

const rooftop: Item[] = [
  { src: s38.url, alt: "太陽光電工程案場" },
  { src: s35.url, alt: "太陽光電工程案場" },
  { src: s15.url, alt: "太陽光電工程案場" },
];

const storage: Item[] = [
  { src: s66.url, alt: "儲能系統工程設備" },
  { src: s55.url, alt: "儲能系統工程設備" },
  { src: s52.url, alt: "儲能系統工程設備" },
  { src: s49.url, alt: "機電工程與現場施工管理" },
];

function Gallery({ title, desc, items }: { title: string; desc: string; items: Item[] }) {
  return (
    <section className="pb-16">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="eyebrow"><span className="dot" /> {title}</span>
          <h2 className="mt-4 text-2xl md:text-3xl">{title}</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">{desc}</p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <figure
              key={i}
              className="overflow-hidden rounded-2xl border border-border bg-surface shadow-lift"
            >
              <div className="relative aspect-[4/3] bg-ink overflow-hidden">
                <img
                  src={it.src}
                  alt={it.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <figcaption className="p-4 text-sm font-semibold">{title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function EnergyExperience() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={s66.url}
              alt="能源與機電工程經驗"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/75 to-ink/90" />
          </div>
          <div className="relative container-x py-24 md:py-32 text-ink-foreground">
            <span className="eyebrow text-ink-foreground/80">
              <span className="dot bg-gold" /> 核心工程團隊經驗
            </span>
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl text-ink-foreground">
              能源與機電工程經驗
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-foreground/85">
              宏鼎集成核心工程團隊具備大型太陽光電、儲能系統、機電工程與現場施工管理經驗。團隊成員過往參與多項屋頂型光電、水面型光電、工業區儲能與大型能源案場，累積從工程規劃、機電整合、施工協調到現場安全管理的完整實務能力。
            </p>
          </div>
        </section>

        <div className="py-16">
          <Gallery
            title="水面型太陽光電工程經驗"
            desc="團隊成員過往參與水面型太陽光電案場，涵蓋浮台基礎、模組安裝、水域施工協調與機電整合等實務經驗。"
            items={water}
          />

          <Gallery
            title="屋頂型太陽光電工程經驗"
            desc="團隊成員過往參與廠房、工業建築與大型屋頂型太陽光電工程，涉及結構評估、模組配置、配電與現場施工管理。"
            items={rooftop}
          />

          <Gallery
            title="儲能系統與機電設備經驗"
            desc="團隊成員過往參與工業區儲能、貨櫃式儲能與機電設備案場，累積電池系統佈設、配電整合、安全管理與現場協調經驗。"
            items={storage}
          />
        </div>

        {/* Disclaimer */}
        <section className="pb-20">
          <div className="container-x">
            <div className="panel p-6 md:p-8 text-sm md:text-[15px] text-muted-foreground leading-relaxed">
              以上內容為宏鼎集成核心工程團隊過往參與之能源與機電工程經驗，用於說明團隊在太陽光電、儲能系統、機電整合與現場施工管理上的實務能力。實際合作範圍將依專案需求、合約條件與工程分工另行確認。
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-24">
          <div className="container-x">
            <div className="panel-lift p-10 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl">有能源或機電工程需求？</h2>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                歡迎與宏鼎集成聯繫，由顧問依您的場域、規模與工程分工提供初步建議。
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to="/demo" className="btn btn-primary">
                  預約諮詢 <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/contact" className="btn btn-ghost">聯絡我們</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

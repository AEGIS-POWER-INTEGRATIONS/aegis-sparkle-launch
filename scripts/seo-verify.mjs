#!/usr/bin/env node
/**
 * SEO SSR verification script.
 *
 * Fetches raw HTML from the production domain and checks that title,
 * meta description, H1, canonical, OG tags and Organization JSON-LD
 * match the expected values.
 *
 * Usage:
 *   node scripts/seo-verify.mjs
 *   node scripts/seo-verify.mjs --base https://aegispowerapi.com
 */

const args = process.argv.slice(2);
const baseArgIdx = args.indexOf("--base");
const BASE = baseArgIdx >= 0 ? args[baseArgIdx + 1] : "https://aegispowerapi.com";

// ---- Expected values (edit here to update the spec) ---------------------
const expectations = [
  {
    path: "/",
    title: "宏鼎集成｜工程整合、AI 導入與企業數位轉型｜AEGIS POWER INTEGRATIONS",
    descriptionIncludes: [
      "宏鼎集成股份有限公司",
      "AEGIS POWER INTEGRATIONS",
      "台中",
    ],
    h1Includes: ["宏鼎集成", "工程整合", "AI 導入", "企業數位轉型"],
    ogTitleIncludes: ["宏鼎集成"],
    canonical: "https://aegispowerapi.com/",
  },
  {
    path: "/pricing",
    titleIncludes: ["宏鼎集成", "服務方案"],
    descriptionIncludes: ["宏鼎集成"],
  },
  {
    path: "/about",
    titleIncludes: ["宏鼎集成"],
    descriptionIncludes: ["宏鼎集成"],
  },
  {
    path: "/company-profile",
    titleIncludes: ["宏鼎集成"],
    h1Includes: ["宏鼎集成股份有限公司"],
  },
  {
    path: "/contact",
    titleIncludes: ["宏鼎集成"],
  },
];

// Organization JSON-LD expected (root, appears on every page).
const orgExpected = {
  "@type": "Organization",
  nameIncludes: ["宏鼎集成"],
  alternateNameIncludes: ["AEGIS POWER INTEGRATIONS"],
  url: "https://aegispowerapi.com/",
};

// ---- Helpers ------------------------------------------------------------
const pick = (html, re) => {
  const m = html.match(re);
  return m ? m[1].trim() : null;
};

const decode = (s) =>
  s
    ?.replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">") ?? s;

const stripTags = (s) => s?.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

function extract(html) {
  const title = decode(pick(html, /<title[^>]*>([\s\S]*?)<\/title>/i));
  const description = decode(
    pick(
      html,
      /<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i,
    ) ??
      pick(
        html,
        /<meta[^>]+content=["']([^"']*)["'][^>]*name=["']description["']/i,
      ),
  );
  const ogTitle = decode(
    pick(
      html,
      /<meta[^>]+property=["']og:title["'][^>]*content=["']([^"']*)["']/i,
    ),
  );
  const canonical = decode(
    pick(
      html,
      /<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']*)["']/i,
    ),
  );
  const h1 = stripTags(decode(pick(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i)));

  const ldBlocks = [
    ...html.matchAll(
      /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ]
    .map((m) => {
      try {
        return JSON.parse(m[1]);
      } catch {
        return null;
      }
    })
    .filter(Boolean);

  return { title, description, ogTitle, canonical, h1, ldBlocks };
}

const results = [];
function record(path, name, ok, detail) {
  results.push({ path, name, ok, detail });
}

function checkIncludes(path, field, value, needles) {
  if (!needles) return;
  if (value == null) {
    record(path, `${field} present`, false, "missing");
    return;
  }
  for (const n of needles) {
    record(
      path,
      `${field} includes "${n}"`,
      value.includes(n),
      value.slice(0, 120),
    );
  }
}

// ---- Run ---------------------------------------------------------------
const orgSeen = { checked: false };

for (const spec of expectations) {
  const url = `${BASE}${spec.path}`;
  let html;
  try {
    const res = await fetch(url, {
      headers: {
        "Cache-Control": "no-cache",
        "User-Agent": "aegis-seo-verify/1.0",
      },
    });
    if (!res.ok) {
      record(spec.path, "HTTP 2xx", false, `status ${res.status}`);
      continue;
    }
    record(spec.path, "HTTP 2xx", true, `status ${res.status}`);
    html = await res.text();
  } catch (e) {
    record(spec.path, "fetch", false, String(e));
    continue;
  }

  const got = extract(html);

  if (spec.title) {
    record(
      spec.path,
      "title exact",
      got.title === spec.title,
      `got: ${got.title}`,
    );
  }
  checkIncludes(spec.path, "title", got.title, spec.titleIncludes);
  checkIncludes(
    spec.path,
    "description",
    got.description,
    spec.descriptionIncludes,
  );
  checkIncludes(spec.path, "og:title", got.ogTitle, spec.ogTitleIncludes);
  checkIncludes(spec.path, "h1", got.h1, spec.h1Includes);

  if (spec.canonical) {
    record(
      spec.path,
      "canonical",
      got.canonical === spec.canonical,
      `got: ${got.canonical}`,
    );
  }

  // Organization JSON-LD (check once, on homepage where root emits it).
  if (!orgSeen.checked) {
    const org = got.ldBlocks.find((b) => b && b["@type"] === "Organization");
    orgSeen.checked = true;
    if (!org) {
      record(spec.path, "Organization JSON-LD present", false, "not found");
    } else {
      record(spec.path, "Organization JSON-LD present", true, "");
      const name = Array.isArray(org.name) ? org.name.join(" ") : org.name ?? "";
      const alt = Array.isArray(org.alternateName)
        ? org.alternateName.join(" ")
        : org.alternateName ?? "";
      checkIncludes(spec.path, "JSON-LD name", name, orgExpected.nameIncludes);
      checkIncludes(
        spec.path,
        "JSON-LD alternateName",
        alt,
        orgExpected.alternateNameIncludes,
      );
      record(
        spec.path,
        "JSON-LD url",
        org.url === orgExpected.url,
        `got: ${org.url}`,
      );
    }
  }
}

// ---- Report ------------------------------------------------------------
const pass = results.filter((r) => r.ok).length;
const fail = results.filter((r) => !r.ok);

console.log(`\nSEO SSR verification — ${BASE}`);
console.log("=".repeat(60));
for (const r of results) {
  const icon = r.ok ? "✅" : "❌";
  console.log(`${icon}  ${r.path.padEnd(20)} ${r.name}`);
  if (!r.ok && r.detail) console.log(`     ↳ ${r.detail}`);
}
console.log("=".repeat(60));
console.log(`${pass} passed, ${fail.length} failed (of ${results.length})`);

process.exit(fail.length === 0 ? 0 : 1);

#!/usr/bin/env bun
/**
 * Fail-closed publish audit for the Knowledge Center content sources.
 *
 * Walks the RAW `ARTICLES`, `PROMPTS` and `AI_TIPS` arrays (not the
 * PUBLISHED_* filtered lists) and reports every record whose
 * `status === "published"` cannot pass `isPublishable`. Exits non-zero when
 * any problem is found so the build step short-circuits before Vite starts.
 *
 * draft / review records are ignored — those states are legitimate.
 */
import { ARTICLES, articleBlockers } from "../src/lib/knowledge";
import { PROMPTS, promptBlockers } from "../src/lib/prompts";
import { AI_TIPS, aiTipBlockers } from "../src/lib/ai-tips";
import { isPublished, type PublishableError } from "../src/lib/publish-status";

type Issue = { kind: string; slug: string; errors: PublishableError[] };

function collect<T extends { slug?: string; id?: string; status?: string }>(
  kind: string,
  arr: readonly T[],
  fn: (r: T) => PublishableError[],
  defaultStatus: "published" | undefined = undefined,
): Issue[] {
  const issues: Issue[] = [];
  const seen = new Map<string, number>();
  const seenId = new Map<string, number>();
  for (const r of arr) {
    if (!isPublished(r as { status?: "published" }, defaultStatus)) continue;
    const errs = fn(r);
    if (errs.length > 0) {
      issues.push({ kind, slug: r.slug ?? r.id ?? "(no id)", errors: errs });
    }
    const s = r.slug ?? "";
    if (s) {
      const c = (seen.get(s) ?? 0) + 1;
      seen.set(s, c);
      if (c > 1) {
        issues.push({
          kind,
          slug: s,
          errors: [{ kind: "duplicate-slug" as unknown as PublishableError["kind"] }],
        });
      }
    }
    const id = r.id ?? "";
    if (id) {
      const c = (seenId.get(id) ?? 0) + 1;
      seenId.set(id, c);
      if (c > 1) {
        issues.push({
          kind,
          slug: id,
          errors: [{ kind: "duplicate-id" as unknown as PublishableError["kind"] }],
        });
      }
    }
  }
  return issues;
}

function printIssues(issues: Issue[]) {
  for (const i of issues) {
    console.error(`\n✗ [${i.kind}] ${i.slug}`);
    for (const e of i.errors) {
      if (e.kind === "invalid" && e.missing) {
        console.error(`    missing required fields: ${e.missing.join(", ")}`);
      } else if (e.kind === "bad-date") {
        console.error(`    invalid ISO date on field: ${e.field}`);
      } else if (e.kind === "bad-slug") {
        console.error(`    invalid URL-safe slug on field: ${e.field}`);
      } else if (e.kind === "not-published") {
        console.error("    unexpected: audit only covers status='published' records");
      } else {
        console.error(`    ${e.kind}${e.field ? " (" + e.field + ")" : ""}`);
      }
    }
  }
}

const articleIssues = collect("article", ARTICLES, articleBlockers);
const promptIssues = collect("prompt", PROMPTS, promptBlockers, "published");
const tipIssues = collect("ai-tip", AI_TIPS, aiTipBlockers, "published");

const all = [...articleIssues, ...promptIssues, ...tipIssues];

const publishedArticleCount = ARTICLES.filter((a) => isPublished(a)).length;
const publishedPromptCount = PROMPTS.filter((p) => isPublished(p, "published")).length;
const publishedTipCount = AI_TIPS.filter((t) => isPublished(t, "published")).length;

console.log(
  `content:check — articles: ${ARTICLES.length} total / ${publishedArticleCount} published`,
);
console.log(
  `content:check — prompts:  ${PROMPTS.length} total / ${publishedPromptCount} published`,
);
console.log(
  `content:check — ai tips:  ${AI_TIPS.length} total / ${publishedTipCount} published`,
);

if (all.length > 0) {
  console.error(
    `\ncontent:check FAILED — ${all.length} record(s) marked "published" cannot pass isPublishable.\n`,
  );
  printIssues(all);
  console.error(
    '\nFix the fields above, or downgrade the record\'s `status` back to "review".',
  );
  process.exit(1);
}

console.log("content:check OK — every published record is complete.");
process.exit(0);

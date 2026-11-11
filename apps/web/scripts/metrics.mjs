#!/usr/bin/env node
/**
 * Collects what CI measured into src/content/metrics.json, which the /metrics page renders.
 * Inputs (produced by the CI Browser job, or locally by the same commands):
 *   .metrics/vitest.json   pnpm test:json
 *   .metrics/e2e.json      pnpm e2e
 *   .lighthouseci/         pnpm lighthouse
 * `pnpm metrics:pull` downloads them from the latest green CI run on main and calls this script.
 *
 *   node scripts/metrics.mjs [--source ci|local] [--commit <sha>]
 */
import { execSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { basename } from "node:path";

const arg = (name) =>
  process.argv.includes(name) ? process.argv[process.argv.indexOf(name) + 1] : undefined;
const source = arg("--source") ?? "local";
const json = async (path) => JSON.parse(await readFile(path, "utf8"));
const round = (n, d = 0) => Math.round(n * 10 ** d) / 10 ** d;

// Lighthouse: the representative (median) run of each URL.
const manifest = await json(".lighthouseci/manifest.json");
const lighthouse = [];
for (const run of manifest.filter((r) => r.isRepresentativeRun)) {
  // jsonPath is absolute on the machine that ran Lighthouse; the report sits next to the manifest.
  const { audits } = await json(`.lighthouseci/${basename(run.jsonPath)}`);
  const size = (type) =>
    audits["resource-summary"].details.items.find((i) => i.resourceType === type)?.transferSize ??
    0;
  lighthouse.push({
    path: new URL(run.url).pathname,
    performance: round(run.summary.performance * 100),
    accessibility: round(run.summary.accessibility * 100),
    bestPractices: round(run.summary["best-practices"] * 100),
    seo: round(run.summary.seo * 100),
    lcpMs: round(audits["largest-contentful-paint"].numericValue),
    tbtMs: round(audits["total-blocking-time"].numericValue),
    cls: round(audits["cumulative-layout-shift"].numericValue, 3),
    scriptKb: round(size("script") / 1024),
    totalKb: round(size("total") / 1024),
  });
}

// Budgets come from the same config that fails the build, so the page cannot drift from CI.
const { assertions } = (await json("lighthouserc.json")).ci.assert;
const min = (k) => round(assertions[k][1].minScore * 100);
const max = (k) => assertions[k][1].maxNumericValue;
const budgets = {
  performance: min("categories:performance"),
  accessibility: min("categories:accessibility"),
  bestPractices: min("categories:best-practices"),
  seo: min("categories:seo"),
  lcpMs: max("largest-contentful-paint"),
  cls: max("cumulative-layout-shift"),
  tbtMs: max("total-blocking-time"),
  scriptKb: round(max("resource-summary:script:size") / 1024),
  totalKb: round(max("resource-summary:total:size") / 1024),
};

// Tests.
const vitest = await json(".metrics/vitest.json");
const e2e = await json(".metrics/e2e.json");
const specs = [];
const walk = (suite) => {
  for (const s of suite.specs ?? [])
    for (const t of s.tests)
      specs.push({ title: s.title, ok: t.status === "expected" || t.status === "flaky" });
  for (const child of suite.suites ?? []) walk(child);
};
e2e.suites.forEach(walk);
const a11y = specs.filter((s) => s.title.includes("WCAG"));

// A local run measures the working tree, which has no commit yet.
const commit =
  source === "ci"
    ? (arg("--commit") ?? execSync("git rev-parse HEAD").toString().trim()).slice(0, 7)
    : null;
const metrics = {
  source,
  measuredAt: new Date().toISOString(),
  commit,
  lighthouse,
  budgets,
  tests: {
    unit: { total: vitest.numTotalTests, passed: vitest.numPassedTests },
    e2e: { total: specs.length, passed: specs.filter((s) => s.ok).length },
    // Each WCAG test scans one page in light and dark: two axe scans per test.
    a11y: { total: a11y.length * 2, passed: a11y.filter((s) => s.ok).length * 2 },
  },
};

await writeFile("src/content/metrics.json", `${JSON.stringify(metrics, null, 2)}\n`);
console.log(
  `metrics.json: ${lighthouse.length} pages, ${metrics.tests.unit.passed}/${metrics.tests.unit.total} unit, ${metrics.tests.e2e.passed}/${metrics.tests.e2e.total} e2e`,
);

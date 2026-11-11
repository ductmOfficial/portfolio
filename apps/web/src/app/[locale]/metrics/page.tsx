import type { Metadata } from "next";
import { CountUp } from "@/components/motion/count-up";
import { Container, PageHeader } from "@/components/page-header";
import { metrics, type LighthouseRow as Row } from "@/content/metrics";
import { getMessages, isLocale } from "@/i18n";
import { formatNumber } from "@/lib/format";
import { pageContext, type LocaleParams } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getMessages(locale).metrics;
  return pageMetadata({ locale, path: "/metrics", title: t.title, description: t.intro });
}

const intl = { en: "en-US", de: "de-DE", vi: "vi-VN" } as const;

export default async function MetricsPage({ params }: LocaleParams) {
  const { locale, t } = await pageContext(params);
  const m = t.metrics;
  const b = metrics.budgets;
  const rows = metrics.lighthouse;
  const avg = rows.length
    ? Math.round(rows.reduce((s, r) => s + r.performance, 0) / rows.length)
    : 0;
  const n = (v: number) => formatNumber(v, locale);
  const ms = (v: number) => `${n(v)} ms`;
  const kb = (v: number) => `${n(v)} kB`;
  const cls = (v: number) =>
    new Intl.NumberFormat(intl[locale], { maximumFractionDigits: 3 }).format(v);
  const measured = new Intl.DateTimeFormat(intl[locale], {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(new Date(metrics.measuredAt));

  const tiles = [
    { value: avg, label: m.avgPerformance },
    {
      value: metrics.tests.unit.passed,
      suffix: ` / ${n(metrics.tests.unit.total)}`,
      label: m.unit,
    },
    { value: metrics.tests.e2e.passed, suffix: ` / ${n(metrics.tests.e2e.total)}`, label: m.e2e },
    {
      value: metrics.tests.a11y.passed,
      suffix: ` / ${n(metrics.tests.a11y.total)}`,
      label: m.a11yChecks,
    },
  ];
  type NumKey = Exclude<keyof Row, "path">;
  const cols: {
    key: NumKey;
    label: string;
    fmt: (v: number) => string;
    ok: (v: number) => boolean;
  }[] = [
    { key: "performance", label: m.performance, fmt: n, ok: (v) => v >= b.performance },
    { key: "accessibility", label: m.accessibility, fmt: n, ok: (v) => v >= b.accessibility },
    { key: "bestPractices", label: m.bestPractices, fmt: n, ok: (v) => v >= b.bestPractices },
    { key: "seo", label: m.seo, fmt: n, ok: (v) => v >= b.seo },
    { key: "lcpMs", label: m.lcp, fmt: ms, ok: (v) => v <= b.lcpMs },
    { key: "tbtMs", label: m.tbt, fmt: ms, ok: (v) => v <= b.tbtMs },
    { key: "cls", label: m.cls, fmt: cls, ok: (v) => v <= b.cls },
    { key: "scriptKb", label: m.js, fmt: kb, ok: (v) => v <= b.scriptKb },
  ];
  const budgets = [
    [m.performance, `≥ ${n(b.performance)}`],
    [m.accessibility, `≥ ${n(b.accessibility)}`],
    [m.bestPractices, `≥ ${n(b.bestPractices)}`],
    [m.seo, `≥ ${n(b.seo)}`],
    [m.lcp, `≤ ${ms(b.lcpMs)}`],
    [m.tbt, `≤ ${ms(b.tbtMs)}`],
    [m.cls, `≤ ${cls(b.cls)}`],
    [m.js, `≤ ${kb(b.scriptKb)}`],
  ];

  return (
    <>
      <PageHeader kicker="CI" title={m.title} intro={m.intro}>
        <p className="font-mono text-[13px] text-muted">
          {m.measured}: {measured} UTC
          {metrics.commit ? ` · ${m.commit} ${metrics.commit}` : ` · ${m.measuredLocal}`}
        </p>
      </PageHeader>

      <section aria-label={m.tests} className="bg-board">
        <Container>
          <dl className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
            {tiles.map((tile, i) => (
              <div key={tile.label} className="flex flex-col-reverse gap-1.5 py-7 pr-6">
                <dt className="font-mono text-xs tracking-[0.08em] text-board-ink uppercase">
                  {tile.label}
                </dt>
                <dd className="tabular font-mono text-[40px] leading-none font-medium text-board-fig">
                  <CountUp
                    metric={{ value: tile.value, suffix: tile.suffix }}
                    locale={locale}
                    delay={i * 120}
                  />
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Container className="flex flex-col gap-16 py-20">
        <section data-reveal="" aria-labelledby="lh" className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="kicker">{m.lighthouse}</p>
            <h2 id="lh" className="text-3xl font-semibold">
              {m.pages}
            </h2>
          </div>
          {/* Wide table: scrolls sideways on phones, focusable for keyboard scrolling. */}
          {/* oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
          <section
            tabIndex={0}
            aria-labelledby="lh"
            className="overflow-x-auto border border-line bg-surface"
          >
            <table className="w-full min-w-[820px] border-collapse text-[14px]">
              <thead>
                <tr className="border-b border-line">
                  <th
                    scope="col"
                    className="px-4 py-3 text-left font-mono text-[11px] font-medium tracking-wider text-muted uppercase"
                  >
                    {m.page}
                  </th>
                  {cols.map((c) => (
                    <th
                      key={c.key}
                      scope="col"
                      className="px-4 py-3 text-right font-mono text-[11px] font-medium tracking-wider text-muted uppercase"
                    >
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.path} className="border-b border-line last:border-b-0">
                    <th
                      scope="row"
                      className="px-4 py-3 text-left font-mono text-[13px] font-normal"
                    >
                      {r.path}
                    </th>
                    {cols.map((c) => {
                      const v = r[c.key];
                      return (
                        <td
                          key={c.key}
                          className={`tabular px-4 py-3 text-right font-mono ${c.ok(v) ? "text-ink" : "font-semibold text-[#b42318]"}`}
                        >
                          {c.fmt(v)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </section>

        <div className="grid gap-12 md:grid-cols-2">
          <section data-reveal="" aria-labelledby="budgets" className="flex flex-col gap-4">
            <h2 id="budgets" className="text-2xl font-semibold">
              {m.budgets}
            </h2>
            <dl className="grid grid-cols-[1fr_auto]">
              {budgets.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="border-t border-line py-2.5">{k}</dt>
                  <dd className="tabular border-t border-line py-2.5 pl-6 text-right font-mono">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
          <section
            data-reveal=""
            style={{ "--i": 1 } as React.CSSProperties}
            aria-labelledby="source"
            className="flex flex-col gap-4"
          >
            <h2 id="source" className="text-2xl font-semibold">
              {m.source}
            </h2>
            <p className="leading-relaxed text-muted">{m.sourceText}</p>
          </section>
        </div>
      </Container>
    </>
  );
}

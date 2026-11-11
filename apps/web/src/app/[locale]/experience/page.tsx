import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/page-header";
import { TargetBadge } from "@/components/target-badge";
import { getMessages, isLocale } from "@/i18n";
import { formatRange } from "@/lib/format";
import { pageContext, type LocaleParams } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";
import { tx } from "@/lib/text";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getMessages(locale).experience;
  return pageMetadata({
    locale,
    path: "/experience",
    title: t.pageTitle,
    description: t.pageIntro,
  });
}

export default async function ExperiencePage({ params }: LocaleParams) {
  const { locale, t, cv } = await pageContext(params);
  const main = cv.experience.filter((e) => !e.compact);
  const earlier = cv.experience.filter((e) => e.compact);
  const employment = (e: (typeof main)[number]) =>
    e.employment === "freelance"
      ? ` ${t.experience.freelance}`
      : e.employment === "full-time"
        ? ` ${t.experience.fullTime}`
        : "";

  return (
    <>
      <PageHeader
        kicker={t.experience.kicker}
        title={t.experience.pageTitle}
        intro={t.experience.pageIntro}
      />
      <Container className="flex flex-col py-8">
        {main.map((e) => (
          <article
            key={e.id}
            id={e.id}
            data-reveal=""
            className="grid scroll-mt-6 gap-x-12 gap-y-6 border-b border-line py-14 last:border-b-0 md:grid-cols-[280px_1fr]"
          >
            <header className="flex flex-col gap-2.5">
              <span
                className={`self-start border px-2 py-0.5 font-mono text-xs font-medium tracking-wide uppercase ${e.end ? "border-line text-muted" : "border-signal text-accent"}`}
              >
                {e.end ? t.experience.done : t.experience.live}
              </span>
              <span className="tabular font-mono text-[13px] text-muted">
                {formatRange(e.start, e.end, t.experience.present, locale)}
              </span>
              <h2 className="text-[26px] leading-tight font-semibold">{e.company}</h2>
              <span className="font-mono text-[13px] text-muted">
                {e.country} · {tx(e.city, locale)}
              </span>
              <span className="text-[15px] font-medium">
                {e.title}
                {employment(e)}
              </span>
            </header>
            <div className="flex flex-col gap-6">
              {e.about && (
                <section aria-label={t.experience.company} className="border-l-2 border-line pl-4">
                  <p className="text-[15px] leading-relaxed text-muted italic">
                    {tx(e.about, locale)}
                  </p>
                </section>
              )}
              {e.titleHistory && (
                <p className="text-sm text-muted">
                  <span className="kicker mr-2">{t.experience.titles}</span>
                  {tx(e.titleHistory, locale)}
                </p>
              )}
              <ul className="flex flex-col gap-3.5">
                {e.highlights.map((h, i) => (
                  // Highlights are a fixed, ordered list without ids; the order never changes.
                  // eslint-disable-next-line @eslint-react/no-array-index-key
                  <li key={i} className="relative pl-6 text-base leading-relaxed">
                    <span
                      aria-hidden="true"
                      className="absolute top-[0.7em] left-0 h-px w-3 bg-signal"
                    />
                    {h.status === "target" && (
                      <>
                        <TargetBadge label={t.preview.badge} />{" "}
                      </>
                    )}
                    {tx(h.text, locale)}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
        {earlier.length > 0 && (
          <section aria-labelledby="earlier" className="border-t border-line py-14">
            <h2 id="earlier" className="kicker mb-6 !text-ink">
              {t.experience.earlier}
            </h2>
            <ul className="grid gap-6 md:grid-cols-2">
              {earlier.map((e) => (
                <li key={e.id} id={e.id} className="flex flex-col gap-1.5 border border-line p-6">
                  <span className="tabular font-mono text-[13px] text-muted">
                    {formatRange(e.start, e.end, t.experience.present, locale)}
                  </span>
                  <h3 className="text-lg font-semibold">
                    {e.title} · {e.company}
                  </h3>
                  <span className="font-mono text-[13px] text-muted">
                    {e.country} · {tx(e.city, locale)}
                  </span>
                  <p className="mt-1 text-[15px] leading-relaxed text-muted">
                    {tx(e.highlights[0]?.text ?? e.summary, locale)}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </Container>
    </>
  );
}

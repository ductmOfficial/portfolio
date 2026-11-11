import type { Metadata } from "next";
import { PrintButton } from "@/components/print-button";
import { TargetBadge } from "@/components/target-badge";
import { getMessages, isLocale } from "@/i18n";
import { formatMonth, formatRange } from "@/lib/format";
import { pageContext, type LocaleParams } from "@/lib/page";
import { cvPdfPath } from "@/lib/cv-pdf";
import { pageMetadata } from "@/lib/seo";
import { tx } from "@/lib/text";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getMessages(locale).cvPage;
  return pageMetadata({ locale, path: "/cv", title: t.title, description: t.intro });
}

const contactLabel = {
  email: "Email",
  phone: "Phone",
  linkedin: "LinkedIn",
  github: "GitHub",
  website: "Web",
} as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="cv-section">
      <h2 className="mb-3 border-b border-line pb-1.5 font-mono text-[11px] font-medium tracking-[0.1em] text-muted uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default async function CvPage({ params }: LocaleParams) {
  const { locale, t, cv } = await pageContext(params);
  const main = cv.experience.filter((e) => !e.compact);
  const earlier = cv.experience.filter((e) => e.compact);
  const employment = (e: (typeof main)[number]) =>
    e.employment === "freelance"
      ? ` ${t.experience.freelance}`
      : e.employment === "full-time"
        ? ` ${t.experience.fullTime}`
        : "";
  const btn = "inline-flex min-h-11 items-center border px-4 text-[15px] font-medium no-underline";

  return (
    <div className="bg-bg py-10 print:py-0">
      <div className="mx-auto mb-6 flex max-w-[210mm] flex-wrap items-end justify-between gap-4 px-6 print:hidden">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl font-semibold">{t.cvPage.title}</h1>
          <p className="text-muted">{t.cvPage.intro}</p>
        </div>
        <div className="flex gap-2">
          <a
            href={cvPdfPath(locale)}
            download
            className={`${btn} border-btn bg-btn text-btn-ink hover:border-accent hover:bg-accent`}
          >
            {t.cvPage.download}
          </a>
          <PrintButton
            label={t.cvPage.print}
            className={`${btn} cursor-pointer border-line text-ink hover:border-ink`}
          />
        </div>
      </div>

      {/* The sheet is always light: it is paper, on screen and in the PDF. */}
      <article
        lang={locale}
        className="cv-sheet mx-auto flex max-w-[210mm] flex-col gap-6 border border-line bg-surface px-[14mm] py-[12mm] text-[13px] leading-[1.5] text-ink print:max-w-none print:border-0 print:p-0"
      >
        <header className="flex flex-col gap-1.5">
          <p className="text-[28px] leading-tight font-semibold tracking-[-0.01em]">{cv.name}</p>
          <p className="text-[14px] font-medium">{cv.headline}</p>
          <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11.5px] text-muted">
            <li>{tx(cv.location, locale)}</li>
            {cv.contacts.map((c) => (
              <li key={c.kind}>
                <span className="sr-only">{contactLabel[c.kind]}: </span>
                <a href={c.href} className="text-ink no-underline">
                  {c.value}
                </a>
                {c.status === "target" && (
                  <>
                    {" "}
                    <TargetBadge label={t.preview.badge} />
                  </>
                )}
              </li>
            ))}
            <li>{tx(cv.availability, locale)}</li>
          </ul>
        </header>

        <Section title={t.about.summary}>
          <p>{tx(cv.summary, locale)}</p>
        </Section>

        <Section title={t.cvPage.experience}>
          <div className="flex flex-col gap-5">
            {main.map((e) => (
              <div key={e.id} className="flex flex-col gap-1.5">
                <div className="cv-keep flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-[14.5px] font-semibold">
                    {e.title}
                    {employment(e)} · {e.company}
                  </h3>
                  <span className="tabular font-mono text-[11.5px] text-muted">
                    {formatRange(e.start, e.end, t.experience.present, locale)}
                    {" · "}
                    {tx(e.city, locale)}, {e.country}
                  </span>
                </div>
                {e.titleHistory && (
                  <p className="text-[12px] text-muted italic">{tx(e.titleHistory, locale)}</p>
                )}
                <ul className="flex flex-col gap-1">
                  {e.highlights.map((h, i) => (
                    // Dash drawn as a background, not a positioned element: positioned boxes are painted
                    // later, which would scramble the PDF's text order (cv:check compares it with the page).
                    // Highlights are a fixed, ordered list without ids; the order never changes.
                    // eslint-disable-next-line @eslint-react/no-array-index-key
                    <li key={i} className="cv-keep cv-dash pl-4">
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
            ))}
            {earlier.length > 0 && (
              <div className="cv-keep flex flex-col gap-1">
                <h3 className="text-[14.5px] font-semibold">{t.experience.earlier}</h3>
                <ul className="flex flex-col gap-1">
                  {earlier.map((e) => (
                    <li key={e.id} className="flex flex-wrap justify-between gap-x-4">
                      <span>
                        <strong className="font-semibold">{e.title}</strong> · {e.company}
                        {", "}
                        {tx(e.city, locale)}
                      </span>
                      <span className="tabular font-mono text-[11.5px] text-muted">
                        {formatRange(e.start, e.end, t.experience.present, locale)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Section>

        <Section title={t.cvPage.skills}>
          <dl className="grid grid-cols-[minmax(0,9rem)_1fr] gap-x-4 gap-y-1.5">
            {cv.skills.map((g) => (
              <div key={g.id} className="cv-keep contents">
                <dt className="font-semibold">{tx(g.name, locale)}</dt>
                <dd>{g.items.map((i) => tx(i.name, locale)).join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <div className="cv-keep grid gap-6 sm:grid-cols-2 print:grid-cols-2">
          <Section title={t.about.education}>
            {cv.education.map((e) => (
              <p key={e.degree}>
                <strong className="font-semibold">{e.degree}</strong>
                <br />
                {e.school}, {tx(e.city, locale)}
                {" · "}
                <span className="tabular font-mono text-[11.5px] text-muted">
                  {formatMonth(e.end, locale)}
                </span>
              </p>
            ))}
          </Section>
          <Section title={t.about.languages}>
            <ul>
              {cv.languages.map((l) => (
                <li key={tx(l.name, "en")}>
                  <strong className="font-semibold">{tx(l.name, locale)}</strong>
                  {": "}
                  {tx(l.level, locale)}
                </li>
              ))}
            </ul>
          </Section>
        </div>

        {cv.certifications.length > 0 && (
          <Section title={t.about.certifications}>
            <ul>
              {cv.certifications.map((c) => (
                <li key={c.name}>
                  {c.name}{" "}
                  {c.date && <span className="font-mono text-[11.5px] text-muted">{c.date}</span>}
                </li>
              ))}
            </ul>
          </Section>
        )}
      </article>
    </div>
  );
}

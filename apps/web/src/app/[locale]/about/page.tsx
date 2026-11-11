import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/page-header";
import { TargetBadge } from "@/components/target-badge";
import { getMessages, isLocale } from "@/i18n";
import { formatMonth } from "@/lib/format";
import { pageContext, type LocaleParams } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";
import { tx } from "@/lib/text";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const m = getMessages(locale);
  return pageMetadata({
    locale,
    path: "/about",
    title: m.about.pageTitle,
    description: m.meta.description,
  });
}

const contactLabel = {
  email: "Email",
  phone: "Phone",
  linkedin: "LinkedIn",
  github: "GitHub",
  website: "Web",
} as const;

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section
      data-reveal=""
      className="grid gap-x-12 gap-y-4 border-t border-line py-10 first:border-t-0 md:grid-cols-[220px_1fr]"
    >
      <h2 className="kicker !text-ink">{title}</h2>
      <div>{children}</div>
    </section>
  );
}

export default async function AboutPage({ params }: LocaleParams) {
  const { locale, t, cv } = await pageContext(params);
  return (
    <>
      <PageHeader kicker={t.about.pageTitle} title={cv.name} intro={cv.headline} />
      <Container className="py-10">
        <Block title={t.about.summary}>
          <p className="max-w-[68ch] text-lg leading-relaxed">{tx(cv.summary, locale)}</p>
          <dl className="mt-6 grid gap-x-8 gap-y-2 text-[15px] sm:grid-cols-[auto_1fr]">
            <dt className="text-muted">{t.about.location}</dt>
            <dd>{tx(cv.location, locale)}</dd>
            <dt className="text-muted">{t.about.availability}</dt>
            <dd>{tx(cv.availability, locale)}</dd>
          </dl>
        </Block>
        <Block title={t.about.contact}>
          <dl className="grid gap-x-8 gap-y-3 text-[15px] sm:grid-cols-[120px_1fr]">
            {cv.contacts.map((c) => (
              <div key={c.kind} className="contents">
                <dt className="font-mono text-[13px] text-muted uppercase">
                  {contactLabel[c.kind]}
                </dt>
                <dd className="flex items-center gap-2">
                  <a
                    href={c.href}
                    rel={c.kind === "linkedin" || c.kind === "github" ? "me" : undefined}
                    className="break-all text-accent hover:text-ink"
                  >
                    {c.value}
                  </a>
                  {c.status === "target" && <TargetBadge label={t.preview.badge} />}
                </dd>
              </div>
            ))}
          </dl>
        </Block>
        <Block title={t.about.education}>
          {cv.education.map((e) => (
            <div key={e.degree} className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold">{e.degree}</h3>
              <p className="text-muted">
                {e.school}, {tx(e.city, locale)}
                {" · "}
                <span className="tabular font-mono text-[13px]">{formatMonth(e.end, locale)}</span>
              </p>
            </div>
          ))}
        </Block>
        {cv.certifications.length > 0 && (
          <Block title={t.about.certifications}>
            <ul className="flex flex-col gap-2">
              {cv.certifications.map((c) => (
                <li key={c.name} className="flex flex-wrap items-center gap-2">
                  {c.name}{" "}
                  {c.date && <span className="font-mono text-[13px] text-muted">{c.date}</span>}
                  {c.status === "target" && <TargetBadge label={t.preview.badge} />}
                </li>
              ))}
            </ul>
          </Block>
        )}
        <Block title={t.about.languages}>
          <dl className="grid gap-x-8 gap-y-2 text-[15px] sm:grid-cols-[160px_1fr]">
            {cv.languages.map((l) => (
              <div key={tx(l.name, "en")} className="contents">
                <dt className="font-medium">{tx(l.name, locale)}</dt>
                <dd className="text-muted">{tx(l.level, locale)}</dd>
              </div>
            ))}
          </dl>
        </Block>
      </Container>
    </>
  );
}

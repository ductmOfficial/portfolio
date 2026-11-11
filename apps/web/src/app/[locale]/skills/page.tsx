import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/page-header";
import { TargetBadge } from "@/components/target-badge";
import { usageOf } from "@/content/usage";
import { getMessages, isLocale } from "@/i18n";
import { pageContext, type LocaleParams } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";
import { tx } from "@/lib/text";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getMessages(locale).skills;
  return pageMetadata({ locale, path: "/skills", title: t.pageTitle, description: t.pageIntro });
}

export default async function SkillsPage({ params }: LocaleParams) {
  const { locale, t, cv } = await pageContext(params);
  return (
    <>
      <PageHeader kicker={t.skills.kicker} title={t.skills.pageTitle} intro={t.skills.pageIntro} />
      <Container className="grid gap-x-12 gap-y-16 py-20 lg:grid-cols-2">
        {cv.skills.map((g, gi) => (
          <section
            key={g.id}
            data-reveal=""
            style={{ "--i": gi % 2 } as React.CSSProperties}
            aria-labelledby={`g-${g.id}`}
            className="flex flex-col"
          >
            <h2 id={`g-${g.id}`} className="mb-4 flex items-center gap-2 text-2xl font-semibold">
              {tx(g.name, locale)}{" "}
              {g.status === "target" && <TargetBadge label={t.preview.badge} />}
            </h2>
            <dl className="flex flex-col">
              {g.items.map((item) => {
                const used = usageOf(item, cv);
                return (
                  <div
                    key={tx(item.name, "en")}
                    className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-4 border-t border-line py-3.5"
                  >
                    <dt className="flex flex-wrap items-center gap-2 font-mono text-[14px]">
                      {tx(item.name, locale)}{" "}
                      {item.status === "target" && <TargetBadge label={t.preview.badge} />}
                    </dt>
                    <dd className="text-[14px] text-muted">
                      {used.length ? (
                        <>
                          <span className="sr-only">{t.skills.usedIn}: </span>
                          {used.map((u, i) => (
                            <span key={u.kind + u.id}>
                              {i > 0 && ", "}
                              <Link
                                href={
                                  u.kind === "experience"
                                    ? `/${locale}/experience#${u.id}`
                                    : `/${locale}/work/${u.id}`
                                }
                                className="text-accent hover:text-ink"
                              >
                                {u.label}
                                {u.kind === "project" && (
                                  <span className="text-muted"> · {t.skills.caseStudy}</span>
                                )}
                              </Link>
                            </span>
                          ))}
                        </>
                      ) : (
                        <span>{t.skills.notLinked}</span>
                      )}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </section>
        ))}
      </Container>
    </>
  );
}

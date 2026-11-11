import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/page-header";
import { ProjectCard } from "@/components/project-card";
import { getMessages, isLocale } from "@/i18n";
import { pageContext, type LocaleParams } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getMessages(locale).work;
  return pageMetadata({ locale, path: "/work", title: t.pageTitle, description: t.pageIntro });
}

export default async function WorkPage({ params }: LocaleParams) {
  const { locale, t, cv } = await pageContext(params);
  const cases = cv.projects.filter((p) => p.caseStudy);
  const other = cv.projects.filter((p) => !p.caseStudy);
  return (
    <>
      <PageHeader kicker={t.cases.kicker} title={t.work.pageTitle} intro={t.work.pageIntro} />
      <Container className="flex flex-col gap-16 py-20">
        <section aria-labelledby="cases" className="flex flex-col gap-8">
          <h2 id="cases" className="text-3xl font-semibold">
            {t.cases.title}
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
            {cases.map((p, i) => (
              <ProjectCard key={p.id} p={p} t={t} locale={locale} index={i} />
            ))}
          </div>
        </section>
        {other.length > 0 && (
          <section aria-labelledby="other" className="flex flex-col gap-8">
            <h2 id="other" className="text-3xl font-semibold">
              {t.work.other}
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
              {other.map((p, i) => (
                <ProjectCard key={p.id} p={p} t={t} locale={locale} index={i} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </>
  );
}

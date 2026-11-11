import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PageHeader } from "@/components/page-header";
import { caseStudies } from "@/content/case-studies";
import { cv as fullCv } from "@/content/cv";
import { isVisible, selectCv } from "@/content/select";
import { isLocale, locales } from "@/i18n";
import { formatRange } from "@/lib/format";
import { cvMode } from "@/lib/mode";
import { pageContext } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";
import { tx } from "@/lib/text";

interface Params {
  params: Promise<{ locale: string; slug: string }>;
}

export const dynamicParams = false;
export function generateStaticParams() {
  const slugs = fullCv.projects.filter((p) => p.caseStudy && isVisible(p, cvMode)).map((p) => p.id);
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  const p = selectCv(fullCv, cvMode).projects.find((x) => x.id === slug);
  if (!p || !isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: `/work/${slug}`,
    title: p.title ? tx(p.title, locale) : p.name,
    description: tx(p.description, locale),
    type: "article",
    image: `/${locale}/work/${slug}/opengraph-image`,
  });
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const { locale, t, cv } = await pageContext(params);
  const cases = cv.projects.filter((p) => p.caseStudy);
  const index = cases.findIndex((p) => p.id === slug);
  const project = cases[index];
  const entry = caseStudies[slug];
  if (!project || !entry) notFound();

  const { default: Body } = await entry.body[locale]();
  const job = cv.experience.find((e) => e.id === entry.experienceId);
  const next = cases[(index + 1) % cases.length];
  const facts = [
    job && [t.work.company, job.company],
    job && [t.work.period, formatRange(job.start, job.end, t.experience.present, locale)],
    job && [t.work.role, job.title],
    [t.work.stack, project.stack.join(", ")],
  ].filter((f): f is [string, string] => Boolean(f));

  return (
    <article>
      <PageHeader
        kicker={tx(project.kicker, locale)}
        title={project.title ? tx(project.title, locale) : project.name}
        intro={tx(project.description, locale)}
      >
        <dl className="mt-4 grid max-w-[900px] gap-x-8 gap-y-4 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map(([k, v]) => (
            <div key={k} className="flex flex-col gap-1">
              <dt className="kicker">{k}</dt>
              <dd className="text-[15px]">{v}</dd>
            </div>
          ))}
        </dl>
        {(project.url ?? project.repo) && (
          <div className="flex flex-wrap gap-6">
            {project.url && (
              <a href={project.url} className="font-medium text-accent hover:text-ink">
                {t.work.live} <span aria-hidden="true">↗</span>
              </a>
            )}
            {project.repo && (
              <a href={project.repo} className="font-medium text-accent hover:text-ink">
                {t.work.repo} <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        )}
      </PageHeader>
      <Container className="py-16">
        <div className="prose-cs">
          <Body />
        </div>
        <nav
          aria-label={t.work.back}
          className="mt-20 flex flex-wrap justify-between gap-6 border-t border-line pt-8"
        >
          <Link href={`/${locale}/work`} className="font-medium text-accent hover:text-ink">
            <span aria-hidden="true">←</span> {t.work.back}
          </Link>
          {next && next.id !== slug && (
            <Link
              href={`/${locale}/work/${next.id}`}
              className="text-right font-medium text-accent hover:text-ink"
            >
              <span className="kicker block">{t.work.next}</span>
              {next.title ? tx(next.title, locale) : next.name} <span aria-hidden="true">→</span>
            </Link>
          )}
        </nav>
      </Container>
    </article>
  );
}

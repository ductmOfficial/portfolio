import {
  CaseStudies,
  Contact,
  ExperienceRoute,
  Hero,
  Skills,
  StatusBoard,
} from "@/components/home/sections";
import type { Metadata } from "next";
import { getMessages, isLocale } from "@/i18n";
import { pageContext, type LocaleParams } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site";
import { tx } from "@/lib/text";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const m = getMessages(locale).meta;
  return { ...pageMetadata({ locale, description: m.description }), title: { absolute: m.title } };
}

export default async function Home({ params }: LocaleParams) {
  const ctx = await pageContext(params);
  const { cv, locale } = ctx;
  // schema.org Person: lets search engines connect the site, LinkedIn and GitHub to one person.
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: cv.name,
    jobTitle: cv.headline.split("|")[0]?.trim(),
    url: new URL(`/${locale}`, siteUrl).toString(),
    email: cv.contacts.find((c) => c.kind === "email")?.value,
    address: {
      "@type": "PostalAddress",
      addressLocality: tx(cv.location, "en").split(",")[0],
      addressCountry: "VN",
    },
    alumniOf: cv.education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.school })),
    knowsAbout: cv.skills.flatMap((g) => g.items.map((i) => tx(i.name, "en"))),
    knowsLanguage: ["vi", "en"],
    sameAs: [
      ...cv.contacts.filter((c) => c.kind === "linkedin").map((c) => c.href),
      "https://github.com/ductmOfficial",
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        // JSON.stringify output is safe once "<" is escaped, so no closing tag can be injected.
        // eslint-disable-next-line @eslint-react/dom-no-dangerously-set-innerhtml
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
      />
      <Hero {...ctx} />
      <StatusBoard {...ctx} />
      <ExperienceRoute {...ctx} />
      <CaseStudies {...ctx} />
      <Skills {...ctx} />
      <Contact {...ctx} />
    </>
  );
}

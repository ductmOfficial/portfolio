import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { RevealObserver } from "@/components/motion/reveal-observer";
import { ThemeSync } from "@/components/theme-sync";
import { getMessages, isLocale, locales } from "@/i18n";
import { pageContext } from "@/lib/page";
import { cvMode } from "@/lib/mode";
import { siteName, siteUrl } from "@/lib/site";
// Self-hosted fonts: no request to Google at build or run time (GDPR-friendly for EU visitors).
import "../fonts.css";
import "../globals.css";

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((locale) => ({ locale }));

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const m = getMessages(locale).meta;
  return {
    metadataBase: siteUrl,
    title: { default: m.title, template: `%s · ${siteName}` },
    description: m.description,
    applicationName: siteName,
    authors: [{ name: siteName, url: siteUrl }],
    twitter: { card: "summary_large_image" },
    // The roadmap build is private by intent: keep it out of every index.
    ...(cvMode === "target" ? { robots: { index: false, follow: false } } : {}),
  };
}

const criticalFonts = (locale: string) => [
  "plex-sans-latin-400",
  "plex-sans-latin-600",
  "plex-sans-latin-500",
  "plex-mono-latin-500",
  ...(locale === "vi" ? ["plex-sans-vietnamese-400", "plex-sans-vietnamese-600"] : []),
];

/** Runs before paint: applies the stored or system theme, and marks JS as available for entrance motion. */
const themeScript = `document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches)}catch(e){d=false}document.documentElement.dataset.theme=d?'dark':'light'`;

export default async function LocaleLayout({ children, params }: Props) {
  const { locale, t, cv } = await pageContext(params);
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* A static inline script must run before paint to set the theme; it holds no user input. */}
        {/* eslint-disable-next-line @eslint-react/dom-no-dangerously-set-innerhtml */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Fonts used above the fold, fetched before CSS discovers them (fonts.css uses display: optional). */}
        {criticalFonts(locale).map((f) => (
          <link
            key={f}
            rel="preload"
            href={`/fonts/${f}.woff2`}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        ))}
      </head>
      {/* Column layout: main grows, so the footer stays at the bottom on short pages. */}
      <body className="flex min-h-dvh flex-col">
        <ThemeSync />
        <RevealObserver />
        <a
          href="#main"
          className="absolute -top-12 left-4 z-50 bg-btn px-3.5 py-2.5 text-btn-ink focus:top-3 print:hidden"
        >
          {t.a11y.skip}
        </a>
        {cvMode === "target" && (
          <p
            role="note"
            className="border-b border-dashed print:hidden border-accent bg-surface px-6 py-2 text-center font-mono text-[13px] text-accent"
          >
            {t.preview.banner}
          </p>
        )}
        <SiteHeader locale={locale} t={t} name={cv.name} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <footer className="border-t border-line print:hidden">
          <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-3 px-6 py-7 font-mono text-[13px] text-muted">
            <span>
              © {new Date().getFullYear()} · Crafted by{" "}
              <a
                href="https://github.com/ductmOfficial"
                rel="me"
                className="text-accent underline underline-offset-4 hover:text-ink"
              >
                {cv.name}
              </a>
            </span>
            <nav aria-label={t.about.contact} className="flex flex-wrap gap-5">
              <Link
                href={`/${locale}/cv`}
                className="text-muted underline-offset-4 hover:text-ink hover:underline"
              >
                CV
              </Link>
              <Link
                href={`/${locale}/metrics`}
                className="text-muted underline-offset-4 hover:text-ink hover:underline"
              >
                {t.footer.metrics}
              </Link>
              {cv.contacts
                .filter((c) => c.kind === "linkedin" || c.kind === "email")
                .map((c) => (
                  <a
                    key={c.kind}
                    href={c.href}
                    className="text-muted underline-offset-4 hover:text-ink hover:underline"
                  >
                    {c.kind === "email" ? "Email" : "LinkedIn"}
                  </a>
                ))}
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}

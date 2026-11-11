import Link from "next/link";
import type { Locale, Messages } from "@/i18n";
import { LanguageSwitcher } from "./language-switcher";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader({ locale, t, name }: { locale: Locale; t: Messages; name: string }) {
  const links = (["experience", "work", "skills", "about"] as const).map((k) => ({
    href: `/${locale}/${k}`,
    label: t.nav[k],
  }));
  return (
    <header className="border-b border-line print:hidden">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-8 gap-y-3 px-6 py-3">
        <Link href={`/${locale}`} className="flex items-center gap-3 text-ink no-underline">
          <span
            aria-hidden="true"
            className="inline-flex size-10 items-center justify-center bg-btn font-mono text-[15px] font-medium text-btn-ink"
          >
            DT
          </span>
          <span className="text-[17px] font-semibold">{name}</span>
        </Link>
        <NavLinks label={t.a11y.nav} links={links} />
        <div className="flex items-center gap-2">
          <LanguageSwitcher current={locale} label={t.a11y.language} />
          <ThemeToggle label={t.a11y.theme} />
        </div>
      </div>
    </header>
  );
}

import { notFound } from "next/navigation";
import { cv } from "@/content/cv";
import { selectCv } from "@/content/select";
import { getMessages, isLocale } from "@/i18n";
import { cvMode } from "./mode";

export interface LocaleParams {
  params: Promise<{ locale: string }>;
}

/** Resolves locale, messages and the mode-filtered CV for a page; unknown locales 404. */
export async function pageContext(params: Promise<{ locale: string }>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return { locale, t: getMessages(locale), cv: selectCv(cv, cvMode) };
}
export type PageContext = Awaited<ReturnType<typeof pageContext>>;

import { LocaleSchema, locales, type Locale } from "@/content/schema";
import { de } from "./messages/de";
import { en, type Messages } from "./messages/en";
import { vi } from "./messages/vi";

const messages: Record<Locale, Messages> = { en, de, vi };

export { locales, type Locale, type Messages };
export const isLocale = (v: string): v is Locale => LocaleSchema.safeParse(v).success;
export const getMessages = (locale: Locale) => messages[locale];
export const localeNames: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  vi: "Tiếng Việt",
};

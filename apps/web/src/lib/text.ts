import type { Locale, Text } from "@/content/schema";

export const tx = (text: Text, locale: Locale): string =>
  typeof text === "string" ? text : (text[locale] ?? text.en);

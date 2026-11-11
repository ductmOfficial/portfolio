/** Canonical origin for metadata, sitemap and OG URLs. Previews keep pointing canonicals at production. */
export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://ductran.vercel.app");
export const siteName = "Duc Tran";

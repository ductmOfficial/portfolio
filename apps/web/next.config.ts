import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  pageExtensions: ["ts", "tsx", "mdx"],
  // The case study was published as CineScope before the app was renamed Lumi.
  redirects: () =>
    Promise.resolve([
      { source: "/:locale/work/cinescope", destination: "/:locale/work/lumi", permanent: true },
      { source: "/work/cinescope", destination: "/work/lumi", permanent: true },
    ]),
};

// Plugin names as strings so the config stays serialisable for Turbopack.
const withMDX = createMDX({ options: { remarkPlugins: [["remark-gfm"]] } });

export default withMDX(nextConfig);

import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  pageExtensions: ["ts", "tsx", "mdx"],
};

// Plugin names as strings so the config stays serialisable for Turbopack.
const withMDX = createMDX({ options: { remarkPlugins: [["remark-gfm"]] } });

export default withMDX(nextConfig);

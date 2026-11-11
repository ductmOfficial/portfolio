import type { MDXComponents } from "mdx/types";
import { BundleChart } from "@/components/diagrams/bundle-chart";
import { TenantRouting } from "@/components/diagrams/tenant-routing";
import { WidgetFramework } from "@/components/diagrams/widget-framework";
import { WorkerProxy } from "@/components/diagrams/worker-proxy";
import { Figure } from "@/components/figure";

const components: MDXComponents = {
  BundleChart,
  TenantRouting,
  WidgetFramework,
  WorkerProxy,
  Figure,
};

export function useMDXComponents(): MDXComponents {
  return components;
}

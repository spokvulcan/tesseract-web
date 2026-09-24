import type { MetadataRoute } from "next";
import { PAPERS } from "@/components/papers/list";
import { SITE_URL } from "@/lib/site";

/* The survey, its papers in reading order, then the fine print. No
   lastmod: Google only trusts one that is kept accurate, and a build
   time is not a page's last edit. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...PAPERS.map((p) => `/${p.slug}`), "/support", "/privacy", "/terms"];
  return paths.map((path) => ({ url: new URL(path, SITE_URL).href }));
}

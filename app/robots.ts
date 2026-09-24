import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/* Every crawler is welcome, AI answer engines included. The one path
   kept out is /download: it only redirects to a DMG, and a bot pulling
   the file would count as a download. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/download" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

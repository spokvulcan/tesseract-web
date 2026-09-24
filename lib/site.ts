import type { Metadata } from "next";

/* ------------------------------------------------------------------ */
/*  The site's one address, its outbound links, and the metadata      */
/*  every page is published with. Kept out of the "use client"        */
/*  modules so server files (metadata, robots, sitemap, the download  */
/*  route) can read the values rather than client references.         */
/* ------------------------------------------------------------------ */

export const SITE_URL = "https://thetesseract.app";
export const SITE_NAME = "Tesseract";

/** Every "Download for Mac" button. A route of ours, not GitHub's
    releases/latest link, which 404s while a new release still waits
    for its DMG (see app/download/route.ts). */
export const DOWNLOAD_URL = "/download";

export const GITHUB_URL = "https://github.com/spokvulcan/tesseract";

export const X_HANDLE = "@spok_vulkan";
export const X_URL = "https://x.com/spok_vulkan";

/** A page's metadata. The title and description are written for
    search; `share` swaps in different wording for the link preview,
    where the hook matters more than the keywords. */
export function pageMetadata({
  path,
  title,
  description,
  share,
}: {
  path: string;
  title: string;
  description: string;
  share?: { title?: string; description?: string };
}): Metadata {
  const shareTitle = share?.title ?? title;
  const shareDescription = share?.description ?? description;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url: path,
      title: shareTitle,
      description: shareDescription,
    },
    twitter: {
      card: "summary_large_image",
      creator: X_HANDLE,
      title: shareTitle,
      description: shareDescription,
    },
  };
}

import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";
import { SITE_NAME, SITE_URL, pageMetadata } from "@/lib/site";

/* Search gets the plain description of what Tesseract is; a shared
   link gets the hook. */
export const metadata: Metadata = pageMetadata({
  path: "/",
  title: "Tesseract: private AI that runs entirely on your Mac",
  description:
    "A personal AI that lives on your Mac: dictation, chat, voice, and a companion that remembers what matters. It works offline, and nothing leaves the machine.",
  share: {
    title: "Tesseract: the first AI you can tell everything",
    description:
      "A companion, not a chatbot. Tesseract lives on your Mac, remembers what matters, and guards your attention. Nothing you tell it ever leaves the machine.",
  },
});

/* The site's name for search results. "Tesseract" alone is shared with
   an OCR engine and several other apps, so the name is declared rather
   than left for Google to guess; the app's own display name rides along
   as the alternate. */
const WEBSITE = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  alternateName: "Tesseract Agent",
  url: `${SITE_URL}/`,
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(WEBSITE).replace(/</g, "\\u003c"),
        }}
      />
      <LandingPage />
    </>
  );
}

import { NextResponse } from "next/server";
import { GITHUB_URL } from "@/lib/site";

/* Every "Download for Mac" button lands here. GitHub's
   releases/latest/download/Tesseract.dmg follows the newest release,
   which exists before its DMG does: the release build uploads it later,
   and if that build fails the link 404s until the next release. So this
   walks the recent releases and sends the visitor to the newest DMG that
   actually exists. */

const RELEASES_API = "https://api.github.com/repos/spokvulcan/tesseract/releases?per_page=10";
const DMG = "Tesseract.dmg";

type Release = {
  draft: boolean;
  prerelease: boolean;
  assets: { name: string; browser_download_url: string }[];
};

export async function GET() {
  try {
    const res = await fetch(RELEASES_API, {
      headers: { Accept: "application/vnd.github+json" },
      // a few minutes stale at most, and well inside GitHub's
      // unauthenticated rate limit
      next: { revalidate: 300 },
    });
    if (res.ok) {
      const releases: Release[] = await res.json();
      const dmg = releases
        .filter((r) => !r.draft && !r.prerelease)
        .flatMap((r) => r.assets)
        .find((a) => a.name === DMG);
      if (dmg) return NextResponse.redirect(dmg.browser_download_url, 302);
    }
  } catch {
    // GitHub unreachable: fall through to the list of releases
  }
  return NextResponse.redirect(`${GITHUB_URL}/releases`, 302);
}

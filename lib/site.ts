/* ------------------------------------------------------------------ */
/*  The site's one address and its outbound links. Kept out of the    */
/*  "use client" modules so server code can read the values rather    */
/*  than client references.                                           */
/* ------------------------------------------------------------------ */

export const SITE_URL = "https://thetesseract.app";

/** Every "Download for Mac" button. A route of ours, not GitHub's
    releases/latest link, which 404s while a new release still waits
    for its DMG (see app/download/route.ts). */
export const DOWNLOAD_URL = "/download";

export const GITHUB_URL = "https://github.com/spokvulcan/tesseract";

export const X_URL = "https://x.com/spok_vulkan";

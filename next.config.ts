import type { NextConfig } from "next";

/* The site answers on other hosts too: www, and the production alias
   Vercel assigns. Each served the whole site as a duplicate, so they
   fold into the one address the canonical tags name. Preview
   deployments have their own hosts and are untouched. */
const MIRRORS = ["www.thetesseract.app", "tesseract-web-mu.vercel.app"];

const nextConfig: NextConfig = {
  async redirects() {
    return MIRRORS.map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: "https://thetesseract.app/:path*",
      permanent: true,
    }));
  },
};

export default nextConfig;

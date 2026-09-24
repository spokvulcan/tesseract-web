import type { Metadata } from "next";
import { ServerPaper } from "@/components/papers/server";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/server",
  title: "Local OpenAI-compatible MLX server for Mac · Tesseract",
  description:
    "An OpenAI-compatible inference server on your Mac, with a tiered RAM and SSD prefix cache that makes reused context roughly 50 times cheaper.",
});

export default function Page() {
  return <ServerPaper />;
}

import type { Metadata } from "next";
import { CompanionPaper } from "@/components/papers/companion";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/companion",
  title: "The Companion: a proactive AI for your Mac · Tesseract",
  description:
    "An AI that lives the day beside you on your Mac, remembers what matters, and interrupts only when it is worth your time. In alpha, in active development.",
});

export default function Page() {
  return <CompanionPaper />;
}

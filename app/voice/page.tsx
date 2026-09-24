import type { Metadata } from "next";
import { VoicePaper } from "@/components/papers/voice";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/voice",
  title: "Natural offline text to speech for Mac · Tesseract",
  description:
    "Select any text and your Mac reads it aloud in a natural voice generated on your own machine. Design the voice by describing it in words.",
});

export default function Page() {
  return <VoicePaper />;
}

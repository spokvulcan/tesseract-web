import type { Metadata } from "next";
import { VoicePaper } from "@/components/papers/voice";

export const metadata: Metadata = {
  title: "Voice · Tesseract",
  description:
    "Select any text and your Mac reads it aloud in a natural voice generated on your own machine. Design the voice by describing it in words.",
};

export default function Page() {
  return <VoicePaper />;
}

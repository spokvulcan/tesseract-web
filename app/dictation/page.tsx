import type { Metadata } from "next";
import { DictationPaper } from "@/components/papers/dictation";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/dictation",
  title: "Offline dictation for Mac in 99 languages · Tesseract",
  description:
    "Hold option and space, and speak. Your words are typed into whatever app is in front of you, in 99 languages, with nothing leaving your Mac.",
});

export default function Page() {
  return <DictationPaper />;
}

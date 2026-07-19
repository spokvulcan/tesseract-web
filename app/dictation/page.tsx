import type { Metadata } from "next";
import { DictationPaper } from "@/components/papers/dictation";

export const metadata: Metadata = {
  title: "Dictation · Tesseract",
  description:
    "Hold option and space, and speak. Your words are typed into whatever app is in front of you, in 99 languages, with nothing leaving your Mac.",
};

export default function Page() {
  return <DictationPaper />;
}

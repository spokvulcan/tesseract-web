import type { Metadata } from "next";
import { AppshotPaper } from "@/components/papers/appshot";

export const metadata: Metadata = {
  title: "Appshot · Tesseract",
  description:
    "Tap the command key twice and the assistant sees the window in front of you. Proofread, translate, explain, all on your Mac.",
};

export default function Page() {
  return <AppshotPaper />;
}

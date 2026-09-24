import type { Metadata } from "next";
import { AppshotPaper } from "@/components/papers/appshot";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/appshot",
  title: "Appshot: ask AI about any window on your Mac · Tesseract",
  description:
    "Press both command keys and the assistant sees the window in front of you. Proofread, translate, explain, all on your Mac.",
});

export default function Page() {
  return <AppshotPaper />;
}

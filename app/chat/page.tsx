import type { Metadata } from "next";
import { ChatPaper } from "@/components/papers/chat";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/chat",
  title: "Private AI chat that runs entirely on your Mac · Tesseract",
  description:
    "A full chat assistant that runs whole on your Mac, on open models you own, with a living memory that carries what matters across months.",
});

export default function Page() {
  return <ChatPaper />;
}

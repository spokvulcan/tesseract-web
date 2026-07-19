import type { Metadata } from "next";
import { ChatPaper } from "@/components/papers/chat";

export const metadata: Metadata = {
  title: "Chat · Tesseract",
  description:
    "A full chat assistant that runs whole on your Mac, on open models you own, with a living memory that carries what matters across months.",
};

export default function Page() {
  return <ChatPaper />;
}

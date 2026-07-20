import type { Metadata } from "next";
import { CompanionPaper } from "@/components/papers/companion";

export const metadata: Metadata = {
  title: "The Companion · Tesseract",
  description:
    "An entity, not a feature. An AI that lives the day beside you, remembers what matters, and interrupts only when it is worth your time. Young, evolving, in the open.",
};

export default function Page() {
  return <CompanionPaper />;
}

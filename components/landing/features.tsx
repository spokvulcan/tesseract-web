"use client";

import { serif } from "./fonts";
import { In, SectionMark } from "./shared";
import { Theorem } from "@/components/papers/paper";

/* The survey of the instrument: one theorem per shipped capability,
   each one the abstract of a paper of its own. */

const THEOREMS = [
  {
    n: "3.1",
    name: "dictation",
    stmt: "Any text field becomes a microphone.",
    proof:
      "Hold option and space, and speak. Your words are typed into whatever app is in front of you, in any of 99 languages, and a second, tiny model repairs punctuation and misheard words before they land. Nothing leaves the Mac.",
    chips: ["hold ⌥ space, speak, release", "99 languages", "works offline"],
    href: "/dictation",
  },
  {
    n: "3.2",
    name: "voice",
    stmt: "It reads to you, in a voice made on your Mac.",
    proof:
      "Select any text and press fn and space: it is read aloud in a natural voice generated on your machine, the words lighting up as they are spoken. You design the voice by describing it in words, and it stays steady through the longest read.",
    chips: ["fn space on any selection", "a voice you design", "no cloud voice"],
    href: "/voice",
  },
  {
    n: "3.3",
    name: "chat",
    stmt: "It remembers what you told it in March.",
    proof:
      "Underneath everything is a full chat assistant, like the AI apps you already know, except it runs whole on your Mac. Speak or type, paste a screenshot, hand it a task. What matters from every conversation joins a living memory that can show its sources.",
    chips: ["text, voice, images", "living memory", "everything stays local"],
    href: "/chat",
  },
  {
    n: "3.4",
    name: "appshot",
    stmt: "Tap command twice, and it sees your window.",
    proof:
      "An Appshot captures the frontmost window in one gesture and stages it in the chat, named after the app it came from. Proofread the reply before it goes to the whole channel, translate the thread, decode the error, without describing your screen to anyone's cloud.",
    chips: ["double-tap ⌘", "the frontmost window, whole", "staged in the chat"],
    href: "/appshot",
  },
  {
    n: "3.5",
    name: "the server",
    stmt: "Your tools will think it is the cloud.",
    proof:
      "For developers: an OpenAI-compatible server on localhost, backed by a tiered RAM and SSD radix prefix cache that makes reused context ~50× cheaper than re-prefilling, rehydrating from disk at up to 0.87 GB/s. Same models, same machine, one brain.",
    chips: ["openai-compatible api", "~50× cheaper context reuse", "up to 0.87 GB/s reload"],
    href: "/server",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="px-6 pt-24 sm:px-12 lg:px-16 lg:pt-32">
      <SectionMark no="§ 03" title="the instrument" />

      <In delay={0.05}>
        <p className="mt-14 max-w-2xl text-lg font-light leading-relaxed text-[var(--body)] sm:text-xl">
          The Companion stands on an instrument that already works:{" "}
          <span className={`${serif.className} italic text-[var(--ink)]`}>
            shipped, measured, and worn daily.
          </span>{" "}
          Each piece has a paper of its own; these are the abstracts.
        </p>
      </In>

      <div className="mt-6">
        {THEOREMS.map((th, i) => (
          <Theorem key={th.n} {...th} delay={0.03 * i} />
        ))}
      </div>

      {/* measured values */}
      <div className="mt-20 grid gap-12 sm:grid-cols-3 sm:gap-8">
        {[
          ["99", "languages it understands when you speak"],
          ["16 GB", "of memory is all your Mac needs to start"],
          ["0", "bytes of your life sent anywhere, ever"],
        ].map(([v, l], i) => (
          <In key={v} delay={i * 0.08}>
            <p className="text-[clamp(2.6rem,4.4vw,4rem)] font-light leading-none tracking-[-0.03em]">
              {v}
            </p>
            <p className="mt-4 max-w-[24ch] font-mono text-[12px] leading-relaxed text-[var(--gray)]">
              {l}
            </p>
          </In>
        ))}
      </div>
    </section>
  );
}

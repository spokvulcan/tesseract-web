"use client";

import { serif } from "./fonts";
import { In, SectionMark } from "./shared";

const THEOREMS = [
  {
    n: "3.1",
    name: "dictation",
    stmt: "Any text field becomes a microphone.",
    proof:
      "Hold option and space, and speak. Your words are typed into whatever app is in front of you, in any of 99 languages, with nothing leaving the Mac. Release the keys and the sentence is already there.",
    cor: ["hold option + space", "99 languages", "works offline"],
  },
  {
    n: "3.2",
    name: "voice",
    stmt: "It answers out loud, in a voice made on your Mac.",
    proof:
      "Ask by voice or by text, and it speaks its answer in a natural voice that stays steady through long answers, generated entirely on your machine. No cloud voice, no robot monotone.",
    cor: ["speaks its answers", "natural long answers", "generated on your mac"],
  },
  {
    n: "3.3",
    name: "chat",
    stmt: "It remembers what you told it in March.",
    proof:
      "Underneath everything is a full chat assistant, like the AI apps you already know, except it runs on your Mac. Speak or type, paste a screenshot, hand it a task. What matters from every conversation joins its living memory, so it picks up where you left off, even weeks or months later.",
    cor: ["chat, voice, screenshots", "living memory", "everything stays local"],
  },
  {
    n: "3.4",
    name: "for developers",
    stmt: "Your tools will think it is the cloud.",
    proof:
      "Tesseract runs an OpenAI-compatible server on your Mac: point any OpenAI API client at localhost and the same local models answer. A tiered RAM + SSD prefix cache makes reused context ~50× cheaper than re-prefilling, rehydrating from disk at up to 0.87 GB/s. Nothing leaves the machine.",
    cor: ["openai-compatible api", "~50× cheaper context reuse", "up to 0.87 GB/s reload"],
  },
];

export function InstrumentSection() {
  return (
    <section id="instrument" className="px-6 pt-24 sm:px-12 lg:px-16 lg:pt-32">
      <SectionMark no="§ 03" title="the instrument" />

      <In delay={0.05}>
        <p className="mt-14 max-w-2xl text-lg font-light leading-relaxed text-[var(--body)] sm:text-xl">
          The Companion stands on an instrument that already works:{" "}
          <span className={`${serif.className} italic text-[var(--ink)]`}>
            shipped, measured, and worn daily.
          </span>
        </p>
      </In>

      <div className="mt-6">
        {THEOREMS.map((th, i) => (
          <In key={th.n} delay={0.03 * i}>
            <div className="grid gap-8 border-b border-[var(--ink)]/10 py-14 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5">
                <p className="font-mono text-[11px] text-[var(--blue)]">
                  theorem {th.n}{" "}
                  <span className="text-[var(--gray)]">({th.name})</span>
                </p>
                <h3 className="mt-4 text-3xl font-light leading-[1.08] tracking-[-0.02em] sm:text-4xl">
                  {th.stmt}
                </h3>
              </div>
              <div className="lg:col-span-4">
                <p className="text-[15px] font-light leading-relaxed text-[var(--body)]">
                  <span className={`${serif.className} italic text-[var(--ink)]`}>
                    Proof.{" "}
                  </span>
                  {th.proof}
                </p>
              </div>
              <div className="lg:col-span-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--faint)]">
                  in plain terms
                </p>
                <ul className="mt-3 space-y-2 font-mono text-[12px] text-[var(--body)]">
                  {th.cor.map((c) => (
                    <li key={c} className="flex gap-2.5">
                      <span className="text-[var(--blue)]">·</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </In>
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

      <In delay={0.15}>
        <p className="mt-16 max-w-3xl border-t border-[var(--ink)]/10 pt-6 text-[15px] font-light leading-relaxed text-[var(--body)]">
          <span className="font-mono text-[12px] text-[var(--blue)]">lemma 3.5 </span>
          When your Mac needs room for other work, Tesseract steps aside:
          the oldest memories move quietly to disk, and return the moment
          they are needed. It shares the machine the way a good guest
          shares a house.
        </p>
      </In>
    </section>
  );
}

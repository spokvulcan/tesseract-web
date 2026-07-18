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
    stmt: "It answers out loud in 123 milliseconds.",
    proof:
      "The voice is generated on your Mac and stays natural even for long answers. Measured from question to first sound: 123 milliseconds, faster than the pause before a person replies.",
    cor: ["123 ms to first sound", "natural long answers", "generated on your mac"],
  },
  {
    n: "3.3",
    name: "agent",
    stmt: "It remembers what you told it in March.",
    proof:
      "Speak or type, show it a screenshot, give it a goal. It uses its tools, keeps what matters in living memory, and picks up where you left off.",
    cor: ["uses its tools", "living memory", "sees screenshots"],
  },
  {
    n: "3.4",
    name: "for developers",
    stmt: "Your tools will think it is the cloud.",
    proof:
      "Any app that knows how to talk to OpenAI can talk to Tesseract instead, just by pointing at your own machine. The same mind that powers the Companion answers, and nothing leaves the Mac.",
    cor: ["works with openai tools", "the same mind answers", "nothing leaves the mac"],
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
          ["200,000", "words held in mind at once, entirely on your Mac"],
          ["0.87 GB/s", "measured speed of reloading its memory from disk"],
          ["~50×", "cheaper to reuse a memory than to rebuild it"],
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
          When the Mac needs room, the oldest memories step aside to disk.
          They are never lost, and they come back at up to 0.87 GB every
          second.
        </p>
      </In>
    </section>
  );
}

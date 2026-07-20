"use client";

import { serif } from "@/components/landing/fonts";
import { In, SectionMark, FigCaption } from "@/components/landing/shared";
import { PAPERS } from "./list";
import { PaperShell, PaperOpening, PaperAbstract, PaperClose, Practice, Theorem } from "./paper";
import { VoiceFigure } from "./figures";

const PAPER = PAPERS[2];

const PRACTICE = [
  ["the hotkey", "press fn and space with text selected · changeable in Settings"],
  ["the voice", "describe it in a sentence in Settings, or keep the standard one"],
  ["the model", "a voice-design model, ~4.2 GB, generated entirely on your Mac"],
  ["the assistant", "one switch makes every chat answer spoken aloud"],
];

export function VoicePaper() {
  return (
    <PaperShell>
      <PaperOpening
        paper={PAPER}
        title={
          <>
            It reads to you, in a voice{" "}
            <span className={`${serif.className} italic`}>made on your Mac.</span>
          </>
        }
        lede="Select any text, in any app, and press fn and space. Your Mac reads it aloud in a natural voice generated on your own machine, and the words light up as they are spoken. No cloud voice, no robot monotone."
      />

      <PaperAbstract keywords="select, press, listen · a voice you design · no cloud voice">
        Tesseract gives your Mac a voice worth listening to. An article, a
        contract, a long reply you want to hear before you send it: select
        it, press the keys, and listen, following along in the overlay or
        walking away. The voice itself is not picked from a system menu. It
        is generated, and you decide what it sounds like by describing it in
        words. The same voice can speak the assistant&apos;s answers out
        loud. Everything is synthesized locally, so what it reads to you
        stays between you and the machine.
      </PaperAbstract>

      <section className="px-6 pt-24 sm:px-12 lg:px-16 lg:pt-28">
        <SectionMark no="§ 01" title="the claims" />

        <div className="mt-6">
          <Theorem
            n="3.1"
            name="read aloud"
            stmt="Select, press, listen."
            proof="Any text in any app can be read to you: select it and press fn and space. A quiet overlay appears and the words light up one by one as the voice reaches them, so you can follow along, check a detail, or leave it playing while you do something else."
            chips={["fn space on any selection", "words light up as read", "works in every app"]}
          />
          <Theorem
            n="3.2"
            name="a designed voice"
            stmt="Describe a voice, and it exists."
            proof="The voice engine is a voice-design model. Instead of choosing between a handful of presets, you write a sentence about the voice you want, warm and unhurried, quick and dry, and that is the voice your Mac speaks with. It is generated on your machine, in the language you choose."
            chips={["a voice from a written description", "generated locally", "~4.2 GB model"]}
            delay={0.05}
          />
          <Theorem
            n="3.3"
            name="the long read"
            stmt="Steady through the long read, and it starts without waiting."
            proof="Synthetic voices tend to drift and wobble as a passage grows. This one stays steady through long answers and whole articles. And playback begins while the rest is still being generated, so a long read starts like a short one."
            chips={["long passages hold steady", "playback starts early", "speaks chat answers too"]}
            delay={0.1}
          />
        </div>
      </section>

      <section className="px-6 pt-24 sm:px-12 lg:px-16 lg:pt-28">
        <SectionMark no="§ 02" title="the read" />
        <In delay={0.1} className="mt-14">
          <VoiceFigure />
          <FigCaption>
            fig. 01: the read. The highlight walks the sentence as the voice
            speaks it, and generation runs ahead of playback.
          </FigCaption>
        </In>
      </section>

      <section className="px-6 pt-24 sm:px-12 lg:px-16 lg:pt-28">
        <SectionMark no="§ 03" title="in practice" />
        <Practice items={PRACTICE} />
      </section>

      <PaperClose
        paper={PAPER}
        note="The voice is shipped and in daily use. It runs on any Apple silicon Mac with 16 GB of memory, and what it reads to you is never sent anywhere."
      />
    </PaperShell>
  );
}

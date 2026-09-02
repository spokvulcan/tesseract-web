"use client";

import type { ComponentType } from "react";
import { serif } from "./fonts";
import { Chips, HAIR, In, PaperLink, SectionMark } from "./shared";
import { STATUS_NOTE, paperBySlug, type Paper } from "@/components/papers/list";
import {
  AppshotVignette,
  ChatVignette,
  DictationVignette,
  ServerVignette,
  SkillsVignette,
  VoiceVignette,
} from "./vignettes";

/* What works today: one block per shipped capability, each one a
   name, a plain headline, one sentence on how it works, and a drawn
   scene of the feature in the act. Each block links to its paper. */

type Feature = {
  /** The paper this block links to; name and route come from it. */
  paper: Paper["slug"];
  /** Shown instead of the paper's name when the block is a capability
      inside a paper rather than a paper of its own. */
  label?: string;
  keys: string;
  head: string;
  body: string;
  chips: string[];
  Scene: ComponentType;
  /** The developer strip: copy takes the wider column, scene the narrower. */
  compact?: boolean;
};

const FEATURES: Feature[] = [
  {
    paper: "dictation",
    keys: "⌥ space",
    head: "Speak. It types into any app.",
    body:
      "Hold option and space, talk, let go. Your words land in whatever app is in front of you, in 99 languages, checked for punctuation and misheard words by a small local model. Nothing leaves the Mac.",
    chips: ["hold ⌥ space, speak, release", "99 languages", "works offline"],
    Scene: DictationVignette,
  },
  {
    paper: "chat",
    keys: "⌃ space to talk",
    head: "The chat you already know, on your own Mac.",
    body:
      "Like ChatGPT or Claude, except every word stays on your machine. Type or talk, attach images, let it browse the web, and it remembers what matters across conversations, with sources you can check.",
    chips: ["text, voice, images", "remembers across chats", "runs on your Mac"],
    Scene: ChatVignette,
  },
  {
    paper: "appshot",
    keys: "⌘ ⌘ together",
    head: "Press both command keys. It sees your window.",
    body:
      "An Appshot grabs the window you are looking at and drops it into the chat, named after the app it came from. Ask about the error, the thread, the draft, without describing your screen to anyone.",
    chips: ["both ⌘ keys, once", "the frontmost window, whole", "lands in the chat"],
    Scene: AppshotVignette,
  },
  {
    paper: "chat",
    label: "skills",
    keys: "✦ above the chat",
    head: "One tap for the things you do every day.",
    body:
      "A ✦ button above the chat fans out into skills: proofread, reply, summarize, explain, translate. Tap one and whatever is in the composer, text or an Appshot, goes through it. Add your own as a folder with a markdown file.",
    chips: ["five built in", "works on an Appshot too", "write your own in markdown"],
    Scene: SkillsVignette,
  },
  {
    paper: "voice",
    keys: "fn space",
    head: "Select any text. It reads it aloud.",
    body:
      "Press fn and space on any selection and hear it in a natural voice generated on your Mac, the words lighting up as they are spoken. Describe the voice you want in plain words.",
    chips: ["fn space on any selection", "a voice you describe", "no cloud voice"],
    Scene: VoiceVignette,
  },
  {
    paper: "server",
    keys: "for developers",
    head: "Point your tools at it.",
    body:
      "Turn on the server and Tesseract answers on localhost as an OpenAI-compatible API. Works with Pi, Claude Code, OpenCode, or any AI harness. Same models, same machine.",
    chips: ["openai-compatible", "localhost only", "off until you switch it on"],
    Scene: ServerVignette,
    compact: true,
  },
];

const LAYOUT = {
  full: {
    row: "py-16 lg:py-20",
    copy: "lg:col-span-5",
    scene: "lg:col-span-7",
    head: "text-[clamp(2rem,3.4vw,3.1rem)] leading-[1.05] tracking-[-0.03em]",
    body: "max-w-md sm:text-base",
  },
  compact: {
    row: "py-14",
    copy: "lg:col-span-7",
    scene: "lg:col-span-5",
    head: "text-[clamp(1.6rem,2.6vw,2.3rem)] leading-[1.08] tracking-[-0.02em]",
    body: "max-w-lg",
  },
} as const;

function FeatureBlock({ f, index, flip }: { f: Feature; index: number; flip: boolean }) {
  const paper = paperBySlug(f.paper);
  const name = f.label ?? paper.name;
  const L = LAYOUT[f.compact ? "compact" : "full"];
  return (
    <In>
      <div className={`grid gap-10 border-t ${HAIR} lg:grid-cols-12 lg:items-center lg:gap-14 ${L.row}`}>
        <div className={`${L.copy} ${flip ? "lg:order-2" : ""}`}>
          <p className="font-mono text-[11px] text-[var(--blue)]">
            {String(index + 1).padStart(2, "0")}
            <span className="text-[var(--gray)]">
              {" "}· {name} · {f.keys}
            </span>
          </p>
          <h3 className={`mt-5 font-light ${L.head}`}>{f.head}</h3>
          <p className={`mt-6 text-[15px] font-light leading-relaxed text-[var(--body)] ${L.body}`}>
            {f.body}
          </p>
          <Chips chips={f.chips} className="mt-7" />
          <PaperLink href={`/${paper.slug}`} className="mt-7 text-[12px]">
            more about {name} →
          </PaperLink>
        </div>
        <div className={`${L.scene} ${flip ? "lg:order-1" : ""}`}>
          <f.Scene />
        </div>
      </div>
    </In>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="px-6 pt-24 sm:px-12 lg:px-16 lg:pt-32">
      <SectionMark no="§ 01" title="what works today" note={STATUS_NOTE.shipped} />

      <In delay={0.05}>
        <h2 className="mt-14 max-w-4xl text-[clamp(2.4rem,4.6vw,4.2rem)] font-light leading-[1.02] tracking-[-0.03em]">
          Everything here works today,{" "}
          <span className={`${serif.className} italic`}>entirely on your Mac.</span>
        </h2>
      </In>

      <In delay={0.12}>
        <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-[var(--body)] sm:text-lg">
          Six things you can use the minute it is installed. No account, no
          cloud, nothing sent anywhere. The Companion, further down, is where
          they are all headed.
        </p>
      </In>

      <div className="mt-16">
        {FEATURES.map((f, i) => (
          <FeatureBlock key={f.label ?? f.paper} f={f} index={i} flip={!f.compact && i % 2 === 1} />
        ))}
      </div>

      {/* measured values */}
      <div className={`mt-4 grid gap-12 border-t ${HAIR} pt-16 sm:grid-cols-3 sm:gap-8`}>
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

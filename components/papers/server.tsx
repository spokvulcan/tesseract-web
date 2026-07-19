"use client";

import { serif } from "@/components/landing/fonts";
import { In, SectionMark, FigCaption, HAIR } from "@/components/landing/shared";
import { PAPERS } from "./list";
import { PaperShell, PaperOpening, PaperAbstract, PaperClose, Theorem } from "./paper";
import { CacheFigure } from "./figures";

const PAPER = PAPERS[5];

const PRACTICE = [
  ["the endpoint", "POST /v1/chat/completions · streaming"],
  ["the address", "localhost, port 8321 by default"],
  ["the models", "the same local catalog the app runs, ~3.5 GB to ~21 GB"],
  ["the dashboards", "Activity and Cache pages in the app show every request live"],
  ["also on board", "an /mcp endpoint lets local agents drive a real browser"],
];

export function ServerPaper() {
  return (
    <PaperShell>
      <PaperOpening
        paper={PAPER}
        title={
          <>
            Your tools will think{" "}
            <span className={`${serif.className} italic`}>it is the cloud.</span>
          </>
        }
        lede="Tesseract runs an OpenAI-compatible inference server on your Mac. Point any client with a base-URL field at localhost, and the same local models that power the app answer. This is the one paper on this site allowed to speak jargon."
      />

      <PaperAbstract keywords="openai-compatible · tiered prefix cache · localhost only">
        The server exists because a good agent needs a good engine, and the
        engine turned out to be a product of its own. It speaks the
        chat-completions API, so existing SDKs, editors, and agent tools work
        by changing one line. The interesting part is what happens to
        context: a tiered RAM and SSD radix prefix cache means the tokens
        you already paid to prefill stay paid for, across requests, across
        conversations, and across app restarts of the tools that call it.
      </PaperAbstract>

      <section className="px-6 pt-24 sm:px-12 lg:px-16 lg:pt-28">
        <SectionMark no="§ 01" title="the claims" />

        <div className="mt-6">
          <Theorem
            n="6.1"
            name="compatibility"
            stmt="Change one line, keep your stack."
            proof="The server answers POST /v1/chat/completions on localhost, port 8321 by default, with streaming. Anything built against the OpenAI API, an SDK, an editor plugin, an agent framework, only needs its base URL changed. The models behind it are the same catalog the app runs, so your tools and your assistant share one brain."
            chips={["/v1/chat/completions", "streaming responses", "any OpenAI API client"]}
          />
          <Theorem
            n="6.2"
            name="the cache"
            stmt="Context you already paid for stays paid for."
            proof="Agents resend the same growing prefix on every turn, and on-device that re-prefill is the whole latency story. The radix cache keeps hot prefixes in RAM, spills older ones to SSD, and rehydrates from disk at up to 0.87 GB/s, so reusing a context costs roughly 50 times less than recomputing it."
            chips={["~50× cheaper context reuse", "up to 0.87 GB/s from SSD", "hit rates other stacks miss"]}
            delay={0.05}
          />
          <Theorem
            n="6.3"
            name="a good guest"
            stmt="It shares the machine."
            proof="When your Mac needs room for other work, Tesseract steps aside: the oldest cache entries move quietly to disk and return the moment they are needed. And you can watch all of it happen. The app's Activity and Cache pages show every request as it runs and what the cache is holding, live."
            chips={["yields memory under pressure", "live activity view", "nothing leaves localhost"]}
            delay={0.1}
          />
        </div>
      </section>

      <section className="px-6 pt-24 sm:px-12 lg:px-16 lg:pt-28">
        <SectionMark no="§ 02" title="the cache" />
        <In delay={0.1} className="mt-14">
          <CacheFigure />
          <FigCaption>
            fig. 01: the tiered prefix cache. Only the new tokens are work;
            the rest is remembered, in RAM or on disk.
          </FigCaption>
        </In>
      </section>

      <section className="px-6 pt-24 sm:px-12 lg:px-16 lg:pt-28">
        <SectionMark no="§ 03" title="in practice" />
        <In delay={0.05}>
          <dl className="mt-10 max-w-2xl">
            {PRACTICE.map(([k, v]) => (
              <div
                key={k}
                className={`flex flex-col gap-1 border-b ${HAIR} py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6`}
              >
                <dt className="font-mono text-[12px] text-[var(--gray)]">{k}</dt>
                <dd className="text-[15px] font-light sm:text-right">{v}</dd>
              </div>
            ))}
          </dl>
        </In>
      </section>

      <PaperClose
        paper={PAPER}
        note="The server ships inside the app and turns on with one switch. It binds to localhost, serves the models you already downloaded, and sends nothing anywhere."
      />
    </PaperShell>
  );
}

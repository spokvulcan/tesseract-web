"use client";

import { ArrowUpRight } from "lucide-react";
import { serif } from "./fonts";
import { DOWNLOAD_URL, GITHUB_URL, In, SectionMark } from "./shared";

function PrivacySection() {
  return (
    <section id="privacy" className="px-6 pt-24 sm:px-12 lg:px-16 lg:pt-32">
      <SectionMark no="§ 06" title="privacy" />

      <div className="mx-auto max-w-3xl py-20 text-center lg:py-28">
        <In>
          <p className="font-mono text-[11px] text-[var(--blue)]">theorem 6.1</p>
        </In>
        <In delay={0.08}>
          <h2 className="mt-6 text-[clamp(2.6rem,5.2vw,4.8rem)] font-light leading-[1.02] tracking-[-0.03em]">
            Your data never
            <br />
            leaves your Mac.
          </h2>
        </In>
        <In delay={0.16}>
          <p className="mx-auto mt-10 max-w-xl text-base font-light leading-relaxed text-[var(--body)] sm:text-lg">
            <span className={`${serif.className} italic text-[var(--ink)]`}>
              Proof.{" "}
            </span>
            Every model lives on your disk. Every thought is computed on your
            chip. There is nowhere to upload to, because there is no server
            to trust. A companion to your whole life is only possible if your
            whole life stays yours.{" "}
            <span className="text-[var(--blue)]">∎</span>
          </p>
        </In>
      </div>

      <In delay={0.08}>
        <div className="grid grid-cols-2 gap-px border border-[var(--ink)]/10 bg-[var(--ink)]/10 lg:grid-cols-4">
          {[
            ["A1", "no accounts"],
            ["A2", "no telemetry"],
            ["A3", "no cloud"],
            ["A4", "offline after setup"],
          ].map(([a, l]) => (
            <div key={a} className="bg-[var(--paper)] px-6 py-6">
              <p className="font-mono text-[11px] text-[var(--blue)]">{a}</p>
              <p className="mt-2 font-mono text-[13px] text-[var(--ink)]">{l}</p>
            </div>
          ))}
        </div>
      </In>
    </section>
  );
}

function MachineSection() {
  return (
    <section className="px-6 pt-24 sm:px-12 lg:px-16 lg:pt-32">
      <SectionMark no="§ 07" title="what you need" />

      <div className="mt-14 grid gap-16 lg:grid-cols-2">
        <In>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--faint)]">
            your mac
          </p>
          <dl className="mt-5">
            {[
              ["system", "macOS 26 or later"],
              ["chip", "Apple silicon, M1 or later"],
              ["memory", "48 GB or more recommended for the Companion"],
              ["network", "needed once, to download the models"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-6 border-b border-[var(--ink)]/10 py-4"
              >
                <dt className="font-mono text-[12px] text-[var(--gray)]">{k}</dt>
                <dd className="text-right text-[15px] font-light">{v}</dd>
              </div>
            ))}
          </dl>
        </In>

        <In delay={0.08}>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--faint)]">
            getting started
          </p>
          <ol className="mt-5">
            {[
              "Download the signed, notarized app.",
              "The first launch downloads the models. That is the only time it needs the internet.",
              "Grant microphone and accessibility access.",
              "From then on, everything happens on your Mac.",
            ].map((s, i) => (
              <li
                key={s}
                className="flex gap-5 border-b border-[var(--ink)]/10 py-4"
              >
                <span className="font-mono text-[12px] text-[var(--blue)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] font-light leading-relaxed text-[var(--body)]">
                  {s}
                </span>
              </li>
            ))}
          </ol>
        </In>
      </div>
    </section>
  );
}

function DownloadSection() {
  return (
    <section id="download" className="px-6 py-28 text-center sm:px-12 lg:py-40">
      <In>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em]">
          <span className="text-[var(--blue)]">§ 08</span>
          <span className="ml-4 text-[var(--gray)]">see for yourself</span>
        </p>
      </In>
      <In delay={0.08}>
        <h2 className="mt-8 text-[clamp(2.6rem,5.2vw,4.8rem)] font-light leading-[1.02] tracking-[-0.03em]">
          Download{" "}
          <span className={`${serif.className} italic`}>the proof.</span>
        </h2>
      </In>
      <In delay={0.14}>
        <p className="mx-auto mt-8 max-w-md text-base font-light leading-relaxed text-[var(--body)] sm:text-lg">
          Free. Signed and notarized. The Companion waits behind one
          experimental switch in Settings.
        </p>
      </In>
      <In delay={0.2}>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
          <a
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-8 py-4 font-mono text-sm text-[var(--paper)] transition-colors hover:bg-[var(--blue)]"
          >
            Download for Mac
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-[var(--gray)] underline decoration-[var(--ink)]/20 underline-offset-4 transition-colors hover:text-[var(--blue)]"
          >
            read the source
          </a>
        </div>
      </In>
    </section>
  );
}

export function ClosingSections() {
  return (
    <>
      <PrivacySection />
      <MachineSection />
      <DownloadSection />
    </>
  );
}

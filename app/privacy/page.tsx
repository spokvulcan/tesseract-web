import { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Privacy Policy · Tesseract",
  description:
    "Tesseract privacy policy. No data collection, no tracking, no accounts. Everything runs locally on your Mac.",
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <Reveal>
        <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl leading-[0.85] tracking-tighter mb-4">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground text-sm">
          Last updated: March 11, 2026
        </p>
      </Reveal>

      <div className="mt-14 space-y-14 text-lg leading-relaxed">
        <Reveal delay={0.05}>
          <section>
            <h2 className="font-display text-3xl tracking-tight mb-5">Overview</h2>
            <p className="text-muted-foreground">
              Tesseract is designed to be fully private. All AI inference
              runs locally on your Mac using Apple Silicon. We do not collect,
              transmit, or store any of your personal data. There are no accounts,
              no analytics, and no telemetry.
            </p>
          </section>
        </Reveal>

        <Reveal delay={0.1}>
          <section>
            <h2 className="font-display text-3xl tracking-tight mb-5">
              Data We Collect
            </h2>
            <p className="text-muted-foreground">
              <strong className="text-foreground">None.</strong> Tesseract
              does not collect any personal information. We have no servers that
              receive your data. The app does not contain analytics, crash
              reporting, or tracking of any kind.
            </p>
          </section>
        </Reveal>

        <Reveal delay={0.15}>
          <section>
            <h2 className="font-display text-3xl tracking-tight mb-5">
              Data Stored on Your Device
            </h2>
            <p className="text-muted-foreground mb-5">
              Tesseract stores the following data locally on your Mac, in
              its private application folder:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 shrink-0" />
                <span>
                  <strong className="text-foreground">User preferences</strong>:
                  stored via UserDefaults (hotkey configuration, model selection,
                  display settings).
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 shrink-0" />
                <span>
                  <strong className="text-foreground">AI models</strong>: downloaded
                  once on first launch and stored locally for offline use.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 shrink-0" />
                <span>
                  <strong className="text-foreground">Conversation history</strong>:
                  agent conversations are stored locally on your device. They are
                  never transmitted anywhere.
                </span>
              </li>
            </ul>
            <p className="text-muted-foreground mt-5">
              You can delete all stored data at any time by removing the app and
              its associated data from your Mac.
            </p>
          </section>
        </Reveal>

        <Reveal delay={0.2}>
          <section>
            <h2 className="font-display text-3xl tracking-tight mb-5">
              Microphone Access
            </h2>
            <p className="text-muted-foreground">
              Tesseract requests microphone access for push-to-talk voice
              dictation. Audio is processed entirely on-device using a local
              speech recognition model. Audio recordings are not stored or
              transmitted. The microphone is only active while you hold the
              dictation hotkey.
            </p>
          </section>
        </Reveal>

        <Reveal delay={0.25}>
          <section>
            <h2 className="font-display text-3xl tracking-tight mb-5">
              Accessibility Access
            </h2>
            <p className="text-muted-foreground">
              Tesseract requests accessibility permission to register global
              hotkeys and to simulate keyboard paste into the active application.
              This permission is used solely for dictation insertion and hotkey
              functionality.
            </p>
          </section>
        </Reveal>

        <Reveal delay={0.3}>
          <section>
            <h2 className="font-display text-3xl tracking-tight mb-5">
              Network Access
            </h2>
            <p className="text-muted-foreground">
              The app requires a one-time internet connection to download AI
              models on first launch. After models are downloaded, Tesseract
              functions fully offline. No user data is ever sent over the
              network.
            </p>
          </section>
        </Reveal>

        <Reveal delay={0.35}>
          <section>
            <h2 className="font-display text-3xl tracking-tight mb-5">
              Third-Party Services
            </h2>
            <p className="text-muted-foreground">
              Tesseract does not integrate with any third-party analytics,
              advertising, or data-processing services. The only external network
              access is for the one-time initial model download.
            </p>
          </section>
        </Reveal>

        <Reveal delay={0.4}>
          <section>
            <h2 className="font-display text-3xl tracking-tight mb-5">
              Children&apos;s Privacy
            </h2>
            <p className="text-muted-foreground">
              Tesseract does not collect any data from any user, including
              children. Because no data is collected, there is no risk of
              children&apos;s data being gathered or shared.
            </p>
          </section>
        </Reveal>

        <Reveal delay={0.45}>
          <section>
            <h2 className="font-display text-3xl tracking-tight mb-5">
              Changes to This Policy
            </h2>
            <p className="text-muted-foreground">
              If we update this privacy policy, we will post the revised version
              on this page with an updated date. Because Tesseract collects
              no data, we do not anticipate material changes.
            </p>
          </section>
        </Reveal>

        <Reveal delay={0.5}>
          <section>
            <h2 className="font-display text-3xl tracking-tight mb-5">Contact</h2>
            <p className="text-muted-foreground">
              If you have questions about this privacy policy, please reach out
              via our{" "}
              <a
                href="/support"
                className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
              >
                support page
              </a>
              .
            </p>
          </section>
        </Reveal>
      </div>
    </PageShell>
  );
}

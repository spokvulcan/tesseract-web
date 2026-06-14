import { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Privacy Policy — Tesseract Agent",
  description:
    "Tesseract Agent privacy policy. No data collection, no tracking, no accounts. Everything runs locally on your Mac.",
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <div className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-6 flex items-center gap-3">
        <span className="w-6 h-px bg-muted-foreground" />
        Legal
      </div>

      <h1 className="font-display text-4xl lg:text-5xl tracking-tight mb-3">
        Privacy Policy
      </h1>
      <p className="text-muted-foreground text-sm mb-14">
        Last updated: March 11, 2026
      </p>

      <div className="space-y-10 text-[15px] leading-relaxed">
        <section>
          <h2 className="font-display text-xl tracking-tight mb-3">Overview</h2>
          <p className="text-muted-foreground">
            Tesseract Agent is designed to be fully private. All AI inference
            runs locally on your Mac using Apple Silicon. We do not collect,
            transmit, or store any of your personal data. There are no accounts,
            no analytics, and no telemetry.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl tracking-tight mb-3">
            Data We Collect
          </h2>
          <p className="text-muted-foreground">
            <strong className="text-foreground">None.</strong> Tesseract Agent
            does not collect any personal information. We have no servers that
            receive your data. The app does not contain analytics, crash
            reporting, or tracking of any kind.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl tracking-tight mb-3">
            Data Stored on Your Device
          </h2>
          <p className="text-muted-foreground mb-4">
            Tesseract Agent stores the following data locally on your Mac, within
            its sandboxed application container:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2 shrink-0" />
              <span>
                <strong className="text-foreground">User preferences</strong> —
                stored via UserDefaults (hotkey configuration, model selection,
                display settings).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2 shrink-0" />
              <span>
                <strong className="text-foreground">AI models</strong> — downloaded
                once on first launch and stored locally for offline use.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2 shrink-0" />
              <span>
                <strong className="text-foreground">Conversation history</strong> —
                agent conversations are stored locally on your device. They are
                never transmitted anywhere.
              </span>
            </li>
          </ul>
          <p className="text-muted-foreground mt-4">
            You can delete all stored data at any time by removing the app and
            its associated data from your Mac.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl tracking-tight mb-3">
            Microphone Access
          </h2>
          <p className="text-muted-foreground">
            Tesseract Agent requests microphone access for push-to-talk voice
            dictation. Audio is processed entirely on-device using a local
            speech recognition model. Audio recordings are not stored or
            transmitted. The microphone is only active while you hold the
            dictation hotkey.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl tracking-tight mb-3">
            Accessibility Access
          </h2>
          <p className="text-muted-foreground">
            Tesseract Agent requests accessibility permission to register global
            hotkeys and to simulate keyboard paste into the active application.
            This permission is used solely for dictation insertion and hotkey
            functionality.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl tracking-tight mb-3">
            Network Access
          </h2>
          <p className="text-muted-foreground">
            The app requires a one-time internet connection to download AI
            models on first launch. After models are downloaded, Tesseract
            Agent functions fully offline. No user data is ever sent over the
            network.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl tracking-tight mb-3">
            Third-Party Services
          </h2>
          <p className="text-muted-foreground">
            Tesseract Agent does not integrate with any third-party analytics,
            advertising, or data-processing services. The only external network
            access is for the one-time initial model download.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl tracking-tight mb-3">
            Children&apos;s Privacy
          </h2>
          <p className="text-muted-foreground">
            Tesseract Agent does not collect any data from any user, including
            children. Because no data is collected, there is no risk of
            children&apos;s data being gathered or shared.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl tracking-tight mb-3">
            Changes to This Policy
          </h2>
          <p className="text-muted-foreground">
            If we update this privacy policy, we will post the revised version
            on this page with an updated date. Because Tesseract Agent collects
            no data, we do not anticipate material changes.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl tracking-tight mb-3">Contact</h2>
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
      </div>
    </PageShell>
  );
}

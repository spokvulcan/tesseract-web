import { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Support — Tesseract Agent",
  description:
    "Get help with Tesseract Agent. Find answers to common questions or contact support.",
};

export default function SupportPage() {
  return (
    <PageShell>
      <div className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-6 flex items-center gap-3">
        <span className="w-6 h-px bg-muted-foreground" />
        Help
      </div>

      <h1 className="font-display text-4xl lg:text-5xl tracking-tight mb-3">
        Support
      </h1>
      <p className="text-muted-foreground text-lg mb-14">
        Need help with Tesseract Agent? Find answers below or get in touch.
      </p>

      {/* Contact */}
      <a
        href="mailto:support@thetesseract.app"
        className="flex items-center gap-4 p-5 border border-black/[0.06] hover:border-black/[0.12] hover:bg-black/[0.01] transition-colors mb-16 inline-flex"
      >
        <Mail className="w-5 h-5 text-muted-foreground shrink-0" />
        <div>
          <div className="text-sm font-medium">Email Support</div>
          <div className="text-sm text-muted-foreground">support@thetesseract.app</div>
        </div>
      </a>

      {/* FAQ */}
      <h2 className="font-display text-2xl tracking-tight mb-8">
        Frequently Asked Questions
      </h2>

      <div className="space-y-0">
        {[
          {
            q: "What are the system requirements?",
            a: "Tesseract Agent requires macOS 26 (Tahoe) or later and an Apple Silicon Mac (M1 or newer). An internet connection is needed only for the one-time model download on first launch.",
          },
          {
            q: "How much disk space do the models need?",
            a: "The initial model download is several gigabytes depending on which features you use. Models are stored locally and only need to be downloaded once.",
          },
          {
            q: "Does Tesseract Agent work offline?",
            a: "Yes. After the one-time model download on first launch, Tesseract Agent works entirely offline. No internet connection is required for any of its features.",
          },
          {
            q: "Is my data sent to the cloud?",
            a: "No. All processing happens locally on your Mac using Apple Silicon. Your voice recordings, conversations, and generated content never leave your device. There are no accounts, no analytics, and no telemetry.",
          },
          {
            q: "How do I set up dictation?",
            a: "Launch the app, grant Microphone and Accessibility permissions when prompted, then press and hold Option+Space to dictate. Release to insert the transcription. You can customize the hotkey in Settings.",
          },
          {
            q: "The app is asking for Accessibility permission. Why?",
            a: "Accessibility permission is needed for two things: registering global hotkeys (so features work from any app) and simulating keyboard paste to insert text into the active text field.",
          },
          {
            q: "Can I change the hotkeys?",
            a: "Yes. Open the app's Settings to customize the hotkeys for dictation, text-to-speech, and the agent. Default hotkeys are Option+Space, fn+Space, and Control+Space respectively.",
          },
          {
            q: "Dictation isn't working. What should I check?",
            a: "Make sure you've granted both Microphone and Accessibility permissions in System Settings > Privacy & Security. Also ensure the model has finished downloading (check the app's status). Try restarting the app if permissions were just granted.",
          },
          {
            q: "How do I uninstall and remove all data?",
            a: "Delete Tesseract Agent from your Applications folder. To remove all associated data including downloaded models, delete the app's container from ~/Library (or use a tool like AppCleaner).",
          },
          {
            q: "How do I request a refund?",
            a: "Purchases are handled through the Mac App Store. To request a refund, visit reportaproblem.apple.com and sign in with your Apple Account.",
          },
        ].map((item, i) => (
          <details
            key={i}
            className="group border-b border-black/[0.06] overflow-hidden"
          >
            <summary className="flex items-center justify-between py-5 cursor-pointer text-sm font-medium hover:text-muted-foreground transition-colors list-none">
              {item.q}
              <span className="text-muted-foreground group-open:rotate-45 transition-transform text-lg leading-none ml-4 shrink-0">
                +
              </span>
            </summary>
            <div className="pb-5 text-sm text-muted-foreground leading-relaxed">
              {item.a}
            </div>
          </details>
        ))}
      </div>

      {/* Still need help */}
      <div className="mt-16 p-10 border border-black/[0.06] text-center">
        <h3 className="font-display text-xl tracking-tight mb-3">
          Still need help?
        </h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
          If you couldn&apos;t find what you&apos;re looking for, send us an
          email and we&apos;ll get back to you as soon as possible.
        </p>
        <Button
          asChild
          className="rounded-full bg-[#111] text-[#f5f2ed] hover:bg-[#333]"
        >
          <a href="mailto:support@thetesseract.app">Contact Support</a>
        </Button>
      </div>
    </PageShell>
  );
}

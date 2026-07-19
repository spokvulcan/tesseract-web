import { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Support · Tesseract",
  description:
    "Get help with Tesseract. Find answers to common questions or contact support.",
};

export default function SupportPage() {
  return (
    <PageShell>
      <Reveal>
        <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl leading-[0.85] tracking-tighter mb-6">
          Support
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
          Need help with Tesseract? Find answers below or get in touch.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-14 mb-16">
          <a
            href="mailto:support@thetesseract.app"
            className="flex items-center gap-4 p-5 border border-border hover:border-foreground/10 hover:bg-secondary/50 transition-colors inline-flex"
          >
            <Mail className="w-5 h-5 text-muted-foreground shrink-0" />
            <div>
              <div className="text-base font-medium">Email Support</div>
              <div className="text-base text-muted-foreground">support@thetesseract.app</div>
            </div>
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <h2 className="font-display text-4xl tracking-tight mb-12">
          Frequently Asked Questions
        </h2>
      </Reveal>

      <div className="space-y-0">
        {[
          {
            q: "What are the system requirements?",
            a: "Tesseract requires macOS 26 or later and an Apple Silicon Mac (M1 or newer). An internet connection is needed only for the one-time model download on first launch.",
          },
          {
            q: "How much disk space do the models need?",
            a: "The initial model download is several gigabytes depending on which features you use. Models are stored locally and only need to be downloaded once.",
          },
          {
            q: "Does Tesseract work offline?",
            a: "Yes. After the one-time model download on first launch, Tesseract works entirely offline. No internet connection is required for any of its features.",
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
            a: "Delete Tesseract from your Applications folder. To remove all associated data including downloaded models, delete the app's container from ~/Library (or use a tool like AppCleaner).",
          },
          {
            q: "How do I request a refund?",
            a: "Please reach out via support@thetesseract.app and we'll help you with your purchase.",
          },
        ].map((item, i) => (
          <details
            key={i}
            className="group border-b border-border overflow-hidden"
          >
            <summary className="flex items-center justify-between py-5 cursor-pointer text-base font-medium hover:text-muted-foreground transition-colors list-none">
              {item.q}
              <span className="text-muted-foreground group-open:rotate-45 transition-transform text-lg leading-none ml-4 shrink-0">
                +
              </span>
            </summary>
            <div className="pb-5 text-lg text-muted-foreground leading-relaxed">
              {item.a}
            </div>
          </details>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-20 text-center">
          <h3 className="font-display text-4xl sm:text-5xl tracking-tight mb-5">
            Still need help?
          </h3>
          <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto leading-relaxed">
            Open an issue on GitHub and we&apos;ll get back to you as soon as possible.
          </p>
          <Button
            size="lg"
            className="rounded-full h-12 px-8 text-base bg-[#111] dark:bg-[#f0f0f0] text-[#f5f2ed] dark:text-[#0a0a0a] hover:bg-[#333] dark:hover:bg-[#ddd]"
            asChild
          >
            <a href="https://github.com/spokvulcan/tesseract/issues" target="_blank" rel="noopener noreferrer">
              Open an Issue
            </a>
          </Button>
        </div>
      </Reveal>
    </PageShell>
  );
}

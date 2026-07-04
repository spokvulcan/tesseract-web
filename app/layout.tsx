import type { Metadata } from "next";
import { IBM_Plex_Serif, Space_Mono, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import "./custom.css";
import { ThemeProvider } from "@/components/theme-provider";

const display = IBM_Plex_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500"],
  display: "swap",
});

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400"],
  display: "swap",
});

const mono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thetesseract.app"),
  title: "Tesseract — On-Device Intelligence for macOS",
  description:
    "A privacy-focused AI assistant for macOS. Dictation, text-to-speech, a local AI agent, and an OpenAI-compatible inference server — powered by MLX, processed entirely on-device.",
  icons: {
    icon: [
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-64x64.png", sizes: "64x64", type: "image/png" },
      { url: "/icon-128x128.png", sizes: "128x128", type: "image/png" },
    ],
    apple: [
      { url: "/icon-256x256.png", sizes: "256x256", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Tesseract — On-Device Intelligence for macOS",
    description:
      "A privacy-focused AI assistant for macOS. Dictation, text-to-speech, a local AI agent, and an OpenAI-compatible inference server — powered by MLX, processed entirely on-device.",
    siteName: "Tesseract",
    images: [
      {
        url: "/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "Tesseract",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Tesseract — On-Device Intelligence for macOS",
    description:
      "A privacy-focused AI assistant for macOS — powered by MLX, processed entirely on-device.",
    images: ["/icon-512x512.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="antialiased font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

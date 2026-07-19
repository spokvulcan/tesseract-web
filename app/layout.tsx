import type { Metadata, Viewport } from "next";
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
  title: "Tesseract: the first AI you can tell everything",
  description:
    "A companion, not a chatbot. Tesseract lives on your Mac, remembers what matters, and guards your attention. Nothing you tell it ever leaves the machine.",
  icons: {
    // the mark: svg with a png fallback for browsers without svg favicons
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-64x64.png", sizes: "64x64", type: "image/png" },
    ],
    apple: [
      { url: "/icon-256x256.png", sizes: "256x256", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Tesseract: the first AI you can tell everything",
    description:
      "A companion, not a chatbot. Tesseract lives on your Mac, remembers what matters, and guards your attention. Nothing you tell it ever leaves the machine.",
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
    title: "Tesseract: the first AI you can tell everything",
    description:
      "A companion, not a chatbot. Tesseract lives on your Mac, remembers what matters, and guards your attention. Nothing you tell it ever leaves the machine.",
    images: ["/icon-512x512.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f6f2" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
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

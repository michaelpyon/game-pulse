import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Genre-agnostic game health signal model: one transparent, confidence-scored 0 to 100 number across Momentum, Community, Content, and Creator. Runs on a disclosed sample dataset (snapshot, Mar 2026).";

export const metadata: Metadata = {
  metadataBase: new URL("https://game-pulse.vercel.app"),
  title: "GamePulse: Game Health Signal Engine",
  description,
  openGraph: {
    title: "GamePulse: Game Health Signal Engine",
    description,
    url: "https://game-pulse.vercel.app",
    siteName: "GamePulse",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GamePulse: Game Health Signal Engine",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Nav />
        <main className="min-h-screen pt-14">
          {children}
        </main>
        <footer className="border-t border-border bg-card/50 py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-cyan">GP</span>
                <span className="text-xs text-muted-foreground">
                  GamePulse Signal Engine
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Sample data for demonstration (snapshot, Mar 2026).
              </p>
              <span className="text-xs font-mono text-muted-foreground">
                Built by Michael Pyon
              </span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

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

export const metadata: Metadata = {
  title: "GamePulse: Game Health Signal Engine",
  description: "Genre-agnostic competitive intelligence for game studios. Transparent, confidence-scored health tracking.",
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
                Mock data for demonstration. Scores refresh daily.
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

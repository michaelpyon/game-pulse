"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity } from "lucide-react";

const links = [
  { href: "/", label: "Overview" },
  { href: "/alerts", label: "Alerts" },
  { href: "/methodology", label: "How It Works" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-cyan/10 border border-cyan/20">
            <Activity className="h-4 w-4 text-cyan" />
          </div>
          <span className="text-base font-semibold tracking-tight text-foreground">
            GamePulse
          </span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`label-upper rounded-md px-2.5 py-1.5 transition-colors sm:px-3 ${
                  isActive
                    ? "bg-cyan/10 text-cyan"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

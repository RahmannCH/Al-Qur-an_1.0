"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { useSettingsStore } from "@/store/settings-store";
import { BookOpen } from "lucide-react";

export function Header() {
  const lastRead = useSettingsStore((s) => s.lastRead);

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="hidden sm:inline">Al-Qur&apos;an</span>
        </Link>

        <div className="flex items-center gap-3">
          {lastRead && (
            <Link
              href={`/surah/${lastRead.surahId}#verse-${lastRead.verseNumber}`}
              className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md font-medium">
                Terakhir: {lastRead.surahName} : {lastRead.verseNumber}
              </span>
            </Link>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

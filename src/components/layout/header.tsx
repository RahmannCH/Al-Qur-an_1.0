"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { sfx } from "@/lib/sfx";
import { ThemeToggle } from "./theme-toggle";
import { useSettingsStore } from "@/store/settings-store";
import {
  BookOpen,
  Gamepad2,
  Menu,
  Heart,
  MessageCircle,
  Search,
  Trophy,
  Bookmark,
  Settings,
  Calculator,
  Home,
  Clock,
  Sparkles,
  HelpCircle,
  Layers,
  Grid,
  Zap,
  Brain,
  Boxes,
  UserCheck,
  BookMarked,
  Lightbulb,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";

export const MENU_SECTIONS = [
  {
    title: "Menu Utama",
    items: [
      { href: "/", label: "Home", icon: Home, desc: "Halaman depan & ringkasan" },
      { href: "/prayer-times", label: "Jadwal Sholat", icon: Clock, desc: "Waktu sholat & kiblat" },
      { href: "/calculator", label: "Kalkulator Islami", icon: Calculator, desc: "Hitung Zakat & Waris" },
      { href: "/chat", label: "AI Chat Islami", icon: MessageCircle, desc: "Tanya jawab seputar Islam" },
    ],
  },
  {
    title: "Al-Qur'an & Ibadah",
    items: [
      { href: "/quran", label: "Baca Qur'an", icon: BookOpen, desc: "114 Surah & Terjemahan" },
      { href: "/memorize", label: "Hafalan & Muraja'ah", icon: BookMarked, desc: "Sistem hafalan interaktif" },
      { href: "/dua", label: "Koleksi Doa", icon: Heart, desc: "Doa harian pilihan" },
      { href: "/dzikir", label: "Dzikir & Tasbih", icon: Sparkles, desc: "Counter tasbih digital" },
      { href: "/search", label: "Cari Ayat", icon: Search, desc: "Pencarian ayat & terjemahan" },
      { href: "/bookmarks", label: "Bookmark", icon: Bookmark, desc: "Ayat tersimpan" },
    ],
  },
  {
    title: "Ruhiyah & Bimbingan",
    items: [
      { href: "/ruhiyah", label: "P3K Jiwa", icon: Lightbulb, desc: "Spiritual First Aid" },
    ],
  },
  {
    title: "Arcade & Kuis",
    items: [
      { href: "/games", label: "Arcade Hub", icon: Gamepad2, desc: "Pusat game edukasi" },
      { href: "/games/tebak-ayat", label: "Tebak Ayat", icon: HelpCircle, desc: "Kuis tebak surah" },
      { href: "/games/sambung-ayat", label: "Sambung Ayat", icon: Layers, desc: "Lengkapi potongan ayat" },
      { href: "/games/harf-le", label: "Harf-le (Wordle)", icon: Grid, desc: "Tebak kata Islami" },
      { href: "/games/tajwid-ninja", label: "Tajwid Ninja", icon: Zap, desc: "Latihan tajwid interaktif" },
      { href: "/games/trivia", label: "Trivia Islami", icon: Brain, desc: "Kuis wawasan Islam" },
      { href: "/games/memory", label: "Memory Match", icon: Boxes, desc: "Asah ingatan kartu" },
    ],
  },
  {
    title: "Pengaturan & Developer",
    items: [
      { href: "/achievements", label: "Pencapaian", icon: Trophy, desc: "XP, Level & Badge" },
      { href: "/settings", label: "Pengaturan", icon: Settings, desc: "Pengaturan tampilan" },
      { href: "/creator", label: "Business Inquiry & Dev", icon: UserCheck, desc: "Profil Rahman CH & Kontak" },
    ],
  },
];

export function Header() {
  const lastRead = useSettingsStore((s) => s.lastRead);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" onClick={() => sfx.playWoosh()} className="flex items-center gap-2 font-display font-bold text-lg">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="hidden sm:inline">Al-Qur&apos;an</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/ibadah"
              onClick={() => sfx.playWoosh()}
              className="px-3 py-1.5 text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-accent rounded-full transition-colors"
            >
              Ibadah
            </Link>
            <Link
              href="/lifestyle"
              onClick={() => sfx.playWoosh()}
              className="px-3 py-1.5 text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-accent rounded-full transition-colors"
            >
              Lifestyle
            </Link>
          </nav>

          <Link
            href="/games"
            onClick={() => sfx.playWoosh()}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all"
          >
            <Gamepad2 className="h-4 w-4" />
            <span className="hidden lg:inline">Arcade Games</span>
          </Link>
        </div>

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

          {/* Menu More untuk Desktop */}
          <Sheet>
            <SheetTrigger className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg hover:bg-accent transition-colors outline-none">
              <Menu className="h-4 w-4" />
              More
            </SheetTrigger>
            <SheetContent side="right" className="w-[400px] sm:w-[540px] p-0 flex flex-col">
              <SheetHeader className="p-6 text-left border-b bg-muted/30">
                <SheetTitle className="font-display text-2xl font-bold">Menu Lengkap</SheetTitle>
                <SheetDescription>Eksplorasi seluruh fitur Al-Qur'an Digital</SheetDescription>
              </SheetHeader>

              <div className="overflow-y-auto p-6 space-y-6 flex-1">
                {MENU_SECTIONS.map((section) => (
                  <div key={section.title} className="space-y-3">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">
                      {section.title}
                    </h3>
                    <div className="grid gap-2">
                      {section.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                          <SheetClose
                            key={item.href}
                            onClick={() => {
                              sfx.playWoosh();
                              router.push(item.href);
                            }}
                            className={`flex items-center gap-3.5 p-3 rounded-xl border transition-all ${
                              isActive
                                ? "bg-primary/10 border-primary text-primary"
                                : "bg-card hover:bg-accent border-transparent hover:border-border"
                            }`}
                          >
                            <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0">
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="overflow-hidden">
                              <p className="font-semibold text-sm leading-tight">{item.label}</p>
                              <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
                            </div>
                          </SheetClose>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

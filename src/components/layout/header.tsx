"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { sfx } from "@/lib/sfx";
import { ThemeToggle } from "./theme-toggle";
import { ZadifyLogo } from "./logo";
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
  Compass,
  PlaneTakeoff,
  GraduationCap,
  Shield,
  Coins,
  Smile,
  ShieldCheck,
  BarChart3,
  BookHeart,
  Swords,
  Cloud
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
    title: "Al-Qur'an & Ibadah Harian",
    items: [
      { href: "/quran", label: "Baca Al-Qur'an", icon: BookOpen, desc: "114 Surah, Tajwid warna & Murottal" },
      { href: "/memorize", label: "Hafalan & Muraja'ah", icon: BookMarked, desc: "Metode Tikrar & Uji Hafalan" },
      { href: "/prayer-times", label: "Jadwal Sholat & Kiblat", icon: Clock, desc: "Waktu sholat, Syuruq & Kompas 3D" },
      { href: "/dzikir", label: "Tasbih & Dzikir", icon: Sparkles, desc: "Counter haptic & list bacaan dzikir" },
      { href: "/dua", label: "Koleksi Doa Harian", icon: Heart, desc: "Doa mustajab, transliterasi & makna" },
      { href: "/ruhiyah", label: "P3K Jiwa (Ruhiyah)", icon: Lightbulb, desc: "Bimbingan kalbu & spiritual first aid" },
      { href: "/tadabbur", label: "Jurnal Tadabbur", icon: BookHeart, desc: "Catatan refleksi per-ayat Al-Qur'an" },
    ],
  },
  {
    title: "Edukasi, Roadmap & Keluarga",
    items: [
      { href: "/learn", label: "Roadmap Belajar Islam", icon: GraduationCap, desc: "Akademi mualaf bertahap & kuis kelulusan" },
      { href: "/kids/kisah-nabi", label: "Kisah 25 Nabi & Rasul", icon: Smile, desc: "Storytelling moral & doa nabi" },
      { href: "/kids/gender-edu", label: "Edukasi Fitrah & Tumbuh Kembang", icon: Shield, desc: "Panduan parenting & benteng syariat" },
      { href: "/kids/parent", label: "Dashboard Orang Tua", icon: ShieldCheck, desc: "Pantau progres ibadah & ZP anak" },
      { href: "/chat", label: "Zad Mentor AI", icon: MessageCircle, desc: "Asisten tanya jawab fikih & syariat" },
    ],
  },
  {
    title: "Kalkulator & Perencanaan Syariat",
    items: [
      { href: "/calculator/zakat", label: "Kalkulator Zakat", icon: Coins, desc: "Zakat Fitrah, Maal, Emas & Profesi" },
      { href: "/calculator/haji-umroh", label: "Tabungan Haji & Umroh", icon: PlaneTakeoff, desc: "Target inflasi, roadmap & tracking" },
      { href: "/calculator/waris", label: "Waris Faraid", icon: Calculator, desc: "Pembagian waris syariat Islam" },
    ],
  },
  {
    title: "Arcade Games & Gamifikasi",
    items: [
      { href: "/games", label: "Arcade Hub", icon: Gamepad2, desc: "Pusat game edukasi Islami" },
      { href: "/games/trivia", label: "Trivia Islami", icon: Brain, desc: "Kuis Duolingo-style berhadiah ZP" },
      { href: "/games/tebak-ayat", label: "Tebak Ayat", icon: HelpCircle, desc: "Tebak potongan ayat yang hilang" },
      { href: "/games/sambung-ayat", label: "Sambung Ayat", icon: Layers, desc: "Susun kata acak menjadi ayat" },
      { href: "/games/harf-le", label: "Harf-le (Wordle Arab)", icon: Grid, desc: "Tebak akar kata Al-Qur'an" },
      { href: "/games/tajwid-ninja", label: "Tajwid Ninja", icon: Zap, desc: "Latihan refleks deteksi tajwid" },
      { href: "/games/memory", label: "Memory Match", icon: Boxes, desc: "Cocokkan kosakata Arab & artinya" },
      { href: "/games/pvp", label: "PvP Quiz Arena", icon: Swords, desc: "Tanding kuis melawan AI rival" },
      { href: "/achievements", label: "Zad Points & Lencana", icon: Trophy, desc: "Level bekal & koleksi badge" },
      { href: "/achievements/leaderboard", label: "Liga & Leaderboard", icon: BarChart3, desc: "Peringkat ZP mingguan & divisi liga" },
    ],
  },
  {
    title: "Utilitas & Pengaturan",
    items: [
      { href: "/analytics", label: "Statistik & Analitik", icon: BarChart3, desc: "Heatmap konsistensi & grafik khatam" },
      { href: "/search", label: "Pencarian Ayat", icon: Search, desc: "Cari ayat, kata kunci & arti" },
      { href: "/bookmarks", label: "Ayat Tersimpan", icon: Bookmark, desc: "Daftar ayat & doa favorit" },
      { href: "/settings", label: "Pengaturan & Alarm", icon: Settings, desc: "Font, Qari & Pengingat Harian" },
      { href: "/creator", label: "Profil Developer", icon: UserCheck, desc: "Profil Rahman CH & Inquiry" },
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
          <Link href="/" onClick={() => sfx.playWoosh()} className="flex items-center">
            <ZadifyLogo size="md" />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/quran"
              onClick={() => sfx.playWoosh()}
              className={`px-3 py-1.5 text-sm font-bold rounded-full transition-colors ${
                pathname.startsWith("/quran") || pathname.startsWith("/surah")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              Qur'an
            </Link>
            <Link
              href="/learn"
              onClick={() => sfx.playWoosh()}
              className={`px-3 py-1.5 text-sm font-bold rounded-full transition-colors ${
                pathname.startsWith("/learn")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              Roadmap
            </Link>
            <Link
              href="/ibadah"
              onClick={() => sfx.playWoosh()}
              className={`px-3 py-1.5 text-sm font-bold rounded-full transition-colors ${
                pathname.startsWith("/ibadah")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              Ibadah
            </Link>
            <Link
              href="/lifestyle"
              onClick={() => sfx.playWoosh()}
              className={`px-3 py-1.5 text-sm font-bold rounded-full transition-colors ${
                pathname.startsWith("/lifestyle") || pathname.startsWith("/calculator") || pathname.startsWith("/ruhiyah")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
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
            <SheetContent side="right" className="w-[400px] sm:w-[540px] p-0 flex flex-col gap-0 text-left">
              <SheetHeader className="p-6 text-left border-b bg-muted/30 m-0">
                <SheetTitle className="font-display text-2xl font-bold text-left m-0">Menu Lengkap</SheetTitle>
                <SheetDescription className="text-left m-0">Eksplorasi seluruh bekal digital di Zadify</SheetDescription>
              </SheetHeader>

              <div className="overflow-y-auto overscroll-contain touch-pan-y p-6 pb-12 space-y-6 flex-1 text-left">
                {MENU_SECTIONS.map((section) => (
                  <div key={section.title} className="space-y-2.5 text-left">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider text-left px-0 m-0">
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
                            className={`flex items-center gap-3.5 p-3 rounded-xl border transition-all text-left w-full ${
                              isActive
                                ? "bg-primary/10 border-primary text-primary"
                                : "bg-card hover:bg-accent border-transparent hover:border-border"
                            }`}
                          >
                            <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0">
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="overflow-hidden text-left">
                              <p className="font-semibold text-sm leading-tight text-left">{item.label}</p>
                              <p className="text-xs text-muted-foreground truncate text-left">{item.desc}</p>
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

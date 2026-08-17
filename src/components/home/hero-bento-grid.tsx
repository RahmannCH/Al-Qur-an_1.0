"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Calculator,
  ChevronRight,
  Gamepad2,
  GraduationCap,
  HeartPulse,
  Landmark,
  Sparkles,
  Target,
  X,
  ArrowRight,
  ExternalLink,
  Zap,
  Compass,
} from "lucide-react";
import { sfx } from "@/lib/sfx";
import { Button } from "@/components/ui/button";
import { ZadifyLogo } from "@/components/layout/logo";

interface CategoryItem {
  label: string;
  href: string;
  desc?: string;
}

interface Category {
  title: string;
  desc: string;
  href: string;
  icon: any;
  gradient: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  hoverBorder: string;
  glowShadow: string;
  subItemHover: string;
  items: CategoryItem[];
}

const CATEGORIES: Category[] = [
  {
    title: "Ibadah & Ruhiyah",
    desc: "Doa, dzikir, sholat, dan P3K jiwa harian.",
    href: "/ibadah",
    icon: HeartPulse,
    gradient: "from-emerald-600 via-teal-600 to-cyan-700",
    badgeBg: "bg-emerald-500/15 border-emerald-500/30",
    badgeText: "text-emerald-400",
    borderColor: "border-emerald-500/20",
    hoverBorder: "hover:border-emerald-400",
    glowShadow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]",
    subItemHover: "hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-300",
    items: [
      { label: "Doa Harian", href: "/dua", desc: "Koleksi doa harian dan mustajab" },
      { label: "Tasbih Digital", href: "/dzikir", desc: "Penghitung dzikir haptic interaktif" },
      { label: "P3K Jiwa", href: "/ruhiyah", desc: "Spiritual First Aid & bimbingan kalbu" },
      { label: "Portal Ibadah Lengkap", href: "/ibadah", desc: "Lihat semua modul ibadah" },
    ],
  },
  {
    title: "Edukasi & Keluarga",
    desc: "Roadmap Islam, hafalan, kisah nabi, dan parenting.",
    href: "/learn",
    icon: GraduationCap,
    gradient: "from-blue-600 via-indigo-600 to-purple-700",
    badgeBg: "bg-blue-500/15 border-blue-500/30",
    badgeText: "text-blue-400",
    borderColor: "border-blue-500/20",
    hoverBorder: "hover:border-blue-400",
    glowShadow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]",
    subItemHover: "hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-300",
    items: [
      { label: "Roadmap Belajar Islam", href: "/learn", desc: "Pembelajaran bertahap mualaf s/d mahir" },
      { label: "Latihan Hafalan", href: "/memorize", desc: "Metode Tikrar & sistem tes hafalan" },
      { label: "Kisah Para Nabi", href: "/kids/kisah-nabi", desc: "Kisah teladan 25 Nabi & Rasul" },
      { label: "Dashboard Orang Tua", href: "/kids/parent", desc: "Pantau progres belajar & pencapaian anak" },
      { label: "Edukasi Fitrah & Gender", href: "/kids/gender-edu", desc: "Panduan parenting Islami sesuai umur" },
    ],
  },
  {
    title: "Tools & Rencana",
    desc: "Zakat, waris, haji/umroh, dan perencanaan finansial.",
    href: "/calculator",
    icon: Calculator,
    gradient: "from-amber-500 via-orange-600 to-rose-600",
    badgeBg: "bg-amber-500/15 border-amber-500/30",
    badgeText: "text-amber-400",
    borderColor: "border-amber-500/20",
    hoverBorder: "hover:border-amber-400",
    glowShadow: "hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]",
    subItemHover: "hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-300",
    items: [
      { label: "Kalkulator Zakat", href: "/calculator/zakat", desc: "Zakat Fitrah, Maal, Penghasilan & Emas" },
      { label: "Waris Faraid", href: "/calculator/waris", desc: "Perhitungan bagi waris sesuai syariat" },
      { label: "Tabungan Haji & Umroh", href: "/calculator/haji-umroh", desc: "Target tabungan, inflasi & roadmap ibadah" },
      { label: "Arah Kiblat & Sholat", href: "/prayer-times", desc: "Kompas akurat & jadwal sholat" },
    ],
  },
];

export function HeroBentoGrid() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  const handleOpenCategory = (cat: Category) => {
    sfx.playWoosh();
    setActiveCategory(cat);
  };

  const handleCloseCategory = () => {
    sfx.playTap();
    setActiveCategory(null);
  };

  return (
    <section className="relative mb-12">
      {/* Dynamic Ambient Background Blobs for Balanced Visual Rhythm */}
      <div className="absolute top-0 left-10 -z-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 -z-10 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -z-10 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <ZadifyLogo size="sm" iconOnly={true} animated={true} />
            <span className="text-[11px] font-extrabold uppercase tracking-widest bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-400 bg-clip-text text-transparent">
              Zadify Workspace Ibadah
            </span>
          </div>
          <h2 className="font-display text-2xl font-bold md:text-3xl text-foreground">
            Mulai kumpulkan bekalmu hari ini
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Akses cepat Al-Qur'an, edukasi bertahap, dan amalan sunnah harian.
          </p>
        </div>

        <Link
          href="/games"
          onClick={() => sfx.playWoosh()}
          className="rounded-full border bg-card px-4 py-2 text-xs font-extrabold text-primary shadow-sm transition-all hover:bg-primary hover:text-primary-foreground flex items-center gap-2 w-fit"
        >
          <Gamepad2 className="h-4 w-4" /> Arcade & Kuis ZP
        </Link>
      </div>

      {/* Bento Grid Harmonized Multi-Tone Cards */}
      <div className="grid gap-5 md:grid-cols-3">
        {CATEGORIES.map((category, idx) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, type: "spring", stiffness: 280, damping: 22 }}
              whileHover={{ y: -4, scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              className={`group relative overflow-hidden rounded-3xl border ${category.borderColor} bg-card/60 backdrop-blur-xl shadow-lg transition-all duration-300 ${category.hoverBorder} ${category.glowShadow} flex flex-col justify-between`}
            >
              {/* Header Box - Clickable to open category drawer */}
              <div onClick={() => handleOpenCategory(category)} className="block select-none cursor-pointer">
                <div className={`relative overflow-hidden bg-gradient-to-br ${category.gradient} p-6 text-white border-b border-white/10`}>
                  {/* Subtle Light Flare */}
                  <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-white/20 blur-2xl transition-transform duration-700 group-hover:scale-150 pointer-events-none" />
                  
                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div className="rounded-2xl border border-white/25 bg-white/15 p-3 shadow-inner backdrop-blur-md group-hover:scale-110 transition-transform">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full border border-white/25 bg-black/25 px-3 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md group-hover:bg-white group-hover:text-slate-950 transition-colors">
                      Laci Menu <ExternalLink className="h-3 w-3" />
                    </div>
                  </div>
                  <div className="relative z-10 mt-6">
                    <h3 className="font-display text-2xl font-bold tracking-tight text-white drop-shadow-sm">{category.title}</h3>
                    <p className="mt-1.5 text-xs font-medium text-white/85 leading-relaxed">{category.desc}</p>
                  </div>
                </div>
              </div>

              {/* Sub-menu Direct Links */}
              <div className="space-y-2 p-4 flex-1 flex flex-col justify-end">
                {category.items.slice(0, 3).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => sfx.playTap()}
                    className={`flex items-center justify-between rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm px-4 py-3 text-xs font-semibold transition-all ${category.subItemHover} group/link`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover/link:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Featured Arcade Banner Card */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28 }}
        whileHover={{ scale: 1.008 }}
        whileTap={{ scale: 0.99 }}
        className="mt-5 overflow-hidden rounded-3xl border bg-card shadow-sm hover:shadow-md transition-shadow"
      >
        <Link
          href="/games"
          onClick={() => sfx.playWoosh()}
          className="group flex flex-col gap-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 p-6 text-white md:flex-row md:items-center md:justify-between relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none group-hover:bg-white/20 transition-all duration-700" />
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="rounded-2xl border border-white/20 bg-white/20 p-3.5 shadow-sm backdrop-blur-md group-hover:scale-105 transition-all">
              <Gamepad2 className="h-8 w-8 text-white" />
            </div>
            <div>
              <div className="mb-1 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">
                <Sparkles className="h-3 w-3 text-gold fill-gold" /> Gamifikasi Zad Points (ZP)
              </div>
              <h3 className="font-display text-2xl font-extrabold text-white">Arcade & Kuis Islami</h3>
              <p className="text-xs font-medium text-white/90 mt-0.5">Trivia, tebak ayat, sambung ayat, memory match, dan Tajwid Ninja.</p>
            </div>
          </div>
          <div className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-blue-600 shadow-sm transition-transform group-hover:scale-105 relative z-10 shrink-0">
            Panen ZP Sekarang <Target className="h-4 w-4" />
          </div>
        </Link>
      </motion.div>

      {/* DRAWER / LACI MENU KATEGORI INTERAKTIF */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-0 sm:p-4"
            onClick={handleCloseCategory}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl max-h-[85vh] overflow-hidden rounded-t-[32px] sm:rounded-[32px] border border-white/20 bg-slate-950/95 backdrop-blur-2xl shadow-2xl flex flex-col"
            >
              {/* Header Drawer */}
              <div className={`relative overflow-hidden bg-gradient-to-br ${activeCategory.gradient} p-6 text-white shrink-0 border-b border-white/10`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl border border-white/20 bg-white/15 p-2.5 backdrop-blur-md">
                      <activeCategory.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold">{activeCategory.title}</h3>
                      <p className="text-xs text-white/85 font-medium">{activeCategory.desc}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCloseCategory}
                    className="rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Body Laci Menu */}
              <div className="overflow-y-auto p-6 space-y-3 flex-1">
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1.5">
                  <Compass className="h-3.5 w-3.5" /> Pilih Layanan Fitur:
                </p>
                {activeCategory.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      sfx.playWoosh();
                      handleCloseCategory();
                    }}
                    className={`group flex items-center justify-between p-4 rounded-2xl border border-border/60 bg-card hover:bg-accent hover:border-primary/50 transition-all shadow-sm`}
                  >
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                        {item.label}
                      </h4>
                      {item.desc && (
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      )}
                    </div>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-muted group-hover:bg-primary group-hover:text-primary-foreground transition-all ml-4">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

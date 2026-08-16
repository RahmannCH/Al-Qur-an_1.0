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
} from "lucide-react";
import { sfx } from "@/lib/sfx";
import { Button } from "@/components/ui/button";

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
  accent: string;
  items: CategoryItem[];
}

const CATEGORIES: Category[] = [
  {
    title: "Ibadah & Ruhiyah",
    desc: "Doa, dzikir, sholat, dan P3K jiwa harian.",
    href: "/ibadah",
    icon: HeartPulse,
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    accent: "text-emerald-500",
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
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
    accent: "text-blue-500",
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
    gradient: "from-amber-500 via-orange-500 to-rose-500",
    accent: "text-amber-500",
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
    <section className="mb-10">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.24em] text-primary">Widget Eksplorasi</p>
          <h2 className="font-display text-2xl font-bold md:text-3xl">Pilih jalur kebutuhanmu</h2>
          <p className="mt-1 text-sm text-muted-foreground">Ketuk kartu kategori untuk membuka laci menu lengkap.</p>
        </div>
        <Link
          href="/games"
          onClick={() => sfx.playWoosh()}
          className="hidden rounded-full border bg-card px-4 py-2 text-sm font-bold text-primary shadow-sm transition-all hover:bg-primary hover:text-primary-foreground md:inline-flex"
        >
          Arcade XP
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {CATEGORIES.map((category, idx) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, type: "spring", stiffness: 260, damping: 24 }}
              className="group overflow-hidden rounded-3xl border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl cursor-pointer"
            >
              {/* Header Box - Clickable to open category drawer */}
              <div onClick={() => handleOpenCategory(category)} className="block select-none">
                <div className={`relative overflow-hidden bg-gradient-to-br ${category.gradient} p-6 text-white`}>
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-3xl transition-transform duration-700 group-hover:scale-150" />
                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div className="rounded-2xl border border-white/20 bg-white/20 p-3 shadow-inner backdrop-blur-md">
                      <Icon className="h-8 w-8" />
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md group-hover:bg-white group-hover:text-foreground transition-colors">
                      Buka Laci <ExternalLink className="h-3 w-3" />
                    </div>
                  </div>
                  <div className="relative z-10 mt-8">
                    <h3 className="font-display text-2xl font-bold drop-shadow-sm">{category.title}</h3>
                    <p className="mt-2 text-sm font-medium text-white/90">{category.desc}</p>
                  </div>
                </div>
              </div>

              {/* Sub-menu Direct Links */}
              <div className="space-y-2 p-4">
                {category.items.slice(0, 3).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => sfx.playTap()}
                    className="flex items-center justify-between rounded-2xl border bg-background px-4 py-3 text-sm font-semibold transition-all hover:border-primary/40 hover:bg-primary/5"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28 }}
        className="mt-4 overflow-hidden rounded-3xl border bg-card shadow-sm"
      >
        <Link
          href="/games"
          onClick={() => sfx.playWoosh()}
          className="group flex flex-col gap-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 p-6 text-white md:flex-row md:items-center md:justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-2xl border border-white/20 bg-white/20 p-3 shadow-inner backdrop-blur-md">
              <Gamepad2 className="h-8 w-8" />
            </div>
            <div>
              <div className="mb-1 inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="h-3 w-3 text-gold fill-gold" /> Daily XP
              </div>
              <h3 className="font-display text-2xl font-bold">Arcade & Kuis Islami</h3>
              <p className="text-sm font-medium text-white/90">Trivia, tebak ayat, sambung ayat, memory match, dan Tajwid Ninja.</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-blue-600 transition-transform group-hover:translate-x-1">
            Main Sekarang <Target className="h-4 w-4" />
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
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
            onClick={handleCloseCategory}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl max-h-[85vh] overflow-hidden rounded-t-[32px] sm:rounded-[32px] border bg-card shadow-2xl flex flex-col"
            >
              {/* Header Drawer */}
              <div className={`relative overflow-hidden bg-gradient-to-br ${activeCategory.gradient} p-6 text-white shrink-0`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-white/20 p-2.5 backdrop-blur-md">
                      <activeCategory.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold">{activeCategory.title}</h3>
                      <p className="text-xs text-white/90 font-medium">{activeCategory.desc}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCloseCategory}
                    className="rounded-full bg-white/20 text-white hover:bg-white/30 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Body Laci Menu */}
              <div className="overflow-y-auto p-6 space-y-3 flex-1">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                  Pilih Fitur & Layanan:
                </p>
                {activeCategory.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      sfx.playWoosh();
                      handleCloseCategory();
                    }}
                    className="group flex items-center justify-between p-4 rounded-2xl border bg-background hover:border-primary/50 hover:bg-primary/5 hover:shadow-md transition-all"
                  >
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                        {item.label}
                      </h4>
                      {item.desc && (
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      )}
                    </div>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-muted group-hover:bg-primary group-hover:text-white transition-all ml-4">
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

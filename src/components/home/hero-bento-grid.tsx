"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { sfx } from "@/lib/sfx";

const CATEGORIES = [
  {
    title: "Ibadah & Ruhiyah",
    desc: "Doa, dzikir, sholat, dan P3K jiwa harian.",
    href: "/ibadah",
    icon: HeartPulse,
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    accent: "text-emerald-500",
    items: [
      { label: "Doa Harian", href: "/dua" },
      { label: "Tasbih Digital", href: "/dzikir" },
      { label: "P3K Jiwa", href: "/ruhiyah" },
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
      { label: "Roadmap Belajar", href: "/learn" },
      { label: "Latihan Hafalan", href: "/memorize" },
      { label: "Kids & Parent", href: "/kids" },
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
      { label: "Kalkulator Zakat", href: "/calculator/zakat" },
      { label: "Waris Faraid", href: "/calculator/waris" },
      { label: "Tabungan Haji", href: "/calculator/haji-umroh" },
    ],
  },
];

export function HeroBentoGrid() {
  return (
    <section className="mb-10">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.24em] text-primary">Widget Eksplorasi</p>
          <h2 className="font-display text-2xl font-bold md:text-3xl">Pilih jalur kebutuhanmu</h2>
          <p className="mt-1 text-sm text-muted-foreground">Menu besar dibuat per kategori agar lebih rapi dan cepat ditemukan.</p>
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
              className="group overflow-hidden rounded-3xl border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <Link href={category.href} onClick={() => sfx.playWoosh()} className="block">
                <div className={`relative overflow-hidden bg-gradient-to-br ${category.gradient} p-6 text-white`}>
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-3xl transition-transform duration-700 group-hover:scale-150" />
                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div className="rounded-2xl border border-white/20 bg-white/20 p-3 shadow-inner backdrop-blur-md">
                      <Icon className="h-8 w-8" />
                    </div>
                    <div className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                      Menu
                    </div>
                  </div>
                  <div className="relative z-10 mt-8">
                    <h3 className="font-display text-2xl font-bold drop-shadow-sm">{category.title}</h3>
                    <p className="mt-2 text-sm font-medium text-white/90">{category.desc}</p>
                  </div>
                </div>
              </Link>

              <div className="space-y-2 p-4">
                {category.items.map((item) => (
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
    </section>
  );
}

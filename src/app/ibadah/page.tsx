"use client";

import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { BookOpen, Heart, Sparkles, BookMarked, Search, Bookmark, ChevronRight } from "lucide-react";
import Link from "next/link";
import { sfx } from "@/lib/sfx";
import { ReadingPlanWidget } from "@/components/home/reading-plan-widget";

const IBADAH_FEATURES = [
  { href: "/quran", label: "Baca Al-Qur'an", icon: BookOpen, desc: "114 Surah, Terjemahan & Tafsir", color: "text-primary", bg: "bg-primary/10" },
  { href: "/memorize", label: "Hafalan & Muraja'ah", icon: BookMarked, desc: "Tracker hafalan & metode", color: "text-emerald-600", bg: "bg-emerald-500/10" },
  { href: "/dzikir", label: "Tasbih Digital", icon: Sparkles, desc: "Counter & target dzikir", color: "text-gold", bg: "bg-gold/10" },
  { href: "/dua", label: "Koleksi Doa", icon: Heart, desc: "Doa harian & mustajab", color: "text-rose-500", bg: "bg-rose-500/10" },
  { href: "/search", label: "Cari Ayat", icon: Search, desc: "Pencarian terjemahan spesifik", color: "text-blue-500", bg: "bg-blue-500/10" },
  { href: "/bookmarks", label: "Bookmark", icon: Bookmark, desc: "Ayat yang disimpan", color: "text-slate-500", bg: "bg-slate-500/10" },
];

export default function IbadahHub() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 min-h-[80vh]">
      <BackButton />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <h1 className="text-4xl font-display font-bold mb-3">Portal Ibadah</h1>
        <p className="text-muted-foreground text-lg">Eksplorasi Al-Qur'an dan rutinitas ibadah harianmu.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {IBADAH_FEATURES.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <Link key={feat.href} href={feat.href} onClick={() => sfx.playWoosh()}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group p-5 rounded-2xl border bg-card hover:bg-accent hover:shadow-lg transition-all"
              >
                <div className={`p-3 rounded-xl inline-block mb-4 ${feat.bg}`}>
                  <Icon className={`h-6 w-6 ${feat.color}`} />
                </div>
                <h3 className="font-display font-bold text-lg mb-1">{feat.label}</h3>
                <p className="text-sm text-muted-foreground mb-4">{feat.desc}</p>
                <div className="flex items-center text-xs font-bold text-primary group-hover:gap-2 transition-all gap-1">
                  Buka Fitur <ChevronRight className="h-3 w-3" />
                </div>
              </motion.div>
            </Link>
          );
          })}
        </div>
        <div className="lg:col-span-4">
          <ReadingPlanWidget />
        </div>
      </div>
    </div>
  );
}

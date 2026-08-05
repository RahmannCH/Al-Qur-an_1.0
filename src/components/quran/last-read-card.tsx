"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useSettingsStore } from "@/store/settings-store";
import { BookOpen, ArrowRight } from "lucide-react";

export function LastReadCard() {
  const lastRead = useSettingsStore((s) => s.lastRead);

  if (!lastRead) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href={`/surah/${lastRead.surahId}#verse-${lastRead.verseNumber}`}
        className="group mb-6 block overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-teal p-6 text-white shadow-xl transition-all hover:shadow-2xl hover:scale-[1.02]"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-5 w-5" />
              <p className="text-sm font-medium opacity-90">Terakhir Dibaca</p>
            </div>
            <p className="text-2xl font-display font-bold mb-1">{lastRead.surahName}</p>
            <p className="text-sm opacity-90">Ayat {lastRead.verseNumber}</p>
          </div>
          <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.div>
  );
}

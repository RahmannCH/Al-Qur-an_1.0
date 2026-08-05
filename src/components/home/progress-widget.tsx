"use client";

import { motion } from "framer-motion";
import { Check, Clock, BookOpen } from "lucide-react";
import { useSettingsStore } from "@/store/settings-store";

export function ProgressWidget() {
  const lastRead = useSettingsStore((s) => s.lastRead);
  
  const stats = {
    ayatRead: lastRead ? lastRead.verseNumber : 0,
    surahRead: lastRead ? 1 : 0,
    bookmarks: 0,
  };

  const progress = Math.min(100, Math.round((stats.ayatRead / 6236) * 100));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border bg-card p-5"
    >
      <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-primary" />
        Progress Baca
      </h3>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-muted-foreground">Khatam Quran</span>
            <span className="text-sm font-semibold text-primary">{progress}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-teal"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-primary/5 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Check className="h-4 w-4 text-emerald" />
              <span className="text-xs text-muted-foreground">Surah</span>
            </div>
            <p className="text-2xl font-bold text-primary">{stats.surahRead}</p>
          </div>
          <div className="p-3 bg-primary/5 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-gold" />
              <span className="text-xs text-muted-foreground">Ayat</span>
            </div>
            <p className="text-2xl font-bold text-primary">{stats.ayatRead}</p>
          </div>
        </div>
      </div>

      {lastRead && (
        <div className="mt-4 pt-4 border-t">
          <p className="text-xs text-muted-foreground mb-1">Terakhir dibaca:</p>
          <p className="text-sm font-medium truncate">{lastRead.surahName} : {lastRead.verseNumber}</p>
        </div>
      )}
    </motion.div>
  );
}

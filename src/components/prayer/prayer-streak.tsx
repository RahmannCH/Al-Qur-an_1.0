"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { usePrayerStore } from "@/store/prayer-store";
import { useGamificationStore } from "@/store/gamification-store";
import { Check, Flame } from "lucide-react";

const prayers = ["Subuh", "Dzuhur", "Ashar", "Maghrib", "Isya"];

export function PrayerStreak() {
  const { todayPrayers, togglePrayer, streak } = usePrayerStore();
  const { addXp } = useGamificationStore();

  const handleToggle = (prayer: string) => {
    togglePrayer(prayer);
    if (!todayPrayers.includes(prayer)) {
      addXp(10, `Sholat ${prayer}`);
    }
  };

  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-bold">Tracker Sholat</h2>
        <div className="flex items-center gap-2 bg-gradient-to-r from-gold/20 to-gold/10 px-3 py-1.5 rounded-full">
          <Flame className="h-4 w-4 text-gold" />
          <span className="text-sm font-bold text-gold">{streak} Hari Streak</span>
        </div>
      </div>

      <div className="space-y-3">
        {prayers.map((prayer, index) => {
          const isChecked = todayPrayers.includes(prayer);
          return (
            <motion.button
              key={prayer}
              onClick={() => handleToggle(prayer)}
              className={`w-full flex items-center justify-between p-4 rounded-lg transition-all ${
                isChecked
                  ? "bg-gradient-to-r from-emerald/20 to-emerald/10 border-emerald/30"
                  : "bg-muted/30 hover:bg-muted/50"
              } border`}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-medium">{prayer}</span>
              <motion.div
                className={`h-6 w-6 rounded-full flex items-center justify-center transition-colors ${
                  isChecked ? "bg-emerald text-white" : "bg-muted"
                }`}
                animate={isChecked ? { scale: [1, 1.2, 1] } : {}}
              >
                {isChecked && <Check className="h-4 w-4" />}
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-primary/5 rounded-lg">
        <p className="text-sm text-muted-foreground text-center">
          Checklist sholat harian untuk mendapat streak bonus XP!
        </p>
      </div>
    </div>
  );
}

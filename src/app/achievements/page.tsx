"use client";

import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { useGamificationStore, AVAILABLE_BADGES, getLevelInfo } from "@/store/gamification-store";
import { Trophy, Star, Shield } from "lucide-react";

export default function AchievementsPage() {
  const { xp, unlockedBadges, shields } = useGamificationStore();
  const currentLvl = getLevelInfo(xp);
  const progressPercent = Math.min(100, Math.max(0, ((xp - currentLvl.minXp) / (currentLvl.nextXp - currentLvl.minXp)) * 100));

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <BackButton />
      
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Pencapaian</h1>
        <p className="text-muted-foreground">Kumpulkan XP dan koleksi badge-nya</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="md:col-span-2 bg-gradient-to-br from-primary to-teal p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-4 rounded-full">
              <Trophy className="h-8 w-8 text-gold fill-gold" />
            </div>
            <div>
              <p className="text-white/80 font-medium text-sm">Level {currentLvl.level}</p>
              <h2 className="text-2xl font-display font-bold">{currentLvl.title}</h2>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>{xp} XP</span>
              <span className="text-white/70">{currentLvl.nextXp} XP</span>
            </div>
            <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
               <motion.div className="h-full bg-white rounded-full" initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} transition={{ duration: 1 }} />
            </div>
            <p className="text-xs text-white/70 text-right mt-1">Butuh {currentLvl.nextXp - xp} XP ke Level {currentLvl.level + 1}</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
          <Shield className="h-10 w-10 text-emerald mb-3" />
          <h3 className="font-display font-bold text-lg mb-1">Streak Shields</h3>
          <p className="text-3xl font-bold text-primary mb-2">{shields}</p>
          <p className="text-xs text-muted-foreground">Melindungi streak kamu jika bolong 1 hari</p>
        </motion.div>
      </div>

      <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
        <Star className="h-5 w-5 text-gold fill-gold" />
        Koleksi Badge
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {AVAILABLE_BADGES.map((badge, idx) => {
          const isUnlocked = unlockedBadges.includes(badge.id);
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className={`relative border p-5 rounded-2xl text-center flex flex-col items-center gap-3 transition-all ${isUnlocked ? "bg-card shadow-sm border-primary/20" : "bg-muted/30 opacity-60 grayscale"}`}
            >
              <div className={`text-4xl bg-background p-4 rounded-full shadow-sm ${isUnlocked ? "" : "opacity-50"}`}>
                {badge.icon}
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight mb-1">{badge.name}</h4>
                <p className="text-xs text-muted-foreground leading-tight">{badge.description}</p>
              </div>
              {isUnlocked && (
                <div className="absolute top-2 right-2 bg-emerald/10 text-emerald p-1 rounded-full">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

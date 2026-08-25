"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Trophy, Flame, Shield, Award, Sparkles, Swords } from "lucide-react";
import { useLeaderboardStore, LEAGUE_TIERS, getTierForXp } from "@/store/leaderboard-store";
import { useGamificationStore, getLevelInfo } from "@/store/gamification-store";
import { useSettingsStore } from "@/store/settings-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LeaderboardPage() {
  const { weeklyXp, getLeaderboard } = useLeaderboardStore();
  const { xp } = useGamificationStore();
  const { userName } = useSettingsStore();

  const myLevel = useMemo(() => getLevelInfo(xp).level, [xp]);
  const currentTier = useMemo(() => getTierForXp(weeklyXp), [weeklyXp]);
  const entries = useMemo(
    () => getLeaderboard(xp, userName || "Pejuang Zad", myLevel),
    [getLeaderboard, xp, userName, myLevel]
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 pb-32">
      <BackButton />

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-amber-500/10 rounded-full mb-3">
          <Trophy className="h-9 w-9 text-amber-500" />
        </div>
        <h1 className="text-3xl font-display font-bold mb-2">Liga Zadify Mingguan</h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Tingkatkan ibadah dan kumpulkan ZP setiap pekan untuk promosi ke kasta liga yang lebih tinggi.
        </p>
      </div>

      {/* Current Tier Badge Card */}
      <Card className="p-6 mb-8 bg-gradient-to-br from-card/80 to-card/40 border-primary/20 backdrop-blur shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-5xl">{currentTier.icon}</div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Divisi Anda Saat Ini
              </div>
              <h2 className="text-2xl font-bold font-display">{currentTier.name} League</h2>
              <p className="text-xs text-muted-foreground mt-1">
                {weeklyXp} ZP pekan ini &middot; Butuh ZP lebih banyak untuk promosi
              </p>
            </div>
          </div>

          <Link href="/games/pvp">
            <Button className="gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-bold shadow-lg shadow-amber-500/20">
              <Swords className="h-4 w-4" />
              Tanding PvP
            </Button>
          </Link>
        </div>

        {/* Tier progress pills */}
        <div className="flex items-center justify-between gap-2 mt-6 overflow-x-auto pb-2">
          {LEAGUE_TIERS.map((tier) => {
            const isActive = tier.name === currentTier.name;
            return (
              <div
                key={tier.name}
                className={`flex-1 min-w-[70px] text-center p-2 rounded-xl border text-xs transition-all ${
                  isActive
                    ? "border-primary bg-primary/10 font-bold scale-105 shadow-sm"
                    : "border-border/30 bg-card/40 text-muted-foreground opacity-60"
                }`}
              >
                <div className="text-lg mb-1">{tier.icon}</div>
                <div>{tier.name}</div>
                <div className="text-[10px] text-muted-foreground">{tier.minXp} ZP</div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Leaderboard Table */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold font-display mb-4">Peringkat Pekan Ini</h3>
        {entries.map((entry, idx) => {
          const rank = idx + 1;
          const isTop3 = rank <= 3;
          const rankBadge =
            rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : `#${rank}`;

          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.03 }}
            >
              <Card
                className={`p-4 flex items-center justify-between gap-4 transition-all ${
                  entry.isMe
                    ? "border-primary bg-primary/10 shadow-md ring-2 ring-primary/20"
                    : isTop3
                    ? "border-amber-500/30 bg-card/70"
                    : "border-border/40 bg-card/40"
                }`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                      isTop3 ? "text-lg" : "text-muted-foreground font-mono"
                    }`}
                  >
                    {rankBadge}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm truncate">{entry.name}</span>
                      {entry.isMe && (
                        <span className="text-[10px] font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                          Kamu
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">Level {entry.level}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-bold text-sm font-display text-emerald-600 flex items-center gap-1 justify-end">
                    <Sparkles className="h-3.5 w-3.5" />
                    {entry.weeklyXp} ZP
                  </div>
                  <span className="text-[10px] text-muted-foreground">Total: {entry.xp} ZP</span>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

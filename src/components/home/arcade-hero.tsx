"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Gamepad2, Zap } from "lucide-react";
import { useGamificationStore, getLevelInfo } from "@/store/gamification-store";

export function ArcadeHero() {
  const { xp } = useGamificationStore();
  const lvl = getLevelInfo(xp);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-500 p-8 shadow-2xl text-white"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/20 rounded-full -ml-10 -mb-10 blur-2xl" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-xl">
              <Gamepad2 className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-3xl font-display font-bold">🎮 Arcade Islami</h2>
              <p className="text-blue-100 text-sm">Main sambil belajar, kumpulkan XP!</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg">
              <span className="text-xs text-blue-200 block">Level Saat Ini</span>
              <span className="font-bold text-lg">Lvl {lvl.level} &mdash; {lvl.title}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg">
              <span className="text-xs text-blue-200 block">Total XP</span>
              <span className="font-bold text-lg">{xp}</span>
            </div>
          </div>

          <Link href="/games" className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 hover:scale-105 transition-all shadow-lg">
            <Zap className="h-5 w-5" />
            Main Game Sekarang
          </Link>
        </div>

        <div className="hidden md:block">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
            <p className="text-sm text-blue-200 mb-3">Game Terpopuler:</p>
            <div className="space-y-3">
              {[
                { name: "Tebak Ayat", icon: "📖" },
                { name: "Trivia Islam", icon: "🧠" },
                { name: "Sambung Ayat", icon: "🧩" },
                { name: "Harf-le", icon: "🔤" }
              ].map((game, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <span className="text-2xl">{game.icon}</span>
                  <span className="font-medium">{game.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

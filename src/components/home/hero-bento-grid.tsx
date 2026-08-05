"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Heart, MessageCircle, Search, Trophy, Gamepad2, Activity, MapPin, Sparkles } from "lucide-react";

export function HeroBentoGrid() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      
      {/* Big Tile: Arcade Game (NOW DOMINATING) */}
      <motion.div variants={item} className="col-span-2 md:col-span-2 row-span-2 relative group overflow-hidden rounded-3xl">
        <Link href="/games" className="block h-full w-full bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-400 p-8 text-white shadow-xl transition-transform hover:scale-[1.02]">
           <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700" />
           <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold/20 rounded-full blur-2xl -ml-10 -mb-10" />
           
           <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/20 shadow-inner">
                  <Gamepad2 className="h-10 w-10 text-white" />
                </div>
                <div className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold animate-pulse flex items-center gap-1 border border-white/30">
                  <Sparkles className="h-3 w-3 text-gold fill-gold" /> Highlight
                </div>
              </div>
              <div className="mt-8">
                <h2 className="text-3xl font-display font-bold mb-2 drop-shadow-md">Arcade & Kuis</h2>
                <p className="text-white/90 text-sm font-medium">Bermain, belajar, dan kumpulkan XP! Tersedia Trivia, Tebak Ayat, hingga Memory Match.</p>
              </div>
           </div>
        </Link>
      </motion.div>

      {/* Medium Tile: Jelajahi Al-Quran (Now Horizontal) */}
      <motion.div variants={item} className="col-span-2 md:col-span-2 relative group overflow-hidden rounded-3xl">
        <Link href="/search" className="block h-full w-full bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white shadow-md transition-transform hover:scale-[1.02]">
          <div className="absolute -right-6 -bottom-6 opacity-20 transition-transform group-hover:rotate-12 group-hover:scale-110 duration-500">
            <Search className="w-32 h-32" />
          </div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <Search className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-display font-bold mb-1">Cari Al-Qur'an</h3>
              <p className="text-white/80 text-xs">Jelajahi surah, ayat & terjemahan</p>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Medium Tile: AI Chat */}
      <motion.div variants={item} className="col-span-1 md:col-span-1 relative group overflow-hidden rounded-3xl">
        <Link href="/chat" className="block h-full w-full bg-card border border-emerald-500/20 hover:border-emerald-500 p-5 shadow-sm transition-transform hover:-translate-y-1">
          <MessageCircle className="h-8 w-8 mb-3 text-emerald-500" />
          <h3 className="font-bold text-base mb-1">AI Chat</h3>
          <p className="text-[10px] text-muted-foreground leading-tight">Tanya jawab cerdas seputar Islam</p>
        </Link>
      </motion.div>

      {/* Medium Tile: Koleksi Doa */}
      <motion.div variants={item} className="col-span-1 md:col-span-1 relative group overflow-hidden rounded-3xl">
        <Link href="/dua" className="block h-full w-full bg-card border border-rose-500/20 hover:border-rose-500 p-5 shadow-sm transition-transform hover:-translate-y-1">
          <Heart className="h-8 w-8 mb-3 text-rose-500" />
          <h3 className="font-bold text-base mb-1">Doa Harian</h3>
          <p className="text-[10px] text-muted-foreground leading-tight">Koleksi doa & dzikir</p>
        </Link>
      </motion.div>

      {/* Long Bottom Row (Utilities) */}
      <motion.div variants={item} className="col-span-2 md:col-span-4 grid grid-cols-3 gap-4">
          <Link href="/prayer-times" className="col-span-1 bg-card border border-transparent rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:border-primary hover:bg-primary/5 transition-all group">
             <MapPin className="h-6 w-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
             <span className="text-xs font-bold text-muted-foreground group-hover:text-primary">Kiblat & Waktu</span>
          </Link>
          <Link href="/dzikir" className="col-span-1 bg-card border border-transparent rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:border-teal-500 hover:bg-teal-500/5 transition-all group">
             <Activity className="h-6 w-6 text-teal-500 mb-2 group-hover:scale-110 transition-transform" />
             <span className="text-xs font-bold text-muted-foreground group-hover:text-teal-500">Tasbih Digital</span>
          </Link>
          <Link href="/achievements" className="col-span-1 bg-card border border-transparent rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:border-gold hover:bg-gold/5 transition-all group">
             <Trophy className="h-6 w-6 text-gold mb-2 group-hover:scale-110 transition-transform" />
             <span className="text-xs font-bold text-muted-foreground group-hover:text-gold">Pencapaian XP</span>
          </Link>
      </motion.div>

    </motion.div>
  );
}

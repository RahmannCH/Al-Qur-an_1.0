"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Gamepad2, Sparkles, Sunrise, Sun, Sunset, Moon } from "lucide-react";

export function DynamicThemeBanner({ hour }: { hour: number }) {
  let theme = {
    bg: "from-blue-600 via-cyan-600 to-teal-500",
    icon: <Gamepad2 className="h-8 w-8 text-white" />,
    greeting: "Waktunya Main & Belajar",
    desc: "Kumpulkan XP dari Arcade Islami",
    timeIcon: "🎮"
  };

  if (hour >= 4 && hour < 11) {
    theme = {
      bg: "from-sky-400 via-blue-400 to-indigo-500",
      icon: <Sunrise className="h-8 w-8 text-white" />,
      greeting: "Pagi yang Berkah",
      desc: "Awali harimu dengan Al-Qur'an dan Dhuha",
      timeIcon: "🌅"
    };
  } else if (hour >= 11 && hour < 15) {
    theme = {
      bg: "from-blue-500 via-cyan-500 to-teal-400",
      icon: <Sun className="h-8 w-8 text-white" />,
      greeting: "Semangat Siang",
      desc: "Sempatkan tilawah di sela kesibukanmu",
      timeIcon: "☀️"
    };
  } else if (hour >= 15 && hour < 18) {
    theme = {
      bg: "from-orange-500 via-amber-500 to-rose-500",
      icon: <Sunset className="h-8 w-8 text-white" />,
      greeting: "Senja yang Tenang",
      desc: "Waktu yang tepat untuk berdzikir petang",
      timeIcon: "🌇"
    };
  } else if (hour >= 18 || hour < 4) {
    theme = {
      bg: "from-slate-900 via-indigo-900 to-purple-900",
      icon: <Moon className="h-8 w-8 text-white" />,
      greeting: "Malam yang Syahdu",
      desc: "Jangan lupa baca Al-Mulk atau Al-Kahfi",
      timeIcon: "🌙"
    };
  }

  // Khusus hari jumat
  const isJumat = new Date().getDay() === 5;
  if (isJumat) {
    theme.bg = "from-emerald-600 via-teal-600 to-cyan-700";
    theme.greeting = "Jumu'ah Mubarak";
    theme.desc = "Perbanyak sholawat dan baca Surah Al-Kahfi hari ini";
    theme.icon = <Sparkles className="h-8 w-8 text-gold fill-gold" />;
  }

  return (
    <Link href={isJumat ? "/surah/18" : "/games"}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${theme.bg} p-8 shadow-2xl text-white cursor-pointer group`}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl transition-transform group-hover:scale-110" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-10 -mb-10 blur-2xl" />
        
        {hour >= 18 || hour < 4 ? (
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30" />
        ) : null}

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm border border-white/20 shadow-inner">
              {theme.icon}
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold flex items-center gap-2">
                {theme.greeting} {theme.timeIcon}
              </h2>
              <p className="text-white/90 text-sm mt-1 font-medium">{theme.desc}</p>
            </div>
          </div>
          <div className="hidden md:block">
             <div className="bg-white text-primary px-5 py-2.5 rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-shadow">
               {isJumat ? "Baca Al-Kahfi" : "Main Arcade"}
             </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

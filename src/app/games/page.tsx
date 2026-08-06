"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Gamepad2, Brain, Puzzle, Type, Lightbulb, Zap } from "lucide-react";

export default function GamesHub() {
  const games = [
    {
      title: "Tebak Ayat",
      desc: "Tebak potongan ayat yang hilang",
      icon: Puzzle,
      color: "from-blue-500 to-cyan-500",
      link: "/games/tebak-ayat",
    },
    {
      title: "Sambung Ayat",
      desc: "Susun kata-kata acak menjadi ayat",
      icon: GripVerticalIcon,
      color: "from-emerald-500 to-teal-500",
      link: "/games/sambung-ayat",
    },
    {
      title: "Trivia Islam",
      desc: "Uji wawasan keislamanmu",
      icon: Brain,
      color: "from-purple-500 to-indigo-500",
      link: "/games/trivia",
    },
    {
      title: "Wordle Islami",
      desc: "Tebak akar kata Al-Qur'an",
      icon: Type,
      color: "from-orange-500 to-amber-500",
      link: "/games/harf-le",
    },
    {
      title: "Memory Match",
      desc: "Cocokkan kata bahasa Arab dan artinya",
      icon: Lightbulb,
      color: "from-rose-500 to-pink-500",
      link: "/games/memory",
    },
    {
      title: "Tajwid Ninja",
      desc: "Latih insting deteksi hukum tajwid",
      icon: Zap,
      color: "from-red-500 to-rose-600",
      link: "/games/tajwid-ninja",
    }
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <BackButton />
      
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <Gamepad2 className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-display font-bold">Arcade Islami</h1>
        </div>
        <p className="text-muted-foreground">Main sambil belajar, kumpulkan XP, naikkan levelmu!</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={game.link}>
              <div className="relative overflow-hidden rounded-2xl border bg-card p-6 transition-all hover:shadow-xl hover:-translate-y-1 group">
                <div className={`absolute top-0 right-0 p-8 rounded-bl-[100px] bg-gradient-to-br ${game.color} opacity-10 transition-opacity group-hover:opacity-20`} />
                <game.icon className={`h-10 w-10 mb-4 bg-gradient-to-br ${game.color} rounded-xl p-2 text-white shadow-lg`} />
                <h2 className="text-xl font-display font-bold mb-2">{game.title}</h2>
                <p className="text-muted-foreground text-sm">{game.desc}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function GripVerticalIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
}

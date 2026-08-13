"use client";

import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { BookOpen, Sparkles, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { sfx } from "@/lib/sfx";

const KISAH_NABI = [
  {
    id: "adam",
    name: "Nabi Adam AS",
    title: "Manusia Pertama di Bumi",
    desc: "Kisah penciptaan manusia pertama dan pelajaran tentang taubat.",
    color: "from-emerald-500 to-green-600",
    icon: "🌍"
  },
  {
    id: "nuh",
    name: "Nabi Nuh AS",
    title: "Pembuat Kapal Raksasa",
    desc: "Kisah kesabaran berdakwah ratusan tahun dan keajaiban kapal besar.",
    color: "from-blue-500 to-cyan-600",
    icon: "🚢"
  },
  {
    id: "ibrahim",
    name: "Nabi Ibrahim AS",
    title: "Pencari Tuhan Sejati",
    desc: "Kisah kecerdasan mencari Tuhan dan mukjizat tidak mempan dibakar api.",
    color: "from-orange-500 to-red-600",
    icon: "🔥"
  },
  {
    id: "musa",
    name: "Nabi Musa AS",
    title: "Tongkat Pembelah Lautan",
    desc: "Kisah mukjizat melawan Firaun dan laut yang terbelah dengan izin Allah.",
    color: "from-yellow-500 to-amber-600",
    icon: "🌊"
  },
  {
    id: "sulaiman",
    name: "Nabi Sulaiman AS",
    title: "Raja yang Bicara dengan Semut",
    desc: "Kisah raja yang bisa berbicara dengan hewan dan jin, serta kerajaannya yang megah.",
    color: "from-green-500 to-emerald-600",
    icon: "👑"
  },
  {
    id: "yunus",
    name: "Nabi Yunus AS",
    title: "Berdzikir di Perut Paus",
    desc: "Kisah menakjubkan bertahan hidup di dalam perut ikan paus yang gelap.",
    color: "from-indigo-500 to-blue-600",
    icon: "🐋"
  },
  {
    id: "isa",
    name: "Nabi Isa AS",
    title: "Bayi yang Bisa Berbicara",
    desc: "Kisah kelahiran tanpa ayah dan mukjizat menyembuhkan orang sakit.",
    color: "from-cyan-500 to-blue-500",
    icon: "🕊️"
  },
  {
    id: "muhammad",
    name: "Nabi Muhammad ﷺ",
    title: "Rahmat Bagi Seluruh Alam",
    desc: "Kisah perjuangan, akhlak mulia, dan turunnya mukjizat Al-Qur'an.",
    color: "from-gold to-amber-600",
    icon: "✨"
  }
];

export default function KisahNabiPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 pb-20">
      <BackButton />

      <div className="mb-10 text-center">
        <div className="inline-block p-4 bg-amber-500/10 rounded-full mb-4">
          <BookOpen className="h-8 w-8 text-amber-500" />
        </div>
        <h1 className="text-3xl font-display font-bold mb-3">Kisah Para Nabi</h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
          Pilih kisah pahlawan Islam di bawah ini! Baca bersama ayah & ibu untuk mengambil hikmah baiknya.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {KISAH_NABI.map((kisah, idx) => (
          <Link key={kisah.id} href={`/kids/kisah-nabi/${kisah.id}`} onClick={() => sfx.playWoosh()}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border bg-card p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className={`absolute top-0 right-0 p-8 rounded-bl-[100px] bg-gradient-to-br ${kisah.color} opacity-10 transition-opacity group-hover:opacity-20`} />
              
              <div className="flex items-start gap-4 mb-4">
                <div className={`flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br ${kisah.color} shadow-lg text-2xl`}>
                  {kisah.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-xl">{kisah.name}</h3>
                  <p className="text-sm font-bold text-amber-500">{kisah.title}</p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-6 line-clamp-2">{kisah.desc}</p>
              
              <div className="flex items-center text-sm font-bold text-primary group-hover:gap-3 transition-all gap-2">
                Baca Kisahnya <ArrowRight className="h-4 w-4" />
              </div>
            </motion.div>
          </Link>
        ))}

        <div className="rounded-3xl border border-dashed border-muted-foreground/30 bg-muted/10 p-6 flex flex-col items-center justify-center text-center">
          <Star className="h-8 w-8 text-muted-foreground/50 mb-3" />
          <p className="font-bold text-muted-foreground">Kisah Nabi Lainnya</p>
          <p className="text-xs text-muted-foreground/70">Musa, Isa, Sulaiman, dan lainnya segera hadir!</p>
        </div>
      </div>
    </div>
  );
}

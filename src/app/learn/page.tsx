"use client";

import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Map, Flag, CheckCircle2, Lock, BookOpen, Star, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { sfx } from "@/lib/sfx";
import { useGamificationStore } from "@/store/gamification-store";

const ROADMAP_LEVELS = [
  {
    level: 1,
    title: "Mualaf & Pemula",
    desc: "Fondasi dasar menjadi seorang Muslim.",
    icon: Flag,
    color: "from-emerald-400 to-teal-500",
    minXp: 0,
    modules: [
      { name: "Rukun Iman & Islam", type: "article", slug: "rukun-iman-islam" },
      { name: "Tata Cara Bersuci (Wudhu & Mandi)", type: "video", slug: "tata-cara-bersuci" },
      { name: "Panduan Gerakan & Bacaan Sholat", type: "interactive", slug: "panduan-sholat" },
    ]
  },
  {
    level: 2,
    title: "Intermediate (Menengah)",
    desc: "Memperbaiki bacaan dan adab harian.",
    icon: BookOpen,
    color: "from-blue-400 to-indigo-500",
    minXp: 500,
    modules: [
      { name: "Pengenalan Huruf Hijaiyah", type: "interactive", slug: "huruf-hijaiyah" },
      { name: "Hukum Tajwid Dasar (Nun Mati & Mim)", type: "quiz", slug: "tajwid-dasar" },
      { name: "Adab Sehari-hari & Doa Pilihan", type: "article", slug: "adab-doa-harian" },
    ]
  },
  {
    level: 3,
    title: "Advanced (Lanjutan)",
    desc: "Mendalami sejarah dan pemahaman syariat.",
    icon: Shield,
    color: "from-purple-500 to-pink-600",
    minXp: 2000,
    modules: [
      { name: "Sejarah Nabi Muhammad (Sirah)", type: "article", slug: "sirah-nabi" },
      { name: "Tafsir Ayat-ayat Populer", type: "article", slug: "tafsir-ayat-populer" },
      { name: "Fikih Muamalah (Jual Beli Islami)", type: "video", slug: "fikih-muamalah" },
    ]
  }
];

export default function LearningRoadmapPage() {
  const { xp } = useGamificationStore();
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 pb-32">
      <BackButton />

      <div className="mb-12 text-center">
        <div className="inline-block p-4 bg-teal-500/10 rounded-full mb-4">
          <Map className="h-8 w-8 text-teal-600" />
        </div>
        <h1 className="text-3xl font-display font-bold mb-3">Roadmap Belajar Islam</h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
          Panduan langkah demi langkah untuk mempelajari Islam dari nol hingga mendalam. Buka modulnya dan kumpulkan XP!
        </p>
      </div>

      <div className="relative">
        {/* Garis vertikal penghubung */}
        <div className="absolute left-8 md:left-12 top-10 bottom-10 w-1 bg-muted rounded-full" />

        <div className="space-y-12">
          {ROADMAP_LEVELS.map((level, idx) => {
            const isActive = xp >= level.minXp;
            
            return (
              <motion.div
                key={level.level}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative flex items-start gap-6 md:gap-8"
              >
                {/* Node Icon */}
                <div className={`relative z-10 flex h-16 w-16 md:h-24 md:w-24 shrink-0 items-center justify-center rounded-full border-4 border-background bg-gradient-to-br ${isActive ? level.color : "from-muted to-muted/50"} shadow-xl`}>
                  <level.icon className={`h-6 w-6 md:h-10 md:w-10 ${isActive ? "text-white" : "text-muted-foreground"}`} />
                </div>

                {/* Content Card */}
                <div className={`flex-1 rounded-3xl border p-6 md:p-8 transition-all ${isActive ? "bg-card shadow-lg ring-1 ring-primary/10" : "bg-muted/30 opacity-75"}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold px-3 py-1 bg-primary/10 text-primary rounded-full uppercase tracking-wider">
                        Level {level.level}
                      </span>
                      {!isActive && <Lock className="h-4 w-4 text-muted-foreground" />}
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-2xl mb-2">{level.title}</h3>
                  <p className="text-sm text-muted-foreground mb-6">{level.desc}</p>
                  
                  {!isActive && (
                    <div className="mb-6 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                      <p className="text-xs text-amber-700 font-bold mb-1">Butuh {level.minXp} XP untuk membuka level ini</p>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500" style={{ width: `${Math.min(100, (xp / level.minXp) * 100)}%` }} />
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {level.modules.map((mod, i) => (
                      <Link
                        key={i}
                        href={isActive ? `/learn/${mod.slug}` : "#"}
                        onClick={() => isActive && sfx.playTap()}
                        className={`flex items-center justify-between p-3 rounded-xl bg-background border transition-colors ${isActive ? "hover:border-primary/30 hover:bg-primary/5" : "opacity-50 cursor-not-allowed"}`}
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className={`h-4 w-4 ${isActive ? "text-primary" : "text-muted-foreground/30"}`} />
                          <span className="text-sm font-medium">{mod.name}</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase text-muted-foreground px-2 py-1 bg-muted rounded-md">
                          {mod.type}
                        </span>
                      </Link>
                    ))}
                  </div>

                  <Link href={isActive ? `/learn/${level.modules[0].slug}` : "#"}>
                    <Button
                      className={`w-full mt-6 h-12 rounded-xl ${isActive ? "bg-primary" : "bg-muted text-muted-foreground"}`}
                      disabled={!isActive}
                    >
                      {isActive ? "Mulai Belajar" : `Terkunci (${xp}/${level.minXp} XP)`}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

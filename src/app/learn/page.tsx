"use client";

import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Map, Flag, CheckCircle2, Lock, BookOpen, Shield, Star, Award, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { sfx } from "@/lib/sfx";
import { useLearnProgressStore } from "@/store/learn-progress-store";
import { LEARN_MODULES } from "./modules";

const ROADMAP_LEVELS = [
  {
    level: 1,
    title: "Mualaf & Pemula",
    desc: "Fondasi dasar menjadi seorang Muslim.",
    icon: Flag,
    color: "from-emerald-500 to-teal-600",
    badge: "Level 1: Dasar",
  },
  {
    level: 2,
    title: "Intermediate (Menengah)",
    desc: "Memperbaiki bacaan, tajwid, dan adab harian.",
    icon: BookOpen,
    color: "from-blue-500 to-indigo-600",
    badge: "Level 2: Menengah",
  },
  {
    level: 3,
    title: "Advanced (Lanjutan)",
    desc: "Mendalami sejarah sirah, tafsir, dan fikih muamalah.",
    icon: Shield,
    color: "from-purple-600 to-pink-600",
    badge: "Level 3: Lanjutan",
  },
];

export default function LearningRoadmapPage() {
  const { isModuleCompleted, getModuleScore } = useLearnProgressStore();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 pb-32">
      <BackButton />

      <div className="mb-12 text-center">
        <div className="inline-block p-4 bg-teal-500/10 rounded-full mb-4">
          <Map className="h-8 w-8 text-teal-600" />
        </div>
        <h1 className="text-3xl font-display font-bold mb-3">Skill Tree & Roadmap Belajar</h1>
        <p className="text-muted-foreground text-sm max-w-xl mx-auto">
          Jalur pembelajaran interaktif bertahap. Selesaikan kuis evaluasi dengan skor terbaik untuk meraih bintang 3 dan membuka modul selanjutnya!
        </p>
      </div>

      <div className="space-y-16">
        {ROADMAP_LEVELS.map((levelData, lvlIdx) => {
          const levelModules = LEARN_MODULES.filter((m) => m.level === levelData.level);

          return (
            <div key={levelData.level} className="relative">
              {/* Level Header Banner */}
              <div className={`p-6 rounded-3xl bg-gradient-to-r ${levelData.color} text-white shadow-xl mb-8 flex items-center justify-between`}>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur">
                    <levelData.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-white/80">
                      {levelData.badge}
                    </span>
                    <h2 className="text-2xl font-bold font-display">{levelData.title}</h2>
                    <p className="text-xs text-white/80 max-w-md">{levelData.desc}</p>
                  </div>
                </div>
              </div>

              {/* Visual Grid Nodes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                {levelModules.map((mod, modIdx) => {
                  const globalIdx = LEARN_MODULES.findIndex((m) => m.slug === mod.slug);
                  const isFirst = globalIdx === 0;
                  const prevModSlug = isFirst ? null : LEARN_MODULES[globalIdx - 1].slug;
                  const isUnlocked = isFirst || (prevModSlug && isModuleCompleted(prevModSlug));
                  const isCompleted = isModuleCompleted(mod.slug);
                  const score = getModuleScore(mod.slug);

                  const stars = score >= 90 ? 3 : score >= 70 ? 2 : score > 0 ? 1 : 0;

                  return (
                    <motion.div
                      key={mod.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: modIdx * 0.1 }}
                    >
                      <Link
                        href={isUnlocked ? `/learn/${mod.slug}` : "#"}
                        onClick={() => {
                          if (isUnlocked) sfx.playTap();
                          else sfx.playWoosh();
                        }}
                        className={`block h-full p-6 rounded-3xl border transition-all relative overflow-hidden ${
                          isCompleted
                            ? "bg-emerald-500/5 border-emerald-500/30 hover:border-emerald-500 shadow-sm"
                            : isUnlocked
                            ? "bg-card border-primary/20 hover:border-primary hover:shadow-lg ring-1 ring-primary/5"
                            : "bg-muted/40 border-dashed opacity-60 cursor-not-allowed"
                        }`}
                      >
                        {/* Status Icon & Stars */}
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${
                              isCompleted
                                ? "bg-emerald-500/20 text-emerald-600"
                                : isUnlocked
                                ? "bg-primary/10 text-primary"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="h-6 w-6" />
                            ) : isUnlocked ? (
                              mod.emoji
                            ) : (
                              <Lock className="h-5 w-5" />
                            )}
                          </div>

                          {/* Star Rating */}
                          <div className="flex items-center gap-1">
                            {[1, 2, 3].map((s) => (
                              <Star
                                key={s}
                                className={`h-4 w-4 ${
                                  s <= stars
                                    ? "text-amber-400 fill-amber-400"
                                    : "text-muted-foreground/30"
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Title & Desc */}
                        <h3 className="font-bold font-display text-base mb-1 line-clamp-1">
                          {mod.name}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
                          {mod.desc}
                        </p>

                        {/* Bottom Tag */}
                        <div className="flex items-center justify-between pt-3 border-t border-border/40 text-[11px]">
                          <span className="uppercase font-semibold text-muted-foreground">
                            {mod.type}
                          </span>
                          {isCompleted ? (
                            <span className="font-bold text-emerald-600">Skor {score}%</span>
                          ) : isUnlocked ? (
                            <span className="font-bold text-primary">Mulai Belajar →</span>
                          ) : (
                            <span className="text-muted-foreground">Terkunci</span>
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

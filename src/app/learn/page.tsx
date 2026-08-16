"use client";

import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Map, Flag, CheckCircle2, Lock, BookOpen, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { sfx } from "@/lib/sfx";
import { useLearnProgressStore } from "@/store/learn-progress-store";
import { LEARN_MODULES } from "./modules";

// Group the flattened LEARN_MODULES back into levels for the roadmap display
const ROADMAP_LEVELS = [
  {
    level: 1,
    title: "Mualaf & Pemula",
    desc: "Fondasi dasar menjadi seorang Muslim.",
    icon: Flag,
    color: "from-emerald-400 to-teal-500",
  },
  {
    level: 2,
    title: "Intermediate (Menengah)",
    desc: "Memperbaiki bacaan dan adab harian.",
    icon: BookOpen,
    color: "from-blue-400 to-indigo-500",
  },
  {
    level: 3,
    title: "Advanced (Lanjutan)",
    desc: "Mendalami sejarah dan pemahaman syariat.",
    icon: Shield,
    color: "from-purple-500 to-pink-600",
  }
];

export default function LearningRoadmapPage() {
  const { isModuleCompleted, getModuleScore } = useLearnProgressStore();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 pb-32">
      <BackButton />

      <div className="mb-12 text-center">
        <div className="inline-block p-4 bg-teal-500/10 rounded-full mb-4">
          <Map className="h-8 w-8 text-teal-600" />
        </div>
        <h1 className="text-3xl font-display font-bold mb-3">Roadmap Belajar Islam</h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
          Materi interaktif step-by-step. Selesaikan kuis pemahaman tiap modul untuk membuka materi berikutnya.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-8 md:left-12 top-10 bottom-10 w-1 bg-muted rounded-full" />

        <div className="space-y-12">
          {ROADMAP_LEVELS.map((levelData, idx) => {
            const levelModules = LEARN_MODULES.filter(m => m.level === levelData.level);
            
            return (
              <motion.div
                key={levelData.level}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative flex items-start gap-6 md:gap-8"
              >
                {/* Node Icon */}
                <div className={`relative z-10 flex h-16 w-16 md:h-24 md:w-24 shrink-0 items-center justify-center rounded-full border-4 border-background bg-gradient-to-br ${levelData.color} shadow-xl`}>
                  <levelData.icon className="h-6 w-6 md:h-10 md:w-10 text-white" />
                </div>

                {/* Content Card */}
                <div className="flex-1 rounded-3xl border p-6 md:p-8 transition-all bg-card shadow-lg ring-1 ring-primary/5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold px-3 py-1 bg-primary/10 text-primary rounded-full uppercase tracking-wider">
                        Level {levelData.level}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-2xl mb-2">{levelData.title}</h3>
                  <p className="text-sm text-muted-foreground mb-6">{levelData.desc}</p>

                  <div className="space-y-3">
                    {levelModules.map((mod) => {
                      const modIndex = LEARN_MODULES.findIndex(m => m.slug === mod.slug);
                      const isFirst = modIndex === 0;
                      const prevModSlug = isFirst ? null : LEARN_MODULES[modIndex - 1].slug;
                      const isUnlocked = isFirst || (prevModSlug && isModuleCompleted(prevModSlug));
                      const isCompleted = isModuleCompleted(mod.slug);
                      const score = getModuleScore(mod.slug);

                      return (
                        <Link
                          key={mod.slug}
                          href={isUnlocked ? `/learn/${mod.slug}` : "#"}
                          onClick={() => {
                            if (isUnlocked) sfx.playTap();
                            else sfx.playWoosh();
                          }}
                          className={`relative flex items-center justify-between p-4 rounded-xl border transition-all overflow-hidden ${
                            isUnlocked 
                              ? "bg-background hover:border-primary/50 hover:bg-primary/5 hover:shadow-md" 
                              : "bg-muted/40 border-dashed opacity-60 cursor-not-allowed"
                          }`}
                        >
                          <div className="flex items-center gap-4 relative z-10">
                            {isCompleted ? (
                              <div className="p-2 bg-emerald-500/20 text-emerald-600 rounded-lg">
                                <CheckCircle2 className="h-5 w-5" />
                              </div>
                            ) : isUnlocked ? (
                              <div className="p-2 bg-primary/10 text-primary rounded-lg text-lg">
                                {mod.emoji}
                              </div>
                            ) : (
                              <div className="p-2 bg-muted-foreground/20 text-muted-foreground rounded-lg">
                                <Lock className="h-5 w-5" />
                              </div>
                            )}
                            
                            <div>
                              <span className="text-sm font-bold block">{mod.name}</span>
                              {isCompleted ? (
                                <span className="text-[10px] font-medium text-emerald-600">Selesai (Skor: {score}%)</span>
                              ) : isUnlocked ? (
                                <span className="text-[10px] font-medium text-primary">Siap dipelajari</span>
                              ) : (
                                <span className="text-[10px] font-medium text-muted-foreground">Terkunci</span>
                              )}
                            </div>
                          </div>
                          
                          {isUnlocked && (
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold uppercase text-muted-foreground px-2 py-1 bg-muted rounded-md hidden sm:inline-block">
                                {mod.type}
                              </span>
                            </div>
                          )}
                          
                          {isCompleted && (
                            <div className="absolute inset-0 bg-emerald-500/5 z-0" />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

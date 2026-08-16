"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Button } from "@/components/ui/button";
import { LEARN_MODULES } from "@/app/learn/modules";
import { useLearnProgressStore } from "@/store/learn-progress-store";
import { useGamificationStore } from "@/store/gamification-store";
import { sfx } from "@/lib/sfx";
import { CheckCircle2, Sparkles, ArrowLeft, ArrowRight, Play, Brain, Check, X, Award, RotateCcw } from "lucide-react";

export default function LearnModulePage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  
  const modIndex = LEARN_MODULES.findIndex((m) => m.slug === params.slug);
  const mod = LEARN_MODULES[modIndex];
  const nextMod = LEARN_MODULES[modIndex + 1];
  
  const { markModuleCompleted } = useLearnProgressStore();
  const { addXp } = useGamificationStore();
  
  // States
  const [session, setSession] = useState<"materi" | "kuis" | "success">("materi");
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  if (!mod) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <BackButton />
        <p className="font-bold text-2xl mb-4">Modul tidak ditemukan</p>
        <Link href="/learn">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Kembali ke Roadmap
          </Button>
        </Link>
      </div>
    );
  }

  const handleStartQuiz = () => {
    setSession("kuis");
    setCurrentQuizIdx(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    sfx.playTap();
  };

  const handleAnswer = (idx: number) => {
    if (isAnswered) return;
    
    setSelectedOption(idx);
    setIsAnswered(true);
    
    const isCorrect = idx === mod.quiz[currentQuizIdx].correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
      sfx.playSuccess();
    } else {
      sfx.playTap();
      if (navigator.vibrate) navigator.vibrate([100]);
    }
  };

  const handleNextQuiz = () => {
    if (currentQuizIdx < mod.quiz.length - 1) {
      setCurrentQuizIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      sfx.playWoosh();
    } else {
      // Hitung skor akhir
      const finalPercentage = Math.round(((score + (selectedOption === mod.quiz[currentQuizIdx].correctIndex ? 1 : 0)) / mod.quiz.length) * 100);
      
      if (finalPercentage >= 70) {
        // Lulus!
        markModuleCompleted(mod.slug, finalPercentage);
        addXp(50, `Menyelesaikan Modul: ${mod.name}`);
        setSession("success");
        sfx.playSuccess();
      } else {
        // Gagal, kembali ke quiz
        alert(`Skor kamu ${finalPercentage}%. Butuh minimal 70% untuk lulus. Yuk coba lagi!`);
        handleStartQuiz();
      }
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 pb-32">
      {session === "materi" && <BackButton />}

      <AnimatePresence mode="wait">
        {/* ===================== SESI 1: MATERI & VIDEO ===================== */}
        {session === "materi" && (
          <motion.div
            key="materi"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="mb-10 text-center">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-3xl bg-gradient-to-br from-primary to-teal shadow-xl text-4xl mb-6">
                {mod.emoji}
              </div>
              <div className="mb-3">
                <span className="text-xs font-bold px-3 py-1 bg-primary/10 text-primary rounded-full uppercase tracking-wider">
                  Level {mod.level} &middot; Materi
                </span>
              </div>
              <h1 className="text-3xl font-display font-bold mb-2">{mod.name}</h1>
              <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">{mod.desc}</p>
            </div>

            {/* Video Embed */}
            {mod.youtubeId && (
              <div className="mb-10 rounded-3xl overflow-hidden shadow-lg border-4 border-card bg-black aspect-video relative">
                <iframe 
                  src={`https://www.youtube.com/embed/${mod.youtubeId}?rel=0`} 
                  title="YouTube video player" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
            )}

            <div className="space-y-6 mb-12">
              {mod.sections.map((section, sIdx) => (
                <div key={sIdx} className="p-6 md:p-8 rounded-3xl bg-card border shadow-sm hover:shadow-md transition-shadow">
                  <h2 className="font-display font-bold text-xl mb-4 text-primary">{section.title}</h2>
                  <ul className="space-y-4">
                    {section.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                        <p className="text-sm md:text-base font-medium leading-relaxed">{point}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 md:p-8 bg-gradient-to-br from-primary/10 to-teal/10 rounded-3xl border border-primary/20 text-center">
              <h3 className="font-display font-bold text-xl mb-2 flex justify-center items-center gap-2">
                <Brain className="h-6 w-6 text-primary" />
                Siap Uji Pemahaman?
              </h3>
              <p className="text-sm font-medium text-muted-foreground mb-6">
                Untuk membuka modul berikutnya, kamu harus mendapatkan skor minimal 70% di kuis ini.
              </p>
              <Button 
                onClick={handleStartQuiz}
                className="h-14 px-8 w-full md:w-auto rounded-2xl bg-gradient-to-r from-primary to-teal shadow-xl hover:scale-105 transition-transform text-white text-lg font-bold gap-2"
              >
                <Play className="h-5 w-5 fill-white" /> Mulai Uji Pemahaman
              </Button>
            </div>
          </motion.div>
        )}

        {/* ===================== SESI 2: KUIS UJI PEMAHAMAN ===================== */}
        {session === "kuis" && (
          <motion.div
            key="kuis"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="mb-8 flex items-center justify-between">
              <Button variant="ghost" onClick={() => setSession("materi")} className="rounded-xl text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4 mr-2" /> Kembali ke Materi
              </Button>
              <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
                Pertanyaan {currentQuizIdx + 1} / {mod.quiz.length}
              </span>
            </div>

            {/* Progress */}
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden mb-8">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuizIdx) / mod.quiz.length) * 100}%` }}
              />
            </div>

            <div className="p-6 md:p-8 rounded-3xl bg-card border shadow-xl">
              <h2 className="font-display font-bold text-2xl mb-8 leading-relaxed">
                {mod.quiz[currentQuizIdx].question}
              </h2>

              <div className="space-y-3 mb-8">
                {mod.quiz[currentQuizIdx].options.map((opt, idx) => {
                  let btnStyle = "bg-muted/50 border hover:bg-accent hover:border-primary/40";
                  let icon = null;

                  if (isAnswered) {
                    const isCorrectOption = idx === mod.quiz[currentQuizIdx].correctIndex;
                    if (isCorrectOption) {
                      btnStyle = "bg-emerald-500 text-white border-emerald-600 shadow-md";
                      icon = <Check className="h-5 w-5 shrink-0" />;
                    } else if (idx === selectedOption) {
                      btnStyle = "bg-rose-500 text-white border-rose-600 shadow-md";
                      icon = <X className="h-5 w-5 shrink-0" />;
                    } else {
                      btnStyle = "bg-muted/30 border opacity-50";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleAnswer(idx)}
                      className={`w-full p-4 rounded-2xl text-left transition-all flex items-center justify-between gap-4 font-medium ${btnStyle}`}
                    >
                      <span className="text-base">{opt}</span>
                      {icon}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className={`p-5 rounded-2xl border mb-6 ${
                    selectedOption === mod.quiz[currentQuizIdx].correctIndex
                      ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-300"
                      : "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-900/50 text-amber-800 dark:text-amber-300"
                  }`}>
                    <p className="font-bold mb-1 text-sm">Penjelasan:</p>
                    <p className="text-sm font-medium leading-relaxed opacity-90">
                      {mod.quiz[currentQuizIdx].explanation}
                    </p>
                  </div>
                  <Button 
                    onClick={handleNextQuiz} 
                    className="w-full h-14 rounded-2xl text-lg font-bold"
                  >
                    {currentQuizIdx < mod.quiz.length - 1 ? "Pertanyaan Berikutnya" : "Lihat Hasil Akhir"}
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* ===================== SESI 3: SUCCESS & CELEBRATION ===================== */}
        {session === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 text-center"
          >
            <div className="inline-flex p-6 bg-emerald-500/20 rounded-full mb-6 relative">
              <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full animate-pulse" />
              <Award className="h-20 w-20 text-emerald-500 relative z-10" />
            </div>

            <h1 className="font-display font-bold text-4xl mb-4">Alhamdulillah! 🎉</h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              Kamu telah menyelesaikan modul <span className="font-bold text-foreground">"{mod.name}"</span> dengan pemahaman yang sangat baik! Terus tingkatkan belajarmu.
            </p>

            <div className="flex justify-center gap-4 mb-12">
              <div className="p-4 rounded-2xl bg-card border shadow-sm min-w-[120px]">
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Skor Kuis</p>
                <p className="text-3xl font-display font-bold text-primary">
                  {Math.round((score / mod.quiz.length) * 100)}%
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-card border shadow-sm min-w-[120px]">
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">XP Diraih</p>
                <p className="text-3xl font-display font-bold text-emerald-500">+50</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 max-w-sm mx-auto">
              {nextMod ? (
                <Link href={`/learn/${nextMod.slug}`}>
                  <Button className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary to-teal text-white text-lg font-bold shadow-lg hover:scale-105 transition-all gap-2">
                    Lanjut Modul Berikutnya <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Link href="/learn">
                  <Button className="w-full h-14 rounded-2xl bg-gradient-to-r from-gold to-amber-500 text-white text-lg font-bold shadow-lg hover:scale-105 transition-all gap-2">
                    <Sparkles className="h-5 w-5" /> Selesai Semua Modul!
                  </Button>
                </Link>
              )}
              
              <Link href="/learn">
                <Button variant="ghost" className="w-full h-12 rounded-xl text-muted-foreground hover:text-foreground">
                  Kembali ke Roadmap
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Button } from "@/components/ui/button";
import { LEARN_MODULES } from "@/app/learn/modules";
import { useLearnProgressStore } from "@/store/learn-progress-store";
import { useGamificationStore } from "@/store/gamification-store";
import { sfx } from "@/lib/sfx";
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  Brain, 
  Check, 
  X, 
  Award, 
  RotateCcw, 
  ExternalLink,
  HelpCircle,
  BookOpen
} from "lucide-react";

export default function LearnModulePage() {
  const params = useParams<{ slug: string }>();
  
  const modIndex = LEARN_MODULES.findIndex((m) => m.slug === params.slug);
  const mod = LEARN_MODULES[modIndex];
  const nextMod = LEARN_MODULES[modIndex + 1];
  
  const { markModuleCompleted } = useLearnProgressStore();
  const { addXp } = useGamificationStore();
  
  // State Sesi: "materi" -> "kuis" -> "success" / "failed"
  const [session, setSession] = useState<"materi" | "kuis" | "success" | "failed">("materi");
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [calculatedPercentage, setCalculatedPercentage] = useState(0);

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
      if (navigator.vibrate) navigator.vibrate([50, 50]);
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
      // Hitung persentase akhir (4 soal = tiap benar 25%)
      const finalScore = score + (selectedOption === mod.quiz[currentQuizIdx].correctIndex ? 1 : 0);
      const finalPercentage = Math.round((finalScore / mod.quiz.length) * 100);
      setCalculatedPercentage(finalPercentage);
      
      if (finalPercentage >= 70) {
        // Lulus! (Minimal 70%)
        markModuleCompleted(mod.slug, finalPercentage);
        addXp(50, `Menyelesaikan Modul: ${mod.name}`);
        setSession("success");
        sfx.playSuccess();
      } else {
        // Tidak mencapai 70%, tampilkan layar motivasi failed interaktif
        setSession("failed");
        sfx.playTap();
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

            {/* Video Embed with Fallback Link */}
            {mod.youtubeId && (
              <div className="mb-10 space-y-2">
                <div className="rounded-3xl overflow-hidden shadow-lg border-4 border-card bg-black aspect-video relative">
                  <iframe 
                    src={`https://www.youtube-nocookie.com/embed/${mod.youtubeId}?rel=0&enablejsapi=1`} 
                    title="YouTube video player" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  ></iframe>
                </div>
                <div className="flex justify-end pr-2">
                  <a
                    href={`https://www.youtube.com/watch?v=${mod.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-medium bg-muted/40 hover:bg-muted/70 px-3 py-1.5 rounded-xl border border-border/50"
                  >
                    <span>Tonton langsung di YouTube</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
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
                Selesaikan 4 pertanyaan kuis dengan skor minimal 70% (minimal 3 benar) untuk membuka modul berikutnya.
              </p>
              <Button 
                onClick={handleStartQuiz}
                className="h-14 px-8 w-full md:w-auto rounded-2xl bg-gradient-to-r from-primary to-teal shadow-xl hover:scale-105 transition-transform text-white text-lg font-bold gap-2"
              >
                <Play className="h-5 w-5 fill-white" /> Mulai Uji Pemahaman (4 Soal)
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

            {/* Progress Bar */}
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden mb-8">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuizIdx + 1) / mod.quiz.length) * 100}%` }}
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
                    {currentQuizIdx < mod.quiz.length - 1 ? "Pertanyaan Berikutnya" : "Lihat Hasil Uji Pemahaman"}
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* ===================== SESI 3A: SUCCESS & CELEBRATION (≥ 70%) ===================== */}
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
                <p className="text-3xl font-display font-bold text-emerald-500">
                  {calculatedPercentage}%
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-card border shadow-sm min-w-[120px]">
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">ZP Diraih</p>
                <p className="text-3xl font-display font-bold text-primary">+50 ZP</p>
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

        {/* ===================== SESI 3B: FAILED / MOTIVASI ULANG (< 70%) ===================== */}
        {session === "failed" && (
          <motion.div
            key="failed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 text-center"
          >
            <div className="inline-flex p-6 bg-amber-500/20 rounded-full mb-6 relative">
              <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full animate-pulse" />
              <RotateCcw className="h-20 w-20 text-amber-500 relative z-10" />
            </div>

            <h1 className="font-display font-bold text-3xl mb-3">Hampir Berhasil! ✨</h1>
            <p className="text-muted-foreground text-sm md:text-base mb-8 max-w-md mx-auto leading-relaxed">
              Skor kamu <span className="font-bold text-foreground">{calculatedPercentage}%</span>. Butuh minimal <span className="font-bold text-emerald-600">70% (3 dari 4 benar)</span> untuk membuka modul berikutnya. Yuk pelajari lagi atau coba ulangi kuisnya!
            </p>

            <div className="flex justify-center gap-4 mb-10">
              <div className="p-4 rounded-2xl bg-card border border-amber-500/30 shadow-sm min-w-[120px]">
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Skor Kamu</p>
                <p className="text-3xl font-display font-bold text-amber-600">
                  {calculatedPercentage}%
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-card border shadow-sm min-w-[120px]">
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Target Lulus</p>
                <p className="text-3xl font-display font-bold text-primary">70%</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Button
                onClick={handleStartQuiz}
                className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold shadow-lg hover:scale-105 transition-all gap-2"
              >
                <RotateCcw className="h-4 w-4" /> Ulangi Kuis Sekarang
              </Button>
              <Button
                variant="outline"
                onClick={() => setSession("materi")}
                className="flex-1 h-14 rounded-2xl font-bold border-2 hover:bg-muted gap-2"
              >
                <BookOpen className="h-4 w-4" /> Pelajari Materi Dulu
              </Button>
            </div>

            <div className="mt-8">
              <Link href="/learn">
                <Button variant="ghost" className="text-xs text-muted-foreground hover:text-foreground">
                  Kembali ke Roadmap Belajar
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

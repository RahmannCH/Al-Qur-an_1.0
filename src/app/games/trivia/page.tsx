"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Button } from "@/components/ui/button";
import { useQuizStore, QuizQuestion } from "@/store/quiz-store";
import { QUIZ_CATEGORIES, getQuestionsByCategory, getRandomQuestions } from "@/data/quiz-questions";
import { Sparkles, Trophy, Award, RotateCcw, CheckCircle2, XCircle, Clock, ArrowRight, Lightbulb } from "lucide-react";
import { sfx } from "@/lib/sfx";
import { useGamificationStore } from "@/store/gamification-store";

export default function QuizPage() {
  const { currentSession, startQuiz, answerQuestion, nextQuestion, completeQuiz, resetQuiz, addResult } = useQuizStore();
  const { addXp } = useGamificationStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // State untuk mengontrol fase kuis per soal
  // "question": user sedang membaca dan memilih jawaban
  // "feedback": user baru klik, menunjukkan animasi benar/salah singkat
  // "explanation": layer penjelasan penuh muncul setelah feedback
  const [phase, setPhase] = useState<"question" | "feedback" | "explanation">("question");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleStart = (categoryId: string) => {
    let questions: QuizQuestion[];
    if (categoryId === "random") {
      questions = getRandomQuestions(5);
    } else {
      questions = getQuestionsByCategory(categoryId);
    }

    if (questions.length === 0) return;

    setSelectedCategory(categoryId);
    setSelectedAnswer(null);
    setPhase("question");
    startQuiz(questions);
    sfx.playSuccess();
  };

  const handleAnswer = (index: number) => {
    if (phase !== "question") return;
    
    setSelectedAnswer(index);
    setPhase("feedback"); // Langsung ubah ke fase feedback (locking UI)

    const isCorrect = index === currentSession?.questions[currentSession.currentIndex].correctIndex;
    
    // Mainkan sound effect sesuai jawaban
    if (isCorrect) {
      sfx.playSuccess();
      if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
    } else {
      sfx.playTap();
      if (navigator.vibrate) navigator.vibrate([100]);
    }

    // Catat skor di store
    answerQuestion(index);

    // Beri jeda 800ms untuk efek feedback memudar, lalu ganti ke layar Penjelasan (Explanation)
    setTimeout(() => {
      setPhase("explanation");
    }, 800);
  };

  const handleNext = () => {
    if (!currentSession) return;

    if (currentSession.currentIndex < currentSession.questions.length - 1) {
      nextQuestion();
      setSelectedAnswer(null);
      setPhase("question");
      sfx.playWoosh();
    } else {
      // Quiz Selesai!
      completeQuiz();
      
      // Tambah XP berdasarkan skor (10 XP per jawaban benar)
      const xpGained = currentSession.score * 10;
      addXp(xpGained, `Kuis Islami (Skor: ${currentSession.score}/${currentSession.questions.length})`);
      
      // Simpan hasil
      addResult({
        quizId: currentSession.quizId,
        category: selectedCategory || "Umum",
        score: currentSession.score,
        totalQuestions: currentSession.questions.length,
        percentage: Math.round((currentSession.score / currentSession.questions.length) * 100),
        completedAt: new Date().toISOString(),
        badge: currentSession.score === currentSession.questions.length ? "Sempurna!" : "Lulus",
      });

      sfx.playSuccess();
    }
  };

  // 1. Tampilan Pilih Kategori (Belum Mulai Kuis)
  if (!currentSession) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 pb-32">
        <BackButton />

        <div className="mb-10 text-center">
          <div className="inline-flex p-4 bg-amber-500/10 rounded-3xl mb-4">
            <Trophy className="h-10 w-10 text-amber-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">Kuis Islami Interaktif</h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
            Uji wawasan keislamanmu! Dapatkan XP dan lencana keberhasilan untuk setiap kuis yang kamu selesaikan.
          </p>
        </div>

        <div className="mb-6 flex justify-center">
          <Button
            onClick={() => handleStart("random")}
            className="h-14 px-8 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:scale-105 transition-transform text-white font-bold text-lg shadow-xl gap-2"
          >
            <Sparkles className="h-5 w-5" /> Kuis Acak (5 Soal)
          </Button>
        </div>

        <h2 className="font-display font-bold text-xl mb-4 text-center mt-12">Atau Pilih Kategori Khusus:</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {QUIZ_CATEGORIES.map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleStart(cat.id)}
              className="p-6 rounded-3xl border bg-card hover:shadow-xl transition-all cursor-pointer flex flex-col items-center text-center group"
            >
              <div className={`p-4 rounded-2xl ${cat.bg} text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <h3 className="font-display font-bold text-lg mb-1">{cat.name}</h3>
              <p className="text-xs text-muted-foreground mb-4">Uji khusus materi ini</p>
              <Button size="sm" className="w-full rounded-xl">Mulai Kuis</Button>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // 2. Tampilan Hasil Kuis (Selesai)
  if (currentSession.completed) {
    const percentage = Math.round((currentSession.score / currentSession.questions.length) * 100);

    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center pb-32">
        <BackButton />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-8 rounded-3xl bg-card border shadow-xl relative overflow-hidden"
        >
          <div className="inline-flex p-5 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full mb-6">
            <Award className="h-16 w-16 text-amber-500" />
          </div>

          <h2 className="text-3xl font-display font-bold mb-2">Kuis Selesai!</h2>
          <p className="text-muted-foreground mb-6">
            {percentage >= 80 ? "MasyaAllah! Luar biasa pengetahuanmu!" : "Bagus! Terus tingkatkan belajar Islammu!"}
          </p>

          <div className="p-6 bg-muted/30 rounded-2xl border mb-6 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Skor Kamu</p>
              <p className="text-3xl font-bold text-primary">{currentSession.score} / {currentSession.questions.length}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">XP Diperoleh</p>
              <p className="text-3xl font-bold text-emerald-600">+{currentSession.score * 10} XP</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" className="flex-1 h-12 rounded-xl" onClick={resetQuiz}>
              Pilih Kategori Lain
            </Button>
            <Button className="flex-1 h-12 rounded-xl gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90" onClick={() => handleStart(selectedCategory || "random")}>
              <RotateCcw className="h-4 w-4" /> Coba Lagi
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // 3. Tampilan Halaman Soal & Penjelasan (Sedang Berlangsung)
  const currentQ = currentSession.questions[currentSession.currentIndex];
  const isCorrect = selectedAnswer === currentQ.correctIndex;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 pb-32">
      <BackButton />

      <div className="mb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full">
            Soal {currentSession.currentIndex + 1} dari {currentSession.questions.length}
          </span>
        </div>
        <div className="flex items-center gap-1 text-sm font-bold text-muted-foreground">
          <Clock className="h-4 w-4" /> Skor: {currentSession.score}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden mb-8">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSession.currentIndex + 1) / currentSession.questions.length) * 100}%` }}
        />
      </div>

      {/* Layer Utama: Menjawab Soal */}
      <AnimatePresence mode="wait">
        {phase !== "explanation" ? (
          <motion.div
            key={`q-${currentSession.currentIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
            transition={{ duration: 0.3 }}
            className="p-6 md:p-8 rounded-3xl bg-card border shadow-lg"
          >
            <h3 className="text-xl md:text-2xl font-display font-bold leading-relaxed mb-8">
              {currentQ.question}
            </h3>

            <div className="space-y-4">
              {currentQ.options.map((opt, idx) => {
                let btnStyle = "bg-muted/50 border-transparent hover:border-primary/50 hover:bg-accent hover:shadow-sm";
                let scaleAnim = 1;
                let isPulse = false;

                // Gaya saat fase feedback
                if (phase === "feedback") {
                  if (idx === selectedAnswer) {
                    if (isCorrect) {
                      btnStyle = "bg-emerald-500 text-white border-emerald-600 shadow-lg shadow-emerald-500/20";
                      scaleAnim = 1.02;
                    } else {
                      btnStyle = "bg-rose-500 text-white border-rose-600 shadow-lg shadow-rose-500/20";
                      scaleAnim = 0.98;
                      isPulse = true;
                    }
                  } else if (idx === currentQ.correctIndex && !isCorrect) {
                    // Highlight jawaban benar dengan hijau terang jika user salah jawab
                    btnStyle = "bg-emerald-100 border-emerald-500 text-emerald-800 ring-2 ring-emerald-500";
                  } else {
                    btnStyle = "bg-muted/30 border-transparent opacity-40";
                  }
                }

                return (
                  <motion.button
                    key={idx}
                    disabled={phase !== "question"}
                    onClick={() => handleAnswer(idx)}
                    animate={{ scale: scaleAnim, x: isPulse ? [-5, 5, -5, 5, 0] : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`w-full p-4 md:p-5 rounded-2xl text-left transition-all flex items-center justify-between gap-4 font-medium ${btnStyle}`}
                  >
                    <span className="text-base">{opt}</span>
                    {phase === "feedback" && idx === selectedAnswer && (
                      isCorrect ? <CheckCircle2 className="h-6 w-6 text-white shrink-0 drop-shadow-md" /> : <XCircle className="h-6 w-6 text-white shrink-0 drop-shadow-md" />
                    )}
                    {phase === "feedback" && !isCorrect && idx === currentQ.correctIndex && (
                      <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          /* Layer Penjelasan: Muncul Menggantikan Soal */
          <motion.div
            key={`exp-${currentSession.currentIndex}`}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`p-6 md:p-8 rounded-3xl border-2 shadow-2xl relative overflow-hidden ${
              isCorrect 
                ? "bg-emerald-50/90 dark:bg-emerald-950/20 border-emerald-500/30" 
                : "bg-rose-50/90 dark:bg-rose-950/20 border-rose-500/30"
            }`}
          >
            {/* Dekorasi Background */}
            <div className={`absolute -top-12 -right-12 h-40 w-40 rounded-full blur-3xl opacity-30 ${isCorrect ? "bg-emerald-500" : "bg-rose-500"}`} />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-full ${isCorrect ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"} shadow-lg`}>
                  {isCorrect ? <CheckCircle2 className="h-8 w-8" /> : <XCircle className="h-8 w-8" />}
                </div>
                <div>
                  <h2 className={`text-2xl font-display font-bold ${isCorrect ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"}`}>
                    {isCorrect ? "Jawabanmu Tepat!" : "Sayang Sekali, Salah"}
                  </h2>
                  <p className="text-sm font-medium opacity-80">
                    {isCorrect ? "Kamu berhasil mendapatkan +10 XP" : "Tidak apa-apa, mari belajar dari kesalahan ini."}
                  </p>
                </div>
              </div>

              <div className="mb-8 p-5 md:p-6 bg-card rounded-2xl border shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <Lightbulb className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <h3 className="font-bold text-foreground">Kenapa begitu?</h3>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>

              <Button 
                onClick={handleNext} 
                className={`w-full h-14 rounded-2xl text-lg font-bold shadow-lg transition-transform hover:scale-[1.02] gap-2 ${
                  isCorrect 
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                    : "bg-primary hover:bg-primary/90 text-white"
                }`}
              >
                {currentSession.currentIndex < currentSession.questions.length - 1 ? "Lanjut ke Soal Berikutnya" : "Lihat Hasil Akhir"}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

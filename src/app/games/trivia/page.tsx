"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Button } from "@/components/ui/button";
import { useGamificationStore } from "@/store/gamification-store";
import { Timer, Zap, Loader2, Play, BookOpen, Lightbulb } from "lucide-react";

interface TriviaQuestion {
  id: string | number;
  categoryId: string;
  categoryName: string;
  difficulty: string;
  question: string;
  options: string[];
  answer: number;
  explanation?: string;
}

interface Category {
  categoryId: string;
  categoryName: string;
  description: string;
  icon: string;
  color: string;
}

export default function TriviaGame() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [allQuestions, setAllQuestions] = useState<TriviaQuestion[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [gameState, setGameState] = useState<"menu" | "playing" | "explanation" | "gameover">("menu");
  const [loading, setLoading] = useState(true);
  
  const { addXp } = useGamificationStore();

  useEffect(() => {
    import("@/data/trivia-mega-bank.json").then((data) => {
      setCategories(data.database.categories);
      setAllQuestions(data.database.questions);
      setLoading(false);
    }).catch((err) => {
      console.error("Gagal memuat bank soal", err);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (gameState !== "playing" || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setGameState("gameover");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const startGame = (catId: string) => {
    let filteredQs = allQuestions;
    if (catId !== "all") {
      filteredQs = allQuestions.filter(q => q.categoryId === catId);
    }
    
    if (filteredQs.length === 0) filteredQs = allQuestions;
    
    // Anti-duplicate logic: get played questions from local storage
    const playedRaw = localStorage.getItem("trivia_played");
    const playedQIds: string[] = playedRaw ? JSON.parse(playedRaw) : [];

    // Filter out played questions
    let availableQs = filteredQs.filter(q => !playedQIds.includes(String(q.id)));

    // If all questions in this category have been played, reset the history for this category
    if (availableQs.length < 5) {
       const remainingPlayedIds = playedQIds.filter(id => !filteredQs.some(fq => String(fq.id) === id));
       localStorage.setItem("trivia_played", JSON.stringify(remainingPlayedIds));
       availableQs = filteredQs; // Reset
    }
    
    const shuffled = [...availableQs].sort(() => Math.random() - 0.5).slice(0, 5);
    
    // Mark these as played
    const newPlayedIds = [...playedQIds, ...shuffled.map(q => String(q.id))];
    localStorage.setItem("trivia_played", JSON.stringify(newPlayedIds));

    setQuestions(shuffled);
    setSelectedCategory(catId);
    setCurrentQ(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setSelectedOpt(null);
    setIsAnswered(false);
    setGameState("playing");
  };

  const handleSelect = (idx: number) => {
    if (isAnswered || gameState !== "playing") return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    const q = questions[currentQ];
    const isCorrect = idx === q.answer;
    
    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      const bonus = newStreak >= 3 ? 2 : 1;
      setScore((s) => s + 10 * bonus);
      if (navigator.vibrate) navigator.vibrate(50);
    } else {
      setStreak(0);
      if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
    }

    // Pindah ke layar penjelasan setelah 1 detik
    setTimeout(() => {
      setGameState("explanation");
    }, 1000);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((c) => c + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
      setGameState("playing");
    } else {
      setGameState("gameover");
    }
  };

  useEffect(() => {
    if (gameState === "gameover" && score > 0) {
      addXp(score, "Trivia Islam");
    }
  }, [gameState, score, addXp]);

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-32 flex flex-col items-center justify-center text-center">
        <BackButton />
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <h2 className="text-xl font-display font-bold">Menyiapkan Kuis...</h2>
      </div>
    );
  }

  // State 1: LAYAR MENU (Pemilihan Topik)
  if (gameState === "menu") {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <BackButton />
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-display font-bold mb-3">Pilih Kategori Kuis</h1>
          <p className="text-muted-foreground">Pilih bidang ilmu Islam yang ingin kamu asah. Waktumu cuma 60 detik!</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => startGame("all")}
            className="col-span-full mb-4 p-6 rounded-2xl bg-gradient-to-r from-primary to-teal text-white cursor-pointer shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold font-display mb-1">Campuran (All Topics)</h2>
                <p className="text-white/80">Uji kemampuanmu secara acak di semua bidang</p>
              </div>
              <Play className="h-10 w-10 opacity-80" />
            </div>
          </motion.div>

          {categories.map((cat, i) => (
            <motion.div
              key={cat.categoryId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
              onClick={() => startGame(cat.categoryId)}
              className={`p-6 rounded-2xl cursor-pointer text-white bg-gradient-to-br ${cat.color} transition-all shadow-md`}
            >
              <div className="text-4xl mb-4 bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center backdrop-blur-sm">
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold font-display mb-2">{cat.categoryName}</h3>
              <p className="text-sm text-white/80 leading-relaxed">{cat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  const q = questions[currentQ] || { question: "Loading...", options: ["..."], answer: 0, categoryName: "", explanation: "" };
  
  // State 2: LAYAR KUIS
  if (gameState === "playing") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8">
        <BackButton />
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold">Trivia Islam</h1>
            <p className="text-muted-foreground font-medium bg-muted inline-block px-3 py-1 rounded-full mt-1">
              Topik: {q.categoryName}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`px-4 py-2 rounded-xl flex items-center shadow-sm ${timeLeft <= 10 ? "bg-destructive text-white animate-pulse" : "bg-card border"}`}>
              <Timer className="h-4 w-4 mr-2" />
              <span className="font-bold text-lg">{timeLeft}s</span>
            </div>
            <div className="bg-gradient-to-r from-gold to-yellow-500 text-white px-4 py-2 rounded-xl shadow-sm">
              <span className="font-bold text-lg">{score} XP</span>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-3xl p-8 mb-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-muted">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: `${(currentQ / questions.length) * 100}%` }}
              animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
            />
          </div>
          <p className="text-sm font-bold text-primary mb-4 uppercase tracking-wider">Soal {currentQ + 1} dari {questions.length}</p>
          <p className="text-2xl font-medium leading-relaxed">{q.question}</p>
          
          <AnimatePresence>
            {streak >= 2 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mt-4 inline-flex items-center gap-2 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-3 py-1.5 rounded-full text-sm font-bold"
              >
                <Zap className="h-4 w-4 fill-current" />
                Streak {streak}x! (XP x{streak >= 3 ? 2 : 1})
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {q.options.map((opt: string, idx: number) => {
            let stateClass = "bg-card hover:bg-accent border-2 border-transparent shadow-sm";
            if (isAnswered) {
              if (idx === q.answer) stateClass = "bg-emerald text-white border-emerald shadow-emerald/20";
              else if (idx === selectedOpt) stateClass = "bg-destructive text-white border-destructive shadow-destructive/20";
              else stateClass = "bg-card opacity-50 border-transparent grayscale";
            }
            return (
              <motion.button
                key={idx}
                whileHover={!isAnswered ? { scale: 1.02, translateY: -2 } : {}}
                whileTap={!isAnswered ? { scale: 0.98 } : {}}
                onClick={() => handleSelect(idx)}
                disabled={isAnswered}
                className={`p-5 rounded-2xl text-left font-medium transition-all ${stateClass}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${isAnswered && (idx === q.answer || idx === selectedOpt) ? 'bg-white/20' : 'bg-muted text-muted-foreground'}`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-lg">{opt}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }

  // State 3: LAYAR PENJELASAN
  if (gameState === "explanation") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 bg-card border rounded-3xl shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <BookOpen className="w-32 h-32" />
          </div>
          <div className="mb-6 relative z-10">
            <p className={`text-xl font-bold mb-2 ${selectedOpt === q.answer ? "text-emerald" : "text-destructive"}`}>
               {selectedOpt === q.answer ? "Masya Allah, Tepat Sekali! 🎉" : "Kurang Tepat 😢"}
            </p>
            <p className="text-lg font-medium">Jawaban Benar: <span className="text-primary font-bold">{q.options[q.answer]}</span></p>
          </div>
          <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2 relative z-10">
            <Lightbulb className="h-5 w-5 text-gold" />
            Tahukah Kamu?
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-8 relative z-10 text-lg">
            {q.explanation || "Terus semangat belajar dan kumpulkan XP yang banyak!"}
          </p>
          <Button onClick={handleNext} className="w-full h-14 text-lg bg-primary hover:scale-[1.02] transition-transform relative z-10">
            {currentQ < questions.length - 1 ? "Lanjut Soal Berikutnya" : "Lihat Hasil Akhir"}
          </Button>
        </motion.div>
      </div>
    );
  }

  // State 4: GAMEOVER
  return (
    <div className="mx-auto max-w-lg px-4 py-20">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-10 rounded-3xl bg-card border shadow-2xl text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -ml-20 -mb-20" />
        
        <p className="text-7xl mb-6 relative z-10">{score >= 40 ? "🏆" : score >= 20 ? "🌟" : "👏"}</p>
        <h2 className="text-3xl font-display font-bold mb-2 relative z-10">{timeLeft <= 0 ? "Waktu Habis!" : "Kuis Selesai!"}</h2>
        <p className="text-muted-foreground mb-8 text-lg relative z-10">
          Kamu mendapatkan <span className="font-bold text-gold text-2xl mx-1">{score}</span> XP
        </p>
        
        <div className="flex flex-col gap-3 relative z-10">
          <Button onClick={() => startGame(selectedCategory || "all")} className="w-full h-14 text-lg bg-primary">
            Ulangi Topik Ini
          </Button>
          <Button variant="outline" onClick={() => setGameState("menu")} className="w-full h-14 text-lg">
            Pilih Topik Lain
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

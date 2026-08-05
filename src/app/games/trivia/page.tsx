"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Button } from "@/components/ui/button";
import { useGamificationStore } from "@/store/gamification-store";
import { Timer, Zap } from "lucide-react";

const triviaQuestions = [
  { q: "Berapa jumlah surah dalam Al-Qur'an?", options: ["114", "113", "115", "120"], answer: 0 },
  { q: "Surah apakah yang paling pendek?", options: ["Al-Ikhlas", "Al-Kawthar", "Al-Asr", "Al-Fatihah"], answer: 1 },
  { q: "Siapa nabi terakhir?", options: ["Ibrahim", "Musa", "Muhammad", "Isa"], answer: 2 },
  { q: "Kitab suci umat Islam adalah...", options: ["Zabur", "Injil", "Taurat", "Al-Qur'an"], answer: 3 },
  { q: "Rukun Islam yang pertama adalah...", options: ["Sholat", "Syahadat", "Puasa", "Zakat"], answer: 1 },
  { q: "Surah Al-Fatihah memiliki berapa ayat?", options: ["5", "6", "7", "8"], answer: 2 },
  { q: "Bulan puasa Ramadhan berapa hari?", options: ["28", "29 atau 30", "31", "27"], answer: 1 },
  { q: "Malaikat pencatat amal baik adalah...", options: ["Jibril", "Mikail", "Raqib", "Atid"], answer: 2 },
  { q: "Surah terpanjang dalam Al-Qur'an?", options: ["Ali Imran", "An-Nisa", "Al-Baqarah", "Al-Maidah"], answer: 2 },
  { q: "Berapa jumlah Nabi dalam Islam?", options: ["25", "30", "20", "15"], answer: 0 },
  { q: "Sholat wajib berapa kali sehari?", options: ["3", "4", "5", "6"], answer: 2 },
  { q: "Kiblat umat Islam menghadap ke...", options: ["Madinah", "Yerusalem", "Makkah", "Baghdad"], answer: 2 },
];

export default function TriviaGame() {
  const [questions, setQuestions] = useState(() =>
    [...triviaQuestions].sort(() => Math.random() - 0.5).slice(0, 5)
  );
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [selected, setSelected] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const { addXp } = useGamificationStore();

  useEffect(() => {
    if (gameOver || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setGameOver(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameOver, timeLeft]);

  const handleSelect = (idx: number) => {
    if (isAnswered || gameOver) return;
    setSelected(idx);
    setIsAnswered(true);

    const isCorrect = idx === questions[currentQ].answer;
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

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ((c) => c + 1);
        setSelected(null);
        setIsAnswered(false);
      } else {
        setGameOver(true);
      }
    }, 600);
  };

  const handleReset = () => {
    setQuestions([...triviaQuestions].sort(() => Math.random() - 0.5).slice(0, 5));
    setCurrentQ(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setSelected(null);
    setIsAnswered(false);
    setGameOver(false);
  };

  useEffect(() => {
    if (gameOver && score > 0) {
      addXp(score, "Trivia Islam");
    }
  }, [gameOver, score, addXp]);

  const q = questions[currentQ];

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <BackButton />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Trivia Islam</h1>
          <p className="text-muted-foreground">60 detik, jawab sebanyak mungkin!</p>
        </div>
        <div className="flex items-center gap-4">
          <div className={`px-4 py-2 rounded-lg ${timeLeft <= 10 ? "bg-destructive/10 text-destructive" : "bg-primary/10"}`}>
            <Timer className="h-4 w-4 inline mr-2" />
            <span className="font-bold">{timeLeft}s</span>
          </div>
          <div className="bg-gold/10 text-gold px-4 py-2 rounded-lg">
            <span className="font-bold">{score} pt</span>
          </div>
        </div>
      </div>

      {!gameOver && (
        <>
          <div className="bg-card border rounded-2xl p-6 mb-6">
            <p className="text-sm text-muted-foreground mb-2">Pertanyaan {currentQ + 1}/5</p>
            <p className="text-xl font-medium">{q.q}</p>
            {streak >= 2 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 text-sm text-gold flex items-center gap-1"
              >
                <Zap className="h-4 w-4" />
                Streak {streak}x! (x{streak >= 3 ? 2 : 1} multiplier)
              </motion.p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {q.options.map((opt, idx) => {
              let stateClass = "bg-card hover:bg-accent border";
              if (isAnswered) {
                if (idx === q.answer) stateClass = "bg-emerald text-white border-emerald";
                else if (idx === selected) stateClass = "bg-destructive text-white border-destructive";
              }
              return (
                <motion.button
                  key={idx}
                  whileHover={!isAnswered ? { scale: 1.02 } : {}}
                  whileTap={!isAnswered ? { scale: 0.98 } : {}}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  className={`p-4 rounded-xl text-sm font-medium transition-all ${stateClass}`}
                >
                  {opt}
                </motion.button>
              );
            })}
          </div>
        </>
      )}

      {gameOver && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 rounded-2xl bg-card border text-center"
        >
          <p className="text-5xl mb-4">{score >= 40 ? "🏆" : score >= 20 ? "🌟" : "👏"}</p>
          <h2 className="text-2xl font-display font-bold mb-2">Waktu Habis!</h2>
          <p className="text-muted-foreground mb-6">
            Total: <span className="font-bold text-primary">{score} XP</span>
          </p>
          <Button onClick={handleReset} className="w-full h-12">
            Main Lagi
          </Button>
        </motion.div>
      )}
    </div>
  );
}

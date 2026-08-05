"use client";

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Button } from "@/components/ui/button";
import { useGamificationStore } from "@/store/gamification-store";
import { Timer, Zap } from "lucide-react";

interface TriviaQuestion {
  id: number;
  category: string;
  difficulty: string;
  question: string;
  options: string[];
  answer: number;
}

const questions: TriviaQuestion[] = [
  { id: 1, category: "Tafsir", difficulty: "easy", question: "Apa arti surah Al-Fatihah?", options: ["Surah Pembuka", "Surah Penutup", "Surah Perang", "Surah Keluarga"], answer: 0 },
  { id: 2, category: "Tafsir", difficulty: "easy", question: "Berapa jumlah ayat dalam Al-Qur'an?", options: ["6236", "6240", "6250", "6260"], answer: 0 },
  { id: 3, category: "Tafsir", difficulty: "easy", question: "Surah mana yang disebut 'Induk Al-Qur'an'?", options: ["Al-Baqarah", "Al-Fatihah", "Ali Imran", "Yasin"], answer: 1 },
  { id: 4, category: "Tafsir", difficulty: "medium", question: "Ayat Kursi terdapat di surah...", options: ["Al-Baqarah:255", "Ali Imran:18", "An-Nisa:59", "Al-Maidah:3"], answer: 0 },
  { id: 5, category: "Tafsir", difficulty: "medium", question: "Berapa jumlah surah Makkiyah dalam Al-Qur'an?", options: ["86", "87", "88", "89"], answer: 1 },
  { id: 6, category: "Tafsir", difficulty: "medium", question: "Surah terpanjang dalam Al-Qur'an adalah...", options: ["Ali Imran", "An-Nisa", "Al-Baqarah", "Al-Maidah"], answer: 2 },
  { id: 7, category: "Tafsir", difficulty: "hard", question: "Ayat terakhir yang diturunkan di Madinah adalah...", options: ["QS. Al-Maidah:3", "QS. At-Tahrim:6", "QS. Al-Baqarah:281", "QS. Al-Ikhlas:1"], answer: 2 },
  { id: 8, category: "Sejarah Nabi", difficulty: "easy", question: "Siapa nabi terakhir?", options: ["Ibrahim", "Musa", "Isa", "Muhammad"], answer: 3 },
  { id: 9, category: "Sejarah Nabi", difficulty: "easy", question: "Nama ayah Nabi Muhammad SAW?", options: ["Abdullah", "Abu Thalib", "Abdul Muthalib", "Hamza"], answer: 0 },
  { id: 10, category: "Sejarah Nabi", difficulty: "easy", question: "Nama ibu Nabi Muhammad SAW?", options: ["Aminah", "Khadijah", "Hafshah", "Aishah"], answer: 0 },
  { id: 11, category: "Sejarah Nabi", difficulty: "medium", question: "Nabi Ibrahim dikenal dengan gelar...", options: ["Khalilullah", "Rasulullah", "Najibullah", "Shiddiq"], answer: 0 },
  { id: 12, category: "Sejarah Nabi", difficulty: "medium", question: "Nabi Musa memecah pantai laut untuk...", options: ["Menyeberangi Laut Merah", "Mencari ikan", "Mandi", "Berdoa"], answer: 0 },
  { id: 13, category: "Sejarah Nabi", difficulty: "medium", question: "Nabi Yunus berada di perut ikan selama...", options: ["3 hari", "7 hari", "40 hari", "10 hari"], answer: 0 },
  { id: 14, category: "Sejarah Nabi", difficulty: "hard", question: "Berapa jumlah nabi yang disebutkan dalam Al-Qur'an?", options: ["25", "28", "30", "35"], answer: 0 },
  { id: 15, category: "Fiqih", difficulty: "easy", question: "Rukun Islam yang ke-2 adalah...", options: ["Sholat", "Puasa", "Zakat", "Haji"], answer: 0 },
  { id: 16, category: "Fiqih", difficulty: "easy", question: "Berapa kali sholat wajib sehari?", options: ["3", "4", "5", "6"], answer: 2 },
  { id: 17, category: "Fiqih", difficulty: "easy", question: "Sholat fardhu paling banyak rukunnya adalah...", options: ["Subuh", "Dzuhur", "Maghrib", "Isya"], answer: 2 },
  { id: 18, category: "Fiqih", difficulty: "medium", question: "Sholat sunnah sebelum Dzuhur disebut...", options: ["Sholat Duha", "Sholat Tahiyatul Masjid", "Sholat Rawatib Qabliyah", "Sholat Hajat"], answer: 2 },
  { id: 19, category: "Fiqih", difficulty: "medium", question: "Sholat sunnah setelah Maghrib disebut...", options: ["Sholat Maghrib", "Sholat Rawatib Ba'diyah", "Sholat Isyak", "Sholat Witir"], answer: 1 },
  { id: 20, category: "Fiqih", difficulty: "medium", question: "Waktu sholat Ashar dimulai dari...", options: ["Zuhur sampai Maghrib", "Setelah Zuhur sampai senja", "Mulai subuh", "Setelah Isya"], answer: 1 },
  { id: 21, category: "Fiqih", difficulty: "hard", question: "Sholat sunnah yang dianjurkan setiap pagi adalah...", options: ["Sholat Duha", "Sholat Tahajud", "Sholat Fajar", "Sholat Istikharah"], answer: 0 },
  { id: 22, category: "Sejarah Islam", difficulty: "easy", question: "Kota tempat Nabi Muhammad hijrah adalah...", options: ["Makkah", "Madinah", "Taif", "Thaif"], answer: 1 },
  { id: 23, category: "Sejarah Islam", difficulty: "easy", question: "Perang pertama dalam Islam adalah...", options: ["Badar", "Uhud", "Khandaq", "Hunain"], answer: 0 },
  { id: 24, category: "Sejarah Islam", difficulty: "medium", question: "Siapa penulis tafsir Al-Jalalain?", options: ["Ibn Kathir", "Al-Bukhari", "Jalaluddin Al-Mahalli & Jalaluddin As-Suyuti", "Imam Shafi'i"], answer: 2 },
  { id: 25, category: "Sejarah Islam", difficulty: "medium", question: "Khalifah pertama setelah Nabi Muhammad SAW adalah...", options: ["Umar bin Khattab", "Utsman bin Affan", "Ali bin Abi Thalib", "Abu Bakar Ash-Shiddiq"], answer: 3 },
  { id: 26, category: "Sejarah Islam", difficulty: "hard", question: "Berapa lama masa khilafah Rashidin?", options: ["25 tahun", "30 tahun", "31 tahun", "35 tahun"], answer: 2 },
  { id: 27, category: "Tajwid", difficulty: "easy", question: "Hukum bacaan pada kata 'بِسْمِ' adalah...", options: ["Ikhfa", "Idgham", "Izhar", "Iqlab"], answer: 1 },
  { id: 28, category: "Tajwid", difficulty: "easy", question: "Salah satu tanda orang beriman adalah...", options: ["Membaca Al-Qur'an", "Berakhlak baik", "Beribadah", "Menuntut ilmu"], answer: 1 },
  { id: 29, category: "Tajwid", difficulty: "medium", question: "Idgham Bigunnah ada sebanyak...", options: ["2 huruf", "3 huruf", "4 huruf", "6 huruf"], answer: 0 },
  { id: 30, category: "Tajwid", difficulty: "medium", question: "Ikhfa Haqiki terdapat pada huruf...", options: ["6 huruf", "7 huruf", "15 huruf", "29 huruf"], answer: 1 },
  { id: 31, category: "Akidah", difficulty: "easy", question: "Siapakah Allah?", options: ["Tuhan yang satu", "Tuhan semua makhluk", "Pencipta alam semesta", "Semua benar"], answer: 3 },
  { id: 32, category: "Akidah", difficulty: "medium", question: "Berapa jumlah malaikat yang wajib diketahui?", options: ["5", "6", "10", "25"], answer: 1 },
  { id: 33, category: "Akidah", difficulty: "medium", question: "Malaikat yang bertugas mencatat amal buruk adalah...", options: ["Raqib", "Atid", "Jibril", "Israfil"], answer: 1 },
  { id: 34, category: "Akidah", difficulty: "hard", question: "Salah satu tanda hari kiamat kecil adalah...", options: ["Matahari terbit dari barat", "Turunnya Dajjal", "Bangkitnya Gog dan Magog", "Binatang berbicara"], answer: 1 },
  { id: 35, category: "Tafsir", difficulty: "easy", question: "Surah Yasin disebut 'Jantung Al-Qur'an', terdapat di juz...", options: ["Juz 10", "Juz 11", "Juz 12", "Juz 13"], answer: 1 },
  { id: 36, category: "Sejarah Nabi", difficulty: "easy", question: "Istri pertama Nabi Muhammad SAW adalah...", options: ["Hafshah", "Aishah", "Khadijah", "Sawdah"], answer: 2 },
  { id: 37, category: "Sejarah Nabi", difficulty: "medium", question: "Nabi Nuh membangun kapal atas perintah Allah selama...", options: ["100 tahun", "50 tahun", "30 tahun", "70 tahun"], answer: 0 },
  { id: 38, category: "Fiqih", difficulty: "easy", question: "Sholat Jumat wajib bagi...", options: ["Pria dewasa", "Wanita", "Anak-anak", "Musafir"], answer: 0 },
  { id: 39, category: "Fiqih", difficulty: "medium", question: "Sholat sunnah yang dilakukan saat membutuhkan pertolongan adalah...", options: ["Sholat Istikharah", "Sholat Hajat", "Sholat Taubat", "Sholat Sunnah Fajar"], answer: 1 },
  { id: 40, category: "Sejarah Islam", difficulty: "medium", question: "Masjid pertama dalam Islam adalah...", options: ["Masjid Nabawi", "Masjid Quba", "Masjidil Haram", "Masjid Al-Aqsa"], answer: 1 },
  { id: 41, category: "Tajwid", difficulty: "easy", question: "Izhar Halqi ada sebanyak...", options: ["5 huruf", "6 huruf", "7 huruf", "8 huruf"], answer: 1 },
  { id: 42, category: "Akidah", difficulty: "easy", question: "Kitab yang diturunkan kepada Nabi Musa adalah...", options: ["Taurat", "Injil", "Zabur", "Al-Qur'an"], answer: 0 },
  { id: 43, category: "Akidah", difficulty: "medium", question: "Malaikat yang bertugas meniup sangkakala adalah...", options: ["Jibril", "Israfil", "Mikail", "Izrail"], answer: 1 },
  { id: 44, category: "Tafsir", difficulty: "medium", question: "Surah yang memiliki 2 sajadah adalah...", options: ["Ar-Rahman", "Al-Alaq", "Fussilat", "An-Najm"], answer: 2 },
  { id: 45, category: "Sejarah Nabi", difficulty: "hard", question: "Berapa usia Nabi Muhammad SAW ketika pertama kali menerima wahyu?", options: ["35 tahun", "40 tahun", "45 tahun", "50 tahun"], answer: 1 },
  { id: 46, category: "Fiqih", difficulty: "medium", question: "Sholat sunnah yang dilakukan saat masuk masjid adalah...", options: ["Sholat Tahiyatul Masjid", "Sholat Duha", "Sholat Rawatib", "Sholat Istikharah"], answer: 0 },
  { id: 47, category: "Sejarah Islam", difficulty: "medium", question: "Perang Badar terjadi pada tahun...", options: ["2 H", "3 H", "4 H", "5 H"], answer: 0 },
  { id: 48, category: "Tajwid", difficulty: "hard", question: "Idgham Syafawi terdapat pada huruf...", options: ["2 huruf", "3 huruf", "4 huruf", "5 huruf"], answer: 1 },
  { id: 49, category: "Akidah", difficulty: "medium", question: "Beriman kepada Qada dan Qadar termasuk rukun Iman yang ke...", options: ["ke-3", "ke-4", "ke-5", "ke-6"], answer: 1 },
  { id: 50, category: "Tafsir", difficulty: "medium", question: "Surah Al-Ikhlas terdiri dari...", options: ["1 ayat", "2 ayat", "3 ayat", "4 ayat"], answer: 3 },
  { id: 51, category: "Sejarah Nabi", difficulty: "easy", question: "Nama kuda Nabi Muhammad SAW saat hijrah adalah...", options: ["Qaswara", "Al-Qaswa", "Al-Buraq", "Duldul"], answer: 1 },
  { id: 52, category: "Fiqih", difficulty: "easy", question: "Zakat fitrah wajib dikeluarkan sebelum...", options: ["Sholat Idul Fitri", "Sholat Subuh", "Sholat Dzuhur", "Sholat Maghrib"], answer: 0 },
  { id: 53, category: "Sejarah Islam", difficulty: "easy", question: "Khalifah yang menaklukkan Spanyol adalah...", options: ["Umar bin Abdul Aziz", "Abdul Rahman Ad-Dakhil", "Harun Ar-Rasyid", "Al-Ma'mun"], answer: 1 },
  { id: 54, category: "Tafsir", difficulty: "medium", question: "Surah yang merupakan awal Al-Qur'an adalah...", options: ["Al-Fatihah", "Al-Baqarah", "Ali Imran", "An-Nisa"], answer: 0 },
  { id: 55, category: "Tajwid", difficulty: "easy", question: "Iqlab terdapat pada huruf...", options: ["Ba", "Ta", "Kaf", "Ghain"], answer: 0 },
  { id: 56, category: "Akidah", difficulty: "medium", question: "Malaikat yang bertugas membagi rezeki adalah...", options: ["Jibril", "Israfil", "Mikail", "Izrail"], answer: 2 },
  { id: 57, category: "Sejarah Nabi", difficulty: "medium", question: "Nabi Ibrahim disuruh menyembelih putranya yang bernama...", options: ["Ismail", "Ishaq", "Yakub", "Yusuf"], answer: 0 },
  { id: 58, category: "Fiqih", difficulty: "medium", question: "Sholat sunnah Duha dikerjakan setelah...", options: ["Terbit matahari", "Zuhur", "Ashar", "Maghrib"], answer: 0 },
  { id: 59, category: "Sejarah Islam", difficulty: "medium", question: "Pada tahun ke berana Khilafah Umar bin Khattab dimulai?", options: ["13 H", "14 H", "15 H", "16 H"], answer: 1 },
  { id: 60, category: "Tafsir", difficulty: "hard", question: "Ayat yang menjelaskan tentang keesaan Allah adalah...", options: ["Ayat Kursi", "QS. Al-Ikhlas", "QS. Al-Falaq", "QS. An-Nas"], answer: 1 }
];

function calculateXpWithPenalty(baseXp: number, hintsUsed: number): number {
  if (hintsUsed === 0) return baseXp;
  if (hintsUsed === 1) return Math.ceil(baseXp * 0.5);
  return 3;
}

interface TriviaQuestion {
  id: number;
  category: string;
  difficulty: string;
  question: string;
  options: string[];
  answer: number;
}

export default function TriviaGame() {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [selected, setSelected] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const { addXp } = useGamificationStore();

  // Load questions on mount
  useEffect(() => {
    import("@/data/trivia-bank.json").then((data) => {
      const shuffled = [...data.questions].sort(() => Math.random() - 0.5);
      setQuestions(shuffled.slice(0, 5));
    });
  }, []);

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
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, 5));
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

  const q = questions[currentQ] || { question: "Loading...", options: ["..."], answer: 0 };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <BackButton />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Trivia Islam</h1>
          <p className="text-muted-foreground">60 detik, jawab sebanyak mungkin! Kategori: {q.category}</p>
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
          <div className="bg-card border rounded-2xl p-6 mb-6 shadow-sm">
            <p className="text-sm text-muted-foreground mb-2">Pertanyaan {currentQ + 1}/5</p>
            <p className="text-xl font-medium">{q.question}</p>
            {streak >= 2 && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-sm text-gold flex items-center gap-1">
                <Zap className="h-4 w-4" />
                Streak {streak}x! (x{streak >= 3 ? 2 : 1} multiplier)
              </motion.p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {q.options.map((opt: string, idx: number) => {
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
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-8 rounded-2xl bg-card border text-center">
          <p className="text-5xl mb-4">{score >= 40 ? "🏆" : score >= 20 ? "🌟" : "👏"}</p>
          <h2 className="text-2xl font-display font-bold mb-2">Waktu Habis!</h2>
          <p className="text-muted-foreground mb-6">
            Total: <span className="font-bold text-primary">{score} XP</span>
          </p>
          <Button onClick={handleReset} className="w-full h-12">Main Lagi</Button>
        </motion.div>
      )}
    </div>
  );
}

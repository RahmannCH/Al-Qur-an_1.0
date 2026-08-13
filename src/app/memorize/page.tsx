"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  BookMarked, 
  RefreshCcw, 
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Zap,
  Target,
  TrendingUp
} from "lucide-react";
import Link from "next/link";

interface Method {
  id: string;
  name: string;
  icon: any;
  color: string;
  bgGradient: string;
  description: string;
  steps: string[];
  bestFor: string;
}

const METHODS: Method[] = [
  {
    id: "tikrar",
    name: "Metode Tikrar (Pengulangan)",
    icon: RefreshCcw,
    color: "text-blue-600",
    bgGradient: "from-blue-500/20 to-cyan-500/20",
    description: "Metode klasik yang terbukti efektif. Ulangi satu ayat 20-40 kali sampai benar-benar mutqin (hafal mantap) sebelum lanjut ke ayat berikutnya.",
    steps: [
      "Baca ayat dengan tartil 5x sambil melihat mushaf.",
      "Tutup mushaf, coba lafalkan dari ingatan 10x.",
      "Buka mushaf lagi, perbaiki kesalahan.",
      "Ulangi tanpa melihat 20-30x sampai lancar tanpa ragu.",
      "Setorkan ke guru/teman untuk verifikasi."
    ],
    bestFor: "Pemula yang baru mulai menghafal atau ayat-ayat panjang."
  },
  {
    id: "3t",
    name: "Metode 3T (Tahsin, Tahfizh, Tafsir)",
    icon: Target,
    color: "text-emerald-600",
    bgGradient: "from-emerald-500/20 to-teal-500/20",
    description: "Metode holistik yang memastikan hafalan tidak hanya di lidah, tapi juga di hati dan pikiran.",
    steps: [
      "Tahsin: Perbaiki bacaan dengan bimbingan guru tajwid.",
      "Tahfizh: Hafalkan ayat dengan Tikrar atau metode lain.",
      "Tafsir: Pahami makna ayat agar hafalan melekat kuat di otak.",
      "Ulangi ketiga proses ini dalam siklus untuk setiap ayat.",
      "Review rutin agar tidak lupa."
    ],
    bestFor: "Penghafal yang ingin hafalan berkualitas tinggi dan tahan lama."
  },
  {
    id: "srs",
    name: "Spaced Repetition System (SRS)",
    icon: Brain,
    color: "text-purple-600",
    bgGradient: "from-purple-500/20 to-pink-500/20",
    description: "Metode berbasis sains kognitif. Ulangi hafalan pada interval waktu tertentu (1 hari, 3 hari, 7 hari, 1 bulan) agar masuk ke Long-Term Memory.",
    steps: [
      "Hafal ayat baru hari ini (Day 0).",
      "Muraja'ah (review) besok pagi (Day 1).",
      "Jika lancar, review lagi 3 hari kemudian (Day 4).",
      "Jika masih lancar, review 1 minggu kemudian (Day 11).",
      "Interval berikutnya: 1 bulan, 3 bulan, dst."
    ],
    bestFor: "Penghafal yang ingin menjaga hafalan jangka panjang tanpa lupa."
  }
];

export default function MemorizePage() {
  const [selectedMethod, setSelectedMethod] = useState<Method | null>(null);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 min-h-screen">
      <BackButton />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="inline-block p-3 bg-gradient-to-br from-primary/10 to-gold/10 rounded-2xl mb-4">
          <BookMarked className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-display font-bold mb-3">Hafalan Al-Qur'an</h1>
        <p className="text-muted-foreground text-lg">
          Sistem Tahfizh & Muraja'ah Interaktif
        </p>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div className="rounded-2xl border bg-gradient-to-br from-emerald-500/10 to-teal-500/10 p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Hafalan Mutqin</p>
          </div>
          <p className="text-3xl font-display font-bold text-emerald-600">0 Ayat</p>
          <p className="text-xs text-muted-foreground mt-1">Siap untuk dimuraja'ah</p>
        </div>

        <div className="rounded-2xl border bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Sedang Dihafal</p>
          </div>
          <p className="text-3xl font-display font-bold text-blue-600">0 Ayat</p>
          <p className="text-xs text-muted-foreground mt-1">Masih dalam proses</p>
        </div>

        <div className="rounded-2xl border bg-gradient-to-br from-gold/10 to-amber-500/10 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="h-5 w-5 text-gold" />
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Streak Muraja'ah</p>
          </div>
          <p className="text-3xl font-display font-bold text-gold">0 Hari</p>
          <p className="text-xs text-muted-foreground mt-1">Konsistensi review harian</p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="flex justify-center mb-12">
        <Link href="/memorize/practice">
          <Button className="h-14 px-8 rounded-2xl bg-gradient-to-r from-primary to-teal shadow-xl hover:scale-105 transition-all text-white text-lg font-bold gap-2">
            <Zap className="h-5 w-5" />
            Mulai Latihan Sekarang
          </Button>
        </Link>
      </div>

      {/* Metodologi Menghafal */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Brain className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-display font-bold">Metodologi Menghafal</h2>
        </div>

        {!selectedMethod ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {METHODS.map((method, idx) => {
              const Icon = method.icon;
              return (
                <motion.button
                  key={method.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setSelectedMethod(method)}
                  className={`group relative overflow-hidden rounded-2xl border p-6 text-left transition-all hover:shadow-xl hover:scale-[1.02] bg-gradient-to-br ${method.bgGradient}`}
                >
                  <div className={`p-3 rounded-xl bg-card shadow-sm mb-4 inline-block ${method.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">{method.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{method.description}</p>
                  <div className="flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
                    Pelajari metode ini
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <button
              onClick={() => setSelectedMethod(null)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              ← Kembali ke daftar metode
            </button>

            <div className={`rounded-3xl border p-8 bg-gradient-to-br ${selectedMethod.bgGradient}`}>
              <div className="flex items-start gap-4 mb-6">
                <div className={`p-4 rounded-2xl bg-card shadow-lg ${selectedMethod.color}`}>
                  <selectedMethod.icon className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold mb-2">{selectedMethod.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedMethod.description}</p>
                </div>
              </div>

              <div className="space-y-6 mt-8">
                <div className="p-6 bg-card/80 backdrop-blur-sm rounded-2xl border">
                  <h4 className="font-display font-bold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-gold" />
                    Langkah-langkah Praktis
                  </h4>
                  <ol className="space-y-3">
                    {selectedMethod.steps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                          {idx + 1}
                        </span>
                        <p className="text-sm leading-relaxed pt-0.5">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="p-6 bg-gold/10 rounded-2xl border border-gold/20">
                  <p className="text-xs font-bold text-gold/80 mb-1 uppercase tracking-wider">Cocok untuk</p>
                  <p className="text-sm font-medium">{selectedMethod.bestFor}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Call to Action */}
      <div className="rounded-3xl border bg-gradient-to-br from-primary/5 via-gold/5 to-teal/5 p-8 text-center">
        <Sparkles className="h-12 w-12 text-gold mx-auto mb-4" />
        <h3 className="text-2xl font-display font-bold mb-3">Mulai Hafalan Pertamamu</h3>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Pergi ke halaman surah, pilih ayat yang ingin kamu hafal, lalu tap tombol "Hafalkan Ayat Ini". 
          Sistem akan membimbingmu dengan metode terbaik.
        </p>
        <Link
          href="/quran"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-teal text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
          <BookMarked className="h-5 w-5" />
          Buka Daftar Surah
        </Link>
      </div>
    </div>
  );
}

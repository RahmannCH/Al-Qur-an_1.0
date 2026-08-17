"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Shield, ChevronDown, CheckCircle2, AlertTriangle, Sparkles, BookOpen } from "lucide-react";

interface AgeGuide {
  age: string;
  title: string;
  focus: string;
  points: string[];
}

const GENDER_EDU_GUIDES: AgeGuide[] = [
  {
    age: "Usia 0 - 2 Tahun",
    title: "Mengenal Identitas Diri & Fitrah Dasar",
    focus: "Membangun fitrah biologis sejak dini sesuai ketetapan Allah.",
    points: [
      "Perdengarkan kata ganti yang benar sesuai jenis kelamin biologis bawaan lahir (laki-laki / perempuan).",
      "Pisahkan pakaian sesuai fitrah sejak dini (tidak memakaikan pakaian/perhiasan anak perempuan kepada anak laki-laki, dan sebaliknya).",
      "Larangan Tasyabbuh (menyerupakan diri dengan lawan jenis) ditanamkan sejak masa pertumbuhan awal.",
      "Ajarkan bagian tubuh privat yang tidak boleh dilihat atau disentuh oleh siapapun kecuali orang tua saat membersihkan."
    ]
  },
  {
    age: "Usia 3 - 6 Tahun",
    title: "Pemisahan Tempat Tidur, Privasi & Adab Mandiri",
    focus: "Pemahaman batas mahram, privasi tubuh, dan ketegasan peran.",
    points: [
      "Mulai pisahkan tempat tidur anak (melatih disiplin syariat pemisahan ranjang sebelum usia 7-10 tahun).",
      "Ajarkan adab meminta izin (Isti'dzan) saat memasuki kamar orang tua di tiga waktu privasi (sebelum Subuh, siang hari, dan setelah Isya).",
      "Tanamkan kebanggaan pada fitrah diri: Anak laki-laki bangga menjadi calon imam pelindung, anak perempuan bangga menjadi calon pendidik mulia.",
      "Kenalkan adab toilet: Menutup aurat, tidak buang air bersama, dan istinja secara tertutup dan mandiri."
    ]
  },
  {
    age: "Usia 7 - 10 Tahun",
    title: "Kewajiban Ibadah, Batasan Aurat & Kedisiplinan",
    focus: "Tanggung jawab syariat, penguatan figur maskulin & feminin.",
    points: [
      "Anak laki-laki dididik tegas oleh ayah untuk sholat berjamaah di masjid dan belajar tanggung jawab kepemimpinan (Qawwamun).",
      "Anak perempuan dibimbing ibu menutup aurat secara sempurna dan menjaga rasa malu (Haya') sebagai benteng kehormatan.",
      "Pisahkan kamar tidur anak laki-laki dan perempuan secara mutlak.",
      "Ajarkan batasan sentuhan (Good Touch vs Bad Touch) serta keberanian menolak segala bentuk pelecehan seksual."
    ]
  },
  {
    age: "Usia 11 - 15 Tahun (Baligh)",
    title: "Pubertas, Menjaga Pandangan & Benteng Akidah",
    focus: "Fikih baligh, batasan pergaulan, dan pencegahan LGBT di era digital.",
    points: [
      "Jelaskan tanda-tanda baligh (Mimpi basah bagi laki-laki, Haid bagi perempuan) dan tata cara Mandi Junub sesuai sunnah.",
      "Ghadhul Bashar: Disiplin menjaga pandangan dari pornografi, konten viral yang mempromosikan normalisasi LGBT, dan budaya menyimpang di media sosial.",
      "Larangan Ikhtilat & Khalwat: Tidak berduaan atau bergaul bebas tanpa batas dengan lawan jenis maupun pertemanan yang menjurus ke penyimpangan sesama jenis.",
      "Penegasan Fikih Pernikahan: Islam hanya mengakui ikatan suci pernikahan antara seorang laki-laki dan seorang perempuan yang sah."
    ]
  }
];

export default function GenderEduPage() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 pb-32">
      <BackButton />

      <div className="mb-10 text-center">
        <div className="inline-block p-4 bg-indigo-500/10 rounded-full mb-4">
          <Shield className="h-8 w-8 text-indigo-500" />
        </div>
        <h1 className="text-3xl font-display font-bold mb-3">Edukasi Fitrah & Tumbuh Kembang</h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
          Panduan bagi orang tua untuk menjaga fitrah anak, batasan aurat, dan menanamkan benteng syariat Islam dari penyimpangan zaman.
        </p>
      </div>

      {/* Box Penegasan Syariat & Penolakan Penyimpangan LGBT */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-3xl bg-gradient-to-br from-rose-500/10 via-amber-500/5 to-primary/10 border border-rose-500/20 mb-8 shadow-sm"
      >
        <div className="flex items-start gap-3.5 mb-3">
          <div className="p-2 bg-rose-500/20 text-rose-600 rounded-xl shrink-0 mt-0.5">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg text-rose-700 dark:text-rose-400">
              Benteng Fitrah: Sikap Tegas Syariat Islam Terhadap LGBT
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Menjaga ketetapan penciptaan Allah dari segala bentuk penyimpangan seksual modern.
            </p>
          </div>
        </div>

        <div className="space-y-2.5 text-xs text-foreground/90 leading-relaxed bg-card/60 p-4 rounded-2xl border">
          <p>
            <strong className="text-foreground font-bold">1. Ketetapan Dua Jenis Kelamin:</strong> Allah SWT hanya menciptakan manusia dalam dua fitrah biologis: laki-laki dan perempuan (QS. An-Najm: 45 dan QS. Al-Hujurat: 13). Segala bentuk pengaburan identitas gender bertentangan dengan ketetapan Sang Pencipta.
          </p>
          <p>
            <strong className="text-foreground font-bold">2. Laknat atas Tasyabbuh:</strong> Rasulullah ﷺ melaknat laki-laki yang menyerupai wanita dan wanita yang menyerupai laki-laki, baik dalam gaya bicara, berbusana, maupun perilaku (HR. Bukhari no. 5885).
          </p>
          <p>
            <strong className="text-foreground font-bold">3. Keharaman Perilaku LGBT:</strong> Hubungan sesama jenis (homoseksual/lesbian) adalah perbuatan keji (fahisyah) yang dilaknat dalam kisah kaum Nabi Luth AS (QS. Al-A'raf: 80-81). Orang tua berkewajiban melindungi akidah dan moral anak dari normalisasi budaya menyimpang.
          </p>
        </div>
      </motion.div>

      {/* Accordion Panduan Sesuai Jenjang Usia */}
      <div className="space-y-4">
        {GENDER_EDU_GUIDES.map((guide, idx) => {
          const isOpen = openIndex === idx;
          return (
            <motion.div
              key={idx}
              className={`border rounded-3xl overflow-hidden transition-all ${
                isOpen ? 'bg-card shadow-lg ring-1 ring-primary/20' : 'bg-card/50 hover:bg-card'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <div>
                  <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider bg-indigo-500/10 px-3 py-1 rounded-full">
                    {guide.age}
                  </span>
                  <h3 className="font-display font-bold text-xl mt-2 mb-0.5">{guide.title}</h3>
                  <p className="text-xs text-muted-foreground">{guide.focus}</p>
                </div>
                <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t bg-muted/20 px-6 py-5"
                  >
                    <ul className="space-y-3">
                      {guide.points.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-3 text-xs md:text-sm text-foreground/90 font-medium leading-relaxed">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

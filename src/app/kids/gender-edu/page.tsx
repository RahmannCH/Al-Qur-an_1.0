"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Shield, ChevronDown, CheckCircle2, Heart } from "lucide-react";

interface AgeGuide {
  age: string;
  title: string;
  focus: string;
  points: string[];
}

const GENDER_EDU_GUIDES: AgeGuide[] = [
  {
    age: "Usia 0 - 2 Tahun",
    title: "Mengenal Identitas Diri Dasar",
    focus: "Membangun fitrah dan kasih sayang murni.",
    points: [
      "Perdengarkan kata ganti yang benar sesuai jenis kelamin biologisnya.",
      "Pisahkan pakaian sesuai fitrah (tidak mendandani anak laki-laki dengan pakaian/perhiasan perempuan, dan sebaliknya).",
      "Ajarkan bagian tubuh yang boleh dan tidak boleh disentuh (Aurat dasar)."
    ]
  },
  {
    age: "Usia 3 - 6 Tahun",
    title: "Pemisahan Tempat Tidur & Privasi",
    focus: "Pemahaman batas privasi (Mahram & Non-Mahram).",
    points: [
      "Mulai pisahkan tempat tidur anak (sesuai anjuran Nabi usia 7 tahun, dilatih sejak usia ini).",
      "Ajarkan adab meminta izin (memasuki kamar orang tua di 3 waktu khusus).",
      "Beri pemahaman sederhana kenapa laki-laki dan perempuan memiliki fungsi yang berbeda namun saling melengkapi.",
      "Kenalkan adab buang air (istinja) sendiri dan menutup pintu toilet."
    ]
  },
  {
    age: "Usia 7 - 10 Tahun",
    title: "Kewajiban Ibadah & Peran Awal",
    focus: "Tanggung jawab syariat dan persiapan pra-baligh.",
    points: [
      "Anak laki-laki diajak sholat berjamaah ke masjid oleh ayah (Membangun figur maskulin).",
      "Anak perempuan mulai diajarkan menutup aurat dengan sempurna secara bertahap.",
      "Berikan tanggung jawab domestik sesuai porsinya (Anak laki-laki belajar melindungi, anak perempuan belajar merawat).",
      "Jelaskan batasan aurat sesama jenis dan lawan jenis."
    ]
  },
  {
    age: "Usia 11 - 15 Tahun (Baligh)",
    title: "Pubertas, Menstruasi & Hukum Syariat",
    focus: "Fikih baligh, bersuci, dan batasan interaksi.",
    points: [
      "Jelaskan tanda baligh (Mimpi basah bagi laki-laki, Haid bagi perempuan) sebelum terjadi.",
      "Ajarkan tata cara Mandi Wajib (Mandi Junub) yang sah sesuai sunnah.",
      "Fikih Haid untuk perempuan: apa yang haram dilakukan (sholat, puasa, thawaf) dan amalan penggantinya.",
      "Aturan interaksi (Ikhtilat & Khalwat) dengan lawan jenis yang bukan mahram.",
      "Ghulul Bashar: Ajarkan menjaga pandangan dan kehormatan di era digital (social media)."
    ]
  }
];

export default function GenderEduPage() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 pb-20">
      <BackButton />

      <div className="mb-8 text-center">
        <div className="inline-block p-4 bg-indigo-500/10 rounded-full mb-4">
          <Shield className="h-8 w-8 text-indigo-500" />
        </div>
        <h1 className="text-3xl font-display font-bold mb-3">Edukasi Fitrah & Tumbuh Kembang</h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
          Panduan bagi orang tua untuk memberikan edukasi peran gender, batasan aurat, dan persiapan pubertas sesuai tahapan usia dan Syariat Islam.
        </p>
      </div>

      <div className="space-y-4">
        {GENDER_EDU_GUIDES.map((guide, idx) => {
          const isOpen = openIndex === idx;
          return (
            <motion.div
              key={idx}
              className={`border rounded-2xl overflow-hidden transition-all ${isOpen ? 'bg-card shadow-lg ring-1 ring-primary/20' : 'bg-muted/30 hover:bg-muted/50'}`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="w-full p-5 flex items-center justify-between text-left"
              >
                <div>
                  <p className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-1">{guide.age}</p>
                  <h3 className="font-display font-bold text-lg">{guide.title}</h3>
                </div>
                <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 border-t border-muted/50 mt-2">
                      <div className="flex items-start gap-3 bg-indigo-500/10 p-4 rounded-xl mb-4">
                        <Heart className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-indigo-600 uppercase mb-1">Fokus Utama</p>
                          <p className="text-sm font-medium">{guide.focus}</p>
                        </div>
                      </div>

                      <ul className="space-y-3">
                        {guide.points.map((point, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                            <p className="text-sm leading-relaxed text-foreground/90">{point}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
      
      <div className="mt-8 p-5 bg-card border rounded-2xl text-center">
        <p className="text-xs text-muted-foreground">
          *Panduan ini dirangkum dari berbagai literatur pendidikan anak usia dini dalam Islam (Tarbiyatul Aulad fil Islam).
        </p>
      </div>
    </div>
  );
}

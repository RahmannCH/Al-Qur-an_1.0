"use client";

import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Sparkles, Heart, CheckCircle2 } from "lucide-react";

export default function StoryAyyubPage() {
  const storyBlocks = [
    {
      text: "Nabi Ayyub adalah seorang nabi yang sangat dermawan, kaya raya, memiliki banyak anak yang saleh, dan tanah pertanian yang sangat luas.",
      emoji: "🌾"
    },
    {
      text: "Meskipun memiliki harta berlimpah, Nabi Ayyub tidak pernah sombong. Beliau selalu bersujud, berdzikir, dan gemar menyantuni fakir miskin dan anak yatim.",
      emoji: "🤲"
    },
    {
      text: "Suatu ketika, Allah menguji keimanan Nabi Ayyub. Seluruh ternak dan ladangnya musnah terbakar, lalu putra-putri tercintanya meninggal dunia. Namun Nabi Ayyub tetap bersabar dan memuji Allah.",
      emoji: "🌪️"
    },
    {
      text: "Tak lama kemudian, Nabi Ayyub diuji dengan penyakit kulit yang sangat parah selama bertahun-tahun. Hampir semua orang menjauhinya, kecuali istri setianya, Rahmah, yang terus merawat beliau dengan tulus.",
      emoji: "🩹"
    },
    {
      text: "Selama belasan tahun sakit parah, lidah dan hati Nabi Ayyub tidak pernah berhenti berdzikir mengingat Allah. Beliau tidak pernah mengeluh atau menyalahkan takdir Allah sedikit pun.",
      emoji: "💎"
    },
    {
      text: "Ketika ujian semakin berat, Nabi Ayyub memanjatkan doa yang sangat santun kepada Allah: 'Ya Tuhanku, sesungguhnya aku telah ditimpa penyakit dan Engkau adalah Yang Maha Penyayang di antara semua penyayang.'",
      emoji: "✨"
    },
    {
      text: "Allah mengabulkan doa Nabi Ayyub dan memerintahkannya menghentakkan kaki ke tanah. Dari tanah itu memancarlah air sejuk yang menyembuhkan seluruh penyakitnya seketika! Allah mengembalikan kesehatan, keluarga, dan kekayaannya berlipat ganda.",
      emoji: "💧"
    }
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 pb-32">
      <BackButton />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-xl text-4xl mb-6">
          🌿
        </div>
        <h1 className="text-4xl font-display font-bold mb-3">Nabi Ayyub AS</h1>
        <p className="text-emerald-600 font-bold text-lg">Teladan Kesabaran Tanpa Batas</p>
      </motion.div>

      <div className="space-y-6">
        {storyBlocks.map((block, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="flex gap-4 p-5 rounded-3xl bg-card border hover:shadow-lg transition-all"
          >
            <div className="text-3xl shrink-0 mt-1">{block.emoji}</div>
            <p className="text-base md:text-lg leading-relaxed text-foreground/90 font-medium">
              {block.text}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 p-8 bg-gradient-to-br from-emerald-500/10 to-teal/10 rounded-3xl border border-emerald-500/20"
      >
        <h3 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-gold" />
          Doa Nabi Ayyub AS Memohon Kesembuhan
        </h3>
        <p className="font-arabic text-3xl leading-[2.5] text-primary mb-4 text-right" dir="rtl">
          أَنِّى مَسَّنِىَ ٱلضُّرُّ وَأَنتَ أَرْحَمُ ٱلرَّٰحِمِينَ
        </p>
        <p className="text-muted-foreground font-medium mb-2 italic">
          "Annii massaniyad-dhurru wa anta arhamur-raahimiin."
        </p>
        <p className="text-sm font-bold text-foreground/80">
          Artinya: "Sesungguhnya aku telah ditimpa penyakit dan Engkau adalah Tuhan Yang Maha Penyayang di antara semua penyayang." (QS. Al-Anbiya: 83)
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-8 p-6 bg-card rounded-3xl border"
      >
        <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
          <Heart className="h-5 w-5 text-rose-500" />
          Insight Anak Muslim (Hikmah)
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">Sabar adalah kunci pertolongan Allah. Ketika sedang sakit atau tertimpa cobaan, jangan mengeluh, perbanyaklah dzikir.</p>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">Allah menguji hamba yang dicintai-Nya untuk meninggikan derajatnya di surga.</p>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">Setia dan berbakti kepada keluarga saat masa-masa sulit adalah amalan yang sangat mulia.</p>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

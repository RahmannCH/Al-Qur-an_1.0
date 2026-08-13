"use client";

import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Sparkles, Heart, CheckCircle2 } from "lucide-react";

export default function StorySulaimanPage() {
  const storyBlocks = [
    {
      text: "Nabi Sulaiman adalah seorang nabi dan raja yang sangat hebat. Beliau putra dari Nabi Daud. Allah memberikan Nabi Sulaiman kerajaan yang sangat besar dan megah.",
      emoji: "👑"
    },
    {
      text: "Selain menjadi raja manusia, Allah memberinya keajaiban luar biasa. Nabi Sulaiman bisa memahami dan berbicara bahasa hewan, dari burung sampai semut!",
      emoji: "🐜"
    },
    {
      text: "Suatu hari, pasukan Nabi Sulaiman sedang berbaris. Tiba-tiba beliau mendengar seekor semut berteriak menyuruh teman-temannya masuk ke sarang agar tidak terinjak.",
      emoji: "👂"
    },
    {
      text: "Mendengar itu, Nabi Sulaiman tersenyum dan menghentikan pasukannya agar tidak menginjak para semut. Beliau sangat menyayangi hewan sekecil apapun.",
      emoji: "😊"
    },
    {
      text: "Selain bahasa hewan, Nabi Sulaiman juga bisa memerintah angin untuk menerbangkan permadaninya ke tempat jauh dengan sangat cepat.",
      emoji: "🌬️"
    },
    {
      text: "Bahkan para jin pun tunduk dan bekerja untuknya membangun gedung-gedung indah dan membuat patung-patung tembaga.",
      emoji: "🏰"
    },
    {
      text: "Meskipun sangat kaya dan berkuasa, Nabi Sulaiman tidak pernah sombong. Beliau selalu bersyukur dan rajin beribadah kepada Allah SWT.",
      emoji: "🤲"
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
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-xl text-4xl mb-6">
          👑
        </div>
        <h1 className="text-4xl font-display font-bold mb-3">Nabi Sulaiman AS</h1>
        <p className="text-emerald-600 font-bold text-lg">Raja yang Bicara dengan Semut</p>
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
        className="mt-12 p-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-3xl border border-green-500/20"
      >
        <h3 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-gold" />
          Doa Syukur Nabi Sulaiman AS
        </h3>
        <p className="font-arabic text-3xl leading-[2.5] text-primary mb-4 text-right" dir="rtl">
          رَبِّ أَوْزِعْنِىٓ أَنْ أَشْكُرَ نِعْمَتَكَ ٱلَّتِىٓ أَنْعَمْتَ عَلَىَّ وَعَلَىٰ وَٰلِدَىَّ وَأَنْ أَعْمَلَ صَٰلِحًا تَرْضَىٰهُ وَأَدْخِلْنِى بِرَحْمَتِكَ فِى عِبَادِكَ ٱلصَّٰلِحِينَ
        </p>
        <p className="text-muted-foreground font-medium mb-2 italic">
          "Rabbi awzi'nii an asykura ni'matakal latii an'amta 'alayya wa 'alaa waalidayya wa an a'mala shaalihan tardhaahu wa adkhilnii birahmatika fii 'ibaadikash shaalihiin."
        </p>
        <p className="text-sm font-bold text-foreground/80">
          Artinya: "Ya Tuhanku, berilah aku ilham untuk tetap mensyukuri nikmat-Mu yang telah Engkau anugerahkan kepadaku dan kepada dua orang ibu bapakku, dan untuk mengerjakan amal saleh yang Engkau ridai, dan masukkanlah aku dengan rahmat-Mu ke dalam golongan hamba-hamba-Mu yang saleh." (QS An-Naml: 19)
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
            <p className="text-sm font-medium leading-relaxed">Walaupun sangat kaya dan punya segalanya, kita tidak boleh sombong. Semuanya adalah titipan dari Allah.</p>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">Selalu bersyukur atas nikmat Allah! Nabi Sulaiman langsung berdoa bersyukur saat mendengar semut.</p>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">Kita harus menyayangi binatang, bahkan sekecil semut, karena mereka juga ciptaan Allah.</p>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

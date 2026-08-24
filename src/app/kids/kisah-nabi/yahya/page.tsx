"use client";

import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Sparkles, Heart, CheckCircle2 } from "lucide-react";

export default function StoryYahyaPage() {
  const storyBlocks = [
    {
      text: "Nabi Yahya adalah putra yang dianugerahkan Allah kepada Nabi Zakariya AS setelah penantian panjang penuh doa di usia senja.",
      emoji: "👶"
    },
    {
      text: "Nama 'Yahya' diberikan langsung oleh Allah SWT dari langit, sebuah nama yang belum pernah diberikan kepada siapa pun sebelumnya.",
      emoji: "✨"
    },
    {
      text: "Sejak usia kanak-kanak, Nabi Yahya dianugerahi hikmah (kebijaksanaan mendalam), kecerdasan luar biasa, dan hati yang sangat lembut penuh kasih sayang.",
      emoji: "📖"
    },
    {
      text: "Nabi Yahya sangat menyayangi semua makhluk. Beliau memberi makan hewan-hewan dan burung liar di padang pasir, dan sangat berbakti kepada kedua orang tuanya tanpa pernah bersikap sombong.",
      emoji: "🕊️"
    },
    {
      text: "Setelah diangkat menjadi nabi, Nabi Yahya berdakwah bersama Nabi Isa AS mengajak Bani Israil menegakkan hukum Taurat dan bertaubat kepada Allah.",
      emoji: "🕌"
    },
    {
      text: "Nabi Yahya adalah teladan pemuda yang sangat pemberani. Beliau tidak takut menentang kezaliman raja yang ingin menikahi mahramnya sendiri, hingga rela syahid mempertahankan hukum Allah.",
      emoji: "🛡️"
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
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-3xl bg-gradient-to-br from-teal-500 to-emerald-600 shadow-xl text-4xl mb-6">
          🌿
        </div>
        <h1 className="text-4xl font-display font-bold mb-3">Nabi Yahya AS</h1>
        <p className="text-teal-600 font-bold text-lg">Pemuda Lembut Hati yang Berani Membela Kebenaran</p>
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
        className="mt-12 p-8 bg-gradient-to-br from-teal-500/10 to-primary/10 rounded-3xl border border-teal-500/20"
      >
        <h3 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-gold" />
          Pujian Allah kepada Nabi Yahya AS
        </h3>
        <p className="font-arabic text-3xl leading-[2.5] text-primary mb-4 text-right" dir="rtl">
          وَحَنَانًا مِّن لَّدُنَّا وَزَكَوٰةً ۖ وَكَانَ تَقِيًّا
        </p>
        <p className="text-muted-foreground font-medium mb-2 italic">
          "Wa hanaanam mil ladunnaa wa zakaah, wa kaana taqiyyaa."
        </p>
        <p className="text-sm font-bold text-foreground/80">
          Artinya: "Dan Kami jadikan dia seorang yang penuh kasih sayang (kepada sesama) dari Kami dan bersih (dari dosa). Dan dia adalah seorang yang bertakwa." (QS. Maryam: 13)
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
            <p className="text-sm font-medium leading-relaxed">Kasih sayang dan kelembutan hati adalah sifat mulia yang sangat dicintai oleh Allah dan sesama manusia.</p>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">Berani berkata benar dan membela syariat Allah meskipun berhadapan dengan orang yang berkuasa.</p>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">Senantiasa berbakti dan menghormati kedua orang tua dalam setiap keadaan.</p>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

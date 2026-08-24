"use client";

import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Sparkles, Heart, CheckCircle2 } from "lucide-react";

export default function StoryZakariyaPage() {
  const storyBlocks = [
    {
      text: "Nabi Zakariya adalah seorang nabi yang sangat alim, rendah hati, dan bertugas sebagai imam dan pemelihara Baitul Maqdis.",
      emoji: "🕌"
    },
    {
      text: "Nabi Zakariya juga merupakan pengasuh dan pembimbing Maryam (ibu Nabi Isa AS) di dalam mihrab ibadah yang suci.",
      emoji: "🌟"
    },
    {
      text: "Suatu hari, Nabi Zakariya takjub melihat hidangan buah-buahan musim panas ada di dekat Maryam saat musim dingin. Maryam menjawab: 'Ini rezeki dari Allah. Sungguh Allah memberi rezeki kepada siapa yang dikehendaki-Nya tanpa batas!'",
      emoji: "🍇"
    },
    {
      text: "Melihat kuasa Allah yang tiada batas, Nabi Zakariya yang rambutnya sudah memutih dan berusia sangat lanjut berbisik dalam doa memohon keturunan yang saleh.",
      emoji: "🤲"
    },
    {
      text: "Meskipun secara medis mustahil karena usia lanjut dan istrinya mandul, Nabi Zakariya tidak pernah putus asa dari rahmat dan keajaiban Allah.",
      emoji: "💎"
    },
    {
      text: "Ketika beliau sedang sholat di mihrab, malaikat datang memberi kabar gembira: 'Allah memberimu kabar gembira dengan kelahiran seorang putra bernama Yahya, yang akan menjadi nabi yang saleh dan suci!'",
      emoji: "✨"
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
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl text-4xl mb-6">
          🤲
        </div>
        <h1 className="text-4xl font-display font-bold mb-3">Nabi Zakariya AS</h1>
        <p className="text-indigo-600 font-bold text-lg">Keajaiban Doa yang Tidak Pernah Putus Asa</p>
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
        className="mt-12 p-8 bg-gradient-to-br from-indigo-500/10 to-teal/10 rounded-3xl border border-indigo-500/20"
      >
        <h3 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-gold" />
          Doa Nabi Zakariya Memohon Keturunan Saleh
        </h3>
        <p className="font-arabic text-3xl leading-[2.5] text-primary mb-4 text-right" dir="rtl">
          رَبِّ هَبْ لِى مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً ۖ إِنَّكَ سَمِيعُ ٱلدُّعَآءِ
        </p>
        <p className="text-muted-foreground font-medium mb-2 italic">
          "Rabbi hab lii mil ladunka dzurriyyatan thayyibah, innaka samii'ud-du'aa."
        </p>
        <p className="text-sm font-bold text-foreground/80">
          Artinya: "Ya Tuhanku, berilah aku dari sisi-Mu seorang keturunan yang baik. Sesungguhnya Engkau Maha Mendengar doa." (QS. Ali 'Imran: 38)
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
            <p className="text-sm font-medium leading-relaxed">Jangan pernah putus asa dalam berdoa kepada Allah, karena tidak ada yang mustahil bagi kekuasaan-Nya.</p>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">Selalu berprasangka baik kepada Allah dan yakin bahwa doa yang tulus pasti dikabulkan di waktu terbaik.</p>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">Rajin beribadah dan sholat adalah kunci terbukanya pintu rahmat dan keajaiban hidup.</p>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

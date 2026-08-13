"use client";

import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Sparkles, Heart, CheckCircle2 } from "lucide-react";

export default function StoryIsaPage() {
  const storyBlocks = [
    {
      text: "Maryam adalah seorang wanita suci yang rajin beribadah kepada Allah. Suatu hari, Malaikat Jibril datang membawa kabar gembira bahwa Maryam akan memiliki bayi yang istimewa.",
      emoji: "🌟"
    },
    {
      text: "Orang-orang heran karena Maryam tidak bersuami. Tetapi, atas kehendak dan kuasa Allah, Maryam melahirkan bayi laki-laki yang diberi nama Isa. Allah bisa melakukan segalanya!",
      emoji: "👶"
    },
    {
      text: "Ketika orang-orang mengejek Maryam, keajaiban pun terjadi. Bayi Isa yang masih di gendongan tiba-tiba berbicara: 'Sesungguhnya aku hamba Allah, Dia memberiku Kitab Injil dan menjadikanku seorang Nabi.'",
      emoji: "🗣️"
    },
    {
      text: "Setelah dewasa, Nabi Isa berdakwah mengajak kaumnya untuk menyembah Allah. Allah memberinya banyak mukjizat yang sangat hebat.",
      emoji: "📖"
    },
    {
      text: "Dengan izin Allah, Nabi Isa bisa menyembuhkan orang buta, menyembuhkan penyakit kulit parah, bahkan bisa menghidupkan burung dari tanah liat!",
      emoji: "🕊️"
    },
    {
      text: "Sayangnya, banyak orang jahat yang tidak percaya dan ingin menyakiti Nabi Isa. Mereka bahkan merencanakan untuk menangkapnya.",
      emoji: "🛡️"
    },
    {
      text: "Tapi Allah menyelamatkan Nabi Isa dengan mengangkatnya ke langit. Yang ditangkap orang-orang jahat itu adalah orang yang diserupakan wajahnya dengan Nabi Isa. Nabi Isa selamat!",
      emoji: "☁️"
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
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-xl text-4xl mb-6">
          🕊️
        </div>
        <h1 className="text-4xl font-display font-bold mb-3">Nabi Isa AS</h1>
        <p className="text-cyan-600 font-bold text-lg">Bayi yang Bisa Berbicara</p>
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
        className="mt-8 p-6 bg-card rounded-3xl border"
      >
        <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
          <Heart className="h-5 w-5 text-rose-500" />
          Insight Anak Muslim (Hikmah)
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">Allah Maha Kuasa! Jika Allah berkata "Jadilah!", maka apapun bisa terjadi, termasuk penciptaan Nabi Isa.</p>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">Nabi Isa sangat sayang dan berbakti kepada ibunya, Maryam. Kita juga harus berbakti kepada orang tua kita.</p>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">Semua keajaiban (mukjizat) Nabi Isa, seperti menyembuhkan orang sakit, terjadi hanya dengan izin Allah SWT.</p>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Sparkles, Heart, CheckCircle2 } from "lucide-react";

export default function StoryIbrahimPage() {
  const storyBlocks = [
    {
      text: "Dahulu ada seorang anak pintar bernama Ibrahim. Kaumnya menyembah patung-patung, tapi Nabi Ibrahim tidak percaya. Beliau berpikir mencari tahu siapakah Tuhan yang sebenarnya.",
      emoji: "🌙"
    },
    {
      text: "Suatu malam, Nabi Ibrahim melihat bintang yang sangat terang. \"Inikah Tuhanku?\" Saat bintang itu tenggelam, beliau berkata, \"Aku tidak suka yang tenggelam.\" Lalu beliau melihat bulan dan matahari, keduanya juga tenggelam.",
      emoji: "⭐"
    },
    {
      text: "Akhirnya Nabi Ibrahim menemukan jawabannya: Allah lah yang menciptakan langit, bumi, bintang, bulan, dan matahari. Beliau berseru dengan yakin, \"Sungguh, aku menghadapkan diriku kepada Tuhan yang menciptakan langit dan bumi!\"",
      emoji: "☀️"
    },
    {
      text: "Nabi Ibrahim dengan berani menasihati kaumnya dan ayahnya untuk berhenti menyembah berhala. Tapi kaumnya sangat marah dan memutuskan untuk membakar Nabi Ibrahim hidup-hidup!",
      emoji: "🔥"
    },
    {
      text: "Mereka membuat api yang sangat besar sekali, sampai-sampai burung pun tidak bisa terbang melewatinya karena panas. Lalu Nabi Ibrahim diikat dan dilempar ke dalam api itu.",
      emoji: "🌋"
    },
    {
      text: "Subhanallah! Atas izin Allah, api itu menjadi dingin dan menyelamatkan Nabi Ibrahim. Api tidak bisa membakarnya! Ini adalah mukjizat yang sangat menakjubkan.",
      emoji: "✨"
    },
    {
      text: "Nabi Ibrahim selamat, dan kaumnya tercengang melihat mukjizat itu. Banyak dari mereka akhirnya percaya kepada Allah. Nabi Ibrahim dikenal sebagai bapak para nabi dan kekasih Allah (Khalilullah).",
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
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 shadow-xl text-4xl mb-6">
          🔥
        </div>
        <h1 className="text-4xl font-display font-bold mb-3">Nabi Ibrahim AS</h1>
        <p className="text-orange-600 font-bold text-lg">Pencari Tuhan Sejati</p>
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
        className="mt-12 p-8 bg-gradient-to-br from-orange-500/10 to-amber/10 rounded-3xl border border-orange-500/20"
      >
        <h3 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-gold" />
          Doa Nabi Ibrahim AS
        </h3>
        <p className="font-arabic text-3xl leading-[2.5] text-primary mb-4 text-right" dir="rtl">
          رَبِّ اجْعَلْنِى مُقِيمَ ٱلصَّلَوٰةِ وَمِن ذُرِّيَّتِى ۚ رَبَّنَا وَتَقَبَّلْ دُعَآءِ
        </p>
        <p className="text-muted-foreground font-medium mb-2 italic">
          "Rabbij'alni muqimas-salati wa min dzurriyyati, rabbana wa taqabbal du'a."
        </p>
        <p className="text-sm font-bold text-foreground/80">
          Artinya: "Ya Tuhanku, jadikanlah aku dan anak cucuku orang-orang yang tetap mendirikan salat. Ya Tuhan kami, perkenankanlah doaku." (QS Ibrahim: 40)
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
            <p className="text-sm font-medium leading-relaxed">Nabi Ibrahim suka berpikir dan bertanya untuk mencari kebenaran. Kita juga harus rajin belajar dan bertanya!</p>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">Allah selalu menolong orang yang beriman. Walau api sepanas apapun, Allah bisa menyelamatkan kita.</p>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">Berani membela kebenaran itu penting, walau harus berhadapan dengan banyak orang.</p>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Sparkles, Heart, CheckCircle2 } from "lucide-react";

export default function StoryMuhammadPage() {
  const storyBlocks = [
    {
      text: "Di kota Mekkah, lahirlah seorang bayi yang sangat mulia bernama Muhammad. Sebelum lahir, ayahnya telah meninggal, dan saat kecil beliau ditinggal ibunya, lalu diasuh kakek dan pamannya.",
      emoji: "🌙"
    },
    {
      text: "Sejak kecil, Muhammad dikenal jujur dan dapat dipercaya. Orang-orang memanggilnya Al-Amin, artinya orang yang dapat dipercaya. Beliau tidak pernah berbohong dan selalu menolong orang.",
      emoji: "💎"
    },
    {
      text: "Suatu malam di Gua Hira, saat Muhammad sedang merenung, Malaikat Jibril datang dan menyampaikan wahyu pertama dari Allah: \"Bacalah dengan menyebut nama Tuhanmu yang menciptakan!\" Itulah awal turunnya Al-Qur'an.",
      emoji: "📖"
    },
    {
      text: "Nabi Muhammad ﷺ kemudian berdakwah mengajak orang menyembah Allah. Banyak yang mengikuti, tapi banyak juga yang memusuhi. Beliau dihina, dilempar kotoran, bahkan dikejar untuk dibunuh.",
      emoji: "🕋"
    },
    {
      text: "Walau diperlakukan buruk, Nabi Muhammad ﷺ tetap sabar dan berakhlak mulia. Beliau tidak pernah membalas dendam. Justru beliau mendoakan orang-orang yang menyakitinya.",
      emoji: "🤍"
    },
    {
      text: "Nabi Muhammad ﷺ lalu hijrah ke Madinah dan membangun kota yang damai. Al-Qur'an terus turun, dan Islam semakin tersebar. Banyak orang berbondong-bondong masuk Islam karena akhlak beliau yang indah.",
      emoji: "🕌"
    },
    {
      text: "Nabi Muhammad ﷺ adalah utusan Allah yang terakhir, penutup para nabi. Allah mengutusnya sebagai rahmat (kasih sayang) bagi seluruh alam. Akhlak beliau adalah contoh terbaik untuk kita semua.",
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
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-3xl bg-gradient-to-br from-gold to-amber-600 shadow-xl text-4xl mb-6">
          ✨
        </div>
        <h1 className="text-4xl font-display font-bold mb-3">Nabi Muhammad ﷺ</h1>
        <p className="text-amber-600 font-bold text-lg">Rahmat Bagi Seluruh Alam</p>
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
        className="mt-12 p-8 bg-gradient-to-br from-gold/10 to-amber/10 rounded-3xl border border-gold/30"
      >
        <h3 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-gold" />
          Doa yang Diajarkan Nabi Muhammad ﷺ
        </h3>
        <p className="font-arabic text-3xl leading-[2.5] text-primary mb-4 text-right" dir="rtl">
          رَبِّ ٱشْرَحْ لِى صَدْرِى وَيَسِّرْ لِىٓ أَمْرِى
        </p>
        <p className="text-muted-foreground font-medium mb-2 italic">
          "Rabbishrah li sadri wa yassir li amri."
        </p>
        <p className="text-sm font-bold text-foreground/80">
          Artinya: "Ya Tuhanku, lapangkanlah dadaku dan mudahkanlah urusanku." (QS Thaha: 25-26) — doa yang dibaca Nabi Musa AS ketika berdakwah, dan kita juga dianjurkan membacanya.
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
            <p className="text-sm font-medium leading-relaxed">Jujur itu keren! Nabi Muhammad ﷺ disebut Al-Amin karena selalu jujur. Kita harus meniru beliau.</p>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">Kalau ada yang jahat kepada kita, jangan balas dendam. Maafkan dan tetap baik, seperti akhlak Nabi Muhammad ﷺ.</p>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">Al-Qur'an adalah mukjizat terbesar Nabi Muhammad ﷺ. Yuk, rajin membaca dan mencintai Al-Qur'an!</p>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

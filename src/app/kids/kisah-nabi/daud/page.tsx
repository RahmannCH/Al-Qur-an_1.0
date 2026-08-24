"use client";

import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Sparkles, Heart, CheckCircle2 } from "lucide-react";

export default function StoryDaudPage() {
  const storyBlocks = [
    {
      text: "Nabi Daud adalah seorang pemuda pemberani, shaleh, dan ahli ibadah dari kalangan Bani Israil yang diangkat Allah menjadi nabi sekaligus raja yang adil.",
      emoji: "👑"
    },
    {
      text: "Saat masih muda, Nabi Daud ikut berperang melawan raja raksasa yang sangat kejam bernama Jalut (Goliath). Hanya dengan ketapel batu kecil dan izin Allah, Nabi Daud berhasil mengalahkan Jalut!",
      emoji: "🏹"
    },
    {
      text: "Allah menganugerahkan kitab suci Zabur kepada Nabi Daud dan memberinya suara yang sangat merdu. Ketika beliau melantunkan dzikir dan pujian, burung-burung di udara dan gunung-gunung ikut bertasbih bersamanya!",
      emoji: "🕊️"
    },
    {
      text: "Allah juga memberikan mukjizat luar biasa: Nabi Daud mampu melunakkan besi yang keras hanya dengan kedua tangannya tanpa perlu dibakar api, lalu membuat baju besi perang yang sangat kokoh.",
      emoji: "🛡️"
    },
    {
      text: "Meskipun seorang raja besar yang kaya raya, Nabi Daud tidak pernah makan kecuali dari hasil jerih payah keringatnya sendiri dengan membuat baju besi.",
      emoji: "⚒️"
    },
    {
      text: "Nabi Daud adalah teladan ibadah terbaik sepanjang masa. Beliau membiasakan Puasa Daud (sehari puasa, sehari berbuka) dan sholat malam di sepertiga malam terakhir.",
      emoji: "🌙"
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
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl text-4xl mb-6">
          🛡️
        </div>
        <h1 className="text-4xl font-display font-bold mb-3">Nabi Daud AS</h1>
        <p className="text-blue-600 font-bold text-lg">Suara Merdu, Melunakkan Besi & Teladan Puasa</p>
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
        className="mt-12 p-8 bg-gradient-to-br from-blue-500/10 to-teal/10 rounded-3xl border border-blue-500/20"
      >
        <h3 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-gold" />
          Doa Nabi Daud Memohon Cinta Allah
        </h3>
        <p className="font-arabic text-3xl leading-[2.5] text-primary mb-4 text-right" dir="rtl">
          اللَّهُمَّ إِنِّى أَسْأَلُكَ حُبَّكَ وَحُبَّ مَنْ يُحِبُّكَ وَالْعَمَلَ الَّذِى يُبَلِّغُنِى حُبَّكَ
        </p>
        <p className="text-muted-foreground font-medium mb-2 italic">
          "Allahumma inni as-aluka hubbaka wa hubba man yuhibbuka wal-'amalalladzi yuballighunii hubbak."
        </p>
        <p className="text-sm font-bold text-foreground/80">
          Artinya: "Ya Allah, sesungguhnya aku memohon cinta-Mu, dan cinta orang-orang yang mencintai-Mu, serta amal perbuatan yang dapat menyampaikan aku kepada cinta-Mu." (HR. Tirmidzi no. 3490)
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
            <p className="text-sm font-medium leading-relaxed">Jangan takut menghadapi musuh yang besar jika kita berada di jalan kebenaran bersama Allah.</p>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">Makan dari hasil jerih payah sendiri adalah makanan yang paling berkah dan mulia.</p>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">Istiqamah dalam ibadah (seperti puasa sunnah dan sholat malam) mendekatkan kita kepada cinta Allah.</p>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

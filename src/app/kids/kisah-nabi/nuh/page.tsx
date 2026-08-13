"use client";

import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Sparkles, Heart, CheckCircle2 } from "lucide-react";

export default function StoryNuhPage() {
  const storyBlocks = [
    {
      text: "Zaman dahulu, ada seorang nabi yang sangat sabar bernama Nabi Nuh. Beliau diutus Allah untuk mengajak kaumnya menyembah Allah saja, tidak menyembah berhala.",
      emoji: "🕌"
    },
    {
      text: "Nabi Nuh berdakwah dengan sabar selama ratusan tahun! Beliau mengajak siang dan malam, tapi kaumnya justru menutup telinga dan mengejek-ejeknya.",
      emoji: "😔"
    },
    {
      text: "Suatu hari, Allah memerintahkan Nabi Nuh untuk membuat kapal yang sangat besar. Nabi Nuh mengumpulkan kayu dan bekerja keras. Kaumnya menertawakan: \"Mau buat kapal di daratan? Hahaha!\"",
      emoji: "🪚"
    },
    {
      text: "Nabi Nuh tidak marah. Beliau tetap melanjutkan membuat kapal dengan penuh kesabaran. Kapal itu menjadi sangat besar dan kokoh.",
      emoji: "🚢"
    },
    {
      text: "Saat kapal selesai, Allah memerintahkan Nabi Nuh mengajak orang-orang yang beriman dan sepasang hewan ke dalam kapal. Air bah pun datang dari langit dan bumi!",
      emoji: "🌊"
    },
    {
      text: "Air naik tinggi sekali, menutupi semua gunung. Hanya kapal Nabi Nuh yang selamat melaju di atas air yang luas. Kaum yang sombong dan tidak mau beriman tenggelam.",
      emoji: "⛰️"
    },
    {
      text: "Setelah air surut, kapal berhenti di bukit Judi. Nabi Nuh dan semua yang beriman turun dengan selamat. Mereka bersyukur kepada Allah dengan sujud syukur.",
      emoji: "🌈"
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
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-xl text-4xl mb-6">
          🚢
        </div>
        <h1 className="text-4xl font-display font-bold mb-3">Nabi Nuh AS</h1>
        <p className="text-blue-600 font-bold text-lg">Pembuat Kapal Raksasa</p>
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
        className="mt-12 p-8 bg-gradient-to-br from-blue-500/10 to-cyan/10 rounded-3xl border border-blue-500/20"
      >
        <h3 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-gold" />
          Doa Nabi Nuh AS
        </h3>
        <p className="font-arabic text-3xl leading-[2.5] text-primary mb-4 text-right" dir="rtl">
          رَبِّ إِنِّىٓ أَعُوذُ بِكَ أَنْ أَسْـَٔلَكَ مَا لَيْسَ لِى بِهِۦ عِلْمٌ ۖ وَإِلَّا تَغْفِرْ لِى وَتَرْحَمْنِىٓ أَكُن مِّنَ ٱلْخَٰسِرِينَ
        </p>
        <p className="text-muted-foreground font-medium mb-2 italic">
          "Rabbi inni a'udzu bika an as-alaka ma laysa li bihi 'ilm, wa illa taghfir li wa tarhamni akum minal-khasirin."
        </p>
        <p className="text-sm font-bold text-foreground/80">
          Artinya: "Ya Tuhanku, aku berlindung kepada-Mu untuk memohon sesuatu yang aku tidak mengetahui (hakikatnya). Kalau Engkau tidak mengampuni aku dan tidak menaruh belas kasihan kepadaku, niscaya aku termasuk orang-orang yang merugi." (QS Hud: 47)
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
            <p className="text-sm font-medium leading-relaxed">Nabi Nuh sangat sabar, berdakwah ratusan tahun tanpa menyerah. Kita harus sabar dalam belajar dan berbuat baik.</p>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">Jangan mengejek orang lain yang berbuat baik. Kaum yang mengejek Nabi Nuh akhirnya menyesal.</p>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">Kalau ada teman yang berbuat salah, kita tetap harus menasihati dengan sabar dan penuh kasih sayang.</p>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

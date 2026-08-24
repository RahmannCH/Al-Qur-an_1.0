"use client";

import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Sparkles, Heart, CheckCircle2 } from "lucide-react";

export default function StoryLuthPage() {
  const storyBlocks = [
    {
      text: "Nabi Luth AS adalah keponakan Nabi Ibrahim AS yang diutus Allah untuk berdakwah kepada penduduk kota Sodom yang sangat rusak moral dan perilakunya.",
      emoji: "🕌"
    },
    {
      text: "Penduduk kota Sodom melakukan perbuatan fakhisyah (penyimpangan keji) yang tidak pernah dilakukan oleh seorang pun di alam semesta sebelumnya: menyukai sesama jenis (homoseksual & lesbian).",
      emoji: "🚫"
    },
    {
      text: "Nabi Luth dengan sangat gigih dan tegas menasihati kaumnya untuk bertaubat, kembali kepada fitrah suci, dan menikah secara sah antara laki-laki dan perempuan.",
      emoji: "🗣️"
    },
    {
      text: "Namun kaum Sodom yang sombong menolak nasihat dan malah mengancam akan mengusir Nabi Luth dan orang-orang yang beriman dari kota tersebut.",
      emoji: "😠"
    },
    {
      text: "Ketika maksiat kaum Sodom sudah melampaui batas, Allah mengutus malaikat penolong yang membawa kabar bahwa adzab Allah akan tiba di waktu Subuh.",
      emoji: "⚡"
    },
    {
      text: "Malaikat memerintahkan Nabi Luth dan pengikutnya yang beriman untuk keluar dari kota di malam hari dan dilarang menoleh ke belakang.",
      emoji: "🚶"
    },
    {
      text: "Di waktu Subuh, Allah menimpa kota Sodom dengan adzab dahsyat: membalikkan negerinya dan menghujani mereka dengan batu-batu dari tanah yang terbakar. Nabi Luth dan orang-orang beriman diselamatkan Allah.",
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
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-3xl bg-gradient-to-br from-rose-500 to-red-600 shadow-xl text-4xl mb-6">
          🛡️
        </div>
        <h1 className="text-4xl font-display font-bold mb-3">Nabi Luth AS</h1>
        <p className="text-rose-600 font-bold text-lg">Ketegasan Melindungi Fitrah Suci</p>
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
        className="mt-12 p-8 bg-gradient-to-br from-rose-500/10 to-amber-500/10 rounded-3xl border border-rose-500/20"
      >
        <h3 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-gold" />
          Doa Nabi Luth Memohon Pertolongan dari Perbuatan Keji
        </h3>
        <p className="font-arabic text-3xl leading-[2.5] text-primary mb-4 text-right" dir="rtl">
          رَبِّ ٱنصُرْنِى عَلَى ٱلْقَوْمِ ٱلْمُفْسِدِينَ
        </p>
        <p className="text-muted-foreground font-medium mb-2 italic">
          "Rabbin-shurnii 'alal-qawmil-mufsidiin."
        </p>
        <p className="text-sm font-bold text-foreground/80">
          Artinya: "Ya Tuhanku, tolonglah aku dari kaum yang berbuat kerusakan (kemaksiatan) ini." (QS. Al-Ankabut: 30)
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
            <p className="text-sm font-medium leading-relaxed">Jagalah fitrah suci penciptaan Allah: laki-laki dan perempuan diciptakan berpasangan secara sah dalam pernikahan.</p>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">Berani menolak tren atau budaya buruk yang merusak moral meskipun banyak orang yang melakukannya.</p>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">Allah selalu melindungi hamba-hamba-Nya yang beriman dan menjaga kesucian dari azab dan kehancuran.</p>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

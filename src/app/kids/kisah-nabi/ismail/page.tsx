"use client";

import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Sparkles, Heart, CheckCircle2 } from "lucide-react";

export default function StoryIsmailPage() {
  const storyBlocks = [
    {
      text: "Nabi Ismail adalah putra pertama Nabi Ibrahim AS dan Siti Hajar yang lahir setelah bertahun-tahun dinantikan dengan penuh doa.",
      emoji: "👶"
    },
    {
      text: "Saat masih bayi, Nabi Ismail dan ibunya ditinggalkan di lembah Mekkah yang tandus atas perintah Allah. Ketika kehabisan air, Siti Hajar berlari bolak-balik antara bukit Shafa dan Marwah.",
      emoji: "🏜️"
    },
    {
      text: "Tiba-tiba, dari hentakan kaki kecil bayi Ismail, memancarlah mata air yang sangat deras dan jernih. Itulah Air Zamzam yang penuh berkah dan tidak pernah kering hingga hari ini!",
      emoji: "💧"
    },
    {
      text: "Saat Ismail beranjak remaja, Nabi Ibrahim bermimpi diperintahkan Allah untuk menyembelihnya. Dengan penuh keikhlasan dan ketaatan luar biasa, Nabi Ismail berkata: 'Wahai ayahku, kerjakanlah apa yang diperintahkan kepadamu; insya Allah engkau akan mendapatiku termasuk orang yang sabar.'",
      emoji: "💎"
    },
    {
      text: "Ketika keduanya pasrah dan ikhlas menjalankan perintah Allah, Allah menggantikan Ismail dengan seekor domba jantan yang besar dari surga. Peristiwa agung ini menjadi asal mula syariat kurban Hari Raya Idul Adha.",
      emoji: "🐑"
    },
    {
      text: "Setelah dewasa, Nabi Ismail bersama ayahnya Nabi Ibrahim diperintahkan Allah untuk meninggikan pondasi Ka'bah (Baitullah) di Mekkah sebagai kiblat umat Islam sedunia.",
      emoji: "🕋"
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
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-xl text-4xl mb-6">
          🕋
        </div>
        <h1 className="text-4xl font-display font-bold mb-3">Nabi Ismail AS</h1>
        <p className="text-amber-600 font-bold text-lg">Teladan Ketaatan & Sejarah Air Zamzam</p>
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
        className="mt-12 p-8 bg-gradient-to-br from-amber-500/10 to-teal/10 rounded-3xl border border-amber-500/20"
      >
        <h3 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-gold" />
          Doa Nabi Ibrahim & Ismail saat Membangun Ka'bah
        </h3>
        <p className="font-arabic text-3xl leading-[2.5] text-primary mb-4 text-right" dir="rtl">
          رَبَّنَا تَقَبَّلْ مِنَّآ ۖ إِنَّكَ أَنتَ ٱلسَّمِيعُ ٱلْعَلِيمُ
        </p>
        <p className="text-muted-foreground font-medium mb-2 italic">
          "Rabbanaa taqabbal minnaa, innaka antas-samii'ul 'aliim."
        </p>
        <p className="text-sm font-bold text-foreground/80">
          Artinya: "Ya Tuhan kami, terimalah amal dari kami; sesungguhnya Engkaulah Yang Maha Mendengar lagi Maha Mengetahui." (QS. Al-Baqarah: 127)
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
            <p className="text-sm font-medium leading-relaxed">Berbakti dan patuh kepada perintah orang tua adalah jalan menuju ridha Allah SWT.</p>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">Ikhlas dalam berkorban karena Allah pasti akan digantikan dengan balasan yang jauh lebih baik dan mulia.</p>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">Pertolongan Allah akan datang di saat yang paling tidak terduga bagi orang yang bertawakal.</p>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

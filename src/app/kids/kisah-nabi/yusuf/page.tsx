"use client";

import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Sparkles, Heart, CheckCircle2 } from "lucide-react";

export default function StoryYusufPage() {
  const storyBlocks = [
    {
      text: "Nabi Yusuf adalah putra Nabi Ya'qub yang sangat tampan, cerdas, dan santun budi pekertinya. Beliau sangat disayangi oleh ayahnya.",
      emoji: "🌟"
    },
    {
      text: "Suatu malam, Yusuf kecil bermimpi melihat 11 bintang, matahari, dan bulan bersujud kepadanya. Ayahnya berpesan agar tidak menceritakan mimpi itu kepada saudara-saudaranya agar tidak timbul rasa iri.",
      emoji: "🌙"
    },
    {
      text: "Saudara-saudaranya merasa cemburu, lalu bersepakat membuang Yusuf ke dalam sumur tua yang dalam di tengah padang pasir. Tapi Allah senantiasa melindungi Yusuf!",
      emoji: "🕳️"
    },
    {
      text: "Yusuf ditemukan oleh rombongan kafilah dagang dan dibawa ke negeri Mesir. Di sana, beliau diasuh oleh menteri kerajaan Mesir (Al-Aziz) hingga tumbuh dewasa.",
      emoji: "🏛️"
    },
    {
      text: "Nabi Yusuf diuji dengan godaan fitnah dan fitnah penjara selama bertahun-tahun. Namun beliau tetap teguh menjaga kesucian diri dan bertawakal kepada Allah.",
      emoji: "🛡️"
    },
    {
      text: "Atas izin Allah, Nabi Yusuf diberi mukjizat pandai menakwilkan (mengartikan) mimpi. Beliau berhasil menafsirkan mimpi Raja Mesir tentang 7 tahun masa subur dan 7 tahun paceklik.",
      emoji: "🌾"
    },
    {
      text: "Raja Mesir sangat kagum dan mengangkat Nabi Yusuf menjadi bendahara agung negara. Saat saudara-saudaranya datang meminta gandum karena kelaparan, Nabi Yusuf tidak membalas dendam, melainkan memaafkan mereka dengan penuh kasih sayang.",
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
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-3xl bg-gradient-to-br from-amber-400 to-yellow-600 shadow-xl text-4xl mb-6">
          👑
        </div>
        <h1 className="text-4xl font-display font-bold mb-3">Nabi Yusuf AS</h1>
        <p className="text-amber-600 font-bold text-lg">Pemaaf yang Mulia & Berakhlak Indah</p>
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
          Doa Nabi Yusuf AS Memohon Husnul Khatimah
        </h3>
        <p className="font-arabic text-3xl leading-[2.5] text-primary mb-4 text-right" dir="rtl">
          تَوَفَّنِى مُسْلِمًا وَأَلْحِقْنِى بِٱلصَّٰلِحِينَ
        </p>
        <p className="text-muted-foreground font-medium mb-2 italic">
          "Tawaffanii musliman wa alhiqnii bish-shaalihiin."
        </p>
        <p className="text-sm font-bold text-foreground/80">
          Artinya: "Wafatkanlah aku dalam keadaan Islam dan gabungkanlah aku dengan orang-orang yang saleh." (QS. Yusuf: 101)
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
            <p className="text-sm font-medium leading-relaxed">Jangan pernah merasa iri atau cemburu kepada saudara sendiri. Setiap orang memiliki rezeki dari Allah.</p>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">Menjaga kehormatan dan kejujuran akan membawa kemuliaan hidup di dunia dan akhirat.</p>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">Memaafkan orang yang berbuat jahat kepada kita adalah sifat ksatria paling mulia yang dicintai Allah.</p>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

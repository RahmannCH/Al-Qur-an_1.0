"use client";

import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Sparkles, Heart, CheckCircle2 } from "lucide-react";

export default function StoryMusaPage() {
  const storyBlocks = [
    {
      text: "Di negeri Mesir, ada seorang raja yang sangat kejam bernama Firaun. Firaun memerintahkan tentaranya untuk menyingkirkan setiap bayi laki-laki yang baru lahir.",
      emoji: "👑"
    },
    {
      text: "Ibu Nabi Musa sangat takut, tapi Allah memberinya ilham: 'Letakkan bayimu dalam peti, lalu hanyutkan ke sungai Nil. Jangan takut!' Ibunya pun percaya pada Allah.",
      emoji: "🧺"
    },
    {
      text: "Ajaibnya, peti itu hanyut dan ditemukan oleh istri Firaun, Asiyah. Ia sangat menyayangi bayi itu dan membawanya ke istana. Begitulah Allah melindungi Musa, tumbuh besar di istana musuhnya sendiri!",
      emoji: "🏛️"
    },
    {
      text: "Setelah dewasa, Musa diangkat menjadi nabi. Allah memberinya mukjizat tongkat kayu yang bisa berubah menjadi ular besar dan tangan yang bisa bercahaya.",
      emoji: "🐍"
    },
    {
      text: "Nabi Musa berdakwah kepada Firaun agar menyembah Allah, tapi Firaun sombong dan menolak. Firaun malah mengejar Nabi Musa dan pengikutnya sampai ke Laut Merah.",
      emoji: "🏃"
    },
    {
      text: "Di depan ada laut, di belakang ada tentara Firaun! Tapi Nabi Musa tidak takut. Atas perintah Allah, beliau memukulkan tongkatnya ke laut, dan laut pun terbelah menjadi jalan kering!",
      emoji: "🌊"
    },
    {
      text: "Nabi Musa dan pengikutnya selamat menyeberang. Saat tentara Firaun ikut masuk ke jalan itu, laut kembali menyatu dan menenggelamkan mereka. Allah selalu menolong orang beriman.",
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
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-3xl bg-gradient-to-br from-yellow-500 to-amber-600 shadow-xl text-4xl mb-6">
          🌊
        </div>
        <h1 className="text-4xl font-display font-bold mb-3">Nabi Musa AS</h1>
        <p className="text-amber-600 font-bold text-lg">Tongkat Pembelah Lautan</p>
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
        className="mt-12 p-8 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-3xl border border-amber-500/20"
      >
        <h3 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-gold" />
          Doa Nabi Musa AS
        </h3>
        <p className="font-arabic text-3xl leading-[2.5] text-primary mb-4 text-right" dir="rtl">
          رَبِّ ٱشْرَحْ لِى صَدْرِى وَيَسِّرْ لِىٓ أَمْرِى وَٱحْلُلْ عُقْدَةً مِّن لِّسَانِى يَفْقَهُوا۟ قَوْلِى
        </p>
        <p className="text-muted-foreground font-medium mb-2 italic">
          "Rabbisyrah li shadri wa yassir li amri wahlul 'uqdatam mil lisani yafqahu qauli."
        </p>
        <p className="text-sm font-bold text-foreground/80">
          Artinya: "Ya Tuhanku, lapangkanlah dadaku, mudahkanlah urusanku, dan lepaskanlah kekakuan dari lidahku, supaya mereka mengerti perkataanku." (QS Thaha: 25-28)
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
            <p className="text-sm font-medium leading-relaxed">Berani membela kebenaran! Walaupun musuh sangat kuat seperti Firaun, Allah lebih kuat.</p>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">Jangan pernah putus asa. Saat terdesak di laut, Nabi Musa tetap yakin pertolongan Allah akan datang.</p>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">Doa adalah senjata. Saat kesulitan, berdoalah kepada Allah memohon kemudahan.</p>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

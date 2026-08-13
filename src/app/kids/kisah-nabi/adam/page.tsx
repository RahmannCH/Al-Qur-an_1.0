"use client";

import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Sparkles, Heart, CheckCircle2 } from "lucide-react";

export default function StoryAdamPage() {
  const storyBlocks = [
    {
      text: "Zaman dahulu sekali, Allah menciptakan langit dan bumi, lalu Allah berfirman kepada para malaikat bahwa Dia akan menciptakan manusia pertama. Manusia itu bernama Adam.",
      emoji: "🌍"
    },
    {
      text: "Allah membentuk Nabi Adam dari tanah liat yang lembut, lalu meniupkan ruh ke dalamnya. Alhamdulillah, jadilah Nabi Adam manusia pertama yang sangat mulia. Para malaikat diperintahkan Allah untuk menghormatinya.",
      emoji: "🤲"
    },
    {
      text: "Allah mengajarkan Nabi Adam nama-nama semua benda. Nabi Adam bisa menyebutkan semuanya dengan benar! Allah pun sangat bangga dan memerintahkan para malaikat untuk sujud menghormatinya.",
      emoji: "✨"
    },
    {
      text: "Di surga, Nabi Adam tinggal bersama istrinya, Siti Hawa. Mereka hidup senang, makan buah-buahan yang enak. Hanya satu saja yang dilarang Allah, yaitu mendekati pohon tertentu.",
      emoji: "🌳"
    },
    {
      text: "Tapi ada musuh Allah, yaitu Iblis, yang iri kepada Nabi Adam. Iblis membujuk-bujuk Nabi Adam dan Siti Hawa agar mendekati pohon itu. Mereka akhirnya tergoda dan melanggar larangan Allah.",
      emoji: "🍎"
    },
    {
      text: "Nabi Adam dan Siti Hawa menyesal sekali. Mereka berdoa meminta maaf kepada Allah. Subhanallah, Allah Maha Pengampun! Allah memaafkan mereka dan mengajarkan kata-kata taubat yang indah.",
      emoji: "💧"
    },
    {
      text: "Nabi Adam dan Siti Hawa lalu diturunkan ke bumi untuk menjadi khalifah, pemimpin yang baik. Sejak itulah manusia hidup di bumi dan menyebar ke seluruh penjuru dunia.",
      emoji: "🏞️"
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
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-xl text-4xl mb-6">
          🌍
        </div>
        <h1 className="text-4xl font-display font-bold mb-3">Nabi Adam AS</h1>
        <p className="text-emerald-600 font-bold text-lg">Manusia Pertama di Bumi</p>
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
        className="mt-12 p-8 bg-gradient-to-br from-emerald-500/10 to-teal/10 rounded-3xl border border-emerald-500/20"
      >
        <h3 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-gold" />
          Doa Taubat Nabi Adam AS
        </h3>
        <p className="font-arabic text-3xl leading-[2.5] text-primary mb-4 text-right" dir="rtl">
          رَبَّنَا ظَلَمْنَآ أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ ٱلْخَٰسِرِينَ
        </p>
        <p className="text-muted-foreground font-medium mb-2 italic">
          "Rabbana zalamna anfusana wa il lam taghfir lana wa tarhamna la nakunanna minal-khasirin."
        </p>
        <p className="text-sm font-bold text-foreground/80">
          Artinya: "Ya Tuhan kami, kami telah menzalimi diri kami sendiri. Jika Engkau tidak mengampuni kami dan menyayangi kami, pasti kami termasuk orang-orang yang merugi." (QS Al-A'raf: 23)
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
            <p className="text-sm font-medium leading-relaxed">Manusia diciptakan Allah dengan sangat istimewa dan mulia. Kita harus bersyukur menjadi manusia!</p>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">Kalau kita berbuat salah, jangan lari. Segera minta maaf kepada Allah dan orang tua, seperti Nabi Adam.</p>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">Kita harus selalu patuh pada perintah Allah, jangan mudah dibujuk untuk berbuat salah.</p>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

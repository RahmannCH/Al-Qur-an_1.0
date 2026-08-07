"use client";

import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Sparkles, Heart, CheckCircle2 } from "lucide-react";
import { sfx } from "@/lib/sfx";

export default function StoryYunusPage() {
  const storyBlocks = [
    {
      text: "Zaman dahulu kala, ada seorang utusan Allah yang sangat baik bernama Nabi Yunus. Beliau diutus untuk berdakwah kepada penduduk kota Ninawa yang sangat keras kepala.",
      emoji: "🕌"
    },
    {
      text: "Nabi Yunus sudah mengajak mereka untuk berbuat baik selama bertahun-tahun, tapi mereka malah mengejek dan tidak mau mendengar. Wah, tentu saja Nabi Yunus merasa sangat lelah dan sedikit marah.",
      emoji: "😔"
    },
    {
      text: "Akhirnya, Nabi Yunus memutuskan untuk pergi meninggalkan kota itu dengan menaiki sebuah kapal layar yang besar. Beliau pergi tanpa menunggu izin dari Allah terlebih dahulu.",
      emoji: "⛵"
    },
    {
      text: "Di tengah laut, tiba-tiba badai dahsyat datang! Ombak bergulung-gulung tinggi sekali. Kapal itu sangat berat dan hampir tenggelam. Penumpang kapal sepakat harus ada satu orang yang melompat ke laut agar kapal tidak tenggelam.",
      emoji: "🌊"
    },
    {
      text: "Mereka mengundi nama, dan ajaibnya, nama Nabi Yunus yang keluar tiga kali berturut-turut! Nabi Yunus tahu ini adalah teguran dari Allah. Beliau pun melompat ke lautan yang berombak gelap.",
      emoji: "⚡"
    },
    {
      text: "Tiba-tiba... HAP! Seekor ikan paus yang sangat besaaaaar menelan Nabi Yunus. Tapi atas izin Allah, ikan paus itu tidak menggigitnya. Nabi Yunus selamat dan berada di dalam perut paus yang sangat gelap.",
      emoji: "🐋"
    },
    {
      text: "Di dalam kegelapan perut paus, kegelapan malam, dan kegelapan lautan, Nabi Yunus menyadari kesalahannya. Beliau menangis dan terus berdoa meminta ampun kepada Allah.",
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
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-blue-600 shadow-xl text-4xl mb-6">
          🐋
        </div>
        <h1 className="text-4xl font-display font-bold mb-3">Nabi Yunus AS</h1>
        <p className="text-indigo-600 font-bold text-lg">Berdzikir di Perut Paus</p>
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
        className="mt-12 p-8 bg-gradient-to-br from-primary/10 to-teal/10 rounded-3xl border border-primary/20"
      >
        <h3 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-gold" />
          Doa Nabi Yunus di Perut Paus
        </h3>
        <p className="font-arabic text-3xl leading-[2.5] text-primary mb-4 text-right" dir="rtl">
          لَّآ إِلَٰهَ إِلَّآ أَنتَ سُبْحَٰنَكَ إِنِّى كُنتُ مِنَ ٱلظَّٰلِمِينَ
        </p>
        <p className="text-muted-foreground font-medium mb-2 italic">
          "Laa ilaha illa anta, subhanaka, inni kuntu minadz-dzalimin."
        </p>
        <p className="text-sm font-bold text-foreground/80">
          Artinya: "Tidak ada Tuhan selain Engkau. Maha Suci Engkau, sesungguhnya aku adalah termasuk orang-orang yang zalim."
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
            <p className="text-sm font-medium leading-relaxed">Paus itu besar dan menakutkan, tapi dengan perlindungan Allah, kita tidak perlu takut pada apapun.</p>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">Kalau kita berbuat salah, segeralah meminta maaf (bertaubat) kepada Allah seperti Nabi Yunus.</p>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">Berdoa adalah kekuatan terbesar kita, di manapun kita berada.</p>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

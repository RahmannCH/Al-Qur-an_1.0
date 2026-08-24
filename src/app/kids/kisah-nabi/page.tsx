"use client";

import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { BookOpen, Sparkles, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { sfx } from "@/lib/sfx";

const KISAH_NABI = [
  {
    id: "adam",
    name: "Nabi Adam AS",
    title: "Manusia Pertama di Bumi",
    desc: "Kisah penciptaan manusia pertama dan pelajaran berharga tentang taubat.",
    color: "from-emerald-500 to-green-600",
    icon: "🌍"
  },
  {
    id: "nuh",
    name: "Nabi Nuh AS",
    title: "Pembuat Kapal Raksasa",
    desc: "Kisah kesabaran berdakwah ratusan tahun dan keajaiban kapal besar di atas banjir bandang.",
    color: "from-blue-500 to-cyan-600",
    icon: "🚢"
  },
  {
    id: "ibrahim",
    name: "Nabi Ibrahim AS",
    title: "Pencari Tuhan Sejati & Kekasih Allah",
    desc: "Kisah kecerdasan mencari Tuhan dan mukjizat tidak mempan dibakar api raja Namrud.",
    color: "from-orange-500 to-red-600",
    icon: "🔥"
  },
  {
    id: "ismail",
    name: "Nabi Ismail AS",
    title: "Teladan Ketaatan & Sejarah Zamzam",
    desc: "Kisah keikhlasan berkorban, mata air Zamzam di padang pasir, dan membangun Ka'bah.",
    color: "from-amber-500 to-orange-600",
    icon: "🕋"
  },
  {
    id: "luth",
    name: "Nabi Luth AS",
    title: "Penjaga Fitrah & Penentang Kemaksiatan",
    desc: "Kisah ketegasan mendakwahi kaum Sodom untuk menjaga fitrah pernikahan suci.",
    color: "from-rose-500 to-red-600",
    icon: "🛡️"
  },
  {
    id: "yusuf",
    name: "Nabi Yusuf AS",
    title: "Pemaaf yang Berakhlak Mulia",
    desc: "Kisah mimpi bintang, sumur tua, hingga menjadi bendahara agung Mesir yang pemaaf.",
    color: "from-amber-400 to-yellow-600",
    icon: "🌟"
  },
  {
    id: "ayyub",
    name: "Nabi Ayyub AS",
    title: "Teladan Kesabaran Tanpa Batas",
    desc: "Kisah kesabaran menghadapi ujian penyakit dan kehilangan tanpa pernah mengeluh.",
    color: "from-emerald-500 to-teal-600",
    icon: "🌿"
  },
  {
    id: "musa",
    name: "Nabi Musa AS",
    title: "Tongkat Pembelah Lautan",
    desc: "Kisah keberanian melawan kezaliman Firaun dan mukjizat membelah Laut Merah.",
    color: "from-yellow-500 to-amber-600",
    icon: "🌊"
  },
  {
    id: "daud",
    name: "Nabi Daud AS",
    title: "Suara Merdu & Melunakkan Besi",
    desc: "Kisah mengalahkan Jalut, tasbih gunung-gunung, dan teladan puasa Daud.",
    color: "from-blue-500 to-indigo-600",
    icon: "🛡️"
  },
  {
    id: "sulaiman",
    name: "Nabi Sulaiman AS",
    title: "Raja yang Bicara dengan Semut",
    desc: "Kisah raja agung yang memahami bahasa hewan, angin, dan memimpin pasukan jin.",
    color: "from-green-500 to-emerald-600",
    icon: "👑"
  },
  {
    id: "yunus",
    name: "Nabi Yunus AS",
    title: "Berdzikir di Perut Ikan Paus",
    desc: "Kisah menakjubkan bertahan hidup dan berdzikir di kegelapan perut ikan paus.",
    color: "from-indigo-500 to-blue-600",
    icon: "🐋"
  },
  {
    id: "zakariya",
    name: "Nabi Zakariya AS",
    title: "Doa Mustajab di Usia Senja",
    desc: "Kisah keteguhan berdoa memohon keturunan saleh tanpa pernah berputus asa.",
    color: "from-purple-500 to-indigo-600",
    icon: "🤲"
  },
  {
    id: "yahya",
    name: "Nabi Yahya AS",
    title: "Pemuda Lembut & Pembela Kebenaran",
    desc: "Kisah nabi yang penuh kasih sayang kepada semua makhluk dan berani membela hukum Allah.",
    color: "from-teal-500 to-emerald-600",
    icon: "🌿"
  },
  {
    id: "isa",
    name: "Nabi Isa AS",
    title: "Mukjizat & Kasih Sayang",
    desc: "Kisah kelahiran tanpa ayah dan mukjizat menyembuhkan orang sakit atas izin Allah.",
    color: "from-cyan-500 to-blue-500",
    icon: "🕊️"
  },
  {
    id: "muhammad",
    name: "Nabi Muhammad ﷺ",
    title: "Rahmat Bagi Seluruh Alam Semesta",
    desc: "Kisah perjuangan, akhlak mulia Al-Amin, dan turunnya mukjizat agung Al-Qur'an.",
    color: "from-gold to-amber-600",
    icon: "✨"
  }
];

export default function KisahNabiPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 pb-32">
      <BackButton />

      <div className="mb-10 text-center">
        <div className="inline-block p-4 bg-amber-500/10 rounded-full mb-4">
          <BookOpen className="h-8 w-8 text-amber-500" />
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">Kisah 15 Nabi & Rasul</h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
          Eksplorasi kisah teladan para pahlawan Islam lengkap dengan doa maknawi dan hikmah moral anak Muslim.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {KISAH_NABI.map((kisah, idx) => (
          <Link key={kisah.id} href={`/kids/kisah-nabi/${kisah.id}`} onClick={() => sfx.playWoosh()}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group relative overflow-hidden rounded-3xl border bg-card p-6 hover:shadow-xl hover:-translate-y-1 transition-all h-full flex flex-col justify-between"
            >
              <div className={`absolute top-0 right-0 p-8 rounded-bl-[100px] bg-gradient-to-br ${kisah.color} opacity-10 transition-opacity group-hover:opacity-20`} />
              
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className={`flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br ${kisah.color} shadow-lg text-2xl shrink-0`}>
                    {kisah.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-xl">{kisah.name}</h3>
                    <p className="text-xs font-bold text-amber-500 line-clamp-1">{kisah.title}</p>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mb-6 line-clamp-2 leading-relaxed">{kisah.desc}</p>
              </div>
              
              <div className="flex items-center text-xs font-bold text-primary group-hover:gap-2.5 transition-all gap-1.5 pt-3 border-t">
                <span>Baca Kisah Lengkap</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Coffee, Compass, Calculator, Sparkles, MessageSquareHeart, Coins, PlaneTakeoff, Shield, ChevronRight } from "lucide-react";
import Link from "next/link";
import { sfx } from "@/lib/sfx";

const LIFESTYLE_FEATURES = [
  { href: "/ruhiyah", label: "P3K Jiwa", icon: Coffee, desc: "Spiritual First Aid & Ketenangan", color: "text-amber-500", bg: "bg-amber-500/10" },
  { href: "/chat", label: "AI Chat Islami", icon: MessageSquareHeart, desc: "Tanya jawab seputar Islam", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { href: "/calculator/zakat", label: "Kalkulator Zakat", icon: Coins, desc: "Hitung Zakat Fitrah & Maal", color: "text-blue-500", bg: "bg-blue-500/10" },
  { href: "/calculator/haji-umroh", label: "Tabungan Haji & Umroh", icon: PlaneTakeoff, desc: "Rencana biaya ke Baitullah", color: "text-orange-500", bg: "bg-orange-500/10" },
  { href: "/calculator/waris", label: "Waris Faraid", icon: Calculator, desc: "Pembagian harta waris syariat", color: "text-purple-500", bg: "bg-purple-500/10" },
  { href: "/prayer-times", label: "Arah Kiblat & Jadwal", icon: Compass, desc: "Waktu sholat & kompas", color: "text-rose-500", bg: "bg-rose-500/10" },
];

export default function LifestyleHub() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 min-h-[80vh]">
      <BackButton />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <h1 className="text-4xl font-display font-bold mb-3">Kajian & Jiwa</h1>
        <p className="text-muted-foreground text-lg">Solusi masalah keseharian, mental, dan syariat.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {LIFESTYLE_FEATURES.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <Link key={feat.href} href={feat.href} onClick={() => sfx.playWoosh()}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group p-6 rounded-2xl border bg-card hover:bg-accent hover:shadow-lg transition-all flex items-start gap-5 h-full"
              >
                <div className={`p-4 rounded-xl ${feat.bg}`}>
                  <Icon className={`h-6 w-6 ${feat.color}`} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl mb-1">{feat.label}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{feat.desc}</p>
                  <div className="flex items-center text-xs font-bold text-primary group-hover:gap-2 transition-all gap-1">
                    Buka Fitur <ChevronRight className="h-3 w-3" />
                  </div>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

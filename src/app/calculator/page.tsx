"use client";

import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Calculator, Coins, ScrollText, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CalculatorHub() {
  const calculators = [
    {
      title: "Kalkulator Zakat",
      desc: "Hitung Zakat Fitrah, Maal, Penghasilan, dan Emas/Perak.",
      icon: Coins,
      color: "from-emerald-500 to-teal-600",
      link: "/calculator/zakat",
      badge: "Populer"
    },
    {
      title: "Kalkulator Waris (Faraid)",
      desc: "Simulasi pembagian harta warisan sesuai syariat Islam.",
      icon: ScrollText,
      color: "from-blue-500 to-indigo-600",
      link: "/calculator/waris",
      badge: "Beta"
    }
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <BackButton />
      
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-display font-bold">Kalkulator Islami</h1>
        </div>
        <p className="text-muted-foreground">Hitung kewajiban zakat dan pembagian harta waris sesuai syariat</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {calculators.map((calc, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={calc.link}>
              <div className="relative overflow-hidden rounded-3xl border bg-card p-8 hover:shadow-xl transition-all group">
                <div className={`absolute top-0 right-0 p-8 rounded-bl-[100px] bg-gradient-to-br ${calc.color} opacity-10 transition-opacity group-hover:opacity-20`} />
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-4 bg-gradient-to-br ${calc.color} rounded-2xl text-white shadow-lg`}>
                    <calc.icon className="h-8 w-8" />
                  </div>
                  <span className="px-3 py-1 bg-muted rounded-full text-xs font-bold text-muted-foreground">
                    {calc.badge}
                  </span>
                </div>
                <h2 className="text-2xl font-display font-bold mb-3">{calc.title}</h2>
                <p className="text-muted-foreground mb-6">{calc.desc}</p>
                <div className="flex items-center text-sm font-bold text-primary gap-2 group-hover:gap-3 transition-all">
                  Mulai Hitung <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

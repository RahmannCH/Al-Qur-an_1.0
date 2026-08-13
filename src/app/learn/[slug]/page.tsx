"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Button } from "@/components/ui/button";
import { LEARN_MODULES } from "@/app/learn/modules";
import { CheckCircle2, Sparkles, ArrowLeft } from "lucide-react";

export default function LearnModulePage() {
  const params = useParams<{ slug: string }>();
  const mod = LEARN_MODULES.find((m) => m.slug === params.slug);

  if (!mod) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <BackButton />
        <p className="font-bold text-2xl mb-4">Modul tidak ditemukan</p>
        <Link href="/learn">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Kembali ke Roadmap
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 pb-32">
      <BackButton />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-3xl bg-gradient-to-br from-primary to-teal shadow-xl text-4xl mb-6">
          {mod.emoji}
        </div>
        <span className="text-xs font-bold px-3 py-1 bg-primary/10 text-primary rounded-full uppercase tracking-wider">
          Level {mod.level}
        </span>
        <h1 className="text-3xl font-display font-bold mt-3 mb-2">{mod.name}</h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">{mod.desc}</p>
      </motion.div>

      <div className="space-y-6">
        {mod.sections.map((section, sIdx) => (
          <motion.div
            key={sIdx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="p-6 rounded-3xl bg-card border hover:shadow-lg transition-all"
          >
            <h2 className="font-display font-bold text-xl mb-4">{section.title}</h2>
            <ul className="space-y-3">
              {section.points.map((point, pIdx) => (
                <li key={pIdx} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-sm md:text-base font-medium leading-relaxed">{point}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-8 p-6 bg-gradient-to-br from-primary/10 to-teal/10 rounded-3xl border border-primary/20"
      >
        <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-gold" />
          Yuk Lakukan Hari Ini
        </h3>
        <p className="text-sm font-medium text-foreground/80">{mod.practice}</p>
      </motion.div>

      <div className="mt-8 flex justify-center">
        <Link href="/learn">
          <Button className="h-12 px-8 rounded-xl gap-2">
            <ArrowLeft className="h-4 w-4" /> Selesai, Kembali ke Roadmap
          </Button>
        </Link>
      </div>
    </div>
  );
}

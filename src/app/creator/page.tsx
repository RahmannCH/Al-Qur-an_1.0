"use client";

import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Github, Instagram, Mail, Code2, Briefcase, ExternalLink, Sparkles, Terminal } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CreatorPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 min-h-screen">
      <BackButton />
      
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
        
        {/* Profile Header Card */}
        <motion.div variants={item} className="relative overflow-hidden rounded-3xl bg-card border p-8 md:p-12 shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal/10 rounded-full blur-3xl -ml-20 -mb-20" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-full bg-gradient-to-br from-primary via-blue-500 to-teal-400 p-1 shadow-lg">
              <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden">
                 {/* Replace with your real photo if available */}
                 <Code2 className="w-16 h-16 text-primary opacity-80" />
              </div>
            </div>
            
            <div className="text-center md:text-left flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
                <Terminal className="w-3.5 h-3.5" /> Fullstack Developer
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">Rahman CH</h1>
              <p className="text-xl text-muted-foreground mb-6">Creator of Al-Qur'an Digital 1.0</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <a href="mailto:Rahmannch19@gmail.com">
                  <Button className="rounded-full shadow-md hover:shadow-lg transition-all">
                    <Mail className="w-4 h-4 mr-2" /> Hubungi Saya
                  </Button>
                </a>
                <a href="https://instagram.com/mangch._" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="rounded-full hover:border-rose-500 hover:text-rose-500 transition-colors">
                    <Instagram className="w-4 h-4 mr-2" /> @mangch._
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* About Project */}
          <motion.div variants={item} className="bg-card border rounded-3xl p-8 hover:shadow-md transition-shadow">
             <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-display font-bold">Tentang Project</h2>
             </div>
             <p className="text-muted-foreground leading-relaxed mb-6">
               Al-Qur'an Digital 1.0 dikembangkan sebagai aplikasi pembelajaran Islami interaktif yang memadukan teknologi modern dengan *user experience* gamifikasi. Dibangun untuk memberikan pengalaman membaca Al-Qur'an yang imersif, menyenangkan, dan tidak monoton.
             </p>
             <a href="https://github.com/RahmannCH/Al-Qur-an_1.0/blob/master/README.md" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" className="w-full justify-between group">
                  <span className="flex items-center gap-2"><Github className="w-4 h-4" /> Lihat Repositori GitHub</span>
                  <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                </Button>
             </a>
          </motion.div>

          {/* Business Inquiry */}
          <motion.div variants={item} className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10" />
             <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="p-3 bg-white/10 text-white rounded-xl backdrop-blur-md">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-display font-bold">Business & Inquiry</h2>
             </div>
             <p className="text-slate-300 leading-relaxed mb-6 relative z-10">
               Tertarik untuk berkolaborasi, merekrut, atau memiliki ide project pengembangan aplikasi / website profesional? Saya terbuka untuk diskusi *freelance* maupun *full-time opportunity*.
             </p>
             <div className="space-y-3 relative z-10">
               <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                 <span className="text-slate-400 text-sm">Email</span>
                 <span className="font-mono font-medium">Rahmannch19@gmail.com</span>
               </div>
               <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                 <span className="text-slate-400 text-sm">Instagram</span>
                 <span className="font-mono font-medium">@mangch._</span>
               </div>
             </div>
          </motion.div>
        </div>

        {/* Tech Stack Used */}
        <motion.div variants={item} className="bg-card border rounded-3xl p-8 text-center">
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-6">Dibangun Menggunakan Teknologi</p>
          <div className="flex flex-wrap justify-center gap-3">
             {["Next.js 16", "React 19", "Tailwind CSS v4", "Framer Motion", "Zustand", "shadcn/ui", "Quran.com API", "Gemini AI"].map((tech) => (
               <span key={tech} className="px-4 py-2 bg-muted rounded-full text-sm font-semibold text-foreground/80">
                 {tech}
               </span>
             ))}
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}

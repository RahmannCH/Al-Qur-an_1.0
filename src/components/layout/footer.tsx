"use client";

import Link from "next/link";
import { Mail, Code2, Heart, ExternalLink } from "lucide-react";
import { ZadifyLogo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/40 backdrop-blur-xl py-10 mt-auto pb-24 md:pb-10">
      <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Zadify Brand Info */}
        <div className="text-center md:text-left space-y-2">
          <Link href="/creator" className="group inline-flex items-center gap-3 transition-transform hover:-translate-y-0.5">
            <ZadifyLogo size="md" animated={true} />
          </Link>
          <p className="text-xs text-muted-foreground max-w-md leading-relaxed">
            Modern Islamic Productivity Super-App & Quran Reader Pro. Dirancang dengan visual futuristic, gamifikasi ibadah, dan asisten AI pintar.
          </p>
          <p className="text-xs text-muted-foreground flex items-center justify-center md:justify-start gap-1 pt-1">
            Made with <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 animate-pulse" /> by 
            <Link href="/creator" className="font-bold text-foreground hover:text-emerald-400 transition-colors underline decoration-emerald-500/30 underline-offset-4">
              Rahman CH
            </Link>
          </p>
        </div>

        {/* Links & Socials */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex items-center gap-3">
            <a href="https://github.com/RahmannCH/Al-Qur-an_1.0/blob/master/README.md" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl border border-border/50 bg-background/80 hover:bg-emerald-500 hover:border-emerald-400 hover:text-slate-950 transition-all shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a href="https://instagram.com/mangch._" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl border border-border/50 bg-background/80 hover:bg-rose-500 hover:border-rose-400 hover:text-white transition-all shadow-sm">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="mailto:Rahmannch19@gmail.com" className="p-2.5 rounded-xl border border-border/50 bg-background/80 hover:bg-cyan-500 hover:border-cyan-400 hover:text-slate-950 transition-all shadow-sm">
              <Mail className="h-4 w-4" />
            </a>
          </div>
          <Link href="/creator" className="text-[11px] font-bold tracking-wider text-muted-foreground hover:text-emerald-400 transition-colors inline-flex items-center gap-1">
            Business Inquiry & Developer Profile <ExternalLink className="h-3 w-3" />
          </Link>
        </div>

      </div>
    </footer>
  );
}

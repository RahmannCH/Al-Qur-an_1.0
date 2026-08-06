"use client";

import Link from "next/link";
import { Mail, Code2, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-card/50 backdrop-blur-md py-8 mt-auto pb-24 md:pb-8">
      <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Creator Info */}
        <div className="text-center md:text-left">
          <Link href="/creator" className="group inline-flex items-center gap-2 mb-2 transition-transform hover:-translate-y-0.5">
            <div className="bg-primary p-1.5 rounded-lg">
              <Code2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <p className="font-display font-bold text-base group-hover:text-primary transition-colors">
                Al-Qur'an Digital 1.0
              </p>
            </div>
          </Link>
          <p className="text-xs text-muted-foreground flex items-center justify-center md:justify-start gap-1">
            Made with <Heart className="h-3 w-3 text-rose-500 fill-rose-500 animate-pulse" /> by 
            <Link href="/creator" className="font-bold text-foreground hover:text-primary transition-colors underline decoration-primary/30 underline-offset-2">
              Rahman CH
            </Link>
          </p>
        </div>

        {/* Links & Socials */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex items-center gap-4">
            <a href="https://github.com/RahmannCH/Al-Qur-an_1.0/blob/master/README.md" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a href="https://instagram.com/mangch._" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted hover:bg-rose-500 hover:text-white transition-all">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="mailto:Rahmannch19@gmail.com" className="p-2 rounded-full bg-muted hover:bg-blue-500 hover:text-white transition-all">
              <Mail className="h-4 w-4" />
            </a>
          </div>
          <Link href="/creator" className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground hover:text-primary transition-colors">
            Business Inquiry & About Developer &rarr;
          </Link>
        </div>

      </div>
    </footer>
  );
}

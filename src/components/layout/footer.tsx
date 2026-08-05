"use client";

import Link from "next/link";
import { Github, Instagram, Mail, Code2, Heart } from "lucide-react";

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
              <Github className="h-4 w-4" />
            </a>
            <a href="https://instagram.com/mangch._" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted hover:bg-rose-500 hover:text-white transition-all">
              <Instagram className="h-4 w-4" />
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

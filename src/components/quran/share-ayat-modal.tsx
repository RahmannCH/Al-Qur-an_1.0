"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2, Download, Check } from "lucide-react";
import type { Verse, Chapter } from "@/types/quran";

export function ShareAyatModal({ verse, chapter, translation }: { verse: Verse; chapter: Chapter; translation: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleExport = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3, // High quality
        useCORS: true,
        backgroundColor: null
      });

      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `QS_${chapter.name_simple}_${verse.verse_number}.png`;
      link.href = url;
      link.click();
      
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2000);
    } catch (err) {
      console.error("Export failed", err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-accent text-muted-foreground hover:text-foreground outline-none">
        <Share2 className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Bagikan Ayat</DialogTitle>
        </DialogHeader>

        {/* The Card to Export */}
        <div className="bg-muted/50 p-4 rounded-xl flex items-center justify-center overflow-hidden">
          <div 
            ref={cardRef} 
            className="bg-gradient-to-br from-[#1E3A5F] to-[#162D4A] text-white p-8 rounded-2xl w-full relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold/10 rounded-full blur-3xl -mr-10 -mt-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal/10 rounded-full blur-2xl -ml-10 -mb-10" />
            
            <div className="relative z-10">
              <p className="font-arabic text-3xl leading-[2.5] text-right text-gold mb-6" dir="rtl">
                {verse.text_uthmani}
              </p>
              <p className="text-sm leading-relaxed text-white/90 mb-6 opacity-90">
                "{translation}"
              </p>
              
              <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
                <div>
                  <p className="font-display font-bold text-sm">QS. {chapter.name_simple}</p>
                  <p className="text-xs text-white/60">Ayat {verse.verse_number}</p>
                </div>
                <div className="text-right">
                  <p className="font-display font-bold text-sm text-gold">Al-Qur'an Digital</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button onClick={handleExport} disabled={isExporting} className="w-full bg-primary h-12 mt-2">
          {isExporting ? "Menyiapkan Gambar..." : downloaded ? <><Check className="mr-2 h-4 w-4" /> Tersimpan!</> : <><Download className="mr-2 h-4 w-4" /> Download Gambar</>}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

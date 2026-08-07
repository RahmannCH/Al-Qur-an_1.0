"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2, Download, Check, Copy, Send } from "lucide-react";
import type { Verse, Chapter } from "@/types/quran";

export function ShareAyatModal({ verse, chapter, translation }: { verse: Verse; chapter: Chapter; translation: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const fileName = `QS_${chapter.name_simple}_${verse.verse_number}.png`;

  const createImageBlob = async () => {
    if (!cardRef.current) throw new Error("Kartu ayat belum siap.");

    const canvas = await html2canvas(cardRef.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#162D4A",
    });

    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Gagal membuat gambar."));
      }, "image/png");
    });
  };

  const runExport = async (action: (blob: Blob) => Promise<void>, done: (value: boolean) => void) => {
    setIsExporting(true);
    try {
      const blob = await createImageBlob();
      await action(blob);
      done(true);
      setTimeout(() => done(false), 2200);
    } catch (err) {
      console.error("Export failed", err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownload = () => {
    runExport(async (blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = fileName;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    }, setDownloaded);
  };

  const handleCopyImage = () => {
    runExport(async (blob) => {
      if (typeof ClipboardItem !== "undefined" && navigator.clipboard?.write) {
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        return;
      }
      await navigator.clipboard.writeText(`${verse.text_uthmani}\n\n${translation}\n\n— QS. ${chapter.name_simple}: ${verse.verse_number}\nAl-Qur'an Digital · Linux 25`);
    }, setCopied);
  };

  const handleShare = () => {
    runExport(async (blob) => {
      const file = new File([blob], fileName, { type: "image/png" });
      if (navigator.share) {
        if (!navigator.canShare || navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `QS. ${chapter.name_simple}: ${verse.verse_number}`,
            text: "Dibagikan dari Al-Qur'an Digital · Linux 25",
            files: [file],
          });
          return;
        }
        await navigator.share({
          title: `QS. ${chapter.name_simple}: ${verse.verse_number}`,
          text: `${translation}\n\nAl-Qur'an Digital · Linux 25`,
        });
        return;
      }
      await navigator.clipboard.writeText(`${verse.text_uthmani}\n\n${translation}\n\n— QS. ${chapter.name_simple}: ${verse.verse_number}\nAl-Qur'an Digital · Linux 25`);
    }, setShared);
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

        <div className="bg-muted/50 p-4 rounded-xl flex items-center justify-center overflow-hidden">
          <div
            ref={cardRef}
            className="bg-gradient-to-br from-[#1E3A5F] to-[#162D4A] text-white p-8 rounded-2xl w-full relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold/10 rounded-full blur-3xl -mr-10 -mt-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal/10 rounded-full blur-2xl -ml-10 -mb-10" />

            <div className="relative z-10">
              <p className="font-arabic text-3xl leading-[2.5] text-right text-gold mb-6" dir="rtl">
                {verse.text_uthmani}
              </p>
              <p className="text-sm leading-relaxed text-white/90 mb-6 opacity-90">
                &ldquo;{translation}&rdquo;
              </p>

              <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
                <div>
                  <p className="font-display font-bold text-sm">QS. {chapter.name_simple}</p>
                  <p className="text-xs text-white/60">Ayat {verse.verse_number}</p>
                </div>
                <div className="text-right">
                  <p className="font-display font-bold text-sm text-gold">Al-Qur'an Digital</p>
                  <p className="text-[10px] text-white/55 tracking-[0.24em] uppercase mt-0.5">Linux 25</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
          <Button onClick={handleDownload} disabled={isExporting} className="h-11 bg-primary">
            {downloaded ? <><Check className="mr-2 h-4 w-4" /> Tersimpan</> : <><Download className="mr-2 h-4 w-4" /> Download</>}
          </Button>
          <Button onClick={handleCopyImage} disabled={isExporting} variant="outline" className="h-11">
            {copied ? <><Check className="mr-2 h-4 w-4" /> Tersalin</> : <><Copy className="mr-2 h-4 w-4" /> Copy</>}
          </Button>
          <Button onClick={handleShare} disabled={isExporting} variant="outline" className="h-11">
            {shared ? <><Check className="mr-2 h-4 w-4" /> Siap</> : <><Send className="mr-2 h-4 w-4" /> Share</>}
          </Button>
        </div>
        {isExporting && <p className="text-xs text-muted-foreground text-center">Menyiapkan gambar berkualitas tinggi...</p>}
      </DialogContent>
    </Dialog>
  );
}

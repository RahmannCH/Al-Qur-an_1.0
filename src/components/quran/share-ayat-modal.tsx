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

  // Sanitasi rules oklab/oklch dari stylesheet sebelum html2canvas mem-parsing CSSOM
  const sanitizeOklabRules = () => {
    const restoredRules: (() => void)[] = [];
    for (let i = 0; i < document.styleSheets.length; i++) {
      const sheet = document.styleSheets[i] as CSSStyleSheet;
      try {
        if (sheet.cssRules) {
          const rulesToDelete: number[] = [];
          for (let j = 0; j < sheet.cssRules.length; j++) {
            const rule = sheet.cssRules[j];
            if (rule.cssText && (rule.cssText.includes("oklab") || rule.cssText.includes("oklch"))) {
              rulesToDelete.push(j);
            }
          }
          // Hapus dari indeks terbesar agar indeks tidak bergeser
          for (let k = rulesToDelete.length - 1; k >= 0; k--) {
            const idx = rulesToDelete[k];
            const ruleText = sheet.cssRules[idx].cssText;
            sheet.deleteRule(idx);
            restoredRules.push(() => {
              try {
                sheet.insertRule(ruleText, idx);
              } catch {
                try {
                  sheet.insertRule(ruleText, sheet.cssRules.length);
                } catch {}
              }
            });
          }
        }
      } catch {
        // Abaikan CORS stylesheet
      }
    }
    return () => restoredRules.forEach((fn) => fn());
  };

  const createImageBlob = async () => {
    if (!cardRef.current) throw new Error("Kartu ayat belum siap.");

    const restoreStyles = sanitizeOklabRules();

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#162D4A",
        logging: false,
      });

      return new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Gagal membuat gambar."));
        }, "image/png");
      });
    } finally {
      restoreStyles();
    }
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
        try {
          await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
          return;
        } catch {
          // Fallback text jika clipboard image gagal
        }
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
            style={{
              backgroundColor: "#162D4A",
              backgroundImage: "linear-gradient(to bottom right, #1E3A5F, #162D4A)",
              color: "#FFFFFF",
            }}
            className="p-8 rounded-2xl w-full relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4A847]/10 rounded-full blur-3xl -mr-10 -mt-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#2A9D8F]/10 rounded-full blur-2xl -ml-10 -mb-10" />

            <div className="relative z-10">
              <p className="font-arabic text-3xl leading-[2.5] text-right text-[#D4A847] mb-6" dir="rtl">
                {verse.text_uthmani}
              </p>
              <p className="text-sm leading-relaxed text-white/90 mb-6 opacity-90">
                &ldquo;{translation}&rdquo;
              </p>

              <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
                <div>
                  <p className="font-display font-bold text-sm text-white">QS. {chapter.name_simple}</p>
                  <p className="text-xs text-white/60">Ayat {verse.verse_number}</p>
                </div>
                <div className="text-right">
                  <p className="font-display font-bold text-sm text-[#D4A847]">Al-Qur'an Digital</p>
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
            {shared ? <><Check className="mr-2 h-4 w-4" /> Terkirim</> : <><Send className="mr-2 h-4 w-4" /> Share</>}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

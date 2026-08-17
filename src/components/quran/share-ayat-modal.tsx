"use client";

import { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2, Download, Check, Copy, Send } from "lucide-react";
import type { Verse, Chapter } from "@/types/quran";

export function ShareAyatModal({ verse, chapter, translation }: { verse: Verse; chapter: Chapter; translation: string }) {
  const [isExporting, setIsExporting] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const fileName = `QS_${chapter.name_simple}_${verse.verse_number}.png`;

  // Native HTML5 Canvas 2D Generator (100% Bebas dari error CSS lab/oklab html2canvas)
  const generateNativeCanvasBlob = async (): Promise<Blob> => {
    const width = 1200;
    const height = 700;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    if (!ctx) throw new Error("Canvas context tidak tersedia");

    // 1. Background Gradient Mewah
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, "#1E3A5F");
    bgGrad.addColorStop(1, "#162D4A");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Ornamen Glow Bulat
    const glow1 = ctx.createRadialGradient(width - 100, 100, 10, width - 100, 100, 250);
    glow1.addColorStop(0, "rgba(212, 168, 71, 0.2)");
    glow1.addColorStop(1, "rgba(212, 168, 71, 0)");
    ctx.fillStyle = glow1;
    ctx.fillRect(0, 0, width, height);

    const glow2 = ctx.createRadialGradient(100, height - 100, 10, 100, height - 100, 200);
    glow2.addColorStop(0, "rgba(42, 157, 143, 0.2)");
    glow2.addColorStop(1, "rgba(42, 157, 143, 0)");
    ctx.fillStyle = glow2;
    ctx.fillRect(0, 0, width, height);

    // 3. Border Kartu Elegan
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, width - 80, height - 80);

    // 4. Header Atas: Nama Surah & Ayat
    ctx.fillStyle = "#D4A847";
    ctx.font = "bold 28px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`QS. ${chapter.name_simple} : ${verse.verse_number}`, 80, 100);

    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.font = "20px 'Inter', sans-serif";
    ctx.fillText(`${chapter.translated_name.name} • ${chapter.revelation_place === "makkah" ? "Makkiyah" : "Madaniyah"}`, 80, 135);

    // 5. Teks Arab (Uthmani)
    ctx.fillStyle = "#D4A847";
    ctx.font = "42px 'Amiri', serif";
    ctx.textAlign = "right";
    ctx.direction = "rtl";

    // Auto-wrap teks Arab
    const maxArabicWidth = width - 160;
    const arabicWords = verse.text_uthmani.split(" ");
    let currentLine = "";
    let startY = 240;

    for (let i = 0; i < arabicWords.length; i++) {
      const testLine = currentLine + (currentLine ? " " : "") + arabicWords[i];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxArabicWidth && i > 0) {
        ctx.fillText(currentLine, width - 80, startY);
        currentLine = arabicWords[i];
        startY += 75;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      ctx.fillText(currentLine, width - 80, startY);
      startY += 75;
    }

    // 6. Teks Terjemahan Indonesia (Auto Word-Wrap)
    ctx.direction = "ltr";
    ctx.textAlign = "left";
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.font = "italic 22px 'Inter', sans-serif";

    const maxTranslationWidth = width - 160;
    const translationWords = `“${translation}”`.split(" ");
    let transLine = "";
    let transY = Math.max(startY + 30, 420);

    for (let j = 0; j < translationWords.length; j++) {
      const testTransLine = transLine + (transLine ? " " : "") + translationWords[j];
      const transMetrics = ctx.measureText(testTransLine);
      if (transMetrics.width > maxTranslationWidth && j > 0) {
        ctx.fillText(transLine, 80, transY);
        transLine = translationWords[j];
        transY += 38;
      } else {
        transLine = testTransLine;
      }
    }
    if (transLine) {
      ctx.fillText(transLine, 80, transY);
    }

    // 7. Divider Bawah
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(80, height - 100);
    ctx.lineTo(width - 80, height - 100);
    ctx.stroke();

    // 8. Footer Watermark Zadify
    ctx.fillStyle = "#D4A847";
    ctx.font = "bold 24px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("Zadify", 80, height - 60);

    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.font = "16px 'Inter', sans-serif";
    ctx.textAlign = "right";
    ctx.fillText("The Comprehensive Digital Al-Qur'an Provision for Muslims", width - 80, height - 60);

    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Gagal membuat blob gambar"));
      }, "image/png");
    });
  };

  const runExport = async (action: (blob: Blob) => Promise<void>, done: (value: boolean) => void) => {
    setIsExporting(true);
    try {
      const blob = await generateNativeCanvasBlob();
      await action(blob);
      done(true);
      setTimeout(() => done(false), 2200);
    } catch (err) {
      console.error("Export failed:", err);
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
      await navigator.clipboard.writeText(`${verse.text_uthmani}\n\n${translation}\n\n[QS. ${chapter.name_simple}: ${verse.verse_number}]\nZadify: The Comprehensive Digital Al-Qur'an Provision for Muslims`);
    }, setCopied);
  };

  const handleShare = () => {
    runExport(async (blob) => {
      const file = new File([blob], fileName, { type: "image/png" });
      if (navigator.share) {
        if (!navigator.canShare || navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `QS. ${chapter.name_simple}: ${verse.verse_number}`,
            text: "Dibagikan dari Zadify",
            files: [file],
          });
          return;
        }
        await navigator.share({
          title: `QS. ${chapter.name_simple}: ${verse.verse_number}`,
          text: `${translation}\n\nZadify: The Comprehensive Digital Al-Qur'an Provision for Muslims`,
        });
        return;
      }
      await navigator.clipboard.writeText(`${verse.text_uthmani}\n\n${translation}\n\n[QS. ${chapter.name_simple}: ${verse.verse_number}]\nZadify: The Comprehensive Digital Al-Qur'an Provision for Muslims`);
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
                  <p className="font-display font-bold text-sm text-[#D4A847]">Zadify</p>
                  <p className="text-[9px] text-white/60 tracking-wider mt-0.5 font-medium">Digital Qur'an Provision</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
          <Button onClick={handleDownload} disabled={isExporting} className="h-11 bg-primary font-bold">
            {downloaded ? <><Check className="mr-2 h-4 w-4" /> Tersimpan</> : <><Download className="mr-2 h-4 w-4" /> Download</>}
          </Button>
          <Button onClick={handleCopyImage} disabled={isExporting} variant="outline" className="h-11 font-bold">
            {copied ? <><Check className="mr-2 h-4 w-4" /> Tersalin</> : <><Copy className="mr-2 h-4 w-4" /> Copy</>}
          </Button>
          <Button onClick={handleShare} disabled={isExporting} variant="outline" className="h-11 font-bold">
            {shared ? <><Check className="mr-2 h-4 w-4" /> Terkirim</> : <><Send className="mr-2 h-4 w-4" /> Share</>}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

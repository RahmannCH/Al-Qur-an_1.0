"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { BarChart3, Flame, Clock, BookOpen, Sparkles, CheckCircle2, TrendingUp } from "lucide-react";
import { useAnalyticsStore } from "@/store/analytics-store";
import { useGamificationStore, getLevelInfo } from "@/store/gamification-store";
import { useReadingPlanStore } from "@/store/reading-plan-store";
import { Card } from "@/components/ui/card";

export default function AnalyticsPage() {
  const { history, getHeatmapData, getWeeklySummary } = useAnalyticsStore();
  const { xp, readCount, dzikirCount } = useGamificationStore();
  const { ayahsRead, totalAyahs, targetDays } = useReadingPlanStore();

  const levelInfo = useMemo(() => getLevelInfo(xp), [xp]);
  const weekly = useMemo(() => getWeeklySummary(), [getWeeklySummary]);
  const heatmap = useMemo(() => getHeatmapData(70), [getHeatmapData]);

  const intensityColors = [
    "bg-muted/40 border border-border/20",
    "bg-emerald-500/30 border border-emerald-500/40",
    "bg-emerald-500/60 border border-emerald-500/70",
    "bg-emerald-500/80 border border-emerald-500",
    "bg-emerald-500 border border-emerald-400 shadow-sm shadow-emerald-500/50",
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 pb-32">
      <BackButton />

      <div className="mb-8 text-center">
        <div className="inline-block p-4 bg-emerald-500/10 rounded-full mb-4">
          <BarChart3 className="h-8 w-8 text-emerald-600" />
        </div>
        <h1 className="text-3xl font-display font-bold mb-2">Statistik & Analitik Tilawah</h1>
        <p className="text-muted-foreground text-sm max-w-xl mx-auto">
          Pantau konsistensi ibadah harian, kecepatan membaca, dan progres khatam Anda.
        </p>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-5 flex flex-col justify-between border-primary/20 bg-card/60 backdrop-blur">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold">Total Ayat Dibaca</span>
            <BookOpen className="h-4 w-4 text-emerald-500" />
          </div>
          <div>
            <div className="text-2xl font-bold font-display">{readCount || ayahsRead}</div>
            <span className="text-[11px] text-muted-foreground">Ayat tercatat</span>
          </div>
        </Card>

        <Card className="p-5 flex flex-col justify-between border-primary/20 bg-card/60 backdrop-blur">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold">Minggu Ini</span>
            <TrendingUp className="h-4 w-4 text-teal-500" />
          </div>
          <div>
            <div className="text-2xl font-bold font-display">{weekly.totalAyahs}</div>
            <span className="text-[11px] text-muted-foreground">Rata-rata {weekly.avgDailyAyahs}/hari</span>
          </div>
        </Card>

        <Card className="p-5 flex flex-col justify-between border-primary/20 bg-card/60 backdrop-blur">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold">Total Dzikir</span>
            <Sparkles className="h-4 w-4 text-amber-500" />
          </div>
          <div>
            <div className="text-2xl font-bold font-display">{dzikirCount}</div>
            <span className="text-[11px] text-muted-foreground">Tasbih terselesaikan</span>
          </div>
        </Card>

        <Card className="p-5 flex flex-col justify-between border-primary/20 bg-card/60 backdrop-blur">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold">Zad Level</span>
            <Flame className="h-4 w-4 text-rose-500" />
          </div>
          <div>
            <div className="text-2xl font-bold font-display">Lvl {levelInfo.level}</div>
            <span className="text-[11px] text-muted-foreground">{levelInfo.title}</span>
          </div>
        </Card>
      </div>

      {/* Heatmap Section */}
      <Card className="p-6 md:p-8 mb-8 border-primary/20 bg-card/70 backdrop-blur shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold font-display">Heatmap Konsistensi Ibadah</h3>
            <p className="text-xs text-muted-foreground">70 hari terakhir aktivitas tilawah & ibadah</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>Kurang</span>
            {intensityColors.map((col, idx) => (
              <div key={idx} className={`w-3.5 h-3.5 rounded-sm ${col}`} />
            ))}
            <span>Rajin</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center py-2">
          {heatmap.map((cell, idx) => (
            <motion.div
              key={cell.date}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: idx * 0.005 }}
              title={`${cell.date}: ${cell.count} ayat`}
              className={`w-4 h-4 rounded-sm cursor-pointer transition-transform hover:scale-125 ${intensityColors[cell.intensity]}`}
            />
          ))}
        </div>
      </Card>

      {/* Progress Khatam Breakdown */}
      <Card className="p-6 md:p-8 border-primary/20 bg-card/70 backdrop-blur shadow-lg">
        <h3 className="text-lg font-bold font-display mb-4">Progres Khatam Keseluruhan</h3>
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Persentase Khatam 30 Juz</span>
          <span className="font-bold text-emerald-600">
            {((ayahsRead / totalAyahs) * 100).toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-muted/60 h-3.5 rounded-full overflow-hidden mb-6">
          <div
            className="bg-gradient-to-r from-teal-500 to-emerald-500 h-full rounded-full transition-all duration-700"
            style={{ width: `${Math.min(100, (ayahsRead / totalAyahs) * 100)}%` }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-background/50 border">
            <div className="text-xs text-muted-foreground mb-1">Target Durasi</div>
            <div className="text-lg font-bold">{targetDays || 30} Hari</div>
          </div>
          <div className="p-4 rounded-2xl bg-background/50 border">
            <div className="text-xs text-muted-foreground mb-1">Sisa Ayat Menuju Khatam</div>
            <div className="text-lg font-bold">{Math.max(0, totalAyahs - ayahsRead)} Ayat</div>
          </div>
          <div className="p-4 rounded-2xl bg-background/50 border">
            <div className="text-xs text-muted-foreground mb-1">Target Harian Ideal</div>
            <div className="text-lg font-bold">
              {Math.ceil(Math.max(0, totalAyahs - ayahsRead) / (targetDays || 30))} Ayat/hari
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Target, TrendingUp, Calendar, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReadingPlanStore } from "@/store/reading-plan-store";
import { useState } from "react";
import { sfx } from "@/lib/sfx";

export function ReadingPlanWidget() {
  const { isActive, targetDays, startDate, ayahsRead, totalAyahs, setPlan, resetPlan } = useReadingPlanStore();
  const [showSetup, setShowSetup] = useState(!isActive);
  const [selectedDays, setSelectedDays] = useState(30);

  const handleStart = () => {
    setPlan(selectedDays);
    setShowSetup(false);
    sfx.playSuccess();
  };

  const handleReset = () => {
    resetPlan();
    setShowSetup(true);
    sfx.playTap();
  };

  const percentage = Math.min(100, Math.round((ayahsRead / totalAyahs) * 100));
  
  // Hitung target harian
  const dailyTarget = Math.ceil(totalAyahs / targetDays);
  
  // Hitung hari berlalu
  const daysPassed = Math.floor((Date.now() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24));
  
  // Hitung status: on-track atau behind
  const expectedAyahs = daysPassed * dailyTarget;
  const isBehind = ayahsRead < expectedAyahs;

  if (showSetup) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border bg-card p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-primary/10 rounded-xl">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-display font-bold text-lg">Target Khatam</h3>
        </div>
        
        <p className="text-sm text-muted-foreground mb-6">
          Tetapkan target khatam Al-Qur'an dan pantau progress harianmu.
        </p>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[30, 60, 90].map((days) => (
            <button
              key={days}
              onClick={() => { setSelectedDays(days); sfx.playTap(); }}
              className={`p-3 rounded-xl border text-center transition-all ${
                selectedDays === days 
                  ? "bg-primary border-primary text-primary-foreground shadow-md" 
                  : "bg-muted/50 hover:bg-muted"
              }`}
            >
              <p className="font-bold text-lg">{days}</p>
              <p className="text-[10px] opacity-80 uppercase tracking-wider">Hari</p>
            </button>
          ))}
        </div>

        <div className="p-3 bg-muted/30 rounded-xl border mb-6 flex justify-between items-center">
          <span className="text-sm font-medium">Target Harian:</span>
          <span className="font-bold text-primary">{Math.ceil(6236 / selectedDays)} Ayat</span>
        </div>

        <Button onClick={handleStart} className="w-full rounded-xl h-12">
          Mulai Rencana Baru
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border bg-card p-6 overflow-hidden relative"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary/10 rounded-xl">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg leading-tight">Progress Khatam</h3>
            <p className="text-xs text-muted-foreground">Target {targetDays} Hari</p>
          </div>
        </div>
        <button 
          onClick={handleReset}
          className="text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-lg bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="mb-2 flex justify-between items-end">
        <span className="text-3xl font-display font-bold">{percentage}%</span>
        <span className="text-sm text-muted-foreground font-medium mb-1">
          {ayahsRead} / {totalAyahs} Ayat
        </span>
      </div>

      <div className="h-3 w-full bg-muted rounded-full overflow-hidden mb-6 relative">
        <motion.div 
          className="h-full bg-gradient-to-r from-primary to-teal"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        {/* Target Marker */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-rose-500 z-10"
          style={{ left: `${Math.min(100, (expectedAyahs / totalAyahs) * 100)}%` }}
          title="Target saat ini"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-muted/30 rounded-xl border">
          <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
            <Calendar className="h-3 w-3" /> Hari ke-{daysPassed + 1}
          </p>
          <p className="font-bold">{Math.max(0, targetDays - daysPassed)} hari lagi</p>
        </div>
        <div className={`p-3 rounded-xl border ${isBehind ? 'bg-rose-500/10 border-rose-500/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}>
          <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> Status
          </p>
          <p className={`font-bold ${isBehind ? 'text-rose-500' : 'text-emerald-500'}`}>
            {isBehind ? 'Tertinggal' : 'On Track'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

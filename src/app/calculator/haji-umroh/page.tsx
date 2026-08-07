"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { PlaneTakeoff, RefreshCcw, Save, TrendingUp, Calendar, Coins, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { sfx } from "@/lib/sfx";

export default function HajiUmrohCalculator() {
  const [type, setType] = useState<"umroh" | "haji">("umroh");
  const [biayaAwal, setBiayaAwal] = useState<number>(35000000);
  const [inflasi, setInflasi] = useState<number>(5); // 5% inflasi per tahun
  const [tabunganSaatIni, setTabunganSaatIni] = useState<number>(0);
  const [targetTahun, setTargetTahun] = useState<number>(3); // Berangkat dalam 3 tahun

  const hitungEstimasiBiaya = () => {
    // FV = PV * (1 + r)^n
    return biayaAwal * Math.pow(1 + inflasi / 100, targetTahun);
  };

  const biayaFuture = hitungEstimasiBiaya();
  const sisaKekurangan = Math.max(0, biayaFuture - tabunganSaatIni);
  const bulanTersisa = targetTahun * 12;
  const tabunganPerBulan = sisaKekurangan / bulanTersisa;
  const tabunganPerHari = tabunganPerBulan / 30;

  const handlePreset = (presetType: "umroh" | "haji") => {
    sfx.playTap();
    setType(presetType);
    setBiayaAwal(presetType === "umroh" ? 35000000 : 55000000);
  };

  const formatRp = (value: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 pb-32">
      <BackButton />

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl">
            <PlaneTakeoff className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold">Kalkulator Haji & Umroh</h1>
        </div>
        <p className="text-muted-foreground">Rencanakan perjalanan ibadah suci Anda dengan target menabung yang realistis.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        {/* Form Input */}
        <div className="md:col-span-7 space-y-8">
          <div className="rounded-3xl border bg-card p-6 md:p-8">
            <div className="flex gap-4 mb-8">
              <Button
                variant={type === "umroh" ? "default" : "outline"}
                className={`flex-1 rounded-xl h-12 ${type === "umroh" ? "bg-amber-600 hover:bg-amber-700" : ""}`}
                onClick={() => handlePreset("umroh")}
              >
                Paket Umroh
              </Button>
              <Button
                variant={type === "haji" ? "default" : "outline"}
                className={`flex-1 rounded-xl h-12 ${type === "haji" ? "bg-amber-600 hover:bg-amber-700" : ""}`}
                onClick={() => handlePreset("haji")}
              >
                Porsi Haji
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-bold text-muted-foreground mb-2 block">
                  Estimasi Biaya Saat Ini
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">Rp</span>
                  <Input
                    type="number"
                    value={biayaAwal || ""}
                    onChange={(e) => setBiayaAwal(Number(e.target.value))}
                    className="pl-12 h-14 text-lg font-bold rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-muted-foreground mb-2 block">
                  Tabungan yang Sudah Dimiliki
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">Rp</span>
                  <Input
                    type="number"
                    value={tabunganSaatIni || ""}
                    onChange={(e) => setTabunganSaatIni(Number(e.target.value))}
                    className="pl-12 h-14 text-lg font-bold rounded-xl"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-bold text-muted-foreground">
                    Target Berangkat
                  </label>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg font-bold text-sm">
                    {targetTahun} Tahun
                  </span>
                </div>
                <Slider
                  defaultValue={[targetTahun]}
                  max={20}
                  min={1}
                  step={1}
                  onValueChange={(vals) => setTargetTahun(Array.isArray(vals) ? vals[0] : vals as unknown as number)}
                  className="py-4"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-bold text-muted-foreground">
                    Asumsi Kenaikan Harga (Inflasi/Tahun)
                  </label>
                  <span className="px-3 py-1 bg-destructive/10 text-destructive rounded-lg font-bold text-sm">
                    {inflasi}%
                  </span>
                </div>
                <Slider
                  defaultValue={[inflasi]}
                  max={15}
                  min={0}
                  step={1}
                  onValueChange={(vals) => setInflasi(Array.isArray(vals) ? vals[0] : vals as unknown as number)}
                  className="py-4"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Hasil Kalkulasi */}
        <div className="md:col-span-5">
          <div className="sticky top-24 rounded-3xl border bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 md:p-8 shadow-2xl">
            <h2 className="font-display font-bold text-xl mb-6 text-white/90">Hasil Perhitungan</h2>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-white/60 font-medium mb-1">Estimasi Biaya di Tahun {new Date().getFullYear() + targetTahun}</p>
                <p className="text-3xl font-display font-bold text-amber-400">{formatRp(biayaFuture)}</p>
                <p className="text-xs text-white/40 mt-1">*Termasuk penyesuaian inflasi {inflasi}%/tahun</p>
              </div>

              <div className="h-px bg-white/10 w-full" />

              <div className="bg-white/5 rounded-2xl p-4">
                <p className="text-xs text-white/60 font-bold uppercase tracking-wider mb-2">Target Tabungan</p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-emerald-400" />
                      <span className="text-sm font-medium">Per Bulan</span>
                    </div>
                    <span className="font-bold text-emerald-400">{formatRp(tabunganPerBulan)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Coins className="h-4 w-4 text-teal-400" />
                      <span className="text-sm font-medium">Per Hari</span>
                    </div>
                    <span className="font-bold text-teal-400">{formatRp(tabunganPerHari)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-amber-500/20 text-amber-200 p-4 rounded-xl border border-amber-500/30">
                <TrendingUp className="h-5 w-5 shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed">
                  Menabung <strong>{formatRp(tabunganPerHari)}</strong> setiap hari selama {bulanTersisa} bulan untuk mencapai niat suci Anda. InsyaAllah dimudahkan!
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

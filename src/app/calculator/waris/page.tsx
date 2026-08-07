"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollText, ArrowRight, ArrowLeft } from "lucide-react";

const formatRp = (num: number) => {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
};

export default function WarisCalculator() {
  const [step, setStep] = useState(1);

  // Step 1: Harta
  const [totalAsset, setTotalAsset] = useState<number>(0);
  const [funeralCost, setFuneralCost] = useState<number>(0);
  const [debts, setDebts] = useState<number>(0);
  const [wasiat, setWasiat] = useState<number>(0);

  // Step 2: Almarhum & Pasangan
  const [gender, setGender] = useState<"l" | "p" | null>(null);
  const [spouseAlive, setSpouseAlive] = useState<boolean>(false);
  const [wivesCount, setWivesCount] = useState<number>(1); // Only matters if deceased is male

  // Step 3: Anak & Orang Tua
  const [sons, setSons] = useState<number>(0);
  const [daughters, setDaughters] = useState<number>(0);
  const [fatherAlive, setFatherAlive] = useState<boolean>(false);
  const [motherAlive, setMotherAlive] = useState<boolean>(false);

  // Hasil Perhitungan
  const hartaSetelahUtang = totalAsset - funeralCost - debts;
  const maxWasiat = hartaSetelahUtang / 3;
  const validWasiat = Math.min(wasiat, Math.max(0, maxWasiat));
  const netEstate = hartaSetelahUtang - validWasiat;
  const hasChildren = sons > 0 || daughters > 0;

  const calculateFaraid = () => {
    let remaining = netEstate;
    const shares: { heir: string; percentage: string; amount: number; note?: string }[] = [];

    if (remaining <= 0) return { error: "Harta tidak tersisa setelah dipotong hutang/biaya." };

    // 1. Porsi Suami/Istri (Ashabul Furudh)
    if (spouseAlive) {
      if (gender === "p") {
        // Almarhum Istri -> Suami dapat 1/2 (tanpa anak) atau 1/4 (ada anak)
        const portion = hasChildren ? 1/4 : 1/2;
        const amount = netEstate * portion;
        shares.push({ heir: "Suami", percentage: hasChildren ? "1/4" : "1/2", amount });
        remaining -= amount;
      } else {
        // Almarhum Suami -> Istri dapat 1/4 (tanpa anak) atau 1/8 (ada anak)
        const portion = hasChildren ? 1/8 : 1/4;
        const amount = netEstate * portion;
        shares.push({ 
          heir: wivesCount > 1 ? `Istri (${wivesCount} orang dibagi rata)` : "Istri", 
          percentage: hasChildren ? "1/8" : "1/4", 
          amount 
        });
        remaining -= amount;
      }
    }

    // 2. Porsi Orang Tua
    if (fatherAlive) {
      // Ayah dapat 1/6 jika ada anak. Jika tidak ada anak, dia Asabah (sisa). Kita hitung furudh dulu.
      if (hasChildren) {
        const amount = netEstate * (1/6);
        shares.push({ heir: "Ayah", percentage: "1/6", amount });
        remaining -= amount;
      }
    }

    if (motherAlive) {
      // Ibu dapat 1/6 jika ada anak. 1/3 jika tidak ada anak/saudara.
      const portion = hasChildren ? 1/6 : 1/3;
      const amount = netEstate * portion;
      shares.push({ heir: "Ibu", percentage: hasChildren ? "1/6" : "1/3", amount });
      remaining -= amount;
    }

    // 3. Porsi Anak (Asabah) - Sisa Harta
    if (hasChildren) {
      const totalChildShares = (sons * 2) + daughters; // Laki-laki 2 bagian, Perempuan 1 bagian
      if (totalChildShares > 0 && remaining > 0) {
        const valuePerShare = remaining / totalChildShares;
        
        if (sons > 0) {
          shares.push({ 
            heir: sons > 1 ? `Anak Laki-laki (${sons} orang)` : "Anak Laki-laki", 
            percentage: "Asabah (2 Porsi)", 
            amount: valuePerShare * 2 * sons,
            note: `Masing-masing mendapat ${formatRp(valuePerShare * 2)}`
          });
        }
        
        if (daughters > 0) {
          shares.push({ 
            heir: daughters > 1 ? `Anak Perempuan (${daughters} orang)` : "Anak Perempuan", 
            percentage: "Asabah (1 Porsi)", 
            amount: valuePerShare * daughters,
            note: `Masing-masing mendapat ${formatRp(valuePerShare)}`
          });
        }
        remaining = 0; // Habis dibagi Asabah
      }
    } else if (fatherAlive && remaining > 0) {
      // Jika tidak ada anak, Ayah mengambil sisa harta (Asabah)
      shares.push({ heir: "Ayah (Sebagai Asabah/Sisa)", percentage: "Sisa Harta", amount: remaining });
      remaining = 0;
    }

    // Edge case if remaining > 0 but no Asabah (Usually given to Baitul Mal or Radd to furudh, but beyond simple MVP)
    if (remaining > 1) {
       shares.push({ heir: "Sisa Harta (Baitul Mal / Ahli Waris Jauh)", percentage: "Sisa", amount: remaining });
    }

    return { shares, netEstate };
  };

  const InputField = ({ label, value, onChange, desc }: any) => (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-1">{label}</label>
      {desc && <p className="text-xs text-muted-foreground mb-2">{desc}</p>}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">Rp</span>
        <Input 
          type="number" 
          value={value === 0 ? "" : value} 
          onChange={(e) => onChange(Number(e.target.value))}
          className="pl-10 h-12 text-lg font-medium"
          placeholder="0"
        />
      </div>
    </div>
  );

  const Step1 = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h2 className="text-xl font-display font-bold mb-6">1. Harta Tinggalan & Potongan</h2>
      <InputField label="Total Nilai Harta Almarhum" desc="Termasuk rumah, tabungan, kendaraan, emas, dll." value={totalAsset} onChange={setTotalAsset} />
      <InputField label="Biaya Pengurusan Jenazah" desc="Biaya kain kafan, pemakaman, dll." value={funeralCost} onChange={setFuneralCost} />
      <InputField label="Hutang Almarhum" desc="Hutang manusia dan hutang kepada Allah (Zakat/Puasa yang belum dibayar)." value={debts} onChange={setDebts} />
      
      <div className="mb-6">
         <InputField label="Wasiat (Maks 1/3 Harta Bersih)" desc={`Batas maksimal wasiat yang sah: ${formatRp(Math.max(0, maxWasiat))}`} value={wasiat} onChange={setWasiat} />
         {wasiat > maxWasiat && maxWasiat > 0 && (
           <p className="text-xs text-destructive bg-destructive/10 p-2 rounded-md">Wasiat melebihi batas 1/3 harta. Berdasarkan syariat, wasiat maksimal adalah 1/3 kecuali semua ahli waris ridha.</p>
         )}
      </div>

      <div className="p-4 bg-primary/5 rounded-xl border mb-6 flex justify-between items-center">
        <span className="font-semibold text-sm">Harta Bersih Dibagikan:</span>
        <span className="font-bold text-xl text-primary">{formatRp(Math.max(0, netEstate))}</span>
      </div>

      <Button onClick={() => setStep(2)} disabled={netEstate <= 0} className="w-full h-12">Lanjut <ArrowRight className="ml-2 w-4 h-4" /></Button>
    </motion.div>
  );

  const Step2 = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h2 className="text-xl font-display font-bold mb-6">2. Almarhum & Pasangan</h2>
      
      <div className="mb-6">
        <label className="block text-sm font-bold mb-3">Siapa yang meninggal dunia?</label>
        <div className="grid grid-cols-2 gap-3">
          <Button variant={gender === "l" ? "default" : "outline"} className={gender === "l" ? "bg-blue-600" : ""} onClick={() => setGender("l")}>Laki-laki (Suami/Ayah)</Button>
          <Button variant={gender === "p" ? "default" : "outline"} className={gender === "p" ? "bg-rose-600" : ""} onClick={() => setGender("p")}>Perempuan (Istri/Ibu)</Button>
        </div>
      </div>

      {gender && (
        <div className="mb-6">
          <label className="block text-sm font-bold mb-3">Apakah Almarhum meninggalkan pasangan yang masih hidup?</label>
          <div className="flex gap-3 mb-3">
            <Button variant={spouseAlive ? "default" : "outline"} onClick={() => setSpouseAlive(true)} className="flex-1">Ya, Ada</Button>
            <Button variant={!spouseAlive ? "default" : "outline"} onClick={() => setSpouseAlive(false)} className="flex-1">Tidak Ada</Button>
          </div>
          
          {spouseAlive && gender === "l" && (
            <div className="mt-4 p-4 bg-muted rounded-xl">
              <label className="block text-sm font-bold mb-2">Jumlah Istri yang masih hidup</label>
              <div className="flex items-center gap-4">
                <Button variant="outline" onClick={() => setWivesCount(Math.max(1, wivesCount - 1))}>-</Button>
                <span className="text-xl font-bold">{wivesCount}</span>
                <Button variant="outline" onClick={() => setWivesCount(Math.min(4, wivesCount + 1))}>+</Button>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setStep(1)} className="h-12 w-14"><ArrowLeft className="w-4 h-4" /></Button>
        <Button onClick={() => setStep(3)} disabled={!gender} className="w-full h-12 flex-1">Lanjut <ArrowRight className="ml-2 w-4 h-4" /></Button>
      </div>
    </motion.div>
  );

  const Step3 = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h2 className="text-xl font-display font-bold mb-6">3. Keturunan & Orang Tua</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-muted rounded-xl text-center">
          <label className="block text-sm font-bold mb-2">Anak Laki-laki</label>
          <div className="flex items-center justify-between">
            <Button variant="outline" className="w-8 h-8 p-0" onClick={() => setSons(Math.max(0, sons - 1))}>-</Button>
            <span className="text-xl font-bold">{sons}</span>
            <Button variant="outline" className="w-8 h-8 p-0" onClick={() => setSons(sons + 1)}>+</Button>
          </div>
        </div>
        <div className="p-4 bg-muted rounded-xl text-center">
          <label className="block text-sm font-bold mb-2">Anak Perempuan</label>
          <div className="flex items-center justify-between">
            <Button variant="outline" className="w-8 h-8 p-0" onClick={() => setDaughters(Math.max(0, daughters - 1))}>-</Button>
            <span className="text-xl font-bold">{daughters}</span>
            <Button variant="outline" className="w-8 h-8 p-0" onClick={() => setDaughters(daughters + 1)}>+</Button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-bold mb-3">Apakah Ayah Kandung Almarhum masih hidup?</label>
        <div className="flex gap-3">
          <Button variant={fatherAlive ? "default" : "outline"} onClick={() => setFatherAlive(true)} className="flex-1">Ya, Masih</Button>
          <Button variant={!fatherAlive ? "default" : "outline"} onClick={() => setFatherAlive(false)} className="flex-1">Telah Wafat</Button>
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-bold mb-3">Apakah Ibu Kandung Almarhum masih hidup?</label>
        <div className="flex gap-3">
          <Button variant={motherAlive ? "default" : "outline"} onClick={() => setMotherAlive(true)} className="flex-1">Ya, Masih</Button>
          <Button variant={!motherAlive ? "default" : "outline"} onClick={() => setMotherAlive(false)} className="flex-1">Telah Wafat</Button>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setStep(2)} className="h-12 w-14"><ArrowLeft className="w-4 h-4" /></Button>
        <Button onClick={() => setStep(4)} className="w-full h-12 flex-1 bg-blue-600 hover:bg-blue-700">Hitung Pembagian Waris</Button>
      </div>
    </motion.div>
  );

  const Step4 = () => {
    const result = calculateFaraid();

    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
        <div className="mb-8">
           <h2 className="text-3xl font-display font-bold mb-2 text-primary">Hasil Perhitungan Faraid</h2>
           <p className="text-muted-foreground">Berdasarkan hukum waris Islam untuk keluarga inti</p>
        </div>

        {result.error ? (
          <div className="p-6 bg-destructive/10 text-destructive rounded-2xl font-bold">{result.error}</div>
        ) : (
          <>
            <div className="p-6 bg-primary/5 border border-primary/20 rounded-3xl mb-8">
               <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Total Harta Bersih</p>
               <p className="text-4xl font-bold font-display text-primary">{formatRp(result.netEstate || 0)}</p>
            </div>

            <div className="space-y-4 mb-8 text-left">
               {result.shares?.map((share, idx) => (
                 <div key={idx} className="p-5 border rounded-2xl bg-card hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold flex items-center gap-2">
                        {share.heir} <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">{share.percentage}</span>
                      </h3>
                      {share.note && <p className="text-sm text-muted-foreground mt-1">{share.note}</p>}
                    </div>
                    <p className="text-2xl font-bold text-primary">{formatRp(share.amount || 0)}</p>
                 </div>
               ))}
            </div>
          </>
        )}

        <Button variant="outline" onClick={() => setStep(1)} className="w-full h-12">Hitung Ulang dari Awal</Button>
        <div className="mt-8 p-4 bg-muted/50 rounded-xl text-center">
          <p className="text-xs text-muted-foreground leading-relaxed">
            *Catatan: Kalkulator ini hanya mengakomodasi keluarga inti (Nuclear Family). Jika terdapat kasus kalalah (tanpa anak/orang tua), saudara kandung, cucu, atau kasus kompleks lainnya (Awl/Radd), wajib berkonsultasi dengan Ulama atau Pengadilan Agama setempat.
          </p>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <BackButton />
      
      {step < 4 && (
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ScrollText className="h-8 w-8 text-blue-500" />
            <h1 className="text-3xl font-display font-bold">Kalkulator Waris</h1>
          </div>
          <p className="text-muted-foreground">Simulasi pembagian harta peninggalan (Faraid)</p>
          
          <div className="flex gap-2 justify-center mt-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`h-2 w-12 rounded-full transition-all ${step >= i ? "bg-blue-500" : "bg-muted"}`} />
            ))}
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 1 && <Step1 key="step1" />}
        {step === 2 && <Step2 key="step2" />}
        {step === 3 && <Step3 key="step3" />}
        {step === 4 && <Step4 key="step4" />}
      </AnimatePresence>
    </div>
  );
}

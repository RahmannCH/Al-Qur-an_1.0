"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSettingsStore } from "@/store/settings-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Target, Sparkles, ArrowRight } from "lucide-react";
import { sfx } from "@/lib/sfx";

export function OnboardingModal() {
  const { hasCompletedOnboarding, setUserName, setDailyTargetAyah, completeOnboarding } = useSettingsStore();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [target, setTarget] = useState(10);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || hasCompletedOnboarding) return null;

  const handleNext = () => {
    sfx.playTap();
    if (step === 1 && name.trim() !== "") {
      setStep(2);
    } else if (step === 2) {
      setUserName(name);
      setDailyTargetAyah(target);
      completeOnboarding();
      sfx.playSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-card p-8 rounded-3xl shadow-2xl w-full max-w-md border overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-primary/10 rounded-2xl text-primary">
                  <User className="h-8 w-8" />
                </div>
              </div>
              <h2 className="text-2xl font-display font-bold text-center mb-2">Ahlan wa Sahlan!</h2>
              <p className="text-muted-foreground text-center mb-8 text-sm">
                Selamat datang di Zadify. Yuk, mulai petualangan mengumpulkan bekal pertamamu!
              </p>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan namamu..."
                className="h-14 text-center text-lg font-bold rounded-xl mb-6"
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && name && handleNext()}
              />
              <Button
                onClick={handleNext}
                disabled={!name.trim()}
                className="w-full h-14 rounded-xl text-lg font-bold"
              >
                Lanjut <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gold/10 rounded-2xl text-gold">
                  <Target className="h-8 w-8" />
                </div>
              </div>
              <h2 className="text-2xl font-display font-bold text-center mb-2">Salam Kenal, {name}!</h2>
              <p className="text-muted-foreground text-center mb-8 text-sm">
                Berapa target bacaan Al-Qur'an harianmu untuk mengumpulkan Zad Points?
              </p>
              
              <div className="flex items-center justify-center gap-4 mb-8">
                <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl" onClick={() => setTarget(Math.max(1, target - 5))}>-</Button>
                <div className="w-24 text-center">
                  <p className="text-4xl font-display font-bold text-primary">{target}</p>
                  <p className="text-xs text-muted-foreground">Ayat / Hari</p>
                </div>
                <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl" onClick={() => setTarget(target + 5)}>+</Button>
              </div>

              <Button
                onClick={handleNext}
                className="w-full h-14 rounded-xl text-lg font-bold bg-gradient-to-r from-primary to-teal hover:from-primary/90 hover:to-teal/90"
              >
                <Sparkles className="mr-2 h-5 w-5" /> Mulai Zadify Harimu
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

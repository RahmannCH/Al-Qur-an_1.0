"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { useGamificationStore } from "@/store/gamification-store";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

export default function DzikirPage() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const { addXp, incrementDzikir } = useGamificationStore();

  const handleTap = () => {
    if (navigator.vibrate) navigator.vibrate(50);
    const newCount = count + 1;
    setCount(newCount);
    incrementDzikir(1);

    if (newCount === target) {
      if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
      addXp(10, `Tasbih ${target}x selesai`);
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  const progress = Math.min(100, (count / target) * 100);
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="mx-auto max-w-lg px-4 py-8 text-center min-h-[80vh] flex flex-col items-center justify-center relative">
      <BackButton />
      
      <div className="mb-12">
        <h1 className="text-4xl font-display font-bold mb-2">Tasbih Digital</h1>
        <p className="text-muted-foreground">Ketuk layar untuk berdzikir</p>
      </div>

      <div className="flex gap-2 mb-12">
        {[33, 100, 1000].map((t) => (
          <Button
            key={t}
            variant={target === t ? "default" : "outline"}
            className={target === t ? "bg-teal hover:bg-teal/90" : ""}
            onClick={() => { setTarget(t); setCount(0); }}
          >
            {t}x
          </Button>
        ))}
      </div>

      <div className="relative cursor-pointer select-none" onClick={handleTap}>
        <svg className="w-[300px] h-[300px] transform -rotate-90">
          <circle
            cx="150" cy="150" r={radius}
            className="stroke-muted/30"
            strokeWidth="20" fill="transparent"
          />
          <motion.circle
            cx="150" cy="150" r={radius}
            className="stroke-teal"
            strokeWidth="20" fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.p 
            key={count}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl font-display font-bold text-primary"
          >
            {count}
          </motion.p>
          <p className="text-muted-foreground mt-2 font-medium">/ {target}</p>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="mt-12 h-12 w-12 rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        onClick={handleReset}
      >
        <RefreshCcw className="h-5 w-5" />
      </Button>
    </div>
  );
}

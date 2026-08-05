"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <motion.button
      onClick={handleBack}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-20 left-4 z-40 p-2.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
      aria-label="Go back"
      title="Kembali (Tekan Escape)"
    >
      <ArrowLeft className="h-5 w-5" />
    </motion.button>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DuaCard } from "./dua-card";

interface Dua {
  id: number;
  name_id: string;
  name_ar: string;
  arabic_text: string;
  transliteration: string;
  translation_id: string;
  source: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function DuaGrid({ duas, categoryId }: { duas: Dua[]; categoryId: number }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {duas.map((dua) => (
        <motion.div key={dua.id} variants={item}>
          <DuaCard dua={dua} />
        </motion.div>
      ))}
    </motion.div>
  );
}

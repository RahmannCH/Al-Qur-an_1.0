"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Info, X, Volume2, BookOpen } from "lucide-react";
import { getTajweedLegend } from "@/lib/tajweed-parser";
import { sfx } from "@/lib/sfx";

export function TajweedLegendButton() {
  const [isOpen, setIsOpen] = useState(false);
  const legend = getTajweedLegend();

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setIsOpen(true);
          sfx.playTap();
        }}
        className="gap-2 rounded-xl"
      >
        <BookOpen className="h-4 w-4" />
        Panduan Tajwid
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-0 left-0 right-0 max-h-[80vh] bg-background rounded-t-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b flex items-center justify-between">
                <div>
                  <h2 className="font-display font-bold text-xl">Panduan Tajwid Berwarna</h2>
                  <p className="text-sm text-muted-foreground">Pelajari cara membaca dengan benar</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsOpen(false);
                    sfx.playTap();
                  }}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="overflow-y-auto p-6 space-y-4">
                {legend.map((item, idx) => (
                  <motion.div
                    key={item.class}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-4 rounded-2xl border bg-card hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`text-2xl font-arabic ${item.color} font-bold`}>
                        ن
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-bold ${item.color}`}>{item.name}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className={`text-sm font-arabic ${item.color}`}>
                            Contoh: قَلْب
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => {
                              sfx.playTap();
                            }}
                          >
                            <Volume2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                <div className="mt-6 p-4 bg-muted/50 rounded-xl text-center">
                  <p className="text-xs text-muted-foreground">
                    Ketuk ayat untuk melihat terjemahan. Aktifkan mode Tajwid di pengaturan untuk warna otomatis.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

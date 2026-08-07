"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, X, SkipBack, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sfx } from "@/lib/sfx";

interface SurahAudioPlayerProps {
  surahId: number;
  surahName: string;
  totalVerses: number;
  audioUrl: string;
  onAyahChange?: (ayahNumber: number) => void;
  onClose?: () => void;
}

export function SurahAudioPlayer({
  surahId,
  surahName,
  totalVerses,
  audioUrl,
  onAyahChange,
  onClose,
}: SurahAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentAyah, setCurrentAyah] = useState(1);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
      
      const estimatedAyah = Math.ceil((audio.currentTime / audio.duration) * totalVerses) || 1;
      if (estimatedAyah !== currentAyah && estimatedAyah <= totalVerses) {
        setCurrentAyah(estimatedAyah);
        onAyahChange?.(estimatedAyah);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      sfx.playSuccess();
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [totalVerses, currentAyah, onAyahChange]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
      sfx.playTap();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleClose = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsPlaying(false);
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-[400px] z-50"
      >
        <div className="bg-card/95 backdrop-blur-xl border rounded-2xl shadow-2xl p-4">
          <audio ref={audioRef} src={audioUrl} preload="metadata" />

          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-display font-bold text-sm">Murottal</p>
              <p className="text-xs text-muted-foreground">{surahName} • Ayat {currentAyah}/{totalVerses}</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="mb-3">
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-teal"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-muted-foreground">{formatTime(currentTime)}</span>
              <span className="text-[10px] text-muted-foreground">{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full"
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.currentTime = Math.max(0, currentTime - 10);
                }
              }}
            >
              <SkipBack className="h-4 w-4" />
            </Button>

            <Button
              onClick={togglePlay}
              className="h-14 w-14 rounded-full bg-gradient-to-r from-primary to-teal hover:scale-105 transition-transform shadow-lg"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6 text-white" />
              ) : (
                <Play className="h-6 w-6 text-white ml-0.5" />
              )}
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full"
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.currentTime = Math.min(duration, currentTime + 10);
                }
              }}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

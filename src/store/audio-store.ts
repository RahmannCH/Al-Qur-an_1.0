import { create } from "zustand";

interface AudioStore {
  isPlaying: boolean;
  currentVerseKey: string | null;
  currentSurahId: number | null;
  setPlaying: (playing: boolean) => void;
  setCurrentVerse: (verseKey: string | null) => void;
  setCurrentSurah: (surahId: number | null) => void;
  reset: () => void;
}

export const useAudioStore = create<AudioStore>((set) => ({
  isPlaying: false,
  currentVerseKey: null,
  currentSurahId: null,
  setPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentVerse: (currentVerseKey) => set({ currentVerseKey }),
  setCurrentSurah: (currentSurahId) => set({ currentSurahId }),
  reset: () => set({ isPlaying: false, currentVerseKey: null, currentSurahId: null }),
}));

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { downloadSurahFull, getDownloadedSurahIds } from "@/lib/offline-quran";

interface OfflineStore {
  downloadedSurahs: number[];
  downloadingSurahs: number[];
  downloadProgress: Record<number, string>;
  
  refreshDownloadedList: () => Promise<void>;
  downloadSurah: (surahId: number) => Promise<void>;
  isDownloaded: (surahId: number) => boolean;
  isDownloading: (surahId: number) => boolean;
}

export const useOfflineStore = create<OfflineStore>()(
  persist(
    (set, get) => ({
      downloadedSurahs: [],
      downloadingSurahs: [],
      downloadProgress: {},

      refreshDownloadedList: async () => {
        const ids = await getDownloadedSurahIds();
        set({ downloadedSurahs: ids });
      },

      downloadSurah: async (surahId: number) => {
        if (get().downloadingSurahs.includes(surahId)) return;
        
        set((s) => ({
          downloadingSurahs: [...s.downloadingSurahs, surahId],
          downloadProgress: { ...s.downloadProgress, [surahId]: "Memulai unduhan..." }
        }));

        try {
          await downloadSurahFull(surahId, (msg) => {
            set((s) => ({
              downloadProgress: { ...s.downloadProgress, [surahId]: msg }
            }));
          });
          
          const ids = await getDownloadedSurahIds();
          set((s) => ({
            downloadedSurahs: ids,
            downloadingSurahs: s.downloadingSurahs.filter((id) => id !== surahId),
            downloadProgress: { ...s.downloadProgress, [surahId]: "Tersedia Offline" }
          }));
        } catch (err: any) {
          set((s) => ({
            downloadingSurahs: s.downloadingSurahs.filter((id) => id !== surahId),
            downloadProgress: { ...s.downloadProgress, [surahId]: "Gagal unduh: " + (err?.message || "Error") }
          }));
        }
      },

      isDownloaded: (surahId: number) => get().downloadedSurahs.includes(surahId),
      isDownloading: (surahId: number) => get().downloadingSurahs.includes(surahId),
    }),
    { name: "zadify-offline-store" }
  )
);

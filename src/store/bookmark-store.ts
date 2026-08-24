import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createIndexedDBStorage } from "@/lib/idb-storage";

interface BookmarkItem {
  verseKey: string;
  surahName: string;
  text: string;
  timestamp: number;
}

interface BookmarkStore {
  bookmarks: BookmarkItem[];
  addBookmark: (item: BookmarkItem) => void;
  removeBookmark: (verseKey: string) => void;
  isBookmarked: (verseKey: string) => boolean;
}

export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      addBookmark: (item) =>
        set((s) => ({ bookmarks: [...s.bookmarks, item] })),
      removeBookmark: (verseKey) =>
        set((s) => ({ bookmarks: s.bookmarks.filter((b) => b.verseKey !== verseKey) })),
      isBookmarked: (verseKey) => get().bookmarks.some((b) => b.verseKey === verseKey),
    }),
    {
      name: "quran-bookmarks",
      storage: createJSONStorage(() => createIndexedDBStorage()),
    }
  )
);

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createIndexedDBStorage } from "@/lib/idb-storage";

export interface TadabburNote {
  id: string;
  verseKey: string;
  surahName: string;
  arabicText: string;
  translation: string;
  reflection: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

interface TadabburStore {
  notes: TadabburNote[];
  
  addNote: (note: Omit<TadabburNote, "id" | "createdAt" | "updatedAt">) => void;
  updateNote: (id: string, reflection: string, tags?: string[]) => void;
  deleteNote: (id: string) => void;
  getNoteByVerse: (verseKey: string) => TadabburNote | undefined;
  searchNotes: (query: string) => TadabburNote[];
}

export const useTadabburStore = create<TadabburStore>()(
  persist(
    (set, get) => ({
      notes: [],

      addNote: (note) => {
        const now = Date.now();
        const newNote: TadabburNote = {
          ...note,
          id: now.toString() + Math.random().toString(36).slice(2, 8),
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ notes: [newNote, ...state.notes] }));
      },

      updateNote: (id, reflection, tags) => {
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id
              ? { ...n, reflection, tags: tags ?? n.tags, updatedAt: Date.now() }
              : n
          ),
        }));
      },

      deleteNote: (id) => {
        set((state) => ({ notes: state.notes.filter((n) => n.id !== id) }));
      },

      getNoteByVerse: (verseKey) => {
        return get().notes.find((n) => n.verseKey === verseKey);
      },

      searchNotes: (query) => {
        const q = query.toLowerCase();
        return get().notes.filter(
          (n) =>
            n.reflection.toLowerCase().includes(q) ||
            n.surahName.toLowerCase().includes(q) ||
            n.tags.some((t) => t.toLowerCase().includes(q))
        );
      },
    }),
    {
      name: "zadify-tadabbur-storage",
      storage: createJSONStorage(() => createIndexedDBStorage()),
    }
  )
);

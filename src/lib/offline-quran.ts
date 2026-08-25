// Offline Quran Storage Engine using IndexedDB & Cache API
import { getChapters, getVerses, getChapterTimestamps } from "./api";
import type { Chapter, VersesResponse } from "@/types/quran";

const DB_NAME = "zadify-offline-quran";
const DB_VERSION = 1;
const SURAH_STORE = "surahs";
const VERSES_STORE = "verses";
const METADATA_STORE = "meta";

function openQuranDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      return reject(new Error("IDB unavailable on server"));
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(SURAH_STORE)) {
        db.createObjectStore(SURAH_STORE, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(VERSES_STORE)) {
        db.createObjectStore(VERSES_STORE, { keyPath: "chapterId" });
      }
      if (!db.objectStoreNames.contains(METADATA_STORE)) {
        db.createObjectStore(METADATA_STORE, { keyPath: "key" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function saveOfflineSurahList(chapters: Chapter[]): Promise<void> {
  const db = await openQuranDB();
  const tx = db.transaction(SURAH_STORE, "readwrite");
  const store = tx.objectStore(SURAH_STORE);
  for (const c of chapters) {
    store.put(c);
  }
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getOfflineSurahList(): Promise<Chapter[] | null> {
  try {
    const db = await openQuranDB();
    const tx = db.transaction(SURAH_STORE, "readonly");
    const store = tx.objectStore(SURAH_STORE);
    const req = store.getAll();
    return new Promise((resolve, reject) => {
      req.onsuccess = () => {
        const res = req.result;
        resolve(res && res.length > 0 ? res : null);
      };
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
}

export async function saveOfflineVerses(chapterId: number, data: VersesResponse): Promise<void> {
  const db = await openQuranDB();
  const tx = db.transaction(VERSES_STORE, "readwrite");
  const store = tx.objectStore(VERSES_STORE);
  store.put({ chapterId, data, downloadedAt: Date.now() });
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getOfflineVerses(chapterId: number): Promise<VersesResponse | null> {
  try {
    const db = await openQuranDB();
    const tx = db.transaction(VERSES_STORE, "readonly");
    const store = tx.objectStore(VERSES_STORE);
    const req = store.get(chapterId);
    return new Promise((resolve, reject) => {
      req.onsuccess = () => resolve(req.result ? req.result.data : null);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
}

export async function isSurahDownloaded(chapterId: number): Promise<boolean> {
  try {
    const db = await openQuranDB();
    const tx = db.transaction(VERSES_STORE, "readonly");
    const store = tx.objectStore(VERSES_STORE);
    const req = store.count(chapterId);
    return new Promise((resolve, reject) => {
      req.onsuccess = () => resolve(req.result > 0);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return false;
  }
}

export async function getDownloadedSurahIds(): Promise<number[]> {
  try {
    const db = await openQuranDB();
    const tx = db.transaction(VERSES_STORE, "readonly");
    const store = tx.objectStore(VERSES_STORE);
    const req = store.getAllKeys();
    return new Promise((resolve, reject) => {
      req.onsuccess = () => resolve((req.result as number[]) || []);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return [];
  }
}

export async function downloadSurahFull(
  chapterId: number,
  onProgress?: (msg: string) => void
): Promise<void> {
  onProgress?.("Mengunduh ayat...");
  const data = await getVerses(chapterId, 1, 300, "id");
  await saveOfflineVerses(chapterId, data);
  try {
    await getChapterTimestamps(chapterId);
  } catch {}
  onProgress?.("Selesai!");
}

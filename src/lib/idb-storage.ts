import { StateStorage } from "zustand/middleware";

function getIDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      return reject(new Error("IndexedDB is not available on server"));
    }

    const request = indexedDB.open("zadify-heavy-storage", 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("keyval")) {
        db.createObjectStore("keyval");
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export const createIndexedDBStorage = (): StateStorage => ({
  getItem: async (name: string): Promise<string | null> => {
    if (typeof window === "undefined") return null;
    try {
      const db = await getIDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction("keyval", "readonly");
        const store = tx.objectStore("keyval");
        const request = store.get(name);

        request.onsuccess = () => resolve(request.result ?? null);
        request.onerror = () => reject(request.error);
      });
    } catch {
      return localStorage.getItem(name);
    }
  },

  setItem: async (name: string, value: string): Promise<void> => {
    if (typeof window === "undefined") return;
    try {
      const db = await getIDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction("keyval", "readwrite");
        const store = tx.objectStore("keyval");
        const request = store.put(value, name);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch {
      localStorage.setItem(name, value);
    }
  },

  removeItem: async (name: string): Promise<void> => {
    if (typeof window === "undefined") return;
    try {
      const db = await getIDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction("keyval", "readwrite");
        const store = tx.objectStore("keyval");
        const request = store.delete(name);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch {
      localStorage.removeItem(name);
    }
  },
});

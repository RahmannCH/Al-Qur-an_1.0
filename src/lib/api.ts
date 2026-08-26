import type {
  ChaptersResponse,
  VersesResponse,
  JuzsResponse,
  Chapter,
  Reciter,
} from "@/types/quran";

const BASE_URL = "https://api.quran.com/api/v4";

async function fetcher<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  const res = await fetch(url.toString(), { next: { revalidate: 86400 } });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function getChapters(language = "id"): Promise<Chapter[]> {
  const data = await fetcher<ChaptersResponse>("/chapters", { language });
  return data.chapters;
}

export async function getChapter(id: number, language = "id"): Promise<Chapter> {
  const data = await fetcher<{ chapter: Chapter }>(`/chapters/${id}`, { language });
  return data.chapter;
}

export async function getVerses(
  chapterId: number,
  page = 1,
  perPage = 50,
  language = "id"
): Promise<VersesResponse> {
  return fetcher<VersesResponse>(`/verses/by_chapter/${chapterId}`, {
    language,
    words: "true",
    translations: "33,57",
    fields: "text_uthmani,text_uthmani_tajweed",
    word_fields: "text_uthmani,transliteration",
    translation_fields: "resource_name,text",
    page: String(page),
    per_page: String(perPage),
  });
}

export async function getJuzs(): Promise<JuzsResponse> {
  return fetcher<JuzsResponse>("/juzs");
}

export async function getReciters(language = "en"): Promise<Reciter[]> {
  const data = await fetcher<{ reciters: Reciter[] }>("/resources/recitations", { language });
  return data.reciters;
}

export interface AyahTimestamp {
  verse_key: string;
  timestamp_from: number;
  timestamp_to: number;
  duration: number;
}

export const ALAFASY_MURATTAL_RECITER_ID = 7;

export function getAudioUrl(reciterId: number, chapterId: number): string {
  return `https://cdn.islamic.network/quran/audio-surah/${reciterId}/ar.alafasy/${chapterId}.mp3`;
}

export async function getChapterTimestamps(
  chapterId: number,
  reciterId = ALAFASY_MURATTAL_RECITER_ID
): Promise<AyahTimestamp[]> {
  const data = await fetcher<{ audio_file?: { timestamps?: AyahTimestamp[] } }>(
    `/chapter_recitations/${reciterId}/${chapterId}`,
    { segments: "true" }
  );
  return data.audio_file?.timestamps ?? [];
}

export function getVerseAudioUrl(surahId: number, verseNumber: number): string {
  const pad = (n: number) => String(n).padStart(3, "0");
  return `https://verses.quran.com/Alafasy/mp3/${pad(surahId)}${pad(verseNumber)}.mp3`;
}

export async function searchQuran(query: string, language = "id", page = 1) {
  // Jika di browser (client-side), panggil proxy internal /api/search agar aman dari stopword filter
  if (typeof window !== "undefined") {
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&language=${language}&page=${page}&size=20`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("Internal search API failed, falling back to direct:", e);
    }
  }

  return fetcher<{
    search: {
      query: string;
      total_results: number;
      current_page: number;
      total_pages: number;
      results: Array<{
        verse_key: string;
        text: string;
        translations: Array<{ text: string; name?: string }>;
      }>;
    };
  }>("/search", {
    q: query,
    language,
    size: "20",
    page: String(page),
  });
}

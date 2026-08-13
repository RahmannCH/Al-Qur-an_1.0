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
    translations: "33",
    fields: "text_uthmani,text_uthmani_tajweed",
    word_fields: "text_uthmani",
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

export function getVerseAudioUrl(reciterId: number, verseKey: string): string {
  return `https://api.quran.com/api/v4/recitations/${reciterId}/by_ayah/${verseKey}`;
}

export async function searchQuran(query: string, language = "id", page = 1) {
  return fetcher<{ search: { results: Array<{ verse_key: string; text: string; translations: Array<{ text: string }> }> } }>("/search", {
    q: query,
    language,
    size: "20",
    page: String(page),
  });
}

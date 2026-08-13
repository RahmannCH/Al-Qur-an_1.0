export interface Chapter {
  id: number;
  revelation_place: "makkah" | "madinah";
  revelation_order: number;
  bismillah_pre: boolean;
  name_simple: string;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  pages: number[];
  translated_name: {
    language_name: string;
    name: string;
  };
}

export interface Verse {
  id: number;
  verse_number: number;
  verse_key: string;
  hizb_number: number;
  rub_el_hizb_number: number;
  ruku_number: number;
  manzil_number: number;
  sajdah_number: number | null;
  page_number: number;
  juz_number: number;
  text_uthmani: string;
  text_uthmani_tajweed?: string;
  text_imlaei?: string;
  words?: Word[];
  translations?: Translation[];
  audio?: VerseAudio;
}

export interface Word {
  id: number;
  position: number;
  text_uthmani: string;
  translation: {
    text: string;
    language_name: string;
  };
  transliteration: {
    text: string;
    language_name: string;
  };
}

export interface Translation {
  id: number;
  resource_id: number;
  text: string;
  resource_name?: string;
}

export interface VerseAudio {
  url: string;
}

export interface AudioFile {
  url: string;
  duration: number;
  format: string;
  verse_timings?: VerseTiming[];
}

export interface VerseTiming {
  verse_key: string;
  timestamp_from: number;
  timestamp_to: number;
}

export interface Reciter {
  id: number;
  reciter_name: string;
  style: string | null;
  translated_name: {
    name: string;
    language_name: string;
  };
}

export interface Juz {
  id: number;
  juz_number: number;
  verse_mapping: Record<string, string>;
  first_verse_id: number;
  last_verse_id: number;
  verses_count: number;
}

export interface PaginationMeta {
  current_page: number;
  next_page: number | null;
  per_page: number;
  total_pages: number;
  total_records: number;
}

export interface ChaptersResponse {
  chapters: Chapter[];
}

export interface VersesResponse {
  verses: Verse[];
  pagination: PaginationMeta;
}

export interface JuzsResponse {
  juzs: Juz[];
}

import type { Word } from "@/types/quran";

// Normalisasi karakter Arab (menghapus harakat & menyatukan bentuk alif/ya/ta marbuthah)
export function removeHarakat(text: string): string {
  if (!text) return "";
  return text
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, "")
    .replace(/[إأآٱ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي");
}

// Stemming sederhana kata Bahasa Indonesia
export function stemIndonesianWord(word: string): string {
  if (!word) return "";
  let w = word.toLowerCase().trim();
  
  w = w.replace(/[^a-z0-9]/g, "");
  w = w.replace(/(kah|lah|pun|mu|nya|ku)$/g, "");
  w = w.replace(/(kan|an|i)$/g, "");
  w = w.replace(/^(memper|meng|men|mem|me|ber|ter|di|se)/g, "");

  return w;
}

// Kamus kata kunci Al-Qur'an terisolasi secara presisi
const COMMON_WORD_MAP: Record<string, string[]> = {
  allah: ["الله", "لله", "بالله", "والله", "تالله"],
  jika: ["ان", "اذا", "لو", "لئن", "فان", "وان"],
  jikalau: ["لو", "لئن", "ولو", "ولئن"],
  kalau: ["ان", "اذا", "لو", "لئن"],
  apabila: ["اذا", "فاذا", "واذا", "لما"],
  maka: ["فان", "فمن", "فهو", "فهم", "فلا", "فما"],
  tidak: ["لا", "ما", "لم", "لن", "ليس", "ليست"],
  bukan: ["ليس", "غير", "دون"],
  kecuali: ["الا", "غير", "سوي"],
  sungguh: ["ان", "قد", "لقد", "وان", "فان", "لئن"],
  sesungguhnya: ["ان", "انما", "بان", "وان", "فان"],
  tuhan: ["رب", "ربك", "ربهم", "ربنا", "ربي", "ربه"],
  bumi: ["ارض", "الارض", "بارض", "والارض"],
  langit: ["سماء", "السماء", "سموات", "السموات"],
  surga: ["جنه", "الجنه", "جنات", "الجنات"],
  neraka: ["نار", "النار", "جهنم", "سعير", "الجحيم"],
  sabar: ["صبر", "الصبر", "صابرين", "الصابرين", "اصبر"],
  shalat: ["صلوه", "الصلوه", "صلاتهم", "صلاتي"],
  sholat: ["صلوه", "الصلوه", "صلاتهم", "صلاتي"],
  zakat: ["زكوه", "الزكوه", "زكاتهم"],
  puasa: ["صيام", "الصيام", "صائمين", "تصوموا"],
  haji: ["حج", "الحج", "حجه"],
  mati: ["موت", "الموت", "ميت", "ميتون"],
  hidup: ["حي", "الحي", "احياء", "حياه"],
  ampunan: ["مغفره", "المغفره", "غفور", "الغفور", "استغفر"],
  pengampun: ["غفور", "الغفور", "غفار", "الغفار"],
  rezeki: ["رزق", "الرزق", "رزقناهم", "يرزق"],
  cahaya: ["نور", "النور", "نورهم"],
  kebenaran: ["حق", "الحق", "بالحق"],
  hati: ["قلب", "القلب", "قلوب", "القلوب", "صدور"],
  orangtua: ["والدين", "الوالدين", "والدي"],
  ibu: ["ام", "امه", "امك"],
  ayah: ["اب", "اباه", "اباك"],
  anak: ["ابن", "ابنه", "بنين", "بنات", "اولاد"],
  manusia: ["ناس", "الناس", "انسان", "الانسان"],
  orang: ["الذين", "قوم", "القوم"],
  iman: ["امن", "امنوا", "مؤمن", "المؤمن", "مؤمنين"],
  kafir: ["كفر", "كفروا", "كافر", "الكافر", "كافرين"],
  petunjuk: ["هدي", "الهدي", "مهتدين", "يهدي"],
  sesat: ["ضل", "ضلوا", "ضالين", "الضالين"],
  pahala: ["اجر", "الاجر", "ثواب", "الثواب"],
  dosa: ["ذنب", "ذنوب", "اثم", "الاثم", "سيئات"],
  hari: ["يوم", "اليوم", "ايام", "الايام"],
  kiamat: ["ساعه", "الساعه", "قيامه", "القيامه"],
  adil: ["عدل", "العدل", "قسط", "القسط"],
  zalim: ["ظلم", "ظلموا", "ظالم", "الظالم", "ظالمين"],
  cinta: ["حب", "يحب", "يحبهم"],
  takut: ["خوف", "الخوف", "يخافون", "تقوي"],
  taqwa: ["تقوي", "التقوي", "متقين", "المتقين"],
  ilmu: ["علم", "العلم", "يعلم", "يعلمون"],
  baca: ["اقرا", "يتلون", "تلاوه", "قران"],
  alquran: ["قران", "القران", "كتاب", "الكتاب"],
  malaikat: ["ملك", "الملك", "ملائكه", "الملائكه"],
  rasul: ["رسول", "الرسول", "رسل", "الرسل"],
  nabi: ["نبي", "النبي", "انبياء", "الانبياء"],
  doa: ["دعاء", "الدعاء", "ادعوني", "يدعون"],
  syukur: ["شكر", "الشكر", "شاكرين", "الشاكرين"],
  saksi: ["شهد", "شاهد", "شهيد", "الشهداء"],
  rahmat: ["رحمه", "الرحمه", "رحيم", "الرحيم", "رحمن"],
  penyayang: ["رحيم", "الرحيم", "رحمن", "الرحمن"],
  pengasih: ["رحمن", "الرحمن", "رؤوف"],
  perang: ["قتال", "القتال", "قاتلوا", "جهاد"],
  damai: ["سلم", "السلم", "سلام", "السلام"],
  janji: ["وعد", "الوعد", "عهد", "العهد"],
  waktu: ["عصر", "العصر", "فجر", "الفجر", "ضحى"],
  malam: ["ليل", "الليل", "ليله", "ليال"],
  siang: ["نهار", "النهار"],
  pagi: ["فجر", "الفجر", "صبح", "الصبح"],
  sore: ["عشي", "العشي", "اصيل"],
  sedekah: ["صدقه", "الصدقه", "صدقات", "انفقوا"],
  harta: ["مال", "المال", "اموال", "اموالهم"],
};

export function extractTargetArabicStems(query: string): string[] {
  if (!query) return [];
  const cleanQ = query.toLowerCase().trim();
  const words = cleanQ.split(/\s+/).map((w) => w.replace(/[^a-z0-9]/g, ""));
  
  const stems = new Set<string>();

  for (const w of words) {
    if (!w || w.length < 2) continue;
    if (COMMON_WORD_MAP[w]) {
      COMMON_WORD_MAP[w].forEach((s) => stems.add(s));
    }
    const stemmed = stemIndonesianWord(w);
    if (stemmed && stemmed.length >= 3 && COMMON_WORD_MAP[stemmed]) {
      COMMON_WORD_MAP[stemmed].forEach((s) => stems.add(s));
    }
  }

  return Array.from(stems);
}

// 100% Dynamic Matcher: Mencocokkan kata Arab dari data `words` per kata API
export function isWordMatchingQuery(
  word: Word,
  searchQuery: string,
  targetStems: string[]
): boolean {
  if (!searchQuery || !searchQuery.trim()) return false;
  const q = searchQuery.toLowerCase().trim();
  const qWords = q.split(/\s+/).map((w) => w.replace(/[^a-z0-9]/g, "")).filter((w) => w.length >= 2);

  if (qWords.length === 0) return false;

  // 1. Cek terjemahan kata Indonesia (word.translation.text)
  if (word.translation?.text) {
    const wordTrans = word.translation.text.toLowerCase().replace(/[^a-z0-9\s]/g, "");
    for (const qw of qWords) {
      if (qw.length >= 2 && wordTrans.includes(qw)) {
        return true;
      }
      const stemmedQw = stemIndonesianWord(qw);
      if (stemmedQw.length >= 3 && wordTrans.includes(stemmedQw)) {
        return true;
      }
    }
  }

  // 2. Cek transliterasi Latin kata (word.transliteration.text)
  if (word.transliteration?.text) {
    const wordLatin = word.transliteration.text.toLowerCase().replace(/[^a-z0-9]/g, "");
    for (const qw of qWords) {
      if (qw.length >= 2 && wordLatin.includes(qw)) {
        return true;
      }
    }
  }

  // 3. Cek pencocokan kata Arab murni (strictly isolated)
  if (word.text_uthmani) {
    const normalizedWord = removeHarakat(word.text_uthmani);
    const normalizedQuery = removeHarakat(q);
    if (normalizedQuery && normalizedQuery.length >= 2 && normalizedWord.includes(normalizedQuery)) {
      return true;
    }
    for (const stem of targetStems) {
      if (stem.length <= 2) {
        if (normalizedWord === stem) return true;
      } else {
        if (normalizedWord === stem || normalizedWord.includes(stem)) return true;
      }
    }
  }

  return false;
}

export function isArabicWordMatched(arabicWord: string, targetStems: string[], rawQuery: string): boolean {
  if (!arabicWord || !rawQuery.trim() || targetStems.length === 0) return false;
  const normalizedWord = removeHarakat(arabicWord);

  const normalizedQuery = removeHarakat(rawQuery.trim());
  if (normalizedQuery && normalizedQuery.length >= 2 && normalizedWord.includes(normalizedQuery)) {
    return true;
  }

  for (const stem of targetStems) {
    if (stem.length <= 2) {
      if (normalizedWord === stem) return true;
    } else {
      if (normalizedWord === stem || normalizedWord.includes(stem)) return true;
    }
  }

  return false;
}

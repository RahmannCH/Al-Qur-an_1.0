// --- ARABIC NORMALIZATION ---
export function removeHarakat(text: string): string {
  if (!text) return "";
  return text
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, "")
    .replace(/[إأآٱ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي");
}

// --- VOCABULARY DICTIONARY ---
const COMMON_WORD_MAP: Record<string, string[]> = {
  allah: ["الله", "لله", "بالله", "والله", "تالله"],
  sungguh: ["ان", "قد", "لقد", "وان", "فان", "لئن"],
  sesungguhnya: ["ان", "انما", "بان", "وان", "فان"],
  tuhan: ["رب", "ربك", "ربهم", "ربنا", "ربي", "ربه"],
  bumi: ["ارض", "الارض", "بارض", "والارض", "فالارض"],
  langit: ["سماء", "السماء", "سموات", "السموات", "والسماء", "والسموات"],
  surga: ["جنه", "الجنه", "جنات", "الجنات", "بجنه", "والجنه"],
  neraka: ["نار", "النار", "جهنم", "سعير", "وبئس", "سقر", "الجحيم", "جحيم"],
  sabar: ["صبر", "الصبر", "صابرين", "الصابرين", "اصبر", "فاصبر", "صبروا"],
  shalat: ["صلوه", "الصلوه", "صلاتهم", "صلاتي", "يقيمون", "مقيم"],
  sholat: ["صلوه", "الصلوه", "صلاتهم", "صلاتي", "يقيمون", "مقيم"],
  zakat: ["زكوه", "الزكوه", "زكاتهم"],
  puasa: ["صيام", "الصيام", "صائمين", "تصوموا", "صوم"],
  haji: ["حج", "الحج", "حجه"],
  mati: ["موت", "الموت", "ميت", "ميتون", "يموت", "توفى", "مات"],
  hidup: ["حي", "الحي", "احياء", "حياه", "الحياه", "يحيي"],
  ampunan: ["مغفره", "المغفره", "غفور", "الغفور", "غفار", "استغفر", "يغفر"],
  pengampun: ["غفور", "الغفور", "غفار", "الغفار"],
  rezeki: ["رزق", "الرزق", "رزقناهم", "يرزق", "رازقين", "الرازقين"],
  cahaya: ["نور", "النور", "نورهم", "ضياء"],
  kebenaran: ["حق", "الحق", "بالحق"],
  hati: ["قلب", "القلب", "قلوب", "القلوب", "قلوبهم", "قلبي", "صدور", "الصدور"],
  orangtua: ["والدين", "الوالدين", "والدي", "ابويه"],
  ibu: ["ام", "امه", "امك", "والدتي"],
  ayah: ["اب", "اباه", "اباك", "والدي", "ابراهيم"],
  anak: ["ابن", "ابنه", "بنين", "بنات", "اولاد", "ذريه"],
  manusia: ["ناس", "الناس", "انسان", "الانسان", "بشر"],
  orang: ["الذين", "قوم", "القوم", "رجال"],
  iman: ["امن", "امنوا", "مؤمن", "المؤمن", "مؤمنين", "المؤمنين", "ايمان"],
  kafir: ["كفر", "كفروا", "كافر", "الكافر", "كافرين", "الكافرين", "كفار"],
  petunjuk: ["هدي", "الهدي", "مهتدين", "يهدي", "اهدنا"],
  sesat: ["ضل", "ضلوا", "ضالين", "الضالين", "ضلال"],
  pahal: ["اجر", "الاجر", "ثواب", "الثواب", "جزاء"],
  dosa: ["ذنب", "ذنوب", "اثم", "الاثم", "سيئات", "خطيئه"],
  hari: ["يوم", "اليوم", "ايام", "الايام"],
  kiamat: ["ساعه", "الساعه", "قيامه", "القيامه", "واقعه", "القارعه", "حاقه"],
  adil: ["عدل", "العدل", "قسط", "القسط", "مقسطين"],
  zalim: ["ظلم", "ظلموا", "ظالم", "الظالم", "ظالمين", "الظالمين"],
  cinta: ["حب", "يحب", "يحبهم", "محبه"],
  takut: ["خوف", "الخوف", "يخافون", "خيفه", "تقوي", "اتقوا"],
  taqwa: ["تقوي", "التقوي", "متقين", "المتقين", "اتقوا", "تتقون"],
  ilmu: ["علم", "العلم", "يعلم", "يعلمون", "علماء"],
  baca: ["اقرا", "يتلون", "تلاوه", "قران", "القران"],
  alquran: ["قران", "القران", "كتاب", "الكتاب", "ذكر", "الذكر"],
  malaikat: ["ملك", "الملك", "ملائكه", "الملائكه", "جبريل", "ميكائيل"],
  rasul: ["رسول", "الرسول", "رسل", "الرسل", "مرسلين"],
  nabi: ["نبي", "النبي", "انبياء", "الانبياء", "نبيين"],
  doa: ["دعاء", "الدعاء", "ادعوني", "يدعون", "دعوا"],
  syukur: ["شكر", "الشكر", "شاكرين", "الشاكرين", "تشكرون", "شكور"],
  saksi: ["شهد", "شاهد", "شهيد", "الشهيد", "شهداء", "يشهدون"],
  rahmat: ["رحمه", "الرحمه", "رحيم", "الرحيم", "رحمن", "الرحمن", "يرحم"],
  penyayang: ["رحيم", "الرحيم", "رحمن", "الرحمن", "راحمين"],
  pengasih: ["رحمن", "الرحمن", "رؤوف"],
  perang: ["قتال", "القتال", "قاتلوا", "جهاد", "حرب"],
  damai: ["سلم", "السلم", "سلام", "السلام", "صلح"],
  janji: ["وعد", "الوعد", "عهد", "العهد", "ميثاق"],
  waktu: ["عصر", "العصر", "فجر", "الفجر", "ضحى", "الضحى", "ليل", "الليل", "نهار", "النهار"],
  malam: ["ليل", "الليل", "ليله", "ليال"],
  siang: ["نهار", "النهار", "ضحى"],
  pagi: ["فجر", "الفجر", "غدوه", "بكره", "صبح", "الصبح"],
  sore: ["عشي", "العشي", "اصيل", "الاصيل", "مغرب"],
  sedekah: ["صدقه", "الصدقه", "صدقات", "انفقوا", "ينفقون", "انفاق"],
  harta: ["مال", "المال", "اموال", "اموالهم", "اموالكم"],
};

// --- QUERY MATCHING UTILITIES ---
export function extractTargetArabicStems(query: string): string[] {
  if (!query) return [];
  const cleanQ = query.toLowerCase().trim();
  const words = cleanQ.split(/\s+/).map((w) => w.replace(/[^a-z0-9]/g, ""));
  
  const stems = new Set<string>();

  // Check direct query match
  for (const w of words) {
    if (!w) continue;
    if (COMMON_WORD_MAP[w]) {
      COMMON_WORD_MAP[w].forEach((stem) => stems.add(stem));
    }
  }

  // Check 2-word phrase matches
  for (let i = 0; i < words.length - 1; i++) {
    const phrase = `${words[i]}${words[i + 1]}`;
    if (COMMON_WORD_MAP[phrase]) {
      COMMON_WORD_MAP[phrase].forEach((stem) => stems.add(stem));
    }
  }

  return Array.from(stems);
}

export function isArabicWordMatched(arabicWord: string, targetStems: string[], rawQuery: string): boolean {
  if (!arabicWord) return false;
  const normalizedWord = removeHarakat(arabicWord);

  // 1. Direct Arabic query search match
  const normalizedQuery = removeHarakat(rawQuery.trim());
  if (normalizedQuery && normalizedQuery.length >= 2 && normalizedWord.includes(normalizedQuery)) {
    return true;
  }

  // 2. Dictionary stems match
  for (const stem of targetStems) {
    if (normalizedWord === stem || normalizedWord.includes(stem)) {
      return true;
    }
  }

  return false;
}

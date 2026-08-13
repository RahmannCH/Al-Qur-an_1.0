"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, RefreshCw, Loader2, Quote } from "lucide-react";
import Link from "next/link";

interface CuratedAyah {
  surahId: number;
  verseNumber: number;
  surahName: string;
  translation: string;
  quote: string;
  quoteAuthor: string;
}

// Bank inspirasi ayat yang dikurasi — ayat bermakna (tanpa Muqatta'at)
// dipadukan dengan renungan dari ulama & tokoh.
const CURATED_AYAT: CuratedAyah[] = [
  {
    surahId: 94,
    verseNumber: 6,
    surahName: "Asy-Syarh",
    translation:
      "Sesungguhnya bersama setiap kesulitan ada kemudahan. Maka apabila engkau telah selesai (dari suatu urusan), tetaplah bekerja keras (untuk urusan yang lain).",
    quote:
      "Hidup itu seperti naik sepeda. Untuk menjaga keseimbangan, kamu harus terus bergerak maju.",
    quoteAuthor: "Ki Hajar Dewantara",
  },
  {
    surahId: 93,
    verseNumber: 5,
    surahName: "Ad-Dhuha",
    translation:
      "Dan kelak Tuhanmu pasti memberikan karunia-Nya kepadamu, lalu (hatimu) menjadi puas.",
    quote:
      "Bersyukurlah di kala sempit, maka Allah akan melapangkanmu di kala lapang.",
    quoteAuthor: "Imam Al-Ghazali",
  },
  {
    surahId: 2,
    verseNumber: 286,
    surahName: "Al-Baqarah",
    translation:
      "Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya.",
    quote:
      "Janganlah engkau menjadi hamba orang lain, karena Allah telah menjadikanmu merdeka.",
    quoteAuthor: "Ali bin Abi Thalib",
  },
  {
    surahId: 13,
    verseNumber: 28,
    surahName: "Ar-Ra'd",
    translation:
      "(Yaitu) orang-orang yang beriman dan hati mereka menjadi tenteram dengan mengingat Allah. Ingatlah, hanya dengan mengingat Allah hati menjadi tenteram.",
    quote:
      "Hati yang bersih adalah taman yang dipenuhi kedamaian, dan ia tumbuh subur dengan zikir kepada Allah.",
    quoteAuthor: "Syaikh Abdul Qadir Al-Jailani",
  },
  {
    surahId: 3,
    verseNumber: 139,
    surahName: "Ali 'Imran",
    translation:
      "Janganlah kamu bersikap lemah, dan jangan pula bersedih hati, padahal kamulah orang-orang yang paling tinggi (derajatnya), jika kamu orang-orang yang beriman.",
    quote:
      "Jadilah seperti pohon yang rindang; diam namun meneduhkan, teguh namun tidak menyakiti.",
    quoteAuthor: "Ibnu 'Atha'illah As-Sakandari",
  },
  {
    surahId: 39,
    verseNumber: 53,
    surahName: "Az-Zumar",
    translation:
      "Katakanlah, 'Wahai hamba-hamba-Ku yang melampaui batas terhadap diri mereka sendiri! Janganlah kamu berputus asa dari rahmat Allah. Sesungguhnya Allah mengampuni dosa-dosa semuanya.'",
    quote:
      "Putus asa itu kufur, sedangkan rahmat Allah itu lebih luas dari dosa kita.",
    quoteAuthor: "Umar bin Khattab",
  },
  {
    surahId: 14,
    verseNumber: 7,
    surahName: "Ibrahim",
    translation:
      "Dan (ingatlah) ketika Tuhanmu memaklumkan, 'Sesungguhnya jika kamu bersyukur, niscaya Aku akan menambah (nikmat) kepadamu.'",
    quote:
      "Jika kau tidak mampu bersyukur atas apa yang ada, maka berhati-hatilah; nikmat itu bisa saja pergi tanpa pamit.",
    quoteAuthor: "Imam Syafi'i",
  },
  {
    surahId: 2,
    verseNumber: 153,
    surahName: "Al-Baqarah",
    translation:
      "Wahai orang-orang yang beriman! Mohonlah pertolongan (kepada Allah) dengan sabar dan sholat. Sungguh, Allah beserta orang-orang yang sabar.",
    quote:
      "Sabar adalah cahaya; ia menerangi jalan di tengah kegelapan ujian.",
    quoteAuthor: "Rasulullah ﷺ",
  },
  {
    surahId: 65,
    verseNumber: 3,
    surahName: "At-Talaq",
    translation:
      "Dan barang siapa bertawakal kepada Allah, niscaya Allah akan mencukupkan (keperluan)nya. Sesungguhnya Allah melaksanakan urusan-Nya.",
    quote:
      "Tawakal bukanlah pasrah tanpa usaha, melainkan ikhtiar maksimal lalu menyerahkan hasil kepada Allah.",
    quoteAuthor: "Imam Al-Ghazali",
  },
  {
    surahId: 49,
    verseNumber: 13,
    surahName: "Al-Hujurat",
    translation:
      "Sesungguhnya yang paling mulia di antara kamu di sisi Allah ialah orang yang paling bertakwa.",
    quote:
      "Kemuliaan seseorang tidak diukur dari harta atau pangkat, tetapi dari ketakwaannya kepada Allah.",
    quoteAuthor: "Ali bin Abi Thalib",
  },
  {
    surahId: 2,
    verseNumber: 45,
    surahName: "Al-Baqarah",
    translation:
      "Dan jadikanlah sabar dan sholat sebagai penolongmu. Dan sesungguhnya yang demikian itu sungguh berat, kecuali bagi orang-orang yang khusyuk.",
    quote:
      "Ketika dunia terasa sempit, perbanyaklah sholat dan doa; sebab keduanya adalah kunci keluasan.",
    quoteAuthor: "Imam Syafi'i",
  },
  {
    surahId: 103,
    verseNumber: 3,
    surahName: "Al-'Asr",
    translation:
      "Kecuali orang-orang yang beriman dan mengerjakan kebajikan serta saling menasihati untuk kebenaran dan saling menasihati untuk kesabaran.",
    quote:
      "Waktu adalah pedang; jika engkau tidak memotongnya, ia yang akan memotongmu.",
    quoteAuthor: "Ali bin Abi Thalib",
  },
  {
    surahId: 24,
    verseNumber: 35,
    surahName: "An-Nur",
    translation:
      "Allah (pemberi) cahaya langit dan bumi. Perumpamaan cahaya-Nya seperti sebuah lubang yang tak tembus, yang di dalamnya ada pelita besar.",
    quote:
      "Ilmu adalah cahaya, dan cahaya Allah tidak akan diberikan kepada orang yang bermaksiat.",
    quoteAuthor: "Imam Syafi'i",
  },
  {
    surahId: 40,
    verseNumber: 60,
    surahName: "Al-Mu'min",
    translation:
      "Dan Tuhanmu berfirman, 'Berdoalah kepada-Ku, niscaya akan Aku perkenankan bagimu.'",
    quote:
      "Berdoalah seolah-olah hasil bergantung pada doamu, dan berusahalah seolah-olah hasil bergantung pada usahamu.",
    quoteAuthor: "Ki Hajar Dewantara",
  },
  {
    surahId: 57,
    verseNumber: 3,
    surahName: "Al-Hadid",
    translation:
      "Dialah Yang Awal, Yang Akhir, Yang Zahir, dan Yang Batin; dan Dia Maha Mengetahui segala sesuatu.",
    quote:
      "Semakin engkau mengenal Allah, semakin tawadhu engkau kepada sesama manusia.",
    quoteAuthor: "Ibnu Sina",
  },
  {
    surahId: 18,
    verseNumber: 10,
    surahName: "Al-Kahfi",
    translation:
      "Wahai Tuhan kami, berikanlah kami rahmat dari sisi-Mu dan sempurnakanlah petunjuk yang lurus bagi kami dalam urusan kami.",
    quote:
      "Doa pemuda Ashabul Kahfi adalah pelajaran: minta rahmat dulu, baru petunjuk dan kekuatan.",
    quoteAuthor: "Umar bin Khattab",
  },
];

const STORAGE_KEY = "daily-ayat-curated";

function getWitaDate(): string {
  return new Date(Date.now() + 8 * 3600 * 1000).toISOString().split("T")[0];
}

function loadIndex(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw) as { date: string; index: number };
      if (saved.date === getWitaDate()) {
        return Math.min(Math.max(saved.index, 0), CURATED_AYAT.length - 1);
      }
    }
  } catch {
    // abaikan
  }
  return getWitaDate().split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % CURATED_AYAT.length;
}

function saveIndex(index: number) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: getWitaDate(), index }));
  } catch {
    // abaikan
  }
}

export function DailyAyat() {
  const [index, setIndex] = useState<number>(0);
  const [mounted, setMounted] = useState(false);
  const [arabic, setArabic] = useState<string>("");
  const [translation, setTranslation] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    setIndex(loadIndex());
    setMounted(true);
  }, []);

  const ayah = CURATED_AYAT[index];

  const fetchArabic = useCallback(async (target: CuratedAyah) => {
    setLoading(true);
    setArabic("");
    setTranslation("");
    try {
      const verseRes = await fetch(
        `https://api.quran.com/api/v4/verses/by_key/${target.surahId}:${target.verseNumber}?language=id&fields=text_uthmani&translations=33`
      );
      const verseData = await verseRes.json();
      const verse = verseData.verse || verseData.verses?.[0];
      const apiTranslation = verse?.translations?.[0]?.text?.replace(/<[^>]*>/g, "") || "";
      setArabic(verse?.text_uthmani || "");
      setTranslation(apiTranslation || target.translation);
    } catch (error) {
      console.error("Gagal memuat teks arab", error);
      setArabic("");
      setTranslation(target.translation);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArabic(ayah);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const handleRefresh = () => {
    setIsRotating(true);
    const next = (index + 1) % CURATED_AYAT.length;
    setIndex(next);
    saveIndex(next);
    setTimeout(() => setIsRotating(false), 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border bg-gradient-to-br from-primary/5 via-gold/5 to-teal/5 p-6 md:p-8 overflow-hidden relative shadow-sm"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/10 to-teal/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-xl shadow-inner">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Inspirasi Ayat</p>
              <Link href={`/surah/${ayah.surahId}#verse-${ayah.verseNumber}`} className="text-sm font-bold text-primary hover:underline">
                QS. {ayah.surahName}: {ayah.verseNumber}
              </Link>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="p-2.5 bg-card border shadow-sm hover:bg-accent hover:text-primary rounded-xl transition-all outline-none"
            aria-label="Refresh Ayat"
          >
            <RefreshCw className={`h-5 w-5 text-muted-foreground ${isRotating ? 'animate-spin text-primary' : ''}`} />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-12 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-gold" />
              <p className="text-muted-foreground text-sm font-medium">Menyiapkan inspirasi untukmu...</p>
            </motion.div>
          ) : (
            <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              {arabic && (
                <p className="font-arabic text-3xl text-primary leading-loose mb-6 text-right" dir="rtl">
                  {arabic}
                </p>
              )}
              <div className="space-y-4">
                <p className="text-base leading-relaxed text-foreground/90 font-medium">
                  &ldquo;{translation || ayah.translation}&rdquo;
                </p>
                <div className="p-4 bg-gold/10 rounded-2xl border border-gold/20 flex items-start gap-3">
                  <Quote className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-gold/80 mb-1 uppercase tracking-wider">
                      Hikmah dari {ayah.quoteAuthor}
                    </p>
                    <p className="text-sm text-foreground/80 font-medium italic">&ldquo;{ayah.quote}&rdquo;</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

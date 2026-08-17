"use client";

import { motion } from "framer-motion";
import { Moon, Star, ChevronLeft, ChevronRight, Sparkles, BookOpen, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { getPrayerTimes, gregorianToHijri } from "@/lib/prayer-api";
import { sfx } from "@/lib/sfx";

export interface IslamicEvent {
  month: number;
  day: number;
  name: string;
  desc: string;
  amal: string;
}

// 18 Peristiwa & Hari Besar Penting Islam Sepanjang Tahun Lengkap dengan Makna & Saran Amalan
const ISLAMIC_EVENTS: IslamicEvent[] = [
  {
    month: 1,
    day: 1,
    name: "Tahun Baru Hijriyah (1 Muharram)",
    desc: "Momen refleksi awal tahun mengenang hijrah agung Rasulullah ﷺ dari Mekkah ke Madinah.",
    amal: "Muhasabah diri, memperbanyak doa awal tahun, dan bersiap menyambut puasa sunnah Muharram."
  },
  {
    month: 1,
    day: 9,
    name: "Puasa Tasu'a (9 Muharram)",
    desc: "Hari kesembilan di bulan Muharram yang disunnahkan berpuasa mendampingi puasa Asyura.",
    amal: "Menjalankan ibadah Puasa Sunnah Tasu'a untuk menyempurnakan sunnah Rasulullah ﷺ."
  },
  {
    month: 1,
    day: 10,
    name: "Hari Asyura (10 Muharram)",
    desc: "Hari bersejarah diselamatkannya Nabi Musa AS dan Bani Israil dari kejaran pasukan Firaun.",
    amal: "Puasa Sunnah Asyura (menghapuskan dosa setahun yang lalu) dan melapangkan nafkah keluarga."
  },
  {
    month: 3,
    day: 12,
    name: "Maulid Nabi Muhammad ﷺ (12 Rabi'ul Awwal)",
    desc: "Hari kelahiran baginda Rasulullah ﷺ, sang pembawa rahmat bagi seluruh alam semesta.",
    amal: "Memperbanyak shalawat Nabi, membaca sirah nabawiyah, dan mempererat tali silaturahmi."
  },
  {
    month: 7,
    day: 27,
    name: "Isra' Mi'raj (27 Rajab)",
    desc: "Perjalanan mukjizat Rasulullah ﷺ ke Sidratul Muntaha menerima perintah sholat 5 waktu.",
    amal: "Memperbaiki kekhusyukan sholat fardhu, sholat sunnah malam, dan memperbanyak istighfar."
  },
  {
    month: 8,
    day: 1,
    name: "Awal Bulan Sya'ban (1 Sya'ban)",
    desc: "Bulan mulia pintu gerbang persiapan spiritual sebelum memasuki bulan suci Ramadhan.",
    amal: "Mulai memperbanyak puasa sunnah, mencicil qadha puasa, dan memperbanyak tilawah Al-Qur'an."
  },
  {
    month: 8,
    day: 15,
    name: "Malam Nisfu Sya'ban (15 Sya'ban)",
    desc: "Malam pertengahan bulan Sya'ban yang penuh dengan limpahan maghfirah (ampunan Allah).",
    amal: "Qiyamul lail (sholat malam), memperbanyak istighfar, doa, dan puasa sunnah Ayyamul Bidh."
  },
  {
    month: 9,
    day: 1,
    name: "Awal Puasa Ramadhan (1 Ramadhan)",
    desc: "Bulan suci yang diwajibkan berpuasa, pintu surga dibuka, dan setan-setan dibelenggu.",
    amal: "Puasa fardhu Ramadhan, sholat Tarawih berjamaah, tadarrus Al-Qur'an, dan memberi ifthar."
  },
  {
    month: 9,
    day: 17,
    name: "Nuzulul Qur'an (17 Ramadhan)",
    desc: "Peringatan turunnya wahyu pertama Al-Qur'an (Surah Al-'Alaq 1-5) kepada Nabi Muhammad ﷺ.",
    amal: "Mengkhatamkan Al-Qur'an, mentadabburi tafsir ayat, dan menghadiri majelis ilmu."
  },
  {
    month: 9,
    day: 21,
    name: "10 Malam Terakhir / Lailatul Qadar",
    desc: "Malam kemuliaan yang nilainya lebih utama daripada beribadah selama seribu bulan.",
    amal: "I'tikaf di masjid, memperbanyak doa 'Allahumma innaka 'afuwwun...', dan sedekah malam."
  },
  {
    month: 10,
    day: 1,
    name: "Hari Raya Idul Fitri (1 Syawwal)",
    desc: "Hari kemenangan kaum muslimin setelah sebulan penuh berpuasa kembali kepada kesucian fitrah.",
    amal: "Menunaikan zakat fitrah sebelum sholat, melaksanakan Sholat Idul Fitri, dan silaturahmi."
  },
  {
    month: 10,
    day: 2,
    name: "Puasa Sunnah 6 Hari Syawwal",
    desc: "Amalan puasa 6 hari di bulan Syawwal yang pahalanya disetarakan dengan berpuasa setahun penuh.",
    amal: "Menjalankan puasa sunnah 6 hari Syawwal (boleh berurutan atau terpisah)."
  },
  {
    month: 11,
    day: 1,
    name: "Awal Bulan Haram Dzulqa'dah",
    desc: "Satu dari empat bulan haram (suci) yang dimuliakan Allah, dilarang berbuat zalim dan dosa.",
    amal: "Menjauhi maksiat, memperbanyak amal kebajikan, dan mempersiapkan bekal keberangkatan haji."
  },
  {
    month: 12,
    day: 1,
    name: "10 Hari Awal Dzulhijjah (Amal Terbaik)",
    desc: "Hari-hari paling dicintai oleh Allah SWT untuk memperbanyak amal saleh di muka bumi.",
    amal: "Puasa sunnah 1-8 Dzulhijjah, memperbanyak takbir, tahlil, tahmid, dan sedekah."
  },
  {
    month: 12,
    day: 8,
    name: "Hari Tarwiyah (8 Dzulhijjah)",
    desc: "Hari persiapan bekal air bagi jamaah haji sebelum berangkat menuju Padang Arafah.",
    amal: "Puasa sunnah Tarwiyah bagi yang tidak berhaji dan memperbanyak doa serta talbiyah."
  },
  {
    month: 12,
    day: 9,
    name: "Hari Arafah & Puasa Arafah (9 Dzulhijjah)",
    desc: "Puncak ibadah haji (Wukuf di Arafah) dan hari pembebasan dari api neraka terbanyak.",
    amal: "Puasa Sunnah Arafah (menghapus dosa 2 tahun) dan memanjatkan doa terbaik sepanjang hari."
  },
  {
    month: 12,
    day: 10,
    name: "Hari Raya Idul Adha (10 Dzulhijjah)",
    desc: "Hari raya kurban meneladani keikhlasan dan ketakwaan Nabi Ibrahim AS dan Nabi Ismail AS.",
    amal: "Melaksanakan Sholat Idul Adha, menyembelih hewan kurban, dan mengagungkan takbir."
  },
  {
    month: 12,
    day: 11,
    name: "Hari Tasyrik (11-13 Dzulhijjah)",
    desc: "Hari makan, minum, dan mengingat Allah SWT (diharamkan berpuasa pada hari-hari ini).",
    amal: "Menikmati hidangan kurban, bertakbir muqayyad setiap selesai sholat fardhu, dan berdzikir."
  }
];

const HIJRI_MONTHS = [
  "Muharram",
  "Safar",
  "Rabi'ul Awwal",
  "Rabi'ul Akhir",
  "Jumadil Ula",
  "Jumadil Akhir",
  "Rajab",
  "Sya'ban",
  "Ramadhan",
  "Syawwal",
  "Dzulqa'dah",
  "Dzulhijjah"
];

// Perkiraan akumulasi hari per bulan Hijriah
function getHijriDayOfYear(month: number, day: number): number {
  const monthDays = [0, 30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325];
  return (monthDays[month - 1] || 0) + day;
}

export function HijriCalendarWidget() {
  const [prayerData, setPrayerData] = useState<any>(null);
  const [eventIndex, setEventIndex] = useState<number>(() => {
    const todayHijri = gregorianToHijri(new Date());
    let idx = ISLAMIC_EVENTS.findIndex(e => e.month === todayHijri.month && e.day >= todayHijri.day);
    if (idx === -1) {
      idx = ISLAMIC_EVENTS.findIndex(e => e.month > todayHijri.month);
    }
    return idx !== -1 ? idx : 0;
  });
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    getPrayerTimes().then(data => {
      setPrayerData(data);
      
      const hijri = data.date.hijri;
      const monthNum = typeof hijri.month.number === 'number' ? hijri.month.number : parseInt(hijri.month.number as string);
      const dayNum = parseInt(hijri.day);

      // Temukan index event terdekat bulan ini atau bulan depan sebagai default
      let defaultIdx = ISLAMIC_EVENTS.findIndex(e => e.month === monthNum && e.day >= dayNum);
      if (defaultIdx === -1) {
        defaultIdx = ISLAMIC_EVENTS.findIndex(e => e.month > monthNum);
      }
      if (defaultIdx === -1) {
        defaultIdx = 0; // Wrap ke event pertama jika sudah di akhir tahun
      }
      setEventIndex(defaultIdx);
    });
  }, []);

  if (!prayerData || eventIndex === null) return null;

  const hijri = prayerData.date.hijri;
  const gregorian = prayerData.date.gregorian;
  const monthNum = typeof hijri.month.number === 'number' ? hijri.month.number : parseInt(hijri.month.number as string);
  const dayNum = parseInt(hijri.day);

  // Ejaan Indonesia untuk bulan aktif di kalender
  const hijriMonthName = HIJRI_MONTHS[monthNum - 1] || hijri.month.en;

  // Event yang sedang aktif di slider navigasi
  const activeEvent = ISLAMIC_EVENTS[eventIndex];
  const eventMonthName = HIJRI_MONTHS[activeEvent.month - 1];

  // Hitung selisih hari antara tanggal hari ini dengan event
  const currentDayOfYear = getHijriDayOfYear(monthNum, dayNum);
  const eventDayOfYear = getHijriDayOfYear(activeEvent.month, activeEvent.day);
  const diffDays = eventDayOfYear - currentDayOfYear;

  let relativeTimeLabel = "";
  let badgeColor = "bg-amber-500/20 text-amber-700 dark:text-amber-300";

  if (diffDays === 0) {
    relativeTimeLabel = "Hari ini";
    badgeColor = "bg-emerald-500 text-white animate-pulse";
  } else if (diffDays > 0) {
    relativeTimeLabel = `${diffDays} hari lagi`;
    badgeColor = "bg-primary/10 text-primary font-bold";
  } else {
    relativeTimeLabel = `${Math.abs(diffDays)} hari lalu`;
    badgeColor = "bg-muted text-muted-foreground";
  }

  const handleNextEvent = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (eventIndex < ISLAMIC_EVENTS.length - 1) {
      setIsFlipped(false);
      setEventIndex(prev => prev! + 1);
      sfx.playTap();
    }
  };

  const handlePrevEvent = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (eventIndex > 0) {
      setIsFlipped(false);
      setEventIndex(prev => prev! - 1);
      sfx.playTap();
    }
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
    sfx.playTap();
  };

  return (
    <div className="rounded-3xl border bg-card p-6 overflow-hidden relative h-full flex flex-col justify-between shadow-sm">
      <div className="absolute top-0 right-0 p-8 rounded-bl-[100px] bg-gradient-to-br from-primary/10 to-teal/10 opacity-50" />
      
      <div className="relative z-10 flex-1 flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
            <Moon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg leading-tight">Kalender Hijriyah</h3>
            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{gregorian.date.string}</p>
          </div>
        </div>

        {/* Calendar Tear-Off Sheet Design */}
        <div className="my-auto flex flex-col items-center justify-center p-3.5 bg-muted/30 rounded-2xl border text-center relative overflow-hidden">
          {/* Top red header representing a real calendar binding */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-500 to-red-600" />
          
          <div className="text-5xl font-display font-bold text-primary mb-0.5 mt-1 tracking-tighter">
            {hijri.day}
          </div>
          <div className="text-base font-bold text-foreground">
            {hijriMonthName} {hijri.year}
          </div>
          <div className="text-[11px] font-semibold text-muted-foreground">
            {hijri.date.string}
          </div>
        </div>

        {/* 3D FLIP CARD: Upcoming Event Box (Interactive Flip) */}
        <div
          className="mt-4 relative min-h-[145px] w-full cursor-pointer select-none"
          style={{ perspective: "1000px" }}
          onClick={toggleFlip}
        >
          <motion.div
            className="relative h-full w-full rounded-2xl"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* SISI DEPAN (Front: Nama Event, Tanggal & Countdown) */}
            <div
              className="absolute inset-0 p-3.5 bg-amber-500/10 rounded-2xl border border-amber-500/20 flex flex-col justify-between shadow-sm hover:border-amber-500/40 transition-colors"
              style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 text-amber-500 shrink-0 animate-pulse" />
                  <p className="text-[9px] font-bold text-amber-700 dark:text-amber-500 uppercase tracking-widest">
                    Hari Besar ({eventIndex + 1}/{ISLAMIC_EVENTS.length})
                  </p>
                </div>
                
                {/* Navigasi Event Slider */}
                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={handlePrevEvent}
                    disabled={eventIndex === 0}
                    className="p-1 rounded bg-amber-500/15 hover:bg-amber-500/30 disabled:opacity-30 disabled:hover:bg-amber-500/15 transition-colors text-amber-700 dark:text-amber-400"
                    title="Event Sebelumnya"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={handleNextEvent}
                    disabled={eventIndex === ISLAMIC_EVENTS.length - 1}
                    className="p-1 rounded bg-amber-500/15 hover:bg-amber-500/30 disabled:opacity-30 disabled:hover:bg-amber-500/15 transition-colors text-amber-700 dark:text-amber-400"
                    title="Event Selanjutnya"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="my-auto">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 pr-1">
                    <p className="font-bold text-xs text-foreground leading-tight line-clamp-2">{activeEvent.name}</p>
                    <p className="text-[10px] text-muted-foreground font-semibold mt-0.5">
                      Tanggal {activeEvent.day} {eventMonthName}
                    </p>
                  </div>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold shrink-0 mt-0.5 ${badgeColor}`}>
                    {relativeTimeLabel}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-amber-500/20 text-[9px] text-amber-700/80 dark:text-amber-400/80 font-bold">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3 w-3" /> Ketuk untuk makna & amalan
                </span>
                <span>&rarr;</span>
              </div>
            </div>

            {/* SISI BELAKANG (Back: Makna & Saran Amalan Sunnah) */}
            <div
              className="absolute inset-0 p-3.5 bg-gradient-to-br from-amber-500/15 via-amber-500/10 to-orange-500/15 rounded-2xl border border-amber-500/30 flex flex-col justify-between shadow-md text-left"
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-1">
                <span className="font-bold text-[10px] text-amber-700 dark:text-amber-400 truncate max-w-[170px]">
                  {activeEvent.name.split("(")[0]}
                </span>
                <span className="text-[9px] bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold px-1.5 py-0.5 rounded">
                  Amalan
                </span>
              </div>

              <div className="space-y-1.5 my-auto overflow-y-auto pr-0.5 max-h-[70px]">
                <p className="text-[10px] text-foreground/90 leading-tight">
                  <strong className="text-amber-600 dark:text-amber-400">Makna:</strong> {activeEvent.desc}
                </p>
                <p className="text-[10px] text-foreground/90 leading-tight">
                  <strong className="text-emerald-600 dark:text-emerald-400">Saran:</strong> {activeEvent.amal}
                </p>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-amber-500/20 text-[9px] text-muted-foreground font-bold">
                <span>&larr; Ketuk untuk kembali</span>
                <RotateCcw className="h-2.5 w-2.5 opacity-70" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

import { getWitaTime } from "@/store/prayer-store";

export type PrayerPeriod = "fajr" | "dhuhr" | "asr" | "maghrib" | "isha";

interface TimeTheme {
  period: PrayerPeriod;
  label: string;
  gradient: string;
  primaryHue: number;
  accentHue: number;
  ambient: string;
}

const TIME_THEMES: Record<PrayerPeriod, TimeTheme> = {
  fajr: {
    period: "fajr",
    label: "Waktu Subuh",
    gradient: "from-indigo-900 via-purple-800 to-blue-600",
    primaryHue: 240,
    accentHue: 280,
    ambient: "Dawn Break",
  },
  dhuhr: {
    period: "dhuhr",
    label: "Waktu Dzuhur",
    gradient: "from-amber-400 via-yellow-300 to-orange-400",
    primaryHue: 45,
    accentHue: 60,
    ambient: "Bright Day",
  },
  asr: {
    period: "asr",
    label: "Waktu Ashar",
    gradient: "from-orange-500 via-amber-500 to-yellow-600",
    primaryHue: 35,
    accentHue: 50,
    ambient: "Golden Hour",
  },
  maghrib: {
    period: "maghrib",
    label: "Waktu Maghrib",
    gradient: "from-rose-600 via-orange-600 to-amber-500",
    primaryHue: 15,
    accentHue: 30,
    ambient: "Sunset Glow",
  },
  isha: {
    period: "isha",
    label: "Waktu Isya",
    gradient: "from-slate-900 via-indigo-950 to-blue-950",
    primaryHue: 230,
    accentHue: 260,
    ambient: "Starry Night",
  },
};

function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}

export function getCurrentPrayerPeriod(prayerSchedule?: {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}): PrayerPeriod {
  if (!prayerSchedule) {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) return "fajr";
    if (hour >= 11 && hour < 15) return "dhuhr";
    if (hour >= 15 && hour < 18) return "asr";
    if (hour >= 18 && hour < 19) return "maghrib";
    return "isha";
  }

  const now = getWitaTime();
  const nowMin = toMinutes(now);

  const fajrMin = toMinutes(prayerSchedule.Fajr);
  const dhuhrMin = toMinutes(prayerSchedule.Dhuhr);
  const asrMin = toMinutes(prayerSchedule.Asr);
  const maghribMin = toMinutes(prayerSchedule.Maghrib);
  const ishaMin = toMinutes(prayerSchedule.Isha);

  if (nowMin >= fajrMin && nowMin < dhuhrMin) return "fajr";
  if (nowMin >= dhuhrMin && nowMin < asrMin) return "dhuhr";
  if (nowMin >= asrMin && nowMin < maghribMin) return "asr";
  if (nowMin >= maghribMin && nowMin < ishaMin) return "maghrib";
  return "isha";
}

export function getTimeTheme(period: PrayerPeriod): TimeTheme {
  return TIME_THEMES[period];
}

export function applyTimeTheme(period: PrayerPeriod) {
  if (typeof document === "undefined") return;
  
  const theme = TIME_THEMES[period];
  const root = document.documentElement;
  
  root.style.setProperty("--prayer-hue", String(theme.primaryHue));
  root.style.setProperty("--accent-hue", String(theme.accentHue));
  root.setAttribute("data-prayer-period", period);
}

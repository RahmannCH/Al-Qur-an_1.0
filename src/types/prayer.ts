export interface PrayerTimesResponse {
  code: number;
  status: string;
  data: {
    date: {
      readable: string;
      timestamp: number;
      hijri: {
        date: {
          string: string;
        };
        year: string;
        month: {
          number: number;
          en: string;
        };
        day: string;
      };
      gregorian: {
        date: {
          string: string;
        };
        weekday: {
          en: string;
        };
        year: string;
        month: {
          number: number;
          en: string;
        };
        day: string;
      };
    };
    timings: {
      Fajr: string;
      Sunrise: string;
      Dhuhr: string;
      Asr: string;
      Sunset: string;
      Maghrib: string;
      Isha: string;
      Imsak: string;
      Midnight: string;
    };
  };
}
